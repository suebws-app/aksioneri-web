'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useHasHydrated, useLearnProgress } from '../useLearnProgress';
import type { Lesson } from '../learnTypes';

/**
 * "Continue where you left off", shown only once the reader has actually
 * opened something and not yet finished it.
 *
 * Takes the whole lesson list as props rather than looking anything up: this
 * is a client component, and shipping the resolver to the browser to find one
 * title would be a poor trade.
 */
export function ContinueReading({ lessons }: { lessons: Lesson[] }) {
  const t = useTranslations('learn');
  const hydrated = useHasHydrated();
  const lastVisited = useLearnProgress((state) => state.lastVisited);
  const completed = useLearnProgress((state) => state.completed);
  const clearAll = useLearnProgress((state) => state.clearAll);

  const anyProgress = hydrated && Object.keys(completed).length > 0;
  const lesson =
    hydrated && lastVisited && !completed[lastVisited]
      ? lessons.find((entry) => entry.slug === lastVisited)
      : undefined;

  if (!lesson && !anyProgress) return null;

  return (
    <div className="border-line bg-surface-muted mb-8 flex flex-wrap items-center justify-between gap-4 rounded-sm border p-5.5">
      {lesson ? (
        <div>
          <p className="text-accent mb-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {t('continueReading')}
          </p>
          <Link
            href={`/learn/${lesson.slug}`}
            className="text-ink hover:text-accent font-serif text-[19px]"
          >
            {lesson.title}
          </Link>
        </div>
      ) : (
        <span />
      )}

      {anyProgress ? (
        // Data the site keeps about a reader needs a way to delete it.
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
