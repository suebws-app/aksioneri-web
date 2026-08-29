import type { NewsArticle } from '@/features/news';
import type { SearchEntry } from './searchTypes';

export const articleEntry = (article: NewsArticle): SearchEntry | null => {
  if (article.hasPage === false) return null;

  return {
    kind: 'article',
    title: article.title,
    subtitle: article.summary,
    href: `/news/${article.slug}`,
    keywords: [article.category],
  };
};
