import { getQuotes } from '@/lib/api/markets';
import { MarketTickerLive } from './MarketTickerLive';

export async function MarketTicker() {
  const quotes = await getQuotes();
  return <MarketTickerLive initial={quotes} />;
}
