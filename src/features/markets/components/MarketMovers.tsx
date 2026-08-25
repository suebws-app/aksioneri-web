import { getMovers, type IndexSymbol } from '@/lib/api/markets';
import { MarketMoversLive } from './MarketMoversLive';

/**
 * "Lëvizësit e tregut" — per-index gainers, losers and most-active.
 *
 * Scoped to whichever index the caller passes: SP500 on `/markets/sp-500`,
 * NDX on `/markets/nasdaq-100`, and so on. The homepage picks the S&P 500
 * because it is the default lead index of the design.
 */
export async function MarketMovers({
  index = 'sp-500',
}: {
  index?: IndexSymbol;
}) {
  const initial = await getMovers(index);
  return <MarketMoversLive index={index} initial={initial} />;
}
