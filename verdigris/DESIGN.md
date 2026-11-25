# Verdigris

A book-warm look built on Swiss Minimal's grid: one family (Cormorant), a cream page, green-black ink, verdigris for what matters and copper for ornament. The structure stays Swiss; ornament is allowed where it earns its place. It works for a journal, a portfolio, a nonprofit or a product site; nothing in it assumes a subject.

## What to load

Verdigris is a package, built for **Astro with Tailwind v4** (no React needed). Install it (`npm install @agentic-design-kits/verdigris`) and import from `@agentic-design-kits/verdigris`: `@agentic-design-kits/verdigris/tailwind.css`, `@agentic-design-kits/verdigris/astro/Hero.astro`, `@agentic-design-kits/verdigris/output.js`, `@agentic-design-kits/verdigris/types`. It is built on Swiss Minimal, which is installed with it. The paths below say where each file lives: `kit/` and `fonts/` are this package, and the ones marked Swiss Minimal are in `node_modules/@agentic-design-kits/swiss-minimal/kit/`.

- `kit/tailwind.css`: the entry point for a Tailwind site. Imports Swiss Minimal's `tailwind.css` (Tailwind itself, `theme.css` in the `components` layer, and the token utilities), then `fonts.css` and `verdigris.css` in the same layer. See "With Tailwind v4".
- `theme.css` (Swiss Minimal): every token (light and dark), the base styles and every component class, in plain CSS. It brings Swiss Minimal's own typeface; `kit/fonts.css` here sets `--font-sans` to Cormorant after it, and `kit/astro/font.ts` names the font Verdigris's `BaseLayout` preloads.
- `kit/verdigris.css`: everything that makes this Verdigris: token overrides, type features and the new parts. `tailwind.css` loads it after `theme.css`; a plain page links it after `theme.css`. It also works on its own, without Tailwind. Dark mode follows the system unless `<html data-theme="light|dark">` is set.
- `panel.js` (Swiss Minimal, imported as `@agentic-design-kits/verdigris/panel.js`): the slide-down panel's behavior, tabs included. Plain JavaScript, no dependencies, like the other scripts: `new-dot.js` (the "new" dot), `drawer.js` (the second, non-modal panel), `jump.js` (jump to the current item), `marquee.js` (a scrolling title), `file-pick.js` (the file picker), `output.js` (live output), `dialog.js` (fills in for the native dialog where a browser is behind), `favorites.js` (favorite stars) and `icon-controls.js` (icon buttons for rows built in the browser).
- The Astro components, imported as `@agentic-design-kits/verdigris/astro/Name.astro`. `BaseLayout`, `Mark` and `Rosette` are written here (`kit/astro/`); the rest are Swiss Minimal's, passed on by `kit/shared/`: BaseLayout, Hero, PageTitle, Section, Row, Mark, Rosette, PostList, PostFeature, Pager, PostHeader, PostNav, Footer, BottomBar, FilePicker, SummaryList, OutputPanel, Dialog, Ellipse, NumCircle, MenuButton, MenuPanel, MenuItems, ThemeToggle, Drawer, DrawerButton, FavoriteButton, FeaturesList, Gallery, IconTemplates (needs `astro-icon`) and the types (`MenuItem`, `PanelTab`, `NewDot`, `Feature`, `Post`, `PostLink`, `GalleryItem`, `RelatedSite`). They use Tailwind utilities for layout and the kit classes for components.
- `kit/example.html`: a one-page demo using only `theme.css` and `verdigris.css`. Open it from the repository (it reads Swiss Minimal's `theme.css` from the `kit/` at the root) to see what "correct" looks like.
- `fonts/Cormorant-VF.woff2` and `fonts/Cormorant-Italic-VF.woff2` (variable, weights 300 to 700) and `fonts/Cormorant-LICENSE.txt`, SIL OFL 1.1. Keep the license beside the fonts. Source Code Pro, for code, comes with Swiss Minimal.
- `tokens.json`: the token values as data. If a value in `theme.css` ever differs, `tokens.json` wins.

Put this in `<head>` before first paint so a saved theme does not flash:

```html
<script>
  try {
    var u = new URL(location.href), t = u.searchParams.get('theme');
    if (t === 'light' || t === 'dark') {
      localStorage.setItem('theme', t);
      u.searchParams.delete('theme');
      history.replaceState(history.state, '', u.pathname + u.search + u.hash);
    } else t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) {}
</script>
```

A link from another site can carry the visitor's choice as `?theme=light` or `?theme=dark`: the script applies it, saves it as this site's choice and takes it out of the address bar. A site that links to its sister sites adds it only when the visitor has picked a theme with the toggle (`<html data-theme>` is set), as the link is pressed; with no choice made, both follow the system setting. `BaseLayout` does all of this.

## Principles

- **Structure is Swiss.** One grid, flat color, square corners, and rules that do real work. Everything else on this page sits on top of that.
- **One family, many voices.** Cormorant in light (display), medium (text), semibold (names and labels) and italic (asides). The one exception is code, set in Source Code Pro.
- **Ornament earns its place.** Decoration is allowed, within limits: it comes from the font first, it never carries meaning alone, and a page uses each large ornament once. See Ornament.
- **Scotch rule, thin rule.** A scotch rule (thick and thin, read as one) starts each section. Rows are separated by a 1px `rule`, with none after the last one.
- **One grid.** Section headings, list rows and descriptions share the same columns.
- **Two metals.** `accent` (verdigris) marks the one thing that matters on a screen. Copper is for headings, labels and ornament, and never marks an action.
- **No capitals.** No all-caps text and no small caps, anywhere. See Content and voice.
- **Flat.** No shadows, gradients or glass in the interface. The kit's six round marks stay, and the rosette is line art, not a surface.

## Content and voice

- Plain, short, declarative. "Send", "Menu", "All items". No exclamation marks, no emoji.
- **No all caps, anywhere, for accessibility.** Capitals have no word shapes, so many readers go letter by letter, and some screen readers spell a capitalized word out. That covers `text-transform: uppercase`, small caps (they have the same even outline) and capitals typed into a label. Labels, buttons and tabs are sentence case, kept to one or two words, and stand out by weight, place and copper. Real acronyms in running text, like "AI", are fine.
- An oval badge holds a short lowercase word, never a country code.
- A filtered view always says what it shows: "All items", "Writing · 7 items".
- Write the site's name in `display`, weight 300. The name set in type is the mark. A site may put one small symbol before it in the top bar (the demo's is Cormorant's fleuron), in the accent. Never a logo image.
- **Favicon.** The kit ships none, and a starter's own (Astro's logo) has to go. Draw a 24-unit square SVG: `paper` behind, and the top-bar mark in `accent-text`, or with no mark, one flat square of it. No letters, no gradient. Write the colors as hex, since a favicon can't read the page's variables, and swap them for dark inside the file:

  ```html
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <style>
      .bg { fill: #f2ede1 } .mark { fill: #256a50 }
      @media (prefers-color-scheme: dark) { .bg { fill: #0b1716 } .mark { fill: #51c297 } }
    </style>
    <rect class="bg" width="24" height="24"/>
    <rect class="mark" x="6" y="6" width="12" height="12"/>
  </svg>
  ```

  Save it as `public/favicon.svg` and link it with `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`, in `BaseLayout`'s `head` slot.

