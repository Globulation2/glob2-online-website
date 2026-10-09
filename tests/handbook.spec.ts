import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
const slugs = readdirSync('src/content/guides').filter(name => name.endsWith('.md')).map(name => name.slice(0, -3));

test('handbook groups and learning path lead to real chapters', async ({ page }) => {
  await page.goto('/learn/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('handbook');
  await expect(page.getByRole('link', { name: /Read Your first colony/ })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Handbook sections' })).toBeVisible();
  for (const link of await page.locator('.handbook-group a.card').all()) {
    const href = await link.getAttribute('href');
    expect(slugs).toContain(href!.split('/')[2]);
  }
});
for (const slug of slugs) test(`chapter ${slug} has usable navigation and accessible content`, async ({ page }) => {
  await page.goto(`/learn/${slug}/`);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('article')).not.toContainText('[[media:');
  for (const link of await page.getByRole('navigation', { name: 'On this page' }).getByRole('link').all()) {
    const hash = await link.getAttribute('href');
    await expect(page.locator(`[id="${hash!.slice(1)}"]`)).toHaveCount(1);
  }
  const issues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(issues.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
});
test('illustrated pilot delivers same-origin images and controlled clips', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/learn/getting-started/');
  const images = page.locator('article .guide-media img');
  expect(await images.count()).toBeGreaterThan(0);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    await expect(image).toHaveAttribute('alt', /.+/);
  }
  const clip = page.locator('article video').first();
  await expect(clip).toHaveAttribute('controls', '');
  await expect(clip).toHaveAttribute('preload', 'none');
  await expect(clip).toHaveAttribute('poster', /^\/guide-media\/.+\.webp$/);
  expect(requests.some(url => /\.wasm|app\.glob2online\.com/.test(url))).toBe(false);
  expect(requests.some(url => /guide-media\/.+\.mp4/.test(url))).toBe(false);
});
test('media failures preserve captions and article instructions', async ({ page }) => {
  await page.route('**/guide-media/**', route => route.abort());
  await page.goto('/learn/getting-started/');
  const first = page.locator('article figure.guide-media').first();
  await first.scrollIntoViewIfNeeded();
  await expect(first.locator('figcaption')).not.toBeEmpty();
  await expect(first.getByRole('link', { name: 'Open full-size screenshot', exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
});
test('handbook reflows on mobile, at text zoom, and without JavaScript', async ({ browser, page }) => {
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 360, height: 800 });
    for (const route of ['/learn/', '/learn/getting-started/']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  await plain.goto((process.env.SITE_URL ?? 'http://127.0.0.1:4322') + '/learn/getting-started/');
  await expect(plain.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(plain.locator('article figure').first()).toBeVisible();
  await context.close();
});
