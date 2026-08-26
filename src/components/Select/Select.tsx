'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * A native `<select>`.
 *
 * Native rather than a custom listbox: the platform control already has
 * keyboard support, type-ahead, screen-reader semantics and a phone picker
 * that a hand-built menu spends a thousand lines approximating badly. The
 * repo has no Radix and no headless-UI dependency, and a compounding-frequency
 * dropdown is not the reason to add one.
 *
 * Only the chevron is drawn — `appearance-none` removes the platform arrow so
 * the control matches the inputs beside it, and the replacement is
 * `aria-hidden` because the select already announces itself as a combobox.
 */

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  ComponentProps<'select'>,
  'children'
> {
  options: readonly SelectOption[];
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          'border-line-strong bg-surface text-ink focus:border-accent min-h-11 w-full appearance-none rounded-sm border py-2.5 pr-10 pl-3.5 font-sans text-[15px] outline-none',
          props['aria-invalid'] ? 'border-negative' : '',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <svg
        aria-hidden
        viewBox="0 0 12 8"
        width="12"
        height="8"
        className="text-ink-faint pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
      >
        <path
          d="M1 1.5 6 6.5 11 1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
