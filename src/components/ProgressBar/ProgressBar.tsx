import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  className,
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('bg-line h-1 overflow-hidden rounded-full', className)}
    >
      <div className="bg-accent h-full" style={{ width: `${percent}%` }} />
    </div>
  );
}
