import type { Locale } from '@/i18n/config';
import type {
  CalendarEvent,
  DirectionOutcome,
  EventDetail,
  EventHistoryEntry,
  EventImpact,
  EventRegion,
  Localized,
} from './calendarTypes';

/**
 * Explainers for calendar events.
 *
 * Each event is declared once with locale-keyed strings, rather than as two
 * complete objects per language — the same shape `learnData`
 * use, and the reason a new event costs one block rather than two.
 *
 * Every field below the identifiers is optional, so an event with no written
 * explainer still renders a valid page from its calendar row.
 */

interface SeedEvent {
  slug: string;
  region: EventRegion;
  impact: EventImpact;
  time: string;
  releasesAt: string;
  expected?: string;
  previous?: string;
  actual?: string;
  title: Localized<string>;
  regionName: Localized<string>;
  shortName: Localized<string>;
  cadence: Localized<string>;
  summary: Localized<string>;
  benchmark?: { label: Localized<string>; value: string };
  nextReleaseDate?: Localized<string>;
  explainer?: Localized<{ heading: string; paragraphs: string[] }>;
  directions?: Localized<{
    higher: DirectionOutcome;
    lower: DirectionOutcome;
    caveat: { heading: string; body: string };
  }>;
  history?: Localized<{
    heading: string;
    note: string;
    entries: EventHistoryEntry[];
  }>;
  howToRead?: Localized<{
    heading: string;
    steps: { title: string; body: string }[];
  }>;
  atAGlance?: Localized<{ label: string; value: string }[]>;
  reactingSymbols?: string[];
  lessonSlugs?: string[];
}

const REGION_NAMES: Record<EventRegion, Localized<string>> = {
  US: { sq: 'Shtetet e Bashkuara' },
  EU: { sq: 'Eurozona' },
  DE: { sq: 'Gjermania' },
  UK: { sq: 'Britania e Madhe' },
  JP: { sq: 'Japonia' },
};

const CADENCE = {
  monthlyHigh: { sq: 'Mujore · ndikim i lartë' },
  monthlyMedium: {
    sq: 'Mujore · ndikim mesatar',
  },
  monthlyLow: { sq: 'Mujore · ndikim i ulët' },
  weeklyMedium: { sq: 'Javore · ndikim mesatar' },
  scheduledHigh: {
    sq: 'Sipas kalendarit · ndikim i lartë',
  },
  scheduledMedium: {
    sq: 'Sipas kalendarit · ndikim mesatar',
  },
  scheduledLow: {
    sq: 'Sipas kalendarit · ndikim i ulët',
  },
} as const;

