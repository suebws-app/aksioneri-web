import type { CalculatorCategory } from './types';

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

export const readCategory = (
  params: Record<string, string | string[] | undefined>,
): CalculatorCategory | null => {
  const value = first(params[CATEGORY_PARAM]);
  return value && (CATEGORIES as readonly string[]).includes(value)
    ? (value as CalculatorCategory)
    : null;
};
