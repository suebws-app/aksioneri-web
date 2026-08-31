import { useTranslations, useLocale } from 'next-intl';
import type { AssetDetail } from '@/lib/api/markets';
import { AssetPriceLive } from './AssetPriceLive';
import { ShareButton } from './ShareButton';

export interface CompanyHeaderProps {
  asset: AssetDetail;
}

export function CompanyHeader({ asset }: CompanyHeaderProps) {
  const t = useTranslations('company.header');
  const tCategories = useTranslations('markets.categories');
  const locale = useLocale();

  const initial = firstLetter(asset.name);
  const descriptor = asset.descriptor || tCategories(asset.category);
  const marketStatusLine = buildMarketStatusLine(
    asset.marketStatus,
    asset.quotedAt,
    locale,
    t,
  );

  return (
    <header className="page-container pt-5">
      <div className="border-ink flex flex-col gap-6 border-b-2 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 items-start gap-5">
          <div className="bg-ink text-paper mt-1.5 flex size-[58px] shrink-0 items-center justify-center rounded-[12px] font-serif text-[27px]">
            {initial}
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="text-accent rounded-xs border border-[#c7d3e2] px-1.5 py-0.5 font-mono text-[11px] tracking-[0.06em]">
                {asset.ticker}
              </span>
              <span className="text-ink-faint text-[13px]">{descriptor}</span>
            </div>

            <h1 className="text-ink mb-3 font-serif text-[40px] leading-[1.06] font-medium tracking-[-0.022em]">
              {asset.name}
            </h1>

            <AssetPriceLive
              symbol={asset.symbol}
              initialPrice={asset.price}
              initialChangePercent={asset.changePercent}
              initialChangeAbsolute={asset.changeAbsolute}
            />

            {marketStatusLine ? (
              <div className="text-ink-faint mt-2.5 flex items-center gap-2.5 text-[13px]">
                <span
                  aria-hidden
                  className={dotColorClass(asset.marketStatus)}
                />
                <span>{marketStatusLine}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex gap-2.5 pt-1 lg:pt-2">
          <ShareButton title={asset.name} />
        </div>
      </div>
    </header>
  );
}

function firstLetter(name: string): string {
  const match = name.match(/[A-Za-z0-9]/);
  return (match?.[0] ?? '?').toUpperCase();
}

function dotColorClass(status?: string): string {
  const base = 'inline-block size-[7px] rounded-full';
  if (status === 'open') return `${base} bg-positive`;
  if (status === 'closed') return `${base} bg-negative`;
  return `${base} bg-ink-faint`;
}

function buildMarketStatusLine(
  status: string | undefined,
  quotedAt: string | null | undefined,
  locale: string,
  t: (key: string) => string,
): string | null {
  if (!status && !quotedAt) return null;
  const statusLabel =
    status === 'open'
      ? t('marketStatus.open')
      : status === 'closed'
        ? t('marketStatus.closed')
        : t('marketStatus.unknown');

  const parts = [statusLabel];
  if (quotedAt) {
    try {
      const formatted = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(quotedAt));
      parts.push(formatted);
    } catch {
      parts.push(quotedAt);
    }
  }
  parts.push(t('marketStatus.delayNote'));
  return parts.join(' · ');
}
