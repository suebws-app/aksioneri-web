import type { SeedLesson, SeedTopic } from './types';

export const MARKETS_ECONOMY_TOPIC: SeedTopic = {
  id: 'markets-economy',
  title: { sq: 'Tregjet dhe ekonomia', en: 'Markets & the Economy' },
  slugs: {
    sq: [
      'inflacioni',
      'si-levizin-normat-e-interesit',
      'cka-bejne-bankat-qendrore',
      'si-lexohet-kalendari-ekonomik',
      'obligacionet',
      'kurba-e-yield-eve',
      'cka-eshte-pbb',
      'raporti-i-punesimit',
      'pse-ka-rendesi-dollari',
      'nafta-dhe-ekonomia',
      'recesionet',
      'pse-bien-tregjet',
    ],
    en: [
      'inflation',
      'how-interest-rates-move',
      'what-central-banks-do',
      'how-to-read-the-economic-calendar',
      'bonds',
      'the-yield-curve',
      'what-is-gdp',
      'the-jobs-report',
      'why-the-dollar-matters',
      'oil-and-the-economy',
      'recessions',
      'why-markets-fall',
    ],
  },
};

export const MARKETS_ECONOMY_LESSONS: SeedLesson[] = [
  {
    id: 'inflation-in-one-page',
    slug: { sq: 'inflacioni', en: 'inflation' },
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'Inflacioni në një faqe', en: 'Inflation on one page' },
    summary: {
      sq: 'Çka mat vërtet CPI-ja, pse synohet 2% dhe pse çmimet nuk kthehen kurrë poshtë.',
      en: 'What the CPI really measures, why the target is 2%, and why prices never come back down.',
    },
    inOneSentence: {
      sq: 'Inflacioni është shpejtësia me të cilën paratë tuaja blejnë gjithnjë e më pak, dhe matet duke e ndjekur me kohë çmimin e së njëjtës shportë mallrash.',
      en: 'Inflation is the speed at which your money buys less and less, and it is measured by tracking the price of the same basket of goods over time.',
    },
    body: {
      sq: [
        {
          heading: 'Si matet',
          paragraphs: [
            'Statisticienët e mbledhin një shportë me qindra mallra e shërbime që i blen një familje e zakonshme: bukë, qira, benzinë, rrojtore, abonim interneti. Çdo muaj e kontrollojnë sërish çmimin e së njëjtës shportë.',
            'Dallimi në përqindje krahasuar me të njëjtin muaj një vit më parë është norma vjetore e inflacionit. Kjo është shifra që nëpër tituj del si “CPI”.',
            'Secili artikull peshon aq sa shpenzojnë njerëzit për të. Qiraja peshon shumë; kripa thuajse asgjë. Prandaj inflacioni juaj personal mund të dalë dukshëm ndryshe nga ai zyrtar.',
          ],
        },
        {
          heading: 'Kryesor dhe bazë',
          paragraphs: [
            'Inflacioni kryesor i përfshin të gjitha, edhe ushqimin edhe energjinë. Këta të dy luhaten fort për arsye që s’kanë të bëjnë me ekonominë — një thatësi, një luftë, një vendim i OPEC-ut.',
            'Inflacioni bazë i heq të dyja. Është më i qëndrueshëm dhe e tregon më mirë kah po shkon prirja themelore e çmimeve.',
            'Prandaj bankat qendrore flasin përherë për inflacionin bazë, kurse njerëzit e ndiejnë atë kryesorin. Kur dëgjoni “inflacioni po bie” e fatura e rrymës po rritet, kjo është arsyeja.',
          ],
        },
        {
          heading: 'Pse 2% dhe jo zero',
          paragraphs: [
            'Shumica e bankave qendrore synojnë rreth 2%. Zeroja do të ishte e rrezikshme: lë fare pak hapësirë para se ekonomia të bjerë në deflacion, ku çmimet ulen.',
            'Deflacioni tingëllon mirë, por është shkatërrues. Nëse çmimet kanë me ra nesër, njerëzit i shtyjnë blerjet sot; kërkesa bie; kompanitë largojnë punëtorë; kërkesa bie edhe më shumë.',
            'Edhe një gjë që i habit njerëzit: kur inflacioni bie nga 8% në 2%, çmimet nuk kthehen poshtë. Thjesht rriten më ngadalë. Niveli i vjetër nuk kthehet më kurrë.',
          ],
        },
      ],
      en: [
        {
          heading: 'How it is measured',
          paragraphs: [
            'Statisticians assemble a basket of hundreds of goods and services a typical household buys: bread, rent, petrol, haircuts, an internet subscription. Every month they check the price of that same basket again.',
            'The percentage difference compared with the same month a year earlier is the annual inflation rate. That is the figure that shows up in the headlines as "CPI".',
            'Each item is weighted by how much people spend on it. Rent carries a lot of weight; salt barely any. That is why your personal inflation can look quite different from the official number.',
          ],
        },
        {
          heading: 'Headline and core',
          paragraphs: [
            'Headline inflation includes everything, food and energy too. Those two swing sharply for reasons that have nothing to do with the economy — a drought, a war, an OPEC decision.',
            'Core inflation strips both out. It is steadier and gives a better picture of where the underlying trend in prices is heading.',
            'That is why central banks always talk about core inflation, while people feel the headline number. When you hear "inflation is falling" but your electricity bill keeps rising, this is the reason.',
          ],
        },
        {
          heading: 'Why 2% and not zero',
          paragraphs: [
            'Most central banks aim for around 2%. Zero would be dangerous: it leaves very little room before the economy slips into deflation, where prices fall.',
            'Deflation sounds nice, but it is destructive. If prices will be lower tomorrow, people put off buying today; demand falls; companies lay off workers; demand falls even further.',
            'One more thing that surprises people: when inflation drops from 8% to 2%, prices do not come back down. They simply rise more slowly. The old level never returns.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Çfarë do të thotë secila shifër',
        columns: ['Matja', 'Çfarë përfshin', 'Kush e shikon'],
        rows: [
          {
            label: 'CPI kryesor',
            value: 'Gjithçka',
            cost: 'Publiku, sindikatat',
          },
          {
            label: 'CPI bazë',
            value: 'Pa ushqim dhe energji',
            cost: 'Banka qendrore',
            tone: 'positive',
          },
          {
            label: 'Pritjet për inflacionin',
            value: 'Çka presin njerëzit',
            cost: 'Banka qendrore',
          },
        ],
      },
      en: {
        heading: 'What each number means',
        columns: ['Measure', 'What it includes', 'Who watches it'],
        rows: [
          {
            label: 'Headline CPI',
            value: 'Everything',
            cost: 'The public, trade unions',
          },
          {
            label: 'Core CPI',
            value: 'Excludes food and energy',
            cost: 'The central bank',
            tone: 'positive',
          },
          {
            label: 'Inflation expectations',
            value: 'What people expect',
            cost: 'The central bank',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'inflation',
          term: 'Inflacion',
          definition:
            'Rritja e përgjithshme e çmimeve dhe rënia e fuqisë blerëse që vjen me të.',
          aliases: ['inflacioni', 'inflacionit'],
        },
        {
          slug: 'cpi',
          term: 'CPI',
          definition:
            'Indeksi i çmimeve të konsumit — matësi kryesor i inflacionit.',
          aliases: ['indeksi i çmimeve të konsumit'],
        },
        {
          slug: 'core-inflation',
          term: 'Inflacion bazë',
          definition:
            'Inflacioni pa ushqimin e pa energjinë, që janë më të luhatshmit.',
          aliases: ['inflacioni bazë'],
        },
        {
          slug: 'deflation',
          term: 'Deflacion',
          definition:
            'Rënia e përgjithshme e çmimeve. Rrallë është e mirë: i shtyn shpenzimet dhe e ngadalëson ekonominë.',
          aliases: ['deflacioni'],
        },
      ],
      en: [
        {
          slug: 'inflation',
          term: 'Inflation',
          definition:
            'The general rise in prices and the loss of purchasing power that comes with it.',
          aliases: ['inflation rate', 'rising prices'],
        },
        {
          slug: 'cpi',
          term: 'CPI',
          definition:
            'The consumer price index — the main measure of inflation.',
          aliases: ['consumer price index'],
        },
        {
          slug: 'core-inflation',
          term: 'Core inflation',
          definition:
            'Inflation excluding food and energy, the most volatile items.',
          aliases: ['core CPI'],
        },
        {
          slug: 'deflation',
          term: 'Deflation',
          definition:
            'A general fall in prices. Rarely a good thing: it delays spending and slows the economy.',
          aliases: ['falling prices'],
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Inflacioni bie nga 8% në 2%. Çka ndodh me çmimet në dyqan?',
        options: [
          'Bien për rreth 6%',
          'Vazhdojnë të rriten, por shumë më ngadalë',
          'Mbeten saktësisht aty ku ishin',
        ],
        answer: 1,
        explanation:
          'Inflacioni e mat shpejtësinë e rritjes, jo nivelin. Normë më e ulët do të thotë rritje më e ngadaltë, jo kthim prapa.',
      },
      en: {
        question:
          'Inflation falls from 8% to 2%. What happens to prices in the shops?',
        options: [
          'They fall by about 6%',
          'They keep rising, but much more slowly',
          'They stay exactly where they were',
        ],
        answer: 1,
        explanation:
          'Inflation measures the speed of the rise, not the level. A lower rate means slower increases, not a reversal.',
      },
    },
    relatedSymbols: ['gold'],
    upNextSlugs: {
      sq: ['si-levizin-normat-e-interesit', 'cka-bejne-bankat-qendrore'],
      en: ['how-interest-rates-move', 'what-central-banks-do'],
    },
  },

  {
    id: 'what-moves-interest-rates',
    slug: {
      sq: 'si-levizin-normat-e-interesit',
      en: 'how-interest-rates-move',
    },
    topicId: 'markets-economy',
    level: 'beginner',
    title: {
      sq: 'Çka i lëviz normat e interesit',
      en: 'What moves interest rates',
    },
    summary: {
      sq: 'Një shifër e vetme që ua ndryshon çmimin të gjitha gjërave të tjera — dhe pse.',
      en: 'A single number that changes the price of everything else — and why.',
    },
    inOneSentence: {
      sq: 'Norma bazë është çmimi i parasë, dhe kur ai çmim ndryshon, rivlerësohet gjithçka që matet në para.',
      en: 'The policy rate is the price of money, and when that price changes, everything measured in money gets repriced.',
    },
    body: {
      sq: [
        {
          heading: 'Kush e vendos dhe pse',
          paragraphs: [
            'Banka qendrore e cakton një normë bazë me të cilën u jep hua bankave tregtare. Gjithçka tjetër — kreditë banesore, kreditë e biznesit, obligacionet — çmohet mbi atë bazë.',
            'Kur inflacioni është i lartë, banka e ngre normën. Kreditë shtrenjtohen, njerëzit shpenzojnë më pak, kërkesa bie dhe lehtësohet presioni mbi çmimet.',
            'Kur ekonomia ngadalësohet dhe papunësia rritet, vepron anasjelltas. I tërë mekanizmi është ky: një çmim i vetëm që e ngadalëson ose e përshpejton tërë sistemin.',
          ],
        },
        {
          heading: 'Pse aksionet vuajnë kur normat rriten',
          paragraphs: [
            'Ka dy rrugë. E para është e thjeshtë: kompanitë me borxh paguajnë më shumë interes, prandaj u bien fitimet.',
            'E dyta është më e fuqishme. Vlera e një aksioni janë fitimet e ardhshme të sjella në ditën e sotme me një normë zbritjeje. Ngriteni normën dhe e njëjta e ardhme vlen më pak sot — pa u ndryshuar asgjë te kompania.',
            'Ka edhe një rrugë të tretë, konkurrencën: kur obligacionet e sigurta paguajnë 5%, aksionet duhet të premtojnë shumë më shumë për t’i tërhequr të njëjtat para.',
          ],
        },
        {
          heading: 'Pse vonesa është e gjatë',
          paragraphs: [
            'Ndërrimi i normës nuk vepron në çast. Kreditë banesore ekzistuese rifiksohen me radhë, kontratat e bizneseve skadojnë në kohë të ndryshme, kurse vendimet për investime marrin muaj.',
            'Ekonomistët flasin për vonesa “të gjata dhe të ndryshueshme” — zakonisht duhen gjashtë deri në tetëmbëdhjetë muaj që efekti të ndihet i plotë.',
            'Prandaj bankat qendrore detyrohen të veprojnë sipas parashikimeve, jo sipas të dhënave. Dhe prandaj gabojnë rregullisht në të dy drejtimet.',
          ],
        },
      ],
      en: [
        {
          heading: 'Who sets it and why',
          paragraphs: [
            'The central bank sets a base rate at which it lends to commercial banks. Everything else — mortgages, business loans, bonds — is priced on top of that base.',
            'When inflation is high, the bank raises the rate. Loans get more expensive, people spend less, demand falls, and the pressure on prices eases.',
            'When the economy slows and unemployment rises, it works the other way around. That is the whole mechanism: a single price that slows down or speeds up the entire system.',
          ],
        },
        {
          heading: 'Why shares suffer when rates rise',
          paragraphs: [
            'There are two channels. The first is simple: companies with debt pay more interest, so their profits shrink.',
            'The second is more powerful. A share is worth its future profits brought back to today at a discount rate. Raise the rate and the same future is worth less today — without anything changing at the company.',
            'There is also a third channel, competition: when safe bonds pay 5%, shares have to promise a lot more to attract the same money.',
          ],
        },
        {
          heading: 'Why the lag is long',
          paragraphs: [
            'A rate change does not work instantly. Existing mortgages refix one by one, business contracts expire at different times, and investment decisions take months.',
            'Economists talk about "long and variable" lags — it usually takes six to eighteen months for the full effect to be felt.',
            'That is why central banks are forced to act on forecasts, not on data. And that is why they regularly get it wrong in both directions.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'policy-rate',
          term: 'Normë bazë',
          definition:
            'Norma e interesit që e cakton banka qendrore dhe mbi të cilën çmohet gjithçka tjetër.',
          aliases: ['norma bazë', 'norma e politikës'],
        },
        {
          slug: 'basis-point',
          term: 'Pikë bazë',
          definition: 'Një e qindta e një përqindjeje. 25 pikë bazë = 0,25%.',
          aliases: ['pikë bazë', 'pika bazë', 'bps'],
        },
        {
          slug: 'monetary-policy',
          term: 'Politikë monetare',
          definition:
            'Vendimet e bankës qendrore për normat dhe për sasinë e parasë në qarkullim.',
          aliases: ['politika monetare'],
        },
      ],
      en: [
        {
          slug: 'policy-rate',
          term: 'Policy rate',
          definition:
            'The interest rate set by the central bank, on top of which everything else is priced.',
          aliases: ['base rate', 'policy rates'],
        },
        {
          slug: 'basis-point',
          term: 'Basis point',
          definition:
            'One hundredth of a percentage point. 25 basis points = 0.25%.',
          aliases: ['basis points', 'bps'],
        },
        {
          slug: 'monetary-policy',
          term: 'Monetary policy',
          definition:
            "The central bank's decisions about interest rates and the amount of money in circulation.",
          aliases: ['monetary policies'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Banka qendrore i ngre normat sot. Kur ndihet efekti i plotë në ekonomi?',
        options: [
          'Brenda javës',
          'Zakonisht mes gjashtë dhe tetëmbëdhjetë muajsh',
          'Në çast, sepse tregjet reagojnë në çast',
        ],
        answer: 1,
        explanation:
          'Tregjet reagojnë në çast, ekonomia reale jo. Kontratat dhe kreditë rifiksohen me radhë gjatë shumë muajve.',
      },
      en: {
        question:
          'The central bank raises rates today. When is the full effect felt in the economy?',
        options: [
          'Within a week',
          'Usually between six and eighteen months',
          'Instantly, because markets react instantly',
        ],
        answer: 1,
        explanation:
          'Markets react instantly, the real economy does not. Contracts and loans refix one by one over many months.',
      },
    },
    relatedSymbols: ['eur-usd', 'gold'],
    upNextSlugs: {
      sq: ['cka-bejne-bankat-qendrore', 'obligacionet'],
      en: ['what-central-banks-do', 'bonds'],
    },
  },

  {
    id: 'what-central-banks-do',
    slug: { sq: 'cka-bejne-bankat-qendrore', en: 'what-central-banks-do' },
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çka bëjnë vërtet bankat qendrore',
      en: 'What central banks really do',
    },
    summary: {
      sq: 'Dy detyra, disa mjete dhe një armë që e përdorin më shumë se të gjitha të tjerat: fjalët.',
      en: 'Two jobs, a few tools, and one weapon they use more than all the others: words.',
    },
    inOneSentence: {
      sq: 'Banka qendrore mundohet t’i mbajë çmimet të qëndrueshme dhe punësimin të lartë, kryesisht duke i bindur tregjet se çka do të bëjë më vonë.',
      en: 'A central bank tries to keep prices stable and employment high, mostly by convincing markets of what it will do later.',
    },
    body: {
      sq: [
        {
          heading: 'Mandati',
          paragraphs: [
            'Banka Qendrore Evropiane e ka një detyrë kryesore: qëndrueshmërinë e çmimeve, të përcaktuar si inflacion rreth 2%. Rezerva Federale amerikane i ka dy — çmime të qëndrueshme dhe punësim sa më të lartë.',
            'Ky dallim e shpjegon pse reagojnë ndryshe ndaj së njëjtës gjendje. Kur inflacioni dhe papunësia rriten përnjëherë, Fed-i duhet t’i peshojë të dyja; BQE-ja, në teori, jo.',
            'Të dyja janë të pavarura nga qeveritë, dhe kjo pavarësi është me qëllim: një qeveri para zgjedhjeve gjithmonë do të tundohej t’i ulte normat.',
          ],
        },
        {
          heading: 'Mjetet',
          paragraphs: [
            'Mjeti kryesor është norma bazë. Pas krizës së vitit 2008 u shtua edhe një i dytë: blerja e obligacioneve me para të reja, e njohur si lehtësim sasior, që i ul normat afatgjata kur ato afatshkurtra e kanë arritur tashmë zeron.',
            'Mjeti i tretë dhe më i nënçmuari është komunikimi. Kur një guvernator thotë se normat do të mbeten të larta “sa të duhet”, tregjet rivlerësojnë në çast — pa u lëvizur asnjë normë.',
            'Kjo quhet udhëzim paraprak dhe shpesh bën më shumë punë se vetë vendimi.',
          ],
        },
        {
          heading: 'Pse fjalët i lëvizin tregjet më shumë se veprimet',
          paragraphs: [
            'Vendimi i një mbledhjeje zakonisht pritet. Tregu e ka çmuar një rritje prej 25 pikësh bazë para se ajo të ndodhë.',
            'Ajo që nuk çmohet dot është toni. Një fjali e ndërruar në deklaratë, ose një përgjigje e matur në konferencë, i ndryshon pritjet për muajt në vijim.',
            'Prandaj tregjet shpesh luajnë më shumë gjatë konferencës për shtyp sesa në çastin e vendimit.',
          ],
        },
      ],
      en: [
        {
          heading: 'The mandate',
          paragraphs: [
            'The European Central Bank has one primary job: price stability, defined as inflation of around 2%. The US Federal Reserve has two — stable prices and maximum employment.',
            'That difference explains why they react differently to the same situation. When inflation and unemployment rise at the same time, the Fed has to weigh both; the ECB, in theory, does not.',
            'Both are independent from their governments, and that independence is deliberate: a government heading into an election would always be tempted to cut rates.',
          ],
        },
        {
          heading: 'The tools',
          paragraphs: [
            'The main tool is the policy rate. After the 2008 crisis a second one was added: buying bonds with newly created money, known as quantitative easing, which lowers long-term rates once short-term ones have already hit zero.',
            'The third and most underrated tool is communication. When a governor says rates will stay high "as long as it takes", markets reprice instantly — without a single rate moving.',
            'This is called forward guidance, and it often does more work than the decision itself.',
          ],
        },
        {
          heading: 'Why words move markets more than actions',
          paragraphs: [
            'The decision at a meeting is usually expected. The market has priced in a 25 basis point hike before it happens.',
            'What cannot be priced in is the tone. One changed sentence in the statement, or a careful answer at the press conference, shifts expectations for the months ahead.',
            'That is why markets often move more during the press conference than at the moment of the decision.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'central-bank',
          term: 'Bankë qendrore',
          definition:
            'Institucioni që i cakton normat dhe e ruan qëndrueshmërinë e çmimeve në një ekonomi.',
          aliases: ['banka qendrore', 'BQE', 'Fed'],
        },
        {
          slug: 'forward-guidance',
          term: 'Udhëzim paraprak',
          definition:
            'Dhënia e qëllimshme e shenjës se çka pret të bëjë banka qendrore më vonë.',
        },
        {
          slug: 'quantitative-easing',
          term: 'Lehtësim sasior',
          definition:
            'Blerja e obligacioneve me para të reja për t’i ulur normat afatgjata.',
          aliases: ['QE'],
        },
        {
          slug: 'hawkish',
          term: 'Skifter',
          definition:
            'Prirje kah normat më të larta për ta luftuar inflacionin. E kundërta është pëllumb.',
          aliases: ['skifterore', 'hawkish', 'pëllumb', 'dovish'],
        },
      ],
      en: [
        {
          slug: 'central-bank',
          term: 'Central bank',
          definition:
            'The institution that sets interest rates and safeguards price stability in an economy.',
          aliases: ['central banks', 'ECB', 'Fed'],
        },
        {
          slug: 'forward-guidance',
          term: 'Forward guidance',
          definition:
            'Deliberately signalling what the central bank expects to do later.',
        },
        {
          slug: 'quantitative-easing',
          term: 'Quantitative easing',
          definition:
            'Buying bonds with newly created money to push down long-term rates.',
          aliases: ['QE'],
        },
        {
          slug: 'hawkish',
          term: 'Hawkish',
          definition:
            'Leaning towards higher rates to fight inflation. The opposite is dovish.',
          aliases: ['hawk', 'dovish', 'dove'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Banka qendrore i rrit normat pikërisht aq sa pritej, por tregu bie fort. Pse, më së shpeshti?',
        options: [
          'Sepse rritja ishte gjithsesi e papritur',
          'Sepse toni i deklaratës la të kuptohet se do të ketë më shumë rritje se sa pritej',
          'Sepse rritjet e normave gjithmonë e ulin tregun',
        ],
        answer: 1,
        explanation:
          'Vetë vendimi ishte çmuar tashmë. Informacioni i ri ishte te fjalët për të ardhmen, jo te shifra e sotme.',
      },
      en: {
        question:
          'The central bank raises rates exactly as expected, yet the market falls sharply. Most often, why?',
        options: [
          'Because the hike was unexpected after all',
          'Because the tone of the statement hinted at more hikes than expected',
          'Because rate hikes always push the market down',
        ],
        answer: 1,
        explanation:
          "The decision itself was already priced in. The new information was in the words about the future, not in today's number.",
      },
    },
    relatedSymbols: ['eur-usd'],
    upNextSlugs: {
      sq: ['si-lexohet-kalendari-ekonomik', 'kurba-e-yield-eve'],
      en: ['how-to-read-the-economic-calendar', 'the-yield-curve'],
    },
  },

  {
    id: 'how-to-read-the-economic-calendar',
    slug: {
      sq: 'si-lexohet-kalendari-ekonomik',
      en: 'how-to-read-the-economic-calendar',
    },
    topicId: 'markets-economy',
    level: 'beginner',
    title: {
      sq: 'Si të lexoni kalendarin ekonomik',
      en: 'How to read the economic calendar',
    },
    summary: {
      sq: 'Tri kolona kanë rëndësi: pritur, aktuale dhe e mëparshme. Lajmi është dallimi mes dy të parave.',
      en: 'Three columns matter: expected, actual and previous. The news is the gap between the first two.',
    },
    inOneSentence: {
      sq: 'Kalendari nuk ju tregon çka do të ndodhë me tregun — ju tregon kur do ta mësojmë a ishte e saktë pritja.',
      en: 'The calendar does not tell you what the market will do — it tells you when we will find out whether the expectation was right.',
    },
    body: {
      sq: [
        {
          heading: 'Tri kolonat',
          paragraphs: [
            '“E mëparshme” është shifra e publikimit të fundit. Ajo e jep kontekstin: a po përshpejtohet a po ngadalësohet kjo matje?',
            '“Pritur” është konsensusi i ekonomistëve. Kjo shifër është çmuar në treg qysh para publikimit. Ajo është pragu.',
            '“Aktuale” del në çastin e publikimit. Informacion i ri është vetëm dallimi mes aktuales dhe të priturës, dhe vetëm ai i lëviz çmimet.',
          ],
        },
        {
          heading: 'Ndikimi nuk do të thotë rëndësi',
          paragraphs: [
            'Shenja “ndikim i lartë” nuk do të thotë se ajo matje është më e rëndësishme për ekonominë. Do të thotë se historikisht i ka lëvizur tregjet më shumë.',
            'CPI-ja dhe raporti i punësimit kanë ndikim të lartë sepse i ndryshojnë drejtpërdrejt pritjet për normat. Prodhimi industrial mund të jetë i rëndësishëm për ekonominë e të mos lëvizë asgjë.',
            'Nëse doni ta dini pse një ditë ishte e trazuar, shikoni cilat publikime i ndërruan pritjet për bankën qendrore.',
          ],
        },
        {
          heading: 'Rishikimet',
          paragraphs: [
            'Shumë shifra rishikohen muaj më vonë, kur vijnë të dhëna më të plota. Një raport i fortë i punësimit mund të rishikohet dukshëm kah poshtë tridhjetë ditë më vonë.',
            'Tregjet reagojnë ashpër ndaj publikimit të parë dhe thuajse aspak ndaj rishikimit, edhe pse rishikimi është më i saktë.',
            'Prandaj mos e ndërtoni një bindje mbi një shifër të vetme. Prirja gjatë disa muajve është shumë më e besueshme se çdo publikim i veçuar.',
          ],
        },
      ],
      en: [
        {
          heading: 'The three columns',
          paragraphs: [
            '"Previous" is the figure from the last release. It gives the context: is this measure speeding up or slowing down?',
            '"Expected" is the economists\' consensus. That number is priced into the market before the release. It is the bar.',
            '"Actual" appears at the moment of release. Only the gap between actual and expected is new information, and only that moves prices.',
          ],
        },
        {
          heading: 'Impact does not mean importance',
          paragraphs: [
            'A "high impact" label does not mean the measure matters more for the economy. It means it has historically moved markets more.',
            'CPI and the jobs report are high impact because they directly change rate expectations. Industrial production can matter for the economy and move nothing.',
            'If you want to know why a day was turbulent, look at which releases changed expectations for the central bank.',
          ],
        },
        {
          heading: 'Revisions',
          paragraphs: [
            'Many figures are revised months later, once fuller data comes in. A strong jobs report can be revised noticeably lower thirty days later.',
            'Markets react sharply to the first release and barely at all to the revision, even though the revision is more accurate.',
            'So do not build a conviction on a single number. The trend over several months is far more reliable than any individual release.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Si të lexoni një rresht',
        columns: ['Kolona', 'Çka tregon', 'A e lëviz tregun?'],
        rows: [
          { label: 'E mëparshme', value: 'Konteksti', cost: 'Jo' },
          { label: 'Pritur', value: 'Çka është çmuar tashmë', cost: 'Jo' },
          {
            label: 'Aktuale',
            value: 'Realiteti',
            cost: 'Vetëm nëse del ndryshe nga pritja',
            tone: 'positive',
          },
        ],
      },
      en: {
        heading: 'How to read a row',
        columns: ['Column', 'What it shows', 'Does it move the market?'],
        rows: [
          { label: 'Previous', value: 'The context', cost: 'No' },
          { label: 'Expected', value: 'What is already priced in', cost: 'No' },
          {
            label: 'Actual',
            value: 'Reality',
            cost: 'Only if it differs from expectations',
            tone: 'positive',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'economic-calendar',
          term: 'Kalendar ekonomik',
          definition:
            'Orari i publikimit të të dhënave ekonomike, me pritjet për secilën.',
          aliases: ['kalendari ekonomik'],
        },
        {
          slug: 'surprise',
          term: 'Surprizë',
          definition:
            'Dallimi mes shifrës aktuale dhe asaj të pritur. Kjo është ajo që i lëviz çmimet.',
          aliases: ['surpriza'],
        },
        {
          slug: 'revision',
          term: 'Rishikim',
          definition:
            'Ndreqja e një shifre të publikuar më parë, kur vijnë të dhëna më të plota.',
          aliases: ['rishikimi', 'rishikime'],
        },
      ],
      en: [
        {
          slug: 'economic-calendar',
          term: 'Economic calendar',
          definition:
            'The schedule of economic data releases, with expectations for each one.',
          aliases: ['macro calendar'],
        },
        {
          slug: 'surprise',
          term: 'Surprise',
          definition:
            'The gap between the actual figure and the expected one. This is what moves prices.',
          aliases: ['surprises', 'data surprise'],
        },
        {
          slug: 'revision',
          term: 'Revision',
          definition:
            'A correction to a previously published figure, once fuller data comes in.',
          aliases: ['revisions', 'data revision'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Inflacioni pritej 3,2% dhe doli 3,1%. Si duhet ta lexoni këtë?',
        options: [
          'Inflacion i lartë, lajm i keq',
          'Pak nën pritje — një surprizë e vogël në drejtim të mirë',
          'S’ka informacion, sepse të dyja janë rreth 3%',
        ],
        answer: 1,
        explanation:
          'Niveli ishte çmuar tashmë. Informacion i ri është vetëm dallimi prej 0,1 pike përqindjeje nën pritje.',
      },
      en: {
        question:
          'Inflation was expected at 3.2% and came in at 3.1%. How should you read that?',
        options: [
          'High inflation, bad news',
          'Slightly below expectations — a small surprise in the right direction',
          'No information, because both are around 3%',
        ],
        answer: 1,
        explanation:
          'The level was already priced in. The only new information is the 0.1 percentage point gap below expectations.',
      },
    },
    upNextSlugs: {
      sq: ['raporti-i-punesimit', 'cka-eshte-pbb'],
      en: ['the-jobs-report', 'what-is-gdp'],
    },
  },

  {
    id: 'bonds-explained',
    slug: { sq: 'obligacionet', en: 'bonds' },
    topicId: 'markets-economy',
    level: 'intermediate',
    title: { sq: 'Obligacionet, të shpjeguara', en: 'Bonds, explained' },
    summary: {
      sq: 'Një hua që e jepni ju, me kupon të fiksuar — dhe pse çmimi i saj bie kur rriten normat.',
      en: 'A loan that you make, with a fixed coupon — and why its price falls when rates rise.',
    },
    inOneSentence: {
      sq: 'Obligacioni është hua me kushte të fiksuara, dhe meqë kushtet janë të fiksuara, e vetmja gjë që mund të luajë është çmimi.',
      en: 'A bond is a loan with fixed terms, and because the terms are fixed, the only thing that can move is the price.',
    },
    body: {
      sq: [
        {
          heading: 'Anatomia',
          paragraphs: [
            'E blini një obligacion me vlerë nominale 1.000 € dhe kupon 4%. Emetuesi ju paguan nga 40 € çdo vit dhe jua kthen 1.000 € në maturim. Këto shifra nuk ndryshojnë kurrë.',
            'Emetues mund të jetë një shtet ose një kompani. Sa më e madhe mundësia që të mos paguajë, aq më i lartë duhet të jetë kuponi që t’ju bindë.',
            'Prandaj obligacionet gjermane paguajnë pak, kurse ato të një kompanie të vogël paguajnë shumë. Ky dallim quhet spread krediti dhe është çmimi i rrezikut.',
          ],
        },
        {
          heading: 'Pse çmimi luan në drejtim të kundërt me normat',
          paragraphs: [
            'Ju e mbani obligacionin me kupon 4%. Nesër normat rriten dhe obligacionet e reja paguajnë 6%. Askush nuk e blen tuajin për 1.000 €, sepse 6% i merr diku tjetër.',
            'Kuponi juaj nuk rritet dot — është i fiksuar. Prandaj e vetmja gjë që mund të përshtatet është çmimi. Ai bie derisa 40 € në vit mbi çmimin e ri të dalin rreth 6%.',
            'Kjo është e tërë lidhja, dhe është mekanike, jo psikologjike: normat lart, çmimet e obligacioneve poshtë.',
          ],
        },
        {
          heading: 'Kohëzgjatja: sa shumë bie',
          paragraphs: [
            'Sa më i largët maturimi, aq më shumë vuan çmimi nga ndërrimi i normave. Një obligacion dyvjeçar jua kthen paranë shpejt; një tridhjetëvjeçar ju mbyll në normën e vjetër për tridhjetë vjet.',
            'Kjo ndjeshmëri quhet kohëzgjatje. Kohëzgjatje 8 do të thotë, përafërsisht, se një rritje e normave për 1% e ul çmimin për 8%.',
            'Prandaj në vitin 2022 obligacionet afatgjata “të sigurta” humbën më shumë se shumë aksione. Nuk dështuan; thjesht normat u rritën shpejt dhe aritmetika e bëri të vetën.',
          ],
        },
      ],
      en: [
        {
          heading: 'The anatomy',
          paragraphs: [
            'You buy a bond with a face value of €1,000 and a 4% coupon. The issuer pays you €40 a year and returns your €1,000 at maturity. Those numbers never change.',
            'The issuer can be a government or a company. The greater the chance it fails to pay, the higher the coupon has to be to win you over.',
            "That is why German bonds pay little while a small company's bonds pay a lot. That gap is called the credit spread, and it is the price of risk.",
          ],
        },
        {
          heading: 'Why the price moves opposite to rates',
          paragraphs: [
            'You hold the bond with the 4% coupon. Tomorrow rates rise and new bonds pay 6%. Nobody will buy yours for €1,000, because they can get 6% elsewhere.',
            'Your coupon cannot rise — it is fixed. So the only thing that can adjust is the price. It falls until €40 a year on the new price works out to about 6%.',
            'That is the whole relationship, and it is mechanical, not psychological: rates up, bond prices down.',
          ],
        },
        {
          heading: 'Duration: how far it falls',
          paragraphs: [
            'The further away the maturity, the more the price suffers when rates change. A two-year bond returns your money quickly; a thirty-year bond locks you into the old rate for thirty years.',
            'That sensitivity is called duration. A duration of 8 means, roughly, that a 1% rise in rates cuts the price by 8%.',
            'That is why in 2022 "safe" long-term bonds lost more than many shares. They did not fail; rates simply rose fast and the arithmetic did its work.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Normat rriten 1% — çfarë ndodh me çmimin',
        columns: ['Maturimi', 'Kohëzgjatja përafërsisht', 'Rënia e çmimit'],
        rows: [
          { label: '2 vjet', value: '1.9', cost: '−1.9%', tone: 'positive' },
          { label: '10 vjet', value: '8.5', cost: '−8.5%' },
          { label: '30 vjet', value: '19', cost: '−19%', tone: 'negative' },
        ],
      },
      en: {
        heading: 'Rates rise 1% — what happens to the price',
        columns: ['Maturity', 'Approximate duration', 'Price drop'],
        rows: [
          { label: '2 years', value: '1.9', cost: '−1.9%', tone: 'positive' },
          { label: '10 years', value: '8.5', cost: '−8.5%' },
          { label: '30 years', value: '19', cost: '−19%', tone: 'negative' },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'bond',
          term: 'Obligacion',
          definition:
            'Hua e tregtueshme me kupon dhe me datë maturimi të fiksuar.',
          aliases: ['obligacione', 'obligacioni'],
        },
        {
          slug: 'coupon',
          term: 'Kupon',
          definition:
            'Pagesa vjetore e fiksuar e interesit të një obligacioni.',
          aliases: ['kuponi'],
        },
        {
          slug: 'yield',
          term: 'Yield',
          definition:
            'Të ardhurat vjetore nga një aset, si pjesë e çmimit që ka tash.',
          aliases: ['yield-i', 'rendimenti'],
        },
        {
          slug: 'duration',
          term: 'Kohëzgjatje',
          definition:
            'Sa ndjeshëm reagon çmimi i një obligacioni ndaj ndërrimit të normave.',
          aliases: ['kohëzgjatja'],
        },
      ],
      en: [
        {
          slug: 'bond',
          term: 'Bond',
          definition:
            'A tradeable loan with a fixed coupon and a fixed maturity date.',
          aliases: ['bonds'],
        },
        {
          slug: 'coupon',
          term: 'Coupon',
          definition: 'The fixed annual interest payment on a bond.',
          aliases: ['coupons', 'coupon payment'],
        },
        {
          slug: 'yield',
          term: 'Yield',
          definition:
            'The annual income from an asset, as a share of its current price.',
          aliases: ['yields'],
        },
        {
          slug: 'duration',
          term: 'Duration',
          definition:
            "How sensitively a bond's price reacts to a change in rates.",
          aliases: ['bond duration'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'E mbani një obligacion 30-vjeçar dhe normat rriten për 1%. Krahasuar me një 2-vjeçar, çka prisni?',
        options: [
          'Të njëjtën rënie të çmimit',
          'Rënie shumë më të madhe',
          'Rritje të çmimit, sepse kuponi është më i lartë',
        ],
        answer: 1,
        explanation:
          'Sa më i gjatë maturimi, aq më e madhe kohëzgjatja. Një 30-vjeçar mund të bjerë rreth dhjetë herë më shumë se një 2-vjeçar.',
      },
      en: {
        question:
          'You hold a 30-year bond and rates rise by 1%. Compared with a 2-year bond, what do you expect?',
        options: [
          'The same price drop',
          'A much bigger drop',
          'A price rise, because the coupon is higher',
        ],
        answer: 1,
        explanation:
          'The longer the maturity, the greater the duration. A 30-year bond can fall roughly ten times as much as a 2-year one.',
      },
    },
    upNextSlugs: {
      sq: ['kurba-e-yield-eve', 'si-levizin-normat-e-interesit'],
      en: ['the-yield-curve', 'how-interest-rates-move'],
    },
  },

  {
    id: 'the-yield-curve',
    slug: { sq: 'kurba-e-yield-eve', en: 'the-yield-curve' },
    topicId: 'markets-economy',
    level: 'advanced',
    title: {
      sq: 'Kurba e yield-eve dhe pse e shikojnë të gjithë',
      en: 'The yield curve and why everyone watches it',
    },
    summary: {
      sq: 'Kur huaja dyvjeçare paguan më shumë se ajo dhjetëvjeçare, tregu po thotë diçka të keqe.',
      en: 'When a two-year loan pays more than a ten-year one, the market is saying something bad.',
    },
    inOneSentence: {
      sq: 'Kurba e yield-eve e vizaton sa paguajnë obligacionet shtetërore në afate të ndryshme, kurse forma e saj tregon çka pret tregu nga ekonomia.',
      en: 'The yield curve plots what government bonds pay across different maturities, and its shape shows what the market expects from the economy.',
    },
    body: {
      sq: [
        {
          heading: 'Forma normale',
          paragraphs: [
            'Zakonisht huaja afatgjatë paguan më shumë se ajo afatshkurtër. Kërkoni shpërblim shtesë që t’i mbyllni paratë dhjetë vjet e jo dy.',
            'Kjo jep një kurbë që ngjitet nga e majta kah e djathta. Është shenjë e një ekonomie normale që pret rritje dhe pak inflacion.',
            'Po ashtu, edhe bankat fitojnë nga kjo formë: marrin hua afatshkurtër dhe japin hua afatgjatë, kurse dallimi u mbetet fitim.',
          ],
        },
        {
          heading: 'Kur përmbyset',
          paragraphs: [
            'Nganjëherë obligacioni dyvjeçar paguan më shumë se dhjetëvjeçari. Kjo është përmbysje dhe është e çuditshme: pse do të pranonte dikush më pak që t’i mbyllë paratë më gjatë?',
            'Përgjigjja është pritja. Nëse tregu beson se banka qendrore do t’i ulë dukshëm normat brenda pak vitesh — sepse ekonomia do të ngadalësohet — atëherë ka kuptim ta mbyllësh një normë sot për dhjetë vjet, edhe pse është më e ulët.',
            'Pra kurba e përmbysur nuk e parashikon recesionin drejtpërdrejt. Tregon se tregu pret ulje të normave, kurse uljet e mëdha zakonisht vijnë kur diçka është prishur.',
          ],
        },
        {
          heading: 'Si sinjal, i mirë por i ngadaltë',
          paragraphs: [
            'Historikisht, në Shtetet e Bashkuara thuajse para çdo recesioni ka ardhur një përmbysje. Kjo e ka bërë sinjalin më të përmendur në financë.',
            'Por vonesa është e gjatë dhe e pabesueshme — nga gjashtë muaj deri në dy vjet. Investitori që del nga tregu ditën e përmbysjes mund ta humbë një vit rritjeje para se t’i dalë drejt.',
            'Ky është modeli i zakonshëm i sinjaleve makro: të dobishme për ta kuptuar kontekstin, thuajse të papërdorshme për ta caktuar kohën.',
          ],
        },
      ],
      en: [
        {
          heading: 'The normal shape',
          paragraphs: [
            'Normally, lending long-term pays more than lending short-term. You demand an extra reward for locking your money up for ten years instead of two.',
            'That gives a curve that climbs from left to right. It is the sign of a normal economy expecting growth and a little inflation.',
            'Banks profit from that shape too: they borrow short-term and lend long-term, and the difference is their margin.',
          ],
        },
        {
          heading: 'When it inverts',
          paragraphs: [
            'Sometimes the two-year bond pays more than the ten-year. That is an inversion, and it is strange: why would anyone accept less for locking their money up longer?',
            'The answer is expectations. If the market believes the central bank will cut rates sharply within a few years — because the economy will slow — then locking in a rate today for ten years makes sense, even though it is lower.',
            'So an inverted curve does not predict a recession directly. It shows that the market expects rate cuts, and big cuts usually come when something has broken.',
          ],
        },
        {
          heading: 'As a signal, good but slow',
          paragraphs: [
            'Historically, in the United States an inversion has come before almost every recession. That has made it the most quoted signal in finance.',
            'But the lag is long and unreliable — anywhere from six months to two years. An investor who exits the market on the day of the inversion can miss a year of gains before being proved right.',
            'That is the usual pattern with macro signals: useful for understanding the context, almost useless for timing.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'yield-curve',
          term: 'Kurbë yield-esh',
          definition:
            'Grafiku i yield-eve të obligacioneve shtetërore sipas afatit të maturimit.',
          aliases: ['kurba e yield-eve'],
        },
        {
          slug: 'inversion',
          term: 'Përmbysje',
          definition:
            'Kur yield-et afatshkurtra i kalojnë ato afatgjata — historikisht paralajmërim recesioni.',
          aliases: ['përmbysja', 'kurbë e përmbysur'],
        },
        {
          slug: 'term-premium',
          term: 'Premi afati',
          definition:
            'Shpërblimi shtesë për ta mbajtur një obligacion më afatgjatë.',
        },
      ],
      en: [
        {
          slug: 'yield-curve',
          term: 'Yield curve',
          definition: 'The chart of government bond yields across maturities.',
          aliases: ['yield curves'],
        },
        {
          slug: 'inversion',
          term: 'Inversion',
          definition:
            'When short-term yields exceed long-term ones — historically a recession warning.',
          aliases: ['inverted curve', 'inverted yield curve'],
        },
        {
          slug: 'term-premium',
          term: 'Term premium',
          definition: 'The extra reward for holding a longer-term bond.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Kurba përmbyset sot. Cili është leximi më i saktë?',
        options: [
          'Recesioni ka filluar tashmë',
          'Tregu pret ulje të mëdha të normave, që zakonisht ndodhin kur dobësohet ekonomia',
          'Obligacionet afatgjata janë bërë më të rrezikshme',
        ],
        answer: 1,
        explanation:
          'Përmbysja shpreh pritje për ulje të normave. Nuk e cakton kohën — vonesa historike shkon nga gjashtë muaj deri në dy vjet.',
      },
      en: {
        question: 'The curve inverts today. What is the most accurate reading?',
        options: [
          'A recession has already begun',
          'The market expects big rate cuts, which usually happen when the economy weakens',
          'Long-term bonds have become riskier',
        ],
        answer: 1,
        explanation:
          'An inversion expresses expectations of rate cuts. It does not set the timing — the historical lag runs from six months to two years.',
      },
    },
    upNextSlugs: {
      sq: ['recesionet', 'obligacionet'],
      en: ['recessions', 'bonds'],
    },
  },

  {
    id: 'what-is-gdp',
    slug: { sq: 'cka-eshte-pbb', en: 'what-is-gdp' },
    topicId: 'markets-economy',
    level: 'beginner',
    title: {
      sq: 'PBB-ja: matësi më i përmendur dhe më i keqkuptuar',
      en: 'GDP: the most quoted and most misunderstood measure',
    },
    summary: {
      sq: 'Vlera e gjithçkaje që prodhohet në një vend dhe pse rritja ka më shumë rëndësi se niveli.',
      en: 'The value of everything a country produces, and why growth matters more than the level.',
    },
    inOneSentence: {
      sq: 'PBB-ja e mat vlerën e të gjitha mallrave e shërbimeve të prodhuara brenda një vendi në një periudhë, kurse tregjet shikojnë vetëm sa shpejt po ndryshon.',
      en: 'GDP measures the value of all goods and services produced inside a country over a period, and markets only watch how fast it is changing.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë përfshin',
          paragraphs: [
            'PBB-ja i mbledh katër gjëra: sa shpenzojnë familjet, sa investojnë bizneset, sa shpenzon qeveria dhe eksportet minus importet.',
            'Konsumi zakonisht është më i madhi — rreth dy të tretat në ekonomitë e zhvilluara. Prandaj besimi i konsumatorëve ndiqet aq nga afër.',
            'Numërohet vetëm prodhimi i ri. Shitja e një shtëpie ekzistuese nuk hyn; komisioni i agjentit po, sepse ai është shërbim i ri.',
          ],
        },
        {
          heading: 'Reale kundër nominale',
          paragraphs: [
            'PBB-ja nominale rritet edhe kur prodhohet e njëjta sasi, por çmimet janë më të larta. Kjo është thuajse e padobishme.',
            'PBB-ja reale e heq inflacionin dhe tregon a u prodhuan vërtet më shumë gjëra. Kjo është shifra që raportohet dhe që ka rëndësi.',
            'Kur lexoni “ekonomia u rrit 2%”, thuajse gjithmonë bëhet fjalë për PBB-në reale, të krahasuar me tremujorin ose vitin e kaluar.',
          ],
        },
        {
          heading: 'Çfarë nuk mat',
          paragraphs: [
            'PBB-ja e numëron veprimtarinë, jo mirëqenien. Një tërmet që e shkatërron një qytet e rrit PBB-në vitin e ardhshëm, sepse rindërtimi është prodhim i ri.',
            'Nuk e kap punën e papaguar në shtëpi, nuk e mat pabarazinë dhe nuk e zbret dëmin ndaj mjedisit.',
            'Prandaj është matje e mirë e madhësisë së ekonomisë dhe matje e dobët e asaj se sa mirë jetojnë njerëzit.',
          ],
        },
      ],
      en: [
        {
          heading: 'What it includes',
          paragraphs: [
            'GDP adds up four things: what households spend, what businesses invest, what the government spends, and exports minus imports.',
            'Consumption is usually the biggest — around two thirds in developed economies. That is why consumer confidence is followed so closely.',
            "Only new production counts. The sale of an existing house does not go in; the agent's commission does, because that is a new service.",
          ],
        },
        {
          heading: 'Real versus nominal',
          paragraphs: [
            'Nominal GDP grows even when the same quantity is produced but prices are higher. That is nearly useless.',
            'Real GDP strips out inflation and shows whether more things were actually produced. That is the figure that gets reported and that matters.',
            'When you read "the economy grew 2%", it is almost always real GDP, compared with the previous quarter or year.',
          ],
        },
        {
          heading: 'What it does not measure',
          paragraphs: [
            'GDP counts activity, not wellbeing. An earthquake that destroys a city raises GDP the following year, because rebuilding is new production.',
            'It does not capture unpaid work at home, does not measure inequality, and does not subtract damage to the environment.',
            'So it is a good measure of the size of an economy and a poor measure of how well people live.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'gdp',
          term: 'PBB',
          definition:
            'Prodhimi i brendshëm bruto — vlera e gjithçkaje që prodhohet brenda një vendi.',
          aliases: ['PBB-ja', 'prodhimi i brendshëm bruto', 'GDP'],
        },
        {
          slug: 'real-gdp',
          term: 'PBB reale',
          definition:
            'PBB-ja pasi hiqet inflacioni — a u prodhuan vërtet më shumë gjëra.',
        },
        {
          slug: 'consumer-spending',
          term: 'Konsumi',
          definition:
            'Shpenzimet e familjeve, pjesa më e madhe e PBB-së në ekonomitë e zhvilluara.',
        },
      ],
      en: [
        {
          slug: 'gdp',
          term: 'GDP',
          definition:
            'Gross domestic product — the value of everything produced inside a country.',
          aliases: ['gross domestic product'],
        },
        {
          slug: 'real-gdp',
          term: 'Real GDP',
          definition:
            'GDP after stripping out inflation — whether more things were actually produced.',
        },
        {
          slug: 'consumer-spending',
          term: 'Consumer spending',
          definition:
            'Household spending, the largest part of GDP in developed economies.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Çmimet u rritën për 5% dhe prodhimi fizik mbeti i njëjti. Çka ndodh me PBB-në reale?',
        options: [
          'Rritet për 5%',
          'Mbetet pak a shumë e pandryshuar',
          'Bie për 5%',
        ],
        answer: 1,
        explanation:
          'PBB-ja reale e heq inflacionin. Nëse u prodhua e njëjta sasi, nuk luan — rritet vetëm ajo nominalja.',
      },
      en: {
        question:
          'Prices rose by 5% and physical output stayed the same. What happens to real GDP?',
        options: [
          'It rises by 5%',
          'It stays more or less unchanged',
          'It falls by 5%',
        ],
        answer: 1,
        explanation:
          'Real GDP strips out inflation. If the same quantity was produced, it does not move — only the nominal figure rises.',
      },
    },
    upNextSlugs: {
      sq: ['recesionet', 'raporti-i-punesimit'],
      en: ['recessions', 'the-jobs-report'],
    },
  },

  {
    id: 'reading-the-jobs-report',
    slug: { sq: 'raporti-i-punesimit', en: 'the-jobs-report' },
    topicId: 'markets-economy',
    level: 'intermediate',
    title: {
      sq: 'Raporti i punësimit: shifra që lëviz gjithçka',
      en: 'The jobs report: the number that moves everything',
    },
    summary: {
      sq: 'Tri shifra dalin përnjëherë, kurse ajo që e shikojnë tregjet nuk është ajo që del nëpër tituj.',
      en: 'Three figures come out at once, and the one markets watch is not the one that makes the headlines.',
    },
    inOneSentence: {
      sq: 'Raporti i punësimit tregon sa vende pune u hapën, sa njerëz janë pa punë dhe sa shpejt po rriten pagat — dhe e treta është ajo që i vendos normat.',
      en: 'The jobs report shows how many jobs were created, how many people are out of work and how fast wages are rising — and the third one is what sets interest rates.',
    },
    body: {
      sq: [
        {
          heading: 'Tri shifra, tri histori',
          paragraphs: [
            'Vendet e reja të punës tregojnë a po zgjerohet ekonomia. Një shifër e fortë do të thotë kërkesë e shëndoshë.',
            'Norma e papunësisë duket më e rëndësishme, por është më e ndërlikuar: mund të bjerë sepse njerëzit gjetën punë, ose sepse hoqën dorë nga kërkimi dhe dolën nga statistika.',
            'Rritja e pagave është ajo që e shikon banka qendrore. Pagat që rriten më shpejt se produktiviteti kalojnë në çmime, dhe ky është inflacion që nuk ikën vetë.',
          ],
        },
        {
          heading: 'Pse lajmi i mirë nganjëherë del i keq',
          paragraphs: [
            'Në periudha kur banka qendrore po e lufton inflacionin, një raport shumë i fortë i punësimit mund t’i ulë tregjet.',
            'Logjika: ekonomi e nxehtë do të thotë presion mbi pagat, që do të thotë inflacion i vazhdueshëm, që do të thotë norma të larta për më gjatë, që do të thotë vlerësime më të ulëta.',
            'Prandaj e njëjta shifër lexohet ndryshe sipas rrethanave. Në një ngadalësim, i njëjti raport i fortë do të ishte lajm i shkëlqyer.',
          ],
        },
        {
          heading: 'Kujdes me rishikimet',
          paragraphs: [
            'Shifrat e vendeve të punës rishikohen dy herë pas publikimit të parë, dhe rishikimet shpesh janë të mëdha — dhjetëra mijëra vende pune.',
            'Një muaj i vetëm ka shumë zhurmë. Mesatarja tremujore është shumë më e besueshme se çdo publikim i veçuar.',
            'Tregjet prapëseprapë reagojnë ashpër ndaj shifrës së parë dhe thuajse aspak ndaj rishikimit, edhe pse i dyti është më i saktë.',
          ],
        },
      ],
      en: [
        {
          heading: 'Three figures, three stories',
          paragraphs: [
            'New jobs show whether the economy is expanding. A strong number means healthy demand.',
            'The unemployment rate looks more important, but it is trickier: it can fall because people found jobs, or because they gave up looking and dropped out of the statistics.',
            'Wage growth is what the central bank watches. Wages rising faster than productivity feed into prices, and that is inflation that does not go away on its own.',
          ],
        },
        {
          heading: 'Why good news is sometimes bad',
          paragraphs: [
            'In periods when the central bank is fighting inflation, a very strong jobs report can push markets down.',
            'The logic: a hot economy means wage pressure, which means persistent inflation, which means rates staying high for longer, which means lower valuations.',
            'So the same number reads differently depending on the circumstances. In a slowdown, the same strong report would be excellent news.',
          ],
        },
        {
          heading: 'Mind the revisions',
          paragraphs: [
            'Jobs figures are revised twice after the first release, and the revisions are often large — tens of thousands of jobs.',
            'A single month carries a lot of noise. The three-month average is far more reliable than any individual release.',
            'Markets still react sharply to the first number and barely at all to the revision, even though the second is more accurate.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'nonfarm-payrolls',
          term: 'Vende pune jobujqësore',
          definition:
            'Numri i vendeve të punës që hapen brenda një muaji, jashtë bujqësisë. Publikimi më i ndjekur në SHBA.',
          aliases: ['payrolls', 'NFP'],
        },
        {
          slug: 'unemployment-rate',
          term: 'Normë papunësie',
          definition:
            'Përqindja e njerëzve që kërkojnë punë e nuk gjejnë. Nuk i numëron ata që kanë hequr dorë.',
          aliases: ['papunësia', 'norma e papunësisë'],
        },
        {
          slug: 'wage-growth',
          term: 'Rritje pagash',
          definition:
            'Sa shpejt rriten pagat. Kur e kalon produktivitetin, kalon në çmime.',
          aliases: ['rritja e pagave'],
        },
        {
          slug: 'participation-rate',
          term: 'Normë pjesëmarrjeje',
          definition:
            'Sa përqind e popullsisë në moshë pune është e punësuar ose po kërkon punë.',
        },
      ],
      en: [
        {
          slug: 'nonfarm-payrolls',
          term: 'Nonfarm payrolls',
          definition:
            'The number of jobs created in a month, outside farming. The most watched release in the US.',
          aliases: ['payrolls', 'NFP'],
        },
        {
          slug: 'unemployment-rate',
          term: 'Unemployment rate',
          definition:
            'The share of people looking for work who cannot find it. It does not count those who have given up.',
          aliases: ['unemployment', 'jobless rate'],
        },
        {
          slug: 'wage-growth',
          term: 'Wage growth',
          definition:
            'How fast wages are rising. When it outpaces productivity, it feeds into prices.',
          aliases: ['wage inflation'],
        },
        {
          slug: 'participation-rate',
          term: 'Participation rate',
          definition:
            'The share of the working-age population that is employed or looking for work.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Papunësia bie, por bie edhe norma e pjesëmarrjes. Çka ka gjasa të ketë ndodhur?',
        options: [
          'Ekonomia është shumë e fortë',
          'Disa njerëz hoqën dorë nga kërkimi dhe dolën nga statistika',
          'Pagat u rritën shumë',
        ],
        answer: 1,
        explanation:
          'Papunësia i numëron vetëm ata që kërkojnë punë aktivisht. Kur njerëzit heqin dorë, ajo bie pa u përmirësuar asgjë.',
      },
      en: {
        question:
          'Unemployment falls, but the participation rate falls too. What has most likely happened?',
        options: [
          'The economy is very strong',
          'Some people gave up looking and dropped out of the statistics',
          'Wages rose a lot',
        ],
        answer: 1,
        explanation:
          'The unemployment rate only counts people actively looking for work. When people give up, it falls without anything improving.',
      },
    },
    upNextSlugs: {
      sq: ['recesionet', 'cka-bejne-bankat-qendrore'],
      en: ['recessions', 'what-central-banks-do'],
    },
  },

  {
    id: 'why-the-dollar-matters',
    slug: { sq: 'pse-ka-rendesi-dollari', en: 'why-the-dollar-matters' },
    topicId: 'markets-economy',
    level: 'intermediate',
    noMaths: true,
    title: {
      sq: 'Pse dollari ka rëndësi edhe nëse s’keni asnjë',
      en: "Why the dollar matters even if you don't own any",
    },
    summary: {
      sq: 'Pjesa më e madhe e tregtisë botërore faturohet në dollarë, prandaj forca e tij i prek çmimet shumë larg Amerikës.',
      en: 'Most of world trade is invoiced in dollars, so its strength touches prices far beyond America.',
    },
    inOneSentence: {
      sq: 'Kur dollari forcohet, gjithçka që faturohet në dollarë shtrenjtohet për këdo që fiton në monedhë tjetër.',
      en: 'When the dollar strengthens, everything invoiced in dollars gets more expensive for anyone who earns in another currency.',
    },
    body: {
      sq: [
        {
          heading: 'Monedha e faturës',
          paragraphs: [
            'Nafta, gazi, bakri, gruri dhe pjesa më e madhe e tregtisë ndërkombëtare çmohen në dollarë, edhe kur as blerësi as shitësi nuk janë amerikanë.',
            'Prandaj një dollar më i fortë e shtrenjton naftën në euro, edhe nëse çmimi në dollarë nuk ka luajtur fare.',
            'Kjo është rruga e parë përmes së cilës një vendim i Rezervës Federale ia ndryshon faturën e energjisë një familjeje në Evropë.',
          ],
        },
        {
          heading: 'Borxhi në dollarë',
          paragraphs: [
            'Shumë qeveri dhe kompani në ekonomitë në zhvillim marrin hua në dollarë sepse dalin më lirë. Por të ardhurat i kanë në monedhën e vendit.',
            'Kur dollari forcohet, ai borxh rëndohet pa u rritur asnjë cent. Kjo është arsyeja që përsëritet në krizat e tregjeve në zhvillim.',
            'Prandaj një cikël shtrëngimi në Uashington u sjell telashe vendeve që s’kanë asnjë lidhje me ekonominë amerikane.',
          ],
        },
        {
          heading: 'Çfarë e lëviz vetë dollarin',
          paragraphs: [
            'Faktori kryesor janë normat në krahasim me njëra-tjetrën. Nëse normat amerikane rriten e ato evropiane jo, paratë shkojnë kah kthimi më i lartë dhe dollari forcohet.',
            'Faktori i dytë është frika. Në kriza, investitorët ikin kah asetet që i quajnë më të sigurta, e kjo do të thotë obligacione amerikane — pra dollarë.',
            'Prandaj dollari shpesh forcohet pikërisht atëherë kur lajmet janë të këqija kudo, edhe në vetë Amerikën.',
          ],
        },
      ],
      en: [
        {
          heading: 'The invoicing currency',
          paragraphs: [
            'Oil, gas, copper, wheat and most of international trade are priced in dollars, even when neither the buyer nor the seller is American.',
            'So a stronger dollar makes oil more expensive in euros, even if the dollar price has not moved at all.',
            'That is the first channel through which a Federal Reserve decision changes the energy bill of a family in Europe.',
          ],
        },
        {
          heading: 'Dollar debt',
          paragraphs: [
            'Many governments and companies in emerging economies borrow in dollars because it comes cheaper. But their income is in the local currency.',
            'When the dollar strengthens, that debt gets heavier without a single cent being added. It is the reason that repeats itself across emerging market crises.',
            'So a tightening cycle in Washington brings trouble to countries that have nothing to do with the American economy.',
          ],
        },
        {
          heading: 'What moves the dollar itself',
          paragraphs: [
            'The main factor is interest rates relative to each other. If American rates rise and European ones do not, money flows towards the higher return and the dollar strengthens.',
            'The second factor is fear. In a crisis, investors flee to the assets they consider safest, and that means American bonds — in other words, dollars.',
            'That is why the dollar often strengthens precisely when the news is bad everywhere, even in America itself.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'reserve-currency',
          term: 'Monedhë rezervë',
          definition:
            'Monedhë që e mbajnë bankat qendrore dhe në të cilën faturohet tregtia botërore.',
        },
        {
          slug: 'exchange-rate',
          term: 'Kurs këmbimi',
          definition: 'Sa vlen një monedhë, e shprehur në një tjetër.',
          aliases: ['kursi i këmbimit'],
        },
        {
          slug: 'safe-haven',
          term: 'Strehë e sigurt',
          definition:
            'Aset kah i cili ikin paratë kur rritet frika, si obligacionet amerikane ose ari.',
        },
      ],
      en: [
        {
          slug: 'reserve-currency',
          term: 'Reserve currency',
          definition:
            'A currency held by central banks and used to invoice world trade.',
        },
        {
          slug: 'exchange-rate',
          term: 'Exchange rate',
          definition: 'What one currency is worth, expressed in another.',
          aliases: ['exchange rates', 'FX rate'],
        },
        {
          slug: 'safe-haven',
          term: 'Safe haven',
          definition:
            'An asset money flees to when fear rises, like American bonds or gold.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Çmimi i naftës në dollarë nuk ndryshon, por dollari forcohet për 10%. Çka ndodh me faturën në euro?',
        options: ['Nuk ndryshon', 'Rritet për rreth 10%', 'Bie për rreth 10%'],
        answer: 1,
        explanation:
          'Nafta faturohet në dollarë. Nëse duhen më shumë euro për një dollar, e njëjta fuçi kushton më shumë euro.',
      },
      en: {
        question:
          'The dollar price of oil does not change, but the dollar strengthens by 10%. What happens to the bill in euros?',
        options: [
          'It does not change',
          'It rises by about 10%',
          'It falls by about 10%',
        ],
        answer: 1,
        explanation:
          'Oil is invoiced in dollars. If it takes more euros to buy a dollar, the same barrel costs more euros.',
      },
    },
    relatedSymbols: ['eur-usd', 'gold'],
    upNextSlugs: {
      sq: ['nafta-dhe-ekonomia', 'si-levizin-normat-e-interesit'],
      en: ['oil-and-the-economy', 'how-interest-rates-move'],
    },
  },

  {
    id: 'oil-and-the-economy',
    slug: { sq: 'nafta-dhe-ekonomia', en: 'oil-and-the-economy' },
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Nafta dhe ekonomia', en: 'Oil and the economy' },
    summary: {
      sq: 'Një çmim që hyn në koston e thuajse gjithçkaje — dhe pse burimi i lëvizjes ka më shumë rëndësi se madhësia e saj.',
      en: 'A price that feeds into the cost of almost everything — and why the source of the move matters more than its size.',
    },
    inOneSentence: {
      sq: 'Nafta është kosto hyrëse për transportin, prodhimin dhe ushqimin, prandaj çmimi i saj kalon në inflacion me disa muaj vonesë.',
      en: 'Oil is an input cost for transport, manufacturing and food, so its price passes into inflation with a lag of a few months.',
    },
    body: {
      sq: [
        {
          heading: 'Pse prek gjithçka',
          paragraphs: [
            'Çdo mall që shkon nga fabrika te dyqani duhet transportuar. Çdo pleh kimik prodhohet nga gazi. Çdo plastikë e nis si naftë.',
            'Prandaj rritja e çmimit të naftës nuk mbetet te pompa e derivateve. Del disa muaj më vonë në çmimin e ushqimit, të mobilieve dhe të thuajse çdo gjëje që prodhohet.',
            'Prandaj bankat qendrore e heqin energjinë nga inflacioni bazë, por nuk mund ta lënë anash kur ajo qëndron lart për një kohë të gjatë.',
          ],
        },
        {
          heading: 'Ofertë apo kërkesë',
          paragraphs: [
            'Kjo është pyetja që ka rëndësi. Nëse nafta rritet sepse ekonomia botërore po ecën mirë dhe të gjithë po prodhojnë më shumë, kjo është shenjë force.',
            'Nëse rritet sepse një konflikt e ndërpreu furnizimin, kjo është taksë mbi konsumatorët: paguajnë më shumë dhe nuk marrin asgjë shtesë.',
            'E njëjta lëvizje e çmimit, dy kuptime krejt të kundërta për aksionet. Prandaj titujt që e japin vetëm shifrën nuk ju thonë sa duhet.',
          ],
        },
        {
          heading: 'Kush fiton dhe kush humb',
          paragraphs: [
            'Vendet eksportuese fitojnë; ato importuese vuajnë. Prandaj e njëjta rritje e naftës e forcon monedhën norvegjeze dhe e dobëson atë turke.',
            'Brenda tregut të aksioneve, kompanitë e energjisë fitojnë, kurse kompanitë ajrore, transporti dhe industria kimike vuajnë.',
            'Prandaj një indeks i gjerë mund të duket i qetë, ndërsa poshtë sipërfaqes ka lëvizje të mëdha në drejtime të kundërta.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why it touches everything',
          paragraphs: [
            'Every good that travels from factory to shop has to be transported. Every fertiliser is made from gas. Every plastic starts life as oil.',
            'So a rise in the oil price does not stay at the petrol pump. It shows up a few months later in the price of food, furniture and almost everything that gets made.',
            'That is why central banks strip energy out of core inflation, but cannot ignore it when it stays high for a long time.',
          ],
        },
        {
          heading: 'Supply or demand',
          paragraphs: [
            'This is the question that matters. If oil rises because the world economy is doing well and everyone is producing more, that is a sign of strength.',
            'If it rises because a conflict cut off supply, it is a tax on consumers: they pay more and get nothing extra.',
            'The same price move, two completely opposite meanings for shares. That is why headlines that only give you the number do not tell you enough.',
          ],
        },
        {
          heading: 'Who wins and who loses',
          paragraphs: [
            'Exporting countries win; importing ones suffer. That is why the same rise in oil strengthens the Norwegian currency and weakens the Turkish one.',
            'Within the stock market, energy companies gain, while airlines, transport and the chemical industry suffer.',
            'So a broad index can look calm while big moves in opposite directions are happening beneath the surface.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'commodity',
          term: 'Mall bazë',
          definition:
            'Lëndë e parë e standardizuar, si nafta, ari a gruri, ku njësia është e njëjtë kudo.',
          aliases: ['mallra bazë', 'komoditet'],
        },
        {
          slug: 'supply-shock',
          term: 'Goditje oferte',
          definition:
            'Ndërprerje e papritur e furnizimit, që i rrit çmimet pa u rritur kërkesa.',
        },
        {
          slug: 'pass-through',
          term: 'Kalim në çmime',
          definition:
            'Procesi përmes të cilit një kosto hyrëse më e lartë del në fund te çmimet e konsumit.',
        },
      ],
      en: [
        {
          slug: 'commodity',
          term: 'Commodity',
          definition:
            'A standardised raw material, like oil, gold or wheat, where one unit is the same everywhere.',
          aliases: ['commodities'],
        },
        {
          slug: 'supply-shock',
          term: 'Supply shock',
          definition:
            'A sudden interruption of supply that pushes prices up without demand rising.',
        },
        {
          slug: 'pass-through',
          term: 'Pass-through',
          definition:
            'The process by which a higher input cost ends up in consumer prices.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Nafta rritet për 30% nga një ndërprerje e furnizimit. Si dallon kjo nga një rritje që vjen prej kërkesës së fortë?',
        options: [
          'S’ka dallim, çmimi është çmim',
          'Është kosto për konsumatorët, pa asnjë përfitim ekonomik që e shoqëron',
          'Është gjithmonë lajm i mirë për aksionet',
        ],
        answer: 1,
        explanation:
          'Goditja e ofertës u merr para konsumatorëve pa u rritur asnjë veprimtari. Rritja nga kërkesa e shoqëron një ekonomi që po zgjerohet.',
      },
      en: {
        question:
          'Oil rises 30% because of a supply disruption. How is that different from a rise driven by strong demand?',
        options: [
          'There is no difference, a price is a price',
          'It is a cost to consumers, with no economic benefit alongside it',
          'It is always good news for shares',
        ],
        answer: 1,
        explanation:
          'A supply shock takes money from consumers without any activity increasing. A demand-driven rise comes with an expanding economy.',
      },
    },
    relatedSymbols: ['gold'],
    upNextSlugs: {
      sq: ['inflacioni', 'recesionet'],
      en: ['inflation', 'recessions'],
    },
  },

  {
    id: 'recessions-explained',
    slug: { sq: 'recesionet', en: 'recessions' },
    topicId: 'markets-economy',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Recesionet, të shpjeguara', en: 'Recessions, explained' },
    summary: {
      sq: 'Çka është vërtet një recesion, kush e shpall dhe pse tregu e di para statistikave.',
      en: 'What a recession really is, who declares it, and why the market knows before the statistics do.',
    },
    inOneSentence: {
      sq: 'Recesioni është rënie e gjerë dhe e zgjatur e veprimtarisë ekonomike, kurse shpallet zyrtarisht shumë kohë pasi ka filluar.',
      en: 'A recession is a broad, prolonged decline in economic activity, and it is officially declared long after it has begun.',
    },
    body: {
      sq: [
        {
          heading: 'Përkufizimi dhe kufizimet e tij',
          paragraphs: [
            'Rregulli i shpejtë janë dy tremujorë radhazi me PBB reale në rënie. Është i dobishëm, por i papërsosur: një rënie e cekët gjashtëmujore mund të mos ndihet si recesion, kurse një rrëzim i fortë tremujor po.',
            'Në praktikë, komisionet zyrtare i shikojnë disa tregues bashkë: punësimin, të ardhurat, prodhimin dhe shitjet, jo vetëm PBB-në.',
            'Këto komisione e shpallin recesionin muaj a vite pasi ka filluar, sepse presin të dhëna të plota. Shpallja është shënim historik, jo paralajmërim.',
          ],
        },
        {
          heading: 'Pse tregjet bien para se të mbërrijë',
          paragraphs: [
            'Aksionet e çmojnë të ardhmen. Kur investitorët fillojnë të presin fitime më të ulëta, shesin — edhe pse statistikat e sotme janë ende të mira.',
            'Prandaj tregu zakonisht bie disa muaj para se recesioni të fillojë zyrtarisht dhe fillon të rimëkëmbet kur lajmet janë ende të tmerrshme.',
            'Prandaj pritja e “qartësisë” para se të investoni del aq keq: kur gjendja bëhet e qartë, rimëkëmbja ka ndodhur tashmë.',
          ],
        },
        {
          heading: 'Çfarë ndodh brenda',
          paragraphs: [
            'Kompanitë i ulin investimet dhe punësimin. Papunësia rritet, të ardhurat bien, konsumi bie, e kjo prapë ua ul të ardhurat kompanive.',
            'Banka qendrore zakonisht i ul normat për ta thyer këtë rreth, kurse qeveria mund t’i rrisë shpenzimet.',
            'Recesionet janë të dhimbshme, por edhe normale — pjesë e ciklit, jo dalje prej tij. Që nga Lufta e Dytë Botërore, ekonomitë e zhvilluara kanë kaluar nga një mesatarisht çdo dhjetë vjet.',
          ],
        },
      ],
      en: [
        {
          heading: 'The definition and its limits',
          paragraphs: [
            'The rule of thumb is two consecutive quarters of falling real GDP. It is useful but imperfect: a shallow six-month dip may not feel like a recession, while a sharp one-quarter crash does.',
            'In practice, official committees look at several indicators together: employment, incomes, production and sales, not just GDP.',
            'Those committees declare a recession months or years after it has begun, because they wait for complete data. The declaration is a historical record, not a warning.',
          ],
        },
        {
          heading: 'Why markets fall before it arrives',
          paragraphs: [
            "Shares price the future. When investors start expecting lower profits, they sell — even though today's statistics still look fine.",
            'That is why the market usually falls several months before a recession officially begins, and starts recovering while the news is still terrible.',
            'And that is why waiting for "clarity" before investing works out so badly: by the time things become clear, the recovery has already happened.',
          ],
        },
        {
          heading: 'What happens inside one',
          paragraphs: [
            'Companies cut investment and hiring. Unemployment rises, incomes fall, spending falls, and that cuts company revenues all over again.',
            'The central bank usually cuts rates to break that loop, and the government may raise spending.',
            'Recessions are painful, but also normal — part of the cycle, not a departure from it. Since the Second World War, developed economies have gone through one roughly every ten years.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'recession',
          term: 'Recesion',
          definition: 'Rënie e gjerë dhe e zgjatur e veprimtarisë ekonomike.',
          aliases: ['recesioni', 'recesione'],
        },
        {
          slug: 'business-cycle',
          term: 'Cikël ekonomik',
          definition:
            'Ndërrimi i përsëritur i zgjerimit dhe i tkurrjes në një ekonomi.',
          aliases: ['cikli ekonomik'],
        },
        {
          slug: 'leading-indicator',
          term: 'Tregues paraprijës',
          definition:
            'Matje që lëviz para ekonomisë në tërësi, si porositë e reja ose kurba e yield-eve.',
        },
        {
          slug: 'soft-landing',
          term: 'Ulje e butë',
          definition:
            'Ngadalësimi i inflacionit pa e shkaktuar recesionin. E rrallë dhe e vështirë.',
        },
      ],
      en: [
        {
          slug: 'recession',
          term: 'Recession',
          definition: 'A broad, prolonged decline in economic activity.',
          aliases: ['recessions'],
        },
        {
          slug: 'business-cycle',
          term: 'Business cycle',
          definition:
            'The repeated alternation of expansion and contraction in an economy.',
          aliases: ['economic cycle'],
        },
        {
          slug: 'leading-indicator',
          term: 'Leading indicator',
          definition:
            'A measure that moves before the economy as a whole, like new orders or the yield curve.',
        },
        {
          slug: 'soft-landing',
          term: 'Soft landing',
          definition:
            'Slowing inflation without causing a recession. Rare and difficult.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse u del keq investitorëve pritja derisa lajmet ekonomike të bëhen të qarta?',
        options: [
          'Sepse lajmet nuk janë kurrë të sakta',
          'Sepse tregu e çmon të ardhmen dhe rimëkëmbet kur lajmet janë ende të këqija',
          'Sepse brokerët i ndalin blerjet gjatë recesionit',
        ],
        answer: 1,
        explanation:
          'Tregu lëviz para ekonomisë. Kur statistikat e vërtetojnë përmirësimin, çmimet e kanë përfshirë tashmë.',
      },
      en: {
        question:
          'Why does waiting for the economic news to become clear work out badly for investors?',
        options: [
          'Because the news is never accurate',
          'Because the market prices the future and recovers while the news is still bad',
          'Because brokers halt purchases during a recession',
        ],
        answer: 1,
        explanation:
          'The market moves ahead of the economy. By the time the statistics confirm the improvement, prices already reflect it.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['pse-bien-tregjet', 'kurba-e-yield-eve'],
      en: ['why-markets-fall', 'the-yield-curve'],
    },
  },

  {
    id: 'why-markets-fall',
    slug: { sq: 'pse-bien-tregjet', en: 'why-markets-fall' },
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Pse bien tregjet dhe çka të bëni',
      en: 'Why markets fall and what to do',
    },
    summary: {
      sq: 'Korrigjime, tregje ariu dhe panik — sa shpesh ndodhin dhe pse janë çmimi që paguhet për të hyrë.',
      en: 'Corrections, bear markets and panics — how often they happen and why they are the price of admission.',
    },
    inOneSentence: {
      sq: 'Rëniet janë të zakonshme, të pashmangshme dhe të përkohshme — dhe pikërisht se ekzistojnë ato, aksionet paguajnë më shumë se depozitat.',
      en: 'Declines are common, unavoidable and temporary — and it is precisely because they exist that shares pay more than deposits.',
    },
    body: {
      sq: [
        {
          heading: 'Emrat dhe shpeshtësia',
          paragraphs: [
            'Rënia prej 10% quhet korrigjim dhe ndodh thuajse çdo vit. Rënia prej 20% quhet treg ariu dhe ndodh mesatarisht një herë në disa vjet.',
            'Rëniet prej 30% e më shumë ndodhin disa herë gjatë një jete investimi. Të gjitha deri tash janë rimëkëmbur, edhe pse disave u janë dashur vite.',
            'Kur i dini këto shifra qysh më parë, një rënie prej 15% bëhet gjë e pritur, jo provë se diçka ka shkuar keq.',
          ],
        },
        {
          heading: 'Pse ju paguhet për t’i duruar',
          paragraphs: [
            'Historikisht, aksionet japin më shumë se depozitat pikërisht sepse është e rëndë të mbahen. Po të mos kishte rënie, nuk do të kishte as shpërblim shtesë.',
            'Kthimi më i lartë nuk është dhuratë — është pagesa që e duroni pasigurinë dhe nuk shitni kur bie.',
            'Prandaj rreziku nuk duhet shmangur krejtësisht; duhet marrë aq sa mund ta duroni deri në fund.',
          ],
        },
        {
          heading: 'Çfarë të bëni kur ndodh',
          paragraphs: [
            'Vendimi më i rëndësishëm merret para rënies, jo gjatë saj: sa nga paratë tuaja i keni të investuara dhe a keni një rezervë që ju lejon të mos shitni.',
            'Gjatë rënies, gjëja më e mirë zakonisht është t’i vazhdoni kontributet e rregullta. Ato blejnë më shumë njësi për të njëjtat para.',
            'Nëse një rënie nuk ju lë të flini, ky është informacion i vlefshëm: portofoli juaj është më i rrezikshëm se sa duroni vërtet. Rregullojeni pasi të qetësohet tregu, jo në mes të panikut.',
          ],
        },
      ],
      en: [
        {
          heading: 'The names and the frequency',
          paragraphs: [
            'A 10% decline is called a correction and happens almost every year. A 20% decline is called a bear market and happens on average once every few years.',
            'Declines of 30% or more happen a few times over an investing lifetime. All of them so far have recovered, though some took years.',
            'When you know these numbers in advance, a 15% decline becomes something expected, not proof that something has gone wrong.',
          ],
        },
        {
          heading: 'Why you get paid to endure them',
          paragraphs: [
            'Historically, shares return more than deposits precisely because they are hard to hold. If there were no declines, there would be no extra reward either.',
            'The higher return is not a gift — it is payment for enduring the uncertainty and not selling when it falls.',
            'So risk should not be avoided entirely; you should take as much of it as you can endure to the end.',
          ],
        },
        {
          heading: 'What to do when it happens',
          paragraphs: [
            'The most important decision is made before the fall, not during it: how much of your money is invested, and whether you have a reserve that lets you avoid selling.',
            'During a decline, the best move is usually to keep up your regular contributions. They buy more units for the same money.',
            'If a decline keeps you up at night, that is valuable information: your portfolio is riskier than you can truly endure. Adjust it after the market calms down, not in the middle of the panic.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Sa shpesh ndodhin',
        columns: ['Rënia', 'Emri', 'Shpeshtësia historike'],
        rows: [
          { label: '−10%', value: 'Korrigjim', cost: 'Thuajse çdo vit' },
          { label: '−20%', value: 'Treg ariu', cost: 'Një herë në disa vjet' },
          {
            label: '−30% ose më shumë',
            value: 'Krizë',
            cost: 'Disa herë brenda një jete',
            tone: 'negative',
          },
        ],
      },
      en: {
        heading: 'How often they happen',
        columns: ['Decline', 'Name', 'Historical frequency'],
        rows: [
          { label: '−10%', value: 'Correction', cost: 'Almost every year' },
          { label: '−20%', value: 'Bear market', cost: 'Once every few years' },
          {
            label: '−30% or more',
            value: 'Crisis',
            cost: 'A few times in a lifetime',
            tone: 'negative',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'correction',
          term: 'Korrigjim',
          definition: 'Rënie prej rreth 10% nga maja e fundit.',
          aliases: ['korrigjimi'],
        },
        {
          slug: 'bear-market',
          term: 'Treg ariu',
          definition: 'Rënie prej 20% a më shumë nga maja.',
          aliases: ['tregu i ariut'],
        },
        {
          slug: 'bull-market',
          term: 'Treg demi',
          definition: 'Periudhë e gjatë rritjeje të çmimeve.',
          aliases: ['tregu i demit'],
        },
        {
          slug: 'capitulation',
          term: 'Dorëzim',
          definition:
            'Shitja masive nga dëshpërimi, që shpesh e shënon fundin e një rënieje.',
        },
      ],
      en: [
        {
          slug: 'correction',
          term: 'Correction',
          definition: 'A decline of about 10% from the most recent peak.',
          aliases: ['corrections'],
        },
        {
          slug: 'bear-market',
          term: 'Bear market',
          definition: 'A decline of 20% or more from the peak.',
          aliases: ['bear markets'],
        },
        {
          slug: 'bull-market',
          term: 'Bull market',
          definition: 'A long period of rising prices.',
          aliases: ['bull markets'],
        },
        {
          slug: 'capitulation',
          term: 'Capitulation',
          definition:
            'Mass selling out of despair, which often marks the end of a decline.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse historikisht aksionet paguajnë më shumë se depozitat bankare?',
        options: [
          'Sepse kompanitë janë të detyruara me ligj t’i shpërblejnë aksionerët',
          'Sepse për t’i mbajtur duhet duruar rëniet, dhe ky durim shpërblehet',
          'Sepse bankat marrin tarifa të larta',
        ],
        answer: 1,
        explanation:
          'Shpërblimi shtesë është pagesa për pasigurinë. Pa rënie nuk do të kishte as premi mbi depozitat.',
      },
      en: {
        question: 'Why have shares historically paid more than bank deposits?',
        options: [
          'Because companies are legally required to reward shareholders',
          'Because holding them means enduring the declines, and that endurance is rewarded',
          'Because banks charge high fees',
        ],
        answer: 1,
        explanation:
          'The extra reward is payment for uncertainty. Without declines there would be no premium over deposits.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: {
      sq: ['koha-ne-treg', 'rreziku-dhe-kthimi'],
      en: ['time-in-the-market', 'risk-and-return'],
    },
  },
];
