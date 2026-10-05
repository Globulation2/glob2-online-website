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
  await expect(page.getByRole('button', { name: /Pause the globs/ })).toBeHidden();
  expect(await page.locator('.colony-video').evaluate(v => getComputedStyle(v).opacity)).toBe('0');
});
