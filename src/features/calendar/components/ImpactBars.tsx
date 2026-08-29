import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import type { EventImpact } from '../calendarTypes';

const FILLED_BARS: Record<EventImpact, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

interface ImpactBarsProps {
  impact: EventImpact;
  size?: 'sm' | 'md';
  className?: string;
}

export function ImpactBars({
  impact,
  size = 'sm',
  className,
}: ImpactBarsProps) {
  const t = useTranslations('calendar.impact');
  const filled = FILLED_BARS[impact];

  return (
    <span
      className={cn('inline-flex gap-[2px]', className)}
      role="img"
      aria-label={t(impact)}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            size === 'sm' ? 'h-3 w-[3px]' : 'h-3.5 w-1',
            index < filled ? 'bg-impact-on' : 'bg-impact-off',
          )}
        />
      ))}
    </span>
  );
}
