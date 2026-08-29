'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ChartSpec } from '../types';
import { asPercent, indexAtFraction, layoutChart } from './geometry';
import { seriesColor, seriesDash } from './PlotSvg';

export interface HoverRow {
  idKey: string;
  label: string;
  value: number;
}

interface ChartHoverProps {
  spec: ChartSpec;
  children: ReactNode;
  formatX: (value: number) => string;
  formatValue: (value: number) => string;
  seriesLabel: (idKey: string) => string;
  totalLabel?: string;
}

export function ChartHover({
  spec,
  children,
  formatX,
  formatValue,
  seriesLabel,
  totalLabel,
}: ChartHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const layout = layoutChart(spec);

  const handleMove = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;

      setActive(
        indexAtFraction((clientX - rect.left) / rect.width, layout.count),
      );
    },
    [layout.count],
  );

  const rows: HoverRow[] =
    active === null
      ? []
      : spec.series.map((series) => ({
          idKey: series.idKey,
          label: seriesLabel(series.idKey),
          value: series.values[active] ?? 0,
        }));

  const total = rows.reduce((sum, row) => sum + row.value, 0);

  const flip = active !== null && active > layout.count / 2;

  const markerLeft =
    active === null
      ? 0
      : asPercent(layout.seriesPoints[0]?.[active] ?? { x: 0, y: 0 }).left;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ touchAction: 'none' }}
      onPointerMove={(event) => {
        handleMove(event.clientX);
      }}
      onPointerDown={(event) => {
        handleMove(event.clientX);
      }}
      onPointerLeave={() => {
        setActive(null);
      }}
    >
      {children}

      {active !== null ? (
        <div aria-hidden>
          <div
            className="bg-line-strong pointer-events-none absolute top-0 w-px"
            style={{ left: `${String(markerLeft)}%`, height: '84%' }}
          />

          {layout.seriesPoints.map((points, index) => {
            const point = points[active];
            if (!point) return null;
            const { left, top } = asPercent(point);

            return (
              <span
                key={spec.series[index]?.idKey ?? index}
                className="pointer-events-none absolute block rounded-full"
                style={{
                  left: `${String(left)}%`,
                  top: `${String(top)}%`,
                  width: 9,
                  height: 9,
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--surface)',
                  border: `2px solid ${seriesColor(index)}`,
                }}
              />
            );
          })}

          <div
            role="tooltip"
            className={cn(
              'border-line-strong bg-surface pointer-events-none absolute top-2 z-10 rounded-sm border px-3 py-2 shadow-[0_2px_10px_rgba(21,24,28,0.10)]',
              flip ? '-translate-x-full' : '',
            )}
            style={{
              left: `${String(markerLeft)}%`,
              marginLeft: flip ? -12 : 12,
              minWidth: 168,
            }}
          >
            <p className="text-ink mb-1.5 font-sans text-[12px] font-semibold">
              {formatX(spec.x[active] ?? 0)}
            </p>

            <ul className="flex flex-col gap-1">
              {rows.map((row, index) => (
                <li
                  key={row.idKey}
                  className="flex items-center justify-between gap-4 text-[12.5px]"
                >
                  <span className="text-ink-body flex items-center gap-1.5">
                    <svg aria-hidden viewBox="0 0 14 4" width="14" height="4">
                      <line
                        x1="0"
                        y1="2"
                        x2="14"
                        y2="2"
                        stroke={seriesColor(index)}
                        strokeWidth="3"
                        strokeDasharray={seriesDash(index)}
                      />
                    </svg>
                    {row.label}
                  </span>
                  <span className="text-ink font-mono tabular-nums">
                    {formatValue(row.value)}
                  </span>
                </li>
              ))}

              {layout.stacked && totalLabel && rows.length > 1 ? (
                <li className="border-line-soft mt-0.5 flex items-center justify-between gap-4 border-t pt-1 text-[12.5px]">
                  <span className="text-ink-body font-medium">
                    {totalLabel}
                  </span>
                  <span className="text-ink font-mono font-medium tabular-nums">
                    {formatValue(total)}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
