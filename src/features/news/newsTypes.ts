/**
 * The news feature's types.
 *
 * `NewsArticle`, `NewsCategory` and `MostReadEntry` describe what the API
 * returns, so they are defined in `lib/api/news.ts` and re-exported here.
 * `eslint-plugin-boundaries` forbids the API layer from importing a feature,
 * and duplicating the shapes in both places would let them drift apart
 * silently — a wire contract that disagrees with itself is worse than an
 * awkward import.
 */
export type {
  ArticleFeed,
  MostReadEntry,
  NewsArticle,
  NewsCategory,
} from '@/lib/api/news';
