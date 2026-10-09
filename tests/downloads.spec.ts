import {test, expect} from '@playwright/test';
import releaseMetadata from '../src/data/release-metadata.json' with {type: 'json'};
import AxeBuilder from '@axe-core/playwright';
for (const colorScheme of ['light', 'dark'] as const) for (const width of [360, 768, 1440]) {
  test(`download choices reflow and remain accessible ${colorScheme} ${width}`, async ({page}) => {
    await page.emulateMedia({colorScheme}); await page.setViewportSize({width, height: 900});
    const requests: string[] = []; page.on('request', request => requests.push(request.url()));
    await page.goto('/downloads/');
    for (const name of ['Windows', 'macOS', 'Linux', 'Android', 'iPhone & iPad', 'Source code']) await expect(page.getByRole('heading', {name, exact: true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    expect(requests.some(url => /api.github.com|\.wasm/.test(url))).toBe(false);
  });
}
test('unpublished downloads do not advertise planned packages', async ({page}) => {
  test.skip(releaseMetadata.manifest !== null, 'A qualified release is now available');
  await page.goto('/downloads/');
  await expect(page.getByText('A verified all-platform release is not published here yet.', {exact: false})).toBeVisible();
  await expect(page.locator('a[href*="/releases/download/"]')).toHaveCount(0);
  await expect(page.getByRole('link', {name: /Play in browser/}).last()).toHaveAttribute('href', 'https://app.glob2online.com/play/');
});
test('platform choices work with JavaScript disabled and keyboard navigation', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false}); const page = await context.newPage();
  await page.goto((process.env.SITE_URL ?? 'http://127.0.0.1:4322') + '/downloads/');
  await expect(page.getByRole('heading', {name: 'Android', exact: true})).toBeVisible();
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', {name: 'Skip to content'})).toBeFocused();
  await context.close();
});
