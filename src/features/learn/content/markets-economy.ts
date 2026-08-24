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
      sq: 'Çfarë mat në të vërtetë CPI, pse qeveritë synojnë 2%, dhe pse çmimet nuk kthehen kurrë poshtë.',
    },
    inOneSentence: {
      sq: 'Inflacioni është shpejtësia me të cilën paratë tuaja blejnë më pak, dhe matet duke ndjekur çmimin e së njëjtës shportë mallrash me kalimin e kohës.',
    },
    body: {
      sq: [
        {
          heading: 'Si matet',
          paragraphs: [
            'Statisticienët përpilojnë një shportë me qindra mallra dhe shërbime që blen një familje tipike: bukë, qira, benzinë, prerje flokësh, abonim interneti. Çdo muaj ata rikontrollojnë çmimin e së njëjtës shportë.',
            'Diferenca në përqindje krahasuar me të njëjtin muaj një vit më parë është norma vjetore e inflacionit. Kjo është shifra që titujt raportojnë si «CPI».',
            'Secili artikull peshohet sipas asaj se sa shpenzojnë njerëzit për të. Qiraja peshon shumë; kripa peshon pothuajse asgjë. Prandaj inflacioni juaj personal mund të ndryshojë ndjeshëm nga ai zyrtar.',
          ],
        },
        {
          heading: 'Kryesor dhe bazë',
          paragraphs: [
            'Inflacioni kryesor përfshin gjithçka, duke përfshirë ushqimin dhe energjinë. Këta të dy luhaten fort për arsye që nuk kanë të bëjnë me ekonominë — një thatësirë, një luftë, një vendim i OPEC-ut.',
            'Inflacioni bazë i heq të dy. Ai është më i qëndrueshëm dhe tregon më mirë se ku po shkon tendenca themelore e çmimeve.',
            'Prandaj bankat qendrore flasin gjithnjë për inflacionin bazë, ndërsa publiku ndien atë kryesor. Kur dëgjoni «inflacioni po bie» ndërsa fatura e energjisë po rritet, kjo është arsyeja.',
          ],
        },
        {
          heading: 'Pse 2% dhe jo zero',
          paragraphs: [
            'Shumica e bankave qendrore synojnë rreth 2%. Zero do të ishte e rrezikshme: ajo lë shumë pak hapësirë përpara se ekonomia të bjerë në deflacion, ku çmimet ulen.',
            'Deflacioni tingëllon mirë dhe është shkatërrues. Nëse çmimet do të bien nesër, njerëzit shtyjnë blerjet sot; kërkesa bie; kompanitë pushojnë punonjës; kërkesa bie edhe më shumë.',
            'Një gjë e fundit që habit njerëzit: kur inflacioni bie nga 8% në 2%, çmimet nuk kthehen poshtë. Ato thjesht rriten më ngadalë. Niveli i vjetër nuk kthehet kurrë.',
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
            label: 'Pritshmëritë e inflacionit',
            value: 'Çfarë presin njerëzit',
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
            'Rritja e përgjithshme e çmimeve, dhe rënia përkatëse e fuqisë blerëse.',
          aliases: ['inflacioni', 'inflacionit'],
        },
        {
          slug: 'cpi',
          term: 'CPI',
          definition:
            'Indeksi i çmimeve të konsumit — matja kryesore e inflacionit.',
          aliases: ['indeksi i çmimeve të konsumit'],
        },
        {
          slug: 'core-inflation',
          term: 'Inflacion bazë',
          definition:
            'Inflacioni pa ushqimin dhe energjinë, që janë më të luhatshmet.',
          aliases: ['inflacioni bazë'],
        },
        {
          slug: 'deflation',
          term: 'Deflacion',
          definition:
            'Rënia e përgjithshme e çmimeve. Rrallë e mirë: ajo shtyn shpenzimet dhe ngadalëson ekonominë.',
          aliases: ['deflacioni'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Inflacioni bie nga 8% në 2%. Çfarë ndodh me çmimet në dyqan?',
        options: [
          'Bien afërsisht 6%',
          'Vazhdojnë të rriten, por shumë më ngadalë',
          'Mbeten saktësisht aty ku ishin',
        ],
        answer: 1,
        explanation:
          'Inflacioni mat shpejtësinë e rritjes, jo nivelin. Një normë më e ulët do të thotë rritje më e ngadaltë, jo kthim prapa.',
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
    title: { sq: 'Çfarë i lëviz normat e interesit' },
    summary: {
      sq: 'Një numër i vetëm që ndryshon çmimin e çdo gjëje tjetër, dhe pse.',
    },
    inOneSentence: {
      sq: 'Norma bazë është çmimi i parave, dhe kur ai çmim ndryshon, gjithçka që matet në para rivlerësohet.',
    },
    body: {
      sq: [
        {
          heading: 'Kush e vendos dhe pse',
          paragraphs: [
            'Banka qendrore vendos një normë bazë me të cilën u jep hua bankave tregtare. Gjithçka tjetër — hipotekat, kreditë e biznesit, obligacionet — çmohet mbi atë bazë.',
            'Kur inflacioni është i lartë, banka ngre normën. Huatë bëhen më të shtrenjta, njerëzit shpenzojnë më pak, kërkesa bie dhe presioni mbi çmimet lehtësohet.',
            'Kur ekonomia ngadalësohet dhe papunësia rritet, ajo bën të kundërtën. I gjithë mekanizmi është ky: një çmim i vetëm që ngadalëson ose përshpejton gjithë sistemin.',
          ],
        },
        {
          heading: 'Pse aksionet vuajnë kur normat rriten',
          paragraphs: [
            'Ka dy kanale. I pari është i thjeshtë: kompanitë me borxh paguajnë më shumë interes, ndaj fitimet bien.',
            'I dyti është më i fuqishëm. Vlera e një aksioni është fitimet e ardhshme të sjella në të sotmen me një normë zbritjeje. Ngrini normën dhe e njëjta e ardhme vlen më pak sot — pa ndryshuar asgjë te kompania.',
            'Ka edhe një kanal të tretë, konkurrencën: kur obligacionet e sigurta paguajnë 5%, aksionet duhet të premtojnë shumë më shumë për të tërhequr të njëjtat para.',
          ],
        },
        {
          heading: 'Pse vonesa është e gjatë',
          paragraphs: [
            'Një ndryshim norme nuk vepron menjëherë. Hipotekat ekzistuese rifiksohen me radhë, kontratat e biznesit skadojnë në kohë të ndryshme, dhe vendimet për investime marrin muaj.',
            'Ekonomistët flasin për vonesa «të gjata dhe të ndryshueshme» — zakonisht mes gjashtë dhe tetëmbëdhjetë muajve derisa efekti i plotë të ndihet.',
            'Prandaj bankat qendrore duhet të veprojnë mbi parashikime, jo mbi të dhëna. Dhe prandaj gabojnë rregullisht në të dy drejtimet.',
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
            'Norma e interesit të vendosur nga banka qendrore, mbi të cilën çmohet gjithçka tjetër.',
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
            'Vendimet e bankës qendrore mbi normat dhe sasinë e parasë në qarkullim.',
          aliases: ['politika monetare'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Banka qendrore ngre normat sot. Kur ndihet efekti i plotë në ekonomi?',
        options: [
          'Brenda javës',
          'Zakonisht mes gjashtë dhe tetëmbëdhjetë muajsh',
          'Menjëherë, sepse tregjet reagojnë menjëherë',
        ],
        answer: 1,
        explanation:
          'Tregjet reagojnë menjëherë, por ekonomia reale jo. Kontratat dhe kreditë rifiksohen me radhë gjatë shumë muajsh.',
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
    title: { sq: 'Çfarë bëjnë në të vërtetë bankat qendrore' },
    summary: {
      sq: 'Dy detyra, disa mjete, dhe një armë që përdorin më shumë se të gjitha të tjerat: fjalët.',
    },
    inOneSentence: {
      sq: 'Një bankë qendrore përpiqet të mbajë çmimet të qëndrueshme dhe punësimin të lartë, kryesisht duke bindur tregjet se çfarë do të bëjë më vonë.',
    },
    body: {
      sq: [
        {
          heading: 'Mandati',
          paragraphs: [
            'Banka Qendrore Evropiane ka një detyrë kryesore: stabilitetin e çmimeve, të përcaktuar si inflacion rreth 2%. Rezerva Federale amerikane ka dy — çmime të qëndrueshme dhe punësim maksimal.',
            'Ky ndryshim shpjegon pse ato reagojnë ndryshe ndaj së njëjtës situatë. Kur inflacioni dhe papunësia rriten njëkohësisht, Fed-i duhet të balancojë; BQE-ja, në teori, jo.',
            'Të dyja janë të pavarura nga qeveritë, dhe kjo pavarësi është e qëllimshme: një qeveri para zgjedhjeve do të tundohej gjithmonë t’i ulte normat.',
          ],
        },
        {
          heading: 'Mjetet',
          paragraphs: [
            'Mjeti kryesor është norma bazë. Pas krizës së 2008-ës u shtua një i dytë: blerja e obligacioneve me para të reja, e njohur si lehtësim sasior, e cila ul normat afatgjata kur ato afatshkurtra kanë arritur tashmë zeron.',
            'Mjeti i tretë dhe më i nënvlerësuari është komunikimi. Kur një guvernator thotë se normat do të mbeten të larta «sa të duhet», tregjet rivlerësojnë menjëherë — pa lëvizur asnjë normë.',
            'Kjo quhet udhëzim përpara, dhe shpesh bën më shumë punë se vetë vendimi.',
          ],
        },
        {
          heading: 'Pse fjalët lëvizin tregjet më shumë se veprimet',
          paragraphs: [
            'Vendimi i një takimi është zakonisht i pritur. Tregu e ka çmuar tashmë një rritje prej 25 pikësh bazë përpara se ajo të ndodhë.',
            'Ajo që nuk çmohet është toni. Një fjali e ndryshuar në deklaratë, ose një përgjigje e kujdesshme në konferencë, ndryshon pritjet për muajt e ardhshëm.',
            'Prandaj tregjet shpesh lëvizin më shumë gjatë konferencës për shtyp sesa në momentin e vendimit.',
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
            'Institucioni që vendos normat dhe ruan stabilitetin e çmimeve në një ekonomi.',
          aliases: ['banka qendrore', 'BQE', 'Fed'],
        },
        {
          slug: 'forward-guidance',
          term: 'Udhëzim përpara',
          definition:
            'Sinjalizimi i qëllimshëm i asaj që banka qendrore pret të bëjë më vonë.',
        },
        {
          slug: 'quantitative-easing',
          term: 'Lehtësim sasior',
          definition:
            'Blerja e obligacioneve me para të reja për të ulur normat afatgjata.',
          aliases: ['QE'],
        },
        {
          slug: 'hawkish',
          term: 'Skifter',
          definition:
            'Prirje drejt normave më të larta për të luftuar inflacionin. E kundërta është pëllumb.',
          aliases: ['skifterore', 'hawkish', 'pëllumb', 'dovish'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Banka qendrore rrit normat pikërisht aq sa pritej, por tregu bie fort. Pse ka gjasa?',
        options: [
          'Sepse rritja ishte gjithsesi e papritur',
          'Sepse toni i deklaratës sugjeroi më shumë rritje sesa pritej',
          'Sepse rritjet e normave gjithmonë ulin tregun',
        ],
        answer: 1,
        explanation:
          'Vetë vendimi ishte çmuar tashmë. Informacioni i ri ishte në fjalët për të ardhmen, jo në numrin e sotëm.',
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
      sq: 'Tri kolona kanë rëndësi: pritur, aktuale dhe e mëparshme. Diferenca mes dy të parave është lajmi.',
    },
    inOneSentence: {
      sq: 'Kalendari nuk ju thotë çfarë do të ndodhë me tregun — ju thotë kur do të mësojmë nëse pritja ishte e saktë.',
    },
    body: {
      sq: [
        {
          heading: 'Tri kolonat',
          paragraphs: [
            '«E mëparshme» është shifra e publikimit të fundit. Ajo jep kontekstin: a po përshpejtohet apo po ngadalësohet kjo matje?',
            '«Pritur» është konsensusi i ekonomistëve. Kjo shifër është tashmë e çmuar në treg përpara publikimit. Ajo është pragu.',
            '«Aktuale» del në momentin e publikimit. Vetëm diferenca mes aktuales dhe të priturës është informacion i ri, dhe vetëm ajo lëviz çmimet.',
          ],
        },
        {
          heading: 'Ndikimi nuk do të thotë rëndësi',
          paragraphs: [
            'Etiketa «ndikim i lartë» nuk do të thotë se kjo matje është më e rëndësishme për ekonominë. Do të thotë se historikisht ka lëvizur tregjet më shumë.',
            'CPI dhe raporti i punësimit janë me ndikim të lartë sepse ndryshojnë drejtpërdrejt pritjet për normat. Prodhimi industrial mund të jetë ekonomikisht i rëndësishëm dhe të mos lëvizë asgjë.',
            'Nëse doni të dini pse një ditë ishte e trazuar, shikoni se cilat publikime ndryshuan pritjet për bankën qendrore.',
          ],
        },
        {
          heading: 'Rishikimet',
          paragraphs: [
            'Shumë shifra rishikohen muaj më vonë kur mbërrijnë të dhëna më të plota. Një raport i fortë punësimi mund të rishikohet ndjeshëm poshtë tridhjetë ditë më vonë.',
            'Tregjet reagojnë ashpër ndaj publikimit fillestar dhe pothuajse aspak ndaj rishikimit, edhe pse rishikimi është më i saktë.',
            'Prandaj mos e ndërtoni një bindje mbi një shifër të vetme. Tendenca mbi disa muaj është shumë më e besueshme se çdo publikim i vetëm.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Si të lexoni një rresht',
        columns: ['Kolona', 'Çfarë tregon', 'A lëviz tregun?'],
        rows: [
          { label: 'E mëparshme', value: 'Konteksti', cost: 'Jo' },
          { label: 'Pritur', value: 'Çfarë është çmuar tashmë', cost: 'Jo' },
          {
            label: 'Aktuale',
            value: 'Realiteti',
            cost: 'Vetëm nëse ndryshon nga pritja',
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
            'Orari i publikimeve të të dhënave ekonomike, me pritjet për secilën.',
          aliases: ['kalendari ekonomik'],
        },
        {
          slug: 'surprise',
          term: 'Surprizë',
          definition:
            'Diferenca mes shifrës aktuale dhe asaj të pritur. Kjo është ajo që lëviz çmimet.',
          aliases: ['surpriza'],
        },
        {
          slug: 'revision',
          term: 'Rishikim',
          definition:
            'Korrigjimi i një shifre të publikuar më parë, kur mbërrijnë të dhëna më të plota.',
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
          'Pak nën pritje — një surprizë e vogël në drejtimin e mirë',
          'Nuk ka informacion, sepse të dyja janë rreth 3%',
        ],
        answer: 1,
        explanation:
          'Niveli ishte çmuar tashmë. Vetëm diferenca prej 0,1 pikë përqindjeje nën pritje është informacion i ri.',
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
      sq: 'Një hua që ju e jepni, me një kupon fiks — dhe pse çmimi i saj bie kur normat rriten.',
    },
    inOneSentence: {
      sq: 'Një obligacion është një hua me kushte të fiksuara, dhe meqë kushtet janë të fiksuara, e vetmja gjë që mund të lëvizë është çmimi.',
    },
    body: {
      sq: [
        {
          heading: 'Anatomia',
          paragraphs: [
            'Blini një obligacion me vlerë nominale 1.000 € dhe kupon 4%. Emetuesi ju paguan 40 € çdo vit dhe ju kthen 1.000 € në maturim. Këto shifra nuk ndryshojnë kurrë.',
            'Emetuesi mund të jetë një shtet ose një kompani. Sa më e madhe mundësia që të mos paguajë, aq më i lartë duhet të jetë kuponi për t’ju bindur.',
            'Prandaj obligacionet gjermane paguajnë pak dhe ato të një kompanie të vogël paguajnë shumë. Diferenca quhet spread krediti dhe është çmimi i rrezikut.',
          ],
        },
        {
          heading: 'Pse çmimi lëviz në drejtim të kundërt me normat',
          paragraphs: [
            'Ju mbani obligacionin me kupon 4%. Nesër normat rriten dhe obligacionet e reja paguajnë 6%. Askush nuk do ta blejë tuajin me 1.000 €, sepse mund të marrë 6% diku tjetër.',
            'Kuponi juaj nuk mund të rritet — është i fiksuar. Ndaj e vetmja gjë që mund të përshtatet është çmimi. Ai bie derisa 40 € në vit mbi çmimin e ri të japin afërsisht 6%.',
            'Kjo është e gjithë marrëdhënia, dhe ajo është mekanike, jo psikologjike: normat lart, çmimet e obligacioneve poshtë.',
          ],
        },
        {
          heading: 'Kohëzgjatja: sa shumë bie',
          paragraphs: [
            'Sa më i largët maturimi, aq më shumë vuan çmimi nga një ndryshim normash. Një obligacion dyvjeçar do të rikthejë paranë shpejt; një tridhjetëvjeçar ju bllokon në normën e vjetër për tridhjetë vjet.',
            'Kjo ndjeshmëri quhet kohëzgjatje. Një kohëzgjatje prej 8 do të thotë përafërsisht se një rritje prej 1% e normave ul çmimin me 8%.',
            'Prandaj në 2022 obligacionet afatgjata «të sigurta» humbën më shumë se shumë aksione. Ato nuk dështuan; thjesht normat u rritën shpejt dhe aritmetika bëri pjesën e vet.',
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
            'Një hua e tregtueshme me kupon dhe datë maturimi të fiksuar.',
          aliases: ['obligacione', 'obligacioni'],
        },
        {
          slug: 'coupon',
          term: 'Kupon',
          definition: 'Pagesa vjetore fikse e interesit të një obligacioni.',
          aliases: ['kuponi'],
        },
        {
          slug: 'yield',
          term: 'Yield',
          definition:
            'Të ardhurat vjetore nga një aktiv si pjesë e çmimit të tij aktual.',
          aliases: ['yield-i', 'rendimenti'],
        },
        {
          slug: 'duration',
          term: 'Kohëzgjatje',
          definition:
            'Sa ndjeshëm reagon çmimi i një obligacioni ndaj ndryshimit të normave.',
          aliases: ['kohëzgjatja'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Mbani një obligacion 30-vjeçar dhe normat rriten 1%. Krahasuar me një 2-vjeçar, çfarë prisni?',
        options: [
          'Të njëjtën rënie çmimi',
          'Një rënie shumë më të madhe',
          'Një rritje çmimi, sepse kuponi është më i lartë',
        ],
        answer: 1,
        explanation:
          'Sa më i gjatë maturimi, aq më e lartë kohëzgjatja. Një 30-vjeçar mund të bjerë rreth dhjetë herë më shumë se një 2-vjeçar.',
      },
    },
    upNextSlugs: ['the-yield-curve', 'what-moves-interest-rates'],
  },

  {
    id: 'the-yield-curve',
    slug: 'the-yield-curve',
    topicId: 'markets-economy',
    level: 'advanced',
    title: { sq: 'Kurba e yield-eve dhe pse e shohin të gjithë' },
    summary: {
      sq: 'Kur huaja dyvjeçare paguan më shumë se ajo dhjetëvjeçare, tregu po thotë diçka të pakëndshme.',
    },
    inOneSentence: {
      sq: 'Kurba e yield-eve vizaton sa paguajnë obligacionet shtetërore në afate të ndryshme, dhe forma e saj tregon çfarë pret tregu nga ekonomia.',
    },
    body: {
      sq: [
        {
          heading: 'Forma normale',
          paragraphs: [
            'Zakonisht huaja afatgjatë paguan më shumë se ajo afatshkurtër. Ju kërkoni shpërblim shtesë për të mbyllur paratë për dhjetë vjet në vend të dy.',
            'Kjo prodhon një kurbë që ngjitet nga e majta në të djathtë. Ajo është shenja e një ekonomie normale që pret rritje dhe pak inflacion.',
            'Bankat gjithashtu fitojnë nga kjo formë: ato marrin hua afatshkurtër dhe japin hua afatgjatë, dhe diferenca është fitimi i tyre.',
          ],
        },
        {
          heading: 'Kur përmbyset',
          paragraphs: [
            'Ndonjëherë obligacioni dyvjeçar paguan më shumë se dhjetëvjeçari. Kjo është një përmbysje, dhe është e çuditshme: pse do të pranonte dikush më pak për të mbyllur paratë më gjatë?',
            'Përgjigjja është pritja. Nëse tregu beson se banka qendrore do t’i ulë normat ndjeshëm brenda pak vitesh — sepse ekonomia do të ngadalësohet — atëherë mbyllja e një norme sot për dhjetë vjet ka kuptim edhe nëse është më e ulët.',
            'Pra një kurbë e përmbysur nuk parashikon recesion drejtpërdrejt. Ajo tregon se tregu pret ulje normash, dhe uljet e mëdha zakonisht vijnë kur diçka është prishur.',
          ],
        },
        {
          heading: 'Si sinjal, i mirë por i ngadaltë',
          paragraphs: [
            'Historikisht në Shtetet e Bashkuara pothuajse çdo recesion është paraprirë nga një përmbysje. Kjo e ka bërë atë sinjalin më të cituar në financë.',
            'Por vonesa është e gjatë dhe e paqëndrueshme — nga gjashtë muaj deri në dy vjet. Një investitor që del nga tregu në ditën e përmbysjes mund të humbasë një vit rritjeje përpara se të ketë të drejtë.',
            'Ky është modeli i zakonshëm i sinjaleve makro: të dobishme për të kuptuar kontekstin, pothuajse të papërdorshme për të vendosur kohën.',
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
            'Kur yield-et afatshkurtra tejkalojnë ato afatgjata — historikisht paralajmërim recesioni.',
          aliases: ['përmbysja', 'kurbë e përmbysur'],
        },
        {
          slug: 'term-premium',
          term: 'Premi afati',
          definition:
            'Shpërblimi shtesë për të mbajtur një obligacion më afatgjatë.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Kurba përmbyset sot. Çfarë është interpretimi më i saktë?',
        options: [
          'Recesioni ka filluar tashmë',
          'Tregu pret ulje të mëdha normash, që zakonisht ndodhin kur ekonomia dobësohet',
          'Obligacionet afatgjata janë bërë më të rrezikshme',
        ],
        answer: 1,
        explanation:
          'Përmbysja shpreh pritje për ulje normash. Ajo nuk cakton kohë — vonesa historike shkon nga gjashtë muaj në dy vjet.',
      },
    },
    upNextSlugs: ['recessions-explained', 'bonds-explained'],
  },

  {
    id: 'what-is-gdp',
    slug: 'what-is-gdp',
    topicId: 'markets-economy',
    level: 'beginner',
    title: { sq: 'PBB-ja: matësi më i cituar dhe më i keqkuptuar' },
    summary: {
      sq: 'Vlera e gjithçkaje të prodhuar në një vend, dhe pse rritja ka rëndësi më shumë se niveli.',
    },
    inOneSentence: {
      sq: 'PBB-ja mat vlerën e të gjitha mallrave dhe shërbimeve të prodhuara brenda një vendi në një periudhë, dhe tregjet shikojnë vetëm sa shpejt po ndryshon.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë përfshin',
          paragraphs: [
            'PBB-ja mbledh katër gjëra: sa shpenzojnë familjet, sa investojnë bizneset, sa shpenzon qeveria, dhe eksportet minus importet.',
            'Konsumi është zakonisht më i madhi — rreth dy të tretat në ekonomitë e zhvilluara. Prandaj besimi i konsumatorit ndiqet aq nga afër.',
            'Ajo numëron vetëm prodhimin e ri. Shitja e një shtëpie ekzistuese nuk shtohet; komisioni i agjentit po, sepse ai është një shërbim i ri.',
          ],
        },
        {
          heading: 'Reale kundër nominale',
          paragraphs: [
            'PBB-ja nominale rritet edhe kur prodhohet e njëjta sasi por çmimet janë më të larta. Kjo është pothuajse e padobishme.',
            'PBB-ja reale heq inflacionin dhe tregon nëse u prodhuan vërtet më shumë gjëra. Kjo është shifra që raportohet dhe që ka rëndësi.',
            'Kur lexoni «ekonomia u rrit 2%», kjo pothuajse gjithmonë do të thotë PBB reale, e krahasuar me tremujorin ose vitin e mëparshëm.',
          ],
        },
        {
          heading: 'Çfarë nuk mat',
          paragraphs: [
            'PBB-ja numëron aktivitetin, jo mirëqenien. Një tërmet që shkatërron një qytet e rrit PBB-në vitin pasues, sepse rindërtimi është prodhim i ri.',
            'Ajo nuk kap punën e papaguar në shtëpi, nuk mat pabarazinë, dhe nuk zbret dëmtimin mjedisor.',
            'Prandaj ajo është një matje e dobishme e madhësisë ekonomike dhe një matje e keqe e asaj se sa mirë jetojnë njerëzit.',
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
            'Prodhimi i brendshëm bruto — vlera e gjithçkaje të prodhuar brenda një vendi.',
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
            'Shpenzimet e familjeve, komponenti më i madh i PBB-së në ekonomitë e zhvilluara.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Çmimet u rritën 5% dhe prodhimi fizik mbeti i njëjtë. Çfarë ndodh me PBB-në reale?',
        options: ['Rritet 5%', 'Mbetet pak a shumë e pandryshuar', 'Bie 5%'],
        answer: 1,
        explanation:
          'PBB-ja reale heq inflacionin. Nëse u prodhua e njëjta sasi, ajo nuk lëviz — vetëm nominalja rritet.',
      },
    },
    upNextSlugs: ['recessions-explained', 'reading-the-jobs-report'],
  },

  {
    id: 'reading-the-jobs-report',
    slug: 'reading-the-jobs-report',
    topicId: 'markets-economy',
    level: 'intermediate',
    title: { sq: 'Raporti i punësimit: numri që lëviz gjithçka' },
    summary: {
      sq: 'Tri shifra dalin njëherësh, dhe ajo që tregjet shikojnë nuk është ajo që titujt raportojnë.',
    },
    inOneSentence: {
      sq: 'Raporti i punësimit tregon sa vende pune u krijuan, sa njerëz janë pa punë, dhe sa shpejt po rriten pagat — dhe e treta është ajo që vendos normat.',
    },
    body: {
      sq: [
        {
          heading: 'Tri shifra, tri histori',
          paragraphs: [
            'Vendet e reja të punës tregojnë nëse ekonomia po zgjerohet. Një numër i fortë do të thotë kërkesë e shëndetshme.',
            'Norma e papunësisë duket më e rëndësishme por është më e ndërlikuar: ajo mund të bjerë sepse njerëzit gjetën punë, ose sepse hoqën dorë nga kërkimi dhe dolën nga statistika.',
            'Rritja e pagave është ajo që shikon banka qendrore. Paga që rriten më shpejt se produktiviteti kalojnë në çmime, dhe kjo është inflacion që nuk shkon vetë.',
          ],
        },
        {
          heading: 'Pse lajmi i mirë ndonjëherë është i keq',
          paragraphs: [
            'Në periudha kur banka qendrore lufton inflacionin, një raport shumë i fortë punësimi mund t’i ulë tregjet.',
            'Logjika: ekonomi e nxehtë do të thotë presion pagash, që do të thotë inflacion i vazhdueshëm, që do të thotë norma të larta për më gjatë, që do të thotë vlerësime më të ulëta.',
            'Prandaj e njëjta shifër lexohet ndryshe në kontekste të ndryshme. Në një ngadalësim, i njëjti raport i fortë do të ishte lajm i shkëlqyer.',
          ],
        },
        {
          heading: 'Kujdes me rishikimet',
          paragraphs: [
            'Shifrat e vendeve të punës rishikohen dy herë pas publikimit fillestar, dhe rishikimet janë shpesh të mëdha — dhjetëra mijëra vende pune.',
            'Një muaj i vetëm ka zhurmë të konsiderueshme. Mesatarja trimujore është shumë më e besueshme se çdo publikim i vetëm.',
            'Tregjet gjithsesi reagojnë ashpër ndaj shifrës fillestare dhe pothuajse aspak ndaj rishikimit, edhe pse i dyti është më i saktë.',
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
            'Numri i vendeve të punës të krijuara në një muaj, jashtë bujqësisë. Publikimi më i ndjekur në SHBA.',
          aliases: ['payrolls', 'NFP'],
        },
        {
          slug: 'unemployment-rate',
          term: 'Normë papunësie',
          definition:
            'Përqindja e njerëzve që kërkojnë punë dhe nuk gjejnë. Nuk numëron ata që hoqën dorë.',
          aliases: ['papunësia', 'norma e papunësisë'],
        },
        {
          slug: 'wage-growth',
          term: 'Rritje pagash',
          definition:
            'Sa shpejt rriten pagat. Kur tejkalon produktivitetin, kalon në çmime.',
          aliases: ['rritja e pagave'],
        },
        {
          slug: 'participation-rate',
          term: 'Normë pjesëmarrjeje',
          definition:
            'Sa përqind e popullsisë në moshë pune është në treg pune ose po kërkon.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Papunësia bie, por edhe norma e pjesëmarrjes bie. Çfarë ka gjasa të ketë ndodhur?',
        options: [
          'Ekonomia është shumë e fortë',
          'Disa njerëz hoqën dorë nga kërkimi dhe dolën nga statistika',
          'Pagat u rritën shumë',
        ],
        answer: 1,
        explanation:
          'Papunësia numëron vetëm ata që kërkojnë aktivisht. Kur njerëzit heqin dorë, ajo bie pa u përmirësuar asgjë.',
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
    title: { sq: 'Pse dollari ka rëndësi edhe nëse nuk e mbani' },
    summary: {
      sq: 'Shumica e tregtisë botërore faturohet në dollarë, ndaj forca e tij prek çmime shumë larg Amerikës.',
    },
    inOneSentence: {
      sq: 'Kur dollari forcohet, gjithçka e faturuar në dollarë bëhet më e shtrenjtë për këdo që fiton në një monedhë tjetër.',
    },
    body: {
      sq: [
        {
          heading: 'Monedha e faturës',
          paragraphs: [
            'Nafta, gazi, bakri, gruri dhe shumica e tregtisë ndërkombëtare çmohen në dollarë, edhe kur as blerësi as shitësi nuk janë amerikanë.',
            'Prandaj një dollar më i fortë e bën naftën më të shtrenjtë në euro, edhe nëse çmimi në dollarë nuk ka lëvizur fare.',
            'Ky është kanali i parë me të cilin një vendim i Rezervës Federale ndryshon faturën e energjisë së një familjeje në Evropë.',
          ],
        },
        {
          heading: 'Borxhi në dollarë',
          paragraphs: [
            'Shumë qeveri dhe kompani në ekonomitë në zhvillim marrin hua në dollarë sepse është më e lirë. Të ardhurat e tyre, megjithatë, janë në monedhën vendase.',
            'Kur dollari forcohet, ai borxh bëhet më i rëndë pa u rritur asnjë cent. Kjo është arsyeja e përsëritur e krizave në tregjet në zhvillim.',
            'Prandaj një cikël shtrëngimi në Uashington shkakton telashe në vende që nuk kanë asnjë lidhje me ekonominë amerikane.',
          ],
        },
        {
          heading: 'Çfarë e lëviz vetë dollarin',
          paragraphs: [
            'Normat relative janë faktori kryesor. Nëse normat amerikane rriten dhe ato evropiane jo, paratë kërkojnë kthimin më të lartë dhe dollari forcohet.',
            'Faktori i dytë është frika. Në kriza, investitorët shkojnë drejt aktiveve që i konsiderojnë më të sigurta, dhe kjo do të thotë obligacione amerikane — pra dollarë.',
            'Prandaj dollari shpesh forcohet pikërisht kur lajmet janë të këqija kudo, duke përfshirë Amerikën.',
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
            'Monedhë që bankat qendrore mbajnë dhe në të cilën faturohet tregtia botërore.',
        },
        {
          slug: 'exchange-rate',
          term: 'Kurs këmbimi',
          definition: 'Sa vlen një monedhë e shprehur në një tjetër.',
          aliases: ['kursi i këmbimit'],
        },
        {
          slug: 'safe-haven',
          term: 'Strehë e sigurt',
          definition:
            'Aktiv drejt të cilit shkojnë paratë kur rritet frika, si obligacionet amerikane ose ari.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Çmimi i naftës në dollarë nuk ndryshon, por dollari forcohet 10%. Çfarë ndodh me faturën në euro?',
        options: ['Nuk ndryshon', 'Rritet rreth 10%', 'Bie rreth 10%'],
        answer: 1,
        explanation:
          'Nafta faturohet në dollarë. Nëse duhen më shumë euro për një dollar, i njëjti fuçi kushton më shumë euro.',
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
      sq: 'Një çmim që hyn në koston e pothuajse gjithçkaje, dhe pse burimi i lëvizjes ka rëndësi më shumë se madhësia.',
    },
    inOneSentence: {
      sq: 'Nafta është një kosto hyrëse për transportin, prodhimin dhe ushqimin, ndaj çmimi i saj kalon në inflacion me një vonesë prej disa muajsh.',
    },
    body: {
      sq: [
        {
          heading: 'Pse prek gjithçka',
          paragraphs: [
            'Çdo mall që lëviz nga fabrika te dyqani udhëton. Çdo plehrues kimik prodhohet nga gazi. Çdo plastikë fillon si naftë.',
            'Prandaj një rritje e çmimit të naftës nuk mbetet te pompa e karburantit. Ajo shfaqet disa muaj më vonë në çmimin e ushqimit, të mobiljeve dhe të pothuajse çdo gjëje të prodhuar.',
            'Kjo është arsyeja pse bankat qendrore e heqin energjinë nga inflacioni bazë, por nuk mund ta injorojnë kur ngrihet për një kohë të gjatë.',
          ],
        },
        {
          heading: 'Ofertë apo kërkesë',
          paragraphs: [
            'Kjo është pyetja që ka rëndësi. Nëse nafta rritet sepse ekonomia botërore po lulëzon dhe të gjithë prodhojnë më shumë, kjo është shenjë force.',
            'Nëse rritet sepse një konflikt ndërpreu furnizimin, kjo është një taksë mbi konsumatorët: paguajnë më shumë dhe nuk marrin asgjë shtesë.',
            'E njëjta lëvizje çmimi, dy kuptime krejt të kundërta për aksionet. Prandaj titujt që raportojnë vetëm shifrën nuk ju thonë mjaftueshëm.',
          ],
        },
        {
          heading: 'Kush fiton dhe kush humb',
          paragraphs: [
            'Vendet eksportuese përfitojnë; ato importuese vuajnë. Kjo është arsyeja pse e njëjta rritje e naftës forcon monedhën norvegjeze dhe dobëson atë turke.',
            'Brenda tregut të aksioneve, kompanitë e energjisë fitojnë ndërsa linjat ajrore, transporti dhe kimia vuajnë.',
            'Prandaj një indeks i gjerë mund të mbetet i qetë ndërsa poshtë sipërfaqes ka lëvizje të mëdha në drejtime të kundërta.',
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
            'Një lëndë e parë e standardizuar si nafta, ari apo gruri, ku njësia është e njëjtë kudo.',
          aliases: ['mallra bazë', 'komoditet'],
        },
        {
          slug: 'supply-shock',
          term: 'Goditje oferte',
          definition:
            'Një ndërprerje e papritur e furnizimit që rrit çmimet pa rritur kërkesën.',
        },
        {
          slug: 'pass-through',
          term: 'Kalim në çmime',
          definition:
            'Procesi me të cilin një kosto hyrëse më e lartë shfaqet përfundimisht në çmimet e konsumit.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Nafta rritet 30% për shkak të një ndërprerjeje furnizimi. Si ndryshon kjo nga një rritje e shkaktuar nga kërkesa e fortë?',
        options: [
          'Nuk ka ndryshim, çmimi është çmim',
          'Është një kosto për konsumatorët pa asnjë përfitim ekonomik shoqërues',
          'Është gjithmonë lajm i mirë për aksionet',
        ],
        answer: 1,
        explanation:
          'Një goditje oferte merr para nga konsumatorët pa asnjë rritje aktiviteti. Një rritje nga kërkesa shoqëron një ekonomi që po zgjerohet.',
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
      sq: 'Çfarë është në të vërtetë një recesion, kush e shpall, dhe pse tregu e di përpara statistikave.',
    },
    inOneSentence: {
      sq: 'Një recesion është një rënie e gjerë dhe e zgjatur e aktivitetit ekonomik, dhe shpallet zyrtarisht shumë pasi ka filluar.',
    },
    body: {
      sq: [
        {
          heading: 'Përkufizimi dhe kufizimet e tij',
          paragraphs: [
            'Rregulli i shpejtë është dy tremujorë radhazi me PBB reale në rënie. Ai është i dobishëm dhe i papërsosur: një rënie e cekët për gjashtë muaj mund të mos ndihet si recesion, ndërsa një kolaps i mprehtë tremujor po.',
            'Në praktikë, komitete zyrtare shohin një grup treguesish: punësimin, të ardhurat, prodhimin dhe shitjet, jo vetëm PBB-në.',
            'Këto komitete shpallin një recesion muaj ose vite pas fillimit të tij, sepse presin të dhëna të plota. Shpallja është historike, jo paralajmërim.',
          ],
        },
        {
          heading: 'Pse tregjet bien para se të mbërrijë',
          paragraphs: [
            'Aksionet çmojnë të ardhmen. Kur investitorët fillojnë të presin fitime më të ulëta, ata shesin — pavarësisht se statistikat e sotme janë ende të mira.',
            'Prandaj tregu tipikisht bie disa muaj përpara se recesioni të fillojë zyrtarisht, dhe fillon të rikuperohet ndërsa lajmet janë ende të tmerrshme.',
            'Kjo është arsyeja pse pritja e «qartësisë» përpara se të investoni funksionon aq keq: kur situata bëhet e qartë, rikuperimi ka ndodhur tashmë.',
          ],
        },
        {
          heading: 'Çfarë ndodh brenda',
          paragraphs: [
            'Kompanitë reduktojnë investimet dhe punësimin. Papunësia rritet, të ardhurat bien, konsumi bie, dhe kjo redukton përsëri të ardhurat e kompanive.',
            'Banka qendrore zakonisht i ul normat për ta thyer këtë spirale, dhe qeveria mund të rrisë shpenzimet.',
            'Recesionet janë të dhimbshme dhe janë gjithashtu normale — pjesë e ciklit, jo devijim prej tij. Që nga Lufta e Dytë Botërore ekonomitë e zhvilluara kanë kaluar një çdo dhjetë vjet mesatarisht.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'recession',
          term: 'Recesion',
          definition: 'Një rënie e gjerë dhe e zgjatur e aktivitetit ekonomik.',
          aliases: ['recesioni', 'recesione'],
        },
        {
          slug: 'business-cycle',
          term: 'Cikël ekonomik',
          definition:
            'Alternimi i përsëritur i zgjerimit dhe tkurrjes në një ekonomi.',
          aliases: ['cikli ekonomik'],
        },
        {
          slug: 'leading-indicator',
          term: 'Tregues paraprijës',
          definition:
            'Një matje që lëviz përpara ekonomisë në tërësi, si porositë e reja ose kurba e yield-eve.',
        },
        {
          slug: 'soft-landing',
          term: 'Ulje e butë',
          definition:
            'Ngadalësimi i inflacionit pa shkaktuar recesion. E rrallë dhe e vështirë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse pritja derisa lajmet ekonomike të bëhen të qarta funksionon keq për investitorët?',
        options: [
          'Sepse lajmet nuk janë kurrë të sakta',
          'Sepse tregu çmon të ardhmen dhe rikuperohet ndërsa lajmet janë ende të këqija',
          'Sepse brokerët ndalojnë blerjet gjatë recesionit',
        ],
        answer: 1,
        explanation:
          'Tregu lëviz para ekonomisë. Kur statistikat konfirmojnë përmirësimin, çmimet e kanë reflektuar tashmë.',
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
    title: { sq: 'Pse bien tregjet, dhe çfarë të bëni' },
    summary: {
      sq: 'Korrigjime, tregje ariu dhe panik — sa shpesh ndodhin dhe pse janë çmimi i hyrjes.',
    },
    inOneSentence: {
      sq: 'Rëniet janë të zakonshme, të pashmangshme dhe të përkohshme — dhe pikërisht ekzistenca e tyre është arsyeja pse aksionet paguajnë më shumë se depozitat.',
    },
    body: {
      sq: [
        {
          heading: 'Emrat dhe shpeshtësia',
          paragraphs: [
            'Një rënie prej 10% quhet korrigjim dhe ndodh pothuajse çdo vit. Një rënie prej 20% quhet treg ariu dhe ndodh mesatarisht një herë në pak vite.',
            'Rënie prej 30% ose më shumë ndodhin disa herë në një jetë investimi. Të gjitha deri tani janë rikuperuar, edhe pse disa kanë marrë vite.',
            'Kur i dini këto shifra paraprakisht, një rënie 15% bëhet një ngjarje e pritur, jo prova se diçka ka shkuar keq.',
          ],
        },
        {
          heading: 'Pse ju paguhet për t’i duruar',
          paragraphs: [
            'Aksionet japin historikisht më shumë se depozitat pikërisht sepse mbajtja e tyre është e pakëndshme. Nëse nuk do të kishte rënie, nuk do të kishte as shpërblim shtesë.',
            'Kthimi më i lartë nuk është dhuratë — është pagesa për të duruar pasigurinë dhe për të mos shitur kur bie.',
            'Prandaj rrezikun nuk duhet ta shmangni tërësisht; duhet ta merrni në një masë që mund ta duroni deri në fund.',
          ],
        },
        {
          heading: 'Çfarë të bëni kur ndodh',
          paragraphs: [
            'Vendimi më i rëndësishëm merret përpara rënies, jo gjatë saj: sa nga paratë tuaja janë të investuara, dhe a keni një rezervë që ju lejon të mos shisni.',
            'Gjatë rënies, veprimi më i mirë zakonisht është vazhdimi i kontributeve të rregullta. Ato blejnë më shumë njësi për të njëjtat para.',
            'Nëse një rënie ju pengon të flini, kjo është informacion i vlefshëm: portofoli juaj është më i rrezikshëm se toleranca juaj e vërtetë. Rregullojeni pasi tregu të jetë qetësuar, jo në mes të panikut.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Sa shpesh ndodhin',
        columns: ['Rënia', 'Emri', 'Shpeshtësia historike'],
        rows: [
          { label: '−10%', value: 'Korrigjim', cost: 'Pothuajse çdo vit' },
          { label: '−20%', value: 'Treg ariu', cost: 'Një herë në pak vite' },
          {
            label: '−30% ose më shumë',
            value: 'Krizë',
            cost: 'Disa herë në një jetë',
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
          definition: 'Një rënie prej rreth 10% nga maja e fundit.',
          aliases: ['korrigjimi'],
        },
        {
          slug: 'bear-market',
          term: 'Treg ariu',
          definition: 'Një rënie prej 20% ose më shumë nga maja.',
          aliases: ['tregu i ariut'],
        },
        {
          slug: 'bull-market',
          term: 'Treg demi',
          definition: 'Një periudhë e zgjatur rritjeje çmimesh.',
          aliases: ['tregu i demit'],
        },
        {
          slug: 'capitulation',
          term: 'Dorëzim',
          definition:
            'Shitja masive nga dëshpërimi, që shpesh shënon fundin e një rënieje.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse aksionet paguajnë historikisht më shumë se depozitat bankare?',
        options: [
          'Sepse kompanitë janë të detyruara ligjërisht të shpërblejnë aksionerët',
          'Sepse mbajtja e tyre kërkon durimin e rënieve, dhe ky durim shpërblehet',
          'Sepse bankat mbajnë tarifa të larta',
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
