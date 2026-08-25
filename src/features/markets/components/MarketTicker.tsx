import { getQuotes } from '@/lib/api/markets';
import { MarketTickerLive } from './MarketTickerLive';

/**
 * The quote strip under the masthead.
 *
 * A server component that fetches the initial quotes on the request, then
 * hands them to a client child that keeps them fresh through polling. This
 * replaced a TradingView iframe: their embed blocked linking each cell back
 * to `/markets/[symbol]`, and required a "Ticker tape by TradingView"
 * attribution below.
 */
export async function MarketTicker() {
  const quotes = await getQuotes();
  return <MarketTickerLive initial={quotes} />;
}
