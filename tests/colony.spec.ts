import { test, expect } from '@playwright/test';

for (const extension of ['webm', 'mp4']) test(`colony ${extension} supports byte ranges used by media playback`, async ({ request }) => {
  const url = `/hero/colony-1656p-2026-11-26.${extension}`;
  const head = await request.head(url);
  const size = Number(head.headers()['content-length']);
  expect(head.headers()['content-type']).toBe(`video/${extension}`);
  expect(head.headers()['accept-ranges']).toBe('bytes');
  for (const [range, start, end] of [['bytes=0-31', 0, 31], ['bytes=-32', size - 32, size - 1]]) {
    const response = await request.get(url, { headers: { Range: String(range) } });
    expect(response.status()).toBe(206);
    expect(response.headers()['content-range']).toBe(`bytes ${start}-${end}/${size}`);
    expect((await response.body()).length).toBe(32);
  }
  const invalid = await request.get(url, { headers: { Range: `bytes=${size}-` } });
  expect(invalid.status()).toBe(416);
  expect(invalid.headers()['content-range']).toBe(`bytes */${size}`);
});

const loopRequest = /\/hero\/colony-\d+p-2026-11-26\.(webm|mp4)$/;

for (const { width, height, dpr, source } of [
  { width: 880, height: 680, dpr: 1, source: 900 },
  { width: 880, height: 680, dpr: 2, source: 1656 },
  { width: 1920, height: 900, dpr: 1, source: 1656 },
  { width: 390, height: 844, dpr: 3, source: 1656 },
]) test(`colony chooses ${source}p at ${width}×${height} and ${dpr}× density`, async ({ browser, baseURL }) => {
  const page = await browser.newPage({ baseURL, viewport: { width, height }, deviceScaleFactor: dpr });
  try {
    const requests = new Set<string>();
    await page.route(loopRequest, route => {
      requests.add(new URL(route.request().url()).pathname);
      return route.continue();
    });
    await page.goto('/');
    const video = page.locator('.colony-video');
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.videoHeight)).toBe(source);
    expect([...requests]).toEqual([`/hero/colony-${source}p-2026-11-26.webm`]);
  } finally {
    await page.close();
  }
});

test('colony plays the H.264 version of the selected tier if VP9 fails', async ({ page }) => {
  await page.route(/\/hero\/.*\.webm$/, route => route.abort());
  await page.goto('/');
  const video = page.locator('.colony-video');
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused ? '' : v.currentSrc)).toMatch(/\/hero\/colony-\d+p-2026-11-26\.mp4$/);
});

test('real colony video pauses and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('.colony-video');
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0)).toBe(true);
  await page.getByRole('button', { name: /Pause the globs/ }).click();
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.getByRole('button', { name: /Let the globs roam/ }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await expect(video).toBeHidden();
  await expect(page.getByRole('button', { name: /Pause the globs/ })).toBeHidden();
});

test('reduced motion never requests the video and failure retains a poster', async ({ page }) => {
  const requests = new Set<string>();
  await page.route(loopRequest, route => {
    requests.add(route.request().url());
    return route.abort();
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.colony-video source')).toHaveCount(0);
  expect(requests.size).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => requests.size).toBe(2);
  await expect.poll(() => page.locator('.colony-video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await expect(page.getByRole('button', { name: /Pause the globs/ })).toBeHidden();
  expect(await page.locator('.colony-video').evaluate(v => getComputedStyle(v).opacity)).toBe('0');
  await expect(page.locator('.hero-colony')).toHaveCSS('background-image', /colony-2026-11-26\.webp/);
});

test('pause keeps the resume control when a pending play is cancelled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(`
    const originalPlay = HTMLMediaElement.prototype.play;
    let firstPlay = true;
    HTMLMediaElement.prototype.play = function () {
      const started = originalPlay.call(this);
      if (!firstPlay) return started;
      firstPlay = false;
      // Model WebKit starting playback before its play promise settles.
      return new Promise((resolve, reject) => {
        this.addEventListener('pause', () => {
          this.setAttribute('data-play-aborted', 'true');
          reject(new DOMException('Playback cancelled by pause', 'AbortError'));
        }, { once: true });
        started.catch(reject);
      });
    };
`);
  await page.goto('/');
  const video = page.locator('.colony-video');
  await page.getByRole('button', { name: /Pause the globs/ }).click();
  await expect(video).toHaveAttribute('data-play-aborted', 'true');
  const resume = page.getByRole('button', { name: /Let the globs roam/ });
  await expect(resume).toBeVisible({ timeout: 2000 });
  await resume.click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
});
