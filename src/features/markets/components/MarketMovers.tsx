import { getMovers, LEAD_INDEX, type IndexSymbol } from '@/lib/api/markets';
import { MarketMoversLive } from './MarketMoversLive';

/**
 * "Lëvizësit e tregut" — per-index gainers, losers and most-active.
 *
 * Scoped to whichever index the caller passes: SP500 on `/markets/sp-500`,
 * NDX on `/markets/nasdaq-100`, and so on. Defaults to `LEAD_INDEX` so the
 * homepage and the markets index page anchor on the same symbol.
 */
export async function MarketMovers({
  index = LEAD_INDEX,
}: {
  index?: IndexSymbol;
}) {
  const initial = await getMovers(index);
  return <MarketMoversLive index={index} initial={initial} />;
}
