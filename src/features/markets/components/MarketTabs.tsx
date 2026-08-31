'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { MARKET_TABS, type MarketTab } from '../marketsUniverse';

export interface MarketTabsProps {
  active: MarketTab;
  basePath: string;
}

export function MarketTabs({ active, basePath }: MarketTabsProps) {
  const t = useTranslations('markets.tabs');

  return (
    <div className="border-line flex gap-1 overflow-x-auto border-b">
      {MARKET_TABS.map((tab) => {
        const isActive = tab === active;
        const href = tab === 'overview' ? basePath : `${basePath}?tab=${tab}`;
        return (
          <Link
            key={tab}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              '-mb-px inline-flex items-center border-b-2 px-4 py-3 text-[14.5px] whitespace-nowrap transition-colors',
              isActive
                ? 'border-accent text-ink font-medium'
                : 'text-ink-muted hover:text-ink border-transparent',
            )}
          >
            {t(tab)}
          </Link>
        );
      })}
    </div>
  );
}
