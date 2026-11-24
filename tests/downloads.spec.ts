import {test, expect} from '@playwright/test';
import releaseMetadata from '../src/data/release-metadata.json' with {type: 'json'};
import experimentalRelease from '../src/data/experimental-release.json' with {type: 'json'};
import downloadChannels from '../src/data/download-channels.json' with {type: 'json'};
import AxeBuilder from '@axe-core/playwright';
for (const colorScheme of ['light', 'dark'] as const) for (const width of [360, 768, 1440]) {
  test(`download choices reflow and remain accessible ${colorScheme} ${width}`, async ({page}) => {
    await page.addInitScript(() => localStorage.setItem('glob2-theme-v2', 'system'));
    await page.emulateMedia({colorScheme}); await page.setViewportSize({width, height: 900});
    const requests: string[] = []; page.on('request', request => requests.push(request.url()));
    await page.goto('/downloads/');
    await page.locator('.direct-downloads > summary').click();
    for (const name of ['Windows', 'macOS', 'Linux', 'Android', 'iPhone & iPad', 'Source code']) await expect(page.getByRole('heading', {name, exact: true}).last()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    expect(requests.some(url => /api.github.com|\.wasm/.test(url))).toBe(false);
  });
}
test('downloads present the selected release with public package links', async ({page}) => {
  test.skip(releaseMetadata.manifest !== null, 'A qualified release is now available');
  await page.goto('/downloads/');
  await page.locator('.direct-downloads > summary').click();
  await expect(page.getByRole('heading', {name: `Release ${experimentalRelease.version}`, exact: true})).toBeVisible();
  await expect(page.locator('a[href*="/releases/download/"]')).toHaveCount(experimentalRelease.packages.length + experimentalRelease.sources.length);
  await expect(page.locator('main')).not.toContainText(/experimental|early testing|testing is still in progress/i);
  await expect(page.locator('main')).not.toContainText('same qualified release');
  for (const pkg of experimentalRelease.packages) await expect(page.locator(`a[href="${pkg.url}"]`)).toBeVisible();
  await expect(page.getByRole('link', {name: /Play in browser/}).last()).toHaveAttribute('href', 'https://app.glob2.online/play/');
});
test('platform choices work with JavaScript disabled and keyboard navigation', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled: false}); const page = await context.newPage();
  await page.goto((process.env.SITE_URL ?? 'http://127.0.0.1:4322') + '/downloads/');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', {name: 'Skip to content'})).toBeFocused();
  await page.locator('.direct-downloads > summary').click();
  await expect(page.getByRole('heading', {name: 'Android', exact: true})).toBeVisible();
  await context.close();
});

test('store releases lead the journey while browser and packages remain alternatives', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.hero .actions .primary')).toHaveAttribute('href','/downloads/');
  await expect(page.locator('.hero .actions .secondary')).toHaveAttribute('href','https://app.glob2.online/play/');
  await page.locator('.hero .actions .primary').click();
  for (const url of ['https://apps.microsoft.com/detail/9PH4FCRMX19F','https://apps.apple.com/us/app/globulation-2/id6817603328','https://snapcraft.io/globulation2']) await expect(page.locator(`.storefront-section a[href="${url}"]`)).toBeVisible();
  await expect(page.locator('.direct-downloads')).not.toHaveAttribute('open','');
  await expect(page.locator('a[href*="play.google.com"],a[href*="store.epicgames.com"]')).toHaveCount(0);
});

test('Linux release files and distribution projects are distinct and visible', async ({page}) => {
  await page.goto('/downloads/');
  const linux = page.getByRole('region', {name:'Linux', exact:true});
  await expect(linux).toBeVisible();
  await expect(page.locator('.direct-downloads')).not.toHaveAttribute('open','');
  const release = releaseMetadata.manifest ?? experimentalRelease;
  const withdrawn = new Set<string>(downloadChannels.withdrawnPackages);
  const files = release.packages.filter(pkg => pkg.platform === 'linux' && !withdrawn.has(pkg.filename));
  for (const pkg of files) await expect(linux.locator(`a[href="${pkg.url}"]`)).toBeVisible();
  await expect(linux.getByRole('link', {name:'Track distribution packaging ↗'})).toHaveAttribute('href', 'https://github.com/Globulation2/glob2/issues/1311');
  const logos = linux.locator('.distro-list img');
  await expect(logos).toHaveCount(6);
  for (const logo of await logos.all()) {
    await expect(logo).toHaveAttribute('alt', '');
    expect(await logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
});

test('Android closed-test recruitment links to the signup form from home and downloads', async ({page}) => {
  const form = 'https://forms.gle/EK7fjtPZAryyHwhn6';
  await page.goto('/');
  await expect(page.locator(`section.android-testing a[href="${form}"]`)).toBeVisible();
  await page.goto('/downloads/');
  await expect(page.locator(`.storefront-section .android-testing a[href="${form}"]`)).toBeVisible();
  await expect(page.locator(`.direct-downloads a[href="${form}"]`)).toHaveCount(1);
});
