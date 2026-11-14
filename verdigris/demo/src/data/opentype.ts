// Cormorant's OpenType features, for the Type and color page: what each one changes, a sample
// that shows it, and the CSS. Read off the variable font files (fonts/Cormorant-VF.woff2 and
// fonts/Cormorant-Italic-VF.woff2) with fontTools, so each line names the letters it really changes.

/** A run of sample text; `on` marks the part the feature applies to (all of it, unless some are marked). */
export interface Part {
  text: string;
  on?: boolean;
}

export interface Feature {
  tag: string;
  name: string;
  /** One line on what it changes. */
  does: string;
  sample: Part[];
  /** Which file has it. */
  face: 'both' | 'upright' | 'italic';
  /** The `font-variant-*` line that does the same, where CSS has one. */
  variant?: string;
  /** For a feature that is on by default: the card shows it turned off. */
  onByDefault?: boolean;
  /** What the card compares against, when the font's own default already looks like the feature. */
  baseline?: { label: string; value: string };
  /** Show Aa to Zz as well, off and on. */
  alphabet?: boolean;
  /** Set the sample as a small table of prices. */
  table?: boolean;
}

export interface Group {
  id: string;
  title: string;
  intro?: string;
  /** Show the default glyph beside these variants, very large, before the cards. */
  trio?: { glyph: string; tags: [string, string]; italic?: boolean };
  features: Feature[];
}

const all = (text: string): Part[] => [{ text }];

