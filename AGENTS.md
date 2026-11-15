# Swiss Minimal: notes for AI agents

A design kit (CSS, a few plain scripts, Astro components) plus a demo site that uses all of it. This file is for changing the kit. Starting a new site with it, or restyling an existing one, is in [`USING.md`](USING.md), which also comes with the npm package.

Read first, whatever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will touch. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Check the Node version before running `node`, `npm` or `npx` in this project: look for an `.nvmrc` (here `demo/.nvmrc`) and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have.

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

## Starting a new site, or restyling one

Those steps are in [`USING.md`](USING.md). It is in the npm package too (`node_modules/@agentic-design-kits/swiss-minimal/USING.md`), so an agent working on a site has it beside `DESIGN.md` and `COMPONENTS.md`. Change the steps there, not here.
