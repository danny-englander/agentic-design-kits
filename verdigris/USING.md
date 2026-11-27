# Using Verdigris: notes for AI agents

How to start a new site with the kit, and how to restyle an existing site with it. Each has a section below. This file comes with the npm package (`node_modules/@agentic-design-kits/verdigris/USING.md`), beside the other files it names. [`llms.txt`](llms.txt), beside it, lists every file in the package. To change the kit itself, see `verdigris/AGENTS.md` in [the kit's repository](https://github.com/danny-englander/agentic-design-kits).

Read first, whichever the task: [`DESIGN.md`](DESIGN.md) (the rules, and its "Do not" list) and the parts of [`COMPONENTS.md`](COMPONENTS.md) you will use. [`tokens.json`](tokens.json) holds every token value; if `theme.css` disagrees, `tokens.json` wins.

Verdigris is built on Swiss Minimal (`@agentic-design-kits/swiss-minimal`), which is installed with it. A site imports everything from `@agentic-design-kits/verdigris` and never names Swiss Minimal.

Check the Node version before running `node`, `npm` or `npx` in the site: look for an `.nvmrc` and use the version it names (`nvm use` in that folder). Don't rely on whichever Node the shell happens to have. A new site has no `.nvmrc` yet; step 1 below makes one.

**As a skill.** The kit is also an agent skill that points here: `npx skills add danny-englander/agentic-design-kits --skill verdigris` (it lives in [`skills/verdigris/`](https://github.com/danny-englander/agentic-design-kits/tree/main/skills/verdigris) in the kit's repository). With it installed, an agent comes to this file by itself when a task calls for Verdigris.

## Starting a new site with the kit

Everything these steps need is in the package or written out below; nothing has to be fetched from the kit's repository.

1. **Make the project,** with Node 24 or later:

   ```bash
   npm create astro@latest my-site -- --template minimal --install --yes
   ```

   Add `--no-git` when the site sits inside an existing repository. Then, in the site's folder, write down the Node version, since a new site has no `.nvmrc` yet:

   ```bash
   node --version > .nvmrc
   ```

2. **Add Tailwind v4 and the type checker:**

   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

   ```bash
   npm install --save-dev @astrojs/check typescript
   ```

   Then make `astro.config.mjs` read:

   ```js
   import { defineConfig } from 'astro/config';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     compressHTML: true,
     markdown: { shikiConfig: { theme: 'css-variables' } },
     vite: { plugins: [tailwindcss()] },
   });
   ```

   The `markdown` line makes code in Markdown take the kit's code colors. Without it, Astro's default theme puts GitHub's dark colors and background on every code block.

   The `compressHTML` line is for Astro 7 and later. Astro 7's default (`'jsx'`) drops the space a line break used to make between an inline tag (`<a>`, `<code>`, `<kbd>`) and the text beside it, so words run together; `true` keeps the visible spacing. Without that line, keep each inline tag on the same line as the text around it, or write the space as `{' '}`. The kit's own components need neither. See [Astro 7 whitespace](https://cassidoo.co/post/astro-7-whitespace/).
3. **Install the kit:** `npm install @agentic-design-kits/verdigris`. Swiss Minimal comes with it. To update later, run `npm update`. Add `astro-icon` if the site uses `IconTemplates`.
4. **One stylesheet.** Make `src/styles/global.css` start with `@import "@agentic-design-kits/verdigris/tailwind.css";` and import it in your layout (`import '../styles/global.css';`). Don't import `tailwindcss` or `theme.css` anywhere else.
5. **Build pages on `BaseLayout`** (`@agentic-design-kits/verdigris/astro/BaseLayout.astro`), and import every other component the same way (`@agentic-design-kits/verdigris/astro/Hero.astro`), types from `@agentic-design-kits/verdigris/types` and scripts as `@agentic-design-kits/verdigris/output.js`. Give the layout a `title`, the site's name as `tagline` (it is the text at the left of the top bar), a `menu` (`MenuItem[]`, current page marked), and `barHeight` on pages with a `BottomBar` (it is optional). Open each page with a `Hero` or a `PageTitle` (a `Hero` with no picture can take a `Rosette` in its `art` slot), and end it with a `Footer` in the `footer` slot, given the site's name and the same menu: `<Footer slot="footer" name="Site name" links={menu} />`. A site with several pages wraps this in one layout of its own (`src/layouts/SiteLayout.astro`), so the menu and footer are written once.
6. **Sections and lists.** A numbered list is a `Section` holding `Row`s (ListRow in `COMPONENTS.md`). A section of anything else is plain markup with its heading at the page's left edge (Section in `COMPONENTS.md`). Page layout is Tailwind utilities; components are kit classes. Colors only through the token utilities (`text-muted`, `bg-bar`, `text-accent-text`, …), never Tailwind's palette.
7. **A blog:** keep posts in a content collection, one Markdown file each. The index opens with a `PostFeature` (one post beside a square image) in place of a hero, then a `PostList` of the rest and a `Pager` when there are more than fit a page; the feature stays on top of every page. A post opens with a `PostHeader`, puts its Markdown in a `.post-body` and ends with a `PostNav`. For a gallery, a video or a card for another post (`PostCard`) in the middle of a post, add `@astrojs/mdx` to the site's `integrations`, load `**/*.{md,mdx}` in the collection, and write that post as `.mdx` (see PostBody). See the Post* and Pager sections of `COMPONENTS.md`.
8. **A form** needs somewhere to send to. See "A form with nowhere to send" under Field in `COMPONENTS.md` before building a contact page.
9. **Replace the starter's favicon.** `public/favicon.svg` (and `favicon.ico`, if the starter made one) is Astro's logo. Draw the site's own as Favicon in `DESIGN.md` describes, and link it from `BaseLayout`'s `head` slot: `<link slot="head" rel="icon" type="image/svg+xml" href="/favicon.svg" />`. The layout writes no icon link itself.
10. **The site's `AGENTS.md`.** The starter may have written one, with Astro's own notes. Keep those and add the site's part above them; don't replace the file, and don't make a second one. With no file there, make one. The part to add:

    ```md
    # Notes for AI agents

    This site uses the Verdigris design kit, installed from npm as
    @agentic-design-kits/verdigris. Before changing a page, read, in
    node_modules/@agentic-design-kits/verdigris/: USING.md, DESIGN.md
    (the rules, and its "Do not" list) and the parts of COMPONENTS.md you
    will use. llms.txt, beside them, lists every file in the package.

    - Use the Node version in .nvmrc.
    - Build pages on BaseLayout, and open each with a Hero or a PageTitle.
    - Page layout is Tailwind utilities; components are kit classes.
    - Colors only through the token utilities, never Tailwind's palette.
    - No capitals anywhere, and no text under 18px.
    - Don't edit the kit in node_modules/. A fix belongs in the kit's repository.
    - Before calling a change done: npx astro check, npm run build and npm test.
    ```

11. **Add the tests** from Swiss Minimal's `TOOLING.md` (`node_modules/@agentic-design-kits/swiss-minimal/TOOLING.md`): its Set up, the config, and the scan under "What to scan". For a new site, scan:
    - every page, in light and dark. For pages built from one template (blog posts, a paged index), one of each is enough: one post, and page 2 of the index;
    - each tab of the panel, if the layout has `panelTabs`, and the drawer open, if the site has one;
    - a filtered list or a starred favorite, only if the site has them.

    Add the no-capitals test below as `tests/no-capitals.spec.ts`. Add a behavior test only for a component the site uses that has behavior ("Beyond axe" lists them). A site of plain pages needs the scan alone. The tests need a browser: that file says what to do when `npx playwright install chromium` can't be run.
12. **Check before calling it done:** `npx astro check` (no errors), `npm run build` (no errors or warnings) and `npm test`. If the tests could not run, say so and why; don't report them as passing. Then go down the "Do not" list in `DESIGN.md` and the manual checks in Swiss Minimal's `TOOLING.md`, at about 375px and 1280px wide, in light and dark.

Don't edit either kit's files in `node_modules/`; a fix belongs back in [the kit's repository](https://github.com/danny-englander/agentic-design-kits).

### The no-capitals test

Verdigris has no all-caps text and no small caps (see Content and voice in `DESIGN.md`). The kit's own stylesheet never sets them; this test catches a site's own CSS doing it. It reads the build, which `npm test` has just made, then looks at every element on each page. List the site's pages in `PAGES`.

```ts
import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';

const PAGES = ['/', '/work', '/about', '/contact'];

test('the built CSS never uppercases or sets small caps', () => {
  const dir = new URL('../dist/_astro/', import.meta.url);
  const css = readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(new URL(f, dir), 'utf8')).join('');
  expect(css.length).toBeGreaterThan(0);
  expect(css).not.toMatch(/font-variant(-caps)?:[^;}]*(small-caps|all-small-caps|petite-caps|unicase|titling-caps)/);
  expect(css).not.toMatch(/"(smcp|c2sc|pcap|c2pc)"/);
  expect(css).not.toMatch(/text-transform:\s*uppercase/);
});

for (const path of PAGES) {
  test(`nothing on ${path} renders in capitals`, async ({ page }) => {
    await page.goto(path);
    const caps = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => getComputedStyle(el).textTransform === 'uppercase' || getComputedStyle(el).fontVariantCaps !== 'normal')
        .map((el) => el.tagName),
    );
    expect(caps).toEqual([]);
  });
}
```

It can't see capitals typed into the text itself ("CONTACT"); check those by eye.

The kit's demo site is a worked example of all of this, for a person to look at; the steps above don't depend on it: [`verdigris/demo/`](https://github.com/danny-englander/agentic-design-kits/tree/main/verdigris/demo) in the kit's repository (`src/layouts/SiteLayout.astro`, `src/pages/`), live at [verdigris.ch](https://www.verdigris.ch).

## Restyling an existing site with the kit

Restyling is mostly removing: the kit only works when it is the site's only visual system.

1. **Survey before changing anything.** Note the framework, how CSS is loaded (Tailwind and its version, CSS modules, a preprocessor, a UI library), how dark mode works, the fonts, the icon set, and the pieces each page uses (navigation, forms, lists, cards, modals). Map each piece to a kit component, and list the ones with no match. Show that map to the owner before restyling. On Astro 7 or later, add `compressHTML: true` to `astro.config.mjs` if it isn't there, or words beside links and inline code may run together (see step 2 of a new site).
2. **Check for class name clashes.** The kit uses short, generic class names, including `.page`, `.row`, `.title`, `.label`, `.lead`, `.small`, `.muted`, `.num`, `.link`, `.btn`, `.chip`, `.field`, `.media`, `.figure`, `.icon`, `.panel`, `.drawer`, `.toast` and `.pager`. Search the site for each one first; an existing `.btn` or `.title` picks up the kit's styles the moment `theme.css` loads. Rename the site's own class, or move that markup onto the kit component. A code highlighter (Prism, highlight.js, a Shiki theme) clashes the same way, bringing its own colors and background: switch it to Shiki's css-variables theme, or remove it.
3. **Know what `theme.css` does globally:** `box-sizing` on everything, the `html`/`body` background, font and color, a 3px accent focus ring on every focusable element, and the hand cursor on buttons, summaries and labels. Expect every page to shift a little the moment it loads.
4. **Load it in the way that fits the site:**
   - *Tailwind v4:* replace the site's `@import "tailwindcss"` with the kit's `tailwind.css`, as for a new site.
   - *Tailwind v3:* `tailwind.css` needs v4. Upgrade (`npx @tailwindcss/upgrade`) first, or load `theme.css` on its own and leave the site's Tailwind alone.
   - *No Tailwind, or not Astro:* link Swiss Minimal's `theme.css` (`node_modules/@agentic-design-kits/swiss-minimal/kit/theme.css`, with its `fonts/` beside its `kit/`) and then `kit/verdigris.css` and `kit/fonts.css` as plain stylesheets (with this package's `fonts/` beside its `kit/`). The plain scripts (`panel.js`, `drawer.js`, …) work in any framework. The Astro components don't, so copy their markup from `COMPONENTS.md` or read it off the `.astro` files.
5. **Set up theming:** add the no-flash script from `DESIGN.md` to `<head>`, and replace the site's dark mode switch (a `.dark` class, say) with `<html data-theme>`; the kit's colors only follow `data-theme` and the system setting. 
6. **Remove the old system as each part moves over:** its color palette and custom properties, other font families and weights, shadows, rounded corners, gradients, icon fonts, and a UI library's components. `theme.css` sits in a CSS layer (under Tailwind) or loads before the site's own CSS, so leftover unlayered site CSS wins every conflict and quietly undoes the kit.
7. **Go a page type at a time:** tokens, type and the top bar first (they touch every page), then lists and forms, then the rest. Commit after each step, so a problem can be traced to one step.
8. **Leave the content as it is:** don't rewrite copy, change URLs, or remove features to fit a component. Where the content and a rule conflict (an image with text set on it, a three-word all-caps label), raise it with the owner.
9. **Check** each page against the "Do not" list in `DESIGN.md`, add the axe tests from Swiss Minimal's `TOOLING.md` (`node_modules/@agentic-design-kits/swiss-minimal/TOOLING.md`), and run the manual checks in both themes at phone and desktop widths.
