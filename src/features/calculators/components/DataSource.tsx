'use client';

import { useTranslations } from 'next-intl';

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
