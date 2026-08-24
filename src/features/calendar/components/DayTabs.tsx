'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/i18n/config';
import { formatDayTab } from '../formatDate';
import type { CalendarDay } from '../calendarTypes';

interface DayTabsProps {
  days: CalendarDay[];
  selectedDate: string;
  todayDate: string;
}

/**
 * The week strip.
 *
 * Each tab is a real link carrying `?date=`, so a specific day is shareable and
 * the back button works. Scrolls horizontally on narrow screens rather than
 * wrapping, which would push the region filter off the row.
 */
export function DayTabs({ days, selectedDate, todayDate }: DayTabsProps) {
  const t = useTranslations('calendar');
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('daysLabel')}
      className="relative -mb-px overflow-x-auto"
    >
      <ul className="flex items-stretch">
        {days.map((day) => {
          const isSelected = day.date === selectedDate;
          const isToday = day.date === todayDate;
          const label = formatDayTab(locale, day.date);

          return (
            <li key={day.date}>
              <Link
                href={{ pathname, query: { date: day.date } }}
                aria-current={isSelected ? 'date' : undefined}
                className={cn(
                  'block px-5 py-3 text-[15px] whitespace-nowrap',
                  isSelected
                    ? 'border-accent text-ink border-b-2 font-medium'
                    : 'text-ink-faint hover:text-ink',
                )}
              >
                {isToday ? t('todayTab', { day: label }) : label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
