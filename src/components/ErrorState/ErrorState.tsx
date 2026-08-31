import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ErrorStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title,
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'border-negative/40 bg-negative/5 rounded-sm border px-6 py-8 text-center',
        className,
      )}
    >
      <p className="text-negative font-serif text-[19px] font-medium">
        {title}
      </p>
      {description ? (
        <p className="text-ink-muted mx-auto mt-2 max-w-[52ch] text-[14.5px] leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
