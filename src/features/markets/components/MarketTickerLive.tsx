'use client';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@/i18n/navigation';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';

/**
 * The instruments the strip shows, left to right.
 *
 * Six deliberate slots to match the design — the API's seventh (STOXX 600)
 * lives on the markets index instead. Kept in this order so a change to the
 * design (or the fixture list) is a one-line edit here.
 */
const STRIP_ORDER: SupportedSymbol[] = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'bitcoin',
  'gold',
  'eur-usd',
];

/**
 * Live-polling quote strip.
 *
 * Each cell keeps the design's editorial stack — small tracked label above,
 * price + change in Plex Mono below — and the whole rail scrolls on an 80 s
 * marquee. The cells are rendered twice back-to-back so a `translateX(-50%)`
 * loop is seamless: after one cycle the second copy sits where the first
 * started and the jump back to 0% is invisible.
 *
 * The strip pauses on hover so a reader can catch a name or click through
 * to `/markets/[symbol]`. The TradingView iframe this replaced owned its
 * own markup and dropped every intra-site link.
 *
 * The numbers themselves refresh every 15 s through `quotesQuery` — separate
 * from the scroll, which is purely visual.
 */
export function MarketTickerLive({ initial }: { initial: Quote[] }) {
  const { data } = useQuery(quotesQuery(initial));
  const quotes = data ?? initial;

  const bySymbol = new Map(quotes.map((q) => [q.symbol, q]));
  const strip = STRIP_ORDER.map((symbol) => bySymbol.get(symbol)).filter(
    (q): q is Quote => q !== undefined,
  );

  return (
    <div className="border-line bg-surface border-b">
      {/* Border and background span the viewport to match the design; the
          scrolling rail itself is clipped to the same 1280px column every
          other page section uses, so nothing spills into the gutters. */}
      <div className="page-container overflow-hidden">
        <div
          className="animate-marquee flex w-max hover:[animation-play-state:paused]"
          aria-label="Market ticker"
        >
          {/* Rendered twice — the second copy is what the marquee reveals as
              the first slides off. aria-hidden on the clone keeps a screen
              reader from announcing every price twice. */}
          <TickerRail quotes={strip} />
          <TickerRail quotes={strip} ariaHidden />
        </div>
      </div>
    </div>
  );
}

function TickerRail({
  quotes,
  ariaHidden = false,
}: {
  quotes: Quote[];
  ariaHidden?: boolean;
}) {
  return (
    <ul className="flex shrink-0" aria-hidden={ariaHidden || undefined}>
      {quotes.map((quote) => (
        <li key={quote.symbol}>
          <TickerCell quote={quote} />
        </li>
      ))}
    </ul>
  );
}

function TickerCell({ quote }: { quote: Quote }) {
  const isNegative = quote.changePercent < 0;
  const sign = isNegative ? '−' : '+';

  return (
    <Link
      href={`/markets/${quote.symbol}`}
      className="border-line-soft hover:bg-surface-tint/40 block w-[212px] border-r px-5.5 py-3.5 transition-colors"
    >
      <div className="text-ink-faint mb-1.5 text-[11px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase">
        {quote.name}
      </div>
      <div className="flex items-baseline gap-2.5 whitespace-nowrap">
        <span className="text-ink font-mono text-base">{quote.price}</span>
        <span
          className={
            'font-mono text-[13px] ' +
            (isNegative ? 'text-negative' : 'text-positive')
          }
        >
          {sign}
          {Math.abs(quote.changePercent).toFixed(2)}%
        </span>
      </div>
    </Link>
  );
}
