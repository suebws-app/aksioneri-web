import { expect, test } from '@playwright/test';

test.describe('SEO surface', () => {
  test('the landing page carries a canonical and reciprocal hreflang', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /localhost:3000$/,
    );

    for (const locale of ['sq', 'en', 'x-default']) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${locale}"]`),
      ).toHaveCount(1);
    }
  });

  test('private routes are disallowed in robots.txt', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();

    expect(body).toContain('Disallow: /dashboard');
    // Non-default locales carry a prefix, so the prefixed form must be blocked too.
    expect(body).toContain('Disallow: /*/dashboard');
    expect(body).toContain('sitemap.xml');
  });

  test('the sitemap lists every locale and no private route', async ({
    request,
  }) => {
    const body = await (await request.get('/sitemap.xml')).text();

    expect(body).toContain('<loc>http://localhost:3000</loc>');
    expect(body).toContain('<loc>http://localhost:3000/en</loc>');
    expect(body).not.toContain('/dashboard');
  });

  test('the default Open Graph image renders', async ({ request }) => {
    const response = await request.get('/opengraph-image');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });
});
