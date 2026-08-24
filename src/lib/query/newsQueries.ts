import { infiniteQueryOptions } from '@tanstack/react-query';
import {
  fetchArticlePage,
  type ArticleFeed,
  type NewsCategory,
} from '@/lib/api/news';
import type { Locale } from '@/i18n/config';

/**
 * Query keys for the news wire.
 *
 * Shaped `{ all, list }` so a future mutation can invalidate the whole wire
 * with `newsKeys.all` without knowing which filters are currently mounted.
 */
export const newsKeys = {
  all: ['news'] as const,
  list: (locale: Locale, category?: NewsCategory) =>
    [...newsKeys.all, 'list', locale, category ?? 'all'] as const,
};

/**
 * The paginated wire, as an infinite query.
 *
 * The cursor is the previous page's oldest `publishedAt`. It has to be a
 * cursor rather than an offset: stories arrive every minute, so an offset
 * would shift rows under a reader between pages and show duplicates.
 */
export const articleFeedQuery = (
  locale: Locale,
  category: NewsCategory | undefined,
  initialPage: ArticleFeed,
) =>
  infiniteQueryOptions({
    queryKey: newsKeys.list(locale, category),
    queryFn: ({ pageParam }) =>
      fetchArticlePage(locale, {
        ...(category ? { category } : {}),
        ...(pageParam ? { cursor: pageParam } : {}),
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: ArticleFeed) =>
      lastPage.nextCursor ?? undefined,
    // The server already rendered page one; without this the browser would
    // re-fetch it on mount and the first paint would flash.
    initialData: { pages: [initialPage], pageParams: [undefined] },
  });
