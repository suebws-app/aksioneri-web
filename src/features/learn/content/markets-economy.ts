import type { SeedLesson, SeedTopic } from './types';

/**
 * Tregjet dhe ekonomia — the figures the calendar publishes, and why a share
 * price in Frankfurt moves when a number is released in Washington.
 *
 * Ordered so that inflation comes before interest rates, and interest rates
 * before everything they drive.
 */
export const MARKETS_ECONOMY_TOPIC: SeedTopic = {
  id: 'markets-economy',
  title: { sq: 'Tregjet dhe ekonomia' },
  slugs: [
    'inflation-in-one-page',
    'what-moves-interest-rates',
    'what-central-banks-do',
    'how-to-read-the-economic-calendar',
    'bonds-explained',
    'the-yield-curve',
    'what-is-gdp',
    'reading-the-jobs-report',
    'why-the-dollar-matters',
    'oil-and-the-economy',
    'recessions-explained',
    'why-markets-fall',
  ],
};

export const MARKETS_ECONOMY_LESSONS: SeedLesson[] = [
  {
    id: 'inflation-in-one-page',
    slug: 'inflation-in-one-page',
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'Inflacioni në një faqe' },
    summary: {
      sq: 'Çka mat vërtet CPI-ja, pse synohet 2% dhe pse çmimet nuk kthehen kurrë poshtë.',
    },
    inOneSentence: {
      sq: 'Inflacioni është shpejtësia me të cilën paratë tuaja blejnë gjithnjë e më pak, dhe matet duke e ndjekur me kohë çmimin e së njëjtës shportë mallrash.',
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
    },
    relatedSymbols: ['gold'],
    upNextSlugs: ['what-moves-interest-rates', 'what-central-banks-do'],
  },

  {
    id: 'what-moves-interest-rates',
    slug: 'what-moves-interest-rates',
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'Çka i lëviz normat e interesit' },
    summary: {
      sq: 'Një shifër e vetme që ua ndryshon çmimin të gjitha gjërave të tjera — dhe pse.',
    },
    inOneSentence: {
      sq: 'Norma bazë është çmimi i parasë, dhe kur ai çmim ndryshon, rivlerësohet gjithçka që matet në para.',
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
    },
    relatedSymbols: ['eur-usd', 'gold'],
    upNextSlugs: ['what-central-banks-do', 'bonds-explained'],
  },

  {
    id: 'what-central-banks-do',
    slug: 'what-central-banks-do',
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Çka bëjnë vërtet bankat qendrore' },
    summary: {
      sq: 'Dy detyra, disa mjete dhe një armë që e përdorin më shumë se të gjitha të tjerat: fjalët.',
    },
    inOneSentence: {
      sq: 'Banka qendrore mundohet t’i mbajë çmimet të qëndrueshme dhe punësimin të lartë, kryesisht duke i bindur tregjet se çka do të bëjë më vonë.',
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
    },
    relatedSymbols: ['eur-usd'],
    upNextSlugs: ['how-to-read-the-economic-calendar', 'the-yield-curve'],
  },

  {
    id: 'how-to-read-the-economic-calendar',
    slug: 'how-to-read-the-economic-calendar',
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'Si të lexoni kalendarin ekonomik' },
    summary: {
      sq: 'Tri kolona kanë rëndësi: pritur, aktuale dhe e mëparshme. Lajmi është dallimi mes dy të parave.',
    },
    inOneSentence: {
      sq: 'Kalendari nuk ju tregon çka do të ndodhë me tregun — ju tregon kur do ta mësojmë a ishte e saktë pritja.',
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
    },
    upNextSlugs: ['reading-the-jobs-report', 'what-is-gdp'],
  },

  {
    id: 'bonds-explained',
    slug: 'bonds-explained',
    topicId: 'markets-economy',
    level: 'intermediate',
    title: { sq: 'Obligacionet, të shpjeguara' },
    summary: {
      sq: 'Një hua që e jepni ju, me kupon të fiksuar — dhe pse çmimi i saj bie kur rriten normat.',
    },
    inOneSentence: {
      sq: 'Obligacioni është hua me kushte të fiksuara, dhe meqë kushtet janë të fiksuara, e vetmja gjë që mund të luajë është çmimi.',
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
    },
    upNextSlugs: ['the-yield-curve', 'what-moves-interest-rates'],
  },

  {
    id: 'the-yield-curve',
    slug: 'the-yield-curve',
    topicId: 'markets-economy',
    level: 'advanced',
    title: { sq: 'Kurba e yield-eve dhe pse e shikojnë të gjithë' },
    summary: {
      sq: 'Kur huaja dyvjeçare paguan më shumë se ajo dhjetëvjeçare, tregu po thotë diçka të keqe.',
    },
    inOneSentence: {
      sq: 'Kurba e yield-eve e vizaton sa paguajnë obligacionet shtetërore në afate të ndryshme, kurse forma e saj tregon çka pret tregu nga ekonomia.',
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
    },
    upNextSlugs: ['recessions-explained', 'bonds-explained'],
  },

  {
    id: 'what-is-gdp',
    slug: 'what-is-gdp',
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'PBB-ja: matësi më i përmendur dhe më i keqkuptuar' },
    summary: {
      sq: 'Vlera e gjithçkaje që prodhohet në një vend dhe pse rritja ka më shumë rëndësi se niveli.',
    },
    inOneSentence: {
      sq: 'PBB-ja e mat vlerën e të gjitha mallrave e shërbimeve të prodhuara brenda një vendi në një periudhë, kurse tregjet shikojnë vetëm sa shpejt po ndryshon.',
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
    },
    upNextSlugs: ['recessions-explained', 'reading-the-jobs-report'],
  },

  {
    id: 'reading-the-jobs-report',
    slug: 'reading-the-jobs-report',
    topicId: 'markets-economy',
    level: 'intermediate',
    title: { sq: 'Raporti i punësimit: shifra që lëviz gjithçka' },
    summary: {
      sq: 'Tri shifra dalin përnjëherë, kurse ajo që e shikojnë tregjet nuk është ajo që del nëpër tituj.',
    },
    inOneSentence: {
      sq: 'Raporti i punësimit tregon sa vende pune u hapën, sa njerëz janë pa punë dhe sa shpejt po rriten pagat — dhe e treta është ajo që i vendos normat.',
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
    },
    upNextSlugs: ['recessions-explained', 'what-central-banks-do'],
  },

  {
    id: 'why-the-dollar-matters',
    slug: 'why-the-dollar-matters',
    topicId: 'markets-economy',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Pse dollari ka rëndësi edhe nëse s’keni asnjë' },
    summary: {
      sq: 'Pjesa më e madhe e tregtisë botërore faturohet në dollarë, prandaj forca e tij i prek çmimet shumë larg Amerikës.',
    },
    inOneSentence: {
      sq: 'Kur dollari forcohet, gjithçka që faturohet në dollarë shtrenjtohet për këdo që fiton në monedhë tjetër.',
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
    },
    relatedSymbols: ['eur-usd', 'gold'],
    upNextSlugs: ['oil-and-the-economy', 'what-moves-interest-rates'],
  },

  {
    id: 'oil-and-the-economy',
    slug: 'oil-and-the-economy',
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Nafta dhe ekonomia' },
    summary: {
      sq: 'Një çmim që hyn në koston e thuajse gjithçkaje — dhe pse burimi i lëvizjes ka më shumë rëndësi se madhësia e saj.',
    },
    inOneSentence: {
      sq: 'Nafta është kosto hyrëse për transportin, prodhimin dhe ushqimin, prandaj çmimi i saj kalon në inflacion me disa muaj vonesë.',
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
    },
    relatedSymbols: ['gold'],
    upNextSlugs: ['inflation-in-one-page', 'recessions-explained'],
  },

  {
    id: 'recessions-explained',
    slug: 'recessions-explained',
    topicId: 'markets-economy',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Recesionet, të shpjeguara' },
    summary: {
      sq: 'Çka është vërtet një recesion, kush e shpall dhe pse tregu e di para statistikave.',
    },
    inOneSentence: {
      sq: 'Recesioni është rënie e gjerë dhe e zgjatur e veprimtarisë ekonomike, kurse shpallet zyrtarisht shumë kohë pasi ka filluar.',
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
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['why-markets-fall', 'the-yield-curve'],
  },

  {
    id: 'why-markets-fall',
    slug: 'why-markets-fall',
    topicId: 'markets-economy',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Pse bien tregjet dhe çka të bëni' },
    summary: {
      sq: 'Korrigjime, tregje ariu dhe panik — sa shpesh ndodhin dhe pse janë çmimi që paguhet për të hyrë.',
    },
    inOneSentence: {
      sq: 'Rëniet janë të zakonshme, të pashmangshme dhe të përkohshme — dhe pikërisht se ekzistojnë ato, aksionet paguajnë më shumë se depozitat.',
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
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: ['time-in-the-market', 'risk-and-return'],
  },
];
