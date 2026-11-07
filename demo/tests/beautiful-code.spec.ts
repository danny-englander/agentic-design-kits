import { expect, test } from '@playwright/test';

test('five code samples are highlighted, each with a title', async ({ page }) => {
  await page.goto('/beautiful-code/');
  await expect(page.locator('.code-sample pre.astro-code')).toHaveCount(5);
  await expect(page.locator('.code-sample-file')).toHaveText([
    'stations.js',
    'deploy.sh',
    'tracks.py',
    'Playlist.java',
    'NowPlaying.cs',
  ]);
});

test('Copy puts the block on the clipboard and says so', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/beautiful-code/');
  const block = page.locator('.code-sample').first();
  const button = block.getByRole('button', { name: 'Copy stations.js' });
  await expect(button.locator('svg')).toBeVisible();

  await button.click();
  await expect(button).toContainText('Copied');
  await expect(button.locator('svg')).toBeVisible();
  await expect(page.locator('[data-copy-status]')).toHaveText('Copied to the clipboard');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe(await block.locator('pre').textContent());
  expect(copied).toContain('// Find the stations playing right now');

  await expect(button).toContainText('Copy', { timeout: 3000 });
});
