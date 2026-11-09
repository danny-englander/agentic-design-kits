// Draws the site's share cards, the picture a link preview shows, at 1200×630:
// public/share-light.png and public/share-dark.png. The name in the kit's typeface and colors
// and the CH badge beside the home page artwork, like the home page's split hero.
//   npm run share-images
// Run it again after changing the name, the line under it, the colors or the artwork.
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const dataUrl = (path: string, type: string) =>
  `data:${type};base64,${readFileSync(new URL(path, import.meta.url)).toString('base64')}`;
const font = dataUrl('../../fonts/OverusedGrotesk-VF.woff2', 'font/woff2');
const art = dataUrl('../src/assets/hero.jpg', 'image/jpeg');

// paper and ink from tokens.json
const themes = {
  light: { paper: '#f3f0e9', ink: '#0e0e0e' },
  dark: { paper: '#0c0c0c', ink: '#f3f0e9' },
};

const card = ({ paper, ink }: { paper: string; ink: string }) => `<!doctype html>
<style>
  @font-face { font-family: "Overused Grotesk"; src: url(${font}) format("woff2"); font-weight: 300 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; display: flex; background: ${paper}; color: ${ink};
         font-family: "Overused Grotesk", sans-serif; }
  .text { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 64px; }
  h1 { font-size: 132px; font-weight: 700; line-height: 0.88; letter-spacing: -0.02em; }
  .ellipse { display: flex; align-items: center; justify-content: center; align-self: flex-start;
             height: 2em; min-width: 3em; padding: 0 0.7em; border: 2.5px solid ${ink}; border-radius: 50%;
             font-size: 36px; font-weight: 700; line-height: 1; letter-spacing: 0.04em; }
  .foot { border-top: 2px solid ${ink}; padding-top: 20px; }
  .lead { font-size: 24px; line-height: 1.3; white-space: nowrap; }
  .url { margin-top: 12px; font-size: 20px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
  img { width: 630px; height: 630px; object-fit: cover; display: block; }
</style>
<div class="text">
  <h1>Swiss<br>Minimal</h1>
  <span class="ellipse">CH</span>
  <div class="foot">
    <p class="lead">A design kit your AI agent can implement.<br>Type-led, flat color, thick rules.</p>
    <p class="url">swissminimal.ch</p>
  </div>
</div>
<img src="${art}" alt="">`;

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
