'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { continueTarget } from '../continueTarget';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';
import type { Lesson } from '../learnTypes';

export function ContinueReading({ lessons }: { lessons: Lesson[] }) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const lastVisited = useLearnProgress((state) => state.lastVisited);
  const completed = useLearnProgress((state) => state.completed);
  const clearAll = useLearnProgress((state) => state.clearAll);

  const anyProgress = hydrated && Object.keys(completed).length > 0;
  const target = hydrated
    ? continueTarget(lessons, lastVisited, completed)
    : null;

  if (!target && !anyProgress) return null;

  return (
    <div className="border-line bg-surface-muted mb-8 flex flex-wrap items-center justify-between gap-4 rounded-sm border p-5.5">
      {target ? (
        <div>
          <p className="text-accent mb-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {target.done ? t('lastRead') : t('continueReading')}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/learn/${target.lesson.slug}`}
              className="text-ink hover:text-accent font-serif text-[19px]"
            >
              {target.lesson.title}
            </Link>
            {target.done ? (
              <span className="text-positive border-positive rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                ✓ {t('markedAsRead')}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <span />
      )}

      {anyProgress ? (
        <button
          type="button"
          onClick={clearAll}
          className="text-ink-faint hover:text-accent text-[13px] underline underline-offset-2"
        >
          {t('clearProgress')}
        </button>
      ) : null}
    </div>
  );
}
