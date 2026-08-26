import { expect, test } from '@playwright/test';

const SHARED_URL =
  '/calculators/compound-interest?initial=25000&monthly=750&rate=6&years=15';

test.describe('calculator pages', () => {
  test('a shared link renders its answer with JavaScript disabled', async ({
    browser,
  }) => {
    // The load-bearing property of the whole feature: the result is computed
    // on the server, so a shared link works before (and without) hydration,
    // and a crawler sees a real answer rather than an empty container.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto(SHARED_URL);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // €25,000 + €750/mo at 6% for 15 years. The figure itself is asserted in
    // the unit tests; here the point is only that a figure is present.
    await expect(page.locator('body')).toContainText('€');
    await expect(page.getByText(/\d{2,3}\.\d{3}\s?€/).first()).toBeVisible();

    await context.close();
  });

  test('FAQ answers are readable without JavaScript', async ({ browser }) => {
    // <details> rather than a click handler, which is what makes the FAQPage
    // structured data on this route an honest claim.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto('/calculators/compound-interest');

    const firstAnswer = page.locator('details').first();
    await firstAnswer.locator('summary').click();
    await expect(firstAnswer).toContainText(/\w/);

    await context.close();
  });

  test('the canonical URL carries no query string', async ({ page }) => {
    // Inputs live in the query string, so the parameter space is infinite.
    // The canonical is what collapses it onto one indexable URL.
    await page.goto(SHARED_URL);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href');

    expect(canonical).toBeTruthy();
    expect(canonical).not.toContain('?');
    expect(canonical).toContain('/calculators/compound-interest');
  });

  test('typing updates the result without stacking history entries', async ({
    page,
  }) => {
    await page.goto('/calculators/compound-interest');

    const before = await page.evaluate(() => window.history.length);

    await page.getByLabel(/Norma vjetore/).fill('9');

    // The URL follows the input…
    await expect(page).toHaveURL(/rate=9/);
    // …but Back must leave the calculator, not step through keystrokes.
    const after = await page.evaluate(() => window.history.length);
    expect(after).toBe(before);
  });

  test('an unknown calculator is a 404', async ({ page }) => {
    const response = await page.goto('/calculators/not-a-calculator');
    expect(response?.status()).toBe(404);
  });

  test('a mangled parameter costs its own field, not the page', async ({
    page,
  }) => {
    const response = await page.goto(
      '/calculators/compound-interest?rate=NaN&years=abc&initial=1e999',
    );

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

// The nav gained a fifth link, and the desktop breakpoint moved from `sm` to
// `md` to fit it. This is what keeps that decision honest.
const VIEWPORTS = [375, 390, 640, 768, 1024, 1280];

for (const width of VIEWPORTS) {
  test(`no horizontal scroll at ${String(width)}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const path of [
      '/',
      '/calculators',
      '/calculators/compound-interest?initial=1000000&monthly=9999&rate=12&years=40',
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
