import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names, resolving Tailwind conflicts so a caller-supplied
 * `className` can override a component's default (`p-2` + `p-4` → `p-4`).
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
