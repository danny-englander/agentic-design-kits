---
name: swiss-minimal
description: Build or restyle a website with the Swiss Minimal design kit (@agentic-design-kits/swiss-minimal), a Swiss / Bauhaus kit for Astro and Tailwind v4. Use when a project has the kit installed or the user asks for Swiss Minimal, and the task is to start a site, add or change a page or component, restyle an existing site, or check a page against the kit's rules.
---

# Swiss Minimal

Swiss Minimal is an agentic design kit: a set of rules for you to follow, not a library of components to copy and paste. The rules ship inside the npm package, at the version the site has installed. Read them there. This skill only tells you where to look and in what order; it does not repeat them.

## Find the kit

Look for `node_modules/@agentic-design-kits/swiss-minimal/`.

- **It is there:** read its `llms.txt`, the index of the package's files.
- **It is not there:** install it with `npm install @agentic-design-kits/swiss-minimal`, in an Astro project with Tailwind v4 and Node 24 or later. Check the project's `.nvmrc` before running `node`, `npm` or `npx`. With no site at all yet, make the project first: `USING.md`'s new-site steps begin with the command for it, and that file is in the kit's repository until the package is installed.

If the project has `@agentic-design-kits/verdigris` installed, it is a Verdigris site: use the `verdigris` skill and import from that package, never from Swiss Minimal.

## Read, in this order

All paths are inside `node_modules/@agentic-design-kits/swiss-minimal/`.

1. `USING.md`: the steps for the two jobs most people bring, starting a new site and restyling an existing one. Follow the section for your task.
2. `DESIGN.md`: the rules, and the "Do not" list at its end. Read all of it before writing markup or CSS.
3. `COMPONENTS.md`: read the section for each component you will use, for its markup, behavior and don'ts.
4. `tokens.json`: every token value. If `kit/theme.css` disagrees, `tokens.json` wins.
5. `TOOLING.md`: the accessibility tests to copy into the site, and the manual checklist.

## While you work

- Import everything from `@agentic-design-kits/swiss-minimal` (`/tailwind.css`, `/astro/Hero.astro`, `/types`). Never edit files in `node_modules`.
- Use the kit's classes and token utilities. Never add a color, a typeface, a shadow or a radius the kit does not have.
- One accent for a site, vermilion or azure, set once on `BaseLayout`.
- When the kit has no component for something, build it from the rules in `DESIGN.md`. When a rule and the request conflict, say so before going on.

## Before you finish

Check each page against the "Do not" list in `DESIGN.md`, at about 375px and 1280px wide, in light and dark. Run the site's type check and tests, and the axe tests from `TOOLING.md` if the site has them.
