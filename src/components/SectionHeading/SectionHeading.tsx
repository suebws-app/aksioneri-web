import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  title: string;
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
