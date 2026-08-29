'use client';

import { useTranslations } from 'next-intl';
import { ProgressBar } from '@/components/ProgressBar';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';

export function TopicProgress({
  slugs,
  title,
}: {
  slugs: string[];
  title: string;
}) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const completed = useLearnProgress((state) => state.completed);

  const done = hydrated
    ? slugs.filter((slug) => Boolean(completed[slug])).length
    : 0;

  if (done === 0) return null;

  return (
    <div className="mt-3 flex items-center gap-3">
      <ProgressBar
        value={done}
        max={slugs.length}
        label={title}
        className="max-w-40 flex-1"
      />
      <span className="text-ink-faint text-[12.5px]">
        {t('topicProgress', { done, total: slugs.length })}
      </span>
    </div>
  );
}
