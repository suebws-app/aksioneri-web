import { cn } from '@/lib/utils/cn';

interface SparklineProps {
  values: number[];
  className?: string;
}

const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 200;
const PADDING = 8;

export function Sparkline({ values, className }: SparklineProps) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * VIEW_WIDTH;
    const y =
      PADDING + (1 - (value - min) / span) * (VIEW_HEIGHT - PADDING * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const line = points.join(' ');
  const area = `${line} ${VIEW_WIDTH},${VIEW_HEIGHT} 0,${VIEW_HEIGHT}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn('block w-full', className)}
    >
      <polygon points={area} fill="var(--accent)" opacity="0.07" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
