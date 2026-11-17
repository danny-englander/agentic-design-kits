# Notes for AI agents

This is agenticdesignkits.com, the landing page for both kits. It uses the Swiss Minimal design
kit, installed through the repository's npm workspace as @agentic-design-kits/swiss-minimal (a
link to ../kit and ../fonts). Before changing the page, read the repository's AGENTS.md, then
USING.md, DESIGN.md (the rules, and its "Do not" list) and the parts of COMPONENTS.md you will use.

- Use the Node version in .nvmrc.
- Page layout is Tailwind utilities; components are kit classes.
- Colors only through the token utilities, never Tailwind's palette. Three exceptions, all in
  src/styles/global.css: the hero art's azure ampersand, each kit's swatches, which show that
  kit's own colors, and the azure outline on the Swiss Minimal buttons under "In both kits".
- The kits' names, descriptions and links are in src/data/kits.ts. Keep them in step with the
  README's table of kits, and with public/llms.txt, which lists the same kits and links for agents.
- A fix to a component belongs in ../kit, never here.
- The README at the repository's root shows the hero's infinity sign as .github/readme/infinity.svg.
  After changing src/components/infinity.ts or its colors, run `npm run readme-art` at the root.
- The share card (public/share-light.png, and share-dark.png beside it) is drawn by
  scripts/share-images.ts. After changing the name, the lead, the colors or the sign, run
  `npm run share-images` here.
- Before calling a change done: npx astro check, npm run build and npm test.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
