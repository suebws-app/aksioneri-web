import type { Locale } from '@/i18n/config';
import type {
  AssetDetail,
  Holding,
  Localized,
  SectorMove,
} from './marketsTypes';
import { getQuote } from './marketsData';

/**
 * Instrument pages.
 *
 * Each instrument is declared once with locale-keyed strings, the same shape
 * `newsData` and `learnData` use. Anything not written yet falls back to a page
 * built from the quote, so every link from the ticker strip resolves.
 */

interface SeedAsset {
  symbol: string;
  ticker: string;
  name: string;
  price: string;
  changePercent: number;
  changeAbsolute: string;
  series: number[];
  sessionTimes: string[];
  descriptor: Localized<string>;
  category: Localized<string>;
  statusLine: Localized<string>;
  statistics: Localized<
    { label: string; value: string; tone?: 'positive' | 'negative' }[]
  >;
  explainer?: Localized<{
    heading: string;
    paragraphs: string[];
    callout: {
      heading: string;
      body: string;
      lessonSlug: string;
      linkLabel: string;
    };
  }>;
  holdings?: Holding[];
  sectors?: Localized<SectorMove[]>;
  eventSlugs?: string[];
  lessonSlugs?: string[];
  articleSlugs?: string[];
}

/** Intraday shapes. Each rises or falls to match its quoted day move. */
const SERIES = {
  rising: [
    6369, 6360, 6366, 6351, 6357, 6345, 6353, 6363, 6356, 6370, 6379, 6372,
    6386, 6379, 6392, 6385, 6400, 6408, 6402, 6414, 6407, 6421, 6428, 6419,
    6431, 6438, 6429, 6444, 6435, 6450, 6459, 6451, 6464, 6456, 6470, 6477,
    6468, 6483, 6474, 6488, 6495,
  ],
  climbing: [
    21140, 21118, 21160, 21132, 21178, 21150, 21196, 21170, 21214, 21188, 21232,
    21206, 21250, 21224, 21268, 21242, 21286, 21260, 21304, 21278, 21322, 21296,
    21340, 21314, 21358, 21332, 21376, 21350, 21394, 21368, 21412, 21386, 21430,
    21404, 21448, 21422, 21466, 21440, 21484, 21458, 21502,
  ],
  drifting: [
    44780, 44810, 44786, 44822, 44798, 44836, 44812, 44850, 44826, 44864, 44840,
    44878, 44854, 44892, 44868, 44906, 44882, 44920, 44896, 44934, 44910, 44948,
    44924, 44962, 44938, 44976, 44952, 44990, 44966, 45004, 44980, 45018, 44994,
    45032, 45008, 45046, 45022, 45060, 45036, 45074, 45050,
  ],
  falling: [
    99720, 99640, 99680, 99560, 99600, 99480, 99520, 99400, 99440, 99320, 99360,
    99240, 99280, 99160, 99200, 99080, 99120, 99000, 99040, 98920, 98960, 98840,
    98880, 98760, 98800, 98680, 98720, 98600, 98640, 98520, 98560, 98440, 98480,
    98360, 98400, 98280, 98320, 98200, 98240, 98180, 98240,
  ],
} as const;

const SESSION_US = ['09:30', '11:00', '12:30', '14:00', '15:30', '16:00'];
const SESSION_EU = ['09:00', '10:30', '12:00', '13:30', '15:00', '17:30'];
const SESSION_24H = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

