import type { SeedLesson, SeedTopic } from './types';

/**
 * Rreziku dhe kostot — the fourth topic, and the one that decides most
 * outcomes.
 *
 * Everything here is about what you keep rather than what you earn: taxes,
 * currency, leverage, behaviour and fraud. None of it is exciting, and all of
 * it moves the number more than picking the right share does.
 */
export const RISK_COSTS_TOPIC: SeedTopic = {
  id: 'risk-and-costs',
  title: { sq: 'Rreziku dhe kostot' },
  slugs: {
    sq: [
      'cka-eshte-rreziku',
      'rreziku-i-monedhes',
      'taksat-mbi-investimet',
      'cka-ben-leva',
      'rreziku-i-likuiditetit',
      'inflacioni-si-rrezik',
      'rreziku-i-perqendrimit',
      'sjellja-kushton-me-shume-se-tarifat',
      'si-funksionojne-mashtrimet',
      'si-lexohet-fleta-e-fondit',
      'kur-duhet-shitur',
      'si-ndertohet-nje-portofol',
    ],
  },
};

export const RISK_COSTS_LESSONS: SeedLesson[] = [
  {
    id: 'what-risk-actually-means',
    slug: { sq: 'cka-eshte-rreziku' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Çka do të thotë vërtet rrezik' },
    summary: {
      sq: 'Jo luhatja e çmimit, por mundësia të mos i keni paratë kur ju duhen.',
    },
    inOneSentence: {
      sq: 'Rreziku i vërtetë nuk është që çmimi luan, por që të detyroheni të shitni pikërisht atëherë kur ka rënë.',
    },
    body: {
      sq: [
        {
          heading: 'Dy përkufizime që ngatërrohen',
          paragraphs: [
            'Financa akademike e mat rrezikun si luhatje: sa shumë luan çmimi rreth mesatares. Ky përkufizim matet lehtë dhe u vjen mirë modeleve.',
            'Për një njeri, rreziku është diçka tjetër: mundësia të mos e arrini qëllimin tuaj. Nëse ju duhen 50.000 € pas dhjetë vjetësh, rreziku është të mbeteni me 30.000 €.',
            'Këto dy përkufizime shpesh përplasen. Paratë në një llogari kursimi kanë luhatje zero dhe rrezik shumë të lartë që të mos e arrijnë qëllimin tuaj afatgjatë.',
          ],
        },
        {
          heading: 'Rreziku i sekuencës',
          paragraphs: [
            'Rëndësi ka radha e kthimeve, jo vetëm mesatarja e tyre. Dy portofolë me të njëjtin kthim mesatar mund të japin rezultate krejt të ndryshme nëse tërhiqni para rrugës.',
            'Një rënie e madhe në vitin e parë të pensionit, kur po tërhiqni para, dëmton shumë më shumë se e njëjta rënie në vitin e fundit.',
            'Prandaj, sa më afër të jeni ditës kur do t’ju duhen paratë, aq më pak duhet të varet rezultati juaj nga tregu.',
          ],
        },
        {
          heading: 'Rreziqet që nuk maten',
          paragraphs: [
            'Modelet e marrin si të mirëqenë se e ardhmja do t’i ngjajë së kaluarës. Ngjarjet që nuk kanë ndodhur kurrë më parë nuk dalin në asnjë statistikë.',
            'Rrezik është po ashtu të mos e kuptoni çka keni blerë. Një produkt që nuk di ta shpjegosh me fjalët e tua është rrezik, çkado që thonë shifrat.',
            'Prova më e dobishme mbetet e thjeshtë: çka duhet të ndodhë që t’i humb të gjitha këtu, dhe sa e pamundur është ajo vërtet?',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'sequence-risk',
          term: 'Rrezik sekuence',
          definition:
            'Rreziku që radha e kthimeve, e jo mesatarja e tyre, ta prishë planin kur po tërhiqni para.',
        },
        {
          slug: 'shortfall-risk',
          term: 'Rrezik mosarritjeje',
          definition:
            'Mundësia të mos e keni shumën që ju duhet atë ditë që ju duhet.',
        },
        {
          slug: 'tail-risk',
          term: 'Rrezik ekstrem',
          definition:
            'Ngjarje shumë të rralla dhe shumë të dëmshme, që modelet i nënçmojnë rregullisht.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Paratë tuaja për pension pas njëzet vjetësh rrinë në një llogari kursimi. Cili rrezik është më i madh?',
        options: [
          'Luhatja e çmimit',
          'Që inflacioni t’ua hajë fuqinë blerëse dhe të mos e arrini shumën e nevojshme',
          'Që banka t’i ndërrojë tarifat',
        ],
        answer: 1,
        explanation:
          'Luhatja është zero, por rreziku për të mos e arritur qëllimin është i lartë. Siguria e shifrës nuk është siguri e rezultatit.',
      },
    },
    upNextSlugs: { sq: ['inflacioni-si-rrezik', 'rreziku-i-perqendrimit'] },
  },

  {
    id: 'currency-risk',
    slug: { sq: 'rreziku-i-monedhes' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: { sq: 'Rreziku i monedhës' },
    summary: {
      sq: 'Një investim i mirë në dollarë mund të dalë investim i keq në euro.',
    },
    inOneSentence: {
      sq: 'Kur blini diçka të çmuar në monedhë tjetër, i merrni dy investime: asetin dhe monedhën.',
    },
    body: {
      sq: [
        {
          heading: 'Dy lëvizje, një rezultat',
          paragraphs: [
            'E blini një ETF amerikan që rritet për 10% gjatë vitit. Njëkohësisht dollari dobësohet për 10% kundrejt euros. Kthimi juaj në euro del rreth zeros.',
            'Kjo vlen edhe anasjelltas: një treg amerikan që nuk luan fare, me një dollar që forcohet, mund t’ju japë fitim të mirë në euro.',
            'Asnjëra prej tyre nuk ka lidhje me cilësinë e kompanive që i blini. Është thjesht një lëvizje e dytë e vendosur mbi të parën.',
          ],
        },
        {
          heading: 'A duhet të mbrohet?',
          paragraphs: [
            'Mbrojtja nga monedha e ka një kosto, që zakonisht pasqyron dallimin e normave të interesit mes dy monedhave. Nuk është falas.',
            'Për aksione afatgjata, shumica e arsyeve janë kundër mbrojtjes: luhatjet e monedhave priren të barazohen brenda dekadave, kurse kostoja e mbrojtjes grumbullohet.',
            'Për obligacione është e kundërta. Nëse mbani obligacione të huaja për qëndrueshmëri, një luhatje e monedhës prej 10% e prish atë qëndrueshmëri — prandaj aty mbrojtja ka kuptim.',
          ],
        },
        {
          heading: 'Ku fshihet kostoja',
          paragraphs: [
            'Kostoja më e madhe e monedhës për një investitor të vogël nuk është luhatja, por marzhi që e merr platforma në çdo këmbim.',
            'Një marzh prej 0,5% për blerje dhe 0,5% për shitje është një përqind i plotë, i paguar sa herë që hyni e dilni.',
            'Kontrollojeni gjithmonë kursin që ju ofrohet përballë kursit të tregut. Dallimi është tarifë që rrallë reklamohet si tarifë.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Investoni 1.000 € në një ETF amerikan',
          body: 'Këmbehen në rreth 1.100 dollarë me kursin e ditës, minus marzhin e platformës.',
        },
        {
          title: 'ETF-ja rritet për 10% gjatë vitit',
          body: 'Tash keni rreth 1.210 dollarë. Në dollarë, gjithçka shkoi mirë.',
        },
        {
          title: 'Dollari dobësohet për 10% kundrejt euros',
          body: 'Ata 1.210 dollarë kthehen në rreth 1.000 €. Fitimi u zhduk krejt në këmbim.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'currency-risk',
          term: 'Rrezik monedhe',
          definition:
            'Rreziku që lëvizja e kursit të këmbimit të ua ndryshojë kthimin në monedhën e vendit.',
          aliases: ['rreziku valutor'],
        },
        {
          slug: 'hedged',
          term: 'I mbrojtur',
          definition:
            'Fond që e heq efektin e kursit të këmbimit, kundrejt një kostoje vjetore.',
          aliases: ['mbrojtje valutore', 'hedged'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'ETF-ja juaj amerikane u rrit për 8% dhe dollari u dobësua për 8%. Sa fituat në euro?',
        options: ['Rreth 16%', 'Thuajse asgjë', 'Rreth 8%'],
        answer: 1,
        explanation:
          'Të dyja lëvizjet mblidhen mbi njëra-tjetrën. Fitimin në dollarë e fshiu humbja në këmbim.',
      },
    },
    relatedSymbols: ['eur-usd'],
    upNextSlugs: { sq: ['taksat-mbi-investimet', 'si-lexohet-fleta-e-fondit'] },
  },

  {
    id: 'tax-on-investments',
    slug: { sq: 'taksat-mbi-investimet' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Taksat mbi investimet' },
    summary: {
      sq: 'Kur lind detyrimi, pse shitja e shpeshtë kushton dhe pse kjo nuk është këshillë tatimore.',
    },
    inOneSentence: {
      sq: 'Taksa zakonisht lind kur shitni ose kur merrni dividend, prandaj sa më rrallë të shitni, aq më gjatë punojnë paratë tuaja të plota.',
    },
    body: {
      sq: [
        {
          heading: 'Dy momente taksimi',
          paragraphs: [
            'I pari është fitimi kapital: dallimi mes çmimit të shitjes dhe atij të blerjes. Zakonisht nuk taksohet derisa të shitni.',
            'I dyti janë të ardhurat: dividendët dhe kuponët e obligacioneve, që zakonisht taksohen atë vit që i merrni, pa marrë parasysh a i shpenzoni.',
            'Rregullat, normat dhe përjashtimet ndryshojnë nga vendi në vend dhe ndërrohen me kohë. Kjo faqe e shpjegon mekanizmin, jo detyrimin tuaj konkret.',
          ],
        },
        {
          heading: 'Pse shitja e shpeshtë kushton dyfish',
          paragraphs: [
            'Sa herë që shitni me fitim, një pjesë e atij fitimi ikën si taksë dhe nuk kompozohet më kurrë.',
            'Dy investitorë me të njëjtin kthim bruto për njëzet vjet mund të përfundojnë me shuma dukshëm të ndryshme nëse njëri bleu e shiti vazhdimisht, kurse tjetri vetëm mbajti.',
            'Ky është argument i fuqishëm dhe i nënçmuar për mbajtjen afatgjatë: shtyrja e taksës është vetvetiu një lloj kthimi.',
          ],
        },
        {
          heading: 'Struktura ka rëndësi',
          paragraphs: [
            'Fondet akumuluese i riinvestojnë dividendët brenda fondit. Në disa juridiksione kjo e shtyn taksimin; në të tjera jo. Ia vlen ta kontrolloni për vendin tuaj.',
            'Llogaritë me lehtësi tatimore, aty ku ekzistojnë, zakonisht duhen shfrytëzuar para një llogarie të zakonshme.',
            'Dhe mbani dokumente: çmimet e blerjes, datat dhe këmbimet e monedhës. Të nxirren pas pesë vjetësh është shumë më vështirë se të ruhen sot.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'capital-gain',
          term: 'Fitim kapital',
          definition:
            'Dallimi mes çmimit të shitjes dhe atij të blerjes së një aseti.',
          aliases: ['fitimi kapital'],
        },
        {
          slug: 'tax-deferral',
          term: 'Shtyrje tatimore',
          definition:
            'Pagesa e taksës më vonë, që e lë shumën e plotë të vazhdojë të kompozohet.',
        },
        {
          slug: 'withholding-tax',
          term: 'Taksë e mbajtur në burim',
          definition:
            'Taksa që ndalet vetvetiu mbi dividendët e huaj para se t’ju arrijnë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse mbajtja afatgjatë mund të japë më shumë se blerja e shitja e shpeshtë, edhe me të njëjtin kthim bruto?',
        options: [
          'Sepse komisionet janë të njëjta',
          'Sepse taksa e shtyrë e lë shumën e plotë të vazhdojë të kompozohet',
          'Sepse tregu shpërblen besnikërinë',
        ],
        answer: 1,
        explanation:
          'Çdo shitje me fitim i heq para kompozimit. Shtyrja e taksës e mban atë shumë duke punuar për ju.',
      },
    },
    upNextSlugs: {
      sq: [
        'sjellja-kushton-me-shume-se-tarifat',
        'tarifat-qe-ndryshojne-gjithcka',
      ],
    },
  },

  {
    id: 'what-leverage-does',
    slug: { sq: 'cka-ben-leva' },
    topicId: 'risk-and-costs',
    level: 'advanced',
    title: { sq: 'Çka bën leva' },
    summary: {
      sq: 'I shumëzon fitimet dhe humbjet, por jo njësoj — dhe pikërisht kjo mospërputhje ju nxjerr jashtë loje.',
    },
    inOneSentence: {
      sq: 'Leva ju lejon të mbani më shumë se sa keni, kurse kostoja është që tash e tutje kohën e mbarimit e vendos dikush tjetër.',
    },
    body: {
      sq: [
        {
          heading: 'Matematika e pabarabartë',
          paragraphs: [
            'Nëse humbni 50%, ju duhet fitim prej 100% vetëm për t’u kthyer aty ku ishit. Kjo mospërputhje ekziston edhe pa levë; leva e keqëson.',
            'Me levë dyfishe, një rënie e tregut prej 25% jua fshin gjysmën e kapitalit. Që të rimëkëmbeni ju duhet rritje prej 100% e asaj që mbetet.',
            'Prandaj një portofol me levë mund të shkojë në zero edhe në një treg që në fund rimëkëmbet plotësisht. U nxor jashtë para se të vinte rimëkëmbja.',
          ],
        },
        {
          heading: 'Thirrja për marzh',
          paragraphs: [
            'Kur mbani me para të marra hua dhe vlera bie nën një prag, huadhënësi kërkon para shtesë në çast. Nëse s’i keni, e shet ai pozicionin tuaj në vend tuajin.',
            'Kjo ndodh gjithmonë në çastin më të keq, sepse pragu preket pikërisht kur çmimet janë më të ulëta.',
            'Ky është dallimi thelbësor mes humbjes në letër dhe humbjes së vërtetë: pa levë vendosni ju kur shitni, me levë vendos tjetri.',
          ],
        },
        {
          heading: 'Produktet me levë ditore',
          paragraphs: [
            'ETF-të “2x” a “3x” rifillojnë nga e para çdo ditë. Kjo do të thotë se për periudha më të gjata nuk e japin dyfishin as trefishin e kthimit të indeksit.',
            'Në një treg që luan lart e poshtë pa shkuar askund, një produkt i tillë humb vlerë vazhdimisht. Kjo dukuri quhet erozion i volatilitetit.',
            'Këto instrumente janë bërë për shitblerje brenda ditës. Të mbahen me muaj është përdorim krejt tjetër nga ai për të cilin janë projektuar.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Rënie tregu 25%',
        columns: ['Leva', 'Humbja juaj', 'Rritja e nevojshme për t’u kthyer'],
        rows: [
          { label: 'Pa levë', value: '−25%', cost: '+33%', tone: 'positive' },
          { label: '2x', value: '−50%', cost: '+100%' },
          { label: '3x', value: '−75%', cost: '+300%', tone: 'negative' },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'margin-call',
          term: 'Thirrje për marzh',
          definition:
            'Kërkesa e huadhënësit për para shtesë kur pozicioni juaj bie nën një prag.',
        },
        {
          slug: 'volatility-decay',
          term: 'Erozion volatiliteti',
          definition:
            'Humbja e ngadaltë e vlerës te produktet me levë ditore kur tregu luan lart e poshtë.',
        },
        {
          slug: 'liquidation',
          term: 'Likuidim i detyruar',
          definition:
            'Shitja e pozicionit tuaj nga huadhënësi kur nuk e mbuloni një thirrje për marzh.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse një portofol me levë mund të shkojë në zero edhe nëse tregu në fund rimëkëmbet plotësisht?',
        options: [
          'Sepse leva ka tarifa shumë të larta',
          'Sepse një thirrje për marzh mund t’ju nxjerrë jashtë para se të vijë rimëkëmbja',
          'Sepse tregjet nuk rimëkëmben kurrë plotësisht',
        ],
        answer: 1,
        explanation:
          'Me levë kohën e shitjes nuk e vendosni ju. Likuidimi i detyruar e kthen një humbje të përkohshme në humbje përfundimtare.',
      },
    },
    upNextSlugs: {
      sq: ['rreziku-i-likuiditetit', 'si-funksionojne-mashtrimet'],
    },
  },

  {
    id: 'liquidity-risk',
    slug: { sq: 'rreziku-i-likuiditetit' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Rreziku i likuiditetit' },
    summary: {
      sq: 'Një çmim në ekran nuk është premtim se dikush do ta paguajë atë çmim.',
    },
    inOneSentence: {
      sq: 'Likuiditeti është mundësia për të shitur shpejt me çmim të drejtë, dhe zhduket pikërisht atëherë kur ju duhet më së shumti.',
    },
    body: {
      sq: [
        {
          heading: 'Çmimi kundrejt realizimit',
          paragraphs: [
            'Çmimi i fundit tregon sa pagoi dikush për një sasi të vogël. Nuk thotë asgjë për çmimin që do ta merrnit po ta shitnit dhjetëfishin e asaj sasie.',
            'Te një aksion i madh ky dallim është i papërfillshëm. Te një aksion i vogël, te një obligacion korporativ a te një pronë, mund të jetë disa përqind.',
            'Prandaj vlerësimi i një portofoli del gjithmonë pak optimist: merr si të mirëqenë se çdo pozicion mund të shitet me çmimin e fundit, gjë që nuk vlen për të gjitha përnjëherë.',
          ],
        },
        {
          heading: 'Kur zhduket',
          paragraphs: [
            'Likuiditeti është më i bollshëm kur nuk ju duhet dhe më i pakti kur ju duhet. Në panik, blerësit ikin dhe spread-et zgjerohen në çast.',
            'Kjo i godet më së shumti asetet që dukeshin të sigurta: obligacionet korporative, fondet e pasurive të paluajtshme dhe gjithçka që blihet e shitet pak për ditë.',
            'Disa fonde i kanë pezulluar tërheqjet gjatë krizave pikërisht për këtë arsye — nuk arrinin t’i shitnin asetet aq shpejt sa për t’i paguar investitorët.',
          ],
        },
        {
          heading: 'Si ta gjykoni',
          paragraphs: [
            'Shikojeni volumin mesatar ditor. Nëse pozicioni juaj zë një pjesë të madhe të tij, dalja do t’ju kushtojë.',
            'Shikojeni spread-in mes blerjes dhe shitjes. Spread i gjerë do të thotë kosto e menjëhershme dhe paralajmërim se ka pak likuiditet.',
            'Dhe lexojini kushtet e tërheqjes për çdo fond që nuk blihet e shitet në bursë. Fjalët “në rrethana të jashtëzakonshme” e meritojnë vëmendjen para se t’ju duhen.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'liquidity-risk',
          term: 'Rrezik likuiditeti',
          definition:
            'Rreziku të mos mund të shitni shpejt pa e pranuar një çmim dukshëm më të keq.',
        },
        {
          slug: 'volume',
          term: 'Volum',
          definition:
            'Sa njësi blihen e shiten mesatarisht në ditë. Tregues i drejtpërdrejtë i likuiditetit.',
          aliases: ['volumi'],
        },
        {
          slug: 'gating',
          term: 'Pezullim tërheqjesh',
          definition:
            'Kur një fond i ndal përkohësisht tërheqjet sepse nuk arrin t’i shesë asetet e veta.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse likuiditeti është rreziku që del pikërisht atëherë kur ju duhet më së shumti?',
        options: [
          'Sepse bursat mbyllen gjatë krizave',
          'Sepse në panik blerësit ikin dhe spread-et zgjerohen',
          'Sepse rregullatorët ndalojnë shitjen',
        ],
        answer: 1,
        explanation:
          'Likuiditeti varet nga të pasurit blerës. Kur duan të shesin të gjithë përnjëherë, ata blerës nuk janë aty.',
      },
    },
    upNextSlugs: {
      sq: ['rreziku-i-perqendrimit', 'si-funksionojne-mashtrimet'],
    },
  },

  {
    id: 'inflation-as-a-risk',
    slug: { sq: 'inflacioni-si-rrezik' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Inflacioni si rrezik për kursimtarin' },
    summary: {
      sq: 'Humbja e vetme e garantuar në financë dhe e vetmja që nuk del kurrë në pasqyrën e llogarisë.',
    },
    inOneSentence: {
      sq: 'Inflacioni jua merr fuqinë blerëse pa u lëvizur asnjë shifër, prandaj është humbja e vetme që askush nuk e vëren derisa të bëhet e madhe.',
    },
    body: {
      sq: [
        {
          heading: 'Humbja e padukshme',
          paragraphs: [
            'Nëse aksionet bien për 20%, e shihni në çast. Nëse inflacioni ua ha 20% të fuqisë blerëse për shtatë vjet, pasqyra ju tregon të njëjtën shifër dhe nuk vëreni asgjë.',
            'Prandaj njerëzit e marrin paranë si “pa rrezik”. Ajo është pa luhatje, e që është krejt gjë tjetër.',
            'Me 3% inflacion, fuqia blerëse e parave tuaja përgjysmohet për njëzet e tre vjet. Kjo ndodh me siguri, jo si mundësi.',
          ],
        },
        {
          heading: 'Çfarë mbron dhe çfarë jo',
          paragraphs: [
            'Historikisht, aksionet kanë mbrojtur për periudha të gjata, sepse kompanitë i rrisin çmimet bashkë me inflacionin. Për periudha të shkurtra mund të vuajnë, sidomos kur inflacioni rritet papritmas.',
            'Obligacionet me normë të fiksuar goditen më së shumti: kuponi është i fiksuar dhe inflacioni ia ha vlerën reale çdo vit.',
            'Pasuritë e paluajtshme dhe mallrat bazë nganjëherë ndihmojnë, por jo gjithherë, dhe vijnë me kostot e ndërlikimet e veta.',
          ],
        },
        {
          heading: 'Numri që duhet parë',
          paragraphs: [
            'Kthimi që ka rëndësi është ai reali: kthimi juaj minus inflacionin. Një depozitë me 4% në një vit me 6% inflacion është humbje reale prej 2%.',
            'Kur i krahasoni mundësitë, kthejini të gjitha në vlera reale. Përndryshe një normë nominale e lartë duket tërheqëse pikërisht atëherë kur është më e keqja.',
            'Kjo është po ashtu prova për çdo premtim “pa rrezik”: nëse kthimi nominal është nën inflacion, siguria që ju ofrohet është siguri e humbjes.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Kthim nominal kundrejt real, me 5% inflacion',
        columns: ['Ku i mbani', 'Kthim nominal', 'Kthim real'],
        rows: [
          {
            label: 'Para në dorë',
            value: '0%',
            cost: '−5%',
            tone: 'negative',
          },
          { label: 'Depozitë', value: '3%', cost: '−2%' },
          {
            label: 'Indeks aksionesh (mesatarisht)',
            value: '8%',
            cost: '+3%',
            tone: 'positive',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'nominal-return',
          term: 'Kthim nominal',
          definition:
            'Kthimi para se të hiqet inflacioni. Shifra që reklamohet.',
        },
        {
          slug: 'real-return',
          term: 'Kthim real',
          definition:
            'Kthimi pas inflacionit — sa më shumë mund të blini vërtet.',
          aliases: ['kthimi real'],
        },
        {
          slug: 'inflation-linked-bond',
          term: 'Obligacion i lidhur me inflacionin',
          definition:
            'Obligacion të cilit i rriten kuponi dhe principali bashkë me inflacionin.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një depozitë paguan 4% kur inflacioni është 6%. Çka ju ndodh në vlera reale?',
        options: [
          'Fitoni 4%',
          'Humbni rreth 2% të fuqisë blerëse',
          'Nuk ndryshon asgjë',
        ],
        answer: 1,
        explanation:
          'Shifra në llogari rritet, por blen më pak. Kthimi real është ai nominal minus inflacioni.',
      },
    },
    relatedSymbols: ['gold'],
    upNextSlugs: { sq: ['cka-eshte-kompozimi', 'kursim-apo-investim'] },
  },

  {
    id: 'concentration-risk',
    slug: { sq: 'rreziku-i-perqendrimit' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Rreziku i përqendrimit' },
    summary: {
      sq: 'Rreziku më i madh që e marrin shumica e njerëzve nuk është aksioni që e zgjodhën, por sa nga gjithçka që kanë varet nga e njëjta gjë.',
    },
    inOneSentence: {
      sq: 'Përqendrimi nuk matet me numrin e investimeve, por me numrin e mënyrave të ndryshme si mund të humbni.',
    },
    body: {
      sq: [
        {
          heading: 'Përqendrimi që nuk e shihni',
          paragraphs: [
            'Nëse punoni në një bankë, keni aksione të asaj banke nga skema e punëtorëve dhe mbani edhe një ETF financiar, i keni tri variante të të njëjtit bast.',
            'Kur vuan sektori bankar, humbni përnjëherë sigurinë e vendit të punës, shpërblimin dhe investimet. Këto nuk janë tri rreziqe të veçanta.',
            'Ky është përqendrimi më i rrezikshëm sepse nuk duket në pasqyrën e portofolit — ajo i tregon vetëm investimet, jo pjesën tjetër të jetës suaj financiare.',
          ],
        },
        {
          heading: 'Aksionet e punëdhënësit',
          paragraphs: [
            'Skemat e punëtorëve janë tërheqëse dhe shpesh me zbritje. Po ashtu, janë mënyra më e zakonshme si përfundojnë njerëzit tepër të përqendruar.',
            'Rregull praktik që përdoret gjerësisht: mos i lini aksionet e punëdhënësit të kalojnë një pjesë të vogël të pasurisë suaj, sado e mirë t’ju duket kompania.',
            'Ju e njihni mirë kompaninë, por kjo njohje nuk ju mbron — punëtorët e Enron-it dhe të Lehman-it e njihnin shumë mirë kompaninë e vet.',
          ],
        },
        {
          heading: 'Përqendrimi brenda një indeksi',
          paragraphs: [
            'Edhe një fond “i gjerë” mund të jetë i përqendruar. Vitet e fundit, dhjetë kompanitë më të mëdha kanë zënë një pjesë të madhe të vlerës së indeksit amerikan.',
            'Kjo do të thotë se një ETF me pesëqind kompani mund të luajë kryesisht sipas fatit të pak emrave teknologjikë.',
            'Nuk është medoemos gabim ta mbani. Gabim është ta mbani duke menduar se keni pesëqind rreziqe të veçanta.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'concentration-risk',
          term: 'Rrezik përqendrimi',
          definition:
            'Rreziku që një pjesë e madhe e pasurisë suaj të varet nga një faktor i vetëm.',
        },
        {
          slug: 'human-capital',
          term: 'Kapital njerëzor',
          definition:
            'Vlera e të ardhurave tuaja të ardhshme nga puna — te shumica e njerëzve, pjesa më e madhe e pasurisë.',
        },
        {
          slug: 'index-weighting',
          term: 'Peshimi i indeksit',
          definition:
            'Si ndahet një indeks mes kompanive. Peshimi sipas madhësisë e përqendron te më të mëdhatë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Punoni në një kompani teknologjie, i mbani aksionet e saj dhe një ETF teknologjik. Ku është problemi?',
        options: [
          'Keni shumë pak investime',
          'Puna, shpërblimi dhe investimet varen të gjitha nga i njëjti sektor',
          'ETF-të teknologjike kanë tarifa të larta',
        ],
        answer: 1,
        explanation:
          'Këto nuk janë rreziqe të veçanta. Rënia e sektorit i godet të tria përnjëherë.',
      },
    },
    upNextSlugs: {
      sq: ['pse-funksionon-diversifikimi', 'si-ndertohet-nje-portofol'],
    },
  },

  {
    id: 'behaviour-costs-more-than-fees',
    slug: { sq: 'sjellja-kushton-me-shume-se-tarifat' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Sjellja kushton më shumë se tarifat' },
    summary: {
      sq: 'Dallimi mes kthimit të një fondi dhe kthimit të investitorëve të tij është shifër që matet — dhe është e madhe.',
    },
    inOneSentence: {
      sq: 'Shumica e njerëzve fitojnë më pak se fondet që i mbajnë, sepse blejnë pas rritjes dhe shesin pas rënies.',
    },
    body: {
      sq: [
        {
          heading: 'Boshllëku i sjelljes',
          paragraphs: [
            'Një fond mund të raportojë 8% mesatare vjetore, kurse investitori mesatar në atë fond ka fituar dukshëm më pak. Dallimi nuk vjen nga tarifat — ato janë zbritur tashmë.',
            'Vjen nga koha e hyrjes dhe e daljes. Paratë hyjnë pas viteve të mira dhe dalin pas atyre të këqija, kështu që pjesa më e madhe e kapitalit është aty për rëniet dhe mungon për rimëkëmbjet.',
            'Ky boshllëk është matur vazhdimisht dhe zakonisht del më i madh se tërë tarifa vjetore e një fondi indeksor.',
          ],
        },
        {
          heading: 'Pse ndodh',
          paragraphs: [
            'Humbja dhemb rreth dyfish më shumë se sa gëzon një fitim i njëjtë. Prandaj shitja gjatë një rënieje ndihet si lehtësim, jo si gabim.',
            'Shtoni pastaj prirjen për të parë rregullsi aty ku ka vetëm zhurmë, dhe vetëbesimin që rritet pikërisht kur çmimet janë të larta.',
            'Asnjëra prej tyre nuk zhduket vetëm se e di për të. Mbahen nën kontroll me strukturë: rregulla të vendosura që përpara, kur jeni i qetë.',
          ],
        },
        {
          heading: 'Çfarë ndihmon vërtet',
          paragraphs: [
            'Kontributet automatike e heqin vendimin mujor. Ribalancimi një herë në vit ju detyron ta shitni atë që u rrit dhe ta blini atë që ra, pa u menduar fare.',
            'Të shikuarit më rrallë ndihmon dukshëm. Sa më shpesh ta kontrolloni portofolin, aq më shumë rënie shihni dhe aq më i madh bëhet tundimi për të vepruar.',
            'Dhe një plan i shkruar — sa rrezik, pse dhe çka do të bëni në një rënie prej 30% — vlen më shumë se çdo parashikim i tregut.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'behaviour-gap',
          term: 'Boshllëk sjelljeje',
          definition:
            'Dallimi mes kthimit të një fondi dhe kthimit që e fituan vërtet investitorët e tij.',
        },
        {
          slug: 'loss-aversion',
          term: 'Neveri ndaj humbjes',
          definition:
            'Prirja për ta ndier humbjen rreth dyfish më fort se një fitim të njëjtë.',
        },
        {
          slug: 'recency-bias',
          term: 'Anshmëri e së fundit',
          definition:
            'Prirja për të menduar se ajo që ndodhi së fundi do të vazhdojë.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Pse investitori mesatar fiton më pak se fondi që e mban?',
        options: [
          'Sepse tarifat zbriten dy herë',
          'Sepse blen pas rritjeve dhe shet pas rënieve',
          'Sepse fondet raportojnë numra të pasaktë',
        ],
        answer: 1,
        explanation:
          'Kthimi i fondit e merr të mirëqenë se mbahet pandërprerë. Koha e hyrjes dhe e daljes ia shkurton atë kthim njeriut.',
      },
    },
    upNextSlugs: { sq: ['kur-duhet-shitur', 'koha-ne-treg'] },
  },

  {
    id: 'how-scams-work',
    slug: { sq: 'si-funksionojne-mashtrimet' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Si funksionojnë mashtrimet financiare' },
    summary: {
      sq: 'Struktura është gjithmonë e njëjta, edhe kur ndërrohet teknologjia.',
    },
    inOneSentence: {
      sq: 'Çdo mashtrim premton kthim të lartë pa rrezik, ju nxit të nxitoni dhe e bën tërheqjen e parave më të vështirë se depozitimin.',
    },
    body: {
      sq: [
        {
          heading: 'Shenjat që përsëriten',
          paragraphs: [
            'Kthim i lartë dhe i njëtrajtshëm, pa asnjë muaj të keq. Tregjet e vërteta luajnë; një vijë e drejtë kah lart tregon se shifrat janë të trilluara, jo se strategjia është gjeniale.',
            'Presion me kohën: “oferta mbyllet sot”, “vetëm dhjetë vende”. Nxitimi është aty që të mos keni kohë të verifikoni.',
            'Vështirësi me tërheqjen. Depozitimi është gjithmonë i menjëhershëm; tërheqja kërkon “taksa”, “verifikim” ose pritet me heshtje.',
          ],
        },
        {
          heading: 'Skema piramidale dhe Ponzi',
          paragraphs: [
            'Në një skemë Ponzi nuk ka fare investim. Paratë e investitorëve të rinj u paguhen atyre të vjetërve si “fitim”, derisa të ndalet rrjedha e re.',
            'Në një skemë piramidale, të ardhurat vijnë nga sjellja e njerëzve të rinj, jo nga shitja e ndonjë produkti të vërtetë.',
            'Të dyja ecin përderisa rriten dhe shemben sapo ndalen. Prandaj presioni për të sjellë shokë e familjarë është pjesë e mekanizmit, jo entuziazëm.',
          ],
        },
        {
          heading: 'Mbrojtja praktike',
          paragraphs: [
            'Kontrollojeni licencën te rregullatori i vendit, jo te faqja e vetë firmës. Mashtruesit i kopjojnë emrat dhe numrat e licencave të firmave reale.',
            'Kërkoni gjithmonë ta kuptoni prej nga vjen kthimi. Nëse përgjigjja është “algoritëm i yni” ose “tregtim me frekuencë të lartë” pa asnjë hollësi, kjo do të mbetet e vetmja përgjigje që merrni.',
            'Dhe mbajeni rregullin që shpëton më shumë njerëz se çdo tjetër: askush nuk ju kërkon papritmas për t’ju dhënë një mundësi të mirë investimi.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'ponzi-scheme',
          term: 'Skemë Ponzi',
          definition:
            'Mashtrim ku “fitimet” e investitorëve të vjetër paguhen me paratë e atyre të rinj.',
        },
        {
          slug: 'pump-and-dump',
          term: 'Fryrje dhe shkarkim',
          definition:
            'Ngritja artificiale e çmimit të një aseti për t’ua shitur atyre që vijnë pas.',
        },
        {
          slug: 'regulator',
          term: 'Rregullator',
          definition:
            'Autoriteti që i licencon dhe i mbikëqyr firmat financiare në një vend.',
          aliases: ['rregullatori'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një platformë tregon kthime mujore pozitive tri vjet me radhë, pa asnjë muaj negativ. Çka do të thotë kjo?',
        options: [
          'Strategji jashtëzakonisht e mirë',
          'Se shifrat ka gjasa të jenë të trilluara',
          'Se tregu ka qenë i qetë',
        ],
        answer: 1,
        explanation:
          'Tregjet e vërteta luhaten. Mungesa e plotë e muajve të këqij është shenja klasike e rezultateve të trilluara.',
      },
    },
    upNextSlugs: { sq: ['si-lexohet-fleta-e-fondit', 'cka-eshte-rreziku'] },
  },

  {
    id: 'reading-a-fund-factsheet',
    slug: { sq: 'si-lexohet-fleta-e-fondit' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: { sq: 'Si të lexohet fleta informative e një fondi' },
    summary: {
      sq: 'Dy faqe që e kanë gjithçka që ju duhet, nëse i dini cilët pesë rreshta duhen lexuar.',
    },
    inOneSentence: {
      sq: 'Fleta informative ju tregon çka mban fondi, sa kushton, sa mirë e ndjek indeksin e vet dhe sa keq ka shkuar në të kaluarën.',
    },
    body: {
      sq: [
        {
          heading: 'Pesë rreshtat që kanë rëndësi',
          paragraphs: [
            'Indeksi që e ndjek: ky e përcakton gjithçka. “MSCI World” dhe “MSCI World SRI” tingëllojnë njësoj, por mbajnë gjëra shumë të ndryshme.',
            'Tarifa e plotë vjetore, jo vetëm ajo e menaxhimit. Dhe madhësia e fondit — një fond shumë i vogël rrezikon të mbyllet e t’ju detyrojë të shitni.',
            'Zotërimet kryesore dhe pesha e tyre. Nëse dhjetë emrat e parë zënë gjysmën e fondit, ju nuk keni blerë atë që e tregon numri i kompanive.',
          ],
        },
        {
          heading: 'Ndjekja dhe replikimi',
          paragraphs: [
            'Gabimi i ndjekjes tregon sa larg ka mbetur fondi nga indeksi i vet. Një fond i lirë me ndjekje të dobët mund t’ju kushtojë më shumë se një pak më i shtrenjtë që e ndjek saktë.',
            'Rëndësi ka edhe mënyra e replikimit. Replikimi fizik do të thotë se fondi i ka vërtet aksionet. Replikimi sintetik do të thotë se mban një kontratë me një bankë që ia premton kthimin e indeksit.',
            'Ai sintetiku zakonisht është më i lirë, por shton një rrezik të ri: nëse banka dështon, bie edhe premtimi me të. Kjo është zgjedhje, jo gabim — por duhet bërë me vetëdije.',
          ],
        },
        {
          heading: 'Numrat e performancës',
          paragraphs: [
            'Performanca e kaluar tregohet gjithmonë dhe parashikon fare pak. E dobishme nuk është mesatarja, por viti më i keq dhe rënia maksimale.',
            'Ato dy shifra ju tregojnë çka duhet të jeni në gjendje ta duroni. Nëse rënia maksimale historike është 45% dhe ju e dini se do të shitnit te 25%, ky fond nuk është për ju, sado i mirë të jetë kthimi mesatar.',
            'Kontrollojeni edhe në cilën monedhë raportohet performanca. Të njëjtat shifra në monedhë tjetër tregojnë krejt tjetër histori.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Çfarë të kërkoni, sipas rendit',
        columns: ['Rreshti', 'Pyetja që përgjigjet', 'Shenjë paralajmëruese'],
        rows: [
          {
            label: 'Indeksi i ndjekur',
            value: 'Çka mbaj në të vërtetë?',
            cost: 'Emër i ngjashëm, përmbajtje tjetër',
          },
          {
            label: 'Tarifa totale',
            value: 'Sa më kushton?',
            cost: 'Tregohet vetëm tarifa e menaxhimit',
            tone: 'negative',
          },
          {
            label: 'Rënia maksimale',
            value: 'Sa keq ka shkuar?',
            cost: 'Histori shumë e shkurtër',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'factsheet',
          term: 'Fletë informative',
          definition:
            'Dokumenti dyfaqësh që i përmbledh strategjinë, kostot dhe performancën e një fondi.',
          aliases: ['fleta informative', 'KID'],
        },
        {
          slug: 'physical-replication',
          term: 'Replikim fizik',
          definition: 'Kur fondi i ka vërtet letrat me vlerë të indeksit.',
        },
        {
          slug: 'synthetic-replication',
          term: 'Replikim sintetik',
          definition:
            'Kur fondi mban një kontratë me një bankë që ia premton kthimin e indeksit.',
        },
        {
          slug: 'counterparty-risk',
          term: 'Rrezik i palës tjetër',
          definition:
            'Rreziku që pala e cila ju ka premtuar diçka të mos jetë në gjendje ta mbajë premtimin.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Dy fonde e ndjekin të njëjtin indeks. Njëri ka tarifë 0,05% dhe gabim ndjekjeje 0,40%; tjetri 0,15% dhe 0,03%. Cili ka gjasa t’ju dalë më lirë?',
        options: [
          'Gjithmonë i pari, sepse tarifa është më e ulët',
          'I dyti, sepse ndjekja e dobët kushton më shumë se dallimi në tarifë',
          'S’ka rëndësi, të dy e ndjekin të njëjtin indeks',
        ],
        answer: 1,
        explanation:
          'Kostoja e vërtetë është tarifa plus largimi nga indeksi. Ndjekja e dobët mund ta kalojë lehtë kursimin nga një tarifë e ulët.',
      },
    },
    upNextSlugs: { sq: ['cka-eshte-nje-fond', 'si-ndertohet-nje-portofol'] },
  },

  {
    id: 'when-to-sell',
    slug: { sq: 'kur-duhet-shitur' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Kur duhet shitur' },
    summary: {
      sq: 'Tri arsye të mira dhe disa të këqija — dhe pse vendimi duhet marrë para se të luajë çmimi.',
    },
    inOneSentence: {
      sq: 'Shitni kur ndërrohet arsyeja pse e bletë, kur ju duhen paratë ose kur pesha është rritur shumë — jo sepse ka rënë çmimi.',
    },
    body: {
      sq: [
        {
          heading: 'Tri arsye të mira',
          paragraphs: [
            'E para: teza juaj u prish. E bletë një kompani sepse prisnit diçka; ajo gjë nuk po ndodh dhe nuk ka për të ndodhur. Çmimi nuk ka rëndësi në këtë gjykim.',
            'E dyta: ju duhen paratë. Ky është qëllimi i investimit. Të shitesh për të blerë shtëpi ose për t’i paguar studimet nuk është dështim, është plotësim i planit.',
            'E treta: pesha ka dalë jashtë kontrollit. Nëse një pozicion është rritur nga 5% në 30% të portofolit, tash keni një përqendrim që nuk e keni zgjedhur.',
          ],
        },
        {
          heading: 'Arsyet e këqija që tingëllojnë të mira',
          paragraphs: [
            '“U rrit shumë, po e marr fitimin.” Çmimi që e keni paguar s’ka lidhje me vlerën e sotme. Tregu nuk e di sa keni paguar dhe as nuk i intereson.',
            '“Ra shumë, po pres të kthehet e pastaj e shes.” Kjo e lidh vendimin me një shifër të rastit — çmimin tuaj të blerjes — në vend se me vlerën e sotme.',
            '“Po shesin të gjithë.” Kjo është arsyeja që shkakton shitje pikërisht në fund të një rënieje, ku dëmi është më i madhi.',
          ],
        },
        {
          heading: 'Vendoseni paraprakisht',
          paragraphs: [
            'Rregullat e shkruara para se ta merrni një pozicion janë shumë më të mira se gjykimi në çastin e stresit.',
            'Një rregull i thjeshtë ribalancimi — kthehu te peshat e synuara një herë në vit, ose kur diçka largohet më shumë se dhjetë pikë përqindjeje — i merr shumicën e këtyre vendimeve në vend tuajin.',
            'Kjo është arsyeja e vërtetë pse funksionon ribalancimi: jo se e qëllon kohën, por se jua heq nga duart vendimin që keni më së shumti gjasa ta merrni gabim.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'sunk-cost',
          term: 'Kosto e zhytur',
          definition:
            'Para të shpenzuara tashmë, që nuk duhet të ndikojnë në asnjë vendim të ardhshëm.',
        },
        {
          slug: 'anchoring',
          term: 'Ankorim',
          definition:
            'Lidhja e një vendimi me një shifër të rastit, zakonisht me çmimin që e keni paguar.',
        },
        {
          slug: 'investment-thesis',
          term: 'Tezë investimi',
          definition:
            'Arsyeja e shkruar pse e blini diçka — dhe prandaj mënyra e vetme për ta ditur kur duhet shitur.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një aksion ka rënë për 30% dhe vendosni të prisni “derisa të kthehet te çmimi im” për ta shitur. Ku është gabimi?',
        options: [
          'Duhet shitur në çast gjithçka që bie',
          'Çmimi juaj i blerjes është i rastit dhe nuk thotë asgjë për vlerën e sotme',
          'Duhet blerë më shumë gjithmonë',
        ],
        answer: 1,
        explanation:
          'Tregu nuk e di sa keni paguar. Vendimi duhet të varet nga vlera dhe teza sot, jo nga një shifër e së kaluarës suaj.',
      },
    },
    upNextSlugs: {
      sq: ['si-ndertohet-nje-portofol', 'sjellja-kushton-me-shume-se-tarifat'],
    },
  },

  {
    id: 'building-a-simple-portfolio',
    slug: { sq: 'si-ndertohet-nje-portofol' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Si të ndërtohet një portofol i thjeshtë' },
    summary: {
      sq: 'Vendimi që e shpjegon pjesën më të madhe të rezultatit tuaj nuk është cilat aksione, por sa nga secili lloj.',
    },
    inOneSentence: {
      sq: 'Zgjidheni ndarjen mes aksioneve dhe obligacioneve sipas afatit tuaj, mbajeni të gjerë e të lirë dhe ribalancojeni një herë në vit.',
    },
    body: {
      sq: [
        {
          heading: 'Vendimi i parë dhe më i rëndësishmi',
          paragraphs: [
            'Studime të ndryshme japin shifra të ndryshme, por të gjitha pajtohen për drejtimin: pjesa dërrmuese e luhatjes së një portofoli shpjegohet nga ndarja mes llojeve të aseteve, jo nga zgjedhja brenda tyre.',
            'Me fjalë të tjera, “sa përqind në aksione” ka shumë më shumë rëndësi se “cilat aksione”.',
            'Ky është lajm i mirë: vendimi më i rëndësishëm është edhe më i thjeshti dhe nuk kërkon asnjë parashikim.',
          ],
        },
        {
          heading: 'Një strukturë që mjafton',
          paragraphs: [
            'Një fond i gjerë global aksionesh i mbulon mijëra kompani në dhjetëra shtete. Një fond obligacionesh cilësore e mbulon pjesën e qëndrueshme.',
            'Për shumicën e njerëzve mjaftojnë dy fonde. Shtimi i një të treti a të katërti duhet t’i përgjigjet një pyetjeje konkrete, jo dëshirës për të pasur më shumë.',
            'Përmasat varen nga afati: sa më larg dita kur ju duhen paratë, aq më e madhe mund të jetë pjesa e aksioneve.',
          ],
        },
        {
          heading: 'Mirëmbajtja',
          paragraphs: [
            'Kontribuoni rregullisht dhe vetvetiu. Ribalanconi një herë në vit. Shikojeni rrallë. Kaq është e tëra.',
            'Mos i shkoni pas tundimit për ta bërë më të ndërlikuar. Çdo shtresë e re sjell kosto, ngatërresë dhe edhe një vendim ku mund të gaboni.',
            'Portofoli më i mirë nuk është ai me kthimin më të lartë të pritur. Është ai që do ta mbani vërtet dhjetë vjet, bashkë me vitet e këqija.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Ndarje sipas afatit',
        columns: ['Kur ju duhen', 'Aksione', 'Obligacione dhe para'],
        rows: [
          { label: 'Nën 3 vjet', value: '0%', cost: '100%', tone: 'positive' },
          { label: '5 deri 10 vjet', value: '50-70%', cost: '30-50%' },
          { label: 'Mbi 15 vjet', value: '80-100%', cost: '0-20%' },
        ],
      },
    },
    workedExample: {
      sq: [
        {
          title: 'Zgjidhni ndarjen',
          body: 'Afat njëzetvjeçar, durim i mirë ndaj rrezikut: 80% aksione globale, 20% obligacione.',
        },
        {
          title: 'Kontribuoni automatikisht',
          body: 'E njëjta shumë çdo muaj, e ndarë në të njëjtat përmasa. Asnjë vendim çdo muaj.',
        },
        {
          title: 'Ribalanconi një herë në vit',
          body: 'Nëse aksionet janë rritur në 88%, shitni pak dhe blini obligacione derisa të ktheheni te 80/20.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'asset-allocation',
          term: 'Shpërndarje asetesh',
          definition:
            'Ndarja e portofolit nëpër lloje të investimeve. Vendimi që e shpjegon pjesën më të madhe të rezultatit.',
          aliases: ['shpërndarja e aseteve', 'shpërndarje aktivesh'],
        },
        {
          slug: 'target-weight',
          term: 'Peshë e synuar',
          definition:
            'Përqindja që e keni caktuar për secilën pjesë dhe te e cila ktheheni kur ribalanconi.',
        },
        {
          slug: 'core-satellite',
          term: 'Bërthamë dhe satelitë',
          definition:
            'Një bazë e gjerë e lirë, plus pozicione të vogla për gjithçka tjetër.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Cili vendim e shpjegon pjesën më të madhe të luhatjes së një portofoli?',
        options: [
          'Cilat aksione i zgjidhni një nga një',
          'Sa përqind mbani në aksione e sa në obligacione',
          'Në cilën ditë të muajit blini',
        ],
        answer: 1,
        explanation:
          'Ndarja mes llojeve të aseteve e vendos rezultatin. Zgjedhja brenda secilit lloj ka shumë më pak peshë.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: { sq: ['kur-duhet-shitur', 'njeqind-eurot-e-para'] },
  },
];
