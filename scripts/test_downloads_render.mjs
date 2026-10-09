// Build synthetic populated metadata in an ignored copy; tracked production data is never changed.
import { cp, mkdir, mkdtemp, writeFile, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { fixtureManifest } from '../tests/fixtures/download-manifest.mjs';
import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
await mkdir('artifacts/downloads', {recursive: true});
const directory = await mkdtemp(resolve('artifacts/downloads/populated-'));
for (const file of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json', 'firebase.json', 'tests/server.mjs']) await cp(file, join(directory, file), {recursive: true});
await symlink(resolve('node_modules'), join(directory, 'node_modules'), 'dir');
const manifest = fixtureManifest();
for (const pkg of manifest.packages) pkg.minimumOs = ({windows: 'Windows 11', macos: 'macOS 15', linux: 'the listed Linux runtime', android: 'Android 7.0 (API 24)'})[pkg.platform];
await writeFile(join(directory, 'src/data/release-metadata.json'), JSON.stringify({schemaVersion: 2, checkedAt: '2026-10-09T00:00:00Z', manifest}));
const buildFixture = () => new Promise((resolvePromise, reject) => {const child = spawn(process.execPath, [resolve('node_modules/astro/bin/astro.mjs'), 'build'], {cwd: directory, stdio: 'inherit'}); child.on('exit', code => code === 0 ? resolvePromise() : reject(new Error(`Fixture build failed: ${code}`)));});
await buildFixture();
const server = spawn(process.execPath, ['tests/server.mjs'], {cwd: directory, env: {...process.env, TEST_PORT: '4323'}, stdio: ['ignore', 'pipe', 'inherit']});
try {
 await new Promise((ready, reject) => {server.stdout.once('data', ready); server.once('exit', code => reject(new Error(`Fixture server failed: ${code}`)));});
 for (const [engineName, engine] of Object.entries({chromium, firefox, webkit})) {
  const browser = await engine.launch();
  try {
   for (const width of [360, 768, 1440]) for (const colorScheme of ['light', 'dark']) {
    const page = await browser.newPage({viewport: {width, height: 1000}, colorScheme, javaScriptEnabled: false});
    await page.goto('http://127.0.0.1:4323/downloads/');
    assert.equal(await page.locator('a[href*="/releases/download/"]').count(), 12);
    assert.equal(await page.locator('a[href^="https://play.google.com/"]').count(), 1);
    assert.equal(await page.locator('a[href^="https://apps.apple.com/"]').count(), 1);
    await page.locator('.download-checksum summary').first().click();
    assert.equal(await page.locator('.download-checksum code').first().isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    // Axe needs JS; static navigation and disclosure assertions above use JS disabled.
    await page.close();
    const accessibleContext = await browser.newContext({viewport:{width,height:1000},colorScheme});
    const accessible = await accessibleContext.newPage();
    await accessible.goto('http://127.0.0.1:4323/downloads/');
    assert.deepEqual((await new AxeBuilder({page:accessible}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations, []);
    if (engineName === 'chromium' && [360,1440].includes(width)) await accessible.screenshot({path:resolve(`artifacts/downloads/round2-populated-${width}-${colorScheme}.png`),fullPage:true});
    await accessibleContext.close();
   }
  } finally {await browser.close();}
 }
 // Exercise reviewed withdrawals and store changes independently of package metadata.
 const installer = manifest.packages.find(pkg => pkg.platform === 'windows' && pkg.format === 'exe');
 await writeFile(join(directory, 'src/data/download-channels.json'), JSON.stringify({schemaVersion:1, releaseTag:manifest.tag, googlePlay:{production:true,url:manifest.qualification.stores.googlePlay.url+'&hl=en'},appStore:null,withdrawnPackages:[installer.filename],withdrawnStores:['appStore']}));
 await buildFixture();
 const withdrawalBrowser = await chromium.launch();
 try {
  const page = await withdrawalBrowser.newPage(); await page.goto('http://127.0.0.1:4323/downloads/');
  assert.equal(await page.locator('a[href*="/releases/download/"]').count(), 11);
  assert.equal(await page.locator('a[href^="https://apps.apple.com/"]').count(), 0);
  assert.equal(await page.locator('a[href*="hl=en"]').count(), 1);
 } finally {await withdrawalBrowser.close();}
 console.log(`Populated downloads: 18 browser/theme/viewport checks passed; fixture: ${directory}`);
} finally {server.kill();}
