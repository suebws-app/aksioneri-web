'use client';

import { useTranslations } from 'next-intl';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';

/**
 * A small mark on a lesson the reader has finished.
 *
 * Renders nothing until the persisted store has rehydrated, so the server HTML
 * and the first client render agree.
 *
 * Two shapes for two layouts: `stacked` sits on its own line above a card's
 * title, `inline` rides alongside a title in a list row without pushing the
 * row taller.
 */
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
