import { test, expect } from '@playwright/test';

// The shared hover and focus for links underlined at rest: the underline thickens to 2px. It must
// reach every such link and nothing else, buttons above all: a button never matches it, so its
// hover is untouched.

/** The links the rule in theme.css names, without the state. Keep in step with it. */
const UNDERLINED = ':is(a.link, .row a.title, .post-body a:not([data-footnote-ref]), .site-footer-note a):not(.btn, .btn-outline)';
const PAGES = ['/', '/work', '/blog/an-agent-built-this', '/components', '/forms', '/about', '/agents'];

for (const path of PAGES) {
  test(`${path}: only links underlined at rest take the underline hover`, async ({ page }) => {
    await page.goto(path);
    const wrong = await page.evaluate((sel) => {
      return [...document.querySelectorAll<HTMLElement>(sel)]
        // A link underlined at rest, and never a button, whatever it is built from.
        .filter(
          (el) =>
            el.tagName !== 'A' ||
            getComputedStyle(el).textDecorationLine !== 'underline' ||
            el.matches('.btn, .btn-outline, .btn-outline--tertiary, .topbar-btn, .icon-btn, .chip, .row-arrow, [role="button"]'),
        )
        .map((el) => el.outerHTML.slice(0, 120));
    }, UNDERLINED);
    expect(wrong).toEqual([]);
  });
}

test('an underlined link thickens on hover and on keyboard focus', async ({ page }) => {
  await page.goto('/blog/an-agent-built-this');
  const link = page.locator('.post-body p a:not([data-footnote-ref])').first();
  await link.scrollIntoViewIfNeeded();
  const thickness = () => link.evaluate((a) => getComputedStyle(a).textDecorationThickness);
  const rest = await thickness();
  expect(rest).not.toBe('2px');
  await link.hover();
  await expect.poll(thickness).toBe('2px');
  await page.mouse.move(0, 0);
  await expect.poll(thickness).toBe(rest);
  await link.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect.poll(thickness).toBe('2px');
});

