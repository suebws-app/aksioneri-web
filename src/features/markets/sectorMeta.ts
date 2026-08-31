export interface SectorEtfMeta {
  symbol: string;
  key: string;
}

export const SECTOR_ETFS: readonly SectorEtfMeta[] = [
  { symbol: 'XLK', key: 'technology' },
  { symbol: 'XLF', key: 'financials' },
  { symbol: 'XLE', key: 'energy' },
  { symbol: 'XLV', key: 'healthcare' },
  { symbol: 'XLI', key: 'industrials' },
  { symbol: 'XLY', key: 'consumerDiscretionary' },
  { symbol: 'XLP', key: 'consumerStaples' },
  { symbol: 'XLB', key: 'materials' },
  { symbol: 'XLU', key: 'utilities' },
  { symbol: 'XLRE', key: 'realEstate' },
  { symbol: 'XLC', key: 'communicationServices' },
];

export interface BondMeta {
  symbol: string;
  key: string;
}

export const TREASURY_YIELDS: readonly BondMeta[] = [
  { symbol: '^IRX', key: 'year13w' },
  { symbol: '^FVX', key: 'year5' },
  { symbol: '^TNX', key: 'year10' },
  { symbol: '^TYX', key: 'year30' },
];
