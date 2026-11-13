# Swiss Minimal: notes for AI agents

A design kit (CSS, a few plain scripts, Astro components) plus a demo site that uses all of it. Three kinds of task come here: changing the kit, starting a new site with it, and restyling an existing site with it. Each has a section below.

Read first, whatever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will touch. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Check the Node version before running `node`, `npm` or `npx` in any project, this one or a site you are styling: look for an `.nvmrc` (here `demo/.nvmrc`) and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have.

## Verdigris lives in this repository too

Verdigris is a second kit, built on this one, in [`verdigris/`](verdigris): its own package (`@agentic-design-kits/verdigris`), stylesheet, typeface, docs and demo. This is not the `verdigris` accent, which is part of this kit. It uses this kit's `theme.css`, scripts and components as they are, passes them on under its own name, and overrides the tokens and classes in its own stylesheet. Everything outside `verdigris/` is Swiss Minimal. For work on Verdigris, read [`verdigris/AGENTS.md`](verdigris/AGENTS.md) as well as this file.

- **A change to this kit changes Verdigris at once.** Verdigris always uses the `kit/` and `fonts/` beside it, with no version to update. After changing a token, a kit class, a component or a script, run Verdigris's checks too (below), and look at its demo. Fix what breaks in the same pull request.
- **Adding, removing or renaming a file in `kit/astro/` or `kit/*.js`** needs `npm run shared` at the root, which rewrites `verdigris/kit/shared/` (the files that pass each one on). CI fails if it is out of date (`npm run shared:check`).
- **Shared fixes go here.** A fix to a shared component is made in `kit/`, never in `verdigris/`.

## Working on this repository

- **The kit is a package, and the demo installs it.** The root `package.json` names the kit `@agentic-design-kits/swiss-minimal` and maps its files: `@agentic-design-kits/swiss-minimal/tailwind.css`, `@agentic-design-kits/swiss-minimal/astro/Hero.astro`, `@agentic-design-kits/swiss-minimal/panel.js`, `@agentic-design-kits/swiss-minimal/types`. The repository is an npm workspace (this kit at the root, its `demo/`, `verdigris/` and `verdigris/demo/`), so the demo's copy is a link to `kit/` and `fonts/`, never a second copy: change a file in `kit/` and both demos have it. Install from the root or from any of those folders; either way there is one `node_modules` and one `package-lock.json`, both at the root. Each release publishes the kit to npm as `@agentic-design-kits/swiss-minimal` (see Releases in the [`README`](README.md)); sites may still copy `kit/` and `fonts/`. The `"private": true` here only stops an `npm publish` from the repository itself: the published package is packed by `scripts/pack.ts`, which gives it the release's version.
- **A new kit file may need a line in `exports`.** `kit/astro/*` and `kit/*.js` are covered by patterns; a new stylesheet or folder is not. A script that sites import from gets a `.d.ts` beside it (see `kit/output.d.ts`), or their type checks lose it.
- **One change, three places.** A new or changed component means the CSS in `kit/theme.css` (plus an Astro component in `kit/astro/` if it has props or parts), its section in `COMPONENTS.md` (and its name in the list under Components in `DESIGN.md`), and a use in the demo, with a test if it has behavior.
- **The demo** is an Astro + Tailwind v4 site in `demo/`. Node comes from nvm (`demo/.nvmrc`, see above); in a shell without it on the PATH, prefix commands with `PATH=$HOME/.nvm/versions/node/v24.21.0/bin:$PATH`. The dev server is the `demo` entry in `.claude/launch.json` (port 4321, or the next free one).
- **Check:** `npx astro check` and `npm test` in `demo/`. The tests build the site and serve it on a free port picked for each run, then scan every page in both themes and both accents with axe, plus behavior tests. Add a new page to `PAGES` in `demo/tests/a11y.spec.ts`. `astro check` covers `kit/` as well as the demo. After a change to `kit/` or `fonts/`, run the same two in `verdigris/demo/`. GitHub Actions (`.github/workflows/ci.yml`) runs the checks for both demos, and `npm run shared:check`, on every push to main and pull request.
- **Look at it** at about 375px and 1280px wide, in light and dark, and in verdigris as well as vermilion (the gear on the right edge, or `<html data-accent="verdigris">`). The manual checklist is under "Manual checks" in [`TOOLING.md`](TOOLING.md).
- **Commits:** a short imperative subject ("Add a verdigris accent beside vermilion"), a body saying what and why. Kit, docs and demo changes go in separate commits.
- **Releasing:** never `git push` main by hand. Add an entry at the top of `demo/src/data/features.ts` for anything a visitor would notice, dated the release day, then `npm run release -- --dry-run` and `npm run release` at the repository's root (see Releases in the [`README`](README.md)). One release covers both kits and deploys both sites. The owner approves each release.

## Starting a new site with the kit

