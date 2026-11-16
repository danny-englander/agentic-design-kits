import { test, expect } from '@playwright/test';

// What the landing page promises: both kits, both install commands for each, and the
// theme toggle switching the page.

test('lists both kits, each linking to its demo', async ({ page }) => {
  await page.goto('/');
  const kits = page.locator('section[aria-labelledby="kits"] li');
  await expect(kits).toHaveCount(2);
  await expect(kits.getByRole('link', { name: 'Swiss Minimal' })).toHaveAttribute('href', 'https://www.swissminimal.ch');
  await expect(kits.getByRole('link', { name: 'Verdigris' })).toHaveAttribute('href', 'https://www.verdigris.ch');
});

test('gives the npm and skills commands for each kit', async ({ page }) => {
  await page.goto('/');
  const install = page.locator('section[aria-labelledby="install"]');
  for (const pkg of ['swiss-minimal', 'verdigris']) {
    await expect(install).toContainText(`npm i @agentic-design-kits/${pkg}`);
    await expect(install).toContainText(`npx skills add danny-englander/agentic-design-kits --skill ${pkg}`);
  }
});

test('the theme toggle switches to dark and remembers it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: /dark theme/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
