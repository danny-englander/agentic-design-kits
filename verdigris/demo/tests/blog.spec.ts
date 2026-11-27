import { test, expect } from '@playwright/test';

// The blog: PostFeature, PostList and the Pager on the index; PostHeader, the post body and
// PostNav on each post.

/** The featured post, which opens every page of the index. */
async function expectFeature(page: import('@playwright/test').Page) {
  const feature = page.locator('.post-feature');
  await expect(feature.getByRole('heading', { level: 2 })).toHaveText('One family, many voices');
  await expect(feature.getByRole('link', { name: 'Read post: One family, many voices' })).toHaveAttribute(
    'href',
    '/blog/one-family/',
  );
  await expect(feature.locator('img')).toHaveAttribute('alt', /verdigris-green paper/);
}

test('the index opens with the featured post, then lists five of the rest newest first', async ({ page }) => {
  await page.goto('/blog');
  await expectFeature(page);
  const titles = page.locator('.post-list-title a');
  await expect(titles).toHaveText([
    'Pictures and films inside a post →',
    'One prompt, one agent, timed →',
    'Setting a grid before the words →',
    'The green that copper grows →',
    'The scotch rule →',
  ]);
  await expect(titles.first()).toHaveAttribute('href', '/blog/pictures-and-films/');
  // The arrow is for the eye: screen readers get the title alone.
  await expect(page.getByRole('link', { name: 'The scotch rule', exact: true })).toBeVisible();
  await expect(page.locator('.post-list time').first()).toHaveAttribute('datetime', '2026-11-26');
});

test('the pager leads to page 2, which keeps the feature and lists the older posts', async ({ page }) => {
  await page.goto('/blog');
  const pager = page.getByRole('navigation', { name: 'Blog pages' });
  await expect(pager.getByRole('link', { name: 'Page 1 of 2' })).toHaveAttribute('aria-current', 'page');
  await expect(pager.locator('[rel="prev"]')).toHaveCount(0);
  await pager.getByRole('link', { name: 'Older' }).click();

  await expect(page).toHaveURL(/\/blog\/page\/2\/$/);
  await expect(page).toHaveTitle('Blog · Page 2 · Verdigris');
  await expectFeature(page);
  await expect(page.locator('.post-list-title a')).toHaveText([
    'Why there are no capitals →',
    'Why the bars stay dark →',
    'Images are content, not filler →',
    'Motion that stops →',
  ]);
  await expect(pager.getByRole('link', { name: 'Page 2 of 2' })).toHaveAttribute('aria-current', 'page');
  await expect(pager.locator('[rel="next"]')).toHaveCount(0);
  await expect(pager.getByRole('link', { name: 'Newer' })).toHaveAttribute('href', '/blog/');
});

test('the pager sits under the list on phones, with the numbers under the steps', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/blog/page/2/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  const [step, numbers] = await Promise.all([
    page.locator('.pager-step').first().boundingBox(),
    page.locator('.pager-pages').boundingBox(),
  ]);
  expect(numbers!.y).toBeGreaterThan(step!.y);
});

test('with a landscape cover, the feature runs wide over a 16:9 image', async ({ page }) => {
  const feature = page.locator('.post-feature');
  const columns = () => feature.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/blog');
  await expect(feature).toHaveClass(/post-feature--wide/);
  expect(await columns()).toBe(1);
  await page.setViewportSize({ width: 1024, height: 800 });
  expect(await columns()).toBe(1);
  // The text runs past the middle, and the image under it keeps 16:9.
  const [box, title, image] = await Promise.all([
    feature.boundingBox(),
    feature.locator('.post-feature-title').boundingBox(),
    feature.locator('img').boundingBox(),
  ]);
  expect(title!.width).toBeGreaterThan(box!.width / 2);
  expect(image!.y).toBeGreaterThan(title!.y);
  expect(image!.width / image!.height).toBeCloseTo(16 / 9, 1);
});

test('a post has its header, byline and body', async ({ page }) => {
  await page.goto('/blog/one-family');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('One family, many voices');
  await expect(page.locator('.post-header-label')).toHaveAttribute('href', '/blog/');
  const meta = page.locator('.post-meta');
  await expect(meta).toContainText('October 20, 2026');
  await expect(meta).toContainText('Agentic Kits');
  await expect(meta).toContainText(/\d+ min/);
  await expect(page.locator('.post-body h2').first()).toHaveText('Light is for size');
  await expect(page.locator('.post-body blockquote')).toBeVisible();
});

test('the newest post links only back, the oldest only forward', async ({ page }) => {
  await page.goto('/blog/pictures-and-films');
  const nav = page.getByRole('navigation', { name: 'More posts' });
  await expect(nav.locator('[rel="prev"]')).toHaveAttribute('href', '/blog/an-agent-built-this/');
  await expect(nav.locator('[rel="next"]')).toHaveCount(0);

  await page.goto('/blog/motion-that-stops');
  await expect(nav.locator('[rel="next"]')).toHaveAttribute('href', '/blog/images-are-content/');
  await expect(nav.locator('[rel="prev"]')).toHaveCount(0);
});

