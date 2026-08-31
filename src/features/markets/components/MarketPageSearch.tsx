'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { toMarketPath } from '@/lib/utils/marketPath';

const HINT_TICKERS = ['AAPL', 'NVDA', 'BTC'];

export function MarketPageSearch() {
  const t = useTranslations('markets.pageSearch');
  const router = useRouter();
  const [value, setValue] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    if (query.length === 0) return;
    const normalized = query.toUpperCase().replace(/\s+/g, '');
    router.push(toMarketPath(normalized));
  };

  return (
    <div className="w-full lg:w-[400px]">
      <form onSubmit={submit} role="search" className="w-full">
        <label className="border-line-strong focus-within:border-accent bg-surface flex items-center gap-2.5 rounded-sm border px-3.5 py-3 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink-faint shrink-0"
            aria-hidden
          >
            <circle cx="7" cy="7" r="4.6" />
            <path d="M10.4 10.4L14 14" />
          </svg>
          <span className="sr-only">{t('placeholder')}</span>
          <input
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t('placeholder')}
            className="text-ink placeholder:text-ink-faint w-full bg-transparent text-[14.5px] outline-none"
            autoComplete="off"
          />
        </label>
      </form>

      <div className="text-ink-faint mt-2.5 flex items-center gap-2 text-[12.5px]">
        <span>{t('try')}</span>
        {HINT_TICKERS.map((ticker) => (
          <Link
            key={ticker}
            href={toMarketPath(ticker)}
            className="text-ink-muted hover:text-accent font-mono"
          >
            {ticker}
          </Link>
        ))}
      </div>
    </div>
  );
}
