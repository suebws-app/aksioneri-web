import { expect, test } from '@playwright/test';

test.describe('SEO surface', () => {
  test('the landing page carries a canonical and no hreflang', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /localhost:3000$/,
    );

    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      0,
    );
  });

  test('private routes are disallowed in robots.txt', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();

    expect(body).toContain('Disallow: /dashboard');
    expect(body).toContain('Disallow: /*/dashboard');
    expect(body).toContain('sitemap.xml');
  });

  test('the sitemap lists each page once and no private route', async ({
    request,
  }) => {
    const body = await (await request.get('/sitemap.xml')).text();

    expect(body).toContain('<loc>http://localhost:3000</loc>');
    expect(body).not.toContain('/en/');
    expect(body).not.toContain('/dashboard');
  });

  test('old English URLs redirect rather than 404', async ({ request }) => {
    for (const path of ['/en', '/en/news', '/en/learn']) {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(308);
    }
  });

  test('the default Open Graph image renders', async ({ request }) => {
    const response = await request.get('/opengraph-image');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });
});

test.describe('economic calendar', () => {
  test('never scrolls the page sideways, even where the table overflows', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/calendar');

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('marks today, not merely the selected day', async ({ page }) => {
    await page.goto('/calendar?date=2026-08-24');

    await expect(
      page.getByRole('link', { name: 'Fri 21 · Today' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /^Mon 24$/ })).toBeVisible();
  });

  test('filters the table by region', async ({ page }) => {
    await page.goto('/calendar?region=US');

    await expect(
      page.getByRole('link', { name: /Initial jobless claims/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Producer price index/ }),
    ).toHaveCount(0);
  });
});
