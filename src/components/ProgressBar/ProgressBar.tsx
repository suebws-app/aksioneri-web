import { cn } from '@/lib/utils/cn';

/**
 * An accessible progress bar.
 *
 * Extracted from the lesson page, which had the only correct implementation in
 * the codebase. Two different things use it now — position within a topic, and
 * how many lessons a reader has finished — so it takes a label rather than
 * assuming either.
 */
interface ProgressBarProps {
  value: number;
  max: number;
  /** Describes what is being measured, for screen readers. */
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
