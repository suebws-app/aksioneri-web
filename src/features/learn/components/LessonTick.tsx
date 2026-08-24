'use client';

import { useTranslations } from 'next-intl';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';

/**
 * A small mark on a lesson the reader has finished.
 *
 * Renders nothing until the persisted store has rehydrated, so the server HTML
 * and the first client render agree.
 */
export function LessonTick({ slug }: { slug: string }) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const completed = useLearnProgress((state) => state.completed);

  if (!hydrated || !completed[slug]) return null;

  return (
    <span className="text-positive mb-1.5 block font-mono text-[13px]">
      <span aria-hidden>✓ </span>
      {t('markedAsRead')}
    </span>
  );
}
