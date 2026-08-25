import type { NewsArticle } from '@/features/news';
import type { SearchEntry } from './searchTypes';

/**
 * One story as a search entry, or nothing when the site does not hold it.
 *
 * Its own module, importing nothing but types: `buildSearchIndex` reaches into
 * four feature barrels, and pulling those into a unit test drags in next-intl's
 * client navigation, which does not resolve outside Next.
 *
 * `hasPage === false` marks a story the wire gave us as a headline and a link,
 * with no text of ours behind it. There is no `/news/[slug]` for it — linking
 * to one returned a 404 — and search is not a directory of other people's
 * sites, so it is dropped rather than pointed off-site.
 */
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
