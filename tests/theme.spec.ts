import { test, expect } from '@playwright/test';

for (const preference of ['light', 'dark']) {
  test(`saved ${preference} overrides the opposite OS theme before paint and across navigation`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: preference === 'light' ? 'dark' : 'light', reducedMotion: 'reduce' });
    await page.addInitScript(value => localStorage.setItem('glob2-theme-v2', value), preference);
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', preference);
    const background = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim());
    await page.setViewportSize({ width: 360, height: 800 });
    const scrim = await page.locator('.hero-colony').evaluate(el => getComputedStyle(el, '::after').backgroundImage);
    expect(scrim).not.toContain('241, 241, 225');
    expect(scrim).not.toContain('27, 18, 41');
    await expect(page.locator('.colony-motion')).toBeHidden();
    await page.goto('/game/');
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim())).toBe(background);
    await expect(page.locator('.theme-toggle svg')).toBeVisible();
  });
}

test('theme control cycles system, light, dark with keyboard and refreshes local preference on return', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('.theme-toggle');
  await toggle.focus();
  for (const value of ['light', 'dark', 'system']) {
    await page.keyboard.press('Enter');
    expect(await page.evaluate(() => localStorage.getItem('glob2-theme-v2'))).toBe(value);
  }
  await page.evaluate(() => { localStorage.setItem('glob2-theme-v2', 'dark'); dispatchEvent(new Event('pageshow')); });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ forcedColors: 'active' });
  await expect(toggle).toBeVisible();
});
