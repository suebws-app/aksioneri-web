'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { FEATURED_SYMBOLS, type Quote } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { useLiveQuotes } from '@/lib/websockets/useLiveQuotes';
import { usePriceFlash } from '../usePriceFlash';

export function MarketTickerLive({ initial }: { initial: Quote[] }) {
  const t = useTranslations('markets');
  const { data } = useQuery(quotesQuery(initial));
  useLiveQuotes(FEATURED_SYMBOLS);
  const quotes = data ?? initial;

  const strip = useMemo(() => {
    const bySymbol = new Map(quotes.map((q) => [q.symbol, q]));
    return FEATURED_SYMBOLS.map((symbol) => bySymbol.get(symbol)).filter(
      (q): q is Quote => q !== undefined,
    );
  }, [quotes]);

  return (
    <div className="border-line bg-surface border-b">
      <div className="page-container overflow-hidden">
        <div
          className="animate-marquee flex w-max hover:[animation-play-state:paused]"
          aria-label={t('tickerAriaLabel')}
        >
          <TickerRail quotes={strip} />
          <TickerRail quotes={strip} ariaHidden />
        </div>
      </div>
    </div>
  );
}

const TickerRail = memo(function TickerRail({
  quotes,
  ariaHidden = false,
}: {
  quotes: Quote[];
  ariaHidden?: boolean;
}) {
  return (
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
});

const TickerCell = memo(
  function TickerCell({ quote }: { quote: Quote }) {
    const isNegative = quote.changePercent < 0;
    const sign = isNegative ? '−' : '+';
    const flash = usePriceFlash(quote.price);

    return (
      <Link
        href={`/markets/${quote.symbol}`}
        className="border-line-soft hover:bg-surface-tint/40 block w-53 border-r px-5.5 py-3.5 transition-colors"
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
  },
  (prev, next) =>
    prev.quote.price === next.quote.price &&
    prev.quote.changePercent === next.quote.changePercent,
);