const ASSETS: SeedAsset[] = [
  {
    symbol: 'sp-500',
    ticker: 'SPX',
    name: 'S&P 500',
    price: '6,421.20',
    changePercent: 0.82,
    changeAbsolute: '+52.10',
    series: [...SERIES.rising],
    sessionTimes: SESSION_US,
    descriptor: {
      sq: 'SHBA · indeks · 500 kompani',
      en: 'US · index · 500 companies',
    },
    category: { sq: 'Indekset', en: 'Indices' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
      en: 'Closed · 21 Aug 2026, 16:00 ET · delayed 15 min',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '6,372.40' },
        { label: 'Diapazoni ditor', value: '6,361 – 6,428' },
        { label: 'Mbyllja e mëparshme', value: '6,369.10' },
        { label: 'Diapazoni 52-javor', value: '5,104 – 6,428' },
        { label: 'Nga fillimi i vitit', value: '+11.4%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+82.6%', tone: 'positive' },
      ],
      en: [
        { label: 'Open', value: '6,372.40' },
        { label: 'Day range', value: '6,361 – 6,428' },
        { label: 'Previous close', value: '6,369.10' },
        { label: '52-week range', value: '5,104 – 6,428' },
        { label: 'Year to date', value: '+11.4%', tone: 'positive' },
        { label: '5-year return', value: '+82.6%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Çfarë është në të vërtetë S&P 500',
        paragraphs: [
          'Është një listë me rreth 500 nga kompanitë më të mëdha të listuara në Shtetet e Bashkuara, të kombinuara në një shifër të vetme. Kur njerëzit thonë “tregu amerikan u ngrit sot”, zakonisht kjo është shifra që kanë parasysh.',
          'Kompanitë më të mëdha peshojnë më shumë. Apple dhe NVIDIA kanë secila peshë më të madhe se një firmë e mesme, ndaj lëvizjet e tyre kanë më shumë rëndësi për indeksin sesa do të sugjeronte numri i punonjësve.',
        ],
        callout: {
          heading: 'Nuk mund të blini një indeks',
          body: 'Një indeks është matje, jo produkt. Për ta zotëruar, blini një fond që e ndjek atë — dhe pikërisht këtë bën një ETF.',
          lessonSlug: 'what-is-an-etf',
          linkLabel: 'Lexo mësimin 5-minutësh →',
        },
      },
      en: {
        heading: 'What the S&P 500 actually is',
        paragraphs: [
          'It is a list of roughly 500 of the largest companies listed in the United States, combined into a single number. When people say “the US market was up today”, this is usually the number they mean.',
          'Bigger companies count for more. Apple and NVIDIA each carry more weight than a mid-sized firm, so their moves matter more to the index than their headcount would suggest.',
        ],
        callout: {
          heading: 'You cannot buy an index',
          body: 'An index is a measurement, not a product. To own it you buy a fund that tracks it — which is what an ETF does.',
          lessonSlug: 'what-is-an-etf',
          linkLabel: 'Read the 5-minute lesson →',
        },
      },
    },
    holdings: [
      { name: 'Apple', weight: 7.1, changePercent: 1.2 },
      { name: 'NVIDIA', weight: 6.5, changePercent: 4.8 },
      { name: 'Microsoft', weight: 6.2, changePercent: 0.9 },
      { name: 'Amazon', weight: 3.9, changePercent: 1.5 },
      { name: 'Meta', weight: 2.6, changePercent: -0.4 },
    ],
    sectors: {
      sq: [
        { name: 'Teknologjia', changePercent: 1.9 },
        { name: 'Financat', changePercent: 0.7 },
        { name: 'Kujdesi shëndetësor', changePercent: 0.2 },
        { name: 'Mallrat bazë', changePercent: -0.3 },
        { name: 'Shërbimet publike', changePercent: -0.6 },
      ],
      en: [
        { name: 'Technology', changePercent: 1.9 },
        { name: 'Financials', changePercent: 0.7 },
        { name: 'Health care', changePercent: 0.2 },
        { name: 'Consumer staples', changePercent: -0.3 },
        { name: 'Utilities', changePercent: -0.6 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'ecb-interest-rate-decision'],
    lessonSlugs: [
      'index-funds-vs-stock-picking',
      'risk-and-return',
      'fees-that-change-everything',
    ],
    articleSlugs: [
      'markets-rally-as-investors-read-new-fed-signals',
      'nvidia-shares-rise-after-earnings',
      'us-retail-sales-beat-forecasts',
    ],
  },
  {
    symbol: 'nasdaq-100',
    ticker: 'NDX',
    name: 'Nasdaq 100',
    price: '21,384.50',
    changePercent: 1.14,
    changeAbsolute: '+241.30',
    series: [...SERIES.climbing],
    sessionTimes: SESSION_US,
    descriptor: {
      sq: 'SHBA · indeks · 100 kompani jofinanciare',
      en: 'US · index · 100 non-financial companies',
    },
    category: { sq: 'Indekset', en: 'Indices' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
      en: 'Closed · 21 Aug 2026, 16:00 ET · delayed 15 min',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '21,150.20' },
        { label: 'Diapazoni ditor', value: '21,118 – 21,502' },
        { label: 'Mbyllja e mëparshme', value: '21,143.20' },
        { label: 'Diapazoni 52-javor', value: '16,240 – 21,502' },
        { label: 'Nga fillimi i vitit', value: '+18.2%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+141.3%', tone: 'positive' },
      ],
      en: [
        { label: 'Open', value: '21,150.20' },
        { label: 'Day range', value: '21,118 – 21,502' },
        { label: 'Previous close', value: '21,143.20' },
        { label: '52-week range', value: '16,240 – 21,502' },
        { label: 'Year to date', value: '+18.2%', tone: 'positive' },
        { label: '5-year return', value: '+141.3%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Pse Nasdaq-u lëviz më shumë se S&P-ja',
        paragraphs: [
          'Nasdaq 100 përjashton kompanitë financiare dhe është i mbushur me teknologji. Kjo do të thotë se është shumë më i përqendruar: dhjetë emrat kryesorë përbëjnë gati gjysmën e indeksit.',
          'Ky përqendrim shpjegon pse ai rritet më shpejt se S&P 500 në vitet e mira dhe bie më fort në ato të këqijat. Nuk është një treg më i rrezikshëm — është i njëjti treg, i marrë më i koncentruar.',
        ],
        callout: {
          heading: 'Përqendrimi është vetë rreziku',
          body: 'Zotërimi i Nasdaq-ut dhe i disa aksioneve teknologjike shpesh do të thotë ta zotëroni të njëjtën gjë dy herë.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Lexo mësimin për diversifikimin →',
        },
      },
      en: {
        heading: 'Why the Nasdaq moves more than the S&P',
        paragraphs: [
          'The Nasdaq 100 excludes financial companies and is packed with technology. That makes it far more concentrated: the top ten names make up nearly half the index.',
          'That concentration explains why it rises faster than the S&P 500 in good years and falls harder in bad ones. It is not a riskier market — it is the same market, taken more concentrated.',
        ],
        callout: {
          heading: 'Concentration is the risk',
          body: 'Owning the Nasdaq and a few technology shares often means owning the same thing twice.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Read the diversification lesson →',
        },
      },
    },
    holdings: [
      { name: 'NVIDIA', weight: 9.4, changePercent: 4.8 },
      { name: 'Apple', weight: 8.8, changePercent: 1.2 },
      { name: 'Microsoft', weight: 8.1, changePercent: 0.9 },
      { name: 'Amazon', weight: 5.6, changePercent: 1.5 },
      { name: 'Broadcom', weight: 4.9, changePercent: 3.2 },
    ],
    sectors: {
      sq: [
        { name: 'Gjysmëpërçuesit', changePercent: 3.4 },
        { name: 'Softueri', changePercent: 1.2 },
        { name: 'Interneti', changePercent: 0.9 },
        { name: 'Bioteknologjia', changePercent: -0.5 },
        { name: 'Konsumi diskrecional', changePercent: -0.8 },
      ],
      en: [
        { name: 'Semiconductors', changePercent: 3.4 },
        { name: 'Software', changePercent: 1.2 },
        { name: 'Internet', changePercent: 0.9 },
        { name: 'Biotechnology', changePercent: -0.5 },
        { name: 'Consumer discretionary', changePercent: -0.8 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'fed-speech-governor-waller'],
    lessonSlugs: [
      'why-diversification-works',
      'what-moves-interest-rates',
      'index-funds-vs-stock-picking',
    ],
    articleSlugs: [
      'nvidia-shares-rise-after-earnings',
      'why-chip-stocks-move-together',
      'markets-rally-as-investors-read-new-fed-signals',
    ],
  },
  {
    symbol: 'dow-jones',
    ticker: 'DJIA',
    name: 'Dow Jones',
    price: '44,912.10',
    changePercent: 0.31,
    changeAbsolute: '+138.60',
    series: [...SERIES.drifting],
    sessionTimes: SESSION_US,
    descriptor: {
      sq: 'SHBA · indeks · 30 kompani të mëdha',
      en: 'US · index · 30 large companies',
    },
    category: { sq: 'Indekset', en: 'Indices' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
      en: 'Closed · 21 Aug 2026, 16:00 ET · delayed 15 min',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '44,780.30' },
        { label: 'Diapazoni ditor', value: '44,780 – 45,074' },
        { label: 'Mbyllja e mëparshme', value: '44,773.50' },
        { label: 'Diapazoni 52-javor', value: '38,910 – 45,074' },
        { label: 'Nga fillimi i vitit', value: '+7.8%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+54.1%', tone: 'positive' },
      ],
      en: [
        { label: 'Open', value: '44,780.30' },
        { label: 'Day range', value: '44,780 – 45,074' },
        { label: 'Previous close', value: '44,773.50' },
        { label: '52-week range', value: '38,910 – 45,074' },
        { label: 'Year to date', value: '+7.8%', tone: 'positive' },
        { label: '5-year return', value: '+54.1%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Indeksi më i famshëm dhe më i çuditshmi',
        paragraphs: [
          'Dow-i mban vetëm 30 kompani dhe i peshon ato sipas çmimit të aksionit, jo sipas madhësisë. Një kompani me aksion 500 dollarësh ndikon dhjetë herë më shumë se një me aksion 50 dollarësh, edhe nëse e dyta është dyfish më e madhe.',
          'Kjo është një trashëgimi nga viti 1896, kur llogaritja bëhej me laps. Ai mbetet i cituar gjerësisht sepse është i vjetër dhe i njohur, jo sepse është matja më e mirë.',
        ],
        callout: {
          heading: 'Përdorni S&P-në për tregun',
          body: 'Kur doni të dini si shkoi tregu amerikan, S&P 500 është shifra më përfaqësuese.',
          lessonSlug: 'index-funds-vs-stock-picking',
          linkLabel: 'Lexo për fondet indeksore →',
        },
      },
      en: {
        heading: 'The most famous index, and the strangest',
        paragraphs: [
          'The Dow holds only 30 companies and weights them by share price, not by size. A company with a $500 share moves it ten times as much as one with a $50 share, even if the second is twice as large.',
          'That is a legacy of 1896, when the calculation was done by pencil. It stays widely quoted because it is old and familiar, not because it is the better measure.',
        ],
        callout: {
          heading: 'Use the S&P for the market',
          body: 'When you want to know how the US market did, the S&P 500 is the more representative number.',
          lessonSlug: 'index-funds-vs-stock-picking',
          linkLabel: 'Read about index funds →',
        },
      },
    },
    holdings: [
      { name: 'UnitedHealth', weight: 8.2, changePercent: 0.4 },
      { name: 'Goldman Sachs', weight: 7.4, changePercent: 1.1 },
      { name: 'Microsoft', weight: 6.1, changePercent: 0.9 },
      { name: 'Home Depot', weight: 5.6, changePercent: -0.2 },
      { name: 'Caterpillar', weight: 5.1, changePercent: 0.8 },
    ],
    sectors: {
      sq: [
        { name: 'Financat', changePercent: 0.9 },
        { name: 'Industria', changePercent: 0.6 },
        { name: 'Kujdesi shëndetësor', changePercent: 0.3 },
        { name: 'Energjia', changePercent: -0.2 },
        { name: 'Mallrat bazë', changePercent: -0.4 },
      ],
      en: [
        { name: 'Financials', changePercent: 0.9 },
        { name: 'Industrials', changePercent: 0.6 },
        { name: 'Health care', changePercent: 0.3 },
        { name: 'Energy', changePercent: -0.2 },
        { name: 'Consumer staples', changePercent: -0.4 },
      ],
    },
    eventSlugs: ['us-durable-goods-orders-july', 'us-inflation-cpi-july'],
    lessonSlugs: ['index-funds-vs-stock-picking', 'what-moves-a-share-price'],
    articleSlugs: ['us-retail-sales-beat-forecasts'],
  },
  {
    symbol: 'stoxx-600',
    ticker: 'SXXP',
    name: 'STOXX Europe 600',
    price: '571.40',
    changePercent: 0.58,
    changeAbsolute: '+3.30',
    series: [
      566, 565, 566, 565, 566, 565, 566, 567, 566, 567, 568, 567, 568, 568, 569,
      568, 569, 570, 569, 570, 569, 570, 571, 570, 571, 572, 571, 572, 571, 572,
      573, 572, 573, 572, 573, 574, 573, 574, 573, 574, 575,
    ],
    sessionTimes: SESSION_EU,
    descriptor: {
      sq: 'Evropë · indeks · 600 kompani, 17 vende',
      en: 'Europe · index · 600 companies, 17 countries',
    },
    category: { sq: 'Indekset', en: 'Indices' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 17:30 CET · me vonesë 15 min',
      en: 'Closed · 21 Aug 2026, 17:30 CET · delayed 15 min',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '566.20' },
        { label: 'Diapazoni ditor', value: '565 – 575' },
        { label: 'Mbyllja e mëparshme', value: '568.10' },
        { label: 'Diapazoni 52-javor', value: '486 – 575' },
        { label: 'Nga fillimi i vitit', value: '+6.9%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+38.4%', tone: 'positive' },
      ],
      en: [
        { label: 'Open', value: '566.20' },
        { label: 'Day range', value: '565 – 575' },
        { label: 'Previous close', value: '568.10' },
        { label: '52-week range', value: '486 – 575' },
        { label: 'Year to date', value: '+6.9%', tone: 'positive' },
        { label: '5-year return', value: '+38.4%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Evropa në një shifër',
        paragraphs: [
          'STOXX Europe 600 mbulon 600 kompani në 17 vende, përfshirë edhe ato jashtë eurozonës si Britania dhe Zvicra. Është matja më e gjerë e vetme e aksioneve evropiane.',
          'Përbërja e tij ndryshon nga ajo amerikane: më shumë banka, industri, luks dhe farmaci, dhe shumë më pak teknologji e madhe. Prandaj ai shpesh ecën ndryshe nga S&P-ja.',
        ],
        callout: {
          heading: 'Valuta ka rëndësi këtu',
          body: 'Nëse investoni nga jashtë eurozonës, kthimi juaj përfshin edhe lëvizjen e euros, jo vetëm të indeksit.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Lexo për diversifikimin →',
        },
      },
      en: {
        heading: 'Europe in one number',
        paragraphs: [
          'The STOXX Europe 600 covers 600 companies across 17 countries, including non-euro ones such as the UK and Switzerland. It is the single broadest measure of European shares.',
          'Its composition differs from America’s: more banks, industrials, luxury and pharmaceuticals, and far less big technology. That is why it often behaves differently from the S&P.',
        ],
        callout: {
          heading: 'Currency matters here',
          body: 'If you invest from outside the euro area, your return includes the euro’s move, not only the index’s.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Read about diversification →',
        },
      },
    },
    holdings: [
      { name: 'ASML', weight: 3.1, changePercent: 2.6 },
      { name: 'Nestlé', weight: 2.7, changePercent: -0.3 },
      { name: 'Novo Nordisk', weight: 2.5, changePercent: 0.6 },
      { name: 'LVMH', weight: 2.2, changePercent: 1.1 },
      { name: 'SAP', weight: 2.0, changePercent: 1.4 },
    ],
    sectors: {
      sq: [
        { name: 'Teknologjia', changePercent: 1.6 },
        { name: 'Udhëtimi dhe argëtimi', changePercent: 1.8 },
        { name: 'Bankat', changePercent: 0.8 },
        { name: 'Shëndetësia', changePercent: 0.1 },
        { name: 'Shërbimet publike', changePercent: -0.5 },
      ],
      en: [
        { name: 'Technology', changePercent: 1.6 },
        { name: 'Travel and leisure', changePercent: 1.8 },
        { name: 'Banks', changePercent: 0.8 },
        { name: 'Health care', changePercent: 0.1 },
        { name: 'Utilities', changePercent: -0.5 },
      ],
    },
    eventSlugs: [
      'ecb-interest-rate-decision',
      'de-ifo-business-climate-august',
    ],
    lessonSlugs: ['why-diversification-works', 'index-funds-vs-stock-picking'],
    articleSlugs: [
      'euro-zone-inflation-cools-to-1-9-percent',
      'asml-lifts-guidance-on-strong-machine-orders',
      'airlines-lead-european-gainers-as-fuel-costs-fall',
    ],
  },
  {
    symbol: 'bitcoin',
    ticker: 'BTC',
    name: 'Bitcoin',
    price: '98,240',
    changePercent: -1.42,
    changeAbsolute: '−1,415',
    series: [...SERIES.falling],
    sessionTimes: SESSION_24H,
    descriptor: {
      sq: 'Global · kriptovalutë · tregtohet 24/7',
      en: 'Global · cryptocurrency · trades 24/7',
    },
    category: { sq: 'Kriptovalutat', en: 'Crypto' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · 24/7 · çmimet janë tregues',
      en: 'Trading live · 24/7 · prices are indicative',
    },
    statistics: {
      sq: [
        { label: 'Hapja (24h)', value: '99,655' },
        { label: 'Diapazoni 24-orësh', value: '98,180 – 99,720' },
        { label: 'Mbyllja e mëparshme', value: '99,655' },
        { label: 'Diapazoni 52-javor', value: '61,400 – 112,800' },
        { label: 'Nga fillimi i vitit', value: '+24.6%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+318.2%', tone: 'positive' },
      ],
      en: [
        { label: 'Open (24h)', value: '99,655' },
        { label: '24-hour range', value: '98,180 – 99,720' },
        { label: 'Previous close', value: '99,655' },
        { label: '52-week range', value: '61,400 – 112,800' },
        { label: 'Year to date', value: '+24.6%', tone: 'positive' },
        { label: '5-year return', value: '+318.2%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Çfarë e lëviz çmimin e Bitcoin-it',
        paragraphs: [
          'Bitcoin nuk ka fitime, dividentë apo yield. Çmimi i tij vjen tërësisht nga sa janë të gatshëm të paguajnë njerëzit, çka e bën atë të varur nga fluksi i parave më shumë se çdo aktiv tjetër në këtë faqe.',
          'Që kur u miratuan ETF-të spot, ai fluks është bërë i matshëm. Prandaj lajmet për fluksin hyrës ose dalës të fondeve tani shpjegojnë shumicën e lëvizjeve javore.',
        ],
        callout: {
          heading: 'Luhatshmëria është veçori, jo defekt',
          body: 'Lëvizjet prej 5% brenda ditës janë normale këtu. Madhësia e pozicionit ka më shumë rëndësi se koha e hyrjes.',
          lessonSlug: 'risk-and-return',
          linkLabel: 'Lexo për rrezikun dhe kthimin →',
        },
      },
      en: {
        heading: 'What moves Bitcoin’s price',
        paragraphs: [
          'Bitcoin has no earnings, dividends or yield. Its price comes entirely from what people are willing to pay, which makes it more dependent on money flow than any other asset on this site.',
          'Since spot ETFs were approved, that flow has become measurable. That is why news about fund inflows or outflows now explains most weekly moves.',
        ],
        callout: {
          heading: 'Volatility is a feature, not a fault',
          body: 'Moves of 5% within a day are normal here. Position size matters more than timing your entry.',
          lessonSlug: 'risk-and-return',
          linkLabel: 'Read about risk and return →',
        },
      },
    },
    sectors: {
      sq: [
        { name: 'Bitcoin', changePercent: -1.42 },
        { name: 'Ethereum', changePercent: -0.9 },
        { name: 'Solana', changePercent: -2.1 },
        { name: 'Monedhat e qëndrueshme', changePercent: 0.01 },
        { name: 'Aksionet e minierave', changePercent: -3.4 },
      ],
      en: [
        { name: 'Bitcoin', changePercent: -1.42 },
        { name: 'Ethereum', changePercent: -0.9 },
        { name: 'Solana', changePercent: -2.1 },
        { name: 'Stablecoins', changePercent: 0.01 },
        { name: 'Mining shares', changePercent: -3.4 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'fed-speech-governor-waller'],
    lessonSlugs: [
      'risk-and-return',
      'what-is-an-etf',
      'why-diversification-works',
    ],
    articleSlugs: [
      'bitcoin-slips-below-99000-as-etf-inflows-pause',
      'bitcoin-etfs-where-the-money-went-this-month',
      'ethereum-staking-rewards-fall-as-validator-queue-clears',
    ],
  },
  {
    symbol: 'gold',
    ticker: 'XAU',
    name: 'Gold',
    price: '3,148.60',
    changePercent: 0.44,
    changeAbsolute: '+13.80',
    series: [
      3131, 3129, 3132, 3130, 3133, 3131, 3134, 3132, 3135, 3133, 3136, 3134,
      3137, 3135, 3138, 3136, 3139, 3137, 3140, 3138, 3141, 3139, 3142, 3140,
      3143, 3141, 3144, 3142, 3145, 3143, 3146, 3144, 3147, 3145, 3148, 3146,
      3149, 3147, 3150, 3148, 3151,
    ],
    sessionTimes: SESSION_24H,
    descriptor: {
      sq: 'Global · mall · për ons troy',
      en: 'Global · commodity · per troy ounce',
    },
    category: { sq: 'Mallrat', en: 'Commodities' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · çmimi spot në dollarë amerikanë',
      en: 'Trading live · spot price in US dollars',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '3,134.80' },
        { label: 'Diapazoni ditor', value: '3,129 – 3,151' },
        { label: 'Mbyllja e mëparshme', value: '3,134.80' },
        { label: 'Diapazoni 52-javor', value: '2,410 – 3,186' },
        { label: 'Nga fillimi i vitit', value: '+19.8%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '+72.4%', tone: 'positive' },
      ],
      en: [
        { label: 'Open', value: '3,134.80' },
        { label: 'Day range', value: '3,129 – 3,151' },
        { label: 'Previous close', value: '3,134.80' },
        { label: '52-week range', value: '2,410 – 3,186' },
        { label: 'Year to date', value: '+19.8%', tone: 'positive' },
        { label: '5-year return', value: '+72.4%', tone: 'positive' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Pse ari sillet ndryshe',
        paragraphs: [
          'Ari nuk paguan interes dhe nuk prodhon asgjë. Prandaj kur normat rriten, mbajtja e tij bëhet më e kushtueshme në krahasim me obligacionet, dhe çmimi zakonisht bie.',
          'Ajo që e ka thyer këtë rregull së fundmi janë bankat qendrore. Ato blejnë për arsye politike, jo për kthim, dhe kërkesa e tyre nuk reagon ndaj normave.',
        ],
        callout: {
          heading: 'Ari nuk është mbrojtje ndaj gjithçkaje',
          body: 'Ai ka mbrojtur nga inflacioni në disa dekada dhe ka dështuar në të tjera. Historikisht ai mbron më mirë ndaj krizave të besimit sesa ndaj çmimeve në rritje.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Lexo për diversifikimin →',
        },
      },
      en: {
        heading: 'Why gold behaves differently',
        paragraphs: [
          'Gold pays no interest and produces nothing. So when rates rise, holding it becomes more costly relative to bonds, and the price usually falls.',
          'What has broken that rule recently is central banks. They buy for political reasons rather than return, and their demand does not respond to rates.',
        ],
        callout: {
          heading: 'Gold is not a hedge against everything',
          body: 'It has protected against inflation in some decades and failed in others. Historically it hedges crises of confidence better than rising prices.',
          lessonSlug: 'why-diversification-works',
          linkLabel: 'Read about diversification →',
        },
      },
    },
    sectors: {
      sq: [
        { name: 'Ari', changePercent: 0.44 },
        { name: 'Argjendi', changePercent: 0.9 },
        { name: 'Platini', changePercent: -0.3 },
        { name: 'Nafta Brent', changePercent: 0.1 },
        { name: 'Bakri', changePercent: -0.7 },
      ],
      en: [
        { name: 'Gold', changePercent: 0.44 },
        { name: 'Silver', changePercent: 0.9 },
        { name: 'Platinum', changePercent: -0.3 },
        { name: 'Brent crude', changePercent: 0.1 },
        { name: 'Copper', changePercent: -0.7 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'ecb-interest-rate-decision'],
    lessonSlugs: ['why-diversification-works', 'what-moves-interest-rates'],
    articleSlugs: [
      'gold-holds-near-record-as-central-banks-keep-buying',
      'oil-steadies-after-opec-holds-output-unchanged',
    ],
  },
  {
    symbol: 'eur-usd',
    ticker: 'EURUSD',
    name: 'EUR / USD',
    price: '1.0925',
    changePercent: -0.12,
    changeAbsolute: '−0.0013',
    series: [
      1.0942, 1.094, 1.0941, 1.0939, 1.094, 1.0938, 1.0939, 1.0937, 1.0938,
      1.0936, 1.0937, 1.0935, 1.0936, 1.0934, 1.0935, 1.0933, 1.0934, 1.0932,
      1.0933, 1.0931, 1.0932, 1.093, 1.0931, 1.0929, 1.093, 1.0928, 1.0929,
      1.0927, 1.0928, 1.0926, 1.0927, 1.0925, 1.0926, 1.0924, 1.0925, 1.0923,
      1.0924, 1.0922, 1.0923, 1.0924, 1.0925,
    ],
    sessionTimes: SESSION_24H,
    descriptor: {
      sq: 'Global · çift valutor · euro për dollar',
      en: 'Global · currency pair · euros per dollar',
    },
    category: { sq: 'Valutat', en: 'Currencies' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · 24/5 · çmimet janë tregues',
      en: 'Trading live · 24/5 · prices are indicative',
    },
    statistics: {
      sq: [
        { label: 'Hapja', value: '1.0938' },
        { label: 'Diapazoni ditor', value: '1.0922 – 1.0942' },
        { label: 'Mbyllja e mëparshme', value: '1.0938' },
        { label: 'Diapazoni 52-javor', value: '1.0412 – 1.1284' },
        { label: 'Nga fillimi i vitit', value: '+1.4%', tone: 'positive' },
        { label: 'Kthimi 5-vjeçar', value: '−7.6%', tone: 'negative' },
      ],
      en: [
        { label: 'Open', value: '1.0938' },
        { label: 'Day range', value: '1.0922 – 1.0942' },
        { label: 'Previous close', value: '1.0938' },
        { label: '52-week range', value: '1.0412 – 1.1284' },
        { label: 'Year to date', value: '+1.4%', tone: 'positive' },
        { label: '5-year return', value: '−7.6%', tone: 'negative' },
      ],
    },
    explainer: {
      sq: {
        heading: 'Si të lexoni një çift valutor',
        paragraphs: [
          '1.0925 do të thotë se një euro blen 1.0925 dollarë. Kur shifra rritet, euroja po forcohet; kur bie, dollari po forcohet. Gjithmonë ka dy anë.',
          'Çiftet valutore lëvizin kryesisht mbi diferencat e normave të interesit. Nëse Fed-i mban normat lart ndërsa BQE-ja i ul, paratë rrjedhin drejt dollarit dhe çifti bie.',
        ],
        callout: {
          heading: 'Kjo ju prek edhe pa e tregtuar',
          body: 'Nëse mbani aksione amerikane nga eurozona, kthimi juaj varet edhe nga ky çift, jo vetëm nga tregu.',
          lessonSlug: 'what-moves-interest-rates',
          linkLabel: 'Lexo për normat e interesit →',
        },
      },
      en: {
        heading: 'How to read a currency pair',
        paragraphs: [
          '1.0925 means one euro buys 1.0925 dollars. When the figure rises, the euro is strengthening; when it falls, the dollar is. There are always two sides.',
          'Currency pairs move mostly on interest-rate differences. If the Fed holds rates high while the ECB cuts, money flows toward the dollar and the pair falls.',
        ],
        callout: {
          heading: 'This affects you without trading it',
          body: 'If you hold US shares from the euro area, your return depends on this pair too, not only on the market.',
          lessonSlug: 'what-moves-interest-rates',
          linkLabel: 'Read about interest rates →',
        },
      },
    },
    sectors: {
      sq: [
        { name: 'EUR / USD', changePercent: -0.12 },
        { name: 'GBP / USD', changePercent: -0.08 },
        { name: 'USD / JPY', changePercent: 0.24 },
        { name: 'USD / CHF', changePercent: 0.11 },
        { name: 'Indeksi i dollarit', changePercent: 0.15 },
      ],
      en: [
        { name: 'EUR / USD', changePercent: -0.12 },
        { name: 'GBP / USD', changePercent: -0.08 },
        { name: 'USD / JPY', changePercent: 0.24 },
        { name: 'USD / CHF', changePercent: 0.11 },
        { name: 'Dollar index', changePercent: 0.15 },
      ],
    },
    eventSlugs: ['ecb-interest-rate-decision', 'us-inflation-cpi-july'],
    lessonSlugs: ['what-moves-interest-rates', 'what-central-banks-do'],
    articleSlugs: [
      'euro-zone-inflation-cools-to-1-9-percent',
      'a-slow-inflation-europe-is-good-news-for-savers',
    ],
  },
];

const resolve = (asset: SeedAsset, locale: Locale): AssetDetail => ({
  symbol: asset.symbol,
  ticker: asset.ticker,
  name: asset.name,
  descriptor: asset.descriptor[locale],
  category: asset.category[locale],
  price: asset.price,
  changePercent: asset.changePercent,
  changeAbsolute: asset.changeAbsolute,
  statusLine: asset.statusLine[locale],
  series: asset.series,
  sessionTimes: asset.sessionTimes,
  statistics: asset.statistics[locale],
  ...(asset.explainer ? { explainer: asset.explainer[locale] } : {}),
  ...(asset.holdings ? { holdings: asset.holdings } : {}),
  ...(asset.sectors ? { sectors: asset.sectors[locale] } : {}),
  ...(asset.eventSlugs ? { eventSlugs: asset.eventSlugs } : {}),
  ...(asset.lessonSlugs ? { lessonSlugs: asset.lessonSlugs } : {}),
  ...(asset.articleSlugs ? { articleSlugs: asset.articleSlugs } : {}),
});

/**
 * Falls back to a page built from the quote when an instrument has no written
 * page yet, so every link from the ticker strip and quote table resolves.
 */
export function getAssetDetail(
  locale: Locale,
  symbol: string,
  fallbackCategory: string,
  fallbackStatus: string,
): AssetDetail | null {
  const written = ASSETS.find((asset) => asset.symbol === symbol);
  if (written) return resolve(written, locale);

  const quote = getQuote(locale, symbol);
  if (!quote) return null;

  return {
    symbol: quote.symbol,
    ticker: quote.symbol.toUpperCase(),
    name: quote.name,
    descriptor: '',
    category: fallbackCategory,
    price: quote.price,
    changePercent: quote.changePercent,
    changeAbsolute: '',
    statusLine: fallbackStatus,
    series: [],
    sessionTimes: [],
    statistics: [],
  };
}
