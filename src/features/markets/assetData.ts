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
 * `learnData` uses. Anything not written yet falls back to a page
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
    },
    category: { sq: 'Indekset' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
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
    },
    eventSlugs: ['us-inflation-cpi-july', 'ecb-interest-rate-decision'],
    lessonSlugs: [
      'index-funds-vs-stock-picking',
      'risk-and-return',
      'fees-that-change-everything',
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
    },
    category: { sq: 'Indekset' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
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
    },
    eventSlugs: ['us-inflation-cpi-july', 'fed-speech-governor-waller'],
    lessonSlugs: [
      'why-diversification-works',
      'what-moves-interest-rates',
      'index-funds-vs-stock-picking',
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
    },
    category: { sq: 'Indekset' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 16:00 ET · me vonesë 15 min',
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
    },
    eventSlugs: ['us-durable-goods-orders-july', 'us-inflation-cpi-july'],
    lessonSlugs: ['index-funds-vs-stock-picking', 'what-moves-a-share-price'],
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
    },
    category: { sq: 'Indekset' },
    statusLine: {
      sq: 'Mbyllur · 21 gusht 2026, 17:30 CET · me vonesë 15 min',
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
    },
    eventSlugs: [
      'ecb-interest-rate-decision',
      'de-ifo-business-climate-august',
    ],
    lessonSlugs: ['why-diversification-works', 'index-funds-vs-stock-picking'],
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
    },
    category: { sq: 'Kriptovalutat' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · 24/7 · çmimet janë tregues',
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
    },
    sectors: {
      sq: [
        { name: 'Bitcoin', changePercent: -1.42 },
        { name: 'Ethereum', changePercent: -0.9 },
        { name: 'Solana', changePercent: -2.1 },
        { name: 'Monedhat e qëndrueshme', changePercent: 0.01 },
        { name: 'Aksionet e minierave', changePercent: -3.4 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'fed-speech-governor-waller'],
    lessonSlugs: [
      'risk-and-return',
      'what-is-an-etf',
      'why-diversification-works',
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
    },
    category: { sq: 'Mallrat' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · çmimi spot në dollarë amerikanë',
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
    },
    sectors: {
      sq: [
        { name: 'Ari', changePercent: 0.44 },
        { name: 'Argjendi', changePercent: 0.9 },
        { name: 'Platini', changePercent: -0.3 },
        { name: 'Nafta Brent', changePercent: 0.1 },
        { name: 'Bakri', changePercent: -0.7 },
      ],
    },
    eventSlugs: ['us-inflation-cpi-july', 'ecb-interest-rate-decision'],
    lessonSlugs: ['why-diversification-works', 'what-moves-interest-rates'],
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
    },
    category: { sq: 'Valutat' },
    statusLine: {
      sq: 'Tregtim i drejtpërdrejtë · 24/5 · çmimet janë tregues',
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
    },
    sectors: {
      sq: [
        { name: 'EUR / USD', changePercent: -0.12 },
        { name: 'GBP / USD', changePercent: -0.08 },
        { name: 'USD / JPY', changePercent: 0.24 },
        { name: 'USD / CHF', changePercent: 0.11 },
        { name: 'Indeksi i dollarit', changePercent: 0.15 },
      ],
    },
    eventSlugs: ['ecb-interest-rate-decision', 'us-inflation-cpi-july'],
    lessonSlugs: ['what-moves-interest-rates', 'what-central-banks-do'],
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
