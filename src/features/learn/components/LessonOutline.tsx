'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface OutlineEntry {
  id: string;
  label: string;
}

/**
 * How far below the viewport top a heading has to travel before its section
 * counts as the one being read. Matches the `scroll-mt-6` the sections carry
 * plus the room a jumped-to heading leaves above itself.
 */
const ACTIVE_OFFSET = 96;

/**
 * Which outline entry is current, given where each section sits relative to
 * the viewport top.
 *
 * Pure so the rule can be tested without a scroll container: the DOM reading
 * happens in the effect below, the decision happens here.
 *
 * The last section is a special case. A short final section can end while its
 * heading is still below the offset, so it would never become current without
 * the `atBottom` branch — the reader would watch the rail stall on the
 * second-to-last entry with nothing left to scroll.
 */
export const activeOutlineId = (
  positions: { id: string; top: number }[],
  { offset, atBottom }: { offset: number; atBottom: boolean },
): string | null => {
  const first = positions[0];
  if (!first) return null;
  if (atBottom) return positions[positions.length - 1]?.id ?? first.id;

  // Sections are read top-down, so the last one to have crossed the offset is
  // the one on screen. Falls back to the first, which is what the reader is
  // looking at before anything has scrolled past.
  let current = first.id;
  for (const position of positions) {
    if (position.top <= offset) current = position.id;
  }
  return current;
};

/**
 * The "on this page" rail, with the entry for the section being read marked.
 *
 * Reads scroll position rather than using an IntersectionObserver: the rail
 * has to name exactly one section at every scroll position, including inside
 * a section long enough that no heading is on screen at all. Observers report
 * visibility, which leaves that case ambiguous.
 */
export function LessonOutline({ entries }: { entries: OutlineEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  // The array arrives fresh from the server component on every render; the ids
  // are what the effect actually depends on.
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const idKey = ids.join('|');

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const sync = () => {
      frame = 0;
      const positions = ids.flatMap((id) => {
        const element = document.getElementById(id);
        return element
          ? [{ id, top: element.getBoundingClientRect().top }]
          : [];
      });
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      setActiveId(
        activeOutlineId(positions, { offset: ACTIVE_OFFSET, atBottom }),
      );
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // `ids` is rebuilt per render; `idKey` is the value that actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idKey]);

  return (
    <ol className="flex flex-col text-[14.5px]">
      {entries.map((entry) => {
        const isActive = entry.id === activeId;

        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'hover:text-accent block border-l-2 py-2.5 pl-3.5 transition-colors',
                isActive
                  ? 'border-accent text-ink font-medium'
                  : 'border-line text-ink-subtle',
              )}
            >
              {entry.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
