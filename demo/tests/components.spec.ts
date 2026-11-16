import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The demo's Components page: the chips, the accordions, the dialog, the toast and the phone width.

test('a chip presses alone, and the accordion says what it shows', async ({ page }) => {
  await page.goto('/components');
  const acc = page.locator('details.page-acc');
  await acc.locator('summary').click();
  const group = acc.getByRole('group', { name: 'Category' });
  await group.getByRole('button', { name: /Type/ }).click();
  await expect(group.getByRole('button', { name: /Type/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(group.getByRole('button', { name: /All/ })).toHaveAttribute('aria-pressed', 'false');
  await expect(acc.locator('[data-demo-status]')).toHaveText('Type · 1 item');
});

test('Show toast shows a toast', async ({ page }) => {
  await page.goto('/components');
  await page.getByRole('button', { name: 'Show toast' }).click();
  await expect(page.locator('[data-toast]')).toHaveText('Settings saved.');
  await expect(page.locator('[data-toast]')).toHaveAttribute('data-show', 'true');
});

test('the sample menu opens two levels deep', async ({ page }) => {
  await page.goto('/components');
  const menu = page.locator('[data-panel-page] .menu-list');
  await menu.getByText('Work', { exact: true }).click();
  await menu.getByText('Projects', { exact: true }).click();
  await expect(menu.getByRole('link', { name: 'Field notes' })).toBeVisible();
});

test('the dialog opens modal on Cancel, and Escape brings focus back', async ({ page }) => {
  await page.goto('/components');
  const opener = page.getByRole('button', { name: 'Delete export…' });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Delete this export?' });
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((el) => el.matches(':modal'))).toBe(true);
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('a dialog button closes it and returns its value', async ({ page }) => {
  await page.goto('/components');
  await page.getByRole('button', { name: 'Delete export…' }).click();
  const dialog = page.getByRole('dialog', { name: 'Delete this export?' });
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toBeHidden();
  expect(await page.locator('#cmp-dialog').evaluate((el: HTMLDialogElement) => el.returnValue)).toBe('delete');
  await expect(page.locator('[data-toast]')).toContainText('Export deleted.');
});

test('a click outside the dialog closes it', async ({ page }) => {
  await page.goto('/components');
  await page.getByRole('button', { name: 'Delete export…' }).click();
  const dialog = page.getByRole('dialog', { name: 'Delete this export?' });
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).toBeHidden();
});

for (const theme of ['light', 'dark'] as const) {
  test(`the open dialog has no violations, ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/components');
    await page.getByRole('button', { name: 'Delete export…' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))));
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
}

test('the page never scrolls sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/components');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBe(0);
});

test('the last row a filter leaves showing has no rule', async ({ page }) => {
  await page.goto('/work');
  await page.getByText('Filter by category').click();
  const chips = page.locator('[data-filter]:not([data-filter="all"], [data-filter="favorites"])');
  for (const chip of await chips.all()) {
    await chip.click();
    for (const section of await page.locator('[data-filter-section]:visible').all()) {
      const rules = await section
        .locator('.row:visible')
        .evaluateAll((rows) => rows.map((r) => getComputedStyle(r).borderBottomWidth));
      expect(rules.at(-1)).toBe('0px');
      expect(rules.slice(0, -1).every((w) => w === '1px')).toBe(true);
    }
  }
});

test('a linked row fills only while its link is hovered or focused, and its arrow goes to the same place', async ({ page }) => {
  await page.goto('/components');
  const row = page.locator('.row', { hasText: 'One typeface' });
  await row.scrollIntoViewIfNeeded();
  const fill = () => row.evaluate((r) => getComputedStyle(r).backgroundColor);
  const still = await fill();
  // The subline is plain text: no fill under the pointer there.
  await row.locator('.muted.block').hover();
  await page.waitForTimeout(300); // past the 150ms transition
  expect(await fill()).toBe(still);
  // The title and the arrow are links: the row fills.
  await row.locator('a.title').hover();
  await expect.poll(fill).not.toBe(still);
  await page.mouse.move(0, 0);
  await expect.poll(fill).toBe(still);
  await row.locator('.row-arrow').hover();
  await expect.poll(fill).not.toBe(still);
  await expect(row.locator('a.title')).toHaveCSS('text-decoration-line', 'underline');
  await expect(row.locator('.row-arrow')).toHaveAttribute('href', '/type-and-color/');
  // One stop for the keyboard and one name for screen readers: the title's.
  await expect(row.getByRole('link')).toHaveCount(1);
  await page.mouse.move(0, 0);
  await row.locator('a.title').focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect.poll(fill).not.toBe(still);
});

test('a button to another site ends with the font’s ↗, hidden from screen readers, at its usual height', async ({ page }) => {
  await page.goto('/components');
  const height = (el: HTMLElement) => el.getBoundingClientRect().height;
  // A secondary and a primary one, each beside a plain button of its kind.
  for (const [name, plain] of [
    ['Source on GitHub', page.locator('button.btn-outline:visible', { hasText: 'Last month' }).first()],
    ['Get it on npm', page.locator('button.btn:visible', { hasText: 'Send' }).first()],
  ] as const) {
    const external = page.getByRole('link', { name, exact: true });
    await expect(external.locator('.ext-arrow')).toHaveText('↗');
    await expect(external.locator('.ext-arrow')).toHaveAttribute('aria-hidden', 'true');
    expect(await external.evaluate(height)).toBe(await plain.evaluate(height));
  }
});
