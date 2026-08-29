import { describe, expect, it } from 'vitest';
import type { NewsArticle } from '@/features/news';
import { articleEntry } from '../articleEntry';

const article = (overrides: Partial<NewsArticle> = {}): NewsArticle =>
  ({
    id: 'article-1',
    slug: 'stocks-close-higher-4873313',
    category: 'stocks',
    title: 'Stocks close higher',
    summary: 'Wall Street ended the session in the green.',
    minutesAgo: 90,
    readingMinutes: 3,
    publishedAt: '2026-08-25T10:00:00.000Z',
    ...overrides,
  }) as NewsArticle;

describe('articleEntry', () => {
  it('links a scraped story to its page here', () => {
    const entry = articleEntry(article({ hasPage: true }));

    expect(entry?.href).toBe('/news/stocks-close-higher-4873313');
  });

  it('treats a story with no `hasPage` flag as one of ours', () => {
    expect(articleEntry(article())?.href).toBe(
      '/news/stocks-close-higher-4873313',
    );
  });

  it('drops a story the site does not hold, publisher link or not', () => {
    expect(
      articleEntry(
        article({
          hasPage: false,
          sourceUrl: 'https://www.investing.com/news/australian-banks-4874469',
        }),
      ),
    ).toBeNull();

    expect(articleEntry(article({ hasPage: false }))).toBeNull();
  });
});
