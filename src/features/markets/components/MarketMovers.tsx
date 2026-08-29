import { getMovers, LEAD_INDEX, type IndexSymbol } from '@/lib/api/markets';
import { MarketMoversLive } from './MarketMoversLive';

export async function MarketMovers({
  index = LEAD_INDEX,
}: {
  index?: IndexSymbol;
}) {
  const initial = await getMovers(index);
  return <MarketMoversLive index={index} initial={initial} />;
}
