import { getQuotes } from '@/lib/api/markets';
import { MarketTickerLive } from './MarketTickerLive';

/**
 * The quote strip under the masthead.
 *
 * A server component that fetches the initial quotes on the request so
 * SSR paints real numbers, then hands them to a client child that
 * subscribes to the `/markets` WebSocket for every subsequent update.
 * The single REST call happens here, on the server; the browser never
 * polls once the socket is up.
 *
 * This replaced a TradingView iframe: their embed blocked linking each
 * cell back to `/markets/[symbol]`, and required a "Ticker tape by
 * TradingView" attribution below.
 */
export async function MarketTicker() {
  const quotes = await getQuotes();
  return <MarketTickerLive initial={quotes} />;
}
