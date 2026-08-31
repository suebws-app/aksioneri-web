import { Link } from '@/i18n/navigation';
import { getQuotesFor, type Quote } from '@/lib/api/markets';
import { cn } from '@/lib/utils/cn';
import { toMarketPath } from '@/lib/utils/marketPath';
import type { UniverseEntry } from '../marketsUniverse';
import { formatSignedPercent } from '@/lib/format/percent';

export interface CompactListProps {
  heading: string;
  note?: string;
  noteTone?: 'default' | 'positive' | 'negative';
  universe: readonly UniverseEntry[];
  variant?: 'grid' | 'flow';
}

export async function CompactList({
  heading,
  note,
  noteTone = 'default',
  universe,
  variant = 'flow',
}: CompactListProps) {
  const quotes = await getQuotesFor(universe.map((entry) => entry.symbol));
  const byKey = new Map<string, Quote>();
  for (const quote of quotes) byKey.set(quote.symbol.toUpperCase(), quote);

  const noteClass = cn(
    'text-[12.5px]',
    noteTone === 'positive' && 'text-positive',
    noteTone === 'negative' && 'text-negative',
    noteTone === 'default' && 'text-ink-faint',
  );

  const items = universe.map((entry) => {
    const quote = byKey.get(entry.symbol.toUpperCase());
    const isPositive = (quote?.changePercent ?? 0) >= 0;
    const displaySymbol =
      quote?.providerSymbol?.replace(/[=^].*$/g, '') ??
      entry.symbol.replace(/[=^].*$/g, '').toUpperCase();
    const name = entry.displayName ?? quote?.name ?? entry.symbol;
    return {
      linkSymbol: entry.symbol,
      displaySymbol,
      name,
      price: quote?.price ?? '—',
      changePercent: quote?.changePercent ?? 0,
      isPositive,
    };
  });

  if (variant === 'grid') {
    return (
      <div className="border-line bg-surface rounded-md border">
        <header className="border-line flex items-baseline justify-between border-b px-5 py-4">
          <span className="text-ink font-serif text-[20px]">{heading}</span>
          {note ? <span className={noteClass}>{note}</span> : null}
        </header>
        <ul>
          {items.map((item) => (
            <li key={item.linkSymbol}>
              <Link
                href={toMarketPath(item.linkSymbol)}
                className="border-line-soft hover:bg-surface-tint flex items-center justify-between gap-4 border-b px-5 py-3 transition-colors last:border-b-0"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-accent font-mono text-[13.5px]">
                    {item.displaySymbol}
                  </span>
                  <span className="text-ink-faint truncate text-[12.5px]">
                    {item.name}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-0.5">
                  <span className="text-ink font-mono text-[13.5px]">
                    {item.price}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[12.5px]',
                      item.isPositive ? 'text-positive' : 'text-negative',
                    )}
                  >
                    {formatSignedPercent(item.changePercent)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section>
      <header className="border-ink flex items-baseline justify-between border-b pb-3">
        <h3 className="text-ink font-serif text-[23px] font-medium">
          {heading}
        </h3>
        {note ? <span className={noteClass}>{note}</span> : null}
      </header>
      <div className="border-line bg-surface rounded-b-md border border-t-0">
        <ul>
          {items.map((item) => (
            <li key={item.linkSymbol}>
              <Link
                href={toMarketPath(item.linkSymbol)}
                className="border-line-soft hover:bg-surface-tint grid grid-cols-[74px_minmax(0,1fr)_auto_auto] items-center gap-4 border-b px-5 py-3 transition-colors last:border-b-0"
              >
                <span className="text-accent font-mono text-[13.5px]">
                  {item.displaySymbol}
                </span>
                <span className="text-ink truncate text-[14px]">
                  {item.name}
                </span>
                <span className="text-ink font-mono text-[13.5px]">
                  {item.price}
                </span>
                <span
                  className={cn(
                    'min-w-[66px] text-right font-mono text-[13px]',
                    item.isPositive ? 'text-positive' : 'text-negative',
                  )}
                >
                  {formatSignedPercent(item.changePercent)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
