'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ChartSpec } from '../types';
import { asPercent, indexAtFraction, layoutChart } from './geometry';
import { seriesColor, seriesDash } from './PlotSvg';

/**
 * The readout layer over a chart.
 *
 * The drawing alone shows a shape; this is what lets a reader ask "what is it
 * in year twelve" and get an answer. Hovering picks the nearest period and
 * puts a marker on every series at once, so the comparison the chart exists
 * to make — what you put in against what it grew to — can be read at any
 * point rather than only at the ends.
 *
 * Wraps rather than replaces the SVG: the plot is still server-rendered and
 * still complete without JavaScript. Only the readout needs the client.
 *
 * Geometry comes from `layoutChart`, the same call the drawing uses. Working
 * it out twice is how a crosshair ends up a pixel off the line it points at.
 *
 * `aria-hidden` on the whole overlay: it duplicates the data table underneath,
 * which is the accessible route to the same numbers, and a screen reader
 * announcing a hover position it cannot control is noise.
 */

export interface HoverRow {
  idKey: string;
  label: string;
  value: number;
}

interface ChartHoverProps {
  spec: ChartSpec;
  children: ReactNode;
  /** e.g. "Viti 12". */
  formatX: (value: number) => string;
  formatValue: (value: number) => string;
  seriesLabel: (idKey: string) => string;
  /** Shown as a final row on stacked charts, where the bands sum to a total. */
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
          // The series' own value, not the stacked position — a reader asking
          // what growth was in year twelve wants the growth, not the running
          // total it happens to be drawn on top of.
          value: series.values[active] ?? 0,
        }));

  const total = rows.reduce((sum, row) => sum + row.value, 0);

  // Flip the panel to the left of the cursor past the midpoint, so it never
  // runs off the right edge.
  const flip = active !== null && active > layout.count / 2;

  const markerLeft =
    active === null
      ? 0
      : asPercent(layout.seriesPoints[0]?.[active] ?? { x: 0, y: 0 }).left;

  return (
    <div
      ref={containerRef}
      className="relative"
      // `none` so a drag across the chart reads values instead of scrolling
      // the page out from under the reader's finger.
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
          {/* Crosshair. Drawn under the markers, over the bands. */}
          <div
            className="bg-line-strong pointer-events-none absolute top-0 w-px"
            style={{ left: `${String(markerLeft)}%`, height: '84%' }}
          />

          {/* One marker per series, so both legs of the comparison are read
              at the same instant. */}
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

              {/* On a stack the bands sum to something meaningful — the
                  balance — and that total is usually what the reader came
                  for. On separate lines a sum would be nonsense. */}
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
