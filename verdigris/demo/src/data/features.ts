import type { Feature } from '@agentic-design-kits/verdigris/types';

/**
 * What the kit and this demo can do, newest first, for the Features tab in the menu. One entry
 * per thing a visitor would notice, dated the day it went live. Adding an entry at the top
 * shows the "new" dot on the menu button for returning visitors until they open the tab.
 */
export const features: Feature[] = [
  {
    date: '2026-11-14',
    title: 'A truer verdigris',
    body: 'The accent is now the green of weathered copper in place of teal, the copper is warmer, and the rosette turns in a brighter green and orange, every pairing passing WCAG AA in both themes.',
    details: [
      'The rosette has its own color tokens, `--rosette-verdigris` and `--rosette-copper`, and turns once every 30 seconds. Its switch now reads “Turn the rosette”.',
      'Code is a step smaller beside the text, and the page title’s lines sit a little closer.',
      'Sites on the kit get the new colors when they update. Nothing to change in your CSS.',
    ],
  },
  {
    date: '2026-11-14',
    title: 'A wide featured post',
    body: 'The blog now opens with its featured post across the full width, over a 16:9 picture. PostFeature picks this layout for a landscape image and keeps text beside a square one.',
    details: ['The featured post’s label and date, and the dates in the list of posts, are a step larger.'],
  },
  {
    date: '2026-11-14',
    title: 'Every OpenType feature in Cormorant',
    body: 'The Type and color page now shows each of Cormorant’s OpenType features off and on, a playground for trying them together, and the font’s ornaments, arrows and signs.',
    details: [
      'Cormorant is now one variable font file for upright and one for italic, in place of six, so a page downloads about half as much font, and any weight from 300 to 700 is there.',
      'Sites on the kit get the new font files when they update. Nothing to change in your CSS.',
    ],
  },
  {
    date: '2026-11-13',
    title: 'Posts set like a title page',
    body: 'A blog post now opens on a centered axis: the label in copper between two asterisms, a larger title, the lead in italic and the byline as one line parted by lozenges. The text is a step larger, at a wider measure.',
    details: [
      'A post ends with an asterism. Markdown footnotes are styled, with the notes under a rule at the end.',
      'A post with no picture takes a fleuron between its header and its text.',
      'Code blocks are smaller beside the larger text, and the site name in the top bar is larger.',
    ],
  },
  {
    date: '2026-11-13',
    title: 'Verdigris is on npm',
    body: 'The kit is now a package on npm, so a site installs and updates it like any other dependency: `npm install @agentic-design-kits/verdigris`. Swiss Minimal still comes with it.',
    details: [
      'The package has a new name, `@agentic-design-kits/verdigris`, to go with the repository’s new name, Agentic Design Kits.',
      'Sites that installed a release file: install the npm package, remove `verdigris`, and change `verdigris/` to `@agentic-design-kits/verdigris/` in your imports.',
      'Versions follow the release date: `2026.1113.0` is the first release on 13 November 2026.',
    ],
  },
  {
    date: '2026-11-13',
    title: 'Type and color',
    body: 'A new page at /type-and-color/ shows every type style and every color token, with its light and dark values and contrast. Copper now has its own utilities: `text-copper-text`, `text-copper-bright` and `text-copper`.',
  },
  {
    date: '2026-11-11',
    title: 'Install the kit as a package',
    body: 'Verdigris now installs with one npm command, and brings Swiss Minimal with it. It lives beside Swiss Minimal in one repository, and the two are released together.',
    details: [
      'Each release on GitHub attaches `verdigris.tgz`, and a site installs it by its URL. The README has the command.',
      'Import everything from `verdigris`: `verdigris/tailwind.css`, `verdigris/astro/Hero.astro`, `verdigris/output.js`.',
      'The kit’s source is now the `verdigris/` folder of the Swiss Minimal repository. The old repository is archived.',
    ],
  },
  {
    date: '2026-11-08',
    title: 'Beautiful Code',
    body: 'A new page at /beautiful-code/ shows highlighted code in the theme’s colors, with samples in JavaScript, Bash, Python, Java and C#. Each block has a file name and a Copy button.',
  },
  {
    date: '2026-11-06',
    title: 'Verdigris',
    body: 'A new theme on the Swiss Minimal kit: Cormorant type, verdigris and copper, the scotch rule, ornament from the font, and a set of drawn marks. No capitals anywhere.',
  },
];

/** The newest feature's date; the "new" dot compares against it. */
export const latestFeatureDate = features[0].date;