1. Make an Astro project with Tailwind v4 (`tailwindcss`, `@tailwindcss/vite`), Node 24 or later.
2. Copy `kit/` and `fonts/` into `src/design/`, side by side. The relative paths inside them (font URLs, the layout's font preload, `../panel.js`) depend on that layout.
3. Make `src/styles/global.css` start with `@import "../design/kit/tailwind.css";` and import it in your layout. Don't import `tailwindcss` or `theme.css` anywhere else.
4. Build pages on `kit/astro/BaseLayout.astro`: give it a `menu` (`MenuItem[]`, current page marked), an `accent` if not vermilion, and `barHeight` on pages with a `BottomBar` (it is optional). Open each page with a `Hero` or a `PageTitle`, and end it with a `Footer` in the `footer` slot, given the same `menu`.
5. Page layout is Tailwind utilities; components are kit classes. Colors only through the token utilities (`text-muted`, `bg-bar`, `text-accent-text`, …), never Tailwind's palette.
6. **A blog:** keep posts in a content collection, one Markdown file each. The index opens with a `PostFeature` (one post beside a square image) in place of a hero, then a `PostList` of the rest and a `Pager` when there are more than fit a page; the feature stays on top of every page. A post opens with a `PostHeader`, puts its Markdown in a `.post-body` and ends with a `PostNav`. See the Post* and Pager sections of `COMPONENTS.md`.
7. **Code in Markdown:** set `markdown: { shikiConfig: { theme: 'css-variables' } }` in `astro.config.mjs`, so code takes the kit's code colors. Without it, Astro's default theme puts GitHub's dark colors and background on every code block.
8. Copy the tests from `TOOLING.md`. Don't edit the files in `src/design/`; a fix there belongs back in this repository.

The demo (`demo/src/layouts/SiteLayout.astro`, `demo/src/pages/`) is the worked example of all of this.

## Restyling an existing site with the kit

Restyling is mostly removing: the kit only works when it is the site's only visual system.

1. **Survey before changing anything.** Note the framework, how CSS is loaded (Tailwind and its version, CSS modules, a preprocessor, a UI library), how dark mode works, the fonts, the icon set, and the pieces each page uses (navigation, forms, lists, cards, modals). Map each piece to a kit component, and list the ones with no match. Show that map to the owner before restyling.
2. **Check for class name clashes.** The kit uses short, generic class names, including `.page`, `.row`, `.title`, `.label`, `.lead`, `.small`, `.muted`, `.num`, `.link`, `.btn`, `.chip`, `.field`, `.media`, `.figure`, `.icon`, `.panel`, `.drawer`, `.toast` and `.pager`. Search the site for each one first; an existing `.btn` or `.title` picks up the kit's styles the moment `theme.css` loads. Rename the site's own class, or move that markup onto the kit component. A code highlighter (Prism, highlight.js, a Shiki theme) clashes the same way, bringing its own colors and background: switch it to Shiki's css-variables theme, or remove it.
3. **Know what `theme.css` does globally:** `box-sizing` on everything, the `html`/`body` background, font and color, a 3px accent focus ring on every focusable element, and the hand cursor on buttons, summaries and labels. Expect every page to shift a little the moment it loads.
4. **Load it in the way that fits the site:**
   - *Tailwind v4:* replace the site's `@import "tailwindcss"` with the kit's `tailwind.css`, as for a new site.
   - *Tailwind v3:* `tailwind.css` needs v4. Upgrade (`npx @tailwindcss/upgrade`) first, or load `theme.css` on its own and leave the site's Tailwind alone.
   - *No Tailwind, or not Astro:* link `kit/theme.css` as a plain stylesheet (with `fonts/` beside `kit/`). The plain scripts (`panel.js`, `drawer.js`, …) work in any framework. The Astro components don't, so copy their markup from `COMPONENTS.md` or read it off the `.astro` files.
5. **Set up theming:** add the no-flash script from `DESIGN.md` to `<head>`, and replace the site's dark mode switch (a `.dark` class, say) with `<html data-theme>`; the kit's colors only follow `data-theme` and the system setting. Pick the accent with `data-accent`.
6. **Remove the old system as each part moves over:** its color palette and custom properties, other font families and weights, shadows, rounded corners, gradients, icon fonts, and a UI library's components. `theme.css` sits in a CSS layer (under Tailwind) or loads before the site's own CSS, so leftover unlayered site CSS wins every conflict and quietly undoes the kit.
7. **Go a page type at a time:** tokens, type and the top bar first (they touch every page), then lists and forms, then the rest. Commit after each step, so a problem can be traced to one step.
8. **Leave the content as it is:** don't rewrite copy, change URLs, or remove features to fit a component. Where the content and a rule conflict (an image with text set on it, a three-word all-caps label), raise it with the owner.
9. **Check** each page against the "Do not" list in `DESIGN.md`, add the axe tests from `TOOLING.md`, and run the manual checks in both themes at phone and desktop widths.
