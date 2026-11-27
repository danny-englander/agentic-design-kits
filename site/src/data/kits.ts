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
    external: true,
  },
  {
    title: 'The parts',
    href: `${repo}/blob/main/COMPONENTS.md`,
    summary: 'COMPONENTS.md: the markup and behavior of each component, and what to do and not do with it.',
    action: 'Read it',
    external: true,
  },
  {
    title: 'The steps',
    href: `${repo}/blob/main/USING.md`,
    summary: 'USING.md: how an agent starts a new site with the kit, or restyles one you already have.',
    action: 'Read it',
    external: true,
  },
  {
    title: 'The values',
    href: `${repo}/blob/main/tokens.json`,
    summary: 'tokens.json: every token as data, with its value in light and dark, what it is for, and its contrast.',
    action: 'Read it',
    external: true,
  },
];

// The number of components in each kit: the sections of its COMPONENTS.md, counted at build time,
// so the page never falls behind the docs. (This site lives in the kits' repository; a site
// outside it would read them from the package.)
const docs = import.meta.glob(['../../../COMPONENTS.md', '../../../verdigris/COMPONENTS.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
const sections = (path: string) => (docs[path].match(/^## /gm) ?? []).length;
export const componentCount = {
  swissMinimal: sections('../../../COMPONENTS.md'),
  verdigris: sections('../../../verdigris/COMPONENTS.md'),
};

/** What both kits show off. Each has a page of the same name in both demos, at `path`; `see` starts
    each button's text ("See it in Swiss Minimal"). */
export const highlights = [
  {
    title: 'Beautiful code',
    path: '/beautiful-code/',
    see: 'See it',
    summary:
      'Code blocks highlighted in the kit’s own colors, every one 4.5:1 or better in light and dark, with samples in several languages.',
  },
  {
    title: 'Bespoke typography',
    path: '/type-and-color/',
    see: 'See it',
    summary:
      'One family per kit, a fixed scale and a few weights. Every type style and color token on one page, with its contrast ratio.',
  },
  {
    title: 'Elegant galleries',
    path: '/gallery/',
    see: 'See them',
    summary:
      'Artwork shown whole, in masonry columns or justified rows, each image with alt text and a caption.',
  },
  {
    title: 'Accessible forms, beautifully styled',
    path: '/forms/',
    see: 'See them',
    summary: 'Text fields, select lists, radios, switches, dates, a file picker, and more.',
  },
  {
    title: 'Full-featured MDX blog',
    path: '/blog/',
    see: 'See it',
    summary:
      'Everything you need to publish; from a featured hero and paginated index to galleries, video embeds, variable-width layouts, and next and previous posts.',
  },
  {
    title: `${Math.floor(componentCount.swissMinimal / 10) * 10}+ components`,
    path: '/components/',
    see: 'See them',
    summary: 'Buttons, cards, beautifully styled lists, dialogs, smooth slide-down panels.',
  },
];

export { repo };
