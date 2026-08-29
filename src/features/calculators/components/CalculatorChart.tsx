'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { formatMoney, type Currency } from '@/lib/format/money';
import { ChartHover } from '../charts/ChartHover';
import { PlotSvg, seriesColor, seriesDash } from '../charts/PlotSvg';
import { summariseChart } from '../charts/summary';
import type { AnyCalculator, ChartSpec } from '../types';

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

      <ChartHover
        spec={spec}
        formatX={(value) => `${xLabel} ${String(value)}`}
        formatValue={(value) => formatMoney(value, currency, { decimals: 0 })}
        seriesLabel={seriesLabel}
        totalLabel={shared('ui.chartTotal')}
      >
        <PlotSvg
          spec={spec}
          formatX={(value) => String(value)}
          formatY={(value) =>
            value === 0 ? '0' : formatMoney(value, currency, { decimals: 0 })
          }
        />
      </ChartHover>

      <ul className="text-ink-body mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        {spec.series.map((series, index) => (
          <li key={series.idKey} className="flex items-center gap-2">
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
