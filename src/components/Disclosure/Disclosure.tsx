import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  return (
    <details
      open={defaultOpen}
      className={cn('border-line group border-b', className)}
    >
      <summary
        className={cn(
          'text-ink flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-sans text-[15px] font-medium',
          'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <span className="text-pretty">{summary}</span>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          width="12"
          height="8"
          className="text-ink-faint shrink-0 transition-transform group-open:-rotate-180 motion-reduce:transition-none"
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </summary>

      <div className="text-ink-body pb-4 text-[15px] leading-[1.7] text-pretty">
        {children}
      </div>
    </details>
  );
}
