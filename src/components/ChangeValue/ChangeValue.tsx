import { cn } from '@/lib/utils/cn';

/**
 * A signed price change, coloured by direction.
 *
 * Colour alone must not carry the meaning, so the sign stays in the text: a
 * reader who cannot distinguish the green from the red still sees `+` or `−`.
 * The minus is U+2212, not a hyphen — it aligns with digits in Plex Mono.
 */
interface ChangeValueProps {
  /** Percentage change. `1.14` renders as `+1.14%`. */
  percent: number;
  className?: string;
}

export function ChangeValue({ percent, className }: ChangeValueProps) {
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
