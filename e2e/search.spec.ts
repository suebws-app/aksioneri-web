import { expect, test } from '@playwright/test';

test.describe('nav search', () => {
  test('typing in the nav shows results from the index', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Kërko' }).click();
    await page.getByRole('combobox').fill('inflacion');

    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible();
    expect(await options.count()).toBeGreaterThan(0);
  });
});
