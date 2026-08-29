'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { articleFeedQuery } from '@/lib/query/newsQueries';
import type {
  ArticleFeed as ArticleFeedPage,
  NewsCategory,
} from '../newsTypes';
import { ArticleCard } from './ArticleCard';

export interface ArticleFeedProps {
  initialPage: ArticleFeedPage;
  category?: NewsCategory;
  excludeId?: string;
}

export function ArticleFeed({
  initialPage,
  category,
  excludeId,
}: ArticleFeedProps) {
  const t = useTranslations('news');
  const locale = useLocale() as Locale;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(articleFeedQuery(locale, category, initialPage));

  const articles = data.pages
    .flatMap((page) => page.articles)
    .filter((article) => article.id !== excludeId);

  if (articles.length === 0) {
    return (
      <p className="text-ink-faint py-10 text-center text-[15px]">
        {t('emptyCategory')}
      </p>
    );
  }

  return (
    <>
      {articles.map((article) => (
        <div
          key={article.id}
          className="border-line-soft border-b py-6.5 last:border-b-0"
        >
          <ArticleCard article={article} variant="list" />
        </div>
      ))}

      {hasNextPage ? (
        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-ink hover:border-accent hover:text-accent rounded-sm border border-[#d9d4c8] px-6.5 py-3 text-sm font-medium disabled:opacity-60"
          >
            {isFetchingNextPage ? t('loadingMore') : t('loadMore')}
          </button>
        </div>
      ) : null}
    </>
  );
}
