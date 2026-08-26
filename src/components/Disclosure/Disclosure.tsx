import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * An expandable block: a FAQ answer, "how this was calculated", a chart's data
 * table.
 *
 * Native `<details>`/`<summary>` rather than a state-driven panel, and that is
 * a correctness decision rather than a convenience one. The FAQ content on a
 * calculator page is also the content its `FAQPage` structured data claims is
 * there — if the answers only existed after a click handler ran, the markup
 * would be describing a page that does not exist for a crawler, and the
 * expandable would be broken for anyone whose JavaScript failed to load.
 *
 * `<details>` needs no JavaScript, so the answers are in the HTML, and the
 * structured data is honest.
 */
export interface DisclosureProps {
  summary: string;
  children: ReactNode;
  /** Open on first render. Use for the first FAQ entry, not for all of them. */
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
        {/* Rotates rather than swapping glyphs, so the control never reflows.
            aria-hidden: <summary> already announces its expanded state. */}
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
