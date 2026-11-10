// The prompts visitors copy into a coding agent, and links to the kit's docs on GitHub.
// Verdigris lives in the verdigris/ folder of Swiss Minimal's repository.
export const repo = 'https://github.com/danny-englander/swiss-minimal-design-kit';
// TOOLING.md is Swiss Minimal's, at the root, and serves both kits.
export const doc = (file: string) => `${repo}/blob/main/${file === 'TOOLING.md' ? '' : 'verdigris/'}${file}`;

export const newSitePrompt = `Start a new Astro site with the Verdigris design kit.
Follow "Starting a new site with the kit" in
${doc('AGENTS.md')}
Pages: Home, Work, About and Contact. Accent: verdigris.
Add an AGENTS.md for the site that points at the kit's docs.`;
