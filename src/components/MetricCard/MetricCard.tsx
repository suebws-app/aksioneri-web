import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface MetricCardProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function MetricCard({
  label,
  value,
  hint,
  tone = 'neutral',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'border-line-soft border-b px-5 py-4 last:border-b-0 lg:border-r lg:last:border-r-0',
        className,
      )}
    >
      <dt className="text-ink-faint text-[10.5px] font-semibold tracking-[0.09em] uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          'mt-1.5 font-mono text-[19px]',
          tone === 'positive' && 'text-positive',
          tone === 'negative' && 'text-negative',
          tone === 'neutral' && 'text-ink',
        )}
      >
        {value}
      </dd>
      {hint ? <p className="text-ink-faint mt-1 text-[12px]">{hint}</p> : null}
    </div>
  );
}
