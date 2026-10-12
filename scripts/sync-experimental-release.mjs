// Explicit selection of a public prerelease; no qualification claims.
import {readFile, writeFile, rename, unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {experimentalReleaseSchema} from '../src/data/downloads-schema.ts';
import {tagCommit, verifyFiles} from './sync-releases.mjs';

export async function syncExperimentalRelease(tag, {fetcher = fetch, filename = 'src/data/experimental-release.json'} = {}) {
  if (!/^v[0-9]+(?:\.[0-9]+)+$/.test(tag)) throw new Error('Select an exact version tag');
  const response = await fetcher(`https://api.github.com/repos/Globulation2/glob2/releases/tags/${tag}`, {signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Release request failed: ${response.status}`);
  const release = await response.json();
  if (release.draft || release.prerelease !== true || release.tag_name !== tag) throw new Error('Experimental downloads require a public prerelease');
  const url = `https://github.com/Globulation2/glob2/releases/download/${tag}/package-inventory.json`;
  const assets = release.assets ?? [];
  const inventoryAssets = assets.filter(asset => asset.name === 'package-inventory.json');
  const asset = inventoryAssets[0];
  if (inventoryAssets.length !== 1 || asset.browser_download_url !== url || asset.size > 100000 || asset.state !== 'uploaded') throw new Error('Invalid package inventory asset');
  const inventoryResponse = await fetcher(url, {signal: AbortSignal.timeout(30000)});
  if (!inventoryResponse.ok || !inventoryResponse.body) throw new Error('Package inventory request failed');
  const chunks = []; let size = 0;
  for await (const chunk of inventoryResponse.body) {
    size += chunk.length;
    if (size > 100000) throw new Error('Package inventory is too large');
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  if (bytes.length !== asset.size || asset.digest !== `sha256:${createHash('sha256').update(bytes).digest('hex')}`) throw new Error('Package inventory integrity mismatch');
  const inventory = JSON.parse(bytes.toString('utf8'));
  if (inventory.schemaVersion !== 1 || inventory.sourceCommit !== await tagCommit(tag, fetcher)) throw new Error('Package inventory source mismatch');
  const file = descriptor => {
    const matches = assets.filter(asset => asset.name === descriptor.filename);
    if (matches.length !== 1 || !/^sha256:[a-f0-9]{64}$/.test(matches[0].digest ?? '')) throw new Error('Missing asset or SHA-256 digest');
    const asset = matches[0];
    return {...descriptor, sizeBytes: asset.size, sha256: asset.digest.slice(7), url: asset.browser_download_url};
  };
  const metadata = experimentalReleaseSchema.parse({status: 'experimental', tag, version: tag.slice(1), sourceCommit: inventory.sourceCommit,
    releaseNotesUrl: release.html_url, packages: inventory.packages.map(file), sources: inventory.sources.map(file)});
  await verifyFiles(metadata, assets, fetcher);
  const serialized = JSON.stringify(metadata, null, 2) + '\n';
  if (await readFile(filename, 'utf8').catch(() => '') === serialized) return false;
  const temporary = `${filename}.${process.pid}.tmp`;
  try {
    await writeFile(temporary, serialized, {flag: 'wx'});
    await rename(temporary, filename);
  } finally { await unlink(temporary).catch(() => {}); }
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(await syncExperimentalRelease(process.argv[2]) ? 'Updated experimental downloads.' : 'Experimental downloads are unchanged.'); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
