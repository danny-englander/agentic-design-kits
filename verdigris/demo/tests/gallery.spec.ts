import { test, expect, type Locator } from '@playwright/test';

// The kit's Gallery on the demo's Gallery page: images shown whole, in masonry columns and in
// rows that share a height.

/** Each image's box, once every image in the list has loaded. */
async function boxes(list: Locator) {
  const images = list.locator('img');
  await images.evaluateAll((imgs) =>
    Promise.all(
      (imgs as HTMLImageElement[]).map((img) => {
        img.loading = 'eager';
        return img.complete ? null : new Promise((done) => img.addEventListener('load', done, { once: true }));
      }),
    ),
  );
  return images.evaluateAll((imgs) =>
    imgs.map((img) => {
      const r = img.getBoundingClientRect();
      return { left: Math.round(r.left), bottom: Math.round(r.bottom), height: r.height, width: r.width };
    }),
  );
}

test('every image has alt text and a caption', async ({ page }) => {
  await page.goto('/gallery');
  const figures = page.getByRole('region', { name: 'Masonry' }).locator('figure');
  await expect(figures).toHaveCount(10);
  for (const figure of await figures.all()) {
    await expect(figure.locator('img')).toHaveAttribute('alt', /\w/);
    await expect(figure.locator('figcaption')).not.toBeEmpty();
  }
});

test('masonry sets three columns at 1280px and one on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/gallery');
  const masonry = page.getByRole('region', { name: 'Masonry' }).getByRole('list');
  const columns = async () => new Set((await boxes(masonry)).map((b) => b.left)).size;
  await expect.poll(columns).toBe(3);

  // Polled, as the layout can lag a moment behind the resize.
  await page.setViewportSize({ width: 375, height: 800 });
  await expect.poll(columns).toBe(1);
});

test('images keep their own shape, uncropped', async ({ page }) => {
  await page.goto('/gallery');
  const images = page.getByRole('region', { name: 'Masonry' }).locator('img');
  const shapes = await images.evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).map((img) => {
      const r = img.getBoundingClientRect();
      return Math.abs(r.width / r.height - img.width / img.height);
    }),
  );
  for (const off of shapes) expect(off).toBeLessThan(0.02);
});

test('in rows, the images in a row share a height', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/gallery');
  const rows = await boxes(page.getByRole('region', { name: 'Rows' }).getByRole('list'));
  // The first row is full: its images line up along the bottom and share a height.
  const first = rows.filter((b) => Math.abs(b.bottom - rows[0].bottom) < 2);
  expect(first.length).toBeGreaterThan(1);
  for (const b of first) expect(Math.abs(b.height - first[0].height)).toBeLessThan(2);
});

test('in rows, an image alone on its line fills the width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/gallery');
  const list = page.getByRole('region', { name: 'Rows' }).getByRole('list');
  const full = await list.evaluate((ul) => ul.getBoundingClientRect().width);
  const rows = await boxes(list);
  // Every line but the last is filled: an image alone on one takes the whole width.
  const last = Math.max(...rows.map((b) => b.bottom));
  const alone = rows.filter((b) => b.bottom !== last && rows.filter((o) => Math.abs(o.bottom - b.bottom) < 2).length === 1);
  expect(alone.length).toBeGreaterThan(0);
  for (const b of alone) expect(Math.abs(b.width - full)).toBeLessThan(2);
});
