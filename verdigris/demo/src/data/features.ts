import type { Feature } from 'verdigris/types';

/**
 * What the kit and this demo can do, newest first, for the Features tab in the menu. One entry
 * per thing a visitor would notice, dated the day it went live. Adding an entry at the top
 * shows the "new" dot on the menu button for returning visitors until they open the tab.
 */
export const features: Feature[] = [
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
