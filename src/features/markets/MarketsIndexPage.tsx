import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { formatTimestamp } from '@/features/calendar/formatDate';
import type { Locale } from '@/i18n/config';
import { QuoteTable } from './components/QuoteTable';
import { MarketTicker } from './components/MarketTicker';
import type { Quote } from '@/lib/api/markets';

/**
 * The full instrument list.
 *
 * The homepage is the markets *overview* — a lead index, movers, news — and
 * shows only the top handful of quotes. This is the plain index behind its
 * "view all" link, which pointed at a route that did not exist.
 */
export interface MarketsIndexPageProps {
  /** Every instrument, grouped for display. */
  groups: { key: string; quotes: Quote[] }[];
  updatedAt: string;
}

export function MarketsIndexPage({ groups, updatedAt }: MarketsIndexPageProps) {
  const t = useTranslations('markets');
  const locale = useLocale() as Locale;

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="markets" />
      <MarketTicker />

      <main className="flex-1">
        <div className="page-container pt-10">
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-ink mb-2 font-serif text-[38px] font-medium tracking-[-0.02em]">
                {t('indexHeading')}
              </h1>
              <p className="text-ink-muted text-base">{t('indexSubheading')}</p>
            </div>
            <time dateTime={updatedAt} className="text-ink-faint text-[13px]">
              {formatTimestamp(locale, updatedAt)}
            </time>
          </div>
        </div>

        <div className="page-container flex flex-col gap-10 pb-11">
          {groups.map((group) => (
            <section key={group.key}>
              <SectionHeading title={t(`groups.${group.key}`)} />
              <QuoteTable quotes={group.quotes} />
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
