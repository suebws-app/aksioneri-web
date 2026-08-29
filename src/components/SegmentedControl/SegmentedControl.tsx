'use client';

import { cn } from '@/lib/utils/cn';

export interface SegmentedOption {
  value: string;
  label: string;
  srLabel?: string;
}

export interface SegmentedControlProps {
  name: string;
  legend: string;
  value: string;
  options: readonly SegmentedOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  name,
  legend,
  value,
  options,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <fieldset
      className={cn(
        'border-line-strong bg-surface-tint inline-flex rounded-sm border p-0.5',
        className,
      )}
    >
      <legend className="sr-only">{legend}</legend>

      {options.map((option) => {
        const id = `${name}-${option.value}`;

        return (
          <div key={option.value} className="flex">
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => {
                onChange(option.value);
              }}
              className="peer sr-only"
            />
            <label
              htmlFor={id}
              className={cn(
                'text-ink-muted flex min-h-10 cursor-pointer items-center rounded-[2px] px-3.5 font-sans text-[14px] whitespace-nowrap',
                'peer-focus-visible:outline-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1',
                'peer-checked:bg-surface peer-checked:text-ink peer-checked:font-medium peer-checked:shadow-[0_1px_2px_rgba(21,24,28,0.08)]',
              )}
            >
              {option.srLabel ? (
                <>
                  <span aria-hidden>{option.label}</span>
                  <span className="sr-only">{option.srLabel}</span>
                </>
              ) : (
                option.label
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
