// Writes .github/readme/infinity.svg, the README's copy of the landing site's infinity sign (the
// guilloché line work in site/src/components/infinity.ts), as one standalone file: azure lines,
// thinner and brighter when the reader's system is in dark mode, as on the site (.hero-art in
// site/src/styles/global.css). Run it again after changing the sign:
//   npm run readme-art
import { writeFileSync } from 'node:fs';
import { infinityPaths, infinityViewBox } from '../site/src/components/infinity.ts';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${infinityViewBox}" role="img" aria-label="Agentic Design Kits: an infinity sign drawn as guilloché line work">
<!-- Made by scripts/readme-art.ts from site/src/components/infinity.ts. Don't edit by hand. -->
<style>
path { fill: none; stroke: #0f8f8c; stroke-width: 0.7; stroke-linejoin: round; }
@media (prefers-color-scheme: dark) { path { stroke: #3fc9c4; stroke-width: 0.5; } }
</style>
<path d="${infinityPaths.outer}"/>
<path d="${infinityPaths.inner}"/>
</svg>
`;
writeFileSync(new URL('../.github/readme/infinity.svg', import.meta.url), svg);
console.log(`Wrote .github/readme/infinity.svg (${(svg.length / 1024).toFixed(0)} KB).`);
