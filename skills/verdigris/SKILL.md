---
name: verdigris
description: Build or restyle a website with the Verdigris design kit (@agentic-design-kits/verdigris), a book-warm kit in Cormorant, copper green and copper for Astro and Tailwind v4, built on Swiss Minimal. Use when a project has the kit installed or the user asks for Verdigris, and the task is to start a site, add or change a page or component, restyle an existing site, or check a page against the kit's rules.
---

# Verdigris

Verdigris is an agentic design kit: a set of rules for you to follow, not a library of components to copy and paste. The rules ship inside the npm package, at the version the site has installed. Read them there. This skill only tells you where to look and in what order; it does not repeat them.

## Find the kit

Look for `node_modules/@agentic-design-kits/verdigris/`.

- **It is there:** read its `llms.txt`, the index of the package's files.
- **It is not there:** install it with `npm install @agentic-design-kits/verdigris`, in an Astro project with Tailwind v4 and Node 24 or later. Check the project's `.nvmrc` before running `node`, `npm` or `npx`. With no site at all yet, make the project first: `USING.md`'s new-site steps begin with the command for it, and that file is in the kit's repository until the package is installed.

Swiss Minimal (`@agentic-design-kits/swiss-minimal`) is installed with it, as the kit it is built on. Import everything from `@agentic-design-kits/verdigris`, never from Swiss Minimal.

## Read, in this order

Paths are inside `node_modules/@agentic-design-kits/verdigris/` unless they say otherwise.

1. `USING.md`: the steps for the two jobs most people bring, starting a new site and restyling an existing one. Follow the section for your task.
2. `DESIGN.md`: the rules, and the "Do not" list at its end. Read all of it before writing markup or CSS.
3. `COMPONENTS.md`: read the section for each component you will use, for its markup, behavior and don'ts.
4. `tokens.json`: every token value. If the stylesheets disagree, `tokens.json` wins.
5. `node_modules/@agentic-design-kits/swiss-minimal/TOOLING.md`: the accessibility tests to copy into the site, and the manual checklist. It serves both kits.

## While you work

- Import everything from `@agentic-design-kits/verdigris` (`/tailwind.css`, `/astro/Hero.astro`, `/types`). Never edit files in `node_modules`.
- Use the kit's classes and token utilities. Never add a color, a typeface, a shadow or a radius the kit does not have.
- No capitals anywhere on a page. Verdigris marks the one thing that matters on a screen; copper is for labels and ornament and never marks an action.
- Ornament is allowed where it earns its place: it comes from the font first, and a page uses each large ornament once. See Ornament in `DESIGN.md`.
- When the kit has no component for something, build it from the rules in `DESIGN.md`. When a rule and the request conflict, say so before going on.

## Before you finish

Check each page against the "Do not" list in `DESIGN.md`, at about 375px and 1280px wide, in light and dark. Run the site's type check and tests, and the axe tests from `TOOLING.md` if the site has them.
