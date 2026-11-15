import { test, expect } from '@playwright/test';

// What the public site tells search engines and link previews: share tags on every page,
// the share card itself, the XML sitemap and robots.txt. Every address is the live one, with
// www, and every page address ends in a slash, as the site serves it.

const SITE = 'https://www.swissminimal.ch';
const PAGES = ['/', '/work/', '/work/field-notes/', '/blog/', '/blog/page/2/', '/blog/one-typeface/', '/about/', '/forms/', '/components/', '/agents/'];

for (const path of PAGES) {
  test(`${path} has a canonical URL and share tags`, async ({ page }) => {
    await page.goto(path);
    const url = new URL(path, SITE).href;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', url);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /\S/);
    // A post is shared with its own cover (checked below); every other page with the site's card.
    const post = /^\/blog\/(?!page\/)[^/]+\/$/.test(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', post ? /\/_astro\// : `${SITE}/share-dark.png`);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test(`${path} links to pages with a trailing slash`, async ({ page }) => {
    await page.goto(path);
    // Internal links to pages, not files (sitemap-index.xml, llms.txt) or #tabs.
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    const pages = hrefs.filter((h) => !/\.[a-z0-9]+$/i.test(h.split(/[?#]/)[0]));
    expect(pages.length).toBeGreaterThan(0);
    expect(pages.filter((h) => !h.split(/[?#]/)[0].endsWith('/'))).toEqual([]);
  });
}

test('both share cards are served as PNGs', async ({ request }) => {
  for (const name of ['share-light.png', 'share-dark.png']) {
    const res = await request.get(`/${name}`);
    expect(res.ok(), name).toBe(true);
    expect(res.headers()['content-type'], name).toContain('image/png');
  }
});

test('the sitemap lists every page with its slash, and robots.txt points to it', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);

  const index = await (await request.get('/sitemap-index.xml')).text();
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(maps.length).toBeGreaterThan(0);
  let listed: string[] = [];
  for (const map of maps) {
    expect(map.startsWith(`${SITE}/`), map).toBe(true);
    const xml = await (await request.get(new URL(map).pathname)).text();
    listed = listed.concat([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  for (const path of PAGES) expect(listed, path).toContain(new URL(path, SITE).href);
  // Nothing in it without www or without its slash.
  expect(listed.filter((l) => !l.startsWith(`${SITE}/`) || !l.endsWith('/'))).toEqual([]);
});

test('the home page title says what the kit is, and Recent still calls it Home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swiss Minimal · An agentic design kit for Astro and Tailwind');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /agentic design kit/);
  await expect(page.locator('meta[name="page-name"]')).toHaveAttribute('content', 'Home');
});

test('the home page describes the site and the kit as structured data', async ({ page }) => {
  await page.goto('/');
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = blocks.map((b) => JSON.parse(b)['@type']);
  expect(types).toEqual(['WebSite', 'SoftwareSourceCode']);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
});

test('a post is shared as an article, with its own picture', async ({ page }) => {
  await page.goto('/blog/one-typeface/');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', /^\d{4}-\d{2}-\d{2}$/);
  const image = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(image).toMatch(new RegExp(`^${SITE}/_astro/`));
  expect((await page.request.get(new URL(image!).pathname)).ok()).toBe(true);
  const post = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '');
  expect(post['@type']).toBe('BlogPosting');
  expect(post.headline).toBe(await page.locator('h1').textContent());
  expect(post.image).toBe(image);
});
