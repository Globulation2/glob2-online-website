import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const fruit = '/learn/fruit-and-conversion/';
const firstColony = '/learn/getting-started/';
const viewer = (page: import('@playwright/test').Page) => page.getByRole('dialog', { name: 'Article media viewer' });

for (const scheme of ['light', 'dark'] as const) test(`article navigation and content reflow (${scheme})`, async ({ page }) => {
  await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
  for (const width of [360, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(fruit);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const collection = page.locator('.article-rail--collection');
    const contents = page.locator('.article-rail--contents');
    if (width >= 1280) {
      await expect(collection).toBeVisible();
      await expect(contents).toBeVisible();
      await expect(collection.locator('a[aria-current="page"]')).toContainText('Fruit');
      const currentGroup = collection.locator('details').filter({ has: page.locator('a[aria-current="page"]') });
      await expect(currentGroup).toHaveAttribute('open', '');
    } else {
      await expect(contents).toBeHidden();
      await page.getByText('In this article', { exact: true }).click();
      await expect(page.locator('.article-contents-disclosure nav')).toBeVisible();
      if (width < 960) {
        await expect(collection).toBeHidden();
        await page.getByText('Browse handbook', { exact: true }).click();
        await expect(page.getByRole('navigation', { name: 'Browse handbook chapters', exact: true })).toBeVisible();
      } else await expect(collection).toBeVisible();
    }
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('deep links locate content and update current section without losing chapter context', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fruit);
  await page.evaluate(() => document.fonts.ready);
  const link = page.locator('.article-rail--contents a[data-section-link]').nth(1);
  const hash = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${hash}$`));
  await expect(page.locator(hash!)).toBeInViewport();
  await expect(link).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('.article-rail--collection a[aria-current="page"]')).toBeVisible();
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(hash!)).toBeInViewport();
});

test('prose stays readable while instructional scenes can use the wider canvas', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto(firstColony);
  const widths = await page.locator('article').evaluate(article => {
    const prose = article.querySelector(':scope > p')!;
    const scene = [...article.querySelectorAll('figure img')].find(image => Number(image.getAttribute('width')) > 1000)!;
    return { prose: prose.getBoundingClientRect().width, scene: scene.getBoundingClientRect().width, font: parseFloat(getComputedStyle(prose).fontSize) };
  });
  expect(widths.prose / widths.font).toBeLessThan(45);
  expect(widths.scene).toBeGreaterThan(widths.prose);
  await expect(page.locator('article .media-group').first().locator('figure')).toHaveCount(2);
  await expect(page.locator('article .article-callout').first()).not.toBeEmpty();
});

test('references, profiles, and historical editorial pages preserve their purpose and sources', async ({ page }) => {
  await page.goto('/learn/reference-buildings/');
  await expect(page.locator('.article-heading .eyebrow')).toHaveText('Quick reference');
  await expect(page.getByRole('region', { name: /reference table/ }).first()).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Source references' })).toContainText('Reviewed against');
  await page.goto('/learn/ai-econo/');
  await expect(page.locator('.article-heading .eyebrow')).toHaveText('AI profile');
  await page.goto('/archive/legacy-strategy/');
  await expect(page.locator('.article-historical')).toContainText('Historical reading');
  await expect(page.locator('article')).toContainText('last edited 15 August 2017');
  await expect(page.getByRole('link', { name: 'Wiki legal page' })).toHaveAttribute('href', 'https://globulation2.org/wiki/Legal');
  await expect(page.locator('.article-date')).toHaveCount(0);
});

test('native article disclosures and original media work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto(baseURL! + firstColony);
  await page.getByText('In this article', { exact: true }).click();
  await expect(page.locator('.article-contents-disclosure nav')).toBeVisible();
  await page.getByText('Browse handbook', { exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Browse handbook chapters', exact: true })).toBeVisible();
  await expect(page.locator('article video').first()).toHaveAttribute('controls', '');
  const original = page.getByRole('link', { name: 'Open full-size screenshot', exact: true }).first();
  const href = await original.getAttribute('href');
  await original.click();
  await expect(page).toHaveURL(baseURL! + href);
  await context.close();
});

test('image viewer supports inspection, keyboard navigation, focus and scroll restoration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(fruit);
  const origin = page.locator('article a.guide-image-link').first();
  await origin.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => scrollY);
  const errors: string[] = [];
  page.on('console', message => { if (/Content Security Policy|Refused to/.test(message.text())) errors.push(message.text()); });
  await origin.click();
  await expect(viewer(page)).toBeVisible();
  await expect(viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)')).toBeVisible();
  await expect(viewer(page).locator('.pswp__article-caption')).not.toBeEmpty();
  const image = viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)');
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  const fittedWidth = (await image.boundingBox())!.width;
  await page.getByRole('button', { name: /actual size/i }).click();
  await expect.poll(async () => (await image.boundingBox())!.width).toBeGreaterThan(fittedWidth);
  await expect(page.getByRole('button', { name: /actual size/i })).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  const initialSource = await image.getAttribute('src');
  const wrap = viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__zoom-wrap');
  const transform = await wrap.evaluate(element => getComputedStyle(element).transform);
  const box = await image.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  await page.mouse.move(box!.x + box!.width / 2 + 80, box!.y + box!.height / 2 + 60, { steps: 8 });
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await page.mouse.up();
  await expect.poll(() => wrap.evaluate(element => getComputedStyle(element).transform)).not.toBe(transform);
  await page.keyboard.press('ArrowRight');
  await expect(viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)')).not.toHaveAttribute('src', initialSource!);
  await expect(viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)')).toBeVisible();
  for (const key of [...Array(12).fill('Tab'), ...Array(12).fill('Shift+Tab')]) {
    await page.keyboard.press(key);
    expect(await viewer(page).evaluate(dialog => dialog.contains(document.activeElement))).toBe(true);
  }
  const issues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).include('.pswp').analyze();
  expect(issues.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) }))).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(viewer(page)).toBeHidden();
  await expect(origin).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
  expect(errors).toEqual([]);
});

test('expanded native clips transfer playback state and never play two copies', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(firstColony);
  const inline = page.locator('article video').first();
  await inline.scrollIntoViewIfNeeded();
  await inline.evaluate(async (video: HTMLVideoElement) => {
    video.muted = true;
    video.playbackRate = 1.5;
    video.volume = 0.4;
    await video.play();
    video.currentTime = 2;
  });
  const inlineState = await inline.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume, time: video.currentTime }));
  await inline.locator('..').getByRole('link', { name: 'Expand video', exact: false }).click();
  await expect(viewer(page)).toBeVisible();
  await expect.poll(() => inline.evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  const expanded = viewer(page).locator('.pswp__item[aria-hidden="false"] video');
  await expect(expanded).toBeVisible();
  await expect.poll(() => expanded.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  await expect.poll(() => expanded.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThanOrEqual(2);
  const expandedState = await expanded.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume }));
  expect(expandedState.rate).toBe(inlineState.rate);
  expect(expandedState.muted, `Inline state before expansion: ${JSON.stringify(inlineState)}`).toBe(inlineState.muted);
  expect(expandedState.volume).toBeCloseTo(inlineState.volume, 6);
  await expanded.evaluate((video: HTMLVideoElement) => {
    video.pause(); video.currentTime = 3;
    video.playbackRate = 1.25; video.volume = 0.25; video.muted = !video.muted;
  });
  const editedState = await expanded.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume }));
  await page.keyboard.press('Escape');
  await expect(viewer(page)).toBeHidden();
  await expect.poll(() => inline.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeCloseTo(3, 1);
  expect(await inline.evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  const returnedState = await inline.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume }));
  expect(returnedState.rate).toBe(editedState.rate);
  expect(returnedState.muted, `Expanded state before closing: ${JSON.stringify(editedState)}`).toBe(editedState.muted);
  expect(returnedState.volume).toBeCloseTo(editedState.volume, 6);

  await inline.evaluate((video: HTMLVideoElement) => video.play());
  await inline.locator('..').getByRole('link', { name: 'Expand video', exact: false }).click();
  await expect(viewer(page)).toBeVisible();
  const reopened = viewer(page).locator('.pswp__item[aria-hidden="false"] video');
  await expect.poll(() => reopened.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  expect(await inline.evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  expect(await page.locator('video').evaluateAll(videos => videos.filter(video => !(video as HTMLVideoElement).paused).length)).toBe(1);
  const playingState = await reopened.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume, time: video.currentTime }));
  await page.keyboard.press('Escape');
  await expect(viewer(page)).toBeHidden();
  await expect.poll(() => inline.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  const resumedState = await inline.evaluate((video: HTMLVideoElement) => ({ rate: video.playbackRate, muted: video.muted, volume: video.volume, time: video.currentTime }));
  expect(resumedState.rate).toBe(playingState.rate);
  expect(resumedState.muted, `Expanded state while playing: ${JSON.stringify(playingState)}`).toBe(playingState.muted);
  expect(resumedState.volume).toBeCloseTo(playingState.volume, 6);
  expect(resumedState.time).toBeGreaterThanOrEqual(playingState.time - 0.1);
  expect(await page.locator('video').evaluateAll(videos => videos.filter(video => !(video as HTMLVideoElement).paused).length)).toBe(1);
});

test('a failed lazy viewer import follows the original image link', async ({ page }) => {
  await page.goto(firstColony);
  const origin = page.locator('article a.guide-image-link').first();
  const href = await origin.getAttribute('href');
  await page.route('**/_astro/*.js', route => route.abort());
  await origin.click();
  await expect(page).toHaveURL(new RegExp(href! + '$'));
});

test('search filters current and historical articles without indexing repeated rails', async ({ page }) => {
  await page.goto('/search/');
  await page.getByLabel('Search guides, news and the archive').fill('conversion');
  await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
  await expect(page.locator('#search')).toContainText('Player handbook');
  const results = page.locator('.pagefind-ui__result');
  for (const result of await results.all()) {
    await expect(result).not.toContainText('Browse handbook');
    await expect(result).not.toContainText('Back to top');
  }
  await page.getByRole('checkbox', { name: /^Historical/ }).check();
  await expect.poll(async () => page.locator('.pagefind-ui__result-title a').evaluateAll(links => links.length > 0 && links.every(link => /\/(archive|history)\//.test(link.getAttribute('href') ?? '')))).toBe(true);
  for (const link of await page.locator('.pagefind-ui__result-title a').all()) expect(await link.getAttribute('href')).toMatch(/\/(archive|history)\//);
});

test('phone readers can tap to inspect and swipe between examples', async ({ browser, browserName, baseURL }) => {
  // CDP supplies real multi-event touch input; the other projects cover keyboard/native controls.
  test.skip(browserName !== 'chromium', 'Portable Playwright touch input exposes taps only; swipe is exercised with Chromium CDP.');
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(baseURL! + fruit);
  await page.locator('article a.guide-image-link').first().tap();
  await expect(viewer(page)).toBeVisible();
  const image = viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)');
  const source = await image.getAttribute('src');
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  const session = await context.newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 400 }] });
  for (const x of [250, 200, 150, 100]) await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: 400 }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)')).not.toHaveAttribute('src', source!);
  const nextImage = viewer(page).locator('.pswp__item[aria-hidden="false"] .pswp__img:not(.pswp__img--placeholder)');
  await expect.poll(() => nextImage.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  const beforePinch = (await nextImage.boundingBox())!.width;
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 150, y: 400 }, { x: 240, y: 400 }] });
  for (const offset of [20, 40, 60, 80]) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 150 - offset, y: 400 }, { x: 240 + offset, y: 400 }] });
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(async () => (await nextImage.boundingBox())!.width).toBeGreaterThan(beforePinch);
  await page.getByRole('button', { name: /^Close/ }).tap();
  await expect(viewer(page)).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

for (const route of ['/news/browser-development/', '/history/project-history/', '/archive/legacy-strategy/']) test(`editorial reading is accessible at ${route}`, async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('article')).not.toBeEmpty();
  const issues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  expect(issues.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) }))).toEqual([]);
});

test('unavailable enlarged images retain captions and the original-file link', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/guide-media/**/*.webp', route => route.abort());
  await page.goto(fruit);
  const origin = page.locator('article a.guide-image-link').first();
  const href = await origin.getAttribute('href');
  await origin.click();
  await expect(viewer(page)).toBeVisible();
  await expect(viewer(page)).toContainText('This image could not load');
  await expect(viewer(page).getByRole('link', { name: 'Open original image' })).toHaveAttribute('href', new URL(href!, page.url()).href);
  await expect(viewer(page).locator('.pswp__article-caption')).not.toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(origin).toBeFocused();
});

test('unavailable expanded clips retain instructions and a direct clip link', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/guide-media/**/*.mp4', route => route.abort());
  await page.goto(firstColony);
  await page.getByRole('link', { name: 'Expand video', exact: false }).first().click();
  await expect(viewer(page)).toBeVisible();
  await viewer(page).locator('.pswp__item[aria-hidden="false"] video').evaluate((video: HTMLVideoElement) => { void video.play().catch(() => {}); });
  await expect(viewer(page).locator('.pswp__video-error')).toBeVisible();
  await expect(viewer(page).locator('.pswp__video-error').getByRole('link', { name: 'Open gameplay clip' })).toHaveAttribute('href', /\/guide-media\/.+\.mp4$/);
  await expect(viewer(page).locator('.pswp__article-caption')).not.toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(page.locator('article')).toContainText('Tutorial');
});

test('inspecting images does not fetch untouched gameplay clips', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(firstColony);
  await page.waitForLoadState('networkidle');
  const clips: string[] = [];
  page.on('request', request => { if (/\.mp4(?:\?|$)/.test(request.url())) clips.push(request.url()); });
  await page.locator('article a.guide-image-link').first().click();
  await expect(viewer(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(viewer(page)).toBeHidden();
  await page.waitForLoadState('networkidle');
  expect(clips).toEqual([]);
});

test('supported fullscreen inspection exits cleanly when the viewer closes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(fruit);
  test.skip(!await page.evaluate(() => document.fullscreenEnabled), 'This browser does not expose native fullscreen.');
  await page.locator('article a.guide-image-link').first().click();
  await expect(viewer(page)).toBeVisible();
  await page.getByRole('button', { name: 'Toggle fullscreen' }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.getAttribute('role'))).toBe('dialog');
  await page.getByRole('button', { name: /^Close/ }).click();
  await expect(viewer(page)).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
});
