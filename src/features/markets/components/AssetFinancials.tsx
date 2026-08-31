'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import {
  fetchBalanceSheet,
  fetchCashFlow,
  fetchIncomeStatement,
  type StatementPeriod,
  type StatementResponse,
} from '@/lib/api/fundamentals';
import { cn } from '@/lib/utils/cn';
import { FinancialTable } from './FinancialTable';

type Tab = 'income' | 'balance' | 'cashFlow';

const TABS: readonly Tab[] = ['income', 'balance', 'cashFlow'];
const PERIODS: readonly StatementPeriod[] = ['annual', 'quarterly'];

export interface AssetFinancialsProps {
  ticker: string;
  locale: Locale;
  initialTab?: Tab;
  initialPeriod?: StatementPeriod;
  initialStatement?: StatementResponse;
}

function fetchStatement(
  tab: Tab,
  ticker: string,
  period: StatementPeriod,
): Promise<StatementResponse> {
  const limit = period === 'annual' ? 5 : 8;
  if (tab === 'balance') return fetchBalanceSheet(ticker, period, limit);
  if (tab === 'cashFlow') return fetchCashFlow(ticker, period, limit);
  return fetchIncomeStatement(ticker, period, limit);
}

export function AssetFinancials({
  ticker,
  locale,
  initialTab = 'income',
  initialPeriod = 'annual',
  initialStatement,
}: AssetFinancialsProps) {
  const t = useTranslations('company.financials');
  const tMarkets = useTranslations('markets');
  const [tab, setTab] = useState<Tab>(initialTab);
  const [period, setPeriod] = useState<StatementPeriod>(initialPeriod);

  const query = useQuery({
    queryKey: ['fundamentals', 'statement', ticker, tab, period] as const,
    queryFn: () => fetchStatement(tab, ticker, period),
    staleTime: 60 * 60_000,
    refetchOnWindowFocus: false,
    initialData:
      tab === initialTab && period === initialPeriod
        ? initialStatement
        : undefined,
  });

  const statement = query.data;

  return (
    <section>
      <div className="border-ink flex flex-wrap items-baseline justify-between gap-3 border-b-2 pb-3.5">
        <h2 className="text-ink font-serif text-[27px] font-medium tracking-[-0.015em]">
          {t('heading')}
        </h2>
        <span className="text-ink-faint text-[13px]">{t('inlineNote')}</span>
      </div>

      <div className="border-line-strong bg-surface-tint flex flex-wrap items-center justify-between gap-4 border border-t-0 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="text-ink-faint text-[11.5px] tracking-[0.08em] uppercase">
            {t('statementLabel')}
          </span>
          <div
            role="group"
            aria-label={t('statementLabel')}
            className="flex flex-wrap gap-1.5"
          >
            {TABS.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={key === tab}
                onClick={() => setTab(key)}
                className={pillClass(key === tab)}
              >
                {t(`tabs.${key}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-ink-faint text-[11.5px] tracking-[0.08em] uppercase">
            {t('periodLabel')}
          </span>
          <div
            role="group"
            aria-label={t('periodLabel')}
            className="flex flex-wrap gap-1.5"
          >
            {PERIODS.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={key === period}
                onClick={() => setPeriod(key)}
                className={pillClass(key === period)}
              >
                {t(`period.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-line bg-surface overflow-hidden rounded-b-md border border-t-0">
        {statement && statement.periods.length > 0 ? (
          <FinancialTable
            statement={statement}
            locale={locale}
            caption={t(`tabs.${tab}`)}
          />
        ) : (
          <div className="text-ink-faint px-6 py-10 text-center text-[14px]">
            {query.isPending ? tMarkets('chart.loading') : t('empty.title')}
          </div>
        )}
      </div>

      <p className="text-ink-faint mt-2.5 text-[12.5px]">
        {t('inlineFootnote')}
      </p>
    </section>
  );
}

function pillClass(active: boolean): string {
  return cn(
    'rounded-[3px] px-3.5 py-1.5 font-sans text-[13.5px] transition-colors',
    active
      ? 'bg-ink text-paper border border-ink'
      : 'border-line-strong text-ink-muted hover:text-ink border bg-white',
  );
}