## Color

Light is the default. Dark keeps the same roles.

- Page: `paper` ground, `ink` text, section titles (`h2`) and rules, `copper-text` for `h3` and `h4` (`--heading-color`), `muted` for secondary text, `rule` for thin dividers.
- **Verdigris has three tokens, by size and ground.** `accent` is for large shapes and the focus ring only. Small text on `paper` uses `accent-text`; on a dark surface, `accent-bright`. Never set small text in plain `accent` (3.4:1 on light `paper`).
- **Copper has three too:** `copper` for large ornament, `copper-text` for `h3` and `h4` headings, labels and small ornament on `paper`, `copper-bright` on `bar`. Copper never marks an action, an active state or a link.
- The primary button is `accent-text` with `accent-ink` text.
- **Dark surfaces stay dark in both themes.** The panel, the drawer, the top bar while either is open, a bottom bar and the toast are `bar` with `bar-ink` text, a green-black in both themes.
- Small labels on `bar` are semibold `accent-bright` or `copper-bright`, never faded white.
- List rows fill on hover and when active: `row-hover-bg` / `row-active-bg` with every piece of text in `row-fg`. The active row also gets a 6px `row-edge` on its left.
- **Code colors are the exception.** Highlighted code keeps magenta, teal and orange, only inside `pre` and `code`, each passing 4.5:1 in both themes. See CodeBlock in `COMPONENTS.md`.
- Don't add a color. A new state reuses these roles. `data-accent` changes nothing here: Verdigris has one palette.

