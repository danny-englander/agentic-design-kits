// Draws the landing site's share cards, the picture a link preview shows, at 1200×630:
// public/share-light.png and public/share-dark.png. The name in Overused Grotesk, the line under
// it and the address on the left; on the right, the hero's art on a dark panel: the ADK badge in
// vermilion over the guilloché infinity sign in azure (infinity.ts), as on the page.
//   npm run share-images
// Run it again after changing the name, the line, the colors or the sign.
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { infinityPaths, infinityViewBox } from '../src/components/infinity.ts';

const font = `data:font/woff2;base64,${readFileSync(new URL('../../fonts/OverusedGrotesk-VF.woff2', import.meta.url)).toString('base64')}`;

// paper and ink from tokens.json; the panel is the bar; vermilion's and azure's bright tones,
// which the kit uses on dark surfaces.
const themes = {
  light: { paper: '#f3f0e9', ink: '#0e0e0e', panel: '#0e0e0e' },
  dark: { paper: '#0c0c0c', ink: '#f3f0e9', panel: '#1b1b1a' },
};
const vermilion = '#ff5b3c';
const azure = '#3fc9c4';

const card = ({ paper, ink, panel }: { paper: string; ink: string; panel: string }) => `<!doctype html>
<style>
  @font-face { font-family: "Overused Grotesk"; src: url(${font}) format("woff2"); font-weight: 300 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; display: flex; background: ${paper}; color: ${ink};
         font-family: "Overused Grotesk", sans-serif; }
  .text { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 64px; }
  h1 { font-size: 104px; font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; }
  .foot { border-top: 2px solid ${ink}; padding-top: 20px; }
  .lead { font-size: 24px; line-height: 1.3; }
  .url { margin-top: 12px; font-size: 22px; font-weight: 500; }
  .art { width: 600px; height: 630px; background: ${panel}; display: flex; flex-direction: column;
         align-items: center; justify-content: center; gap: 28px; padding: 0 44px; }
  .ellipse { display: flex; align-items: center; justify-content: center;
             height: 2em; min-width: 3em; padding: 0 0.7em; border: 2.5px solid ${vermilion}; border-radius: 50%;
             color: ${vermilion}; font-size: 36px; font-weight: 700; line-height: 1; letter-spacing: 0.04em; }
  svg { display: block; width: 100%; height: auto; }
  path { fill: none; stroke: ${azure}; stroke-width: 0.55; stroke-linejoin: round; }
</style>
<div class="text">
  <h1>Agentic<br>Design<br>Kits</h1>
  <div class="foot">
    <p class="lead">Design kits your AI agent can implement,<br>for Astro and Tailwind v4.</p>
    <p class="url">agenticdesignkits.com</p>
  </div>
</div>
<div class="art">
  <span class="ellipse">ADK</span>
  <svg viewBox="${infinityViewBox}"><path d="${infinityPaths.outer}"/><path d="${infinityPaths.inner}"/></svg>
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, colors] of Object.entries(themes)) {
  await page.setContent(card(colors));
  await page.evaluate(() => document.fonts.ready);
  const path = new URL(`../public/share-${name}.png`, import.meta.url).pathname;
  await page.screenshot({ path });
  console.log(`Wrote public/share-${name}.png`);
}
await browser.close();
