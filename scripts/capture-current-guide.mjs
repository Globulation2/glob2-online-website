/** Capture real public-game actions against a hash-qualified observed payload. */
import { chromium } from '@playwright/test';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const defaultBaseline = new URL('./handbook-scenarios/observed-baseline.json', import.meta.url);

export async function captureCurrentGuide({ scenario, output, baselinePath = defaultBaseline }) {
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  const url = new URL(baseline.url);
  if (url.origin !== 'https://app.glob2.online') throw Error('Use the public game origin');
  const directory = path.resolve(output);
  const repository = fileURLToPath(new URL('../', import.meta.url));
  if (!path.relative(repository, directory).startsWith(`artifacts${path.sep}`)) throw Error('Capture output must be an ignored artifacts subdirectory');
  try {
    await access(path.join(directory, 'capture.json'));
    throw Error('A capture record already exists; choose a new output directory');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await mkdir(directory, { recursive: true });
  const record = { baseline, started: new Date().toISOString(), viewport: { width: 1440, height: 900 }, events: [], packages: [], downloads: [], errors: [], complete: false };
  const pending = [];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: record.viewport, recordVideo: { dir: path.join(directory, 'raw-video'), size: record.viewport }, acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => record.errors.push(String(error)));
  // Forward the original decoded public module bytes unchanged. Reading a large
  // WASM through the inspector after streaming compilation can evict its body.
  // Transparent request forwarding permits a hash check before browser delivery;
  // only transport encoding/length headers change, never game code or state.
  await context.route('**/play/index.*', async route => {
    const name = new URL(route.request().url()).pathname.split('/').at(-1);
    if (!baseline.packages[name]) return route.continue();
    try {
      const response = await route.fetch({ timeout: 60000, maxRedirects: 0 });
      const bytes = await response.body();
      const observed = { name, url: response.url(), status: response.status(), bytes: bytes.length, sha256: hash(bytes), etag: response.headers()['etag'] ?? null, delivery: 'Original public response bytes forwarded unchanged after integrity verification' };
      record.packages.push(observed);
      if (observed.status !== 200 || observed.bytes !== baseline.packages[name].bytes || observed.sha256 !== baseline.packages[name].sha256) throw Error(`Delivered package mismatch: ${name}`);
      const headers = { ...response.headers() };
      delete headers['content-encoding'];
      delete headers['content-length'];
      await route.fulfill({ status: response.status(), headers, body: bytes });
    } catch (error) {
      record.errors.push(String(error));
      await route.abort();
    }
  });
  page.on('download', download => {
    pending.push((async () => {
      const filename = path.basename(download.suggestedFilename()).replace(/[^a-zA-Z0-9._-]/g, '-');
      const target = path.join(directory, 'downloads', `${record.downloads.length + 1}-${filename}`);
      await mkdir(path.dirname(target), { recursive: true });
      await download.saveAs(target);
      const bytes = await readFile(target);
      record.downloads.push({ filename: path.relative(directory, target), bytes: bytes.length, sha256: hash(bytes) });
    })().catch(error => record.errors.push(String(error))));
  });
  const state = () => page.evaluate(() => glob2Diagnostics.snapshot());
  const note = async (action, detail = {}) => {
    const snapshot = await state();
    record.events.push({ seconds: (Date.now() - Date.parse(record.started)) / 1000, action, ...detail, snapshot });
    return snapshot;
  };
  const control = async key => {
    await page.waitForFunction(key => { const c = glob2Diagnostics.snapshot().controls[key]; return c?.enabled && c.visible?.w > 0 && c.visible?.h > 0; }, key, { timeout: 60000 });
    const c = (await state()).controls[key], v = c.visible;
    await page.mouse.click((v.x + v.w / 2) * 1440 / c.surface.w, (v.y + v.h / 2) * 900 / c.surface.h);
    await page.waitForTimeout(250);
    return note(`control:${key}`);
  };
  const click = async (x, y, options = {}) => {
    await page.mouse.click(x, y, options);
    await page.waitForTimeout(200);
    return note('click', { x, y, options });
  };
  const key = async name => {
    await page.locator('#canvas').press(name, { delay: 80 });
    await page.waitForTimeout(200);
    return note(`key:${name}`);
  };
  const screenshot = async name => {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) throw Error('Use a lowercase capture name');
    const snapshot = await note(`screenshot:${name}`);
    await page.screenshot({ path: path.join(directory, `${name}.png`) });
    await writeFile(path.join(directory, `${name}.json`), JSON.stringify(snapshot, null, 2) + '\n');
    return snapshot;
  };
  const waitTicks = async count => {
    const initial = (await state()).tick;
    await page.waitForFunction(target => glob2Diagnostics.snapshot().tick >= target, initial + count, { timeout: 60000 });
    return note(`waitTicks:${count}`);
  };
  try {
    await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => window.glob2Diagnostics && glob2Diagnostics.snapshot().screen !== 'loading', null, { timeout: 120000 });
    if ((await state()).controls['intro/menu']) await control('intro/menu');
    await page.waitForFunction(() => glob2Diagnostics.snapshot().controls['menu/3']?.enabled, null, { timeout: 60000 });
    if (url.searchParams.get('renderer') === 'webgl2') {
      await page.waitForFunction(() => { const s = glob2Diagnostics.snapshot(); return s.renderer === 'webgl2' && s.assets.hd === 'ready'; }, null, { timeout: 180000 });
    }
    // A screen identity can precede its first fully presented frame.
    await page.waitForTimeout(3000);
    await Promise.all(pending);
    for (const name of Object.keys(baseline.packages)) {
      if (!record.packages.some(item => item.name === name && item.sha256 === baseline.packages[name].sha256)) throw Error(`Unqualified delivered package: ${name}`);
    }
    if (record.errors.length) throw Error('Payload qualification or startup failed');
    await note('ready');
    await scenario({ page, context, state, note, control, click, key, screenshot, waitTicks, output: directory, baseline });
    await Promise.all(pending);
    if (record.errors.length) throw Error('Capture recorded errors');
    record.complete = true;
  } catch (error) {
    record.errors.push(String(error));
    if (!page.isClosed()) await page.screenshot({ path: path.join(directory, 'capture-error.png') });
    throw error;
  } finally {
    // Finish browser footage after stopping its live game canvas.
    await page.close();
    await context.close();
    await Promise.allSettled(pending);
    record.finished = new Date().toISOString();
    await writeFile(path.join(directory, 'capture.json'), JSON.stringify(record, null, 2) + '\n');
    await browser.close();
  }
  return record;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [scenarioFile, output] = process.argv.slice(2);
  if (!scenarioFile || !output) throw Error('Usage: node scripts/capture-current-guide.mjs scenario.mjs artifacts/handbook/family');
  const scenario = (await import(pathToFileURL(path.resolve(scenarioFile)).href)).default;
  await captureCurrentGuide({ scenario, output });
}
