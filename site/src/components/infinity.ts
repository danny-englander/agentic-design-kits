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

// One band: `strands` strands, each the curve pushed out along its normal by a sine wave of
// `waves` crests per lap, each wave shifted by a step of the same size, so the strands cross into
// a lattice. The points on the curve and their normals are worked out once; `at(s)` draws the band
// with every wave slid along the curve by `s` (in the curve's own parameter, 0 to 2π): the band's
// outline stays where it is while the lattice inside it flows. HeroArt.astro's script moves `s`.
function band(strands: number, width: number, waves: number, points: number) {
  const base = Array.from({ length: points }, (_, i) => {
    const t = (2 * Math.PI * i) / points;
    return { t, at: lemniscate(t), n: normal(t) };
  });
  return (s = 0) => {
    let d = '';
    for (let k = 0; k < strands; k += 1) {
      const phase = (2 * Math.PI * k) / strands;
      d += 'M';
      for (let i = 0; i < points; i += 1) {
        const { t, at, n } = base[i];
        const r = width * Math.sin(waves * (t - s) + phase);
        d += `${i ? 'L' : ''}${(CX + at[0] + r * n[0]).toFixed(1)} ${(CY + at[1] + r * n[1]).toFixed(1)}`;
      }
      d += 'Z';
    }
    return d;
  };
}

/** The sign's two bands, drawn at a shift `s` along the curve: a wide band of slow waves, and a
    narrow one of quick waves along its spine. Both use the same `s`, so their crests travel at
    the same speed. */
export const infinityBands = {
  outer: band(12, W, 28, 420),
  inner: band(6, 9, 56, 420),
};

/** Path data, at rest: what the page draws at first, and the README art and share cards. */
export const infinityPaths = {
  outer: infinityBands.outer(),
  inner: infinityBands.inner(),
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
