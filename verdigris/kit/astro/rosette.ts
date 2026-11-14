// The rosette's geometry: three bands of wavy rings in a 600-unit square. Rosette.astro draws it
// in the page; demo/scripts/hero-image.ts draws the same paths into a picture.
function wave(radius: number, depth: number, waves: number, phase: number, points: number) {
  const at: string[] = [];
  for (let i = 0; i < points; i += 1) {
    const angle = (2 * Math.PI * i) / points;
    const r = radius + depth * Math.sin(waves * angle + phase);
    at.push(`${(300 + r * Math.cos(angle)).toFixed(1)} ${(300 + r * Math.sin(angle)).toFixed(1)}`);
  }
  return `M${at.join('L')}Z`;
}
const band = (curves: number, radius: number, depth: number, waves: number, points: number) =>
  Array.from({ length: curves }, (_, i) => wave(radius, depth, waves, (2 * Math.PI * i) / curves, points)).join('');

/** The path data for each band: the outer ring and the core in verdigris, the inner ring in copper. */
export const rosettePaths = {
  outer: band(12, 262, 24, 18, 216),
  inner: band(12, 150, 46, 9, 126),
  core: band(8, 52, 20, 6, 72),
};
