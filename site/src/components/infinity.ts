// The hero's infinity sign as engraved line work: a lemniscate of Bernoulli, traced by bands of
// wavy strands, each strand the same wave shifted along the curve, so they cross into a lattice
// the way a guilloché ring does (the Verdigris rosette is built the same way). HeroArt.astro
// draws it at build time. Units are the view box's: 400 wide, the sign centered on (200, 120).
const CX = 200;
const CY = 120;
const A = 172; // half the sign's width, at the curve's center line
const W = 26; // the wide band's reach either side of the curve

// A point on the lemniscate, t from 0 to 2π, and the unit normal there.
function lemniscate(t: number) {
  const d = 1 + Math.sin(t) ** 2;
  return [(A * Math.cos(t)) / d, (A * Math.sin(t) * Math.cos(t)) / d];
}
function normal(t: number) {
  const h = 1e-4;
  const [x1, y1] = lemniscate(t - h);
  const [x2, y2] = lemniscate(t + h);
  const len = Math.hypot(x2 - x1, y2 - y1);
  return [-(y2 - y1) / len, (x2 - x1) / len];
}

// One strand: the curve pushed out along its normal by a sine wave of `waves` crests per lap.
function strand(width: number, waves: number, phase: number, points: number) {
  const at: string[] = [];
  for (let i = 0; i < points; i += 1) {
    const t = (2 * Math.PI * i) / points;
    const [x, y] = lemniscate(t);
    const [nx, ny] = normal(t);
    const r = width * Math.sin(waves * t + phase);
    at.push(`${(CX + x + r * nx).toFixed(1)} ${(CY + y + r * ny).toFixed(1)}`);
  }
  return `M${at.join('L')}Z`;
}
const band = (strands: number, width: number, waves: number, points: number) =>
  Array.from({ length: strands }, (_, i) => strand(width, waves, (2 * Math.PI * i) / strands, points)).join('');

/** Path data: a wide band of slow waves, and a narrow one of quick waves along its spine. */
export const infinityPaths = {
  outer: band(12, W, 28, 420),
  inner: band(6, 9, 56, 420),
};

// The view box: the strands' bounds, with the same margin on every side, so a full-width figure on
// a phone leaves no empty band.
const MARGIN = 10;
const nums = Object.values(infinityPaths).join('').match(/-?\d+(\.\d+)?/g)!.map(Number);
const xs = nums.filter((_, i) => i % 2 === 0);
const ys = nums.filter((_, i) => i % 2 === 1);
const [x0, y0] = [Math.min(...xs) - MARGIN, Math.min(...ys) - MARGIN];
export const infinityViewBox = [x0, y0, Math.max(...xs) + MARGIN - x0, Math.max(...ys) + MARGIN - y0]
  .map((n) => Math.round(n))
  .join(' ');
