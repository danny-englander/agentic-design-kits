// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The live address. Canonical URLs and the sitemap are built on it.
  site: 'https://www.agenticdesignkits.com',
  integrations: [sitemap()],
  // Astro 7 compresses HTML by JSX rules by default ('jsx'), so a line break between an inline
  // tag (<a>, <code>, <kbd>) and the text beside it no longer becomes a space, and words run
  // together. `true` removes whitespace without changing the visible spacing.
  // See https://cassidoo.co/post/astro-7-whitespace/
  compressHTML: true,
  // Code is highlighted with the css-variables theme, so the kit's code tokens set the colors.
  markdown: { shikiConfig: { theme: 'css-variables' } },
  server: { host: true },
  vite: {
    plugins: [tailwindcss()],
    // A background dev server gets its own Vite cache, so it never fights one you run yourself.
    cacheDir: process.env.ASTRO_DEV_BACKGROUND ? 'node_modules/.vite-background' : undefined,
  },
});