export const groups: Group[] = [
  {
    id: 'ot-ligatures',
    title: 'Ligatures',
    features: [
      {
        tag: 'dlig',
        name: 'Discretionary ligatures',
        does: 'Joins c and t, s and t, s and p, r and t, t and t, f and u, and Q and y. Verdigris sets it on headings already; keep it to display sizes.',
        sample: all('Art, Act, Rest, Aspen, Attic, fun, effusive, Qy, ſt'),
        face: 'both',
        variant: 'font-variant-ligatures: discretionary-ligatures;',
      },
      {
        tag: 'hlig',
        name: 'Historical ligatures',
        does: 'Two old joins: long s with t, and t with z. Display sizes only.',
        sample: all('Blitz, Waltz, Ritz, ſt'),
        face: 'both',
        variant: 'font-variant-ligatures: historical-ligatures;',
      },
      {
        tag: 'liga',
        name: 'Standard ligatures',
        does: 'Joins f with i, l and another f. It is on by default, so this card turns it off.',
        sample: all('office, flight, waffle, affluent'),
        face: 'both',
        onByDefault: true,
        variant: 'font-variant-ligatures: no-common-ligatures;',
      },
    ],
  },
  {
    id: 'ot-sets',
    title: 'Stylistic sets',
    intro: 'The font gives its sets no names, so each card says which letters it changes.',
    features: [
      {
        tag: 'ss01',
        name: 'Capitals A B J K Q R U, and g',
        does: 'Calligraphic capitals with long, sweeping strokes, and a different g. Display sizes only.',
        sample: all('Quirky Burr, Jakarta, Ursa, a big gig'),
        face: 'both',
        alphabet: true,
      },
      {
        tag: 'ss02',
        name: 'A C G R, a e g, and 1',
        does: 'Garamond forms, with more open a and e for reading. Verdigris sets body text with this on.',
        sample: all('Cage, Quaint, Gallery, area 1'),
        face: 'both',
        alphabet: true,
      },
      {
        tag: 'ss03',
        name: 'U W, and a g w y',
        does: 'Another U and W, and a single-storey a and g, with w and y to match.',
        sample: all('a gallant wagon, Upper Wales, yawning'),
        face: 'both',
        alphabet: true,
      },
      {
        tag: 'ss04',
        name: 'Umlaut dots',
        does: 'Changes how the two dots over ä, ö and ü are drawn.',
        sample: all('Ärger, Öl, Über, schön'),
        face: 'both',
      },
      {
        tag: 'ss13',
        name: 'Accents on capitals',
        does: 'Changes the accents on capital letters, such as É, Č and Ú. Lowercase accents stay.',
        sample: all('Café, Élan, Ústí, Čech'),
        face: 'both',
      },
      {
        tag: 'ss15',
        name: 'Dagger',
        does: 'A different dagger. The double dagger stays as it is.',
        sample: all('Notes† and more‡'),
        face: 'upright',
      },
    ],
  },
  {
    id: 'ot-variants',
    title: 'Character variants',
    trio: { glyph: 'Q', tags: ['cv01', 'cv02'] },
    features: [
      {
        tag: 'cv01',
        name: 'Q, first tail',
        does: 'A different tail on a Q on its own. Before a u the font draws a long-tailed Q, which this leaves alone.',
        sample: all('Q, Quest, Quality'),
        face: 'both',
      },
      {
        tag: 'cv02',
        name: 'Q, second tail',
        does: 'Another tail on a Q on its own. The long-tailed Q before a u stays.',
        sample: all('Q, Quest, Quality'),
        face: 'both',
      },
      {
        tag: 'cv05',
        name: 'f',
        does: 'An f with a different hook.',
        sample: all('fjord, after, of'),
        face: 'both',
      },
      {
        tag: 'cv06',
        name: 'Long s, first form',
        does: 'A different long s (ſ).',
        sample: all('Congreſs, ſuccess'),
        face: 'upright',
      },
      {
        tag: 'cv07',
        name: 'Long s, second form',
        does: 'Another long s (ſ).',
        sample: all('Congreſs, ſuccess'),
        face: 'upright',
      },
    ],
  },
  {
    id: 'ot-capitals',
    title: 'Capitals',
    features: [
      {
        tag: 'case',
        name: 'Case-sensitive forms',
        does: 'Raises brackets, dashes, the colon and @ to sit with capitals, and uses lining figures. It changes J too.',
        sample: all('(NASA) [UNESCO] @BBC — 10:30'),
        face: 'both',
      },
    ],
  },
  {
    id: 'ot-numbers',
    title: 'Numbers',
    features: [
      {
        tag: 'onum',
        name: 'Old-style figures',
        does: 'Figures that rise and fall like lowercase letters. They are Cormorant’s default already, so this card compares them with lining figures. Verdigris uses them in running text.',
        sample: all('Founded in 1984, rebuilt in 2026'),
        baseline: { label: 'Lining figures', value: '"lnum" 1' },
        face: 'both',
        variant: 'font-variant-numeric: oldstyle-nums;',
      },
      {
        tag: 'lnum',
        name: 'Lining figures',
        does: 'Figures all the height of a capital.',
        sample: all('Founded in 1984, rebuilt in 2026'),
        face: 'both',
        variant: 'font-variant-numeric: lining-nums;',
      },
      {
        tag: 'tnum',
        name: 'Tabular figures',
        does: 'Every figure the same width, so columns of numbers line up. Verdigris uses them with lining figures in .num.',
        sample: all(''),
        table: true,
        face: 'both',
        variant: 'font-variant-numeric: tabular-nums;',
      },
      {
        tag: 'frac',
        name: 'Fractions',
        does: 'Sets a figure, a slash and a figure as one fraction.',
        sample: all('1/2 cup, 3/4 inch, 7/8 mile'),
        face: 'both',
        variant: 'font-variant-numeric: diagonal-fractions;',
      },
      {
        tag: 'zero',
        name: 'Slashed zero',
        does: 'A zero with a slash, so it never reads as the letter O.',
        sample: all('0 O 10 100'),
        face: 'both',
        variant: 'font-variant-numeric: slashed-zero;',
      },
      {
        tag: 'ordn',
        name: 'Ordinals',
        does: 'Raises the a and o after a figure, and turns No. into the numero sign.',
        sample: all('No. 5, 1a 2o'),
        face: 'both',
        variant: 'font-variant-numeric: ordinal;',
      },
      {
        tag: 'sups',
        name: 'Superscript',
        does: 'Smaller, raised figures drawn for the job. Apply it to the figures only.',
        sample: [{ text: 'E=mc' }, { text: '2', on: true }, { text: ', 10' }, { text: '6', on: true }],
        face: 'both',
        variant: 'font-variant-position: super;',
      },
      {
        tag: 'subs',
        name: 'Subscript',
        does: 'Smaller, lowered figures drawn for the job. Apply it to the figures only.',
        sample: [{ text: 'H' }, { text: '2', on: true }, { text: 'O, CO' }, { text: '2', on: true }],
        face: 'both',
        variant: 'font-variant-position: sub;',
      },
    ],
  },
  {
    id: 'ot-italic',
    title: 'Italic only',
    intro: 'The italic has a few features of its own. These cards are set in italic.',
    trio: { glyph: 'Q', tags: ['cv03', 'cv04'], italic: true },
    features: [
      {
        tag: 'cv03',
        name: 'Q, third tail',
        does: 'A tail on the italic Q that the upright does not have, on its own and before a u.',
        sample: all('Q, Quest, Quality'),
        face: 'italic',
      },
      {
        tag: 'cv04',
        name: 'Q, fourth tail',
        does: 'Another tail on the italic Q.',
        sample: all('Q, Quest, Quality'),
        face: 'italic',
      },
      {
        tag: 'ss07',
        name: 'a',
        does: 'A different italic a.',
        sample: all('a banana, an avocado'),
        face: 'italic',
        alphabet: true,
      },
      {
        tag: 'ss08',
        name: 'Long Q',
        does: 'Changes the long-tailed Q the italic draws before u.',
        sample: all('Quest, Quality, Quiet'),
        face: 'italic',
      },
    ],
  },
];

/** Every feature, in page order, for the playground. */
export const features = groups.flatMap((g) => g.features);

/** The CSS for one feature: font-feature-settings, and the font-variant line where there is one. */
export function cssFor(f: Feature): string {
  const value = f.onByDefault ? 0 : 1;
  const lines = [`font-feature-settings: "${f.tag}" ${value};`];
  if (f.variant) lines.push(`/* or */`, f.variant);
  const target = f.sample.some((p) => p.on) ? '/* On the figures only */\n' : '';
  return target + lines.join('\n');
}

/** Present in the font but left off this page, and why. */
export const leftOut: { tags: string; why: string }[] = [
  {
    tags: 'smcp, c2sc and ss05',
    why: 'Small caps, all small caps and unicase. Verdigris has no capitals and no small caps, for readers who find them hard.',
  },
  { tags: 'ss06 and ss12', why: 'These change only small-cap letters, so with small caps off they change nothing.' },
  { tags: 'ss09, ss10 and ss14', why: 'These change Cyrillic letters only.' },
];
