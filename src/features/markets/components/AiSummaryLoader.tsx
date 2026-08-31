'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { generateAiSummary, type AiSummary } from '@/lib/api/fundamentals';
import { AiSummaryView } from './AiSummaryView';

export interface AiSummaryLoaderProps {
  ticker: string;
  locale: string;
}

type Status =
  | { kind: 'loading' }
  | { kind: 'ready'; summary: AiSummary }
  | { kind: 'error' };

export function AiSummaryLoader({ ticker, locale }: AiSummaryLoaderProps) {
  const [status, setStatus] = useState<Status>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;

    generateAiSummary(ticker, locale)
      .then((summary) => {
        if (!cancelled) setStatus({ kind: 'ready', summary });
      })
      .catch(() => {
        if (!cancelled) setStatus({ kind: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [ticker, locale]);

  if (status.kind === 'ready')
    return <AiSummaryView summary={status.summary} />;
  if (status.kind === 'error') return null;
  return <AiSummarySkeleton />;
}

function AiSummarySkeleton() {
  const t = useTranslations('company.snapshot');

  return (
    <section
      className="overflow-hidden rounded-md border border-[#c7d3e2] bg-[#F5F8FC]"
      aria-busy="true"
      aria-live="polite"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5EF] bg-[#EDF3FA] px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="text-accent inline-flex size-[19px] items-center justify-center"
          >
            <SparkleIcon />
          </span>
          <span className="text-accent text-[15.5px] font-semibold tracking-[-0.005em]">
            {t('title')}
          </span>
          <span className="text-ink-faint text-[12.5px]">
            {t('generating')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShimmerBar className="h-5 w-24 rounded-full" />
          <ShimmerBar className="h-4 w-28 rounded" />
        </div>
      </header>

      <div className="px-6 pt-6 pb-2">
        <ShimmerBar className="mb-3 h-6 w-3/4 rounded" />
        <ShimmerBar className="mb-2 h-4 w-full rounded" />
        <ShimmerBar className="mb-6 h-4 w-4/5 rounded" />

        <div className="grid grid-cols-1 gap-6 border-t border-[#DCE5EF] pt-5 pb-6 md:grid-cols-3">
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
        </div>
      </div>
    </section>
  );
}

function SkeletonColumn() {
  return (
    <div className="flex flex-col gap-3">
      <ShimmerBar className="mb-1 h-3 w-24 rounded" />
      <ShimmerBar className="h-4 w-full rounded" />
      <ShimmerBar className="h-4 w-11/12 rounded" />
      <ShimmerBar className="h-4 w-10/12 rounded" />
    </div>
  );
}

function ShimmerBar({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`block animate-pulse bg-[#DCE5EF] ${className}`}
    />
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
