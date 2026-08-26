'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * A text input that accepts a number.
 *
 * **Not `type="number"`,** deliberately, and this is the decision most likely
 * to be "corrected" later:
 *
 * - A number input's value is the empty string for anything the browser
 *   considers invalid, so a reader mid-way through typing `1.` hands the form
 *   `''` and the result blanks out under them.
 * - Its spinners are a 16px hit target sitting on the most-used control on the
 *   page, and scroll-wheel over a focused number input silently changes it.
 * - Locale decimal separators are inconsistent: a comma is what an Albanian
 *   reader types, and `type="number"` rejects it in some browsers.
 *
 * `inputMode="decimal"` still gives phones the numeric keypad, which is the
 * only thing `type="number"` was wanted for.
 *
 * Parsing belongs to the caller: this component reports the raw string and the
 * calculator's codec decides what it means. The affixes are decoration — the
 * unit is also in the field's hint, because a `€` glyph is not announced.
 */

export interface NumericInputProps extends Omit<
  ComponentProps<'input'>,
  'type' | 'inputMode'
> {
  /** Currency symbol or similar, before the digits. */
  leading?: ReactNode;
  /** `%`, `vjet`, or similar, after the digits. */
  trailing?: ReactNode;
}

export function NumericInput({
  leading,
  trailing,
  className,
  ...props
}: NumericInputProps) {
  return (
    <div
      className={cn(
        'border-line-strong bg-surface focus-within:border-accent flex items-center rounded-sm border',
        props['aria-invalid'] ? 'border-negative' : '',
      )}
    >
      {leading ? (
        <span
          aria-hidden
          className="text-ink-faint pl-3.5 font-mono text-[15px]"
        >
          {leading}
        </span>
      ) : null}

      <input
        type="text"
        inputMode="decimal"
        // A phone keyboard's blue key should dismiss, not submit: these forms
        // recalculate as you type and have nothing to submit to.
        enterKeyHint="done"
        autoComplete="off"
        // The figures on this site are mono everywhere; an input a reader is
        // comparing against a mono result should not be proportional.
        className={cn(
          'text-ink placeholder:text-ink-ghost min-h-11 w-full bg-transparent px-3.5 py-2.5 font-mono text-[15px] outline-none',
          leading ? 'pl-2' : '',
          trailing ? 'pr-2' : '',
          className,
        )}
        {...props}
      />

      {trailing ? (
        <span
          aria-hidden
          className="text-ink-faint pr-3.5 font-mono text-[15px]"
        >
          {trailing}
        </span>
      ) : null}
    </div>
  );
}
