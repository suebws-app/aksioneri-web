import { useTranslations } from 'next-intl';
import type { StatementResponse } from '@/lib/api/fundamentals';
import {
  formatEndDate,
  formatFinancialValue,
  formatFiscalPeriod,
} from '@/lib/format/financials';
import { cn } from '@/lib/utils/cn';

export interface FinancialTableProps {
  statement: StatementResponse;
  locale: string;
  caption?: string;
  rowLabelNamespace?: string;
}

const SUBTOTAL_KEYS = new Set([
  'revenue',
  'grossProfit',
  'operatingIncome',
  'pretaxIncome',
  'netIncome',
  'totalAssets',
  'currentAssets',
  'totalLiabilities',
  'currentLiabilities',
  'shareholdersEquity',
  'operatingCashFlow',
  'investingCashFlow',
  'financingCashFlow',
  'freeCashFlow',
]);

function formatCell(
  value: number | null,
  unit: string,
  locale: string,
): string {
  const formatted = formatFinancialValue(value, unit, locale);
  if (value !== null && value < 0) {
    return `(${formatted.replace(/^-/, '')})`;
  }
  return formatted;
}

export function FinancialTable({
  statement,
  locale,
  caption,
  rowLabelNamespace = 'company.financials.row',
}: FinancialTableProps) {
  const tRow = useTranslations(rowLabelNamespace);

  const rowKeys = statement.periods[0]?.items.map((item) => item.key) ?? [];

  const byPeriod = statement.periods.map((period) => ({
    period,
    byKey: new Map(period.items.map((item) => [item.key, item])),
  }));

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-[14px]">
        {caption ? <caption className="sr-only">{caption}</caption> : null}

        <thead>
          <tr className="border-line-soft border-b bg-white">
            <th
              scope="col"
              className="text-ink-faint border-line-soft sticky left-0 z-10 min-w-[300px] border-r bg-white px-6 py-3.5 text-left text-[11px] font-semibold tracking-[0.1em] uppercase"
            >
              {tRow('breakdown')}
            </th>
            {statement.periods.map((period) => (
              <th
                key={`${period.fiscalYear}-${period.fiscalPeriod}`}
                scope="col"
                className="text-ink-muted px-6 py-3.5 text-right font-mono text-[12.5px] whitespace-nowrap"
              >
                <div>
                  {formatFiscalPeriod(period.fiscalYear, period.fiscalPeriod)}
                </div>
                <div className="text-ink-faint mt-0.5 text-[10.5px]">
                  {formatEndDate(period.endDate, locale)}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rowKeys.map((key) => {
            const isSubtotal = SUBTOTAL_KEYS.has(key);
            const rowBg = isSubtotal ? 'bg-surface-tint' : 'bg-white';
            return (
              <tr
                key={key}
                className={cn(
                  'border-line-soft border-b transition-colors last:border-b-0 hover:bg-[#F5F8FC]',
                  rowBg,
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    'text-ink border-line-soft sticky left-0 z-10 min-w-[300px] border-r px-6 py-3.5 text-left text-[14.5px] whitespace-nowrap',
                    rowBg,
                    isSubtotal ? 'font-semibold' : 'font-normal',
                  )}
                >
                  {tRow(key)}
                </th>
                {byPeriod.map(({ period, byKey }) => {
                  const item = byKey.get(key);
                  if (!item) {
                    return (
                      <td
                        key={`${period.fiscalYear}-${period.fiscalPeriod}`}
                        className="text-ink-faint px-6 py-3.5 text-right font-mono text-[14px] whitespace-nowrap tabular-nums"
                      >
                        —
                      </td>
                    );
                  }
                  const value = item.value;
                  const unit = item.unit ?? 'USD';
                  return (
                    <td
                      key={`${period.fiscalYear}-${period.fiscalPeriod}`}
                      className={cn(
                        'px-6 py-3.5 text-right font-mono text-[14px] whitespace-nowrap tabular-nums',
                        value !== null && value < 0
                          ? 'text-negative'
                          : 'text-ink',
                      )}
                    >
                      {formatCell(value, unit, locale)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
