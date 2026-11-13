# Agentic Design Kits

[![CI](https://github.com/danny-englander/agentic-design-kits/actions/workflows/ci.yml/badge.svg)](https://github.com/danny-englander/agentic-design-kits/actions/workflows/ci.yml)
[![Node 24+](https://img.shields.io/badge/node-24%2B-blue)](https://nodejs.org/)
[![Astro 7](https://img.shields.io/badge/astro-7-blue)](https://astro.build/)
[![Tailwind v4](https://img.shields.io/badge/tailwind-v4-blue)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/github/license/danny-englander/agentic-design-kits)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/danny-englander/agentic-design-kits)](https://github.com/danny-englander/agentic-design-kits/commits/main)

Design kits your AI agent can implement, for Astro and Tailwind v4.

A kit here is not a library of components to copy and paste. It is a set of rules, and an agent that follows them: what each color is for, which weights to use, where a rule goes, and when not to add anything at all. Say what the site should do, and a coding agent picks the components, writes the code and checks it against the rules.

## The kits

| Kit | Demo | The look | Source |
| --- | --- | --- | --- |
| **Swiss Minimal** | [swissminimal.ch](https://www.swissminimal.ch) | Swiss / Bauhaus: type-led, flat color, thick rules, one typeface (Overused Grotesk). One accent for each site, vermilion or verdigris. | the repository's root |
| **Verdigris** | [verdigris.ch](https://verdigris.ch) | Swiss Minimal's strict grid, set in Cormorant, in copper green and copper, with engraved line work. No capitals anywhere. | [`verdigris/`](verdigris) |

Swiss Minimal is the base. Verdigris is built on it: it uses Swiss Minimal's stylesheet, scripts and components as they are, and adds its own tokens, typeface and ornament on top. A fix to a shared component is made once, in Swiss Minimal, and both kits have it.

Each demo site has an Agents page with prompts to start from: [swissminimal.ch/agents](https://www.swissminimal.ch/agents/) and [verdigris.ch/agents](https://verdigris.ch/agents/).

## What a kit is made of

Each kit has the same parts, written so that an agent can read them and a person can check the result.

- **`DESIGN.md`:** the rules (color, type, layout, images, motion, accessibility, the Tailwind setup) and a "Do not" list.
- **`COMPONENTS.md`:** the markup, behavior and do's and don'ts for each component.
- **`AGENTS.md`** (also `CLAUDE.md`): notes for AI agents on three tasks: working on the kit, starting a new site with it, and restyling an existing one.
- **`tokens.json`:** every token value, light and dark, with a note on what each is for.
- **`kit/`:** the CSS (plain, with a Tailwind v4 entry point), a few small plain scripts and the Astro components.
- **`fonts/`:** the kit's typeface.
- **`demo/`:** a small Astro site that uses every component, and the tests that scan it.

## In this repository

The repository is one npm workspace. Each demo installs its kit as a package through that workspace, so it always runs the files in `kit/` and `fonts/` beside it.

**Swiss Minimal**, at the root:

- [`DESIGN.md`](DESIGN.md), [`COMPONENTS.md`](COMPONENTS.md), [`AGENTS.md`](AGENTS.md) and [`tokens.json`](tokens.json).
- [`kit/`](kit): `tailwind.css`, `theme.css`, the scripts (`panel.js`, `new-dot.js`, `drawer.js`, `jump.js`, `marquee.js`, `file-pick.js`, `output.js`, `dialog.js`, `favorites.js`, `icon-controls.js`) and the Astro components.
- [`fonts/`](fonts): Overused Grotesk, and Source Code Pro for code (both SIL OFL 1.1).
- [`demo/`](demo): the site at swissminimal.ch.

**Verdigris**, in [`verdigris/`](verdigris), with its own [`README`](verdigris/README.md):

- [`DESIGN.md`](verdigris/DESIGN.md), [`COMPONENTS.md`](verdigris/COMPONENTS.md), [`AGENTS.md`](verdigris/AGENTS.md) and [`tokens.json`](verdigris/tokens.json).
- [`verdigris/kit/`](verdigris/kit): only what makes it Verdigris: `tailwind.css`, `verdigris.css`, `fonts.css` and the components written there (`BaseLayout`, `Mark`, `Rosette`). `kit/shared/` passes on Swiss Minimal's components and scripts, so a site imports all of them from `@agentic-design-kits/verdigris`.
- [`verdigris/fonts/`](verdigris/fonts): Cormorant (SIL OFL 1.1).
- [`verdigris/demo/`](verdigris/demo): the site at verdigris.ch.

**For both kits:**

- [`TOOLING.md`](TOOLING.md): recipes for accessibility tests (Playwright and axe) and date-tagged releases, and a manual checklist.
- [`scripts/`](scripts): the release and packing scripts.

## Install a kit

Both kits are on npm, under the `@agentic-design-kits` scope.

Swiss Minimal:

```bash
npm install @agentic-design-kits/swiss-minimal
```

```css
@import "@agentic-design-kits/swiss-minimal/tailwind.css";
```

Verdigris, which brings Swiss Minimal with it:

```bash
npm install @agentic-design-kits/verdigris
```

```css
@import "@agentic-design-kits/verdigris/tailwind.css";
```

To update, run `npm update`, or the same command again. Versions follow the release date: `2026.1113.0` is the first release on 13 November 2026, and `2026.1113.1` a second that day. The steps after that (the layout, the menu, a blog, code in Markdown) are under "Starting a new site with the kit" in each kit's `AGENTS.md`.

## Run a demo

Needs Node 24 or later (each demo's `.nvmrc` pins 24). Swiss Minimal:

```bash
cd demo
nvm use
npm install
npm run dev
```

For Verdigris, the same in `verdigris/demo`. The two can run side by side; each dev server takes the next free port.

## Test a demo

Builds the demo and scans every page, the menu tabs and the drawer for WCAG 2.1 AA problems in light and dark, plus behavior tests. See [`TOOLING.md`](TOOLING.md).

```bash
cd demo
npx playwright install chromium
npm test
```

For Verdigris, the same in `verdigris/demo`. A change to Swiss Minimal's `kit/` or `fonts/` changes Verdigris too, so run both. When Swiss Minimal adds, removes or renames a component or script, run this at the repository's root, so Verdigris passes it on:

```bash
npm run shared
```

## Releases

Each release is a date tag on main (`v2026.10.19`, or `v2026.10.19.2` for a second that day) with a GitHub Release. One release covers both kits: its notes come from each demo's Features list (`demo/src/data/features.ts` and `verdigris/demo/src/data/features.ts`), and both kits are published to npm (`@agentic-design-kits/swiss-minimal`, `@agentic-design-kits/verdigris`) with the date as their version. At the repository's root:

```bash
npm run release -- --dry-run
```

```bash
npm run release
```

The dry run shows the tag and notes and changes nothing. The real run asks first, then runs both demos' tests, pushes main, pushes the tag and publishes the GitHub Release. The push to main deploys both sites, and the pushed tag starts the Publish workflow ([`.github/workflows/publish.yml`](.github/workflows/publish.yml)), which puts both kits on npm. It only runs on a clean, up-to-date main, and stops if a new feature isn't dated today. Before releasing something a visitor would notice, add it at the top of that kit's `features.ts`. `npm run pack -- --tag v2026.11.10` writes the two package files to `packed/` without releasing, to look at what npm would get. The script is Dial Hopping's, adapted; see "Releases" in [`TOOLING.md`](TOOLING.md).

## License

MIT: see [`LICENSE`](LICENSE). The fonts in [`fonts/`](fonts) and [`verdigris/fonts/`](verdigris/fonts) keep their own license, SIL OFL 1.1.
