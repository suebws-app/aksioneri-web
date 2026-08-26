'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { formatMoney, type Currency } from '@/lib/format/money';
import { ChartHover } from '../charts/ChartHover';
import { PlotSvg, seriesColor, seriesDash } from '../charts/PlotSvg';
import { summariseChart } from '../charts/summary';
import type { AnyCalculator, ChartSpec } from '../types';

/**
 * A chart, with the three things that make it usable rather than decorative:
 * a stated finding for screen readers, a legend that repeats the dash pattern
 * as well as the colour, and the underlying numbers as text.
 *
 * `role="img"` on the figure with `aria-labelledby`/`aria-describedby`: the
 * SVG itself is hidden, because a path element read aloud is noise. What a
 * screen-reader user gets instead is the summary sentence — the same finding
 * a sighted reader takes from the picture.
 *
 * The chart carried its own data table until it turned out to be the same
 * numbers as the result card's "every year" table a few hundred pixels
 * above. Two disclosures of identical figures is not thoroughness, it is
 * clutter — and the reader has to open one to discover it duplicates the
 * other. The result card's table is the text equivalent for both.
 *
 * No animation. Not "animation that respects reduced motion" — none at all. A
 * projection redrawing on every keystroke would either flicker or lag, and
 * neither helps anyone read it.
 */
export function CalculatorChart({
  calculator,
  spec,
  currency,
}: {
  calculator: AnyCalculator;
  spec: ChartSpec;
  currency: Currency;
}) {
  const t = useTranslations(`calculators.${calculator.messageKey}`);
  const shared = useTranslations('calculators');

  const id = useId();
  const titleId = `${id}-title`;
  const summaryId = `${id}-summary`;

  const heading = t('chart.heading');
  const xLabel = t(spec.xLabelKey);
  const seriesLabel = (idKey: string) => t(idKey);

  const summary = summariseChart(spec, {
    intro: `${heading}.`,
    seriesLabel,
    // The spoken summary gives full figures; only the axis is abbreviated,
    // because there a label has to fit between its neighbours.
    formatValue: (value) => formatMoney(value, currency, { decimals: 0 }),
    xLabel,
    endLabel: shared('ui.chartEnd'),
  });

  return (
    <figure
      role="img"
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      className="mt-8"
    >
      <figcaption
        id={titleId}
        className="text-ink-faint mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase"
      >
        {heading}
      </figcaption>

      <p id={summaryId} className="sr-only">
        {summary}
      </p>

      {/* The drawing is server-rendered; only the readout needs the client,
          so a chart still arrives complete with JavaScript disabled. */}
      <ChartHover
        spec={spec}
        formatX={(value) => `${xLabel} ${String(value)}`}
        // Full figures in the readout — this is where a reader comes for the
        // exact number, unlike the axis where labels must not collide.
        formatValue={(value) => formatMoney(value, currency, { decimals: 0 })}
        seriesLabel={seriesLabel}
        totalLabel={shared('ui.chartTotal')}
      >
        <PlotSvg
          spec={spec}
          formatX={(value) => String(value)}
          // Whole figures, grouped: "350.000 €", not "350 mijë €". The gutter
          // is wide enough, and an abbreviated axis asks the reader to do a
          // conversion in their head before they can read their own money.
          formatY={(value) =>
            value === 0 ? '0' : formatMoney(value, currency, { decimals: 0 })
          }
        />
      </ChartHover>

      <ul className="text-ink-body mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        {spec.series.map((series, index) => (
          <li key={series.idKey} className="flex items-center gap-2">
            {/* The swatch carries the dash pattern too, so the legend is
                legible without relying on hue. */}
            <svg aria-hidden viewBox="0 0 22 6" width="22" height="6">
              <line
                x1="0"
                y1="3"
                x2="22"
                y2="3"
                stroke={seriesColor(index)}
                strokeWidth="3"
                strokeDasharray={seriesDash(index)}
              />
            </svg>
            {seriesLabel(series.idKey)}
          </li>
        ))}
      </ul>
    </figure>
  );
}
