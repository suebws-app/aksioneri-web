import type { Locale } from '@/i18n/config';
import type { Localized, NewsArticle, NewsCategory } from './newsTypes';

/**
 * Seed newsroom content taken from the design.
 *
 * Both languages are carried here because a real endpoint would resolve them
 * from the reader's `preferredLanguage`. Ticker symbols and percentages are not
 * localised — they are market data, identical everywhere.
 */

interface SeedArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title: Localized<string>;
  summary: Localized<string>;
  minutesAgo: number;
  readingMinutes: number;
  ticker?: { symbol: string; changePercent: number };
  whyItMatters?: Localized<string>;
  body?: Localized<string[]>;
  author?: { name: string; desk: Localized<string>; initials: string };
  publishedAt?: string;
  heroCaption?: Localized<string>;
  sections?: Localized<{ heading: string; paragraphs: string[] }[]>;
  inNumbers?: {
    value: string;
    label: Localized<string>;
    tone?: 'positive' | 'neutral';
  }[];
  pullQuote?: Localized<{ quote: string; attribution: string }>;
  terms?: Localized<{ term: string; definition: string }[]>;
  mentionedSymbols?: string[];
  relatedEventSlug?: string;
  relatedLessonSlug?: string;
}

const ARTICLES: SeedArticle[] = [
  {
    id: 'fed-signals',
    slug: 'markets-rally-as-investors-read-new-fed-signals',
    category: 'macro',
    minutesAgo: 32,
    readingMinutes: 4,
    title: {
      sq: 'Tregjet ngjiten teksa investitorët lexojnë sinjalet e reja të Fed-it',
      en: 'Markets rally as investors read new Fed signals',
    },
    summary: {
      sq: 'Aksionet amerikane u ngritën pasi komentet e reja të Rezervës Federale ndryshuan pritshmëritë e investitorëve për normat e interesit këtë vit.',
      en: 'US stocks moved higher after new Federal Reserve comments changed what investors expect interest rates to do this year.',
    },
    whyItMatters: {
      sq: 'Norma më të ulëta interesi e bëjnë huamarrjen më të lirë. Kjo priret t’i ndihmojë më shumë kompanitë me rritje të shpejtë, sepse fitimet e tyre janë më larg në të ardhmen.',
      en: 'Lower interest rates make borrowing cheaper. That tends to help fast-growing companies most, because their profits sit further in the future.',
    },
    body: {
      sq: [
        'Aksionet amerikane mbyllën më lart të premten, pasi zyrtarët e Rezervës Federale sinjalizuan se ndihen më të qetë me rrugën që po ndjek inflacioni. S&P 500 e mbylli sesionin me rritje prej 0.82%, ndërsa Nasdaq 100, i ngarkuar me teknologji, shtoi 1.14%.',
        'Lëvizja nuk u nxit nga një kompani e vetme. Përkundrazi, investitorët rregulluan pritshmëritë e tyre për normat e interesit — çmimin e huamarrjes në të gjithë ekonominë — dhe kjo riçmoi gati gjithçka njëherësh.',
      ],
      en: [
        'US shares closed higher on Friday after Federal Reserve officials signalled they are more comfortable with the path inflation is taking. The S&P 500 finished the session up 0.82%, while the technology-heavy Nasdaq 100 gained 1.14%.',
        'The move was not driven by any single company. Instead, investors adjusted their expectations for interest rates — the price of borrowing money across the whole economy — and that repriced almost everything at once.',
      ],
    },
    author: {
      name: 'Elira Meta',
      initials: 'EM',
      desk: { sq: 'Redaksia e tregjeve', en: 'Markets desk' },
    },
    publishedAt: '2026-08-21T16:10:00Z',
    heroCaption: {
      sq: 'Tregtarë në sallën e bursës në Nju-Jork teksa indekset kthehen në rritje.',
      en: 'Traders on the floor in New York as indices turned higher.',
    },
    sections: {
      sq: [
        {
          heading: 'Çfarë ndryshoi në të vërtetë',
          paragraphs: [
            'Para së premtes, shumica e investitorëve prisnin një ulje të normës para fundit të vitit. Pas komenteve, tregjet e së ardhmes filluan të çmojnë dy. Asgjë nuk është vendosur — Fed-i nuk ka votuar — por pritshmëritë ndryshuan, dhe tregjet tregtojnë mbi pritshmëri.',
          ],
        },
        {
          heading: 'Çfarë të ndiqet më pas',
          paragraphs: [
            'Testi i vërtetë i radhës është shifra e inflacionit amerikan javën e ardhshme. Ekonomistët presin 3.1%, nga 3.2%. Një shifër më e butë do të mbështeste pikëpamjen e dy uljeve; një më e nxehtë ka gjasa të zhbënte një pjesë të lëvizjes së së premtes.',
            'Për investitorët afatgjatë, sesionet e vetme si ky kanë më pak rëndësi sesa drejtimi i normave gjatë vitit që vjen — dhe ajo histori është ende duke u shkruar.',
          ],
        },
      ],
      en: [
        {
          heading: 'What actually changed',
          paragraphs: [
            'Before Friday, most investors expected one interest-rate cut before the end of the year. After the comments, futures markets moved to price in two. Nothing has been decided — the Fed has not voted — but expectations shifted, and markets trade on expectations.',
          ],
        },
        {
          heading: 'What to watch next',
          paragraphs: [
            'The next real test is next week’s US inflation reading. Economists expect 3.1%, down from 3.2%. A softer number would support the two-cut view; a hotter one would likely unwind part of Friday’s move.',
            'For long-term investors, single sessions like this matter less than the direction of rates over the coming year — and that story is still being written.',
          ],
        },
      ],
    },
    inNumbers: [
      {
        value: '+0.82%',
        tone: 'positive',
        label: { sq: 'S&P 500 gjatë ditës', en: 'S&P 500 on the day' },
      },
      {
        value: '+1.14%',
        tone: 'positive',
        label: { sq: 'Nasdaq 100 gjatë ditës', en: 'Nasdaq 100 on the day' },
      },
      {
        value: '2',
        label: {
          sq: 'ulje normash tashmë të çmuara për 2026',
          en: 'rate cuts now priced in for 2026',
        },
      },
      {
        value: '3.1%',
        label: {
          sq: 'inflacioni i pritur javën e ardhshme',
          en: 'inflation expected next week',
        },
      },
    ],
    pullQuote: {
      sq: {
        quote:
          'Asgjë nuk ndryshoi te ekonomia të premten. Ajo që ndryshoi është çfarë mendojnë njerëzit se do të bëjë Fed-i për të.',
        attribution: 'Marta Kovaci · strategiste normash',
      },
      en: {
        quote:
          'Nothing about the economy changed on Friday. What changed is what people think the Fed will do about it.',
        attribution: 'Marta Kovaci · rates strategist',
      },
    },
    terms: {
      sq: [
        {
          term: 'E çmuar tashmë',
          definition:
            'Tashmë e reflektuar në çmimet e sotme, prandaj nuk e lëviz më tregun kur ndodh.',
        },
        {
          term: 'E ndjeshme ndaj normave',
          definition:
            'Aktive vlera e të cilave luhatet shumë kur ndryshojnë pritshmëritë për normat e interesit.',
        },
        {
          term: 'Sektor mbrojtës',
          definition:
            'Industri për të cilat njerëzit vazhdojnë të shpenzojnë në çdo ekonomi, si ushqimi ose energjia.',
        },
      ],
      en: [
        {
          term: 'Priced in',
          definition:
            'Already reflected in today’s prices, so it no longer moves the market when it happens.',
        },
        {
          term: 'Rate-sensitive',
          definition:
            'Assets whose value swings a lot when interest-rate expectations change.',
        },
        {
          term: 'Defensive sector',
          definition:
            'Industries people keep spending on in any economy, such as food or electricity.',
        },
      ],
    },
    mentionedSymbols: ['sp-500', 'nasdaq-100'],
    relatedEventSlug: 'us-inflation-cpi-july',
    relatedLessonSlug: 'what-moves-interest-rates',
  },
  {
    id: 'euro-inflation',
    slug: 'euro-zone-inflation-cools-to-1-9-percent',
    category: 'europe',
    minutesAgo: 60,
    readingMinutes: 3,
    ticker: { symbol: 'STOXX', changePercent: 0.58 },
    title: {
      sq: 'Inflacioni në eurozonë ftohet në 1.9%, duke hapur rrugën për një ulje të BQE-së',
      en: 'Euro-zone inflation cools to 1.9%, opening the door to an ECB cut',
    },
    summary: {
      sq: 'Çmimet në eurozonë u rritën më ngadalë se objektivi i Bankës Qendrore Evropiane për herë të parë në dy vjet.',
      en: 'Prices across the euro area rose more slowly than the European Central Bank’s target for the first time in two years.',
    },
    whyItMatters: {
      sq: 'Objektivi i BQE-së është 2%. Të biesh nën të është sinjali që banka pret para se t’i ulë normat — dhe norma më të ulëta prekin çdo kredi banese dhe çdo llogari kursimi në bllok.',
      en: 'The ECB’s target is 2%. Falling below it is the signal the bank waits for before cutting rates — and lower rates reach every mortgage and every savings account in the bloc.',
    },
    author: {
      name: 'Dritan Hoxha',
      initials: 'DH',
      desk: { sq: 'Redaksia evropiane', en: 'Europe desk' },
    },
    publishedAt: '2026-08-21T15:20:00Z',
    heroCaption: {
      sq: 'Selia e Bankës Qendrore Evropiane në Frankfurt.',
      en: 'The European Central Bank’s headquarters in Frankfurt.',
    },
    body: {
      sq: [
        'Inflacioni vjetor në eurozonë ra në 1.9% në gusht, nga 2.2% një muaj më parë, sipas vlerësimit paraprak të Eurostat. Kjo është hera e parë që shifra bie nën objektivin 2% të Bankës Qendrore Evropiane që nga viti 2024.',
        'Ftohja erdhi kryesisht nga energjia, ku çmimet ishin 3.4% më të ulëta se një vit më parë. Inflacioni bazë — që heq energjinë dhe ushqimin — mbeti më kokëfortë, në 2.4%.',
      ],
      en: [
        'Annual euro-area inflation fell to 1.9% in August, down from 2.2% a month earlier, according to Eurostat’s flash estimate. It is the first time the figure has dropped below the European Central Bank’s 2% target since 2024.',
        'The cooling came mostly from energy, where prices were 3.4% lower than a year ago. Core inflation — which strips out energy and food — stayed more stubborn, at 2.4%.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse ka rëndësi shifra bazë',
          paragraphs: [
            'Çmimet e energjisë luhaten me ngjarje që asnjë bankë qendrore nuk i kontrollon. Prandaj BQE-ja shikon inflacionin bazë për të gjykuar nëse presioni mbi çmimet po zbutet vërtet apo thjesht po fshihet pas naftës më të lirë.',
            'Me bazën ende mbi 2.4%, argumenti për ulje të shpejta normash është më i dobët sesa duket shifra kryesore.',
          ],
        },
        {
          heading: 'Çfarë pritet të bëjë BQE-ja',
          paragraphs: [
            'Tregjet e së ardhmes tani çmojnë një ulje prej 25 pikësh bazë në mbledhjen e ardhshme, nga rreth 60% mundësi para publikimit. Vendimi pritet të premten.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why the core number matters',
          paragraphs: [
            'Energy prices swing on events no central bank controls. That is why the ECB watches core inflation to judge whether price pressure is genuinely easing, or merely hiding behind cheaper oil.',
            'With core still above 2.4%, the case for quick rate cuts is weaker than the headline figure suggests.',
          ],
        },
        {
          heading: 'What the ECB is expected to do',
          paragraphs: [
            'Futures markets now price a 25 basis-point cut at the next meeting, up from roughly a 60% chance before the release. The decision is due on Friday.',
          ],
        },
      ],
    },
    inNumbers: [
      {
        value: '1.9%',
        tone: 'positive',
        label: {
          sq: 'inflacioni kryesor, gusht',
          en: 'headline inflation, August',
        },
      },
      {
        value: '2.4%',
        label: { sq: 'inflacioni bazë, gusht', en: 'core inflation, August' },
      },
      {
        value: '−3.4%',
        tone: 'positive',
        label: {
          sq: 'çmimet e energjisë, vit-mbi-vit',
          en: 'energy prices, year on year',
        },
      },
      {
        value: '2.0%',
        label: { sq: 'objektivi i BQE-së', en: 'the ECB’s target' },
      },
    ],
    terms: {
      sq: [
        {
          term: 'Vlerësim paraprak',
          definition:
            'Shifra e parë e shpejtë, e publikuar para të dhënave përfundimtare dhe ndonjëherë e rishikuar.',
        },
        {
          term: 'Inflacioni bazë',
          definition:
            'Inflacioni pa energjinë dhe ushqimin, të cilat luhaten shumë nga muaji në muaj.',
        },
        {
          term: 'Pikë bazë',
          definition:
            'Një e qindta e një përqindjeje. Një ulje prej 25 pikësh bazë është 0.25%.',
        },
      ],
      en: [
        {
          term: 'Flash estimate',
          definition:
            'The first quick figure, published ahead of final data and sometimes revised.',
        },
        {
          term: 'Core inflation',
          definition:
            'Inflation excluding energy and food, which swing sharply month to month.',
        },
        {
          term: 'Basis point',
          definition:
            'One hundredth of a percent. A 25 basis-point cut is 0.25%.',
        },
      ],
    },
    mentionedSymbols: ['stoxx-600', 'eur-usd'],
    relatedEventSlug: 'ecb-interest-rate-decision',
    relatedLessonSlug: 'inflation-in-one-page',
  },
  {
    id: 'bitcoin-etf',
    slug: 'bitcoin-slips-below-99000-as-etf-inflows-pause',
    category: 'crypto',
    minutesAgo: 120,
    readingMinutes: 2,
    ticker: { symbol: 'BTC', changePercent: -1.42 },
    title: {
      sq: 'Bitcoin zbret nën 99.000 dollarë teksa fluksi në ETF-të ndalet',
      en: 'Bitcoin slips below $99,000 as ETF inflows pause',
    },
    summary: {
      sq: 'Paratë e reja që hynin në fondet e Bitcoin-it u ngadalësuan këtë javë, duke hequr një mbështetje të rëndësishme për çmimin.',
      en: 'New money flowing into Bitcoin funds slowed this week, removing an important support for the price.',
    },
    whyItMatters: {
      sq: 'Që kur u miratuan ETF-të e Bitcoin-it, çmimi ka ndjekur nga afër fluksin e parave në to. Kur ai flukse ndalet, largohet blerësi më i madh dhe më i parashikueshëm i tregut.',
      en: 'Since Bitcoin ETFs were approved, the price has tracked money flowing into them closely. When that flow stops, the market’s largest and most predictable buyer steps away.',
    },
    author: {
      name: 'Arta Berisha',
      initials: 'AB',
      desk: { sq: 'Redaksia e kriptove', en: 'Crypto desk' },
    },
    publishedAt: '2026-08-21T14:40:00Z',
    heroCaption: {
      sq: 'Çmimi i Bitcoin-it ra nën 99.000 dollarë për herë të parë këtë muaj.',
      en: 'Bitcoin fell below $99,000 for the first time this month.',
    },
    body: {
      sq: [
        'Bitcoin ra 1.4% në 98.240 dollarë të premten, duke zbritur nën 99.000 dollarë për herë të parë këtë muaj. Rënia erdhi pasi fondet spot të Bitcoin-it në SHBA regjistruan tri ditë radhazi pa fluks neto hyrës.',
        'Ky ndryshim është i rëndësishëm sepse blerja nga ETF-të ka qenë burimi kryesor i kërkesës së re këtë vit. Kur ajo ndalet, çmimi mbetet të mbahet nga tregtarët ekzistues.',
      ],
      en: [
        'Bitcoin fell 1.4% to $98,240 on Friday, dropping below $99,000 for the first time this month. The decline followed three consecutive days without net inflows into US spot Bitcoin funds.',
        'The shift matters because ETF buying has been the main source of fresh demand this year. When it stops, the price is left to existing traders to hold up.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Çfarë do të thotë “fluks hyrës”',
          paragraphs: [
            'Kur dikush blen një aksion të një ETF-je të Bitcoin-it, fondi duhet të blejë Bitcoin real për ta mbështetur atë. Prandaj fluksi hyrës është kërkesë e drejtpërdrejtë blerëse, jo thjesht sentiment.',
            'Fluksi dalës funksionon në të kundërt: fondi shet Bitcoin për të përmbushur shlyerjet, çka shton presion mbi çmimin.',
          ],
        },
      ],
      en: [
        {
          heading: 'What an “inflow” actually means',
          paragraphs: [
            'When someone buys a share of a Bitcoin ETF, the fund has to buy real Bitcoin to back it. That makes inflows direct buying demand, not merely sentiment.',
            'Outflows work in reverse: the fund sells Bitcoin to meet redemptions, adding pressure to the price.',
          ],
        },
      ],
    },
    mentionedSymbols: ['bitcoin'],
    relatedLessonSlug: 'what-is-an-etf',
  },
  {
    id: 'oil-opec',
    slug: 'oil-steadies-after-opec-holds-output-unchanged',
    category: 'commodities',
    minutesAgo: 180,
    readingMinutes: 3,
    title: {
      sq: 'Nafta stabilizohet pasi OPEC+ mban prodhimin të pandryshuar',
      en: 'Oil steadies after OPEC+ holds output unchanged',
    },
    summary: {
      sq: 'Grupi i prodhuesve vendosi të mos ndryshojë sasinë e naftës që nxjerr, duke qetësuar tregun pas javësh luhatjesh.',
      en: 'The producer group chose not to change how much oil it pumps, calming the market after weeks of swings.',
    },
    whyItMatters: {
      sq: 'Nafta hyn në çmimin e gati çdo gjëje që transportohet. Një treg i qetë nafte i heq njërën nga forcat që e shtyjnë inflacionin lart pikërisht kur bankat qendrore duan ta shohin atë të bjerë.',
      en: 'Oil feeds into the price of almost everything that gets transported. A calm oil market removes one of the forces pushing inflation up, just when central banks want to see it fall.',
    },
    author: {
      name: 'Genti Krasniqi',
      initials: 'GK',
      desk: { sq: 'Redaksia e mallrave', en: 'Commodities desk' },
    },
    publishedAt: '2026-08-21T13:30:00Z',
    heroCaption: {
      sq: 'Një terminal naftësjellës në Gjirin Persik.',
      en: 'An oil terminal in the Persian Gulf.',
    },
    body: {
      sq: [
        'Nafta Brent u tregtua pak e ndryshuar rreth 74 dollarëve për fuçi pasi OPEC+ konfirmoi se do të mbajë kuotat e prodhimit të pandryshuara deri në fund të vitit.',
        'Vendimi ishte ai që prisnin shumica e analistëve, dhe pikërisht mungesa e surprizës e qetësoi tregun. Nafta kishte lëvizur me mbi 3% në secilën nga tri javët e fundit.',
      ],
      en: [
        'Brent crude traded little changed around $74 a barrel after OPEC+ confirmed it will keep production quotas unchanged through the end of the year.',
        'The decision was what most analysts expected, and it was precisely the absence of a surprise that settled the market. Oil had moved more than 3% in each of the past three weeks.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse ka rëndësi një vendim “pa ndryshim”',
          paragraphs: [
            'Tregjet i çmojnë paraprakisht rezultatet e pritura. Kur një takim përfundon ashtu siç pritej, çmimi lëviz pak — dhe kjo qetësi është vetë informacion për prodhuesit dhe blerësit që planifikojnë muajt e ardhshëm.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why a “no change” decision matters',
          paragraphs: [
            'Markets price expected outcomes in advance. When a meeting ends the way it was expected to, the price barely moves — and that calm is itself information for producers and buyers planning the months ahead.',
          ],
        },
      ],
    },
    relatedLessonSlug: 'inflation-in-one-page',
  },
  {
    id: 'nvidia-earnings',
    slug: 'nvidia-shares-rise-after-earnings',
    category: 'stocks',
    minutesAgo: 120,
    readingMinutes: 3,
    ticker: { symbol: 'NVDA', changePercent: 4.8 },
    title: {
      sq: 'Aksionet e NVIDIA-s ngjiten pas rezultateve',
      en: 'NVIDIA shares rise after earnings',
    },
    summary: {
      sq: 'NVIDIA raportoi rezultate më të forta se pritshmëritë e analistëve, teksa kërkesa për çipat e qendrave të të dhënave mbeti e lartë.',
      en: 'NVIDIA reported stronger results than analysts expected, as demand for its data-centre chips stayed high.',
    },
    whyItMatters: {
      sq: 'NVIDIA është zotërimi i dytë më i madh i S&P 500. Kur ajo lëviz 5%, indeksi lëviz me të — edhe nëse asgjë tjetër nuk ka ndryshuar atë ditë.',
      en: 'NVIDIA is the second-largest holding in the S&P 500. When it moves 5%, the index moves with it — even if nothing else changed that day.',
    },
    author: {
      name: 'Elira Meta',
      initials: 'EM',
      desk: { sq: 'Redaksia e tregjeve', en: 'Markets desk' },
    },
    publishedAt: '2026-08-21T14:35:00Z',
    heroCaption: {
      sq: 'Një rrjesht serverësh në një qendër të dhënash.',
      en: 'A row of servers in a data centre.',
    },
    body: {
      sq: [
        'NVIDIA raportoi të ardhura tremujore prej 51.2 miliardë dollarësh, mbi parashikimin e analistëve prej 48.9 miliardësh. Aksionet u ngritën 4.8% pas publikimit.',
        'Divizioni i qendrave të të dhënave, që tani përbën më shumë se tre të katërtat e biznesit, u rrit 62% krahasuar me një vit më parë.',
      ],
      en: [
        'NVIDIA reported quarterly revenue of $51.2bn, above the $48.9bn analysts had forecast. Shares rose 4.8% after the release.',
        'The data-centre division, which now makes up more than three quarters of the business, grew 62% compared with a year earlier.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Udhëzimi ishte pjesa më e rëndësishme',
          paragraphs: [
            'Kompania parashikoi të ardhura prej rreth 55 miliardë dollarësh për tremujorin e ardhshëm, mbi pritshmëritë. Për aksionet e rritjes, ajo që kompania thotë se pret shpesh lëviz çmimin më shumë se ajo që sapo raportoi.',
          ],
        },
        {
          heading: 'Rreziku i përqendrimit',
          paragraphs: [
            'Një pjesë e madhe e të ardhurave vjen nga një grusht klientësh të mëdhenj cloud. Nëse ata ngadalësojnë shpenzimet, rritja bie shpejt — dhe kjo mbetet kritika kryesore e skeptikëve.',
          ],
        },
      ],
      en: [
        {
          heading: 'The guidance was the important part',
          paragraphs: [
            'The company forecast revenue of about $55bn for the coming quarter, above expectations. For growth shares, what a company says it expects often moves the price more than what it just reported.',
          ],
        },
        {
          heading: 'The concentration risk',
          paragraphs: [
            'A large share of revenue comes from a handful of big cloud customers. If they slow their spending, growth falls quickly — and that remains the sceptics’ main criticism.',
          ],
        },
      ],
    },
    inNumbers: [
      {
        value: '$51.2bn',
        tone: 'positive',
        label: { sq: 'të ardhurat tremujore', en: 'quarterly revenue' },
      },
      {
        value: '+62%',
        tone: 'positive',
        label: {
          sq: 'rritja e qendrave të të dhënave',
          en: 'data-centre growth',
        },
      },
      {
        value: '+4.8%',
        tone: 'positive',
        label: {
          sq: 'aksioni pas publikimit',
          en: 'share price after the release',
        },
      },
      {
        value: '6.5%',
        label: { sq: 'pesha në S&P 500', en: 'weight in the S&P 500' },
      },
    ],
    terms: {
      sq: [
        {
          term: 'Udhëzim',
          definition:
            'Parashikimi i vetë kompanisë për rezultatet e saj të ardhshme.',
        },
        {
          term: 'Të ardhura',
          definition: 'Paratë totale nga shitjet, para se të zbriten kostot.',
        },
        {
          term: 'Qendër të dhënash',
          definition:
            'Ndërtesa plot me serverë ku ekzekutohen shërbimet cloud dhe modelet e IA-së.',
        },
      ],
      en: [
        {
          term: 'Guidance',
          definition: 'A company’s own forecast for its next results.',
        },
        {
          term: 'Revenue',
          definition: 'Total money from sales, before costs are taken out.',
        },
        {
          term: 'Data centre',
          definition:
            'A building full of servers where cloud services and AI models run.',
        },
      ],
    },
    mentionedSymbols: ['nasdaq-100', 'sp-500'],
    relatedLessonSlug: 'reading-an-earnings-report',
  },
  {
    id: 'asml-guidance',
    slug: 'asml-lifts-guidance-on-strong-machine-orders',
    category: 'europe',
    minutesAgo: 180,
    readingMinutes: 3,
    ticker: { symbol: 'ASML', changePercent: 2.6 },
    title: {
      sq: 'ASML rrit parashikimin falë porosive të forta për makineri',
      en: 'ASML lifts guidance on strong machine orders',
    },
    summary: {
      sq: 'Prodhuesi holandez i pajisjeve për çipa tani pret shitje më të larta këtë vit, shenjë se prodhuesit e çipave po vazhdojnë të zgjerojnë kapacitetin.',
      en: 'The Dutch chip-equipment maker now expects higher sales this year, a sign chipmakers are still building capacity.',
    },
    whyItMatters: {
      sq: 'ASML shet makineritë pa të cilat nuk prodhohen çipat më të avancuar. Porositë e saj janë një sinjal i hershëm për atë që planifikon i gjithë sektori dy vjet përpara.',
      en: 'ASML sells the machines without which the most advanced chips cannot be made. Its order book is an early signal of what the whole sector is planning two years out.',
    },
    author: {
      name: 'Dritan Hoxha',
      initials: 'DH',
      desk: { sq: 'Redaksia evropiane', en: 'Europe desk' },
    },
    publishedAt: '2026-08-21T13:45:00Z',
    heroCaption: {
      sq: 'Një makineri litografie në fabrikën e ASML-së në Veldhoven.',
      en: 'A lithography machine at ASML’s Veldhoven plant.',
    },
    body: {
      sq: [
        'ASML rriti parashikimin e saj të shitjeve vjetore në rreth 32 miliardë euro, nga 30 miliardë më parë, pasi porositë e reja tejkaluan pritshmëritë për tremujorin e dytë radhazi.',
        'Aksionet u ngritën 2.6%, duke ndihmuar indeksin STOXX Europe 600 të mbyllë 0.58% më lart.',
      ],
      en: [
        'ASML raised its annual sales forecast to about €32bn, up from €30bn, after new orders beat expectations for a second consecutive quarter.',
        'Shares rose 2.6%, helping the STOXX Europe 600 index close 0.58% higher.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse porositë kanë më shumë rëndësi se shitjet',
          paragraphs: [
            'Një makineri e ASML-së merr rreth dy vjet nga porosia te dorëzimi. Prandaj libri i porosive tregon se ku e sheh industria kërkesën në 2028, jo sot.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why orders matter more than sales',
          paragraphs: [
            'An ASML machine takes roughly two years from order to delivery. That makes the order book a picture of where the industry sees demand in 2028, not today.',
          ],
        },
      ],
    },
    mentionedSymbols: ['stoxx-600'],
    relatedLessonSlug: 'reading-an-earnings-report',
  },
  {
    id: 'eth-staking',
    slug: 'ethereum-staking-rewards-fall-as-validator-queue-clears',
    category: 'crypto',
    minutesAgo: 240,
    readingMinutes: 4,
    ticker: { symbol: 'ETH', changePercent: -0.9 },
    title: {
      sq: 'Shpërblimet nga staking i Ethereum bien teksa radha e validatorëve pastrohet',
      en: 'Ethereum staking rewards fall as validator queue clears',
    },
    summary: {
      sq: 'Sa më shumë njerëz të bëjnë staking, aq më pak fiton secili — ja çfarë do të thotë kjo nëse mbani ETH.',
      en: 'More people staking means each staker earns a little less — here is what that means if you hold ETH.',
    },
    whyItMatters: {
      sq: 'Shpërblimi nga staking shpesh krahasohet me një normë interesi. Kur bie, ndryshon llogaria për këdo që mban ETH me pritjen e një kthimi të rregullt.',
      en: 'A staking reward is often compared to an interest rate. When it falls, the maths changes for anyone holding ETH expecting a steady return.',
    },
    author: {
      name: 'Arta Berisha',
      initials: 'AB',
      desk: { sq: 'Redaksia e kriptove', en: 'Crypto desk' },
    },
    publishedAt: '2026-08-21T12:30:00Z',
    heroCaption: {
      sq: 'Radha e validatorëve të Ethereum u pastrua për herë të parë që nga pranvera.',
      en: 'Ethereum’s validator queue cleared for the first time since spring.',
    },
    body: {
      sq: [
        'Shpërblimi vjetor nga staking i Ethereum ra nën 3% për herë të parë këtë vit, pasi radha e pritjes për t’u bërë validator u zbraz plotësisht.',
        'Shpërblimi totale ndahet mes të gjithë validatorëve aktivë. Kur numri i tyre rritet, secili merr një pjesë më të vogël.',
      ],
      en: [
        'The annual reward from staking Ethereum fell below 3% for the first time this year, after the waiting queue to become a validator emptied completely.',
        'The total reward is split among all active validators. When their number rises, each one receives a smaller share.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Çfarë është staking, shkurt',
          paragraphs: [
            'Bllokoni ETH për të ndihmuar në sigurimin e rrjetit, dhe rrjeti ju paguan për këtë. Është më afër një depozite me afat sesa një kursimi: paratë nuk janë të lira menjëherë dhe vlera e vetë ETH-së mund të bjerë.',
          ],
        },
        {
          heading: 'A duhet të ketë rëndësi për ju',
          paragraphs: [
            'Nëse mbani ETH afatgjatë, një ndryshim prej gjysmë pikë përqindjeje në shpërblim ka shumë më pak rëndësi sesa lëvizja e çmimit. Shpërblimi është shtesë, jo qëllimi kryesor.',
          ],
        },
      ],
      en: [
        {
          heading: 'What staking is, briefly',
          paragraphs: [
            'You lock up ETH to help secure the network, and the network pays you for it. It is closer to a fixed-term deposit than a savings account: the money is not instantly free, and the value of the ETH itself can fall.',
          ],
        },
        {
          heading: 'Whether it should matter to you',
          paragraphs: [
            'If you hold ETH for the long term, a half-percentage-point change in the reward matters far less than the price move. The reward is a supplement, not the main point.',
          ],
        },
      ],
    },
    relatedLessonSlug: 'risk-and-return',
  },
  {
    id: 'us-retail-sales',
    slug: 'us-retail-sales-beat-forecasts',
    category: 'economy',
    minutesAgo: 300,
    readingMinutes: 3,
    title: {
      sq: 'Shitjet me pakicë në SHBA tejkalojnë parashikimet, duke ftohur bisedat për recesion',
      en: 'US retail sales beat forecasts, cooling recession talk',
    },
    summary: {
      sq: 'Konsumatorët shpenzuan më shumë se pritej në korrik, çka sugjeron se ekonomia po mbahet më mirë sesa druheshin.',
      en: 'Shoppers spent more than expected in July, suggesting the economy is holding up better than feared.',
    },
    whyItMatters: {
      sq: 'Shpenzimi i konsumatorëve përbën rreth dy të tretat e ekonomisë amerikane. Kur ai mbahet, fitimet e kompanive mbahen me të — dhe bisedat për recesion zbehen.',
      en: 'Consumer spending makes up roughly two thirds of the US economy. When it holds up, company profits hold up with it — and recession talk fades.',
    },
    author: {
      name: 'Elira Meta',
      initials: 'EM',
      desk: { sq: 'Redaksia e tregjeve', en: 'Markets desk' },
    },
    publishedAt: '2026-08-21T11:20:00Z',
    heroCaption: {
      sq: 'Blerës në një qendër tregtare në Çikago.',
      en: 'Shoppers at a mall in Chicago.',
    },
    body: {
      sq: [
        'Shitjet me pakicë në SHBA u rritën 0.6% në korrik, dyfishi i parashikimit prej 0.3%. Shifra e qershorit u rishikua gjithashtu lart.',
        'Rritja ishte e gjerë: nëntë nga trembëdhjetë kategoritë raportuan shitje më të larta, me restorantet dhe tregtinë online në krye.',
      ],
      en: [
        'US retail sales rose 0.6% in July, double the 0.3% forecast. June’s figure was also revised upward.',
        'The gain was broad: nine of thirteen categories reported higher sales, led by restaurants and online retail.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse restorantet janë sinjali kyç',
          paragraphs: [
            'Ngrënia jashtë është një nga gjërat e para që familjet shkurtojnë kur ndihen të shtrënguara. Rritja e saj sugjeron se konsumatorët ende ndihen mjaftueshëm të sigurt.',
          ],
        },
        {
          heading: 'Ana tjetër e medaljes',
          paragraphs: [
            'Shpenzimi i fortë e bën gjithashtu më të vështirë për Fed-in të justifikojë ulje të shpejta normash. Lajmi i mirë ekonomik nuk është gjithmonë lajm i mirë për tregjet.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why restaurants are the key signal',
          paragraphs: [
            'Eating out is one of the first things households cut when they feel squeezed. Its increase suggests consumers still feel secure enough.',
          ],
        },
        {
          heading: 'The other side of it',
          paragraphs: [
            'Strong spending also makes it harder for the Fed to justify quick rate cuts. Good economic news is not always good news for markets.',
          ],
        },
      ],
    },
    mentionedSymbols: ['sp-500', 'dow-jones'],
    relatedEventSlug: 'us-inflation-cpi-july',
    relatedLessonSlug: 'what-moves-interest-rates',
  },
  {
    id: 'gold-record',
    slug: 'gold-holds-near-record-as-central-banks-keep-buying',
    category: 'commodities',
    minutesAgo: 420,
    readingMinutes: 3,
    ticker: { symbol: 'XAU', changePercent: 0.44 },
    title: {
      sq: 'Ari qëndron pranë rekordit teksa bankat qendrore vazhdojnë blerjet',
      en: 'Gold holds near record as central banks keep buying',
    },
    summary: {
      sq: 'Bankat qendrore kanë shtuar ar në rezervat e tyre, çka mbështet çmimin edhe kur normat lëvizin.',
      en: 'Central banks have been adding gold to their reserves, which supports the price even when rates move.',
    },
    whyItMatters: {
      sq: 'Ari zakonisht bie kur normat rriten, sepse nuk paguan interes. Që ai të mbahet lart pavarësisht normave tregon se blerësi është dikush që nuk shqetësohet për kthimin — dhe kjo është një gjë e re.',
      en: 'Gold usually falls when rates rise, because it pays no interest. Holding up regardless suggests the buyer is someone who does not care about yield — and that is new.',
    },
    author: {
      name: 'Genti Krasniqi',
      initials: 'GK',
      desk: { sq: 'Redaksia e mallrave', en: 'Commodities desk' },
    },
    publishedAt: '2026-08-21T09:15:00Z',
    heroCaption: {
      sq: 'Shufra ari në një depo qendrore.',
      en: 'Gold bars in a central vault.',
    },
    body: {
      sq: [
        'Ari u tregtua 0.44% më lart në 3.148,60 dollarë për ons, pranë rekordit të vendosur muajin e kaluar.',
        'Bankat qendrore blenë 244 tonë ar në tremujorin e dytë, tremujori i njëmbëdhjetë radhazi me blerje neto, sipas Këshillit Botëror të Arit.',
      ],
      en: [
        'Gold traded 0.44% higher at $3,148.60 an ounce, close to the record set last month.',
        'Central banks bought 244 tonnes of gold in the second quarter, the eleventh consecutive quarter of net buying, according to the World Gold Council.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse blejnë bankat qendrore',
          paragraphs: [
            'Ari nuk i përket asnjë qeverie dhe nuk mund të ngrihet. Për vende që duan të varen më pak nga dollari, ai është mënyra më e thjeshtë për të diversifikuar rezervat.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why central banks buy',
          paragraphs: [
            'Gold belongs to no government and cannot be frozen. For countries wanting to depend less on the dollar, it is the simplest way to diversify reserves.',
          ],
        },
      ],
    },
    mentionedSymbols: ['gold'],
    relatedLessonSlug: 'why-diversification-works',
  },
  {
    id: 'airlines-fuel',
    slug: 'airlines-lead-european-gainers-as-fuel-costs-fall',
    category: 'europe',
    minutesAgo: 360,
    readingMinutes: 2,
    title: {
      sq: 'Linjat ajrore kryesojnë rritjet evropiane teksa kostot e karburantit bien',
      en: 'Airlines lead European gainers as fuel costs fall',
    },
    summary: {
      sq: 'Karburanti më i lirë i aviacionit ul një nga kostot më të mëdha të industrisë, çka rrit fitimet e pritshme.',
      en: 'Cheaper jet fuel lowers one of the industry’s biggest costs, which lifts expected profits.',
    },
    whyItMatters: {
      sq: 'Karburanti është deri në një të katërtën e kostove të një linje ajrore. Një rënie e vogël në naftë kalon drejtpërdrejt në fitim, çka i bën aksionet e aviacionit shumë të ndjeshme ndaj çmimit të energjisë.',
      en: 'Fuel is up to a quarter of an airline’s costs. A small fall in oil passes straight through to profit, which makes airline shares unusually sensitive to energy prices.',
    },
    author: {
      name: 'Dritan Hoxha',
      initials: 'DH',
      desk: { sq: 'Redaksia evropiane', en: 'Europe desk' },
    },
    publishedAt: '2026-08-21T10:40:00Z',
    heroCaption: {
      sq: 'Aeroplanë në pritje në aeroportin e Frankfurtit.',
      en: 'Aircraft waiting at Frankfurt airport.',
    },
    body: {
      sq: [
        'Aksionet e linjave ajrore ishin ndër rritjet më të mëdha evropiane të premten, pasi çmimet e karburantit të aviacionit ranë në nivelin më të ulët që nga marsi.',
        'Sektori i udhëtimeve dhe argëtimit i STOXX-it u ngrit 1.8%, duke tejkaluar tregun më të gjerë evropian.',
      ],
      en: [
        'Airline shares were among Europe’s biggest gainers on Friday, after jet fuel prices fell to their lowest level since March.',
        'The STOXX travel and leisure sector rose 1.8%, outpacing the broader European market.',
      ],
    },
    mentionedSymbols: ['stoxx-600'],
  },
  {
    id: 'fed-plain-english',
    slug: 'what-the-fed-actually-said-in-plain-english',
    category: 'macro',
    minutesAgo: 120,
    readingMinutes: 5,
    title: {
      sq: 'Çfarë tha në të vërtetë Fed-i, në gjuhë të thjeshtë',
      en: 'What the Fed actually said, in plain English',
    },
    summary: {
      sq: 'Deklarata e Rezervës Federale ndryshoi tri fjalë. Ja çfarë do të thoshin ato dhe pse tregjet u kthyen.',
      en: 'The Federal Reserve’s statement changed three words. Here is what they meant, and why markets turned.',
    },
    whyItMatters: {
      sq: 'Fed-i rrallë thotë drejtpërdrejt se çfarë do të bëjë. Ndryshimet e vogla në formulim janë mënyra se si sinjalizon, dhe tregtarët i lexojnë ato fjalë për fjalë.',
      en: 'The Fed rarely says outright what it will do. Small changes in wording are how it signals, and traders read them word by word.',
    },
    author: {
      name: 'Elira Meta',
      initials: 'EM',
      desk: { sq: 'Redaksia e tregjeve', en: 'Markets desk' },
    },
    publishedAt: '2026-08-21T14:30:00Z',
    heroCaption: {
      sq: 'Ndërtesa Marriner S. Eccles, selia e Rezervës Federale në Uashington.',
      en: 'The Marriner S. Eccles Building, the Federal Reserve’s Washington headquarters.',
    },
    body: {
      sq: [
        'Deklarata e fundit e Fed-it hoqi fjalinë se inflacioni mbetet “i ngritur” dhe e zëvendësoi me “po lëviz drejt objektivit”. Ky ishte i gjithë ndryshimi.',
        'Për këdo jashtë tregjeve kjo duket si formulim. Për tregtarët e normave, është ndryshimi mes një banke që pret dhe një banke që përgatitet të veprojë.',
      ],
      en: [
        'The Fed’s latest statement dropped the line that inflation remains “elevated” and replaced it with “moving toward the target”. That was the entire change.',
        'To anyone outside markets that looks like wording. To rates traders, it is the difference between a bank that is waiting and a bank preparing to act.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse fjalët zëvendësojnë veprimet',
          paragraphs: [
            'Ndryshimi i normave është i rrallë dhe i madh. Formulimi është i shpeshtë dhe i imët, çka i lejon Fed-it të përgatisë tregjet gradualisht në vend që t’i tronditë ato.',
            'Kjo quhet udhëheqje paraprake, dhe është një nga mjetet kryesore të çdo banke qendrore moderne.',
          ],
        },
        {
          heading: 'Çfarë të ndiqni herën tjetër',
          paragraphs: [
            'Krahasoni deklaratën e re me atë të mëparshme, fjali për fjali. Vetë Fed-i e boton këtë krahasim, dhe ai tregon më shumë sesa konferenca për shtyp që e ndjek.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why words stand in for actions',
          paragraphs: [
            'Changing rates is rare and large. Wording is frequent and fine-grained, which lets the Fed prepare markets gradually rather than shock them.',
            'This is called forward guidance, and it is one of the main tools of every modern central bank.',
          ],
        },
        {
          heading: 'What to watch next time',
          paragraphs: [
            'Compare the new statement with the previous one, sentence by sentence. The Fed publishes that comparison itself, and it tells you more than the press conference that follows.',
          ],
        },
      ],
    },
    relatedEventSlug: 'fed-speech-governor-waller',
    relatedLessonSlug: 'what-central-banks-do',
  },
  {
    id: 'chip-stocks-together',
    slug: 'why-chip-stocks-move-together',
    category: 'stocks',
    minutesAgo: 240,
    readingMinutes: 4,
    title: {
      sq: 'Pse aksionet e çipave lëvizin bashkë',
      en: 'Why chip stocks move together',
    },
    summary: {
      sq: 'NVIDIA raporton rezultate dhe ASML ngrihet gjithashtu. Ja zinxhiri që i lidh ato.',
      en: 'NVIDIA reports results and ASML rises too. Here is the chain that links them.',
    },
    whyItMatters: {
      sq: 'Nëse mbani disa aksione teknologjie duke menduar se jeni të diversifikuar, mund të mos jeni. Kompanitë që ndajnë të njëjtët klientë ndajnë edhe të njëjtin rrezik.',
      en: 'If you hold several technology shares thinking you are diversified, you may not be. Companies that share customers share risk.',
    },
    author: {
      name: 'Elira Meta',
      initials: 'EM',
      desk: { sq: 'Redaksia e tregjeve', en: 'Markets desk' },
    },
    publishedAt: '2026-08-21T12:30:00Z',
    heroCaption: {
      sq: 'Një disk silici në një fabrikë gjysmëpërçuesish.',
      en: 'A silicon wafer at a semiconductor plant.',
    },
    body: {
      sq: [
        'Kur NVIDIA raportoi rezultate të forta të premten, aksionet e saj u ngritën 4.8%. Por edhe ASML, TSMC dhe AMD u ngritën — pa raportuar asgjë.',
        'Kjo ndodh sepse ato ndodhen në të njëjtin zinxhir furnizimi. Kërkesa më e lartë për çipat e NVIDIA-s do të thotë më shumë disqe nga TSMC, dhe më shumë makineri nga ASML.',
      ],
      en: [
        'When NVIDIA reported strong results on Friday, its shares rose 4.8%. But ASML, TSMC and AMD rose too — without reporting anything.',
        'That is because they sit in the same supply chain. Higher demand for NVIDIA’s chips means more wafers from TSMC, and more machines from ASML.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Zinxhiri, hap pas hapi',
          paragraphs: [
            'ASML shet makineritë. TSMC i përdor ato për të prodhuar çipat. NVIDIA i projekton çipat dhe i shet. Një sinjal i mirë kërkese në një skaj udhëton në të gjithë zinxhirin brenda minutash në treg.',
          ],
        },
        {
          heading: 'Çfarë do të thotë kjo për portofolin tuaj',
          paragraphs: [
            'Zotërimi i pesë kompanive teknologjike nuk është i njëjti diversifikim si zotërimi i pesë industrive. Kur zinxhiri ngadalësohet, ato bien bashkë po aq shpejt sa u ngritën.',
          ],
        },
      ],
      en: [
        {
          heading: 'The chain, step by step',
          paragraphs: [
            'ASML sells the machines. TSMC uses them to manufacture the chips. NVIDIA designs the chips and sells them. A good demand signal at one end travels the whole chain within minutes on the market.',
          ],
        },
        {
          heading: 'What it means for your portfolio',
          paragraphs: [
            'Owning five technology companies is not the same diversification as owning five industries. When the chain slows, they fall together as quickly as they rose.',
          ],
        },
      ],
    },
    mentionedSymbols: ['nasdaq-100'],
    relatedLessonSlug: 'why-diversification-works',
  },
  {
    id: 'bitcoin-etf-flows',
    slug: 'bitcoin-etfs-where-the-money-went-this-month',
    category: 'crypto',
    minutesAgo: 360,
    readingMinutes: 4,
    title: {
      sq: 'ETF-të e Bitcoin-it: ku shkuan paratë këtë muaj',
      en: 'Bitcoin ETFs: where the money went this month',
    },
    summary: {
      sq: 'Fluksi neto u kthye negativ për herë të parë që nga marsi. Ja cilat fonde humbën para dhe cilat mbajtën.',
      en: 'Net flows turned negative for the first time since March. Here is which funds lost money and which held on.',
    },
    whyItMatters: {
      sq: 'Fluksi i ETF-ve është treguesi më i qartë i disponueshëm i asaj që po bëjnë investitorët institucionalë me Bitcoin-in — më i besueshëm se sentimenti në rrjete sociale.',
      en: 'ETF flows are the clearest available read on what institutional investors are doing with Bitcoin — more reliable than sentiment on social media.',
    },
    author: {
      name: 'Arta Berisha',
      initials: 'AB',
      desk: { sq: 'Redaksia e kriptove', en: 'Crypto desk' },
    },
    publishedAt: '2026-08-21T10:30:00Z',
    heroCaption: {
      sq: 'Fluksi mujor në fondet spot të Bitcoin-it u kthye negativ.',
      en: 'Monthly flows into spot Bitcoin funds turned negative.',
    },
    body: {
      sq: [
        'Fondet spot të Bitcoin-it në SHBA panë një fluks neto dalës prej 640 milionë dollarësh këtë muaj, pas gjashtë muajsh radhazi me hyrje.',
        'Dalja nuk ishte e njëtrajtshme: dy fondet më të mëdha mbajtën aktive pothuajse të pandryshuara, ndërsa fondet më të vogla dhe më të reja mbajtën pjesën më të madhe të humbjeve.',
      ],
      en: [
        'US spot Bitcoin funds saw net outflows of $640m this month, after six consecutive months of inflows.',
        'The exit was not uniform: the two largest funds held assets almost flat, while smaller and newer funds took most of the losses.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Pse tarifat shpjegojnë një pjesë të kësaj',
          paragraphs: [
            'Fondet më të reja shpesh hapin me tarifa promocionale që skadojnë. Kur ato mbarojnë, paratë shpesh lëvizin drejt fondit më të lirë e më të madh, edhe pa ndryshuar pikëpamja për vetë Bitcoin-in.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why fees explain part of this',
          paragraphs: [
            'Newer funds often launch with promotional fees that expire. When those end, money frequently moves to the cheaper, larger fund — without any change of view on Bitcoin itself.',
          ],
        },
      ],
    },
    mentionedSymbols: ['bitcoin'],
    relatedLessonSlug: 'fees-that-change-everything',
  },
  {
    id: 'slow-inflation-savers',
    slug: 'a-slow-inflation-europe-is-good-news-for-savers',
    category: 'europe',
    minutesAgo: 480,
    readingMinutes: 4,
    title: {
      sq: 'Një Evropë me inflacion të ulët është lajm i mirë për kursimtarët',
      en: 'A slow-inflation Europe is good news for savers',
    },
    summary: {
      sq: 'Normat e depozitave do të bien, por paratë tuaja do të mbajnë vlerën më mirë. Ja si del llogaria.',
      en: 'Deposit rates will fall, but your money will hold its value better. Here is how the maths works out.',
    },
    whyItMatters: {
      sq: 'Ajo që ka rëndësi për një kursimtar nuk është norma e interesit, por norma minus inflacionin. Kjo diferencë sapo u kthye pozitive në eurozonë.',
      en: 'What matters to a saver is not the interest rate but the rate minus inflation. That gap has just turned positive in the euro area.',
    },
    author: {
      name: 'Dritan Hoxha',
      initials: 'DH',
      desk: { sq: 'Redaksia evropiane', en: 'Europe desk' },
    },
    publishedAt: '2026-08-21T08:30:00Z',
    heroCaption: {
      sq: 'Një degë bankare në Milano.',
      en: 'A bank branch in Milan.',
    },
    body: {
      sq: [
        'Me inflacionin në 1.9% dhe normat tipike të depozitave rreth 2.4%, kursimtarët në eurozonë tani fitojnë rreth 0.5% në terma realë — pak, por pozitive për herë të parë në tre vjet.',
        'Për shumicën e viteve të fundit, kursimet humbnin fuqi blerëse edhe kur llogaria tregonte interes.',
      ],
      en: [
        'With inflation at 1.9% and typical deposit rates around 2.4%, euro-area savers now earn roughly 0.5% in real terms — small, but positive for the first time in three years.',
        'For most of the past few years, savings lost purchasing power even while the account showed interest.',
      ],
    },
    sections: {
      sq: [
        {
          heading: 'Norma reale, e shpjeguar',
          paragraphs: [
            'Nëse llogaria juaj paguan 2.4% dhe çmimet rriten 1.9%, jeni 0.5% përpara. Nëse çmimet rriten 3%, jeni 0.6% prapa — pavarësisht se numri në llogari u rrit.',
          ],
        },
        {
          heading: 'Çfarë ndodh nëse BQE-ja ul normat',
          paragraphs: [
            'Normat e depozitave bien shpejt, ndërsa inflacioni lëviz më ngadalë. Kjo diferencë e vogël pozitive mund të mbyllet përsëri brenda muajsh, prandaj ia vlen të kontrollohet se çfarë paguan vërtet banka juaj.',
          ],
        },
      ],
      en: [
        {
          heading: 'The real rate, explained',
          paragraphs: [
            'If your account pays 2.4% and prices rise 1.9%, you are 0.5% ahead. If prices rise 3%, you are 0.6% behind — regardless of the number in the account going up.',
          ],
        },
        {
          heading: 'What happens if the ECB cuts',
          paragraphs: [
            'Deposit rates fall quickly, while inflation moves more slowly. That small positive gap can close again within months, which makes it worth checking what your bank actually pays.',
          ],
        },
      ],
    },
    relatedEventSlug: 'ecb-interest-rate-decision',
    relatedLessonSlug: 'inflation-in-one-page',
  },
];

