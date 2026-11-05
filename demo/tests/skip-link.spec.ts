import { test, expect } from '@playwright/test';

// The skip link, and the one <main> it lands on.

test('the first Tab shows the skip link, and Enter moves past the top bar', async ({ page }) => {
  await page.goto('/forms');
  const link = page.getByRole('link', { name: 'Skip to main content' });
  await expect(link).not.toBeInViewport();

  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  await expect(link).toBeInViewport();

  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(link).not.toBeInViewport();

  await page.keyboard.press('Tab');
  const landedInMain = await page.evaluate(() => document.activeElement?.closest('main') !== null);
  expect(landedInMain).toBe(true);
});

test('every page has one main, with the footer outside it', async ({ page }) => {
  for (const path of ['/', '/work', '/blog', '/blog/one-typeface', '/about', '/forms', '/components', '/agents']) {
    await page.goto(path);
    await expect(page.getByRole('main'), path).toHaveCount(1);
    await expect(page.getByRole('contentinfo'), path).toBeVisible();
  }
});

test('the skip link is out of reach while the menu is open', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Menu/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-menu', 'open');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeHidden();
});
