import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { manifestSchema, channelsSchema } from '../src/data/downloads-schema.ts';
import { fixtureManifest } from '../tests/fixtures/download-manifest.mjs';
import { discoverManifest, syncReleases, verifyFiles } from './sync-releases.mjs';

const assetFor = file => ({name: file.filename, size: file.sizeBytes, browser_download_url: file.url, state: 'uploaded', digest: `sha256:${file.sha256}`});
function mockFetch(manifest = fixtureManifest(), {evidencePages = 0, digest = true, commit = manifest.sourceCommit} = {}) {
  const releases = [{tag_name: manifest.tag, draft: false, prerelease: false, published_at: '2026-10-09T00:00:00Z', assets: [...manifest.packages, ...manifest.sources].map(assetFor).map(asset => digest ? asset : {...asset, digest: null}).concat([{name: 'downloads-manifest.json', size: 8000, browser_download_url: `https://github.com/Globulation2/glob2/releases/download/${manifest.tag}/downloads-manifest.json`}])}];
  const requests = [];
  const fetcher = async url => {
    requests.push(url);
    if (url.includes('/releases?')) {
      const page = Number(new URL(url).searchParams.get('page'));
      return Response.json(page <= evidencePages ? Array.from({length: 100}, () => ({tag_name: 'evidence-test', prerelease: true})) : releases);
    }
    if (url.includes('/git/ref/tags/')) return Response.json({object: {type: 'commit', sha: commit}});
    if (url.endsWith('/downloads-manifest.json')) return Response.json(manifest);
    return new Response('fixture package');
  };
  return {fetcher, requests};
}
test('complete platform matrix and sources validate', () => assert.equal(manifestSchema.parse(fixtureManifest()).packages.length, 11));
for (const [name, mutate] of Object.entries({
  'missing package': m => m.packages.pop(),
  'duplicate identity': m => m.packages.push(m.packages[0]),
  'mixed source': m => m.qualification.sourceCommit = 'b'.repeat(40),
  'wrong version': m => m.tag = 'v99.0',
  'expiring CI URL': m => m.packages[0].url = 'https://github.com/Globulation2/glob2/actions/runs/123/artifacts/1',
  'wrong extension': m => m.packages[0].filename = 'linux.tar.gz',
  'beta store': m => m.qualification.stores.googlePlay.production = false,
  'unsafe store': m => m.qualification.stores.appStore.url = 'https://evil.example/id123',
  'wrong Android app': m => m.qualification.stores.googlePlay.url = 'https://play.google.com/store/apps/details?id=wrong.app',
  'non-archive source': m => m.sources[0].filename = 'source.exe',
  'store URL credentials': m => m.qualification.stores.appStore.url = 'https://user:pass@apps.apple.com/app/id123',
  'duplicate Android app query': m => m.qualification.stores.googlePlay.url += '&id=wrong.app',
  'unsafe filename': m => m.sources[0].filename = '../source.tar.gz',
})) test(`rejects ${name}`, () => {const manifest = fixtureManifest(); mutate(manifest); assert.throws(() => manifestSchema.parse(manifest));});
test('paginates past 200 evidence releases', async () => { const {fetcher, requests} = mockFetch(undefined, {evidencePages: 2}); assert.equal((await discoverManifest(fetcher)).tag, fixtureManifest().tag); assert.equal(requests.filter(url => url.includes('/releases?')).length, 3); });
test('ignores stable releases without qualified manifest and drafts', async () => {const fetcher = async () => Response.json([{tag_name: 'v1.0', assets: []}, {tag_name: 'v2.0', draft: true, assets: [{name: 'downloads-manifest.json'}]}]); assert.equal(await discoverManifest(fetcher), null);});
test('rejects immutable tag revision mismatch', async () => assert.rejects(discoverManifest(mockFetch(undefined, {commit: 'b'.repeat(40)}).fetcher), /revision mismatch/));
test('verifies older assets by streaming final bytes', async () => assert.ok(await discoverManifest(mockFetch(undefined, {digest: false}).fetcher)));
test('rejects mismatched GitHub digest', async () => {const manifest = fixtureManifest(); const assets = [...manifest.packages, ...manifest.sources].map(assetFor); assets[0].digest = `sha256:${'b'.repeat(64)}`; await assert.rejects(verifyFiles(manifest, assets), /checksum mismatch/);});
test('rejects missing and wrong-sized release assets', async () => { const manifest = fixtureManifest(); const assets = [...manifest.packages, ...manifest.sources].map(assetFor); await assert.rejects(verifyFiles(manifest, assets.slice(1)), /inventory mismatch/); assets[0].size++; await assert.rejects(verifyFiles(manifest, assets), /inventory mismatch/); });
test('atomically updates once and preserves snapshot on every failure', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'glob2-downloads-'));
  const filename = join(dir, 'metadata.json');
  try {
    await writeFile(filename, JSON.stringify({schemaVersion: 2, checkedAt: null, manifest: null}));
    const {fetcher} = mockFetch();
    assert.equal(await syncReleases({filename, fetcher}), true);
    const previous = await readFile(filename, 'utf8');
    assert.equal(await syncReleases({filename, fetcher}), false);
    for (const failingFetch of [async () => new Response('', {status: 503}), async () => Response.json({}), mockFetch({...fixtureManifest(), packages: []}).fetcher]) {
      await assert.rejects(syncReleases({filename, fetcher: failingFetch}));
      assert.equal(await readFile(filename, 'utf8'), previous);
    }
    assert.equal(await syncReleases({filename, fetcher: async () => Response.json([])}), false);
    assert.equal(await readFile(filename, 'utf8'), previous);
  } finally {await rm(dir, {recursive: true, force: true});}
});

test('editorial channels require a release binding and production app identities', () => {
  const channels = {schemaVersion: 1, releaseTag: null, googlePlay: null, appStore: null, withdrawnPackages: [], withdrawnStores: []};
  assert.ok(channelsSchema.parse(channels));
  assert.throws(() => channelsSchema.parse({...channels, withdrawnPackages: ['windows.exe']}));
  assert.ok(channelsSchema.parse({...channels, releaseTag: 'v1.0', withdrawnPackages: ['windows.exe'], withdrawnStores: ['appStore']}));
  assert.throws(() => channelsSchema.parse({...channels, releaseTag: 'v1.0', googlePlay: {production: false, url: fixtureManifest().qualification.stores.googlePlay.url}}));
});

test('oversized metadata is bounded before parsing', async () => {
  await assert.rejects(discoverManifest(async () => new Response('x'.repeat(2_000_001))), /too large/);
});
test('streamed package corruption is rejected', async () => {
  const manifest = fixtureManifest();
  const assets = [...manifest.packages, ...manifest.sources].map(assetFor).map(asset => ({...asset,digest:null}));
  await assert.rejects(verifyFiles(manifest, assets, async () => new Response('corrupted bytes')), /checksum mismatch|size mismatch/);
});
