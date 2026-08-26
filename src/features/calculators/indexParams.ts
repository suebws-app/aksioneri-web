import type { CalculatorCategory } from './types';

/**
 * The landing page's query parameter, in one place.
 *
 * Modelled on `src/features/search/searchParams.ts`: the filter links and the
 * page that reads them are named from the same constant, because two string
 * literals in two files drift the moment either moves.
 */

export const CATEGORY_PARAM = 'category';
const CATEGORIES: readonly CalculatorCategory[] = [
  'investing',
  'markets',
  'personal-finance',
  'borrowing',
  'retirement',
  'economy',
  'currency',
];

export const ALL_CATEGORIES = CATEGORIES;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** The requested category, or null for "everything" — never a 404. */
export const readCategory = (
  params: Record<string, string | string[] | undefined>,
): CalculatorCategory | null => {
  const value = first(params[CATEGORY_PARAM]);
  return value && (CATEGORIES as readonly string[]).includes(value)
    ? (value as CalculatorCategory)
    : null;
};
