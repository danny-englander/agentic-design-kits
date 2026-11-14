// Draws src/assets/hero.jpg, the rosette as a picture, for the Image entry on the components page
// and the share cards. Same paths as the Rosette component, in the dark theme's paper and rosette
// colors from tokens.json, at 1600×1600.
//   npm run hero-image
// Run it again after changing the rosette's shape or colors, then `npm run share-images`.
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { rosettePaths } from '../../kit/astro/rosette.ts';

type Token = { name: string; value: Record<'light' | 'dark', string> };
const tokens = JSON.parse(readFileSync(new URL('../../tokens.json', import.meta.url), 'utf8'));
const all: Token[] = [...tokens.color.tokens, ...tokens.ornament.tokens];
const dark = (name: string) => all.find((t) => t.name === name)!.value.dark;

const size = 1600;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="${size}" height="${size}">
  <rect width="600" height="600" fill="${dark('paper')}"/>
  <g fill="none" stroke-width="${dark('rosette-line')}">
    <path stroke="${dark('rosette-verdigris')}" d="${rosettePaths.outer}"/>
    <path stroke="${dark('rosette-copper')}" d="${rosettePaths.inner}"/>
    <path stroke="${dark('rosette-verdigris')}" d="${rosettePaths.core}"/>
  </g>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: size, height: size } });
await page.setContent(`<!doctype html><style>* { margin: 0; }</style>${svg}`);
const path = new URL('../src/assets/hero.jpg', import.meta.url).pathname;
await page.screenshot({ path, type: 'jpeg', quality: 88 });
await browser.close();
console.log('Wrote src/assets/hero.jpg');
