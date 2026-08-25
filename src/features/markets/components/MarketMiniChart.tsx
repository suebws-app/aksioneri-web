import { getAssetDetail, type SupportedSymbol } from '@/lib/api/markets';
import { MarketMiniChartLive } from './MarketMiniChartLive';

interface MarketMiniChartProps {
  symbol: SupportedSymbol;
  className?: string;
}

/**
 * Lead index with its intraday line, in the homepage sidebar.
 *
 * Renders the initial snapshot server-side; the client child polls for
 * updates and refreshes the sparkline. Nothing draws if the backend is cold
 * and returns no series — an empty box would be worse than the absence.
 */
export async function MarketMiniChart({
  symbol,
  className,
}: MarketMiniChartProps) {
  const asset = await getAssetDetail(symbol);
  if (!asset) return null;
  return (
    <MarketMiniChartLive
      symbol={symbol}
      initial={asset}
      className={className}
    />
  );
}
