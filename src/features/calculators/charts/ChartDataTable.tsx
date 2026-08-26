import { Disclosure } from '@/components/Disclosure';
import type { ChartSpec } from '../types';

/**
 * Every number in the chart, as text.
 *
 * Three jobs at once, which is why it is not optional: it is the accessible
 * alternative for anyone who cannot use the picture, it is the fallback when
 * a reader wants the exact figure the axis rounded away, and it puts the
 * series into the HTML where a crawler can read them.
 *
 * Inside a `<details>`, so it costs no vertical space until asked for and
 * still exists with JavaScript off.
 */
export function ChartDataTable({
  spec,
  summary,
  columnLabel,
  seriesLabel,
  formatValue,
  formatX,
}: {
  spec: ChartSpec;
  summary: string;
  columnLabel: string;
  seriesLabel: (idKey: string) => string;
  formatValue: (value: number) => string;
  formatX: (value: number) => string;
}) {
  return (
    <Disclosure summary={summary}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[380px] border-collapse text-[13.5px]">
          <thead>
            <tr>
              <th
                scope="col"
                className="text-ink-faint border-line-soft border-b py-2 text-left text-[11px] font-semibold tracking-[0.06em] uppercase"
              >
                {columnLabel}
              </th>
              {spec.series.map((series) => (
                <th
                  key={series.idKey}
                  scope="col"
                  className="text-ink-faint border-line-soft border-b py-2 text-right text-[11px] font-semibold tracking-[0.06em] uppercase"
                >
                  {seriesLabel(series.idKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.x.map((x, index) => (
              <tr key={x}>
                <th
                  scope="row"
                  className="border-line-soft text-ink-body border-b py-1.5 text-left font-mono font-normal tabular-nums"
                >
                  {formatX(x)}
                </th>
                {spec.series.map((series) => (
                  <td
                    key={series.idKey}
                    className="border-line-soft text-ink-body border-b py-1.5 text-right font-mono tabular-nums"
                  >
                    {formatValue(series.values[index] ?? 0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Disclosure>
  );
}
