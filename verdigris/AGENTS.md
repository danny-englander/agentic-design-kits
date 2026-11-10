# Verdigris: notes for AI agents

A design kit (CSS, a few plain scripts, Astro components) plus a demo site that uses all of it, built on Swiss Minimal. It lives in the `verdigris/` folder of Swiss Minimal's repository; paths in this file start from that folder unless they say otherwise. Three kinds of task come here: changing the kit, starting a new site with it, and restyling an existing site with it. Each has a section below.

Read first, whatever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will touch. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Check the Node version before running `node`, `npm` or `npx` in any project, this one or a site you are styling: look for an `.nvmrc` (here `demo/.nvmrc`) and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have.

## Verdigris is built on Swiss Minimal

Verdigris is its own package, `verdigris`, and Swiss Minimal (`swiss-minimal`) is its one dependency. Both live in one repository: Swiss Minimal at the root (`../kit/`, `../fonts/`, `../demo/`), Verdigris in this folder. Verdigris always uses the Swiss Minimal beside it, so there is no version to update, and a change that touches both kits is one pull request. Read the root [`AGENTS.md`](../AGENTS.md) too; its rules for the repository (Node, commits, releases) apply here.

- **What is here, and what is not.** `kit/` holds only what makes this Verdigris: `verdigris.css` (the look), `fonts.css` and `fonts/` (Cormorant), `tailwind.css` (loads Swiss Minimal's, then the two above), and the components written here (`kit/astro/`: `BaseLayout`, `Mark`, `Rosette`). The shared `theme.css`, the scripts and every other component are Swiss Minimal's, in `../kit/`.
- **Sites import everything from `verdigris`.** `kit/shared/` holds one small file for each Swiss Minimal component and script, passing it on, so a site writes `verdigris/astro/Hero.astro` or `verdigris/output.js` and never names Swiss Minimal. Those files are written by `npm run shared` (`scripts/shared.mjs`; it runs here or at the repository's root); don't edit them. `package.json`'s `exports` maps the names: the components written here are listed one by one, and the rest go to `kit/shared/`.
- **When Swiss Minimal adds, removes or renames a component or script,** run `npm run shared` and commit `kit/shared/` with that change. CI fails if `kit/shared/` is out of date (`npm run shared:check`). A change inside an existing file needs nothing here, but run this demo's checks: a renamed token, class or prop can break `verdigris.css`.
- **A change to the look** goes in `kit/verdigris.css`. **A fix to a shared component** goes in Swiss Minimal's `../kit/`, and both demos have it at once.
- **To change a shared component for Verdigris only,** write it in `kit/astro/` under the same file name and add it to `exports`, as `BaseLayout` is; `npm run shared` then leaves that name alone. Prefer a prop or a token in Swiss Minimal where one would do.
- If Verdigris needs a value `theme.css` hard-codes, add a token to Swiss Minimal first, in the same pull request. Don't override it rule by rule.

## Working on this repository

- **The demo installs the kit as a package.** The repository is an npm workspace (Swiss Minimal at the root, its `demo/`, this folder and this `demo/`), so the demo's `verdigris` is a link to `kit/` and `fonts/`, and `swiss-minimal` a link to the root, never a second copy: change a file in either kit and the demo has it. Install from the root or from any of those folders; either way there is one `node_modules` and one `package-lock.json`, both at the root. Neither package is on npm (`"private": true`); each release attaches both as files a site can install.
- **One change, three places.** A new or changed component means the CSS in `kit/verdigris.css` (plus an Astro component in `kit/astro/` if it has props or parts), its section in `COMPONENTS.md` (and its name in the list under Components in `DESIGN.md`), and a use in the demo, with a test if it has behavior.
- **The demo** is an Astro + Tailwind v4 site in `demo/`. The dev server moves to the next free port when one is busy, and `server.host` opens it on the local network, so it can run beside Swiss Minimal. Node comes from nvm (`demo/.nvmrc`, see above); in a shell without it on the PATH, prefix commands with `PATH=$HOME/.nvm/versions/node/v24.21.0/bin:$PATH`. The dev server is the `verdigris` entry in the root `.claude/launch.json` (port 4322, or the next free one).
- **Check:** `npx astro check` and `npm test` in `demo/`. The tests build the site and serve it on a free port picked for each run, then scan every page in both themes with axe, plus behavior tests. Add a new page to `PAGES` in `demo/tests/a11y.spec.ts`. `astro check` covers `kit/` as well as the demo. GitHub Actions (`../.github/workflows/ci.yml`) runs the same checks for both demos, and `npm run shared:check`, on every push to main and pull request.
- **Look at it** at about 375px and 1280px wide, in light and dark. The manual checklist is under "Manual checks" in Swiss Minimal's [`TOOLING.md`](../TOOLING.md), which serves both kits.
- **Commits:** a short imperative subject ("Add a plate frame for quotations"), a body saying what and why. Kit, docs and demo changes go in separate commits.
- **Releasing:** never `git push` main by hand. Add an entry at the top of `demo/src/data/features.ts` for anything a visitor would notice, dated the release day, then `npm run release -- --dry-run` and `npm run release` at the repository's root (see Releases in the root [`README`](../README.md)). One release covers both kits and deploys both sites. The owner approves each release.

## Starting a new site with the kit

1. Make an Astro project with Tailwind v4 (`tailwindcss`, `@tailwindcss/vite`), Node 24 or later.
2. Install the kit from a release: `npm install https://github.com/danny-englander/swiss-minimal-design-kit/releases/download/TAG/verdigris.tgz`, with `TAG` replaced by the newest tag listed at https://github.com/danny-englander/swiss-minimal-design-kit/releases (it is not on npm). Swiss Minimal comes with it. To update later, install a newer release's file the same way. Add `astro-icon` if the site uses `IconTemplates`.
3. Make `src/styles/global.css` start with `@import "verdigris/tailwind.css";` and import it in your layout. Don't import `tailwindcss` or `theme.css` anywhere else.
4. Build pages on `verdigris/astro/BaseLayout.astro`, and import every other component the same way (`verdigris/astro/Hero.astro`), types from `verdigris/types` and scripts as `verdigris/output.js`. Give the layout a `menu` (`MenuItem[]`, current page marked), and `barHeight` on pages with a `BottomBar` (it is optional). Open each page with a `Hero` or a `PageTitle`, and end it with a `Footer` in the `footer` slot, given the same `menu`.
5. Page layout is Tailwind utilities; components are kit classes. Colors only through the token utilities (`text-muted`, `bg-bar`, `text-accent-text`, …), never Tailwind's palette.
6. **A blog:** keep posts in a content collection, one Markdown file each. The index opens with a `PostFeature` (one post beside a square image) in place of a hero, then a `PostList` of the rest and a `Pager` when there are more than fit a page; the feature stays on top of every page. A post opens with a `PostHeader`, puts its Markdown in a `.post-body` and ends with a `PostNav`. See the Post* and Pager sections of `COMPONENTS.md`.
7. **Code in Markdown:** set `markdown: { shikiConfig: { theme: 'css-variables' } }` in `astro.config.mjs`, so code takes the kit's code colors. Without it, Astro's default theme puts GitHub's dark colors and background on every code block.
8. Copy the tests from Swiss Minimal's `TOOLING.md`. Don't edit the kit's files in `node_modules/`; a fix belongs back in the kit's repository.

The demo (`demo/src/layouts/SiteLayout.astro`, `demo/src/pages/`) is the worked example of all of this.

## Restyling an existing site with the kit

Restyling is mostly removing: the kit only works when it is the site's only visual system.

1. **Survey before changing anything.** Note the framework, how CSS is loaded (Tailwind and its version, CSS modules, a preprocessor, a UI library), how dark mode works, the fonts, the icon set, and the pieces each page uses (navigation, forms, lists, cards, modals). Map each piece to a kit component, and list the ones with no match. Show that map to the owner before restyling.
2. **Check for class name clashes.** The kit uses short, generic class names, including `.page`, `.row`, `.title`, `.label`, `.lead`, `.small`, `.muted`, `.num`, `.link`, `.btn`, `.chip`, `.field`, `.media`, `.figure`, `.icon`, `.panel`, `.drawer`, `.toast` and `.pager`. Search the site for each one first; an existing `.btn` or `.title` picks up the kit's styles the moment `theme.css` loads. Rename the site's own class, or move that markup onto the kit component. A code highlighter (Prism, highlight.js, a Shiki theme) clashes the same way, bringing its own colors and background: switch it to Shiki's css-variables theme, or remove it.
3. **Know what `theme.css` does globally:** `box-sizing` on everything, the `html`/`body` background, font and color, a 3px accent focus ring on every focusable element, and the hand cursor on buttons, summaries and labels. Expect every page to shift a little the moment it loads.
4. **Load it in the way that fits the site:**
   - *Tailwind v4:* replace the site's `@import "tailwindcss"` with the kit's `tailwind.css`, as for a new site.
   - *Tailwind v3:* `tailwind.css` needs v4. Upgrade (`npx @tailwindcss/upgrade`) first, or load `theme.css` on its own and leave the site's Tailwind alone.
   - *No Tailwind, or not Astro:* link Swiss Minimal's `theme.css` (`node_modules/swiss-minimal/kit/theme.css`, with its `fonts/` beside its `kit/`) and then `kit/verdigris.css` and `kit/fonts.css` as plain stylesheets (with this package's `fonts/` beside its `kit/`). The plain scripts (`panel.js`, `drawer.js`, …) work in any framework. The Astro components don't, so copy their markup from `COMPONENTS.md` or read it off the `.astro` files.
5. **Set up theming:** add the no-flash script from `DESIGN.md` to `<head>`, and replace the site's dark mode switch (a `.dark` class, say) with `<html data-theme>`; the kit's colors only follow `data-theme` and the system setting. 
6. **Remove the old system as each part moves over:** its color palette and custom properties, other font families and weights, shadows, rounded corners, gradients, icon fonts, and a UI library's components. `theme.css` sits in a CSS layer (under Tailwind) or loads before the site's own CSS, so leftover unlayered site CSS wins every conflict and quietly undoes the kit.
7. **Go a page type at a time:** tokens, type and the top bar first (they touch every page), then lists and forms, then the rest. Commit after each step, so a problem can be traced to one step.
8. **Leave the content as it is:** don't rewrite copy, change URLs, or remove features to fit a component. Where the content and a rule conflict (an image with text set on it, a three-word all-caps label), raise it with the owner.
9. **Check** each page against the "Do not" list in `DESIGN.md`, add the axe tests from Swiss Minimal's `TOOLING.md`, and run the manual checks in both themes at phone and desktop widths.
