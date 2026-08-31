'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

type TabKey =
  'overview' | 'financials' | 'valuation' | 'dividends' | 'news' | 'filings';

interface Tab {
  key: TabKey;
  suffix: '' | 'financials' | 'valuation' | 'dividends' | 'news' | 'filings';
  stockOnly: boolean;
}

const TABS: readonly Tab[] = [
  { key: 'overview', suffix: '', stockOnly: false },
  { key: 'financials', suffix: 'financials', stockOnly: true },
  { key: 'valuation', suffix: 'valuation', stockOnly: true },
  { key: 'dividends', suffix: 'dividends', stockOnly: true },
  { key: 'news', suffix: 'news', stockOnly: false },
  { key: 'filings', suffix: 'filings', stockOnly: true },
];

export interface CompanyNavigationProps {
  symbol: string;
  category: string;
}

export function CompanyNavigation({
  symbol,
  category,
}: CompanyNavigationProps) {
  const t = useTranslations('company.nav');
  const pathname = usePathname();
  const isStock = category === 'stock';
  const visibleTabs = TABS.filter((tab) => !tab.stockOnly || isStock);

  return (
    <nav aria-label={t('label')} className="border-line bg-paper border-b">
      <div className="page-container overflow-x-auto">
        <ul className="flex gap-6 whitespace-nowrap" role="list">
          {visibleTabs.map((tab) => {
            const href = tab.suffix
              ? `/markets/${symbol}/${tab.suffix}`
              : `/markets/${symbol}`;
            const canonical = tab.suffix
              ? `/markets/[symbol]/${tab.suffix}`
              : `/markets/[symbol]`;
            const active = pathname === canonical;
            return (
              <li key={tab.key}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-11 items-center border-b-2 text-[14px] transition-colors',
                    active
                      ? 'border-accent text-ink font-medium'
                      : 'text-ink-muted hover:text-ink border-transparent',
                  )}
                >
                  {t(tab.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
