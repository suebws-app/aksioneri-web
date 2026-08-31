import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { getQuotesFor, type Quote } from '@/lib/api/markets';
import { cn } from '@/lib/utils/cn';
import { toMarketPath } from '@/lib/utils/marketPath';
import type { MarketTab, UniverseEntry } from '../marketsUniverse';
import { formatSignedPercent } from '@/lib/format/percent';

export interface TrendingTableProps {
  locale: Locale;
  tab: MarketTab;
  universe: readonly UniverseEntry[];
  title: string;
}

interface RowData {
  displaySymbol: string;
  linkSymbol: string;
  name: string;
  price: string;
  changeAbsolute: string;
  changePercent: number;
  changePercentText: string;
  toneClass: string;
}

function buildRows(
  universe: readonly UniverseEntry[],
  quotes: Quote[],
): RowData[] {
  const byRequested = new Map<string, Quote>();
  const byNormalized = new Map<string, Quote>();
  for (const quote of quotes) {
    const key = quote.symbol.toUpperCase();
    byRequested.set(key, quote);
    byNormalized.set(key.replace(/[.-]/g, ''), quote);
    if (quote.providerSymbol) {
      byRequested.set(quote.providerSymbol.toUpperCase(), quote);
    }
  }

  return universe.flatMap((entry): RowData[] => {
    const wanted = entry.symbol.toUpperCase();
    const quote =
      byRequested.get(wanted) ?? byNormalized.get(wanted.replace(/[.-]/g, ''));
    const displaySymbol =
      quote?.providerSymbol?.replace(/[=^].*$/g, '') ??
      entry.symbol.replace(/[=^].*$/g, '').toUpperCase();
    const name = entry.displayName ?? quote?.name ?? entry.symbol;
    const price = quote?.price ?? '—';
    const changePercent = quote?.changePercent ?? 0;
    const isPositive = changePercent >= 0;
    return [
      {
        displaySymbol,
        linkSymbol: entry.symbol,
        name,
        price,
        changeAbsolute: formatChangeAbsolute(price, changePercent),
        changePercent,
        changePercentText: quote ? formatSignedPercent(changePercent) : '—',
        toneClass: quote
          ? isPositive
            ? 'text-positive'
            : 'text-negative'
          : 'text-ink-faint',
      },
    ];
  });
}

function formatChangeAbsolute(priceString: string, percent: number): string {
  const numeric = Number(priceString.replace(/[^0-9.-]/g, ''));
  if (!Number.isFinite(numeric) || numeric === 0 || !Number.isFinite(percent)) {
    return '—';
  }
  const change = (numeric * percent) / 100;
  const sign = change >= 0 ? '+' : '';
  const decimals = numeric < 10 ? 4 : numeric < 1000 ? 2 : 2;
  return `${sign}${change.toFixed(decimals)}`;
}

export async function TrendingTable({
  locale,
  universe,
  title,
}: TrendingTableProps) {
  const t = await getTranslations({ locale, namespace: 'markets' });
  const tTable = await getTranslations({ locale, namespace: 'markets.table' });

  const quotes = await getQuotesFor(universe.map((entry) => entry.symbol));
  const rows = buildRows(universe, quotes);

  return (
    <section>
      <div className="border-ink flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 pb-3.5">
        <h2 className="text-ink font-serif text-[27px] font-medium tracking-[-0.015em]">
          {title}
        </h2>
        <span className="text-ink-faint text-[13px]">{t('tableNote')}</span>
      </div>

      <div className="border-line bg-surface overflow-x-auto rounded-b-md border border-t-0">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-line bg-surface-tint border-b">
              <th className="text-ink-faint px-5 py-3 text-left text-[11px] font-semibold tracking-[0.1em] uppercase">
                {tTable('symbol')}
              </th>
              <th className="text-ink-faint px-5 py-3 text-left text-[11px] font-semibold tracking-[0.1em] uppercase">
                {tTable('company')}
              </th>
              <th className="text-ink-faint px-5 py-3 text-right text-[11px] font-semibold tracking-[0.1em] uppercase">
                {tTable('price')}
              </th>
              <th className="text-ink-faint px-5 py-3 text-right text-[11px] font-semibold tracking-[0.1em] uppercase">
                {tTable('change')}
              </th>
              <th className="text-ink-faint px-5 py-3 text-right text-[11px] font-semibold tracking-[0.1em] uppercase">
                {tTable('percentChange')}
              </th>
              <th className="w-8 px-2" aria-hidden></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.linkSymbol}
                className="border-line-soft hover:bg-surface-tint border-b transition-colors last:border-b-0"
              >
                <td className="px-5 py-3.5">
                  <Link
                    href={toMarketPath(row.linkSymbol)}
                    className="text-accent font-mono text-[14px] font-medium"
                  >
                    {row.displaySymbol}
                  </Link>
                </td>
                <td className="text-ink px-5 py-3.5 text-[14.5px]">
                  <Link
                    href={toMarketPath(row.linkSymbol)}
                    className="hover:text-accent block max-w-[36ch] truncate"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="text-ink px-5 py-3.5 text-right font-mono text-[14px]">
                  {row.price}
                </td>
                <td
                  className={cn(
                    'px-5 py-3.5 text-right font-mono text-[14px]',
                    row.toneClass,
                  )}
                >
                  {row.changeAbsolute}
                </td>
                <td
                  className={cn(
                    'px-5 py-3.5 text-right font-mono text-[14px]',
                    row.toneClass,
                  )}
                >
                  {row.changePercentText}
                </td>
                <td
                  className="text-ink-faint w-8 px-2 py-3.5 text-right"
                  aria-hidden
                >
                  ›
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
