import { test, expect } from '@playwright/test';

// The menu panel's tabs (kit/panel.js): focus follows the tab that opens.

test('opening the menu on a tab puts focus on that tab', async ({ page }) => {
  await page.goto('/#features');
  await expect(page.locator('#tab-features')).toBeFocused();
});

test('a link to another tab inside the open menu moves focus to that tab', async ({ page }) => {
  await page.goto('/#features');
  await expect(page.locator('#tab-features')).toBeFocused();

  // The link sits in the Features tab, which hides when Contact opens, so focus must not stay on it.
  await page.locator('#panel-features').getByRole('link', { name: 'Contact' }).press('Enter');

  await expect(page.locator('#tab-contact')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-contact')).toBeFocused();
});
