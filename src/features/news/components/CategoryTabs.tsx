'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { NewsCategory } from '../newsTypes';

export type CategoryFilter = NewsCategory | 'all';

const CATEGORIES: CategoryFilter[] = [
  'all',
  'stocks',
  'europe',
  'crypto',
  'commodities',
  'economy',
  'macro',
];

/**
 * Desk filter. Links carrying `?category=`, so a filtered view is shareable and
 * survives a reload — same reasoning as the calendar's day and region controls.
 */
export function CategoryTabs({ selected }: { selected: CategoryFilter }) {
  const t = useTranslations('news');
  const pathname = usePathname();

  return (
    <nav aria-label={t('filterLabel')} className="relative overflow-x-auto">
      <ul className="border-line flex items-center gap-6.5 border-b text-[15px]">
        {CATEGORIES.map((category) => {
          const isSelected = category === selected;

          return (
            <li key={category}>
              <Link
                href={
                  category === 'all'
                    ? { pathname }
                    : { pathname, query: { category } }
                }
                aria-current={isSelected ? 'page' : undefined}
                className={cn(
                  'block pb-3 whitespace-nowrap',
                  isSelected
                    ? 'border-accent text-ink border-b-2 font-medium'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                {category === 'all'
                  ? t('filterAll')
                  : t(`categories.${category}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
