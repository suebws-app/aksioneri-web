'use client';

import { useTranslations } from 'next-intl';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';

export function LessonTick({
  slug,
  variant = 'stacked',
}: {
  slug: string;
  variant?: 'stacked' | 'inline';
}) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const completed = useLearnProgress((state) => state.completed);

  if (!hydrated || !completed[slug]) return null;

  return (
    <span
      className={
        variant === 'inline'
          ? 'text-positive font-mono text-[12px] whitespace-nowrap'
          : 'text-positive mb-1.5 block font-mono text-[13px]'
      }
    >
      <span aria-hidden>✓ </span>
      {t('markedAsRead')}
    </span>
  );
}
