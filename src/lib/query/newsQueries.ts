import { infiniteQueryOptions } from '@tanstack/react-query';
import {
  fetchArticlePage,
  type ArticleFeed,
  type NewsCategory,
} from '@/lib/api/news';
import type { Locale } from '@/i18n/config';

export const newsKeys = {
  all: ['news'] as const,
  list: (locale: Locale, category?: NewsCategory) =>
    [...newsKeys.all, 'list', locale, category ?? 'all'] as const,
};

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
    initialData: { pages: [initialPage], pageParams: [undefined] },
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
