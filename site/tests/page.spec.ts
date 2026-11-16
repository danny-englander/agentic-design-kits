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

test('a kit row links its name and its arrow, and leaves its description as selectable text', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('section[aria-labelledby="kits"] li');
  for (const [i, href] of ['https://www.swissminimal.ch/', 'https://www.verdigris.ch/'].entries()) {
    const row = rows.nth(i);
    await row.scrollIntoViewIfNeeded();
    /** The link, if any, under the middle of a part of the row. */
    const linkAt = async (selector: string) => {
      const box = (await row.locator(selector).first().boundingBox())!;
      return page.evaluate(
        ([x, y]) => document.elementFromPoint(x, y)?.closest('a')?.href ?? null,
        [box.x + box.width / 2, box.y + box.height / 2],
      );
    };
    expect(await linkAt('.title')).toBe(href);
    expect(await linkAt('svg')).toBe(href);
    expect(await linkAt('.muted.block')).toBeNull();
    // One stop for the keyboard and one name for screen readers: the kit's.
    await expect(row.getByRole('link')).toHaveCount(1);
  }
});
