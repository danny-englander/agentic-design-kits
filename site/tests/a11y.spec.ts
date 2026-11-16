import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Scans every page for WCAG 2.1 AA problems in both themes (contrast differs). The site is
// vermilion only, so there is no accent to switch. Each failure lists the rule and the elements
// that broke it.

const THEMES = ['light', 'dark'] as const;
const PAGES = ['/'];

/** Wait for any running CSS animation or transition to finish. */
async function settle(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))));
}

for (const theme of THEMES) {
  test.describe(`${theme} theme`, () => {
    test.use({ colorScheme: theme });

    for (const path of PAGES) {
      test(`${path} has no violations`, async ({ page }) => {
        await page.goto(path);
        await settle(page);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const report = results.violations
          .map((v) => `[${v.impact}] ${v.id}: ${v.help}\n${v.nodes.map((n) => `    - ${n.target.join(' ')}`).join('\n')}`)
          .join('\n\n');
        expect(results.violations.length, report).toBe(0);
      });
    }
  });
}
