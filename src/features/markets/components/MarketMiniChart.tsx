import { getLocale } from 'next-intl/server';
import {
  tradingViewWidgetUrl,
  TV_SYMBOLS,
  type TrackedSymbol,
} from '../tradingView';

/**
 * The lead index with its intraday line.
 *
 * This replaced a hand-drawn sparkline fed by seed data — a frozen array of
 * points under a price that never moved, with the session times `09:30 /
 * 12:00 / 16:00` hardcoded beneath it. TradingView draws the real session.
 *
 * The widget renders the symbol name, last price and change itself, so there
 * is no separate heading above it: two copies of "S&P 500" would only ever
 * disagree once one of them went stale.
 */

const WIDGET_ID = 'mini-symbol-overview';

/** Matches the sparkline it replaced, in the 372px homepage sidebar column. */
const CHART_HEIGHT = 220;

interface MarketMiniChartProps {
  symbol: TrackedSymbol;
  /** `1D` is the intraday session; `1M`, `12M` and `all` are also accepted. */
  dateRange?: string;
  className?: string;
}

export async function MarketMiniChart({
  symbol,
  dateRange = '1D',
  className,
}: MarketMiniChartProps) {
  const locale = await getLocale();

  const src = tradingViewWidgetUrl(
    WIDGET_ID,
    {
      symbol: TV_SYMBOLS[symbol],
      dateRange,
      colorTheme: 'light',
      isTransparent: true,
      // Fills whatever box the iframe occupies. Passing an explicit
      // `width: '100%'` here would render a blank frame instead.
      autosize: true,
    },
    locale,
  );

  return (
    <section className={className}>
      <iframe
        src={src}
        title={`${symbol} chart`}
        height={CHART_HEIGHT}
        scrolling="no"
        className="block w-full border-0"
      />
    </section>
  );
}
