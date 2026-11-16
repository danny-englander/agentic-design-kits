import type { Card } from '@agentic-design-kits/swiss-minimal/types';

const repo = 'https://github.com/danny-englander/agentic-design-kits';

/** The two kits, in the order the page lists them. */
export const kits = [
  {
    name: 'Swiss Minimal',
    href: 'https://www.swissminimal.ch',
    agents: 'https://www.swissminimal.ch/agents/',
    pkg: 'swiss-minimal',
    description:
      "Swiss / Bauhaus. Type-led, flat color, thick rules, one typeface: Overused Grotesk. One accent for each site, vermilion or azure. Light and dark modes are built in, following the visitor's system setting or a toggle.",
    // paper, ink, vermilion, azure
    swatches: ['#f3f0e9', '#0e0e0e', '#e5301b', '#0f8f8c'],
  },
  {
    name: 'Verdigris',
    href: 'https://www.verdigris.ch',
    agents: 'https://www.verdigris.ch/agents/',
    pkg: 'verdigris',
    description:
      "Swiss Minimal's strict grid, set in Cormorant, in copper green and copper, with engraved line work. No capitals anywhere. Light and dark modes are built in, following the visitor's system setting or a toggle.",
    // paper, ink, verdigris, copper
    swatches: ['#f2ede1', '#10201f', '#328f6c', '#b0612f'],
  },
];

/** What each kit is made of: the files an agent reads. */
export const parts: Card[] = [
  {
    title: 'The rules',
    href: `${repo}/blob/main/DESIGN.md`,
    summary: 'DESIGN.md: color, type, layout, images, motion and accessibility, with a list of what not to do.',
    action: 'Read it',
  },
  {
    title: 'The parts',
    href: `${repo}/blob/main/COMPONENTS.md`,
    summary: 'COMPONENTS.md: the markup and behavior of each component, and what to do and not do with it.',
    action: 'Read it',
  },
  {
    title: 'The steps',
    href: `${repo}/blob/main/USING.md`,
    summary: 'USING.md: how an agent starts a new site with the kit, or restyles one you already have.',
    action: 'Read it',
  },
  {
    title: 'The values',
    href: `${repo}/blob/main/tokens.json`,
    summary: 'tokens.json: every token as data, with its value in light and dark, what it is for, and its contrast.',
    action: 'Read it',
  },
];

export { repo };
