// Overused Grotesk's OpenType features, for the Type and color page: what each one changes, a
// sample that shows it, and the CSS. Read off fonts/OverusedGrotesk-VF.woff2 with fontTools; the
// stylistic set names are the font's own.

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
  /** Set the sample as a small table of prices. */
  table?: boolean;
}

export interface Group {
  id: string;
  title: string;
  intro?: string;
  /** Rows of the same text, very large: the default, then each of these features. */
  compare?: { text: string; tags: string[] };
  features: Feature[];
}

const all = (text: string): Part[] => [{ text }];

export const groups: Group[] = [
  {
    id: 'ot-sets',
    title: 'Stylistic sets',
    intro: 'Each set swaps one letter, or one detail, for another form. The names are the font’s own.',
    features: [
      {
        tag: 'ss01',
        name: 'Single-storey a',
        does: 'An a with one bowl and no arch over it, like a handwritten a.',
        sample: all('a banana, an avocado'),
      },
      {
        tag: 'ss02',
        name: 'Bottom-curled l',
        does: 'An l whose stem curls to the right at its foot, so it never reads as a capital I or a 1.',
        sample: all('Illinois, 1 ill llama'),
      },
      {
        tag: 'ss03',
        name: 'Rounded dots',
        does: 'Round dots in place of square ones: on i and j, on umlauts, and in the period, comma, colon, semicolon, ! and ?.',
        sample: all('Is it ready? Jö, jüst: yes!'),
      },
      {
        tag: 'ss04',
        name: 'Spurless G',
        does: 'A G with no spur at the foot of its bar.',
        sample: all('Grid, Gallery, Geneva'),
      },
      {
        tag: 'ss05',
        name: 'Straight-legged R',
        does: 'An R whose leg runs straight down from the bowl.',
        sample: all('Rome, Red, Register'),
      },
      {
        tag: 'ss06',
        name: 'Alternative J',
        does: 'A J with a different hook.',
        sample: all('Jazz in June, Jakarta'),
      },
      {
        tag: 'ss07',
        name: 'Alternative y',
        does: 'A y with a different tail.',
        sample: all('yearly, joy, by day'),
      },
      {
        tag: 'ss08',
        name: 'Arcless t',
        does: 'A t with a straight stem and no curve at its foot.',
        sample: all('tight, latest, at last'),
      },
      {
        tag: 'ss09',
        name: 'Alternative asterisk',
        does: 'A different asterisk.',
        sample: all('Terms apply* and more**'),
      },
      {
        tag: 'ss10',
        name: 'Terminal-less u',
        does: 'A u drawn as a plain curve, with no stem at its lower right.',
        sample: all('upturn, unusual, Zurich'),
      },
      {
        tag: 'ss11',
        name: 'Serif I',
        does: 'A capital I with serifs, so it never reads as a lowercase l.',
        sample: all('Illinois, Ian, IIl'),
      },
    ],
  },
  {
    id: 'ot-variants',
    title: 'Character variants',
    compare: { text: '1234567890', tags: ['cv01', 'cv02', 'cv03', 'cv04'] },
    features: [
      {
        tag: 'cv01',
        name: 'Figures in solid squares',
        does: 'Each figure in a solid square, for keys and step numbers. The text is still the plain figure underneath.',
        sample: all('Steps 1 2 3 4 5'),
      },
      {
        tag: 'cv02',
        name: 'Figures in outlined squares',
        does: 'Each figure in an outlined square. The text is still the plain figure underneath.',
        sample: all('Steps 1 2 3 4 5'),
      },
      {
        tag: 'cv03',
        name: 'Figures in solid circles',
        does: 'Each figure in a solid circle. The text is still the plain figure underneath.',
        sample: all('Steps 1 2 3 4 5'),
      },
      {
        tag: 'cv04',
        name: 'Figures in outlined circles',
        does: 'Each figure in an outlined circle. The text is still the plain figure underneath.',
        sample: all('Steps 1 2 3 4 5'),
      },
      {
        tag: 'cv05',
        name: 'a with a spur',
        does: 'An a with a small spur at the foot of its stem. It works with ss01 too.',
        sample: all('a banana, an avocado'),
      },
    ],
  },
  {
    id: 'ot-numbers',
    title: 'Numbers',
    features: [
      {
        tag: 'tnum',
        name: 'Tabular figures',
        does: 'Every figure the same width, so columns of numbers line up. The kit sets them in .num.',
        sample: all(''),
        table: true,
      },
      {
        tag: 'zero',
        name: 'Slashed zero',
        does: 'A zero with a slash, so it never reads as the letter O.',
        sample: all('0 O 10 100'),
      },
      {
        tag: 'frac',
        name: 'Fractions',
        does: 'Sets a figure, a slash and a figure as one fraction.',
        sample: all('1/2 cup, 3/4 inch, 7/8 mile'),
      },
      {
        tag: 'sups',
        name: 'Superscript',
        does: 'Smaller, raised figures drawn for the job. Apply it to the figures only.',
        sample: [{ text: 'E=mc' }, { text: '2', on: true }, { text: ', 10' }, { text: '6', on: true }],
      },
      {
        tag: 'subs',
        name: 'Subscript',
        does: 'Smaller, lowered figures drawn for the job. Apply it to the figures only.',
        sample: [{ text: 'H' }, { text: '2', on: true }, { text: 'O, CO' }, { text: '2', on: true }],
      },
    ],
  },
];

/** Every feature, in page order, for the playground. */
export const features = groups.flatMap((g) => g.features);

/** Not in the font, or in it but left off this page, and why. */
export const leftOut: { tags: string; why: string }[] = [
  { tags: 'ss12', why: 'Bulgarian forms of Cyrillic letters, so it changes nothing in Latin text.' },
  {
    tags: 'Ligatures, case-sensitive forms, old-style figures and small caps',
    why: 'Overused Grotesk doesn’t have them.',
  },
  {
    tags: 'The slant axis',
    why: 'The font has one, from upright to 10 degrees, but in this version only some letters slant, such as i, l, n and u. Others, such as e, o and s, stay upright, so the playground leaves it out.',
  },
];
