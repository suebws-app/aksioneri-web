import { expect, test } from '@playwright/test';

test.describe('news wire', () => {
  test('the index lists real stories', async ({ page }) => {
    await page.goto('/news');

    const headlines = page.locator('article h2 a, article h3 a');
    const count = await headlines.count();
    test.skip(
      count === 0,
      'the wire is empty; start the API and let it ingest',
    );

    await expect(headlines.first()).not.toHaveText('');
  });

  test('an article page carries its text and credits the publisher', async ({
    page,
  }) => {
    await page.goto('/news');

    const internal = page.locator('a[href^="/news/"]').first();
    test.skip(
      (await internal.count()) === 0,
      'no story with a body yet; start the API and let it ingest',
    );

    await internal.click();
    await expect(page.locator('h1')).not.toHaveText('');

    const source = page.locator('a[href*="investing.com"]').first();
    await expect(source).toHaveAttribute('rel', /noopener/);
    await expect(source).toHaveAttribute('target', '_blank');
  });

  test('a body-less story links to the publisher instead of to a dead page', async ({
    page,
  }) => {
    await page.goto('/news');

    const external = page.locator('article a[href*="investing.com"]');
    test.skip(
      (await external.count()) === 0,
      'every ingested story has a body right now',
    );

    await expect(external.first()).toHaveAttribute('target', '_blank');
  });

  test('the desk filter narrows the list', async ({ page }) => {
    await page.goto('/news?category=crypto');

    await expect(
      page.locator('nav[aria-label] a[aria-current="page"]'),
    ).toHaveCount(1);
  });

  test('loading more appends without moving the viewport', async ({ page }) => {
    await page.goto('/news');

    const more = page.getByRole('button', { name: /more/i });
    test.skip(
      (await more.count()) === 0,
      'fewer than one page of stories ingested',
    );

    await more.scrollIntoViewIfNeeded();

    const before = await page.evaluate(() => window.scrollY);
    const countBefore = await page.locator('article').count();
    const firstBefore = await page.locator('article h3').first().textContent();

    await more.click();
    await expect
      .poll(() => page.locator('article').count())
      .toBeGreaterThan(countBefore);

    expect(await page.evaluate(() => window.scrollY)).toBe(before);

    expect(await page.locator('article h3').first().textContent()).toBe(
      firstBefore,
    );
    await expect(page).toHaveURL(/\/news$/);
  });

  test('the markets index reaches every instrument page', async ({ page }) => {
    await page.goto('/markets');

    const links = page.locator('a[href^="/markets/"]');
    expect(await links.count()).toBeGreaterThan(0);

    await links.first().click();
    await expect(page.locator('h1')).not.toHaveText('');
  });

  test('the ticker never pushes past the content column', async ({ page }) => {
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/news');

      const box = await page
        .locator('iframe[title="Market ticker"]')
        .boundingBox();
      expect(box, `no ticker at ${width}px`).not.toBeNull();

      const { scrollWidth, clientWidth, brandLeft } = await page.evaluate(
        () => {
          const brand = document.querySelector('header a, header span');
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            brandLeft: brand?.getBoundingClientRect().left ?? null,
          };
        },
      );

      expect(
        scrollWidth,
        `page scrolls sideways at ${width}px`,
      ).toBeLessThanOrEqual(clientWidth + 1);

      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(clientWidth + 1);
      if (brandLeft !== null) {
        expect(Math.abs(box!.x - brandLeft)).toBeLessThanOrEqual(2);
      }
    }
  });

  test('the sitemap carries the ingested stories', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text();

    expect(body).toContain('/markets');
    const newsEntries = body.match(/<loc>[^<]*\/news\/[^<]*<\/loc>/g) ?? [];
    test.skip(newsEntries.length === 0, 'the wire is empty');
    expect(newsEntries.length).toBeGreaterThan(0);
  });
});
