'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InteractiveSparklineProps {
  values: number[];
  times?: number[];
  formatValue?: (value: number) => string;
  formatTime?: (unixMs: number) => string;
  className?: string;
}

const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 200;
const PADDING = 8;

export function InteractiveSparkline({
  values,
  times,
  formatValue = defaultFormat,
  formatTime = defaultFormatTime,
  className,
}: InteractiveSparklineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { line, area, min, span } = useMemo(() => {
    const mn = values.length ? Math.min(...values) : 0;
    const mx = values.length ? Math.max(...values) : 0;
    const sp = mx - mn || 1;
    const pts = values.map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * VIEW_WIDTH;
      const y = PADDING + (1 - (value - mn) / sp) * (VIEW_HEIGHT - PADDING * 2);
      return { x, y };
    });
    const lineStr = pts
      .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ');
    const areaStr = `${lineStr} ${VIEW_WIDTH},${VIEW_HEIGHT} 0,${VIEW_HEIGHT}`;
    return { line: lineStr, area: areaStr, min: mn, span: sp };
  }, [values]);

  if (values.length < 2) return null;

  const hover =
    hoverIndex !== null
      ? {
          index: hoverIndex,
          value: values[hoverIndex] as number,
          x: (hoverIndex / (values.length - 1)) * VIEW_WIDTH,
          y:
            PADDING +
            (1 - ((values[hoverIndex] as number) - min) / span) *
              (VIEW_HEIGHT - PADDING * 2),
        }
      : null;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1,
    );
    const idx = Math.round(ratio * (values.length - 1));
    if (idx !== hoverIndex) setHoverIndex(idx);
  };

  const onLeave = () => setHoverIndex(null);

  const tooltipOnRight = hover ? hover.x / VIEW_WIDTH < 0.5 : true;

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('relative', className)}
      style={{ touchAction: 'none' }}
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden
        className="block h-full w-full"
      >
        <polygon points={area} fill="var(--accent)" opacity="0.07" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        {hover ? (
          <g>
            <line
              x1={hover.x}
              y1={0}
              x2={hover.x}
              y2={VIEW_HEIGHT}
              stroke="var(--ink-faint, currentColor)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.35"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={hover.x}
              cy={hover.y}
              r={4}
              fill="var(--paper, white)"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ) : null}
      </svg>

      {hover ? (
        <div
          className={cn(
            'border-line-strong bg-paper text-ink pointer-events-none absolute top-2 z-10 min-w-[110px] rounded border px-2.5 py-1.5 shadow-sm',
            tooltipOnRight ? 'left-2' : 'right-2',
          )}
          role="tooltip"
        >
          <div className="font-mono text-[13px] leading-tight">
            {formatValue(hover.value)}
          </div>
          {times && times[hover.index] !== undefined ? (
            <div className="text-ink-faint mt-0.5 font-mono text-[10.5px] leading-tight">
              {formatTime(times[hover.index] as number)}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function defaultFormat(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function defaultFormatTime(unixMs: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(unixMs);
}
