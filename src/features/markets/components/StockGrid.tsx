import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { FeaturedStockMeta } from '@/lib/api/markets';
import { toMarketPath } from '@/lib/utils/marketPath';

export interface StockGridProps {
  stocks: readonly FeaturedStockMeta[];
}

export function StockGrid({ stocks }: StockGridProps) {
  const t = useTranslations('markets.sectors');

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stocks.map((stock) => (
        <li key={stock.ticker}>
          <Link
            href={toMarketPath(stock.ticker)}
            className="border-line hover:border-accent bg-surface group flex h-full flex-col rounded-sm border p-4 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-accent rounded-xs border border-[#c7d3e2] px-1.5 py-0.5 font-mono text-[11px] tracking-[0.06em]">
                {stock.ticker}
              </span>
              <span className="text-ink-faint text-[11px]">
                {t(stock.sector)}
              </span>
            </div>
            <div className="text-ink group-hover:text-accent mt-3 font-serif text-[17px] leading-tight">
              {stock.name}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
