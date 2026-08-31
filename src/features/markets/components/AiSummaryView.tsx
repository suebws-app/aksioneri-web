'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { AiSummary } from '@/lib/api/fundamentals';
import { cn } from '@/lib/utils/cn';

export interface AiSummaryViewProps {
  summary: AiSummary;
}

export function AiSummaryView({ summary }: AiSummaryViewProps) {
  const t = useTranslations('company.snapshot');
  const locale = useLocale();

  const outlookLabel = t(`outlook.${summary.outlook}`);
  const confidenceLabel = t(`confidence.${summary.confidence}`);
  const generatedAt = formatGeneratedAt(summary.generatedAt, locale);

  return (
    <section className="overflow-hidden rounded-md border border-[#c7d3e2] bg-[#F5F8FC]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5EF] bg-[#EDF3FA] px-6 py-4">
        <div className="flex items-center gap-3">
          <SparkleIcon />
          <span className="text-accent text-[15.5px] font-semibold tracking-[-0.005em]">
            {t('title')}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <OutlookPill outlook={summary.outlook} label={outlookLabel} />
          <span className="text-ink-muted flex items-center gap-2 text-[12.5px]">
            {t('confidence.label')}
            <ConfidenceBars level={summary.confidence} />
            {confidenceLabel}
          </span>
        </div>
      </header>

      <div className="px-6 pt-6">
        <p className="text-ink mb-2 max-w-[92ch] font-serif text-[22px] leading-[1.45]">
          {summary.tldr}
        </p>
        <p className="text-ink-secondary mb-6 max-w-[92ch] text-[16px] leading-[1.65]">
          {summary.followup}
        </p>

        <div className="grid grid-cols-1 border-t border-[#DCE5EF] md:grid-cols-3">
          <BulletColumn
            tone="positive"
            title={t('columns.whyPositive')}
            symbol="+"
            items={summary.positives.map((entry) => entry.headline)}
            className="pt-5 pb-5 md:pr-6"
          />
          <BulletColumn
            tone="negative"
            title={t('columns.keyRisks')}
            symbol="−"
            items={summary.risks.map((entry) => entry.headline)}
            className="border-t border-[#DCE5EF] pt-5 pb-5 md:border-t-0 md:border-l md:px-6"
          />
          <WatchColumn
            title={t('columns.watchNext')}
            items={summary.watchNext}
            className="border-t border-[#DCE5EF] pt-5 pb-5 md:border-t-0 md:border-l md:pl-6"
          />
        </div>
      </div>

      {(summary.whatHappened ||
        summary.whyMoving ||
        summary.assessmentGuide ||
        summary.changingView.length > 0) && (
        <details className="group border-t border-[#DCE5EF] px-6 pt-4 pb-6">
          <summary className="text-accent hover:text-accent/80 mb-4 inline-flex cursor-pointer list-none items-center gap-2 text-[13.5px] font-medium">
            <span className="group-open:hidden">{t('detail.showMore')}</span>
            <span className="hidden group-open:inline">
              {t('detail.showLess')}
            </span>
            <ChevronIcon className="group-open:rotate-180" />
          </summary>

          <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2">
            <div>
              {summary.whatHappened ? (
                <>
                  <h3 className="text-ink mb-2 font-serif text-[20px] font-medium">
                    {t('detail.whatHappened')}
                  </h3>
                  <p className="text-ink-secondary mb-5 text-[15px] leading-[1.65]">
                    {summary.whatHappened}
                  </p>
                </>
              ) : null}
              {summary.whyMoving ? (
                <>
                  <h3 className="text-ink mb-2 font-serif text-[20px] font-medium">
                    {t('detail.whyMoving')}
                  </h3>
                  <p className="text-ink-secondary text-[15px] leading-[1.65]">
                    {summary.whyMoving}
                  </p>
                </>
              ) : null}
            </div>
            <div>
              {summary.assessmentGuide ? (
                <>
                  <h3 className="text-ink mb-2 font-serif text-[20px] font-medium">
                    {t('detail.howToRead')}
                  </h3>
                  <p className="text-ink-secondary mb-4 text-[15px] leading-[1.65]">
                    {summary.assessmentGuide}
                  </p>
                </>
              ) : null}
              {summary.changingView.length > 0 ? (
                <div className="rounded-sm border border-[#DCE5EF] bg-white px-4 py-4">
                  <p className="text-ink-faint mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {t('detail.changingView')}
                  </p>
                  <ul className="text-ink flex flex-col gap-2 text-[14.5px] leading-[1.5]">
                    {summary.changingView.map((entry, index) => (
                      <li key={index}>{entry.headline}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </details>
      )}

      <footer className="text-ink-muted border-t border-[#DCE5EF] bg-[#EDF3FA] px-6 py-3.5 text-[12.5px]">
        {t('footer.disclaimer', { date: generatedAt })}
      </footer>
    </section>
  );
}

interface BulletColumnProps {
  title: string;
  tone: 'positive' | 'negative';
  symbol: string;
  items: string[];
  className?: string;
}

function BulletColumn({
  title,
  tone,
  symbol,
  items,
  className,
}: BulletColumnProps) {
  const dotColor = tone === 'positive' ? 'bg-positive' : 'bg-negative';
  const titleColor = tone === 'positive' ? 'text-positive' : 'text-negative';
  const symbolColor = tone === 'positive' ? 'text-positive' : 'text-negative';

  return (
    <div className={className}>
      <div className="mb-3.5 flex items-center gap-2">
        <span
          aria-hidden
          className={cn('inline-block size-2 rounded-full', dotColor)}
        />
        <span
          className={cn(
            'text-[11px] font-semibold tracking-[0.12em] uppercase',
            titleColor,
          )}
        >
          {title}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-ink grid grid-cols-[14px_1fr] gap-2.5 text-[14.5px] leading-[1.5]"
          >
            <span className={symbolColor}>{symbol}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface WatchColumnProps {
  title: string;
  items: { label: string; when: string }[];
  className?: string;
}

function WatchColumn({ title, items, className }: WatchColumnProps) {
  return (
    <div className={className}>
      <div className="mb-3.5 flex items-center gap-2">
        <span
          aria-hidden
          className="bg-accent inline-block size-2 rounded-full"
        />
        <span className="text-accent text-[11px] font-semibold tracking-[0.12em] uppercase">
          {title}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-ink flex items-baseline justify-between gap-4 text-[14.5px] leading-[1.5]"
          >
            <span>{item.label}</span>
            <span className="text-ink-faint shrink-0 font-mono text-[12.5px]">
              {item.when}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutlookPill({
  outlook,
  label,
}: {
  outlook: AiSummary['outlook'];
  label: string;
}) {
  const tone =
    outlook === 'positive'
      ? 'bg-positive text-paper'
      : outlook === 'cautious'
        ? 'bg-negative text-paper'
        : 'bg-ink-muted text-paper';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium',
        tone,
      )}
    >
      <span
        aria-hidden
        className="bg-paper inline-block size-[7px] rounded-full"
      />
      {label}
    </span>
  );
}

function ConfidenceBars({ level }: { level: AiSummary['confidence'] }) {
  const filled = level === 'high' ? 4 : level === 'moderate' ? 3 : 2;
  return (
    <span className="inline-flex gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={cn(
            'inline-block h-[5px] w-4 rounded-[2px]',
            index < filled ? 'bg-accent' : 'bg-[#c7d3e2]',
          )}
        />
      ))}
    </span>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-accent"
      aria-hidden
    >
      <path
        d="M10 2.2 L11.7 7.2 L16.6 8.9 L11.7 10.6 L10 15.6 L8.3 10.6 L3.4 8.9 L8.3 7.2 Z"
        strokeLinejoin="round"
      />
      <path d="M15.6 14.1 L16.4 16.3 L18.5 17.1 L16.4 17.9 L15.6 20" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('transition-transform', className)}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function formatGeneratedAt(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
