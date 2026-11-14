import { test, expect } from '@playwright/test';

const turning = (page: import('@playwright/test').Page) =>
  page.locator('.rosette svg').evaluate((el) => getComputedStyle(el).animationName !== 'none' && getComputedStyle(el).animationPlayState);

test.describe('with motion allowed', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the rosette turns, and its switch stops it', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('switch', { name: 'Turn the rosette' });
    await expect(toggle).toBeChecked();
    expect(await turning(page)).toBe('running');
    await toggle.uncheck();
    expect(await turning(page)).toBe('paused');
  });

  test('the turning square adds no sideways scroll on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const wider = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(wider).toBe(false);
  });
});

test('with Reduce Motion the rosette stays still, with no switch', async ({ page }) => {
  await page.goto('/');
  expect(await turning(page)).toBe(false);
  await expect(page.getByRole('switch')).toHaveCount(0);
});
