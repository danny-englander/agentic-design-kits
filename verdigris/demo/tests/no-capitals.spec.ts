import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

// Verdigris has no all-caps text and no small caps, for readers who find them hard (see DESIGN.md).
// Checks what visitors get: the built CSS, and every element on the busiest page.

test('the built CSS never uppercases or sets small caps', () => {
  const dir = new URL('../dist/_astro/', import.meta.url);
  const css = readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(new URL(f, dir), 'utf8')).join('');
  expect(css.length).toBeGreaterThan(0);
  expect(css).not.toMatch(/font-variant(-caps)?:[^;}]*(small-caps|all-small-caps|petite-caps|unicase|titling-caps)/);
  expect(css).not.toMatch(/"(smcp|c2sc|pcap|c2pc)"/);
  // --label-case is the only way theme.css uppercases, and Verdigris sets it to none. Tailwind's
  // `uppercase` utility must not be in use either.
  expect(css).not.toMatch(/text-transform:\s*uppercase/);
});

test('nothing on the components page renders in capitals', async ({ page }) => {
  await page.goto('/components');
  const caps = await page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((el) => getComputedStyle(el).textTransform === 'uppercase' || getComputedStyle(el).fontVariantCaps !== 'normal')
      .map((el) => el.tagName),
  );
  expect(caps).toEqual([]);
});
