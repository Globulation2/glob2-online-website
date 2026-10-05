import { test, expect } from '@playwright/test';

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
  const requests: string[] = [];
  page.on('request', request => { if (request.url().endsWith('.mp4')) requests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.colony-video').getAttribute('src')).toBeNull();
  expect(requests).toEqual([]);
  await page.route('**/*.mp4', route => route.abort());
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  await expect.poll(() => page.locator('.colony-video').evaluate((v: HTMLVideoElement) => v.error?.code ?? 0)).not.toBe(0);
  await expect(page.getByRole('button', { name: /Pause the globs/ })).toBeHidden();
  expect(await page.locator('.colony-video').evaluate(v => getComputedStyle(v).opacity)).toBe('0');
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
