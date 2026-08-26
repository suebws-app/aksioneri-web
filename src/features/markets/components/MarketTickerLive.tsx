'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { FEATURED_SYMBOLS, type Quote } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { useLiveQuotes } from '@/lib/websockets/useLiveQuotes';

/**
 * Live-updating quote strip.
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
 * **Updates arrive via the `/markets` WebSocket**, not a REST poll.
 * `useLiveQuotes` subscribes to the six strip symbols and patches this
 * cache on every tick; the SSR-hydrated `initial` fills the first paint.
 * `quotesQuery` is configured with `refetchInterval: false` and
 * `staleTime: Infinity` — a socket outage now shows a frozen strip
 * rather than a silent 15 s fallback pretending live. The refcounted
 * client dedups subscriptions across every mounted consumer.
 */
export function MarketTickerLive({ initial }: { initial: Quote[] }) {
  const t = useTranslations('markets');
  const { data } = useQuery(quotesQuery(initial));
  useLiveQuotes(FEATURED_SYMBOLS);
  const quotes = data ?? initial;

  const bySymbol = new Map(quotes.map((q) => [q.symbol, q]));
  const strip = FEATURED_SYMBOLS.map((symbol) => bySymbol.get(symbol)).filter(
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
          aria-label={t('tickerAriaLabel')}
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
    // `inert` removes the clone's anchors from the tab order, matching the
    // `aria-hidden` promise — otherwise keyboard users tab through the same
    // symbols twice and Lighthouse flags "focusable descendents".
    <ul
      className="flex shrink-0"
      aria-hidden={ariaHidden || undefined}
      inert={ariaHidden || undefined}
    >
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
  const flash = usePriceFlash(quote.price);

  return (
    <Link
      href={`/markets/${quote.symbol}`}
      className="border-line-soft hover:bg-surface-tint/40 block w-[212px] border-r px-5.5 py-3.5 transition-colors"
    >
      <div className="text-ink-faint mb-1.5 text-[11px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase">
        {quote.name}
      </div>
      <div className="flex items-baseline gap-2.5 whitespace-nowrap">
        <span
          className={[
            'font-mono text-base transition-colors duration-500',
            flash === 'up'
              ? 'text-positive'
              : flash === 'down'
                ? 'text-negative'
                : 'text-ink',
          ].join(' ')}
        >
          {quote.price}
        </span>
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

/**
 * TradingView-style price flash: green when the last render's price was
 * lower than this one, red when it was higher, nothing when unchanged.
 * Fades back to neutral 600 ms after the tick — long enough for the eye
 * to register, short enough that a busy symbol does not strobe.
 *
 * Compares the *formatted* price string but parses numerically so a
 * "6,421.20" → "6,421.20" no-op is silent even under React 18's strict-
 * mode double-render.
 */
function usePriceFlash(price: string): 'up' | 'down' | null {
  const prevRef = useRef<string>(price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = price;
    if (prev === price) return;

    const prevNum = Number(prev.replace(/,/g, ''));
    const currNum = Number(price.replace(/,/g, ''));
    if (!Number.isFinite(prevNum) || !Number.isFinite(currNum)) return;
    if (prevNum === currNum) return;

    setFlash(currNum > prevNum ? 'up' : 'down');
    const timer = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(timer);
  }, [price]);

  return flash;
}
