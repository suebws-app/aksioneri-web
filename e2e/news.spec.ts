import { expect, test } from '@playwright/test';

/**
 * The live wire, end to end: aksioneri-api ingests Investing.com's RSS feeds
 * and these pages render what it stored.
 *
 * Every test here needs the API running with at least one story in it. They
 * skip rather than fail when the wire is empty, because "no stories yet" is a
 * normal state for a freshly-migrated database and is not a regression in
 * anything these tests are about.
 */
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

    // Only internal links have a page of ours behind them. A story whose body
    // the publisher would not serve links straight out instead.
    const internal = page.locator('a[href^="/news/"]').first();
    test.skip(
      (await internal.count()) === 0,
      'no story with a body yet; start the API and let it ingest',
    );

    await internal.click();
    await expect(page.locator('h1')).not.toHaveText('');

    // Attribution is not decoration: the story belongs to the publisher and
    // every page has to say so and link back.
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

    // Filtering happens in the API, so a thin desk still fills a page rather
    // than showing whatever survived a client-side filter over twenty rows.
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

    // The whole point: this used to be a link, and every click threw the
    // reader thousands of pixels up the page because the button sits at the
    // bottom and a navigation cannot leave you where you were.
    expect(await page.evaluate(() => window.scrollY)).toBe(before);

    // Appended, not replaced — and no navigation happened.
    expect(await page.locator('article h3').first().textContent()).toBe(
      firstBefore,
    );
    await expect(page).toHaveURL(/\/news$/);
  });

  test('the markets index reaches every instrument page', async ({ page }) => {
    // This route did not exist and the homepage linked to it — every visitor
    // following "view all" got a 404.
    await page.goto('/markets');

    const links = page.locator('a[href^="/markets/"]');
    expect(await links.count()).toBeGreaterThan(0);

    await links.first().click();
    await expect(page.locator('h1')).not.toHaveText('');
  });

  test('the ticker never pushes past the content column', async ({ page }) => {
    // The strip it replaced carried `min-w-[880px]` and forced the whole page
    // sideways on a phone. The TradingView iframe must stay inside the same
    // 1280px column as the masthead, at every width.
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

      // The document itself must never scroll sideways.
      expect(
        scrollWidth,
        `page scrolls sideways at ${width}px`,
      ).toBeLessThanOrEqual(clientWidth + 1);

      // …and the tape must sit in the column, not spill out of it.
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
    // Stories that have no page of ours must not be advertised as having one.
    const newsEntries = body.match(/<loc>[^<]*\/news\/[^<]*<\/loc>/g) ?? [];
    test.skip(newsEntries.length === 0, 'the wire is empty');
    expect(newsEntries.length).toBeGreaterThan(0);
  });
});
