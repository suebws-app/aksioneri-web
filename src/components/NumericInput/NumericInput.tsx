'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface NumericInputProps extends Omit<
  ComponentProps<'input'>,
  'type' | 'inputMode'
> {
  leading?: ReactNode;
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
        enterKeyHint="done"
        autoComplete="off"
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
