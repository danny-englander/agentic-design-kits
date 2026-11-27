import type { Feature } from '@agentic-design-kits/swiss-minimal/types';

/**
 * What the kit and this demo can do, newest first, for the Features tab in the menu. One entry
 * per thing a visitor would notice, dated the day it went live. Adding an entry at the top
 * shows the "new" dot on the menu button for returning visitors until they open the tab.
 */
export const features: Feature[] = [
  {
    date: '2026-11-25',
    title: 'Galleries, videos, wide blocks and related posts inside a post',
    body: 'A post written in MDX can now hold components between its paragraphs. Text keeps to its 42rem measure, flush left; a gallery, a wide figure or a video keeps the same left edge and runs on to the width of the page, and a card can point to another post. The new post “Text at a measure, pictures at the page” shows each of them.',
    details: [
      '`PostWide` (`.post-wide`) runs any block past the text: a figure, a wide table, a card grid. A `Gallery` is wide in a post by itself, and `width="text"` keeps it to the measure.',
      '`VideoEmbed` plays a YouTube or Vimeo video from the address you’d share. YouTube comes from youtube-nocookie.com and Vimeo with Do Not Track, so neither sets a tracking cookie before you press play. It loads lazily, never autoplays, and needs a title for screen readers. In a post it fills the page’s width, like a gallery; `width="text"` keeps it to the measure.',
      '`PostCard` (`.post-card`) points to another post: a small label, the linked title, its summary, the date and topics, and the post’s cover as a small square beside it. In the demo, `<RelatedPost slug="…" />` looks the post up by its file name, so the card keeps up when the post changes, and a wrong name fails the build.',
      'The measure is now set on each block, through `--post-measure` on `.post-body`, rather than on the post as a whole. A `max-w-*` utility on `.post-body` caps the wide blocks too.',
      'The post’s list and figure styles no longer reach a component inside it, so a gallery keeps its own spacing and has no bullets.',
      'Verdigris centers its posts, so there a wide gallery is centered on the text’s axis, and a video stays in its 45rem column.',
    ],
  },
  {
    date: '2026-11-23',
    title: 'Brighter muted text in dark, and one size for reading',
    body: 'In dark, muted text (dates, counts, sublines, captions) is a brighter gray, #dcdcdc in place of #b9b5ab, so secondary lines read as easily as the rest. Card summaries and a dated list’s notes now take the body’s size and line height, so all reading text on a page is set alike, and an h4 has a style of its own, a step above body.',
    details: [
      'Muted is 14.3:1 on the dark page and 12.6:1 on the bar. Light is unchanged.',
      'A list row’s subline (`row-meta`) now follows `muted` in dark too, as `muted` is the brighter of the two.',
      '`.card-summary` and a dated list’s dates, titles and paragraphs no longer set a size or line height: they take the text around them, 18px then 20px from 768px on the page, 18px in the panel and 16px in the drawer.',
      'Any `h4`, in Markdown or markup, is `size-500` (22px) in the strong weight at a 1.3 line height.',
      'Captions, footnotes and the footer note now share one size, `size-200` (16px), in `muted` at a 1.375 line height. Captions were 18px and the footer note 14px.',
      'No paragraph is muted any more: every `p` is `ink`, card summaries included, and `muted` is left to meta, dates, numbers and labels.',
      'The primary button’s colors are tokens on `.btn`: `--btn-bg`, `--btn-fg` and `--btn-hover-bg`. Its hover mixes 15% of ink into the fill in place of a brightness filter, so the text keeps at least 6.6:1 (the filter left white on light vermilion at 4.47:1).',
      'A plain h3 has a style of its own, between a section’s h2 and h4: `size-600`, then `size-700` from 768px, in the strong weight. `.h3` and `.h4` give the heading styles to any element, and Type and color now shows H2, H3 and H4 headings in turn.',
      'h3 and h4 headings take their color from two new tokens, `--heading-color` and `--heading-color-bar`. Here they stay the text’s own color; Verdigris sets them to copper.',
      'A card’s title and the featured post’s title are no longer links: the button is each one’s only link. That makes one tab stop per card, one link per card for screen readers, and every word selectable.',
      'Line heights are tokens by role: `--leading-body`, `--leading-lead`, `--leading-small` and `--leading-tight`, so a theme changes each in one place.',
    ],
  },
  {
    date: '2026-11-23',
    title: 'The footer links to related sites',
    body: 'The footer can now list a few related sites in a column of their own, each with the mark from that site’s top bar, in its own colors. Here it links to agenticdesignkits.com, with its vermilion ∞, and to Verdigris, with its ❦ fleuron in verdigris green. From 1024px the footer has three columns: the name on the left, the site’s links in the middle and the related sites on the right.',
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
      'Captions use the image caption style, `size-300` in `muted`. In plain HTML, the classes are `.gallery` and `.gallery--rows`.',
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
      'The date column is the `note-date` token, and the least width of the box is `note-date-box` (5rem), so every box matches.',
    ],
  },
  {
    date: '2026-11-17',
    title: 'Code is a notch smaller',
    body: 'Inline code and code blocks are set a little smaller beside the text around them, so a few lines of code no longer read nearly as large as the prose.',
    details: [
      'Code is now 0.875em of the text around it, 17.5px beside 20px body text, and still never under 14px.',
    ],
  },
  {
    date: '2026-11-17',
    title: 'Row sublines are easier to read',
    body: 'The line under a list row’s name, such as “Point it at the kit’s USING.md and DESIGN.md” on the home page, is now a step larger, 18px, and in dark mode a little brighter. The rows on agenticdesignkits.com have it too.',
    details: [
      'In Astro, `Row`’s `meta` has it with no change. In plain HTML, the subline is `<span class="row-meta muted block">`.',
      'Its color is the new `row-meta` token: `muted` in light, #ccc8bf in dark. A hovered, focused or active row still turns it to the row’s text color.',
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
    body: 'A list row used to fill under the pointer anywhere along its width, though only its title linked. Now a linked title is underlined, an arrow in a vermilion or azure circle can link to the same place, and the row fills only while one of them is hovered. The List row entry on Components shows it.',
    details: [
      'The row fills only while its title, arrow or star is hovered (on a pointer that hovers) or focused from the keyboard. On a phone, a tap no longer leaves it filled.',
      'In Astro, add `arrow` to a `Row` with an `href`. The class is `.row-arrow`; it is for the pointer only, so the keyboard and screen readers meet the row once, at its title.',
      'Every link underlined at rest (`.link`, a row title, links in a post and in the footer’s note) now thickens its underline to 2px on hover and on keyboard focus. Buttons keep their own states.',
    ],
  },
  {
    date: '2026-11-16',
    title: 'The oval badge in the accent',
    body: 'The oval badge has an accent version, for the one badge that matters on a screen. It comes outlined or solid, in vermilion or azure with the site. The Oval badge entry on Components shows both.',
    details: [
      'In Astro, add `accent` to `Ellipse`, alone or with `solid`. The class is `.ellipse--accent`.',
      'On a `bar` surface it switches to `accent-bright`, like the accent number circle.',
      '`COMPONENTS.md` says when to use it: one accent badge to a screen, never in plain `accent`, which is too faint for small letters.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'List rows and sections, ready to import',
    body: 'Numbered rows and their section header are now components in the kit, `Row` and `Section`, so an agent no longer copies them from this demo. The instructions for a new site now start from an empty folder and need nothing from GitHub.',
    details: [
      'Import them as `@agentic-design-kits/swiss-minimal/astro/Row.astro` and `Section.astro`. ListRow in `COMPONENTS.md` has their props and the full markup.',
      '`Hero` takes art that is not an image file, such as an inline SVG, in its new `art` slot.',
      'A form where every field is required drops the required marks with `data-required-marks="off"`.',
      'The number column of a row is a new token, `--row-num`.',
      '`USING.md` now gives the command that makes the project, the Tailwind setup, the favicon and which pages to test. `TOOLING.md` says what to do when the test browser can’t be downloaded.',
      '`COMPONENTS.md` now covers a section with nothing numbered, a `textarea`, and a contact form with nowhere to send.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'An agent built a site, and I timed it',
    body: 'A new post records one run of the prompt on Agents, in an empty folder: what the agent built, how long it took, and where the kit’s instructions let it down.',
    details: ['Two slips it found are fixed: a stale accent name in `DESIGN.md`, and a missing package in the test setup in `TOOLING.md`.'],
  },
  {
    date: '2026-11-15',
    title: 'The kit as a skill for your agent',
    body: 'The kit can now be installed as an agent skill. With it, your agent finds the kit’s rules by itself whenever a task calls for them, with no pointer to the docs in your prompt.',
    details: [
      'Install it with `npx skills add danny-englander/agentic-design-kits --skill swiss-minimal`. Agents has the line to copy.',
      'The package now carries an `llms.txt`: an index of its files for agents, beside `USING.md`.',
      'Blog posts are now shared with their own picture, and search engines are told what the site and each post are.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'The verdigris accent is now azure',
    body: 'The cool accent has a new name and the same colors. It read as blue more than green, and it shared its name with the Verdigris kit.',
    details: [
      'Sites on the kit: change `verdigris` to `azure` wherever the accent is set (`<html data-accent="azure">`, or `accent="azure"` on `BaseLayout`). The old name no longer works.',
    ],
  },
  {
    date: '2026-11-15',
    title: 'Larger captions, and rows that fill only when they lead somewhere',
    body: 'Captions under pictures are now 18px, up from 14px. A list row fills under the pointer only when it holds a link or a button, so a row of plain text no longer looks like something to click.',
    details: ['The row examples on Components now have linked titles.'],
  },
  {
    date: '2026-11-14',
    title: 'Steps for your agent, in the package',
    body: 'The package now carries `USING.md`: the steps for starting a new site with the kit, and for restyling an existing one. Your agent finds it in `node_modules/@agentic-design-kits/swiss-minimal/`, beside the rules, with no trip to GitHub.',
    details: [
      'The prompts on the home page and on Agents now point at it.',
    ],
  },
  {
    date: '2026-11-14',
    title: 'Footnotes in posts',
    body: 'A blog post can now carry Markdown footnotes (`[^1]`). The number sits in the text in the accent color, and the notes come at the end of the post under a rule, each with an arrow back to its place.',
    details: ['The post “Why one typeface is enough” has two: one on a single word, mid-sentence, and one at the end of a sentence.'],
  },
  {
    date: '2026-11-14',
    title: 'A wide featured post',
    body: 'The blog now opens with its featured post across the full width, over a 16:9 picture. PostFeature picks this layout for a landscape image and keeps text beside a square one.',
    details: ['The featured post’s label and date, and the dates in the list of posts, are a step larger.'],
  },
  {
    date: '2026-11-14',
    title: 'Type and color',
    body: 'A new page at /type-and-color/ shows every type style and every color token, with its light and dark values and contrast, for both accents.',
    details: [
      'It also shows each of Overused Grotesk’s OpenType features off and on, a playground for trying them together at any weight, and the font’s arrows, shapes and other signs.',
    ],
  },
  {
    date: '2026-11-13',
    title: 'Swiss Minimal is on npm',
    body: 'The kit is now a package on npm, so a site installs and updates it like any other dependency: `npm install @agentic-design-kits/swiss-minimal`.',
    details: [
      'The package has a new name, `@agentic-design-kits/swiss-minimal`, to go with the repository’s new name, Agentic Design Kits.',
      'Sites that installed a release file: install the npm package, remove `swiss-minimal`, and change `swiss-minimal/` to `@agentic-design-kits/swiss-minimal/` in your imports.',
      'Versions follow the release date: `2026.1113.0` is the first release on 13 November 2026.',
    ],
  },
  {
    date: '2026-11-11',
    title: 'Install the kit as a package',
    body: 'The kit now installs with one npm command, in place of copying its files into your site. To update, run the same command with a newer release.',
    details: [
      'Each release on GitHub attaches `swiss-minimal.tgz`, and a site installs it by its URL. The README has the command.',
      'Import by package name: `swiss-minimal/tailwind.css`, `swiss-minimal/astro/Hero.astro`, `swiss-minimal/output.js`.',
      'Sites on the kit: remove your copies of the kit’s files, and change your imports to the package names.',
    ],
  },
  {
    date: '2026-11-11',
    title: 'Three small changes to components',
    body: 'A link in the panel that leads to another tab now moves keyboard focus to that tab. Two components take a new option.',
    details: [
      '`PostFeature` has a `media` slot, for something other than a raster image, such as an SVG that follows the theme.',
      '`BaseLayout` has a `preloadFont` prop, for a site that loads a font other than the kit’s.',
    ],
  },
  {
    date: '2026-11-07',
    title: 'Beautiful Code',
    body: 'A new page at /beautiful-code/ shows highlighted code in the kit’s colors, with samples in JavaScript, Bash, Python, Java and C#. Each block has a file name and a Copy button.',
  },
  {
    date: '2026-11-05',
    title: 'A new share card',
    body: 'The picture a link preview shows now says the kit is one your AI agent can implement, and carries the CH oval between the title and the tagline.',
  },
  {
    date: '2026-11-05',
    title: 'A design kit your AI agent can implement',
    body: 'The home page now says what the kit is for: a set of rules for your agent to follow, not components to copy and paste. It explains how that works and has a prompt to copy into your agent.',
    details: [
      'A new How it works section in three steps, and a Use it with your agent section with a Copy prompt button.',
      'The Components page says why it shows no code: your agent reads the markup from the kit’s docs.',
      'The Agents page, the README and `llms.txt` open with the same idea.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'A skip link on every page',
    body: 'The first press of Tab now shows Skip to main content, so keyboard users can go straight past the top bar. Every page also has a proper main landmark for screen readers.',
    details: [
      '`BaseLayout` writes the skip link (`.skip-link`) and wraps its default slot in `<main id="main">`.',
      'A new `footer` slot keeps the `Footer` outside `<main>`, where it stays the page’s footer landmark.',
      'Sites on the kit: copy the new `theme.css`, `BaseLayout.astro` and `Footer.astro` in, and give your `Footer` `slot="footer"`.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'Components from the home page',
    body: 'A call to action just under the hero now leads to the Components page. The featured post joins the Reading cards.',
  },
  {
    date: '2026-11-05',
    title: 'Primary, secondary and tertiary buttons',
    body: 'Buttons now come as a set: primary and secondary at one size, in bold sentence case, and a new, quieter tertiary one. The Components page shows each on its own, in a group and with a hover label.',
    details: [
      '`.btn` drops its capitals and takes the padding of `.btn-outline`. Both are 18px bold, 44px tall.',
      'A new tertiary button (`.btn-outline--tertiary`): the same box at 16px, weight 500, for an action repeated many times on a page.',
      '`data-tip` hover labels now work on `.btn` and `.btn-outline` as well as top-bar buttons. Give the button a matching `aria-label`.',
      '`.btn-group` buttons sit 12px apart, up from 8px.',
      'The Components page drops its separate Hover label and Outlined button entries. `.topbar-btn` stays in the kit for the top bar.',
      'Sites on the kit: copy the new `theme.css` in, and check any `.btn` labels are in sentence case.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'Longer teasers and a button on each card',
    body: 'Cards now carry a teaser of two or three lines, and a Read this button in place of the arrow on the title.',
    details: [
      'The button is a tertiary button on a link. Its `aria-label` adds the card’s title, so each one says where it goes.',
      'The button reads Read this unless a card sets `action`. The title stays a link too.',
      'Sites on the kit: copy the new `theme.css`, `types.ts` and `CardGrid.astro` in.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'A Swiss cross in the top bar',
    body: 'The site name in the top bar now has a Swiss cross before it, in the accent color. The browser tab shows the same cross.',
    details: [
      'It replaces the two rings and a dot, in `SiteMark.astro`. Its arms are a sixth longer than they are wide, as on the Swiss flag.',
      'The rules for the mark now allow one flat shape all in the accent, as well as `currentColor` with one accent touch.',
      'The browser tab icon is always vermilion, as a favicon can’t follow the site’s accent setting.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'Tabs in title case',
    body: 'The tabs in the menu now read Menu, Contact and Features rather than all capitals, a little larger, so they are easier to read. The Components page shows them too.',
    details: [
      '`.panel-tab` sets no capitals now, at 1rem, so a label shows as you write it.',
      'Sites on the kit: copy the new `theme.css` in, and check your tab labels are in title case.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'Arrows on linked titles',
    body: 'Titles on cards and in the Blog list now end in an arrow, so you can see they are links without hovering.',
    details: [
      'The arrow is the font’s own, hidden from screen readers and tied to the last word, so it never wraps alone.',
      'Sites on the kit: copy the new `CardGrid.astro` and `PostList.astro` in.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'An accent number circle',
    body: 'Number circles now come in the accent color, outlined or solid. The entries on the Components page use the outlined one, and the page shows every size.',
    details: [
      'A new class, `.num-circle--accent`, or `accent` on `NumCircle`. It uses `accent-text` on the page, and `accent-bright` on dark surfaces and in hovered or active list rows.',
      'Sites on the kit: copy the new `theme.css` and `NumCircle.astro` in. Nothing existing changes.',
    ],
  },
  {
    date: '2026-11-05',
    title: 'Components in A to Z order',
    body: 'The Components page now runs A to Z, both its groups and what is in them. CTA, cards and the number circle each have a group of their own.',
  },
  {
    date: '2026-11-05',
    title: 'Lists and sections with more room',
    body: 'Lists no longer end in a thin rule, even when a filter hides the rows after the last one you can see. Sections and the footer have more room under their rule.',
    details: [
      'List rows, the dated list, the summary list, the post list and the menu all drop the last rule.',
      'The footer’s padding is now `2.75rem 0 3rem 0`.',
      'Sites on the kit: copy the new `theme.css` in.',
    ],
  },
  {
    date: '2026-11-04',
    title: 'CTAs and cards',
    body: 'Two new pieces for pointing people at things: a call to action with the filled button, and a grid of linked cards to sit under it. See them on the home page.',
    details: [
      'A new kit piece, `Cta` (`.cta`): a thin rule, a small label, a title, a line of text and the filled button. One to a page.',
      'A new kit piece, `CardGrid` (`.card-grid`, `.card`): a number, a linked title, one short sentence and up to three tags, under a 2px rule, with no box.',
      'Four cards sit two across from 768px with `columns={2}`, and three sit three across from 1024px. Both stack on phones.',
      'The home page has a new Reading section using both, and the Components page lists them.',
      'Sites on the kit: copy the new `theme.css`, `types.ts`, `Cta.astro` and `CardGrid.astro` in. Nothing existing changes.',
    ],
  },
  {
    date: '2026-11-03',
    title: 'A mark in the top bar',
    body: 'The site name in the top bar now has a small mark before it: two rings and a red dot. It follows the light and dark themes and the accent. The browser tab shows the same mark.',
    details: [
      '`BaseLayout` has a new `mark` slot, inside the home link before the name, for one small inline SVG. It is hidden from screen readers, as the link is named by the site name.',
      'The rings are drawn in the bar\'s own color, so they turn light with it while the menu or drawer is open; the dot is the accent.',
      'Sites on the kit: copy the new `BaseLayout.astro` in. Without a `mark`, nothing changes.',
    ],
  },
  {
    date: '2026-10-23',
    title: 'Blog pages',
    body: 'The blog lists five posts a page, with numbered pages and Newer and Older links at the foot. The featured post stays at the top of every page.',
    details: [
      'A new kit piece, `Pager` (`.pager`): outlined page numbers, filled for the page you are on, between a step back and a step on. Long runs collapse to 1 … 4 5 6 … 12.',
      'The first page is `/blog/`; the next are `/blog/page/2/` and on, each titled with its number.',
      'Five more sample posts, so the demo has a second page.',
      'Sites on the kit: copy the new `theme.css` and `Pager.astro` in. Nothing existing changes.',
    ],
  },
  {
    date: '2026-10-23',
    title: 'Larger body text',
    body: 'Body text is larger and more open: 20px with a line height of 1.8, 18px on phones. Intro lines grew a step to stay above it.',
    details: [
      'Body text is 1.25rem (Tailwind `text-xl`) from 768px and 1.125rem (`text-lg`) below, with a line height of 1.8.',
      '`.lead` is 1.5rem from 768px and 1.375rem below, so it stays a step above body text.',
      'The top bar, the panel, the drawer and the toast keep 1rem with a line height of 1.5: they are interface, not reading text.',
      'Sites on the kit: copy the new `theme.css` in. Text that inherits the body size grows with it; anything with its own size keeps it.',
    ],
  },
  {
    date: '2026-10-23',
    title: 'Code colors',
    body: 'Code blocks are highlighted in three colors: magenta keywords, teal strings and orange numbers and names, with comments in grey. See the code in Setting a grid before the words, on the Blog.',
    details: [
      'Code is the kit’s one exception to its single accent, as it already is to its single typeface. The colors appear only inside `pre` and `code`.',
      'Four new tokens, `code-keyword`, `code-string`, `code-constant` and `code-comment`, each with a dark version and a `-bright` one for the dark `.pre--bar` block. All pass 4.5:1.',
      'Sites on Astro: set `markdown.shikiConfig.theme` to `"css-variables"` and copy the new `theme.css` in; the kit maps Shiki’s variables to the tokens. Without it, Astro’s default GitHub theme sets its own dark background on Markdown code.',
      'By hand: wrap tokens in `.tok-keyword`, `.tok-string`, `.tok-constant` and `.tok-comment`.',
    ],
  },
  {
    date: '2026-10-23',
    title: 'Blog',
    body: 'A blog index that opens with a featured post beside a square image, then lists the rest by date. Posts get a byline under a thick rule, long-form text with quotes, lists and tables, and links to the previous and next posts. See Blog in the menu.',
    details: [
      'Five new kit pieces: `PostFeature` (`.post-feature`) for one post at the top of the index, set 50/50 beside a square image like a split hero, `PostList` (`.post-list`) for the rest, `PostHeader` (`.post-header`, `.post-meta`) for the top of a post, `.post-body` for Markdown text and `PostNav` (`.post-nav`) for the previous and next posts.',
      '`.post-body` styles plain elements, so Markdown needs no classes: h2 is set apart by size and space alone, quotes are large and bold beside a 6px accent edge, lists use square markers.',
      'The demo keeps its posts in an Astro content collection, `src/content/blog/`, one Markdown file per post.',
      'Sites on the kit: copy the new `theme.css`, `types.ts` and the four `Post*.astro` files in. Nothing existing changes.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'New accent names',
    body: 'The two accents have new names and the same colors: vermilion, the orange-leaning red of Swiss posters, and verdigris, the blue-green patina of old copper.',
    details: [
      'Red is now vermilion and teal is now verdigris; the colors themselves are unchanged.',
      'Every page names its accent: `<html data-accent="vermilion">` or `"verdigris"`. `BaseLayout` takes `accent="vermilion"` (the default) or `accent="verdigris"`.',
      'Sites on the kit: change `red` to `vermilion` and `teal` to `verdigris` wherever an accent is set, then copy the new kit in. The old names no longer work.',
      'The gear on the right edge of the demo previews both under their new names.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Dialog',
    body: 'A modal dialog on the browser’s own <dialog>, square with a thick rule over a flat dark backdrop, for a choice that needs an answer. Try Delete export on the Components page.',
    details: [
      'Built on the native `<dialog>` and `showModal()`: the page behind goes inert, Escape closes it, focus moves to the `autofocus` button and returns to the opener on close.',
      'Opens from a button with invoker commands (`commandfor` and `command="show-modal"`), no script needed; `kit/dialog.js` fills in for browsers that don’t run commands yet.',
      'Every button in its `<form method="dialog">` closes it and leaves its `value` in `dialog.returnValue`; `closedby="any"` closes it on a click outside, with the same fallback script.',
      'Kit styling: 2px rule in the text color, 1.75rem bold title, a close ✕ drawn from two bars, actions as a filled button and secondary buttons, a flat `bar` backdrop at 75% with no blur.',
      'Fades and rises in over 250ms and fades out, with `@starting-style`; no motion under Reduce Motion. The page doesn’t scroll behind it.',
      'New in the kit: `.dialog` in `theme.css`, `kit/dialog.js` and `Dialog.astro` (`id`, `title`, an `actions` slot, `lightDismiss`).',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Contact form',
    body: 'The form in the menu’s Contact tab now sends your message. If it can’t, it says so and keeps what you wrote.',
    details: [
      'Sends through Netlify Forms, without leaving the page; the messages land in the site’s Netlify dashboard.',
      'Only a message Netlify accepts closes the panel with a thank-you; a failed one stays in the form, with the reason beside the Send button where screen readers hear it.',
      'A hidden honeypot field turns away spam bots; Send is disabled while a message is on its way.',
      'The “Send me a copy” switch is gone, since Netlify Forms can’t email the sender.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Select lists in style',
    body: 'In Chrome and Edge, a select list now opens square, in the site’s type and colors, with the chosen item checked. Other browsers keep their own list. Try Topic on the Forms page.',
    details: [
      'Uses the browser’s customizable select (`appearance: base-select`), only where it is supported; elsewhere the native list opens as before.',
      'Still the real `<select>`: the keyboard, screen readers, form submission and phones’ own pickers all work unchanged, and no markup changes.',
      'The open list is square with a 2px rule in the text color, on the surface it opens from: the page, or the dark bar inside the panel.',
      'The option under the pointer or keyboard fills like a chip; the chosen one is bold, with a check drawn from two straight strokes in the accent.',
      'The chevron turns up while the list is open.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Dates, files and live output',
    body: 'Date and time fields with presets, a file picker, a panel that streams a task’s output and a summary of the results. Try an export on the Forms page.',
    details: [
      'Date and time fields: the browser’s own date, time, datetime-local and month inputs, styled as underlined fields with tabular digits; the calendar and clock icons follow the theme, dark bars included.',
      'Secondary button (`.btn-outline`, `.btn-group`): a sentence-case outlined button for every action beside the filled one, such as This month, Last month, 1st–15th and 16th–end presets that fill a date range.',
      'File picker (`FilePicker`, `kit/file-pick.js`): the real file input stays on the page, so the keyboard and screen readers use it; the field shows the chosen file, “3 files” or a folder’s name, and screen readers hear it as part of the name.',
      'Output panel (`OutputPanel`, `kit/output.js`): a status beside the heading with a spinner while running, and a fixed-height log that follows its newest line until you scroll up; screen readers hear “Running…” and “Finished”, not every line.',
      'Summary list (`SummaryList`): small uppercase labels beside their values, with thin rules between, stacked on phones.',
      'All five come together on the Forms page as an Export task, from choosing dates to the summary of a finished run.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Footer',
    body: 'Every page now ends with a footer: the site name and its pages, side by side from tablet width. The dark bar along the bottom is optional, and stays on Work and Components.',
    details: [
      'Footer (`Footer.astro`, `.site-footer`): the site name, a line about it and a note on the left; the site’s links on the right in two short columns, taken from the menu so they’re never kept twice. It stacks on phones.',
      'The current page is underlined in the accent; `tone="bar"` sets the footer on a dark block instead of the page.',
      'Bottom bar (`BottomBar.astro`, `.bottom-bar`): the fixed bar is now a component that a page opts into, with a label, a scrolling title and the jump-to-current button.',
      'The bar can carry a bold heading (an `h2`, or an `h3` with `headingLevel`), which also names it as a region for screen readers; the demo’s says “Bottom bar”.',
      'Pages without the bar keep no space for it, so the drawer and panel reach the bottom of the screen; with it, the footer ends exactly where the bar begins.',
      'The scrolling title’s script is now part of the kit as `kit/marquee.js`.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Number circles',
    body: 'A number can sit in a circle, outlined or solid, for the steps of a how-to or the numbers in a list. See the Components page.',
    details: [
      '`NumCircle.astro` and `.num-circle` / `.num-circle--solid`: one or two digits, padded to “02”, in a 2.25em circle sized by the text around it.',
      'Drawn in the text’s own color, so it follows muted text, a hovered or active list row and dark bars; the solid one cuts its digits out of the fill.',
      'In list rows the number column widens for it, keeping the circle clear of the active row’s accent edge.',
    ],
  },
  {
    date: '2026-10-21',
    title: 'Clearer thin rules',
    body: 'In dark mode, the thin lines between rows are brighter, so lists and sections read clearly.',
    details: [
      'The dark `rule` token goes from #2b2a27 (1.4:1 on the page) to #686764, 40% of the text color (3.5:1); light mode is unchanged.',
      'On the Components page, a list sample no longer ends in two lines where one belongs.',
    ],
  },
  {
    date: '2026-10-20',
    title: 'Agents',
    body: 'How to build or restyle a site with the kit using an AI coding agent, with a starting AGENTS.md for your own site. Agents that read the web can start at /llms.txt. In the menu.',
  },
  {
    date: '2026-10-20',
    title: 'Components',
    body: 'Every component in the kit on one page, 36 of them, from buttons to the dialog, with the pieces that frame the page listed at the end. In the menu.',
    details: [
      'Now 36 entries, adding the secondary button, date and time fields, file picker, summary list, output panel, dialog, number circle and footer.',
      'Entries number themselves in page order, and each number sits on its name’s baseline, as group ranges do.',
      'The oval badge entry lists its sizes, `text-sm` to `text-4xl`, with each badge labelled; the page title and menu accordions are shown live.',
    ],
  },
  {
    date: '2026-10-20',
    title: 'Oval badges',
    body: 'Short codes like CH sit in an oval, like the sticker on a Swiss car, plain or solid, in light and dark. See the About page.',
  },
  {
    date: '2026-10-20',
    title: 'Code',
    body: 'Code, commands and keys are set in Source Code Pro, the same on every device, and terminal output sits on a dark block. See the About page.',
  },
  {
    date: '2026-10-20',
    title: 'Larger site name',
    body: 'The site name at the top left of the bar, the link home, is now 16px, the size of body text.',
  },
  {
    date: '2026-10-19',
    title: 'Vermilion or verdigris',
    body: 'A site picks one accent, vermilion or verdigris. The gear on the right edge previews both.',
  },
  {
    date: '2026-10-19',
    title: 'Form controls',
    body: 'Switches, radio buttons and a select list, on the Forms page and in the Contact tab.',
  },
  {
    date: '2026-10-19',
    title: 'Page titles',
    body: 'Pages without a hero open with one big title across the page, as on Work and Forms.',
  },
  {
    date: '2026-10-16',
    title: 'Features',
    body: 'This list. A dot in the accent on the menu button means something new has arrived since you last looked.',
  },
  {
    date: '2026-10-16',
    title: 'Recently viewed',
    body: 'The Recent button lists the pages you have opened here, with links to share or look each one up on Bluesky, Instagram and YouTube. It stays on this device.',
  },
  {
    date: '2026-10-16',
    title: 'Favorites',
    body: 'Star an item on the Work page, then choose Favorites in the filter to see only those.',
  },
  {
    date: '2026-10-16',
    title: 'Back to the current item',
    body: 'When Field notes has scrolled out of view, the triangle in the bottom bar brings it back.',
  },
  {
    date: '2026-10-16',
    title: 'Menu pages',
    body: 'The menu has numbered tabs, and each one has its own link, such as #contact.',
  },
  {
    date: '2026-10-14',
    title: 'First version',
    body: 'Menu with nested accordions, light and dark themes, filters, a scrolling title and a toast.',
  },
];

/** The newest feature's date; the "new" dot compares against it. */
export const latestFeatureDate = features[0].date;
