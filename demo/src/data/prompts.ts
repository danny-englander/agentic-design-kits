// The prompts visitors copy into a coding agent, and links to the kit's docs on GitHub.
export const repo = 'https://github.com/danny-englander/swiss-minimal';
export const doc = (file: string) => `${repo}/blob/main/${file}`;

export const newSitePrompt = `Start a new Astro site with the Swiss Minimal design kit.
Follow "Starting a new site with the kit" in
${doc('AGENTS.md')}
Pages: Home, Work, About and Contact. Accent: verdigris.
Add an AGENTS.md for the site that points at the kit's docs.`;
