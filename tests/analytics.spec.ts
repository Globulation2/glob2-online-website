import { test, expect } from '@playwright/test';

// Exercise the production host and its real CSP without sending test visits to GA.
async function production(page: import('@playwright/test').Page) {
  const requests: string[] = [];
  await page.route('https://glob2.online/**', async route => {
    const original = new URL(route.request().url());
    const local = new URL(original.pathname + original.search, process.env.SITE_URL ?? 'http://127.0.0.1:4322');
    await route.fulfill({ response: await route.fetch({ url: local.href }) });
  });
  await page.route(/https:\/\/(?:www\.googletagmanager\.com|(?:region1\.)?google-analytics\.com|www\.google-analytics\.com)\//, async route => {
    requests.push(route.request().url());
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
  });
  return requests;
}

test('no analytics before consent; rejection persists and footer reopens settings', async ({ page }) => {
  const requests = await production(page);
  await page.goto('https://glob2.online/');
  await expect(page.locator('#analytics-choice')).toBeVisible();
  expect(requests).toEqual([]);
  expect(await page.context().cookies()).not.toEqual(expect.arrayContaining([expect.objectContaining({ name: '_ga' })]));
  await page.getByRole('button', { name: 'Reject analytics', exact: true }).click();
  await page.reload();
  await expect(page.locator('#analytics-choice')).toBeHidden();
  expect(requests).toEqual([]);
  await page.locator('#analytics-settings').click();
  await expect(page.locator('#analytics-choice')).toBeVisible();
  await expect(page.locator('#analytics-reject')).toBeFocused();
});

test('opt-in sanitizes addresses, sends controlled click events and can be withdrawn', async ({ page }) => {
  const requests = await production(page);
  await page.goto('https://glob2.online/downloads/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=launch_v1&email=private@example.com&search=secret#private', { referer: 'https://www.linkedin.com/private/path?search=secret' });
  await page.locator('#analytics-allow').click();
  await expect.poll(() => requests.length).toBe(1);
  const events = () => page.evaluate(() => (window as any).dataLayer.map((row: unknown[]) => Array.from(row)));
  let queue = await events();
  expect(queue.find((row: any[]) => row[0] === 'config')[2]).toMatchObject({
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_domain: 'none', cookie_expires: 7776000, cookie_update: false,
  });
  expect(queue.find((row: any[]) => row[1] === 'page_view')[2].page_location).toBe('https://glob2.online/downloads/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=launch_v1');
  expect(queue.find((row: any[]) => row[1] === 'page_view')[2].page_referrer).toBe('https://www.linkedin.com');
  expect(queue.find((row: any[]) => row[0] === 'set')[1]).toMatchObject({ send_page_view: false, cookie_domain: 'none' });
  expect(JSON.stringify(queue)).not.toMatch(/private|secret|email=/);
  // Prevent navigation only in this test; the actual click handler never delays links.
  await page.evaluate(() => document.addEventListener('click', e => { if ((e.target as Element).closest('a[href]')) e.preventDefault(); }));
  await page.locator('.storefront-card a').first().click();
  await page.locator('.download-browser a').click();
  await page.locator('.direct-downloads > summary').click();
  await page.locator('.download-packages a').first().click();
  queue = await events();
  for (const name of ['store_click', 'play_click', 'download_click']) expect(queue.some((row: any[]) => row[1] === name)).toBe(true);
  await page.context().addCookies([{ name: '_ga', value: 'test', domain: 'glob2.online', path: '/', secure: true }]);
  await page.locator('#analytics-settings').click();
  await page.locator('#analytics-reject').click();
  await expect(page.locator('#analytics-choice')).toBeHidden();
  await expect.poll(async () => (await page.context().cookies()).some(cookie => cookie.name === '_ga')).toBe(false);
  const count = requests.length;
  await page.reload();
  expect(requests.length).toBe(count);
});

for (const preference of ['doNotTrack', 'globalPrivacyControl']) {
  test(`${preference} keeps analytics off even with saved permission`, async ({ page }) => {
    await page.addInitScript(value => {
      Object.defineProperty(navigator, value, { get: () => value === 'doNotTrack' ? '1' : true });
      localStorage.setItem('glob2-analytics-choice-v1', JSON.stringify({ choice: 'allow', at: Date.now() }));
    }, preference);
    const requests = await production(page);
    await page.goto('https://glob2.online/');
    await page.locator('#analytics-settings').click();
    await expect(page.locator('#analytics-allow')).toBeDisabled();
    expect(requests).toEqual([]);
  });
}

test('expired choices ask again and preview hosts never load Google', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('glob2-analytics-choice-v1', JSON.stringify({ choice: 'allow', at: 0 })));
  const requests = await production(page);
  await page.goto('https://glob2.online/');
  await expect(page.locator('#analytics-choice')).toBeVisible();
  expect(requests).toEqual([]);
  await page.goto('/');
  await page.locator('#analytics-settings').click();
  await page.locator('#analytics-allow').click();
  expect(requests).toEqual([]);
});