## Type

One family, `--font-sans` (Cormorant, falling back to Garamond, Iowan Old Style, Georgia). Code is the only exception: `code`, `pre`, `kbd` and `samp` use `--font-mono`, Source Code Pro at 400, scaled to 0.68em (code blocks 0.65em) because it is far larger on its body than Cormorant.

| Style | Use |
| --- | --- |
| `display` | Hero title, `clamp(4.75rem, 12.4vw, 11rem)`, 300, line height 0.88, -0.02em |
| `h2` | Section title, 2.75rem then 3.75rem from 768px, 300, -0.025em. In `ink`: its size marks it, and its light hairlines need ink to hold |
| `title` | A list item's name, 1.625rem then 1.875rem, 600, +0.01em |
| `lead` | Intro paragraph, 1.75rem then 1.875rem from 768px, 300 italic, line height 1.22. A post header's lead is the same style |
| `h3` | A heading under a section's `h2`: a plain `h3`, or `.h3` on any element. A subheading is always `h3` or `.h3`, never `.title`, which is a name in a list. `size-600` (1.875rem) then `size-700` (2.125rem) from 768px, 600, line height 1.15, -0.01em. An `h3` with a class (`.title`, `.label`) takes only its class. In `copper-text` (`copper-bright` on `bar`) |
| `h4` | A heading a step above body, in any context (`h4` or `.h4`): `size-500` (1.75rem), 600, line height 1.3. In `copper-text` (`copper-bright` on `bar`) |
| `body` | Body copy, 1.25rem then 1.375rem from 768px, 500, line height 1.5, Garamond forms on (`ss02`). Every paragraph, list item, card summary and post paragraph is set this way: no reading text has a size of its own |
| `small` | Meta, sublines, counts, 1.125rem, line height 1.4 |
| `note` | Captions, footnotes and the footer note: `size-200` (1.25rem), `muted`, line height 1.4; captions italic |
| `label` | 1 to 2 words, sentence case, 600 |
| `code` | Code, file names, commands, keys: `--font-mono` at 0.68em, never under 0.875rem; a code block at 0.65em, never under 16px (the 18px floor is for Cormorant, not Source Code Pro) |

