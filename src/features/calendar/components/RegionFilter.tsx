'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { REGION_FILTERS, type RegionFilterValue } from '../calendarTypes';

interface RegionFilterProps {
  selected: RegionFilterValue;
  selectedDate: string;
}

export function RegionFilter({ selected, selectedDate }: RegionFilterProps) {
  const t = useTranslations('calendar.regions');
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-2 overflow-x-auto pb-1 text-[13.5px]">
      {REGION_FILTERS.map((option) => {
        const isSelected = option === selected;

        return (
          <li key={option}>
            <Link
              href={{
                pathname,
                query:
                  option === 'ALL'
                    ? { date: selectedDate }
                    : { date: selectedDate, region: option },
              }}
              aria-current={isSelected ? 'true' : undefined}
              className={cn(
                'block rounded-[3px] px-3.5 py-1.5 whitespace-nowrap',
                isSelected
                  ? 'bg-ink text-paper'
                  : 'border-line-strong text-ink-muted hover:border-ink-faint border',
              )}
            >
              {t(option)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
