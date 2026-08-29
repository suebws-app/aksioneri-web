import { expect, test } from '@playwright/test';

const SHARED_URL =
  '/kalkulatoret/compound-interest?initial=25000&monthly=750&rate=6&years=15';

test.describe('calculator pages', () => {
  test('a shared link renders its answer with JavaScript disabled', async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto(SHARED_URL);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('body')).toContainText('€');
    await expect(page.getByText(/\d{2,3}\.\d{3}\s?€/).first()).toBeVisible();

    await context.close();
  });

  test('FAQ answers are readable without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto('/kalkulatoret/compound-interest');

    const firstAnswer = page.locator('details').first();
    await firstAnswer.locator('summary').click();
    await expect(firstAnswer).toContainText(/\w/);

    await context.close();
  });

  test('the canonical URL carries no query string', async ({ page }) => {
    await page.goto(SHARED_URL);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href');

    expect(canonical).toBeTruthy();
    expect(canonical).not.toContain('?');
    expect(canonical).toContain('/kalkulatoret/compound-interest');
  });

  test('typing updates the result without stacking history entries', async ({
    page,
  }) => {
    await page.goto('/kalkulatoret/compound-interest');

    const before = await page.evaluate(() => window.history.length);

    await page.getByLabel(/Norma vjetore/).fill('9');

    await expect(page).toHaveURL(/rate=9/);
    const after = await page.evaluate(() => window.history.length);
    expect(after).toBe(before);
  });

  test('toggling currency repeatedly never stacks history entries', async ({
    page,
  }) => {
    await page.goto('/kalkulatoret/compound-interest');

    const before = await page.evaluate(() => window.history.length);

    for (let i = 0; i < 4; i += 1) {
      await page.getByRole('radio', { name: 'USD' }).check();
      await page.getByRole('radio', { name: 'EUR' }).check();
    }

    expect(await page.evaluate(() => window.history.length)).toBe(before);

    await page.goBack();
    await expect(page).not.toHaveURL(/compound-interest/);
  });

  test('an unknown calculator is a 404', async ({ page }) => {
    const response = await page.goto('/kalkulatoret/not-a-calculator');
    expect(response?.status()).toBe(404);
  });

  test('a mangled parameter costs its own field, not the page', async ({
    page,
  }) => {
    const response = await page.goto(
      '/kalkulatoret/compound-interest?rate=NaN&years=abc&initial=1e999',
    );

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

const VIEWPORTS = [375, 390, 640, 768, 1024, 1280];

for (const width of VIEWPORTS) {
  test(`no horizontal scroll at ${String(width)}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const path of [
      '/',
      '/kalkulatoret',
      '/kalkulatoret/compound-interest?initial=1000000&monthly=9999&rate=12&years=40',
    ]) {
      await page.goto(path);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );

      expect(overflow, `${path} scrolls sideways at ${String(width)}px`).toBe(
        false,
      );
    }
  });
}
