import type { Feature } from '@agentic-design-kits/verdigris/types';

/**
 * What the kit and this demo can do, newest first, for the Features tab in the menu. One entry
 * per thing a visitor would notice, dated the day it went live. Adding an entry at the top
 * shows the "new" dot on the menu button for returning visitors until they open the tab.
 */
export const features: Feature[] = [
  {
    date: '2026-11-22',
    title: 'Brighter muted text in dark, and one size for reading',
    body: 'In dark, muted text (dates, counts, sublines, captions) is a lighter green-gray, #b4c3be in place of #a6b5b0, so secondary lines read as easily as the rest. Body text is a step smaller, 20px on phones and 22px from 768px, and card summaries and a dated list’s notes now take that same size and line height, so all reading text on a page is set alike. An h4 has a style of its own, a step above body.',
    details: [
      'Muted is 10.0:1 on the dark page. Light is unchanged.',
      'Body text was 22px then 26px. Verdigris now sets it itself, `size-200` then `size-300`, a step under Swiss Minimal’s.',
      '`.card-summary` and a dated list’s dates, titles and paragraphs no longer set a size or line height: they take the text around them.',
      'Any `h4`, in Markdown or markup, is `size-500` (28px) in the semibold weight at a 1.3 line height.',
    ],
  },
  {
    date: '2026-11-20',
    title: 'The footer links to related sites',
    body: 'The footer can now list a few related sites in a column of their own, each with the mark from that site’s top bar, in its own colors. Here it links to agenticdesignkits.com, with its vermilion ∞, and to Swiss Minimal, with its Swiss cross in vermilion. From 1024px the footer has three columns: the name on the left, the site’s links in the middle and the related sites on the right.',
    details: [
      'In Astro, give `Footer` a `related` list of `RelatedSite`: a `label`, an `href`, and optionally a `mark` (the `d` of a filled path in a 24×24 box) and a `color` with `light` and `dark` values.',
      'Each link ends with the ↗ of a link that leaves the site. The column is a `nav` of its own, named “Related sites” (`relatedLabel` changes it).',
      'On a phone the footer stacks as before. From 768px the related sites go under the site’s links, and from 1024px into a third column.',
      'A footer without `related` is unchanged. In plain HTML, the classes are `.site-footer-related` and `.site-footer-mark`.',
    ],
  },
  {
    date: '2026-11-18',
    title: 'A gallery for artwork',
    body: 'A new Gallery shows artwork whole, each image at its own shape and never cropped, with alt text and a caption under each. It comes in two layouts, masonry columns and rows that share a height, both on the new Gallery page in the menu.',
    details: [
      'In Astro, `<Gallery items={items} />`, each item a `GalleryItem`: `src` (an imported image, or a URL with its `width` and `height`), `alt`, which is required, and an optional `caption`.',
      'Masonry, the default, is one column on a phone, two from 640px and three from 1024px. `variant="rows"` lines up the images’ bottom edges, and a wide image takes more of its row.',
      'The kit reads nothing from the image files: alt text and captions come from `items`, written by hand or filled in by a tool that reads the files’ metadata.',
      'Captions use the image caption style, `size-300` in `muted` and italic. In plain HTML, the classes are `.gallery` and `.gallery--rows`.',
    ],
  },
  {
    date: '2026-11-17',
    title: 'Notes in a list',
    body: 'A list row can now hold a short note: a paragraph, a bullet list or a few lines of code, read where it is rather than clicked through. From 768px its date sits in a box, “Nov 17” over “2026”, in a thin accent outline. The Note row entry on Components shows three.',
    details: [
      'In Astro, give `Row` a `date` (an ISO date) and put the note in its slot. `heading` sets the title’s level, and `Section` takes `dated` to line its header up with the dates.',
      'On phones the date is one muted line over the title, “Nov 17, 2026”.',
      'A note row never fills, so a link in a note is an ordinary underlined link.',
      'The date column is the `note-date` token, and the least width of the box is `note-date-box` (6.5rem), so every box matches.',
    ],
  },
  {
    date: '2026-11-17',
    title: 'Code is a notch smaller',
    body: 'Inline code and code blocks are set a little smaller beside the text around them, so a few lines of code no longer read nearly as large as the prose.',
    details: [
      'Inline code is now 0.68em of the text around it, never under 14px.',
      'A code block is 0.65em, about 17px beside 26px text, never under 16px. The 18px floor is for Cormorant’s small x-height; Source Code Pro’s is large.',
    ],
  },
  {
    date: '2026-11-17',
    title: 'Row sublines are easier to read',
    body: 'The line under a list row’s name, such as “Point it at the kit’s USING.md and DESIGN.md” on the home page, is now a step larger, 22px, and in dark mode a little brighter. The rows on agenticdesignkits.com have it too.',
    details: [
      'In Astro, `Row`’s `meta` has it with no change. In plain HTML, the subline is `<span class="row-meta muted block">`.',
      'Its color is the new `row-meta` token: `muted` in light, #bdc5bd in dark. A hovered, focused or active row still turns it to the row’s text color.',
    ],
  },
  {
    date: '2026-11-16',
    title: 'Your light or dark choice follows you here',
    body: 'Pick light or dark on agenticdesignkits.com, then open a demo from it, and the demo opens the same way, and remembers it.',
    details: [
      'A link can carry the choice as `?theme=light` or `?theme=dark`. `BaseLayout` applies it before the page draws, saves it as the site’s choice and takes it out of the address bar.',
      'With no choice made, nothing is passed and every site follows the system setting.',
      'A site without Astro gets the same from the no-flash script in `DESIGN.md`.',
    ],
  },
  {
    date: '2026-11-16',
    title: 'Buttons that leave the site say so',
    body: 'A button that goes to another site now ends with the font’s own north-east arrow, ↗, as a link that leaves the site already did. The Secondary button entry on Components shows one.',
    details: [
      'Add `<span class="ext-arrow" aria-hidden="true">↗</span>` after the label. It sits at 1.3 times the label’s size, in its color, without making the button taller.',
      'In Astro, `CardGrid` cards and `Cta` take `external`, which adds it for you.',
      'A sister site counts as another site. A button within the site, and the top bar’s buttons, never have it.',
    ],
  },
  {
    date: '2026-11-16',
    title: 'Rows that link look it, and only where they do',
    body: 'A list row used to fill under the pointer anywhere along its width, though only its title linked. Now a linked title is underlined, an arrow in a verdigris circle can link to the same place, and the row fills only while one of them is hovered. The List row entry on Components shows it.',
    details: [
      'The row fills only while its title, arrow or star is hovered (on a pointer that hovers) or focused from the keyboard. On a phone, a tap no longer leaves it filled.',
      'In Astro, add `arrow` to a `Row` with an `href`. The class is `.row-arrow`; it is for the pointer only, so the keyboard and screen readers meet the row once, at its title.',
      'Every link underlined at rest (`.link`, a row title, links in a post and in the footer’s note) now thickens its underline to 2px on hover and on keyboard focus. Buttons keep their own states.',
    ],
  },
  {
    date: '2026-11-16',
    title: 'The oval badge in verdigris',
    body: 'The oval badge has an accent version, drawn in verdigris, for the one badge that matters on a screen. It comes outlined or solid. The Oval badge entry on Components shows both.',
    details: [
      'In Astro, add `accent` to `Ellipse`, alone or with `solid`. The class is `.ellipse--accent`.',
      'On a `bar` surface it switches to `accent-bright`.',
      '`COMPONENTS.md` says when to use it: one accent badge to a screen, and never in copper, which is for ornament and labels that mark nothing.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'List rows and sections, ready to import',
    body: 'Numbered rows and their section header are now components in the kit, `Row` and `Section`, so an agent no longer copies them from this demo. The instructions for a new site now start from an empty folder and need nothing from GitHub.',
    details: [
      'Import them as `@agentic-design-kits/verdigris/astro/Row.astro` and `Section.astro`. ListRow in `COMPONENTS.md` has their props and the full markup.',
      '`Hero` takes a `Rosette` in its new `art` slot, so a hero with one needs no hand-written markup. The home page uses it.',
      'A form where every field is required drops the required marks with `data-required-marks="off"`.',
      '`COMPONENTS.md` now gives Verdigris’s own sizes and weights, where it used to quote Swiss Minimal’s.',
      '`USING.md` now gives the command that makes the project, the Tailwind setup, the favicon, which pages to test, and a test to copy that fails on capitals.',
      '`COMPONENTS.md` now covers a section with nothing numbered, a `textarea`, and a contact form with nowhere to send.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'An agent built a site, and I timed it',
    body: 'A new post records one run of the prompt on Agents, in an empty folder: what the agent built, how long it took, and where the kit’s instructions let it down.',
    details: ['The prompt no longer ends with “Accent: verdigris”: the kit has one palette, so there was nothing to set.'],
  },
  {
    date: '2026-11-15',
    title: 'The kit as a skill for your agent',
    body: 'The kit can now be installed as an agent skill. With it, your agent finds the kit’s rules by itself whenever a task calls for them, with no pointer to the docs in your prompt.',
    details: [
      'Install it with `npx skills add danny-englander/agentic-design-kits --skill verdigris`. Agents has the line to copy.',
      'The package now carries an `llms.txt`: an index of its files for agents, beside `USING.md`.',
      'Blog posts are now shared with their own picture, and search engines are told what the site and each post are.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'Larger captions, and rows that fill only when they lead somewhere',
    body: 'Captions under pictures are now 22px, up from 18px. A list row fills under the pointer only when it holds a link or a button, so a row of plain text no longer looks like something to click.',
    details: [
      'The row examples on Components now have linked titles.',
      'The post on copper green has a new picture.',
    ],
  },
  {
    date: '2026-11-14',
    title: 'Steps for your agent, in the package',
    body: 'The package now carries `USING.md`: the steps for starting a new site with the kit, and for restyling an existing one. Your agent finds it in `node_modules/@agentic-design-kits/verdigris/`, beside the rules, with no trip to GitHub.',
    details: [
      'The prompts on the home page and on Agents now point at it.',
      'The package’s page on npm is now written for someone installing it, with links that work there.',
    ],
  },
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
