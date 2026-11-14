// Symbols in Overused Grotesk beyond letters and figures, for the Type and color page. Read off
// the font's character map (fonts/OverusedGrotesk-VF.woff2), so every one here is in the font.

export interface GlyphGroup {
  id: string;
  title: string;
  use: string;
  chars: string;
}

export const glyphGroups: GlyphGroup[] = [
  {
    id: 'glyphs-arrows',
    title: 'Arrows',
    use: 'Links that leave the site (↗), steps, and directions. Use these before an icon.',
    chars: '←↑→↓↔↕↖↗↘↙↺↻⇄⇆⇋⇌⇐⇑⇒⇓⇔⇕',
  },
  {
    id: 'glyphs-shapes',
    title: 'Shapes',
    use: 'Triangles for jump, play and disclosure; squares, diamonds and circles for markers and status.',
    chars: '▲△▶▷▼▽◀◁■□◆◇◊●○◐◑◒◓◢◣◤◥',
  },
  {
    id: 'glyphs-fractions',
    title: 'Fractions',
    use: 'Single-character fractions. For any other, use the frac feature.',
    chars: '¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟↉',
  },
  {
    id: 'glyphs-math',
    title: 'Math',
    use: 'A true minus (−) and times (×), not a hyphen and an x.',
    chars: '+−×÷±=≠≈≤≥∞√∑∏∫∂∆∈∉∀∃∝⊂°',
  },
  {
    id: 'glyphs-currency',
    title: 'Currency',
    use: 'Every major currency sign, drawn to match the figures.',
    chars: '$¢£¥€₹₽₺₿₩₪₫₦₴₸₱₲₵₡₢₣₤₥₧₨₭₮₯₰₳₶₷₻₼₾₠',
  },
  {
    id: 'glyphs-marks',
    title: 'Marks',
    use: 'Notes, references, quotes and the like.',
    chars: '†‡§¶•‣…‰′″‴©®℗™№℃℉‹›«»¡¿‖',
  },
];

/** A character's code point, as U+2197. */
export const codePoint = (c: string) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`;
