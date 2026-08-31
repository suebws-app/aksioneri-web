import type { Locale } from '@/i18n/config';
import { getAiSummary } from '@/lib/api/fundamentals';
import { AiSummaryLoader } from './AiSummaryLoader';
import { AiSummaryView } from './AiSummaryView';

export interface AssetSnapshotProps {
  ticker: string;
  locale: Locale;
}

export async function AssetSnapshot({ ticker, locale }: AssetSnapshotProps) {
  const summary = await getAiSummary(ticker, locale);
  if (summary) return <AiSummaryView summary={summary} />;
  return <AiSummaryLoader ticker={ticker} locale={locale} />;
}
