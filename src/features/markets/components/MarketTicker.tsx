import { getLocale } from 'next-intl/server';
import { tradingViewWidgetUrl, TV_SYMBOLS } from '../tradingView';

/**
 * The quote strip under the masthead, served by TradingView.
 *
 * This replaced a hand-rolled strip fed by seed data, which showed the same
 * six frozen prices forever. TradingView streams real levels and costs
 * nothing, at the price of two things worth knowing:
 *
 * - **The cells link to tradingview.com, not to our instrument pages.** The
 *   widget owns its own markup, so `/markets/[symbol]` is no longer reachable
 *   from the strip. The markets index and the quote tables still link there.
 * - **The attribution block is not optional.** TradingView's embed terms
 *   require the credit link that ships with the widget, so it stays.
 *
 * See `../tradingView.ts` for why this is an iframe rather than TradingView's
 * documented script snippet.
 */

const WIDGET_ID = 'ticker-tape';

/** The six instruments the design calls for. */
const SYMBOLS = [
  { description: 'S&P 500', proName: TV_SYMBOLS['sp-500'] },
  { description: 'Nasdaq 100', proName: TV_SYMBOLS['nasdaq-100'] },
  { description: 'Dow Jones', proName: TV_SYMBOLS['dow-jones'] },
  { description: 'Bitcoin', proName: TV_SYMBOLS.bitcoin },
  { description: 'Gold', proName: TV_SYMBOLS.gold },
  { description: 'EUR / USD', proName: TV_SYMBOLS['eur-usd'] },
];

/** Height of the tape itself, matching the strip it replaced. */
const TAPE_HEIGHT = 46;

export async function MarketTicker() {
  const locale = await getLocale();

  const src = tradingViewWidgetUrl(
    WIDGET_ID,
    {
      symbols: SYMBOLS,
      // Logos cost roughly 30px per instrument, which is the difference
      // between all six fitting and EUR/USD being clipped off the end.
      showSymbolLogo: false,
      colorTheme: 'light',
      isTransparent: true,
      // 'regular' renders an empty tape here; 'adaptive' scrolls instead.
      displayMode: 'adaptive',
    },
    locale,
  );

  return (
    <div className="border-line bg-surface border-b">
      {/* Held to the same 1280px column as the masthead and every section
          below it. The tape scrolls, so instruments that do not fit at a given
          width cycle into view rather than being lost. */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-11">
        <iframe
          src={src}
          title="Market ticker"
          height={TAPE_HEIGHT}
          scrolling="no"
          className="block w-full border-0"
        />

        {/* Required by TradingView's embed terms. It is authored markup, not
            something the widget injects, so removing it would silently drop
            the attribution the widget is licensed on. */}
        <div className="pb-1.5 text-right text-[10.5px]">
          <a
            href="https://www.tradingview.com/markets/?utm_source=aksioneri&utm_medium=widget_new&utm_campaign=ticker-tape"
            rel="noopener nofollow"
            target="_blank"
            className="text-ink-ghost hover:text-accent"
          >
            Ticker tape
          </a>
          <span className="text-ink-ghost"> by TradingView</span>
        </div>
      </div>
    </div>
  );
}
