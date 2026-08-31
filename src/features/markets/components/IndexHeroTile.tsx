import { getAssetDetail } from '@/lib/api/markets';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { toMarketPath } from '@/lib/utils/marketPath';
import { formatSignedPercent } from '@/lib/format/percent';

export interface IndexHeroTileProps {
  symbol: string;
  name: string;
  tickerLabel: string;
}

const SPARKLINE_WIDTH = 200;
const SPARKLINE_HEIGHT = 44;

function sparklinePoints(series: readonly number[]): string {
  if (series.length < 2) return '';
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * SPARKLINE_WIDTH;
      const y = SPARKLINE_HEIGHT - ((value - min) / range) * SPARKLINE_HEIGHT;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export async function IndexHeroTile({
  symbol,
  name,
  tickerLabel,
}: IndexHeroTileProps) {
  const asset = await getAssetDetail(symbol);

  if (!asset) {
    return (
      <div className="border-line bg-surface flex h-[168px] flex-col justify-between rounded-md border p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-ink text-[14.5px] font-medium">{name}</span>
          <span className="text-ink-faint font-mono text-[11px]">
            {tickerLabel}
          </span>
        </div>
        <span className="text-ink-faint font-mono text-[14px]">—</span>
      </div>
    );
  }

  const isPositive = asset.changePercent >= 0;
  const toneClass = isPositive ? 'text-positive' : 'text-negative';
  const strokeColor = isPositive ? 'var(--positive)' : 'var(--negative)';
  const points = sparklinePoints(asset.series);
  const changePercentText = formatSignedPercent(asset.changePercent);

  return (
    <Link
      href={toMarketPath(symbol)}
      className="border-line hover:border-accent bg-surface block rounded-md border p-5 pb-4 transition-colors"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-ink text-[14.5px] font-medium">{name}</span>
        <span className="text-ink-faint font-mono text-[11px]">
          {tickerLabel}
        </span>
      </div>
      <div className="text-ink mb-1.5 font-mono text-[25px] leading-tight tracking-[-0.01em]">
        {asset.price}
      </div>
      <div className={cn('mb-3 font-mono text-[13.5px]', toneClass)}>
        {asset.changeAbsolute} ({changePercentText})
      </div>
      <svg
        viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
        preserveAspectRatio="none"
        className="block h-10 w-full"
        aria-hidden
      >
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Link>
  );
}