- **18px is the floor.** Cormorant's x-height is 0.386 of its size against Overused Grotesk's 0.5, so 18px reads about as tall as 14px there. Code is the exception, as its x-height is large.
- **A paragraph is never `muted`.** Every `p` is `ink`, whether body text or `small`: never put `muted` or `text-muted` on one. `muted` belongs to meta, dates, numbers and labels, and to the kit classes that set it themselves (captions, footnotes, a post's meta line).
- **Weight follows size.** Light at display sizes, medium for reading, semibold for names. Never light under 1.75rem: the hairlines disappear.
- Figures are old-style in text. Add `.num` (lining, tabular) to any number that lines up in a column.
- Ligatures (`dlig`, `hlig`) and calligraphic forms (`ss01`) are for display sizes only.
- Every size, weight, line height (`--leading-body`, `--leading-lead`, `--leading-small`, `--leading-tight`), heading color (`--heading-color`, `--heading-color-bar`) and label style is a token at the top of `theme.css`, set for Verdigris in `verdigris.css`. A new rule uses these tokens, never a raw value.
- Code is plain HTML, no class, as in Swiss Minimal; see CodeBlock in `COMPONENTS.md`. Monospace never goes beyond code.

### OpenType features

Cormorant has many optional glyphs. Verdigris already sets these: `kern`, `liga` and `ss02` (Garamond forms) on body text, `dlig` on headings, old-style figures in text, and lining tabular figures in `.num`. The demo's Type and color page shows every feature off and on.

| Feature | What it changes | Use |
| --- | --- | --- |
| `dlig` | Joins c t, s t, s p, r t, t t, f u, Q y | Display sizes only; already on in headings |
| `hlig` | Joins ſ t and t z | Display sizes only |
| `liga` | Joins f with i, l, f | Leave on (the default) |
| `ss01` | Calligraphic A B J K Q R U, and g | Display sizes only |
| `ss02` | Garamond forms: A C G R, a e g, 1 | Already on in body text |
| `ss03` | U W, single-storey a and g, w y | Site-wide in place of `ss02`, if chosen; the two both change a and g, so use one |
| `ss04` | Umlaut dots | Site-wide, for German text, if chosen |
| `ss13` | Accents on capitals | Site-wide, if chosen |
| `ss15` | Dagger | Upright only |
| `cv01`, `cv02` | Tail of a Q on its own (not before u) | Display sizes |
| `cv05` | f | Site-wide, if chosen |
| `cv06`, `cv07` | Long s (ſ) | Upright only, for old spellings |
| `case` | Brackets, dashes, colon and @ raised to sit with capitals; lining figures | Around acronyms: "(NASA)" |
| `onum` / `lnum` | Old-style or lining figures | Old-style is already the default in text; `.num` sets lining |
| `tnum` | Tabular figures | Through `.num` |
| `frac` | Fractions | On the fraction only |
| `zero` | A dot in the zero (Cormorant's form of the slashed zero) | Where 0 and O could be confused |
| `ordn` | Raised a and o after a figure; No. becomes № | Where the text calls for it |
| `sups`, `subs` | Superscript, subscript figures | On the figures only |
| `cv03`, `cv04`, `ss07`, `ss08` | Italic only: two more Q tails, another a, the long-tailed Q before u | In italic, at display sizes |

- **Choose alternates once.** Set a site's alternate letters on `body`, or on the heading styles, so a letter has one shape everywhere. Don't switch them word by word.
- **Prefer `font-variant-*`** where it exists: `font-variant-ligatures` (`discretionary-ligatures`, `historical-ligatures`), `font-variant-numeric` (`oldstyle-nums`, `lining-nums`, `tabular-nums`, `diagonal-fractions`, `slashed-zero`, `ordinal`) and `font-variant-position` (`super`, `sub`). These combine on their own. Stylistic sets, character variants and `case` have no such property, so they need `font-feature-settings`.
- **`font-feature-settings` replaces, it doesn't add.** Setting it on an element drops every feature it inherited, including Verdigris's `ss02` on body text and `dlig` on headings. To let features stack, give each its own custom property, keep the kit's own in the list, and set only the one that changes:

  ```css
  body { font-feature-settings: "kern", "liga", var(--ff-ss02, "ss02" 1), var(--ff-ss04, "ss04" 0), var(--ff-zero, "zero" 0); }
  .codes { --ff-zero: "zero" 1; }
  ```

- **Ligatures stay in display text.** A ligature can confuse a screen reader, and copy and paste, when it stands for more than one letter.
- **The italic has fewer.** It has no `ss15`, `cv06` or `cv07`, and adds `cv03`, `cv04`, `ss07` and `ss08` of its own.
- **Never used:** `smcp`, `c2sc` and `ss05` (small caps, all small caps, unicase), as Verdigris has no capitals. `ss06` and `ss12` change only small caps. `ss09`, `ss10` and `ss14` change Cyrillic only.

## Layout

- Content width `page-max` (88rem), centered in `.page`, with `gutter` side padding (1rem, 2rem from 640px).
- A scotch rule opens each section (`.rule-thick`).
- Hero with generous space (`space-12`, `space-20` from 768px), then sections separated by `space-16`. A hero image takes its layout from its shape: square or portrait sits beside the text, 50/50 from 768px; landscape goes under the text at the full page width. Phones always stack, text first.
- Section header: scotch rule, then the grid row (range label, `h2` title, blurb). A section with nothing numbered in it has no range label, and its `h2` sits at the left edge of `.page`; see Section in `COMPONENTS.md`.
- List rows: 1px `rule` bottom border, none on the last row, `space-4` vertical padding. The row number sits `space-4` in from the left (1.25rem from 768px) so it stays clear of the active row's 6px edge.
- Mobile first. Rows stack on phones and become a column grid from 768px.
- Pages end with a `Footer`: the scotch rule, the site name and its links.
- A fixed bottom bar (`BottomBar`) is optional, and goes only on pages where something stays current while the page scrolls. On those pages, set `bar-h` to its height and reserve that space at the bottom of the page (`BaseLayout`'s `barHeight` prop does both). Without one, `--bar-h` is `0rem`.
- A page that needs a name but no hero opens with a `PageTitle`: one big `h1` across the width of `.page`, on the paper or on a `bar` block.
- A blog's index may open with a `PostFeature` (one post beside a square image) in place of a hero, kept at the top of every page when a `Pager` splits the list. A blog post opens with a `PostHeader`, centered, its text in a `.post-body` at a 45rem measure under it, and ends with a `PostNav`.
- Everything is square: `radius-none`. `radius-round` is for six marks only: the spinner, the "new" dot (`.new-dot`), the drawer's "more below" arrow (`.drawer-more`), the radio button (`.radio`), the oval badge (`.ellipse`, at 50%) and the number circle (`.num-circle`, at 50%). The switch stays square.

## Iconography

- **Glyphs come first.** Use the font's own: ❦ ⁂ † ‡ § ☞ ☜ ◆ ◇ ◊ and the arrows. The demo's Type and color page shows every ornament, arrow, shape and sign Cormorant has. A glyph that acts as a control needs an `aria-label`, as screen readers read glyphs by their Unicode names. CSS draws the menu bars and the plus and minus.
- **Marks are the icon set.** `Mark.astro` holds twelve drawn icons (menu, search, next, open, close, journal, write, letter, save, leaf, date, place): 24px grid, 1.25px line, round ends. Add new ones in the same pen.
- **A mark may stand beside its label,** which Swiss Minimal did not allow. It should add recognition, not repeat a whole row of the same picture.
- Third-party brand marks (YouTube, Spotify) still use Simple Icons, and a few actions Material Symbols, through `astro-icon`.
- **One color, always:** `currentColor`, turning `accent-bright` (on `bar`) or `accent-text` (on `paper`) on hover. Never a brand's own colors.
- **Sized to the text:** 1.625rem beside body text. Hit area at least 44px square.
- **Every icon-only control** gets a verb-first `aria-label` and a `title` tooltip. The icon itself is `aria-hidden="true"`.
- No icon font, no icon CDN, and no trash can: remove is a circled X.

## Ornament

Ornament is what separates this kit from Swiss Minimal, so it has its own limits.

- **Fleuron rule** (`.rule-fleuron`): a pause between parts of a page. Once a page at most.
- **Asterism** (⁂): the end of a piece (`.post-body--end`), or a Markdown `---` in a post.
- **Dagger** (†): a footnote mark.
- **Manicule** (☞): a `.notice`, for one note a reader must not miss.
- **Lozenge** (◆): separates metadata. Typed between two values, it is wrapped so it is not read aloud: `Writing <span class="text-copper-text" aria-hidden="true">◆</span> 2026`. A `PostHeader`'s byline draws its own in CSS.
- **Drop cap** (`.post-body--cap`): a post's first letter, through `::first-letter`, so screen readers still get the whole word.
- **Plate** (`.plate`): a framed quotation or title. One to a page, never around an image or a control.
- **Rosette** (`Rosette.astro`): engraved line work for a page with no picture of its own. It stays a figure on the grid: no text on it, and never a background.
- Ornament is `aria-hidden="true"`, every time, a glyph typed inline between words included: a screen reader would otherwise read "black diamond" or "asterism" mid-sentence. It is never the only way to say something. It is copper or verdigris, never both in one mark, the rosette aside.

## Images

Photos, artwork, screenshots and product shots are welcome. The test is whether the image is content: it shows the work, the person, the place or the thing the page is about. Filler is not: stock mood shots, background textures, patterns behind text.

- **Plain rectangles.** Square corners, no border, frame, shadow, overlay, tint or filter. The image's own edge is the edge.
- **On the grid.** An image spans whole columns and lines up with the text edges beside it. Inside the page it is never wider than `page-max`; a full-bleed image runs edge to edge with no gutter.
- **Fixed shapes.** Use one of 1:1, 4:3, 3:2 or 16:9 and crop to fill (`.media` with `--ratio`). Images in one list share a ratio. The exception is a gallery of artwork (`Gallery`), which shows each image whole at its own shape.
- **Color stays.** An image keeps its own colors; they do not count as adding a color to the palette. Do not recolor or desaturate to match.
- **No text on images.** Titles and captions go beside or below. If text must sit on an image, put it on a solid `bar` block, never straight on the picture.
- **Captions** go below in `size-200` and `muted`, left aligned, sentence case. Credits use the same style.
- **Dark mode.** Do not dim or invert images. A light image on the dark page reads as a light block, which is fine; if the art has a dark version, swap it with the theme.
- **Loading.** Give every image its width and height (or a ratio) so the page does not jump. The empty box fills with `rule` until it loads. Lazy-load everything except the hero.
- **Alt text** says what the image shows in one sentence. An image that only repeats the text beside it gets `alt=""`.
- **No motion.** No parallax, zoom-on-scroll, slow pan or auto-advancing carousel. A hover may swap the image; it never scales it.

## Motion

- Short and purposeful: 150ms hover swaps, 400 to 550ms slides with `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Only the activity indicator, the spinner, the panel and drawer, a dialog, accordions and panel tabs, an overlong title, the jump flash and a turning rosette move. A title scrolls three rounds at most, then stops. A rosette turns once in 30 seconds, always beside a switch that stops it.
- Hover labels wait 350ms before they show, so passing the pointer over the top bar doesn't flicker them.
- Always honor `prefers-reduced-motion`; `theme.css` switches slides, fades and loops off.

## States and accessibility

- Focus ring: 3px solid `accent` outline, 2px offset, on everything focusable. Never hide it.
- A link underlined at rest (`.link`, a linked row title, links in `.post-body` and in the footer's note) thickens its underline to 2px on hover and on keyboard focus, in its own color. Buttons keep their own states. Don't mark hover with a thick accent underline: that marks the current page.
- Every page starts with a skip link and has one `<main>`, so a keyboard user can go past the top bar. `BaseLayout` writes both; see SkipLink in `COMPONENTS.md`.
- Hand cursor on everything clickable (`theme.css` sets it, since Tailwind v4 removes it from buttons).
- Hover keeps text readable: when a row or button fills, its text switches to the opposite color.
- Pressed filter buttons use `aria-pressed="true"`; the current page uses `aria-current="page"`.
- External links announce "(opens in a new tab)" to screen readers.
- A button that goes to another site ends with the font's ↗ after its label (`.ext-arrow`, hidden from screen readers), as a text link that leaves the site does ("Site ↗"). A sister site counts. A button within the site never has it, and the top bar's buttons, which are navigation, stay as they are.
- A control's name says what it does, verb first: "Show Field notes in the list", "Remove: Field notes". A toggle keeps one name and uses `aria-pressed`.
- When a control is about to disappear with focus on it (a removed row, an arrow that hides once used), move focus to the next sensible place first.
- Remember things in localStorage only as a convenience: wrap every read and write, and make the page work the same without it.
- Text at 18px or more, contrast 4.5:1 or better in both themes.
- No capitals, as a rule of the kit. The stylesheet never uppercases (`--label-case` is `none`, and Tailwind's `uppercase` utility is not generated), so a site only breaks the rule in its own CSS or by typing capitals. `USING.md` has a test to copy that fails on uppercase or small caps in a site's built CSS.

## Components

Every component is a plain CSS class in `kit/theme.css` (loaded through `kit/tailwind.css`); there is no JavaScript bundle, only a few small plain scripts for the pieces that need behavior. In short: **Skip link** (`.skip-link`), **Top bar** (`.topbar`), **Outlined button** (`.topbar-btn`, `.burger`), **Hover label** (`data-tip`), **Primary button** (`.btn`), **Secondary button** (`.btn-outline`, `.btn-group`), **Tertiary button** (`.btn-outline--tertiary`), **External arrow** (`.ext-arrow`, on any button or link that leaves the site), **Slide-down panel** (`.panel`, with `kit/panel.js`), **Menu** (`.menu-list`, `.acc`, `.submenu`), **Panel tabs** (`.panel-tabs`, `.panel-tab`), **"New" dot** (`.new-dot`, with `kit/new-dot.js`), **Field** (`.field`), **Select** (`.select-wrap`, `.select`), **Date and time** (`.field` on `type="date"`, `time`…), **File picker** (`.file-pick`, with `kit/file-pick.js`), **Switch** (`.choice`, `.switch`), **Radio** (`.choice-group`, `.radio`), **Filter buttons** (`.chip`), **Favorite star** (`.fav-btn`, with `kit/favorites.js`), **Page accordion** (`.page-acc`), **List row** (`.row`, `.row-arrow`, with `Section.astro` and `Row.astro`), **Note row** (`.row--note`, `.row-body`, `Row.astro` with `date`), **Section** (`.rule-thick` and an `h2`), **Bottom bar** (`.bottom-bar`, optional), **Jump to current** (`.jump-btn`, with `kit/jump.js`), **Scrolling title** (`.marquee`, with `kit/marquee.js`), **Dialog** (`.dialog` on `<dialog>`, with `kit/dialog.js`), **Toast** (`.toast`), **Drawer** (`.drawer`, with `kit/drawer.js`), **Scotch rule** (`.rule-scotch`, `.rule-thick`), **Fleuron rule** (`.rule-fleuron`), **Plate** (`.plate`), **Notice** (`.notice`), **Rosette** (`.rosette`), **Mark** (`.mark`), **Drop cap** (`.post-body--cap`), **Ending** (`.post-body--end`), **Icon actions** (`.icon-row`, `.icon-btn`, with `kit/icon-controls.js`), **Closing note** (`.closing-note`), **Dated list** (`.dated-list`), **Summary list** (`.summary-list`), **Output panel** (`.output`, with `kit/output.js`), **Code block** (`pre`, `.pre--bar`, `.pre-cmd`, `.pre-err`, `.tok-*`), **Ellipse** (`.ellipse`, `.ellipse--solid`, `.ellipse--accent`), **Number circle** (`.num-circle`, `.num-circle--solid`, `.num-circle--accent`), **Activity indicators** (`.eq`, `.spinner`), **Image** (`.media`, `.figure`), **Gallery** (`.gallery`, `.gallery--rows`, `.gallery--text`), **Video embed** (`.embed`, `.embed-frame`, `.embed--page`), **Hero** (`.hero`, `.hero--split`, `.hero--wide`), **Page title** (`.page-title`, `.page-title--bar`), **CTA** (`.cta`), **Card grid** (`.card-grid`, `.card`), **Post list** (`.post-list`), **Post feature** (`.post-feature`), **Pager** (`.pager`), **Post header** (`.post-header`, `.post-meta`), **Post body** (`.post-body`), **Post wide** (`.post-wide`), **Post nav** (`.post-nav`), **Footer** (`.site-footer`, `.site-footer--bar`, `.site-footer-related`, `.site-footer-mark`).

## With Tailwind v4

This is the default setup, and the default.

1. Install `tailwindcss` and `@tailwindcss/vite`, and add the plugin in `astro.config.mjs` (`USING.md` has the whole file, and the command that makes the project):
   ```js
   import tailwindcss from '@tailwindcss/vite';
   export default defineConfig({ vite: { plugins: [tailwindcss()] } });
   ```
2. Make one global stylesheet, e.g. `src/styles/global.css`, and import it in your layout:
   ```css
   @import "@agentic-design-kits/verdigris/tailwind.css";
   /* site-only CSS below */
   ```
   Don't also `@import "tailwindcss"` or `theme.css` anywhere else; `tailwind.css` does both.
3. Pass `barHeight="5rem"` to `BaseLayout` if the site has a fixed bottom bar.

**Who does what.** Components with state, motion or several parts are kit classes (`.row`, `.chip`, `.panel`, `.toast`, `.hero`, `.media`, the type styles). Page layout is utilities in the markup: grids, spacing, widths, which column a piece sits in. Mix them freely: `class="row grid gap-y-1 md:grid-cols-[var(--row-num)_1fr_2.75rem]"`.

**Layers.** `theme.css` sits in Tailwind's `components` layer, so a utility always beats a kit class it is paired with (`class="field mb-7"` sets the margin). Your own unlayered CSS beats both.

**Token utilities.** Use these instead of raw colors, so light and dark both work: `bg-paper`, `text-ink`, `text-muted`, `border-rule`, `bg-bar`, `text-bar-ink`, `bg-accent` (large shapes only), `text-accent-text` (small accent text on the page), `text-accent-bright` (small accent text on `bar`), `text-copper-text` (copper labels and small ornament on the page), `text-copper-bright` (copper on `bar`), `text-copper` and `bg-copper` (large ornament only), `bg-row-hover`, `bg-row-active`, `text-row-fg`, and `var(--bar-h)` as `h-(--bar-h)` / `pb-(--bar-h)`. Never `text-red-600`, `bg-black` or Tailwind's grey scale.

**Defaults that line up.** Tailwind's `sm` (640px) and `md` (768px) breakpoints are the kit's. Preflight clears margins on `p`, `h1`–`h6` and lists, so set spacing with utilities (`mb-5`, `[&>p]:mb-5` on a block of prose). Tailwind v4 drops the hand cursor on buttons; `theme.css` puts it back.

`kit/tailwind.css` maps the tokens like this:

```css
@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);
  --color-accent-text: var(--accent-text);
  --color-accent-bright: var(--accent-bright);
  --color-bar: var(--bar);
  --color-bar-ink: var(--bar-ink);
  --color-row-hover: var(--row-hover-bg);
  --color-row-active: var(--row-active-bg);
  --color-row-fg: var(--row-fg);
  --color-row-edge: var(--row-edge);
}
```

## Do not

- Add shadows, gradients, rounded corners or boxes around inputs.
- Use capitals: no `text-transform: uppercase`, no small caps, no typed all-caps labels.
- Set text under 18px (code aside), or light weight under 1.75rem.
- Use a second family for anything but code, or tint the background behind code.
- Use the code colors outside `pre` and `code`.
- Use plain `accent` or `copper` for small text, or copper to mark an action.
- Use more than one plate or fleuron rule on a page, or put text on the rosette.
- Let ornament say something no text says.
- Use images as filler or background, round or frame them, or set text straight on them.
- Let text keep moving forever, or move at all with Reduce Motion on.
- Hide focus rings or drop the hand cursor.
- Use an icon font or a brand's colors.

## License

Cormorant by Christian Thalmann, SIL Open Font License 1.1: https://github.com/CatharsisFonts/Cormorant. Free on any site as long as `fonts/Cormorant-LICENSE.txt` stays with it.

Source Code Pro by Paul D. Hunt for Adobe, SIL Open Font License 1.1: https://github.com/adobe-fonts/source-code-pro. Free on any site as long as `fonts/SourceCodePro-LICENSE.txt` stays with it.
