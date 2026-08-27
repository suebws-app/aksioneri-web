import { expect, test } from '@playwright/test';

/**
 * Search in the nav bar.
 *
 * The dropdown loads its index through a server action. The action resolved
 * the locale with `getLocale()`, which reads the `[locale]` root param — and
 * root params are unavailable inside a Server Action, so every open answered
 * 500 and the reader saw "Kërkimi nuk u ngarkua". This pins the whole path:
 * open, type, get results.
 */
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
