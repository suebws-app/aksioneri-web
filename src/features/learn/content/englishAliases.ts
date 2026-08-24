/**
 * English spellings for glossary terms, so the linker can find them in wire copy.
 *
 * The site is Albanian and the glossary is written in Albanian. The news wire
 * arrives from Investing.com in English and is served untranslated, so a
 * purely Albanian glossary matches nothing at all inside an article — the
 * first run of the auto-linker produced exactly zero links.
 *
 * Rather than leave the feature dead, terms carry their English forms as
 * aliases. A reader meeting "basis points" in an English headline gets the
 * Albanian definition on hover and a link to the Albanian lesson, which is the
 * behaviour that actually helps an Albanian speaker reading an English wire.
 *
 * If the wire is ever translated at ingest, this file stops mattering but does
 * no harm: the Albanian terms match directly and these become redundant.
 *
 * Only terms that genuinely appear in financial newswire copy are listed, and
 * only in forms that are unambiguous. Bare English words that are financial
 * only in context are deliberately absent: "compounding" linked itself inside
 * "compounding the problem", and "duration", "allocation", "hedge",
 * "listing" and "margin" would all do the same. Where the concept still
 * matters, a qualified phrase is used instead.
 */
export const ENGLISH_ALIASES: Record<string, string[]> = {
  // Instruments and ownership
  share: ['share', 'shares', 'stock', 'stocks', 'equity', 'equities'],
  shareholder: ['shareholder', 'shareholders'],
  'market-capitalisation': [
    'market cap',
    'market capitalisation',
    'market capitalization',
  ],
  bond: ['bond', 'bonds'],
  coupon: ['coupon'],
  yield: ['yield', 'yields'],
  dividend: ['dividend', 'dividends'],
  'dividend-yield': ['dividend yield'],
  'payout-ratio': ['payout ratio'],
  buyback: ['buyback', 'buybacks', 'share buyback', 'repurchase'],
  'shares-outstanding': ['shares outstanding'],
  dilution: ['dilution', 'dilutive'],
  'stock-split': ['stock split'],
  'reverse-split': ['reverse split'],
  ipo: ['ipo', 'flotation'],
  'lock-up-period': ['lock-up', 'lockup'],
  underwriter: ['underwriter', 'underwriters'],

  // Funds
  index: ['index', 'indices', 'indexes'],
  'index-fund': ['index fund', 'index funds'],
  'expense-ratio': ['expense ratio', 'ongoing charge'],
  'passive-fund': ['passive fund', 'passive funds'],
  'active-fund': ['active fund', 'active funds', 'actively managed'],
  'mutual-fund': ['mutual fund', 'mutual funds'],
  diversification: ['diversification', 'diversified'],
  'tracking-error': ['tracking error'],
  benchmark: ['benchmark', 'benchmarks'],

  // Company reporting
  revenue: ['revenue', 'revenues', 'sales'],
  'operating-margin': ['operating margin', 'operating margins'],
  'free-cash-flow': ['free cash flow', 'cash flow'],
  'earnings-per-share': ['earnings per share', 'eps'],
  'pe-ratio': ['p/e', 'pe ratio', 'price-to-earnings'],
  guidance: ['guidance', 'outlook', 'forecast'],
  'consensus-estimate': ['consensus estimate', 'analyst estimates'],
  'shareholders-equity': ['shareholders equity', 'book value'],
  leverage: ['leverage', 'leveraged'],
  'growth-stock': ['growth stock', 'growth stocks'],
  'value-stock': ['value stock', 'value stocks'],

  // Macro
  inflation: ['inflation', 'inflationary'],
  cpi: ['cpi', 'consumer price index'],
  'core-inflation': ['core inflation', 'core cpi'],
  deflation: ['deflation'],
  'policy-rate': ['policy rate', 'interest rate', 'interest rates', 'rates'],
  'basis-point': ['basis point', 'basis points', 'bps'],
  'monetary-policy': ['monetary policy'],
  'central-bank': ['central bank', 'central banks', 'the fed', 'ecb'],
  'forward-guidance': ['forward guidance'],
  'quantitative-easing': ['quantitative easing'],
  hawkish: ['hawkish', 'dovish'],
  gdp: ['gdp', 'gross domestic product'],
  'real-gdp': ['real gdp'],
  recession: ['recession', 'recessions'],
  'business-cycle': ['business cycle'],
  'soft-landing': ['soft landing'],
  'yield-curve': ['yield curve'],
  inversion: ['inverted yield curve', 'curve inversion'],
  'nonfarm-payrolls': ['nonfarm payrolls', 'payrolls'],
  'unemployment-rate': ['unemployment rate', 'unemployment'],
  'wage-growth': ['wage growth', 'wages'],
  'exchange-rate': ['exchange rate'],
  'safe-haven': ['safe haven'],
  'reserve-currency': ['reserve currency'],
  commodity: ['commodity', 'commodities'],
  'supply-shock': ['supply shock'],

  // Market mechanics
  'bid-ask-spread': ['spread', 'spreads', 'bid-ask'],
  liquidity: ['liquidity', 'liquid', 'illiquid'],
  'market-maker': ['market maker', 'market makers'],
  volatility: ['volatility', 'volatile'],
  volume: ['trading volume'],
  broker: ['broker', 'brokers', 'brokerage'],
  'limit-order': ['limit order'],
  'market-order': ['market order'],
  sector: ['sector', 'sectors'],
  'sector-rotation': ['sector rotation'],
  correlation: ['correlation', 'correlated'],
  drawdown: ['drawdown', 'drawdowns'],
  'bear-market': ['bear market'],
  'bull-market': ['bull market'],
  correction: ['market correction'],

  // Risk and cost
  portfolio: ['portfolio', 'portfolios'],
  'asset-allocation': ['asset allocation'],
  rebalancing: ['rebalancing', 'rebalance'],
  'capital-gain': ['capital gain', 'capital gains'],
  'currency-risk': ['currency risk', 'fx risk'],
  hedged: ['hedged', 'hedging'],
  'margin-call': ['margin call'],
  'counterparty-risk': ['counterparty risk'],
  compounding: ['compound interest'],
  'real-return': ['real return', 'real returns'],
};
