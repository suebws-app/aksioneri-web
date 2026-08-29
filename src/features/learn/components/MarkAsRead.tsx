'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';

export function MarkAsRead({ slug }: { slug: string }) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const completed = useLearnProgress((state) => state.completed);
  const markComplete = useLearnProgress((state) => state.markComplete);
  const markIncomplete = useLearnProgress((state) => state.markIncomplete);
  const setLastVisited = useLearnProgress((state) => state.setLastVisited);

  useEffect(() => {
    setLastVisited(slug);
  }, [slug, setLastVisited]);

  const isRead = hydrated && Boolean(completed[slug]);

  return (
    <div className="border-line mt-8.5 flex flex-wrap items-center gap-4 border-t pt-6">
      <button
        type="button"
        onClick={() => (isRead ? markIncomplete(slug) : markComplete(slug))}
        aria-pressed={isRead}
        className={cn(
          'rounded-sm border px-5 py-2.5 text-[14.5px] font-medium',
          isRead
            ? 'border-positive text-positive'
            : 'border-line-strong text-ink hover:border-ink-faint',
        )}
      >
        <span aria-hidden className="mr-2 font-mono text-[13px]">
          {isRead ? '✓' : '○'}
        </span>
        {isRead ? t('markedAsRead') : t('markAsRead')}
      </button>

      <p className="text-ink-ghost text-[12.5px]">
        {t('progressStoredLocally')}
      </p>
    </div>
  );
}