/**
 * The most-read rail, as an ordering of real stories.
 *
 * It was previously a separate list of headlines with no pages behind them, so
 * every link in the rail 404'd. Ranking by slug keeps the rail pointing at
 * articles that exist; the analytics layer will supply the real order later.
 */
const MOST_READ_SLUGS = [
  'what-the-fed-actually-said-in-plain-english',
  'why-chip-stocks-move-together',
  'bitcoin-etfs-where-the-money-went-this-month',
  'a-slow-inflation-europe-is-good-news-for-savers',
];

export interface MostReadEntry {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  minutesAgo: number;
}

export const getMostRead = (locale: Locale): MostReadEntry[] =>
  MOST_READ_SLUGS.map((slug) => {
    const article = ARTICLES.find((entry) => entry.slug === slug);
    if (!article) throw new Error(`Most-read slug has no article: ${slug}`);

    return {
      id: article.id,
      slug: article.slug,
      category: article.category,
      title: article.title[locale],
      minutesAgo: article.minutesAgo,
    };
  });

const resolve = (article: SeedArticle, locale: Locale): NewsArticle => ({
  id: article.id,
  slug: article.slug,
  category: article.category,
  title: article.title[locale],
  summary: article.summary[locale],
  minutesAgo: article.minutesAgo,
  readingMinutes: article.readingMinutes,
  ...(article.ticker ? { ticker: article.ticker } : {}),
  ...(article.whyItMatters
    ? { whyItMatters: article.whyItMatters[locale] }
    : {}),
  ...(article.body ? { body: article.body[locale] } : {}),
  ...(article.author
    ? {
        author: {
          name: article.author.name,
          initials: article.author.initials,
          desk: article.author.desk[locale],
        },
      }
    : {}),
  ...(article.publishedAt ? { publishedAt: article.publishedAt } : {}),
  ...(article.heroCaption ? { heroCaption: article.heroCaption[locale] } : {}),
  ...(article.sections ? { sections: article.sections[locale] } : {}),
  ...(article.inNumbers
    ? {
        inNumbers: article.inNumbers.map((entry) => ({
          value: entry.value,
          label: entry.label[locale],
          ...(entry.tone ? { tone: entry.tone } : {}),
        })),
      }
    : {}),
  ...(article.pullQuote ? { pullQuote: article.pullQuote[locale] } : {}),
  ...(article.terms ? { terms: article.terms[locale] } : {}),
  ...(article.mentionedSymbols
    ? { mentionedSymbols: article.mentionedSymbols }
    : {}),
  ...(article.relatedEventSlug
    ? { relatedEventSlug: article.relatedEventSlug }
    : {}),
  ...(article.relatedLessonSlug
    ? { relatedLessonSlug: article.relatedLessonSlug }
    : {}),
});

export const getArticles = (locale: Locale): NewsArticle[] =>
  ARTICLES.map((article) => resolve(article, locale));

/** The story that leads the homepage. */
export const getFeaturedArticle = (locale: Locale): NewsArticle => {
  const article = ARTICLES[0];
  if (!article) throw new Error('No articles in seed data');
  return resolve(article, locale);
};

export const getArticleBySlug = (
  locale: Locale,
  slug: string,
): NewsArticle | null => {
  const article = ARTICLES.find((entry) => entry.slug === slug);
  return article ? resolve(article, locale) : null;
};

export const getArticleSlugs = (): string[] =>
  ARTICLES.map((article) => article.slug);

/** Stories in a desk, newest first. Used by the category filter. */
export const getArticlesByCategory = (
  locale: Locale,
  category: NewsCategory,
): NewsArticle[] =>
  ARTICLES.filter((article) => article.category === category).map((article) =>
    resolve(article, locale),
  );
