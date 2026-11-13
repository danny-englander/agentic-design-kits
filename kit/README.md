![The demo's home page in dark mode: "Swiss Minimal" in large bold type beside an abstract composition of black, grey and red shapes](https://raw.githubusercontent.com/danny-englander/agentic-design-kits/main/docs/home-dark.webp)

[swissminimal.ch](https://www.swissminimal.ch)

# Swiss Minimal Design Kit

A design kit your AI agent can implement, for Astro and Tailwind v4. Swiss / Bauhaus: type-led, flat color, thick rules, one typeface.

It is not a library of components to copy and paste. It is a set of rules, and an agent that follows them: what each color is for, which weights to use, where a rule goes, and when not to add anything at all. Say what the site should do, and a coding agent picks the components, writes the code and checks it against the rules. See [Agents](https://www.swissminimal.ch/agents/) on the demo site.

Swiss Minimal is one of the [Agentic Design Kits](https://github.com/danny-englander/agentic-design-kits). [Verdigris](https://www.npmjs.com/package/@agentic-design-kits/verdigris) is built on it.

## Install

```bash
npm install @agentic-design-kits/swiss-minimal
```

```css
@import "@agentic-design-kits/swiss-minimal/tailwind.css";
```

That one import, at the top of the site's global stylesheet, loads Tailwind and the kit. Components, types and scripts are imported by name:

```astro
---
import BaseLayout from '@agentic-design-kits/swiss-minimal/astro/BaseLayout.astro';
import Hero from '@agentic-design-kits/swiss-minimal/astro/Hero.astro';
import type { MenuItem } from '@agentic-design-kits/swiss-minimal/types';
---
```

To update, run `npm update`. Versions follow the release date: `2026.1113.0` is the first release on 13 November 2026, and `2026.1113.1` a second that day.

Each site picks one accent: vermilion (the default, a red leaning toward orange) or verdigris (the blue-green of copper patina), with `<BaseLayout accent="verdigris">` or `<html data-accent="verdigris">`.

## In the package

- `DESIGN.md`: the rules (color, type, layout, images, motion, accessibility, the Tailwind setup) and a "Do not" list. Read it first.
- `COMPONENTS.md`: the markup, behavior and do's and don'ts for each component.
- `TOOLING.md`: recipes for accessibility tests (Playwright and axe), and a manual checklist.
- `tokens.json`: every token value, light and dark, for both accents.
- `kit/`: `tailwind.css`, `theme.css`, a few small plain scripts and the Astro components.
- `fonts/`: Overused Grotesk, and Source Code Pro for code.

## For AI agents

The notes for agents are in the repository: [AGENTS.md](https://github.com/danny-englander/agentic-design-kits/blob/main/AGENTS.md) covers starting a new site with the kit and restyling an existing one. The demo site's [Agents](https://www.swissminimal.ch/agents/) page has prompts to start from.

## License

MIT. The fonts keep their own license, SIL OFL 1.1; each license file is beside its font in `fonts/`.