const EVENTS: SeedEvent[] = [
  {
    slug: 'us-inflation-cpi-july',
    region: 'US',
    impact: 'high',
    time: '14:30',
    releasesAt: '2026-08-21T14:30:00Z',
    expected: '3.1%',
    previous: '3.2%',
    title: {
      sq: 'Të dhënat e inflacionit në SHBA (CPI), korrik',
    },
    regionName: REGION_NAMES.US,
    shortName: { sq: 'Inflacioni (CPI)' },
    cadence: CADENCE.monthlyHigh,
    summary: {
      sq: 'Matja kryesore e shpejtësisë me të cilën po rriten çmimet e konsumit në Shtetet e Bashkuara, e publikuar nga Byroja e Statistikave të Punës.',
    },
    benchmark: {
      label: { sq: 'Objektivi i Fed-it' },
      value: '2.0%',
    },
    nextReleaseDate: { sq: '18 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Çfarë është kjo shifër',
        paragraphs: [
          'Çdo muaj, statisticienët çmojnë një shportë fikse gjërash që familjet blejnë vërtet — ushqim, qira, karburant, berber, sigurime — dhe e krahasojnë totalin me të njëjtën shportë një vit më parë. Diferenca në përqindje është indeksi i çmimeve të konsumit, ose CPI.',
          'Pra “3.1%” do të thotë se shporta kushton 3.1% më shumë sesa dymbëdhjetë muaj më parë. Çmimet ende po rriten, thjesht më ngadalë se më parë. Rënia e inflacionit nuk do të thotë se çmimet po bien.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më e lartë se pritej',
          verdict: 'Përgjithësisht e keqe për tregjet',
          body: 'Inflacioni i nxehtë e shtyn Fed-in t’i mbajë normat e larta për më gjatë. Huamarrja mbetet e shtrenjtë dhe fitimet e ardhshme të kompanive vlejnë më pak sot.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Rriten',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Forcohet',
              tone: 'neutral',
            },
            {
              subject: 'Kursimtarët',
              outcome: 'Norma më të mira, fuqi blerëse më e dobët',
              tone: 'neutral',
            },
          ],
        },
        lower: {
          label: 'Më e ulët se pritej',
          verdict: 'Përgjithësisht e mirë për tregjet',
          body: 'Ftohja e inflacionit i jep hapësirë Fed-it t’i ulë normat. Huamarrja më e lirë mbështet fitimet e kompanive, dhe aksionet e rritjes priren të përfitojnë më shumë.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Bien',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Dobësohet',
              tone: 'neutral',
            },
            {
              subject: 'Kursimtarët',
              outcome: 'Norma më të ulëta përpara, çmime më të qëndrueshme',
              tone: 'neutral',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'As një shifër shumë e ulët nuk është automatikisht lajm i mirë. Inflacioni që bie shumë nën 2% zakonisht do të thotë se kërkesa është e dobët, dhe kjo tregon një ekonomi që po ngadalësohet — që është problem më vete për fitimet e kompanive.',
        },
      },
    },
    history: {
      sq: {
        heading: 'Ku ka qenë',
        note: 'Inflacioni vjetor amerikan, katër publikimet e fundit. Objektivi i Fed-it është 2%.',
        entries: [
          {
            period: 'Mars 2026',
            actual: '3.6%',
            expected: '3.5%',
            surprise: '+0.1 pp',
            surpriseDirection: 'above',
            value: 3.6,
          },
          {
            period: 'Prill 2026',
            actual: '3.4%',
            expected: '3.4%',
            surprise: null,
            surpriseDirection: 'inline',
            value: 3.4,
          },
          {
            period: 'Maj 2026',
            actual: '3.3%',
            expected: '3.2%',
            surprise: '+0.1 pp',
            surpriseDirection: 'above',
            value: 3.3,
          },
          {
            period: 'Qershor 2026',
            actual: '3.2%',
            expected: '3.3%',
            surprise: '−0.1 pp',
            surpriseDirection: 'below',
            value: 3.2,
          },
        ],
      },
    },
    howToRead: {
      sq: {
        heading: 'Si ta lexoni për 30 sekonda',
        steps: [
          {
            title: 'Krahasoni aktualen me të priturën, jo me muajin e kaluar',
            body: 'Tregjet e kishin çmuar tashmë 3.1%. Lëvizja vjen nga hendeku mes asaj që erdhi dhe asaj që supozohej.',
          },
          {
            title: 'Shikoni edhe shifrën bazë',
            body: 'CPI-ja bazë heq ushqimin dhe energjinë, të cilat luhaten shumë. Bankat qendrore e ndjekin atë më nga afër se shifrën kryesore.',
          },
          {
            title: 'Injoroni pesëmbëdhjetë minutat e para',
            body: 'Kërcimi fillestar shpesh zhbëhet sapo lexohen detajet. Mbyllja ju thotë më shumë se reagimi.',
          },
        ],
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'BLS' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Mbulon', value: 'Korrik 2026' },
        { label: 'Rishikimet', value: 'Të rralla' },
        { label: 'Lëviz më shumë', value: 'Normat, aksionet e teknologjisë' },
      ],
    },
    reactingSymbols: ['sp-500', 'nasdaq-100', 'gold', 'eur-usd'],
    lessonSlugs: [
      'inflation-in-one-page',
      'what-moves-interest-rates',
      'what-central-banks-do',
    ],
  },
  {
    slug: 'ecb-interest-rate-decision',
    region: 'EU',
    impact: 'high',
    time: '13:45',
    releasesAt: '2026-08-21T13:45:00Z',
    expected: '3.25%',
    previous: '3.50%',
    title: {
      sq: 'Vendimi i BQE-së për normën e interesit',
    },
    regionName: REGION_NAMES.EU,
    shortName: { sq: 'Norma e BQE-së' },
    cadence: CADENCE.scheduledHigh,
    summary: {
      sq: 'Vendimi i Këshillit Drejtues të Bankës Qendrore Evropiane për normën bazë të interesit në eurozonë.',
    },
    benchmark: {
      label: { sq: 'Objektivi i inflacionit' },
      value: '2.0%',
    },
    nextReleaseDate: { sq: '15 tetor 2026' },
    explainer: {
      sq: {
        heading: 'Çfarë vendoset në të vërtetë',
        paragraphs: [
          'BQE-ja cakton normën me të cilën bankat tregtare depozitojnë para tek ajo. Kjo normë e vetme formon çdo normë tjetër në eurozonë: kredinë e banesës, kredinë e biznesit, llogarinë tuaj të kursimit.',
          'Vendimi vjen si njoftim, i ndjekur nga një konferencë shtypi. Shpesh konferenca lëviz tregjet më shumë se vetë vendimi, sepse aty shpjegohet se çfarë vjen më pas.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Normë më e lartë se pritej',
          verdict: 'Përgjithësisht e keqe për tregjet',
          body: 'Një normë më e lartë ose një ton më i ashpër sinjalizon se banka është ende e shqetësuar për inflacionin. Huamarrja mbetet e shtrenjtë dhe rritja ngadalësohet.',
          effects: [
            {
              subject: 'Aksionet evropiane',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            { subject: 'Euroja', outcome: 'Forcohet', tone: 'neutral' },
            {
              subject: 'Kreditë e banesave',
              outcome: 'Mbeten të shtrenjta',
              tone: 'negative',
            },
            {
              subject: 'Kursimtarët',
              outcome: 'Norma më të mira depozite',
              tone: 'positive',
            },
          ],
        },
        lower: {
          label: 'Ulje ose ton më i butë',
          verdict: 'Përgjithësisht e mirë për tregjet',
          body: 'Një ulje e bën huamarrjen më të lirë për familjet dhe bizneset, çka mbështet fitimet dhe çmimet e aksioneve.',
          effects: [
            {
              subject: 'Aksionet evropiane',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            { subject: 'Euroja', outcome: 'Dobësohet', tone: 'neutral' },
            {
              subject: 'Kreditë e banesave',
              outcome: 'Bëhen më të lira',
              tone: 'positive',
            },
            {
              subject: 'Kursimtarët',
              outcome: 'Norma më të ulëta depozite',
              tone: 'negative',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Një ulje e papritur mund të lexohet edhe si panik: nëse banka lëviz shpejt, tregjet pyesin se çfarë sheh ajo që të tjerët nuk e shohin. Konteksti ka po aq rëndësi sa drejtimi.',
        },
      },
    },
    history: {
      sq: {
        heading: 'Rruga e normës',
        note: 'Norma bazë e BQE-së në katër vendimet e fundit.',
        entries: [
          {
            period: 'Mars 2026',
            actual: '4.00%',
            expected: '4.00%',
            surprise: null,
            surpriseDirection: 'inline',
            value: 4.0,
          },
          {
            period: 'Prill 2026',
            actual: '3.75%',
            expected: '4.00%',
            surprise: '−25 pb',
            surpriseDirection: 'below',
            value: 3.75,
          },
          {
            period: 'Qershor 2026',
            actual: '3.75%',
            expected: '3.75%',
            surprise: null,
            surpriseDirection: 'inline',
            value: 3.75,
          },
          {
            period: 'Korrik 2026',
            actual: '3.50%',
            expected: '3.50%',
            surprise: null,
            surpriseDirection: 'inline',
            value: 3.5,
          },
        ],
      },
    },
    howToRead: {
      sq: {
        heading: 'Si ta lexoni për 30 sekonda',
        steps: [
          {
            title: 'Vendimi është rrallë surpriza',
            body: 'Tregjet zakonisht e dinë se çfarë do të bëjë banka. Ajo që nuk e dinë është se çfarë sinjalizon për herën tjetër.',
          },
          {
            title: 'Dëgjoni konferencën, jo njoftimin',
            body: 'Formulimi rreth rreziqeve dhe rrugës së ardhshme lëviz tregjet më shumë se vetë numri.',
          },
          {
            title: 'Shikoni euron, jo vetëm aksionet',
            body: 'Valuta reagon më pastër ndaj lajmeve për normat, sepse nuk ndikohet nga fitimet e kompanive.',
          },
        ],
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'BQE' },
        { label: 'Frekuenca', value: '8 herë në vit' },
        { label: 'Vendimmarrës', value: 'Këshilli Drejtues' },
        { label: 'Rishikimet', value: 'Asnjëherë' },
        { label: 'Lëviz më shumë', value: 'Euro, bankat, obligacionet' },
      ],
    },
    reactingSymbols: ['stoxx-600', 'eur-usd', 'gold'],
    lessonSlugs: [
      'what-central-banks-do',
      'what-moves-interest-rates',
      'bonds-explained',
    ],
  },
  {
    slug: 'us-initial-jobless-claims-weekly',
    region: 'US',
    impact: 'medium',
    time: '14:30',
    releasesAt: '2026-08-21T14:30:00Z',
    expected: '221k',
    previous: '218k',
    title: {
      sq: 'Kërkesat fillestare për papunësi, javore',
    },
    regionName: REGION_NAMES.US,
    shortName: { sq: 'Kërkesat për papunësi' },
    cadence: CADENCE.weeklyMedium,
    summary: {
      sq: 'Numri i njerëzve që aplikuan për herë të parë për ndihmë papunësie javën e kaluar — matja më e shpejtë e tregut amerikan të punës.',
    },
    nextReleaseDate: { sq: '28 gusht 2026' },
    explainer: {
      sq: {
        heading: 'Pse ka rëndësi një shifër javore',
        paragraphs: [
          'Shumica e të dhënave ekonomike vijnë me vonesë muajsh. Kërkesat për papunësi vijnë çdo javë, çka i bën ato sinjalin e parë kur tregu i punës fillon të kthehet.',
          'Shifrat individuale janë të zhurmshme — moti, festat dhe mbylljet e fabrikave i shtrembërojnë. Prandaj analistët shikojnë mesataren katërjavore, jo javën e vetme.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më shumë kërkesa se pritej',
          verdict: 'Sinjal i përzier',
          body: 'Më shumë njerëz që humbin punën do të thotë ekonomi më e dobët. Por gjithashtu i jep Fed-it arsye për t’i ulur normat, çka tregjet ndonjëherë e mirëpresin.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Reagim i përzier',
              tone: 'neutral',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Bien',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Dobësohet',
              tone: 'neutral',
            },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Rriten',
              tone: 'positive',
            },
          ],
        },
        lower: {
          label: 'Më pak kërkesa se pritej',
          verdict: 'Ekonomi e fortë, normat qëndrojnë',
          body: 'Një treg pune i fortë mbështet shpenzimin e konsumatorit dhe fitimet, por ul shanset për ulje të shpejta normash.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Reagim i përzier',
              tone: 'neutral',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Rriten',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Forcohet',
              tone: 'neutral',
            },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Bien',
              tone: 'negative',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Kjo është ngjarja ku “lajmi i keq është lajm i mirë” shfaqet më qartë. Kur tregjet duan ulje normash, të dhëna të dobëta pune ndonjëherë i ngrenë aksionet — derisa dobësia bëhet mjaftueshëm e madhe sa të kërcënojë fitimet.',
        },
      },
    },
    history: {
      sq: {
        heading: 'Katër javët e fundit',
        note: 'Kërkesat fillestare, në mijëra.',
        entries: [
          {
            period: 'Java e 25 korrikut',
            actual: '226k',
            expected: '223k',
            surprise: '+3k',
            surpriseDirection: 'above',
            value: 226,
          },
          {
            period: 'Java e 1 gushtit',
            actual: '220k',
            expected: '224k',
            surprise: '−4k',
            surpriseDirection: 'below',
            value: 220,
          },
          {
            period: 'Java e 8 gushtit',
            actual: '219k',
            expected: '219k',
            surprise: null,
            surpriseDirection: 'inline',
            value: 219,
          },
          {
            period: 'Java e 15 gushtit',
            actual: '218k',
            expected: '221k',
            surprise: '−3k',
            surpriseDirection: 'below',
            value: 218,
          },
        ],
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Departamenti i Punës' },
        { label: 'Frekuenca', value: 'Javore' },
        { label: 'Mbulon', value: 'Javën e kaluar' },
        { label: 'Rishikimet', value: 'Të zakonshme' },
        { label: 'Lëviz më shumë', value: 'Obligacionet, dollari' },
      ],
    },
    reactingSymbols: ['sp-500', 'eur-usd'],
    lessonSlugs: [
      'what-moves-interest-rates',
      'how-to-read-the-economic-calendar',
    ],
  },
  {
    slug: 'de-producer-price-index-july',
    region: 'DE',
    impact: 'low',
    time: '08:00',
    releasesAt: '2026-08-21T08:00:00Z',
    expected: '1.5%',
    previous: '1.6%',
    actual: '1.4%',
    title: {
      sq: 'Indeksi i çmimeve të prodhimit (PPI), korrik',
    },
    regionName: REGION_NAMES.DE,
    shortName: { sq: 'PPI gjerman' },
    cadence: CADENCE.monthlyLow,
    summary: {
      sq: 'Sa po ndryshojnë çmimet që fabrikat gjermane ngarkojnë — një paralajmërim i hershëm për inflacionin e konsumit.',
    },
    nextReleaseDate: { sq: '18 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Inflacioni një hap më lart në zinxhir',
        paragraphs: [
          'PPI-ja mat çmimet në portën e fabrikës, para se mallrat të arrijnë te dyqanet. Kur kostot e prodhuesve rriten, ato zakonisht kalojnë te konsumatorët brenda disa muajsh.',
          'Prandaj ekonomistët e lexojnë PPI-në si një pamje paraprake të asaj që CPI-ja mund të bëjë më vonë — jo si një garanci, por si drejtim.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më e lartë se pritej',
          verdict: 'Presion inflacionist në rrugë',
          body: 'Kostot më të larta të prodhimit zakonisht arrijnë te raftet e dyqaneve, çka e vështirëson punën e BQE-së.',
          effects: [
            {
              subject: 'Aksionet gjermane',
              outcome: 'Presion i lehtë',
              tone: 'negative',
            },
            {
              subject: 'Pritjet e inflacionit',
              outcome: 'Rriten',
              tone: 'neutral',
            },
            {
              subject: 'Marzhet e prodhuesve',
              outcome: 'Shtrëngohen',
              tone: 'negative',
            },
          ],
        },
        lower: {
          label: 'Më e ulët se pritej',
          verdict: 'Presion inflacionist në zbutje',
          body: 'Kostot më të ulëta në fabrikë sugjerojnë se inflacioni i konsumit do të vazhdojë të ftohet, çka i jep hapësirë BQE-së.',
          effects: [
            {
              subject: 'Aksionet gjermane',
              outcome: 'Mbështetje e lehtë',
              tone: 'positive',
            },
            {
              subject: 'Pritjet e inflacionit',
              outcome: 'Bien',
              tone: 'neutral',
            },
            {
              subject: 'Marzhet e prodhuesve',
              outcome: 'Lehtësohen',
              tone: 'positive',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'PPI-ja gjermane dominohet nga energjia. Një rënie e madhe shpesh do të thotë vetëm se gazi u lirua, jo se presioni i gjerë mbi çmimet u zhduk.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Destatis' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Mbulon', value: 'Korrik 2026' },
        { label: 'Rishikimet', value: 'Të rralla' },
        { label: 'Lëviz më shumë', value: 'Obligacionet gjermane' },
      ],
    },
    reactingSymbols: ['stoxx-600', 'eur-usd'],
    lessonSlugs: ['inflation-in-one-page'],
  },
  {
    slug: 'euro-area-consumer-confidence-flash',
    region: 'EU',
    impact: 'medium',
    time: '10:00',
    releasesAt: '2026-08-21T10:00:00Z',
    expected: '−13.8',
    previous: '−13.9',
    actual: '−14.2',
    title: {
      sq: 'Besimi i konsumatorit në eurozonë, paraprak',
    },
    regionName: REGION_NAMES.EU,
    shortName: { sq: 'Besimi i konsumatorit' },
    cadence: CADENCE.monthlyMedium,
    summary: {
      sq: 'Një sondazh se sa optimistë ndihen familjet evropiane për financat e tyre dhe për ekonominë.',
    },
    nextReleaseDate: { sq: '22 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Pse shifra është gjithmonë negative',
        paragraphs: [
          'Indeksi ndërtohet si diferencë mes përgjigjeve optimiste dhe pesimiste. Në praktikë, evropianët janë historikisht më pesimistë se optimistë, ndaj shifra qëndron nën zero pothuajse gjithmonë.',
          'Kjo do të thotë se ajo që ka rëndësi është drejtimi, jo shenja. Një lëvizje nga −14 në −12 është përmirësim i qartë.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më i lartë se pritej',
          verdict: 'Konsumatorë më të sigurt',
          body: 'Familjet që ndihen të sigurta shpenzojnë më shumë, çka mbështet shitjet me pakicë dhe fitimet e kompanive evropiane.',
          effects: [
            {
              subject: 'Shitjet me pakicë',
              outcome: 'Mbështetje',
              tone: 'positive',
            },
            {
              subject: 'Aksionet evropiane',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Euroja',
              outcome: 'Mbështetje e lehtë',
              tone: 'neutral',
            },
          ],
        },
        lower: {
          label: 'Më i ulët se pritej',
          verdict: 'Kujdes te konsumatorët',
          body: 'Besimi në rënie shpesh paraprin shpenzim më të dobët, çka lëndon kompanitë që varen nga blerësit evropianë.',
          effects: [
            {
              subject: 'Shitjet me pakicë',
              outcome: 'Presion',
              tone: 'negative',
            },
            {
              subject: 'Aksionet evropiane',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Rriten',
              tone: 'neutral',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Sondazhet matin ndjenjën, jo veprimin. Konsumatorët evropianë kanë raportuar pesimizëm ndërsa vazhdonin të shpenzonin, ndaj kjo shifër ndiqet së bashku me shitjet reale.',
        },
      },
    },
    history: {
      sq: {
        heading: 'Katër muajt e fundit',
        note: 'Indeksi i besimit, ku zero do të thotë optimistë sa pesimistë.',
        entries: [
          {
            period: 'Maj 2026',
            actual: '−15.1',
            expected: '−14.8',
            surprise: '−0.3',
            surpriseDirection: 'above',
            value: 15.1,
          },
          {
            period: 'Qershor 2026',
            actual: '−14.6',
            expected: '−14.9',
            surprise: '+0.3',
            surpriseDirection: 'below',
            value: 14.6,
          },
          {
            period: 'Korrik 2026',
            actual: '−13.9',
            expected: '−14.3',
            surprise: '+0.4',
            surpriseDirection: 'below',
            value: 13.9,
          },
          {
            period: 'Gusht 2026',
            actual: '−14.2',
            expected: '−13.8',
            surprise: '−0.4',
            surpriseDirection: 'above',
            value: 14.2,
          },
        ],
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Komisioni Evropian' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Mbulon', value: 'Gusht 2026' },
        { label: 'Rishikimet', value: 'Të zakonshme' },
        { label: 'Lëviz më shumë', value: 'Aksionet e konsumit' },
      ],
    },
    reactingSymbols: ['stoxx-600', 'eur-usd'],
    lessonSlugs: ['how-to-read-the-economic-calendar'],
  },
  {
    slug: 'us-existing-home-sales-july',
    region: 'US',
    impact: 'low',
    time: '16:00',
    releasesAt: '2026-08-21T16:00:00Z',
    expected: '4.02m',
    previous: '3.96m',
    title: {
      sq: 'Shitjet e banesave ekzistuese, korrik',
    },
    regionName: REGION_NAMES.US,
    shortName: { sq: 'Shitjet e banesave' },
    cadence: CADENCE.monthlyLow,
    summary: {
      sq: 'Sa banesa të përdorura u shitën në SHBA muajin e kaluar, të shprehura si ritëm vjetor.',
    },
    nextReleaseDate: { sq: '22 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Pse tregu i banesave ndiqet nga afër',
        paragraphs: [
          'Blerja e një shtëpie është vendimi më i madh financiar i shumicës së familjeve, dhe ai varet drejtpërdrejt nga normat e kredisë. Kur shitjet ngadalësohen, kjo zakonisht do të thotë se huamarrja është bërë shumë e shtrenjtë.',
          'Shitjet gjithashtu tërheqin shpenzime të tjera: mobilje, riparime, sigurime. Prandaj një treg i ngadaltë banesash ndihet përtej vetë ndërtimit.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më shumë shitje se pritej',
          verdict: 'Ekonomi më e fortë',
          body: 'Më shumë transaksione sugjerojnë se familjet ndihen të sigurta dhe se normat nuk po i pengojnë ende.',
          effects: [
            {
              subject: 'Ndërtuesit e banesave',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Shitësit me pakicë',
              outcome: 'Mbështetje',
              tone: 'positive',
            },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Bien',
              tone: 'neutral',
            },
          ],
        },
        lower: {
          label: 'Më pak shitje se pritej',
          verdict: 'Normat po morden',
          body: 'Shitjet e dobëta zakonisht do të thotë se kreditë e banesave janë shumë të shtrenjta, çka ngadalëson një pjesë të madhe të ekonomisë.',
          effects: [
            {
              subject: 'Ndërtuesit e banesave',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Shitësit me pakicë',
              outcome: 'Presion',
              tone: 'negative',
            },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Rriten',
              tone: 'neutral',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Shitjet e banesave regjistrohen në mbyllje, që ndodh një deri në dy muaj pas marrëveshjes. Kjo shifër ju tregon si ishte tregu në qershor, jo sot.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'NAR' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Mbulon', value: 'Korrik 2026' },
        { label: 'Rishikimet', value: 'Të zakonshme' },
        { label: 'Lëviz më shumë', value: 'Ndërtuesit, bankat' },
      ],
    },
    reactingSymbols: ['sp-500', 'dow-jones'],
    lessonSlugs: ['what-moves-interest-rates'],
  },
  {
    slug: 'fed-speech-governor-waller',
    region: 'US',
    impact: 'medium',
    time: '19:00',
    releasesAt: '2026-08-21T19:00:00Z',
    title: {
      sq: 'Fjalim i Fed-it · Guvernatori Waller',
    },
    regionName: REGION_NAMES.US,
    shortName: { sq: 'Fjalim i Fed-it' },
    cadence: CADENCE.scheduledMedium,
    summary: {
      sq: 'Një fjalim publik nga një anëtar i Bordit të Rezervës Federale, i ndjekur për sinjale mbi normat e ardhshme.',
    },
    explainer: {
      sq: {
        heading: 'Pse një fjalim lëviz tregje',
        paragraphs: [
          'Fed-i vendos me votë, por përgatit terrenin me fjalë. Fjalimet mes mbledhjeve janë mënyra se si anëtarët individualë tregojnë se ku po anon mendimi i tyre.',
          'Tregtarët nuk dëgjojnë të gjithë fjalimin. Ata kërkojnë ndryshime në mbiemra: “i durueshëm” kundrejt “vigjilent”, “gradual” kundrejt “i matur”.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Ton më i ashpër',
          verdict: 'Normat qëndrojnë të larta',
          body: 'Nëse folësi thekson rreziqet e inflacionit, tregjet i shtyjnë më larg pritjet për ulje normash.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Rriten',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Forcohet',
              tone: 'neutral',
            },
          ],
        },
        lower: {
          label: 'Ton më i butë',
          verdict: 'Uljet vijnë më shpejt',
          body: 'Nëse folësi shpreh besim se inflacioni po ftohet, tregjet fillojnë të çmojnë ulje më të hershme.',
          effects: [
            {
              subject: 'Aksionet',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Bien',
              tone: 'neutral',
            },
            {
              subject: 'Dollari amerikan',
              outcome: 'Dobësohet',
              tone: 'neutral',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Një guvernator i vetëm nuk është i gjithë komiteti. Fjalimet ndonjëherë tregojnë një pikëpamje pakice, dhe tregu e kupton këtë vetëm ditë më vonë.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Folësi', value: 'Guvernatori Waller' },
        { label: 'Frekuenca', value: 'Sipas nevojës' },
        { label: 'Format', value: 'Fjalim dhe pyetje' },
        { label: 'Publikohet teksti', value: 'Po' },
        { label: 'Lëviz më shumë', value: 'Obligacionet, dollari' },
      ],
    },
    reactingSymbols: ['sp-500', 'nasdaq-100', 'eur-usd'],
    lessonSlugs: ['what-central-banks-do', 'what-moves-interest-rates'],
  },
  {
    slug: 'de-ifo-business-climate-august',
    region: 'DE',
    impact: 'medium',
    time: '10:00',
    releasesAt: '2026-08-24T10:00:00Z',
    expected: '88.4',
    previous: '87.9',
    title: {
      sq: 'Indeksi Ifo i klimës së biznesit, gusht',
    },
    regionName: REGION_NAMES.DE,
    shortName: { sq: 'Indeksi Ifo' },
    cadence: CADENCE.monthlyMedium,
    summary: {
      sq: 'Një sondazh i rreth 9.000 firmave gjermane mbi gjendjen aktuale të biznesit dhe pritjet për muajt e ardhshëm.',
    },
    nextReleaseDate: { sq: '24 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Pse ka rëndësi Gjermania',
        paragraphs: [
          'Gjermania është ekonomia më e madhe e eurozonës dhe zemra e prodhimit të saj. Kur firmat gjermane ndihen pesimiste, kjo shpesh paraprin ngadalësim në të gjithë bllokun.',
          'Ifo ndahet në dy pjesë: si po shkon biznesi tani, dhe si pritet të shkojë. Pjesa e dytë është ajo që ndjekin tregjet.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më i lartë se pritej',
          verdict: 'Prodhimi po stabilizohet',
          body: 'Firma më optimiste priren të investojnë dhe të punësojnë, çka mbështet rritjen në të gjithë eurozonën.',
          effects: [
            {
              subject: 'Aksionet gjermane',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            { subject: 'Euroja', outcome: 'Forcohet', tone: 'neutral' },
            {
              subject: 'Aksionet industriale',
              outcome: 'Mbështetje',
              tone: 'positive',
            },
          ],
        },
        lower: {
          label: 'Më i ulët se pritej',
          verdict: 'Prodhimi ende i dobët',
          body: 'Pesimizmi i vazhdueshëm i firmave sugjeron investime dhe punësim më të ulët, çka rëndon mbi rritjen evropiane.',
          effects: [
            {
              subject: 'Aksionet gjermane',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            { subject: 'Euroja', outcome: 'Dobësohet', tone: 'neutral' },
            {
              subject: 'Pritjet për ulje normash',
              outcome: 'Rriten',
              tone: 'neutral',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Ifo është sondazh, jo matje e prodhimit real. Firmat kanë raportuar pesimizëm gjatë periudhash kur prodhimi mbeti i qëndrueshëm.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Instituti Ifo' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Kampioni', value: 'rreth 9.000 firma' },
        { label: 'Rishikimet', value: 'Të rralla' },
        { label: 'Lëviz më shumë', value: 'DAX, euro' },
      ],
    },
    reactingSymbols: ['stoxx-600', 'eur-usd'],
    lessonSlugs: ['how-to-read-the-economic-calendar'],
  },
  {
    slug: 'us-durable-goods-orders-july',
    region: 'US',
    impact: 'low',
    time: '14:30',
    releasesAt: '2026-08-24T14:30:00Z',
    expected: '0.4%',
    previous: '−0.2%',
    title: {
      sq: 'Porositë për mallra të qëndrueshme, korrik',
    },
    regionName: REGION_NAMES.US,
    shortName: { sq: 'Mallrat e qëndrueshme' },
    cadence: CADENCE.monthlyLow,
    summary: {
      sq: 'Porositë e reja për mallra që zgjasin të paktën tre vjet — makineri, avionë, pajisje.',
    },
    nextReleaseDate: { sq: '25 shtator 2026' },
    explainer: {
      sq: {
        heading: 'Pse “i qëndrueshëm” është fjala kyçe',
        paragraphs: [
          'Një kompani blen një makineri të re vetëm kur pret të ketë punë për vite. Prandaj këto porosi lexohen si votë besimi për të ardhmen, jo si shpenzim rutinë.',
          'Shifra kryesore luhatet shumë sepse një porosi e vetme avionësh mund ta ndryshojë atë. Analistët shikojnë versionin që heq transportin.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Më shumë porosi se pritej',
          verdict: 'Bizneset po investojnë',
          body: 'Porositë e forta sugjerojnë se kompanitë presin kërkesë të vazhdueshme, çka mbështet punësimin dhe rritjen.',
          effects: [
            {
              subject: 'Aksionet industriale',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Rriten',
              tone: 'neutral',
            },
            {
              subject: 'Pritjet për recesion',
              outcome: 'Bien',
              tone: 'positive',
            },
          ],
        },
        lower: {
          label: 'Më pak porosi se pritej',
          verdict: 'Bizneset po presin',
          body: 'Porositë e dobëta shpesh janë sinjali i parë se kompanitë po shtyjnë investimet, çka paraprin ngadalësim më të gjerë.',
          effects: [
            {
              subject: 'Aksionet industriale',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Yield-et e obligacioneve',
              outcome: 'Bien',
              tone: 'neutral',
            },
            {
              subject: 'Pritjet për recesion',
              outcome: 'Rriten',
              tone: 'negative',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Porositë e avionëve grumbullohen në muaj të veçantë. Një shifër kryesore prej +12% ose −9% shpesh nuk tregon asgjë për ekonominë e gjerë.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Byroja e Regjistrimit' },
        { label: 'Frekuenca', value: 'Mujore' },
        { label: 'Mbulon', value: 'Korrik 2026' },
        { label: 'Rishikimet', value: 'Të mëdha' },
        { label: 'Lëviz më shumë', value: 'Aksionet industriale' },
      ],
    },
    reactingSymbols: ['dow-jones', 'sp-500'],
    lessonSlugs: ['how-to-read-the-economic-calendar'],
  },
  {
    slug: 'bank-of-japan-meeting-minutes',
    region: 'JP',
    impact: 'low',
    time: '01:50',
    releasesAt: '2026-08-24T01:50:00Z',
    title: {
      sq: 'Procesverbali i mbledhjes së Bankës së Japonisë',
    },
    regionName: REGION_NAMES.JP,
    shortName: { sq: 'Procesverbali i BoJ-së' },
    cadence: CADENCE.scheduledLow,
    summary: {
      sq: 'Shënimet e detajuara nga mbledhja e fundit e politikës së Bankës së Japonisë, të publikuara me vonesë disa javësh.',
    },
    explainer: {
      sq: {
        heading: 'Pse Japonia ka rëndësi për të tjerët',
        paragraphs: [
          'Japonia i mbajti normat pranë zeros për dekada, çka e bëri jenin valutën më të lirë për të huazuar. Investitorë në mbarë botën huazuan në jen për të blerë aktive diku tjetër.',
          'Kur BoJ-ja sinjalizon ndryshim, ato pozicione zhbëhen — dhe kjo mund të lëvizë tregje shumë larg nga Tokio.',
        ],
      },
    },
    directions: {
      sq: {
        higher: {
          label: 'Ton më i ashpër në procesverbal',
          verdict: 'Jeni forcohet',
          body: 'Nëse anëtarët diskutojnë normalizimin e politikës, jeni forcohet dhe pozicionet e huazuara në jen bëhen më të shtrenjta për t’u mbajtur.',
          effects: [
            { subject: 'Jeni japonez', outcome: 'Forcohet', tone: 'neutral' },
            {
              subject: 'Aksionet japoneze',
              outcome: 'Zakonisht bien',
              tone: 'negative',
            },
            {
              subject: 'Aktivet globale me rrezik',
              outcome: 'Presion',
              tone: 'negative',
            },
          ],
        },
        lower: {
          label: 'Ton më i butë në procesverbal',
          verdict: 'Status quo-ja vazhdon',
          body: 'Nëse anëtarët mbeten të kujdesshëm, huamarrja e lirë në jen vazhdon dhe tregjet globale mbeten të mbështetura.',
          effects: [
            { subject: 'Jeni japonez', outcome: 'Dobësohet', tone: 'neutral' },
            {
              subject: 'Aksionet japoneze',
              outcome: 'Zakonisht rriten',
              tone: 'positive',
            },
            {
              subject: 'Aktivet globale me rrezik',
              outcome: 'Mbështetje',
              tone: 'positive',
            },
          ],
        },
        caveat: {
          heading: 'Kapja',
          body: 'Procesverbali publikohet javë pas mbledhjes. Shumica e përmbajtjes së tij tashmë është marrë me mend nga tregjet, prandaj ndikimi është zakonisht i vogël.',
        },
      },
    },
    atAGlance: {
      sq: [
        { label: 'Publikuar nga', value: 'Banka e Japonisë' },
        { label: 'Frekuenca', value: 'Pas çdo mbledhjeje' },
        { label: 'Vonesa', value: 'rreth 4 javë' },
        { label: 'Rishikimet', value: 'Asnjëherë' },
        { label: 'Lëviz më shumë', value: 'Jeni' },
      ],
    },
    lessonSlugs: ['what-central-banks-do'],
  },
];

const resolve = (event: SeedEvent, locale: Locale): EventDetail => ({
  slug: event.slug,
  title: event.title[locale],
  region: event.region,
  regionName: event.regionName[locale],
  shortName: event.shortName[locale],
  impact: event.impact,
  cadence: event.cadence[locale],
  summary: event.summary[locale],
  time: event.time,
  releasesAt: event.releasesAt,
  expected: event.expected ?? null,
  previous: event.previous ?? null,
  actual: event.actual ?? null,
  ...(event.benchmark
    ? {
        benchmark: {
          label: event.benchmark.label[locale],
          value: event.benchmark.value,
        },
      }
    : {}),
  ...(event.nextReleaseDate
    ? { nextReleaseDate: event.nextReleaseDate[locale] }
    : {}),
  ...(event.explainer ? { explainer: event.explainer[locale] } : {}),
  ...(event.directions ? { directions: event.directions[locale] } : {}),
  ...(event.history ? { history: event.history[locale] } : {}),
  ...(event.howToRead ? { howToRead: event.howToRead[locale] } : {}),
  ...(event.atAGlance ? { atAGlance: event.atAGlance[locale] } : {}),
  ...(event.reactingSymbols ? { reactingSymbols: event.reactingSymbols } : {}),
  ...(event.lessonSlugs ? { lessonSlugs: event.lessonSlugs } : {}),
});

export const getEventDetail = (
  locale: Locale,
  slug: string,
): EventDetail | null => {
  const event = EVENTS.find((entry) => entry.slug === slug);
  return event ? resolve(event, locale) : null;
};

/**
 * Falls back to a page built from a calendar row, for any event added to the
 * calendar before its explainer is written. Every link out of the table
 * therefore resolves — the page simply shows fewer sections.
 */
export function detailFromEvent(
  event: CalendarEvent,
  regionName: string,
  cadence: string,
  releasesAt: string,
): EventDetail {
  return {
    slug: event.slug,
    title: event.title,
    region: event.region,
    regionName,
    shortName: event.title,
    impact: event.impact,
    cadence,
    summary: '',
    time: event.time,
    releasesAt,
    expected: event.expected,
    previous: event.previous,
    actual: event.actual,
  };
}
