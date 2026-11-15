# Using Swiss Minimal: notes for AI agents

How to start a new site with the kit, and how to restyle an existing site with it. Each has a section below. This file comes with the npm package (`node_modules/@agentic-design-kits/swiss-minimal/USING.md`), beside the other files it names. To change the kit itself, see `AGENTS.md` in [the kit's repository](https://github.com/danny-englander/agentic-design-kits).

Read first, whichever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will use. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Check the Node version before running `node`, `npm` or `npx` in the site: look for an `.nvmrc` and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have.

## Starting a new site with the kit

1. Make an Astro project with Tailwind v4 (`tailwindcss`, `@tailwindcss/vite`), Node 24 or later.
2. Install the kit: `npm install @agentic-design-kits/swiss-minimal`. To update later, run `npm update`. Add `astro-icon` if the site uses `IconTemplates`.
3. Make `src/styles/global.css` start with `@import "@agentic-design-kits/swiss-minimal/tailwind.css";` and import it in your layout. Don't import `tailwindcss` or `theme.css` anywhere else.
4. Build pages on `@agentic-design-kits/swiss-minimal/astro/BaseLayout.astro`, and import every other component the same way (`@agentic-design-kits/swiss-minimal/astro/Hero.astro`), types from `@agentic-design-kits/swiss-minimal/types` and scripts as `@agentic-design-kits/swiss-minimal/output.js`. Give the layout a `menu` (`MenuItem[]`, current page marked), an `accent` if not vermilion, and `barHeight` on pages with a `BottomBar` (it is optional). Open each page with a `Hero` or a `PageTitle`, and end it with a `Footer` in the `footer` slot, given the same `menu`.
5. Page layout is Tailwind utilities; components are kit classes. Colors only through the token utilities (`text-muted`, `bg-bar`, `text-accent-text`, …), never Tailwind's palette.
6. **A blog:** keep posts in a content collection, one Markdown file each. The index opens with a `PostFeature` (one post beside a square image) in place of a hero, then a `PostList` of the rest and a `Pager` when there are more than fit a page; the feature stays on top of every page. A post opens with a `PostHeader`, puts its Markdown in a `.post-body` and ends with a `PostNav`. See the Post* and Pager sections of `COMPONENTS.md`.
7. **Code in Markdown:** set `markdown: { shikiConfig: { theme: 'css-variables' } }` in `astro.config.mjs`, so code takes the kit's code colors. Without it, Astro's default theme puts GitHub's dark colors and background on every code block.
8. Copy the tests from `TOOLING.md`. Don't edit the kit's files in `node_modules/`; a fix belongs back in [the kit's repository](https://github.com/danny-englander/agentic-design-kits).

The kit's demo site is the worked example of all of this: [`demo/`](https://github.com/danny-englander/agentic-design-kits/tree/main/demo) in the kit's repository (`src/layouts/SiteLayout.astro`, `src/pages/`), live at [swissminimal.ch](https://www.swissminimal.ch).

## Restyling an existing site with the kit

Restyling is mostly removing: the kit only works when it is the site's only visual system.

1. **Survey before changing anything.** Note the framework, how CSS is loaded (Tailwind and its version, CSS modules, a preprocessor, a UI library), how dark mode works, the fonts, the icon set, and the pieces each page uses (navigation, forms, lists, cards, modals). Map each piece to a kit component, and list the ones with no match. Show that map to the owner before restyling.
2. **Check for class name clashes.** The kit uses short, generic class names, including `.page`, `.row`, `.title`, `.label`, `.lead`, `.small`, `.muted`, `.num`, `.link`, `.btn`, `.chip`, `.field`, `.media`, `.figure`, `.icon`, `.panel`, `.drawer`, `.toast` and `.pager`. Search the site for each one first; an existing `.btn` or `.title` picks up the kit's styles the moment `theme.css` loads. Rename the site's own class, or move that markup onto the kit component. A code highlighter (Prism, highlight.js, a Shiki theme) clashes the same way, bringing its own colors and background: switch it to Shiki's css-variables theme, or remove it.
3. **Know what `theme.css` does globally:** `box-sizing` on everything, the `html`/`body` background, font and color, a 3px accent focus ring on every focusable element, and the hand cursor on buttons, summaries and labels. Expect every page to shift a little the moment it loads.
4. **Load it in the way that fits the site:**
   - *Tailwind v4:* replace the site's `@import "tailwindcss"` with the kit's `tailwind.css`, as for a new site.
   - *Tailwind v3:* `tailwind.css` needs v4. Upgrade (`npx @tailwindcss/upgrade`) first, or load `theme.css` on its own and leave the site's Tailwind alone.
   - *No Tailwind, or not Astro:* link `theme.css` as a plain stylesheet (`node_modules/@agentic-design-kits/swiss-minimal/kit/theme.css`, with its `fonts/` beside its `kit/`). The plain scripts (`panel.js`, `drawer.js`, …) work in any framework. The Astro components don't, so copy their markup from `COMPONENTS.md` or read it off the `.astro` files.
5. **Set up theming:** add the no-flash script from `DESIGN.md` to `<head>`, and replace the site's dark mode switch (a `.dark` class, say) with `<html data-theme>`; the kit's colors only follow `data-theme` and the system setting. Pick the accent with `data-accent`.
6. **Remove the old system as each part moves over:** its color palette and custom properties, other font families and weights, shadows, rounded corners, gradients, icon fonts, and a UI library's components. `theme.css` sits in a CSS layer (under Tailwind) or loads before the site's own CSS, so leftover unlayered site CSS wins every conflict and quietly undoes the kit.
7. **Go a page type at a time:** tokens, type and the top bar first (they touch every page), then lists and forms, then the rest. Commit after each step, so a problem can be traced to one step.
8. **Leave the content as it is:** don't rewrite copy, change URLs, or remove features to fit a component. Where the content and a rule conflict (an image with text set on it, a three-word all-caps label), raise it with the owner.
9. **Check** each page against the "Do not" list in `DESIGN.md`, add the axe tests from `TOOLING.md`, and run the manual checks in both themes at phone and desktop widths.
