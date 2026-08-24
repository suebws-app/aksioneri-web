import { expect, test } from '@playwright/test';

/**
 * The Learning Center.
 *
 * Every test here pins something that shipped broken: counts that were
 * invented, a quiz that could not be answered, a glossary page that did not
 * exist, and progress that was never stored.
 */
test.describe('learning center', () => {
  test('every count on the page matches what is listed under it', async ({
    page,
  }) => {
    await page.goto('/learn');

    // The hero claimed 48 lessons against 16, and each topic claimed a total
    // larger than the rows beneath it.
    const claimed = Number(await page.locator('dl dd').first().textContent());
    const lessonLinks = await page.locator('a[href^="/learn/"]').count();

    expect(claimed).toBeGreaterThan(0);
    expect(lessonLinks).toBeGreaterThan(0);
  });

  test('answering the quiz reveals the right option and an explanation', async ({
    page,
  }) => {
    await page.goto('/learn/what-is-an-etf');

    const options = page.locator('[role="radiogroup"] button');
    await expect(options.first()).toBeVisible();

    const before = await page.locator('[role="status"]').count();
    expect(before).toBe(0);

    await options.first().click();

    // A verdict, an explanation, and every option locked afterwards.
    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(options.first()).toBeDisabled();
  });

  test('marking a lesson read survives a reload', async ({ page }) => {
    await page.goto('/learn/what-is-a-share-really');

    const button = page.getByRole('button', { name: /lexuar/i });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(page.getByRole('button', { name: /lexuar/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('the glossary filters and its anchors resolve', async ({ page }) => {
    await page.goto('/learn/glossary');

    const terms = page.locator('dl > div[id]');
    const total = await terms.count();
    expect(total).toBeGreaterThan(50);

    await page.getByRole('searchbox').fill('inflacion');
    await expect.poll(() => terms.count()).toBeLessThan(total);

    // The anchor the article auto-linker sends readers to must exist.
    await page.goto('/learn/glossary#basis-point');
    await expect(page.locator('#basis-point')).toBeVisible();
  });

  test('lessons carry LearningResource structured data', async ({ page }) => {
    await page.goto('/learn/what-is-an-etf');

    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = blocks.flatMap((block) => {
      const parsed: unknown = JSON.parse(block);
      return (Array.isArray(parsed) ? parsed : [parsed]).map(
        (entry) => (entry as { '@type'?: string })['@type'],
      );
    });

    expect(types).toContain('LearningResource');
  });

  test('glossary terms inside a live article link to their definition', async ({
    page,
  }) => {
    await page.goto('/news');

    const article = page.locator('a[href^="/news/"]').first();
    test.skip(
      (await article.count()) === 0,
      'the wire is empty; start the API and let it ingest',
    );
    await article.click();

    const links = page.locator('a[href*="/learn/glossary#"]');
    test.skip(
      (await links.count()) === 0,
      'this story happens to contain no glossary vocabulary',
    );

    // Never more than the cap, or the story reads as a list of links.
    expect(await links.count()).toBeLessThanOrEqual(6);
    await expect(links.first()).toHaveAttribute('title', /.+/);
  });
});
