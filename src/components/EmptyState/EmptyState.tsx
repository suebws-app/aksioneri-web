import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-line bg-surface rounded-sm border px-6 py-10 text-center',
        className,
      )}
    >
      <p className="text-ink font-serif text-[19px] font-medium">{title}</p>
      {description ? (
        <p className="text-ink-muted mx-auto mt-2 max-w-[52ch] text-[14.5px] leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
