'use client';

import { useTranslations } from 'next-intl';

/**
 * Where the numbers came from, and when.
 *
 * Rendered wherever a calculation uses live data, because a rate without a
 * date is not a fact — the ECB fixes once per business day, so a reader
 * opening the converter on Sunday is looking at Friday's number.
 *
 * It also says plainly that these are **reference** rates. The ECB publishes
 * them for statistical use; a bank or a bureau will quote something else, and
 * a converter that implies otherwise is setting a reader up to be surprised
 * at a counter.
 */
export function DataSource({
  date,
  source,
}: {
  date?: string | undefined;
  source?: string | undefined;
}) {
  const t = useTranslations('calculators');

  if (!date) return null;

  return (
    <p className="text-ink-faint mt-3 text-[12.5px] text-pretty">
      {t('ui.dataAsOf', { date })}
      {source ? ` · ${t(`ui.sources.${source}`)}` : ''}
    </p>
  );
}
