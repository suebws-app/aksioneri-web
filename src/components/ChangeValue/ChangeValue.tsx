import { cn } from '@/lib/utils/cn';

interface ChangeValueProps {
  percent: number;
  className?: string;
}

export function ChangeValue({ percent, className }: ChangeValueProps) {
  if (!Number.isFinite(percent)) {
    return <span className={cn('font-mono', className)}>—</span>;
  }

  const isNegative = percent < 0;
  const sign = isNegative ? '−' : '+';

  return (
    <span
      className={cn(
        'font-mono',
        isNegative ? 'text-negative' : 'text-positive',
        className,
      )}
    >
      {sign}
      {Math.abs(percent).toFixed(2)}%
    </span>
  );
}
