import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

/**
 * The recurring section header: a serif title with an optional action or note
 * on the right, above a rule.
 *
 * The design uses two rule weights — 2px under the lead section of a page and
 * 1px under everything below it — which is what establishes the hierarchy
 * between "the main thing" and "more things".
 */
interface SectionHeadingProps {
  title: string;
  /** Renders as a link when `href` is set, otherwise as muted text. */
  action?: { label: string; href?: string };
  size?: 'lg' | 'md';
  rule?: 'strong' | 'normal';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  action,
  size = 'md',
  rule = 'normal',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-3.5',
        rule === 'strong' ? 'border-ink border-b-2' : 'border-ink border-b',
        className,
      )}
    >
      <h2
        className={cn(
          'text-ink font-serif font-medium',
          size === 'lg' ? 'text-[27px] tracking-[-0.01em]' : 'text-2xl',
        )}
      >
        {title}
      </h2>

      {children}

      {action ? (
        action.href ? (
          <Link
            href={action.href}
            className="text-accent text-[13px] hover:underline"
          >
            {action.label}
          </Link>
        ) : (
          <span className="text-ink-faint text-[13px]">{action.label}</span>
        )
      ) : null}
    </div>
  );
}
