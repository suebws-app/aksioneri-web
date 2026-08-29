import { getAssetDetail, type SupportedSymbol } from '@/lib/api/markets';
import { MarketMiniChartLive } from './MarketMiniChartLive';

interface MarketMiniChartProps {
  symbol: SupportedSymbol;
  className?: string;
}

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
