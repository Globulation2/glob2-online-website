// Import only qualified, immutable public game releases. Failures never replace the saved snapshot.
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { manifestSchema, metadataSchema } from '../src/data/downloads-schema.ts';

const api = 'https://api.github.com/repos/Globulation2/glob2';
const headers = {Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`} : {})};
async function getJson(url, fetcher, authenticated = false) {
  const response = await fetcher(url, {headers: authenticated ? headers : {Accept: 'application/json'}, signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Download metadata request failed: HTTP ${response.status}`);
  if (!response.body) throw new Error('Empty metadata response');
  const reader = response.body.getReader();
  const chunks = []; let size = 0;
  try {
    for (;;) {
      const {done, value} = await reader.read(); if (done) break;
      size += value.length;
      if (size > 2_000_000) {await reader.cancel(); throw new Error('Metadata response is too large');}
      chunks.push(value);
    }
  } finally {reader.releaseLock();}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function tagCommit(tag, fetcher = fetch) {
  let ref = (await getJson(`${api}/git/ref/tags/${tag}`, fetcher, true)).object;
  for (let depth = 0; ref?.type === 'tag' && depth < 5; depth++) {
    ref = (await getJson(`${api}/git/tags/${ref.sha}`, fetcher, true)).object;
  }
  if (ref?.type !== 'commit' || !/^[a-f0-9]{40}$/.test(ref.sha)) throw new Error('Tag does not resolve to a source commit');
  return ref.sha;
}
export async function verifyFiles(manifest, assets, fetcher = fetch) {
  for (const file of [...manifest.packages, ...manifest.sources]) {
    const matches = assets.filter(asset => asset.name === file.filename);
    const asset = matches[0];
    if (matches.length !== 1 || asset.browser_download_url !== file.url || asset.size !== file.sizeBytes || asset.state !== 'uploaded') {
      throw new Error(`Release asset inventory mismatch: ${file.filename}`);
    }
    if (asset.digest) {
      if (asset.digest !== `sha256:${file.sha256}`) throw new Error(`Release asset checksum mismatch: ${file.filename}`);
    } else {
      // Older assets lack GitHub's digest. Hash their bytes without buffering a game package.
      const response = await fetcher(file.url, {signal: AbortSignal.timeout(120000)});
      if (!response.ok || !response.body) throw new Error(`Cannot verify release asset: ${file.filename}`);
      const hash = createHash('sha256');
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > file.sizeBytes) { await response.body.cancel?.().catch(() => {}); throw new Error(`Release asset size mismatch: ${file.filename}`); }
        hash.update(chunk);
      }
      if (size !== file.sizeBytes || hash.digest('hex') !== file.sha256) throw new Error(`Release asset checksum mismatch: ${file.filename}`);
    }
  }
}
export async function discoverManifest(fetcher = fetch) {
  const candidates = [];
  for (let page = 1; ; page++) {
    const releases = await getJson(`${api}/releases?per_page=100&page=${page}`, fetcher, true);
    if (!Array.isArray(releases)) throw new Error('Invalid GitHub releases response');
    candidates.push(...releases.filter(release => !release.draft && !release.prerelease && /^v[0-9]+(?:\.[0-9]+)+$/.test(release.tag_name)));
    if (releases.length < 100) break;
    if (page >= 100) throw new Error('Release pagination limit exceeded');
  }
  candidates.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
  for (const release of candidates) {
    const assets = release.assets ?? [];
    const manifests = assets.filter(asset => asset.name === 'downloads-manifest.json');
    if (!manifests.length) continue; // Historic stable releases are not qualified download releases.
    const url = `https://github.com/Globulation2/glob2/releases/download/${release.tag_name}/downloads-manifest.json`;
    if (manifests.length !== 1 || manifests[0].browser_download_url !== url || manifests[0].size > 2_000_000) throw new Error('Invalid release manifest asset');
    const manifest = manifestSchema.parse(await getJson(url, fetcher));
    if (manifest.tag !== release.tag_name || manifest.sourceCommit !== await tagCommit(manifest.tag, fetcher)) throw new Error('Release source revision mismatch');
    await verifyFiles(manifest, assets, fetcher);
    return manifest;
  }
  return null;
}
export async function syncReleases({filename = 'src/data/release-metadata.json', fetcher = fetch, now = () => new Date().toISOString()} = {}) {
  const previous = metadataSchema.parse(JSON.parse(await readFile(filename, 'utf8')));
  const manifest = await discoverManifest(fetcher);
  if (!manifest || JSON.stringify(previous.manifest) === JSON.stringify(manifest)) return false;
  const temporary = `${filename}.${process.pid}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify({schemaVersion: 2, checkedAt: now(), manifest}, null, 2) + '\n', {flag: 'wx'});
    await rename(temporary, filename);
  } finally { await unlink(temporary).catch(() => {}); }
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(await syncReleases() ? 'Updated qualified game downloads.' : 'Qualified downloads are unchanged.'); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
