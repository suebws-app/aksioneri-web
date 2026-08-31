'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface OutlineEntry {
  id: string;
  label: string;
}

const ACTIVE_OFFSET = 96;

export const activeOutlineId = (
  positions: { id: string; top: number }[],
  { offset, atBottom }: { offset: number; atBottom: boolean },
): string | null => {
  const first = positions[0];
  if (!first) return null;
  if (atBottom) return positions[positions.length - 1]?.id ?? first.id;

  let current = first.id;
  for (const position of positions) {
    if (position.top <= offset) current = position.id;
  }
  return current;
};

export function LessonOutline({ entries }: { entries: OutlineEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  const idKey = entries.map((entry) => entry.id).join('|');

  useEffect(() => {
    if (idKey === '') return;
    const ids = idKey.split('|');

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
