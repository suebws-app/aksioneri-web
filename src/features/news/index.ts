export { ArticlePage, type ArticlePageProps } from './ArticlePage';
export { NewsPage, type NewsPageProps } from './NewsPage';
export type { CategoryFilter } from './components/CategoryTabs';
export {
  ARTICLES_PER_PAGE,
  getArticleBySlug,
  getArticleIndex,
  getArticlePage,
  getArticles,
  getArticleSlugs,
  getFeaturedArticle,
  getMostRead,
  searchArticles,
} from '@/lib/api/news';
export type { ArticleFeed } from '@/lib/api/news';
export type { MostReadEntry, NewsArticle, NewsCategory } from './newsTypes';
