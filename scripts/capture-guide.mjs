/** Development-only capture harness: runs trusted author scenarios against the public game. */
import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

export async function captureGuide({ scenario, output, url = 'https://app.glob2online.com/play/?threads=serial&renderer=software' }) {
  if (new URL(url).origin !== 'https://app.glob2online.com') throw new Error('Capture must use the public browser game');
  await mkdir(output, { recursive: true });
  const events = [], failures = [], delivered = []; const started = Date.now();
  const baseline = JSON.parse(await readFile('src/data/guide-baseline.json', 'utf8'));
  const packages = await Promise.all(['index.js', 'index.wasm'].map(async name => {
    const assetURL = new URL(name, baseline.url).href;
    const response = await fetch(assetURL, { redirect: 'error', signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Public package unavailable: ${name}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    return { url: assetURL, sha256: createHash('sha256').update(bytes).digest('hex'), etag: response.headers.get('etag') };
  }));
  const wasm = packages.find(item => item.url.endsWith('/index.wasm'));
  const script = packages.find(item => item.url.endsWith('/index.js'));
  if (wasm.sha256 !== baseline.serialWasmSha256 || script.sha256 !== baseline.serialScriptSha256) throw new Error('Public game package changed: reconcile baseline before capturing');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: path.join(output, 'raw-video'), size: { width: 1440, height: 900 } } });
  const page = await context.newPage();
  page.on('response', response => {
    const asset = packages.find(item => item.url === response.url());
    if (asset) delivered.push({url: response.url(), etag: response.headers()['etag'] || null});
  });
  const state = () => page.evaluate(() => glob2Diagnostics.snapshot());
  const note = async (action, extra = {}) => { const snapshot = await state(); events.push({ seconds: (Date.now() - started) / 1000, action, ...extra, snapshot }); return snapshot; };
  page.on('pageerror', error => failures.push(String(error)));
  const control = async key => {
    await page.waitForFunction(key => {const c=glob2Diagnostics.snapshot().controls[key];return c?.enabled && c.visible?.w > 0 && c.visible?.h > 0;}, key, { timeout: 60000 });
    const c = (await state()).controls[key]; const v = c.visible;
    await page.mouse.click((v.x + v.w / 2) * 1440 / c.surface.w, (v.y + v.h / 2) * 900 / c.surface.h, { delay: 100 });
    await page.waitForTimeout(250); await note(`control:${key}`);
  };
  const key = async name => { await page.locator('#canvas').press(name, { delay: 100 }); await page.waitForTimeout(200); await note(`key:${name}`); };
  const screenshot = async name => { const snapshot = await note(`screenshot:${name}`); await page.screenshot({ path: path.join(output, name + '.png') }); return snapshot; };
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.glob2Diagnostics?.snapshot().screen.includes('MainMenuScreen'), null, { timeout: 120000 });
    if (packages.some(asset => !delivered.some(item => item.url === asset.url && item.etag === asset.etag))) throw new Error('Public package changed during loading');
    await note('ready');
    await scenario({ page, context, control, key, screenshot, state, note, waitTicks: async count => { const start=(await state()).tick;await page.waitForFunction(target=>glob2Diagnostics.snapshot().tick>=target,start+count,{timeout:120000});await note(`waitTicks:${count}`); } });
  } finally {
    try {
      await writeFile(path.join(output, 'capture.json'), JSON.stringify({ baseline, packages, delivered, url, viewport: { width: 1440, height: 900 }, failures, events }, null, 2));
    } finally {
      try {
        // Stop the live canvas before waiting for its recording to finalize.
        if (!page.isClosed()) await page.close();
      } finally {
        try { await context.close(); }
        finally { await browser.close(); }
      }
    }
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [scenarioFile, output] = process.argv.slice(2);
  if (!scenarioFile || !output) throw new Error('Usage: node scripts/capture-guide.mjs scenario.mjs artifacts/handbook/article-id');
  const scenario = (await import(pathToFileURL(path.resolve(scenarioFile)).href)).default;
  await captureGuide({ scenario, output });
}
