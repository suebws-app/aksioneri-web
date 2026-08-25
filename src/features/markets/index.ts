export { AssetPage, type AssetPageProps } from './AssetPage';
export {
  MarketsIndexPage,
  type MarketsIndexPageProps,
} from './MarketsIndexPage';
export { MarketsPage, type MarketsPageProps } from './MarketsPage';
/**
 * Seed helpers kept only for pages that decorate news/lessons/calendar with a
 * hardcoded quote inline (e.g. "S&P +0.8%" beside a story). Every markets
 * page proper now reads from `@/lib/api/markets` — see the components under
 * `./components/*Live.tsx`.
 */
export { getQuote, MARKET_TIMESTAMP } from './marketsData';
