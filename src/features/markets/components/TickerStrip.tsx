import { ChangeValue } from '@/components/ChangeValue';
import { Link } from '@/i18n/navigation';
import type { Quote } from '../marketsTypes';

/**
 * The quote strip under the masthead.
 *
 * Six columns on desktop, scrolling sideways on narrow screens rather than
 * wrapping into a block that pushes the page down.
 */
export function TickerStrip({ quotes }: { quotes: Quote[] }) {
  return (
    <div className="border-line bg-surface relative overflow-x-auto border-b">
      <div className="mx-auto grid max-w-[1280px] min-w-[880px] grid-cols-6">
        {quotes.map((quote, index) => (
          <Link
            key={quote.symbol}
            href={`/markets/${quote.symbol}`}
            className={
              index === quotes.length - 1
                ? 'hover:bg-paper px-5.5 py-3.5'
                : 'border-line-soft hover:bg-paper border-r px-5.5 py-3.5'
            }
          >
            <div className="text-ink-faint mb-1.5 text-[11px] font-semibold tracking-[0.11em] uppercase">
              {quote.name}
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-ink font-mono text-base">
                {quote.price}
              </span>
              <ChangeValue
                percent={quote.changePercent}
                className="text-[13px]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
