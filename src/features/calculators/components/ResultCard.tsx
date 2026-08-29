'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/Card';
import { Disclosure } from '@/components/Disclosure';
import type { Currency } from '@/lib/format/money';
import { formatFigure } from '../formatFigure';
import type { AnyCalculator, ResultSpec } from '../types';

interface ResultCardProps {
  calculator: AnyCalculator;
  spec: ResultSpec;
  currency: Currency;
}

export function ResultCard({ calculator, spec, currency }: ResultCardProps) {
  const t = useTranslations(`calculators.${calculator.messageKey}`);
  const shared = useTranslations('calculators');

  const yearsUnit = shared('units.years');

  return (
    <Card className="bg-surface-tint">
      <h2 className="text-ink-faint mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {t(`results.${spec.primary.labelKey}`)}
      </h2>

      <p className="text-ink mb-6 font-serif text-[44px] leading-none font-medium tracking-[-0.02em] sm:text-[52px]">
        {formatFigure(
          spec.primary.value,
          spec.primary.format,
          spec.primary.currency ?? currency,
          yearsUnit,
        )}
      </p>

      <dl className="border-line-soft flex flex-col gap-3 border-t pt-5">
        {spec.secondary.map((figure) => (
          <div
            key={figure.labelKey}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="text-ink-body flex items-center gap-1.5 text-[14px]">
              {t(`results.${figure.labelKey}`)}
              {figure.projected ? (
                <span
                  className="border-line-strong text-ink-faint rounded-[2px] border px-1 py-px text-[10px] tracking-[0.06em] uppercase"
                  title={shared('ui.assumptionNote')}
                >
                  {shared('ui.assumption')}
                </span>
              ) : null}
            </dt>
            <dd className="text-ink font-mono text-[15.5px] tabular-nums">
              {formatFigure(
                figure.value,
                figure.format,
                figure.currency ?? currency,
                yearsUnit,
              )}
            </dd>
          </div>
        ))}
      </dl>

      {spec.table ? (
        <div className="mt-5">
          <Disclosure summary={shared('ui.showAllRows')}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] border-collapse text-[14px]">
                <thead>
                  <tr>
                    {spec.table.columnKeys.map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="text-ink-faint border-line-soft border-b py-2 text-left text-[11px] font-semibold tracking-[0.06em] uppercase last:text-right"
                      >
                        {t(`results.columns.${key}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spec.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-line-soft text-ink-body border-b py-2 font-mono tabular-nums last:text-right"
                        >
                          {formatFigure(
                            cell.value,
                            cell.format,
                            cell.currency ?? currency,
                            yearsUnit,
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Disclosure>
        </div>
      ) : null}
    </Card>
  );
}