test('the byline wraps on a phone, and Next keeps the right column from 640px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/blog/copper-green');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await page.setViewportSize({ width: 1024, height: 800 });
  const column = await page.locator('.post-nav-next').evaluate((el) => getComputedStyle(el).gridColumnStart);
  expect(column).toBe('2');
});

test('code is highlighted in the kit’s code colors, with no background of Shiki’s own', async ({ page }) => {
  await page.goto('/blog/grid-before-words');
  const block = page.locator('.post-body pre.astro-code[data-language="ts"]');
  const colors = await block.evaluate((pre) => {
    const root = getComputedStyle(document.documentElement);
    const probe = document.createElement('span');
    document.body.append(probe);
    const resolve = (name: string) => {
      probe.style.color = root.getPropertyValue(name).trim();
      return getComputedStyle(probe).color;
    };
    const used = new Set([...pre.querySelectorAll('span')].map((s) => getComputedStyle(s).color));
    const result = {
      background: getComputedStyle(pre).backgroundColor,
      keyword: used.has(resolve('--code-keyword')),
      string: used.has(resolve('--code-string')),
      constant: used.has(resolve('--code-constant')),
      comment: used.has(resolve('--muted')),
    };
    probe.remove();
    return result;
  });
  expect(colors).toEqual({ background: 'rgba(0, 0, 0, 0)', keyword: true, string: true, constant: true, comment: true });
});

test('each card on the home page has a button named for its title', async ({ page }) => {
  await page.goto('/');
  const buttons = page.locator('.card > .btn-outline');
  await expect(buttons).toHaveCount(4);
  await expect(page.getByRole('link', { name: 'Read this: Pictures and films inside a post' })).toHaveAttribute('href', /pictures-and-films/);
  await expect(page.locator('.card-title a')).toHaveCount(0);
});

test('each card and the featured post have one link, so their text can be selected', async ({ page }) => {
  await page.goto('/');
  for (const card of await page.locator('.card').all()) await expect(card.locator('a')).toHaveCount(1);
  await page.goto('/blog/');
  const feature = page.locator('.post-feature');
  await expect(feature.locator('a')).toHaveCount(1);
  await expect(feature.locator('.post-feature-title a')).toHaveCount(0);
});

test('in an MDX post, a gallery runs wide on the text\'s axis, and the videos and post cards keep to the column', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/blog/pictures-and-films');
  const box = async (selector: string) => (await page.locator(selector).first().boundingBox())!;
  const text = await box('.post-body > p');
  expect(Math.round(text.width)).toBe(720); // 45rem
  const center = (b: { x: number; width: number }) => b.x + b.width / 2;
  const gallery = await box('.post-body > .gallery');
  expect(gallery.width).toBeGreaterThan(text.width + 200);
  expect(Math.abs(center(gallery) - center(text))).toBeLessThan(1);
  for (const block of ['.post-body > .embed', '.post-body > .embed >> nth=1', '.post-body > .post-card']) {
    const b = (await page.locator(block).first().boundingBox())!;
    expect(b.x, block).toBe(text.x);
    expect(b.width, block).toBe(text.width);
  }
  // A gallery is a <ul>, but the post's list styles don't reach it.
  await expect(page.locator('.post-body > .gallery')).toHaveCSS('list-style-type', 'none');
  await expect(page.locator('.post-body > .gallery')).toHaveCSS('padding-left', '0px');
});

test('a video embed uses the no-cookie YouTube player and Vimeo with Do Not Track, lazy and titled', async ({ page }) => {
  await page.goto('/blog/pictures-and-films');
  const frames = page.locator('.embed-frame iframe');
  await expect(frames).toHaveCount(2);
  await expect(frames.nth(0)).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/emkJ0A7IfkY?rel=0');
  await expect(frames.nth(1)).toHaveAttribute('src', 'https://player.vimeo.com/video/1084537?dnt=1');
  await expect(frames.nth(0)).toHaveAttribute('title', /Concerto in A minor, BWV 1065/);
  await expect(frames.nth(1)).toHaveAttribute('title', /Big Buck Bunny/);
  for (const i of [0, 1]) {
    await expect(frames.nth(i)).toHaveAttribute('loading', 'lazy');
  }
  const b = (await page.locator('.embed-frame').first().boundingBox())!;
  expect(Math.abs(b.width / b.height - 16 / 9)).toBeLessThan(0.01);
});

test('a post card points to another post: one link, and its cover when it has one', async ({ page }) => {
  await page.goto('/blog/pictures-and-films');
  const cards = page.locator('.post-body > .post-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0).locator('a')).toHaveCount(1);
  await expect(cards.nth(0).getByRole('link', { name: 'The green that copper grows' })).toHaveAttribute('href', '/blog/copper-green/');
  await expect(cards.nth(0).locator('img')).toHaveAttribute('alt', '');
  await expect(cards.nth(1).locator('.post-card-label')).toHaveText('Read next');
  await expect(cards.nth(1).locator('img')).toHaveCount(0);
});
