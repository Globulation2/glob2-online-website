import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

// Exercise the CLI against a disposable upstream checkout. Never mutate site copies.
test('sync check detects upstream drift and missing sources without writing', async () => {
  const root = await mkdtemp(resolve(tmpdir(), 'glob2-legal-'));
  const privacy = await readFile(new URL('../src/content/legal/privacy.md', import.meta.url), 'utf8');
  const terms = await readFile(new URL('../src/content/legal/terms.md', import.meta.url), 'utf8');
  const termsSource = '# Globulation 2 terms and conditions\n\n' + terms.split('\n---\n\n')[1];
  const source = '# Globulation 2 privacy policy\n\n' + privacy.split('\n---\n\n')[1];
  const target = resolve(root, 'docs/mobile');
  await mkdir(target, {recursive:true});
  const run = (...args) => spawnSync(process.execPath, ['scripts/sync-legal.mjs', '--game-repo', root, ...args], {encoding:'utf8'});
  try {
    await writeFile(resolve(target, 'privacy-policy.md'), source);
    await writeFile(resolve(target, 'terms.md'), termsSource);
    assert.equal(run('--check').status, 0);
    await writeFile(resolve(target, 'privacy-policy.md'), source + '\nChanged upstream.\n');
    const drift = run('--check');
    assert.equal(drift.status, 1);
    assert.match(drift.stderr, /Out of sync: src\/content\/legal\/privacy.md/);
    await rm(resolve(target, 'terms.md'));
    assert.equal(run().status, 1);
    assert.equal(await readFile(new URL('../src/content/legal/privacy.md', import.meta.url), 'utf8'), privacy);
    assert.equal(await readFile(new URL('../src/content/legal/terms.md', import.meta.url), 'utf8'), terms);
  } finally { await rm(root, {recursive:true,force:true}); }
});
