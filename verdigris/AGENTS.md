# Verdigris: notes for AI agents

A design kit (CSS, a few plain scripts, Astro components) plus a demo site that uses all of it, built on Swiss Minimal. It lives in the `verdigris/` folder of Swiss Minimal's repository; paths in this file start from that folder unless they say otherwise. This file is for changing the kit. Starting a new site with it, or restyling an existing one, is in [`USING.md`](USING.md), which also comes with the npm package.

Read first, whatever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will touch. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Check the Node version before running `node`, `npm` or `npx` in this project: look for an `.nvmrc` (here `demo/.nvmrc`) and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have.

## Verdigris is built on Swiss Minimal

Verdigris is its own package, `@agentic-design-kits/verdigris`, and Swiss Minimal (`@agentic-design-kits/swiss-minimal`) is its one dependency. Both live in one repository: Swiss Minimal at the root (`../kit/`, `../fonts/`, `../demo/`), Verdigris in this folder. Verdigris always uses the Swiss Minimal beside it, so there is no version to update, and a change that touches both kits is one pull request. Read the root [`AGENTS.md`](../AGENTS.md) too; its rules for the repository (Node, commits, releases) apply here.

- **What is here, and what is not.** `kit/` holds only what makes this Verdigris: `verdigris.css` (the look), `fonts.css` and `fonts/` (Cormorant), `tailwind.css` (loads Swiss Minimal's, then the two above), and the components written here (`kit/astro/`: `BaseLayout`, `Mark`, `Rosette`). The shared `theme.css`, the scripts and every other component are Swiss Minimal's, in `../kit/`.
- **Sites import everything from `@agentic-design-kits/verdigris`.** `kit/shared/` holds one small file for each Swiss Minimal component and script, passing it on, so a site writes `@agentic-design-kits/verdigris/astro/Hero.astro` or `@agentic-design-kits/verdigris/output.js` and never names Swiss Minimal. Those files are written by `npm run shared` (`scripts/shared.mjs`; it runs here or at the repository's root); don't edit them. `package.json`'s `exports` maps the names: the components written here are listed one by one, and the rest go to `kit/shared/`.
- **When Swiss Minimal adds, removes or renames a component or script,** run `npm run shared` and commit `kit/shared/` with that change. CI fails if `kit/shared/` is out of date (`npm run shared:check`). A change inside an existing file needs nothing here, but run this demo's checks: a renamed token, class or prop can break `verdigris.css`.
- **A change to the look** goes in `kit/verdigris.css`. **A fix to a shared component** goes in Swiss Minimal's `../kit/`, and both demos have it at once.
- **To change a shared component for Verdigris only,** write it in `kit/astro/` under the same file name and add it to `exports`, as `BaseLayout` is; `npm run shared` then leaves that name alone. Prefer a prop or a token in Swiss Minimal where one would do.
- If Verdigris needs a value `theme.css` hard-codes, add a token to Swiss Minimal first, in the same pull request. Don't override it rule by rule.

## Working on this repository

- **The demo installs the kit as a package.** The repository is an npm workspace (Swiss Minimal at the root, its `demo/`, this folder and this `demo/`), so the demo's `@agentic-design-kits/verdigris` is a link to `kit/` and `fonts/`, and `@agentic-design-kits/swiss-minimal` a link to the root, never a second copy: change a file in either kit and the demo has it. Install from the root or from any of those folders; either way there is one `node_modules` and one `package-lock.json`, both at the root. Each release publishes both packages to npm. The `"private": true` in each `package.json` only stops an `npm publish` from the repository itself: the published packages are packed by the root's `scripts/pack.ts`, which gives them the release's version.
- **One change, three places.** A new or changed component means the CSS in `kit/verdigris.css` (plus an Astro component in `kit/astro/` if it has props or parts), its section in `COMPONENTS.md` (and its name in the list under Components in `DESIGN.md`), and a use in the demo, with a test if it has behavior.
- **The demo** is an Astro + Tailwind v4 site in `demo/`. The dev server moves to the next free port when one is busy, and `server.host` opens it on the local network, so it can run beside Swiss Minimal. Node comes from nvm (`demo/.nvmrc`, see above); in a shell without it on the PATH, prefix commands with `PATH=$HOME/.nvm/versions/node/v24.21.0/bin:$PATH`. The dev server is the `verdigris` entry in the root `.claude/launch.json` (port 4322, or the next free one).
- **Check:** `npx astro check` and `npm test` in `demo/`. The tests build the site and serve it on a free port picked for each run, then scan every page in both themes with axe, plus behavior tests. Add a new page to `PAGES` in `demo/tests/a11y.spec.ts`. `astro check` covers `kit/` as well as the demo. GitHub Actions (`../.github/workflows/ci.yml`) runs the same checks for both demos, and `npm run shared:check`, on every push to main and pull request.
- **Look at it** at about 375px and 1280px wide, in light and dark. The manual checklist is under "Manual checks" in Swiss Minimal's [`TOOLING.md`](../TOOLING.md), which serves both kits.
- **Commits:** a short imperative subject ("Add a plate frame for quotations"), a body saying what and why. Kit, docs and demo changes go in separate commits.
- **Releasing:** never `git push` main by hand. Add an entry at the top of `demo/src/data/features.ts` for anything a visitor would notice, dated the release day, then `npm run release -- --dry-run` and `npm run release` at the repository's root (see Releases in the root [`README`](../README.md)). One release covers both kits and deploys both sites. The owner approves each release.

## Starting a new site, or restyling one

Those steps are in [`USING.md`](USING.md). It is in the npm package too (`node_modules/@agentic-design-kits/verdigris/USING.md`), so an agent working on a site has it beside `DESIGN.md` and `COMPONENTS.md`. Change the steps there, not here.
