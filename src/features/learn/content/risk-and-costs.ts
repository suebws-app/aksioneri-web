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
  slugs: [
    'what-risk-actually-means',
    'currency-risk',
    'tax-on-investments',
    'what-leverage-does',
    'liquidity-risk',
    'inflation-as-a-risk',
    'concentration-risk',
    'behaviour-costs-more-than-fees',
    'how-scams-work',
    'reading-a-fund-factsheet',
    'when-to-sell',
    'building-a-simple-portfolio',
  ],
};

export const RISK_COSTS_LESSONS: SeedLesson[] = [
  {
    id: 'what-risk-actually-means',
    slug: 'what-risk-actually-means',
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Çfarë do të thotë vërtet rrezik' },
    summary: {
      sq: 'Jo luhatja e çmimit, por mundësia që të mos i keni paratë kur ju duhen.',
    },
    inOneSentence: {
      sq: 'Rreziku i vërtetë nuk është që çmimi lëviz, por që të detyroheni të shisni në momentin kur ka lëvizur poshtë.',
    },
    body: {
      sq: [
        {
          heading: 'Dy përkufizime që ngatërrohen',
          paragraphs: [
            'Financa akademike e mat rrezikun si luhatje: sa shumë lëviz çmimi rreth mesatares. Ky përkufizim është i matshëm dhe i dobishëm për modele.',
            'Për një person, rreziku është diçka tjetër: mundësia që të mos arrini qëllimin tuaj. Nëse ju duhen 50.000 € pas dhjetë vjetësh, rreziku është që të keni 30.000 €.',
            'Këto dy përkufizime shpesh bien ndesh. Paratë në një llogari kursimi kanë luhatje zero dhe rrezik shumë të lartë që të mos arrijnë qëllimin tuaj afatgjatë.',
          ],
        },
        {
          heading: 'Rreziku i sekuencës',
          paragraphs: [
            'Rendi i kthimeve ka rëndësi, jo vetëm mesatarja e tyre. Dy portofole me të njëjtin kthim mesatar mund të japin rezultate krejt të ndryshme nëse tërhiqni para gjatë rrugës.',
            'Një rënie e madhe në vitin e parë të pensionit, ndërsa po tërhiqni, dëmton shumë më shumë se e njëjta rënie në vitin e fundit.',
            'Prandaj sa më afër të jeni datës kur do t’ju duhen paratë, aq më pak duhet të varet rezultati juaj nga tregu.',
          ],
        },
        {
          heading: 'Rreziqet që nuk maten',
          paragraphs: [
            'Modelet supozojnë se e ardhmja do t’i ngjajë të kaluarës. Ngjarjet që nuk kanë ndodhur kurrë më parë nuk shfaqen në asnjë statistikë.',
            'Rrezik është gjithashtu të mos kuptoni se çfarë keni blerë. Një produkt që nuk mund ta shpjegoni me fjalët tuaja është një rrezik pavarësisht se çfarë thonë numrat.',
            'Testi më i dobishëm mbetet i thjeshtë: çfarë duhet të ndodhë që unë të humbas gjithçka këtu, dhe sa e pamundur është ajo vërtet?',
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
            'Rreziku që rendi i kthimeve, jo mesatarja e tyre, të prishë planin kur po tërhiqni para.',
        },
        {
          slug: 'shortfall-risk',
          term: 'Rrezik mosarritjeje',
          definition:
            'Mundësia që të mos keni shumën që ju duhet në datën kur ju duhet.',
        },
        {
          slug: 'tail-risk',
          term: 'Rrezik ekstrem',
          definition:
            'Ngjarje shumë të rralla dhe shumë të dëmshme, të cilat modelet i nënvlerësojnë sistematikisht.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Paratë tuaja për pensionin pas njëzet vjetësh rrinë në një llogari kursimi. Cili rrezik është më i madh?',
        options: [
          'Luhatja e çmimit',
          'Që inflacioni t’i hajë fuqinë blerëse dhe të mos arrini shumën e nevojshme',
          'Që banka të ndryshojë tarifat',
        ],
        answer: 1,
        explanation:
          'Luhatja është zero, por rreziku i mosarritjes së qëllimit është i lartë. Siguria e shifrës nuk është siguri e rezultatit.',
      },
    },
    upNextSlugs: ['inflation-as-a-risk', 'concentration-risk'],
  },

  {
    id: 'currency-risk',
    slug: 'currency-risk',
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: { sq: 'Rreziku i monedhës' },
    summary: {
      sq: 'Një investim i mirë në dollarë mund të jetë një investim i keq në euro.',
    },
    inOneSentence: {
      sq: 'Kur blini diçka të çmuar në një monedhë tjetër, merrni dy investime: aktivin dhe monedhën.',
    },
    body: {
      sq: [
        {
          heading: 'Dy lëvizje, një rezultat',
          paragraphs: [
            'Blini një ETF amerikan që rritet 10% gjatë vitit. Në të njëjtën kohë dollari dobësohet 10% kundrejt euros. Kthimi juaj në euro është afërsisht zero.',
            'Kjo funksionon edhe në drejtimin tjetër: një treg i sheshtë amerikan me një dollar që forcohet mund t’ju japë një fitim të mirë në euro.',
            'Asnjëra nga këto nuk ka lidhje me cilësinë e kompanive që blini. Është thjesht një lëvizje e dytë e mbivendosur mbi të parën.',
          ],
        },
        {
          heading: 'A duhet të mbrohet?',
          paragraphs: [
            'Mbrojtja nga monedha ka një kosto, që zakonisht reflekton diferencën e normave të interesit mes dy monedhave. Ajo nuk është falas.',
            'Për aksione afatgjata, shumica e argumenteve shkojnë kundër mbrojtjes: luhatjet valutore priren të balancohen me kalimin e dekadave, dhe kostoja e mbrojtjes akumulohet.',
            'Për obligacione është e kundërta. Nëse mbani obligacione të huaja për stabilitet, një luhatje valutore prej 10% e shkatërron atë stabilitet — ndaj aty mbrojtja ka kuptim.',
          ],
        },
        {
          heading: 'Ku fshihet kostoja',
          paragraphs: [
            'Kostoja më e madhe valutore për një investitor të vogël nuk është luhatja, por marzhi që platforma merr në çdo konvertim.',
            'Një marzh prej 0,5% për të blerë dhe 0,5% për të shitur është një përqind e plotë, e paguar sa herë hyni e dilni.',
            'Kontrolloni gjithmonë kursin e ofruar kundrejt kursit të tregut. Diferenca është një tarifë që rrallë reklamohet si tarifë.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Investoni 1.000 € në një ETF amerikan',
          body: 'Konvertohen në rreth 1.100 dollarë me kursin e ditës, minus marzhin e platformës.',
        },
        {
          title: 'ETF-ja rritet 10% gjatë vitit',
          body: 'Tani keni rreth 1.210 dollarë. Në dollarë, gjithçka shkoi mirë.',
        },
        {
          title: 'Dollari dobësohet 10% kundrejt euros',
          body: 'Ata 1.210 dollarë kthehen në rreth 1.000 €. Fitimi u zhduk plotësisht në konvertim.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'currency-risk',
          term: 'Rrezik monedhe',
          definition:
            'Rreziku që lëvizja e kursit të këmbimit të ndryshojë kthimin tuaj në monedhën vendase.',
          aliases: ['rreziku valutor'],
        },
        {
          slug: 'hedged',
          term: 'I mbrojtur',
          definition:
            'Një fond që heq efektin e kursit të këmbimit, me një kosto vjetore.',
          aliases: ['mbrojtje valutore', 'hedged'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'ETF-ja juaj amerikane u rrit 8% dhe dollari u dobësua 8%. Sa fituat në euro?',
        options: ['Rreth 16%', 'Pothuajse asgjë', 'Rreth 8%'],
        answer: 1,
        explanation:
          'Të dyja lëvizjet mbivendosen. Fitimi në dollarë u fshi nga humbja në konvertim.',
      },
    },
    relatedSymbols: ['eur-usd'],
    upNextSlugs: ['tax-on-investments', 'reading-a-fund-factsheet'],
  },

  {
    id: 'tax-on-investments',
    slug: 'tax-on-investments',
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Taksat mbi investimet' },
    summary: {
      sq: 'Kur lind detyrimi, pse shitja e shpeshtë kushton, dhe pse ky nuk është këshillë tatimore.',
    },
    inOneSentence: {
      sq: 'Taksa zakonisht lind kur shisni ose kur merrni një dividend, ndaj sa më rrallë të shisni, aq më gjatë punojnë paratë tuaja të plota.',
    },
    body: {
      sq: [
        {
          heading: 'Dy momente taksimi',
          paragraphs: [
            'I pari është fitimi kapital: diferenca mes çmimit të shitjes dhe atij të blerjes. Ai zakonisht nuk taksohet derisa të shisni.',
            'I dyti janë të ardhurat: dividendët dhe kuponët e obligacioneve, të cilat zakonisht taksohen në vitin që i merrni, pavarësisht nëse i shpenzoni.',
            'Rregullat, normat dhe përjashtimet ndryshojnë nga vendi në vend dhe ndryshojnë me kohën. Kjo faqe shpjegon mekanizmin, jo detyrimin tuaj konkret.',
          ],
        },
        {
          heading: 'Pse shitja e shpeshtë kushton dyfish',
          paragraphs: [
            'Sa herë shisni me fitim, një pjesë e atij fitimi largohet si taksë dhe nuk kompozohet më kurrë.',
            'Dy investitorë me të njëjtin kthim bruto mbi njëzet vjet mund të përfundojnë me shuma dukshëm të ndryshme nëse njëri tregtoi rregullisht dhe tjetri mbajti.',
            'Ky është një argument i fuqishëm dhe i nënvlerësuar për mbajtjen afatgjatë: shtyrja e taksës është vetë një formë kthimi.',
          ],
        },
        {
          heading: 'Struktura ka rëndësi',
          paragraphs: [
            'Fondet akumuluese riinvestojnë dividendët brenda fondit. Në disa juridiksione kjo shtyn taksimin; në të tjera jo. Ia vlen ta kontrolloni për vendin tuaj.',
            'Llogaritë me përparësi tatimore, aty ku ekzistojnë, janë zakonisht mundësia e parë që duhet shfrytëzuar përpara një llogarie të zakonshme.',
            'Dhe mbani dokumentacion: çmimet e blerjes, datat dhe konvertimet valutore. Rindërtimi i tyre pas pesë vjetësh është shumë më i vështirë se ruajtja e tyre sot.',
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
            'Diferenca mes çmimit të shitjes dhe atij të blerjes së një aktivi.',
          aliases: ['fitimi kapital'],
        },
        {
          slug: 'tax-deferral',
          term: 'Shtyrje tatimore',
          definition:
            'Pagimi i taksës më vonë, që lejon shumën e plotë të vazhdojë të kompozohet.',
        },
        {
          slug: 'withholding-tax',
          term: 'Taksë e mbajtur në burim',
          definition:
            'Taksa e ndalur automatikisht mbi dividendët e huaj përpara se t’ju arrijnë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse mbajtja afatgjatë mund të japë më shumë se tregtimi i shpeshtë, edhe me të njëjtin kthim bruto?',
        options: [
          'Sepse komisionet janë të njëjta',
          'Sepse taksa e shtyrë lejon shumën e plotë të vazhdojë të kompozohet',
          'Sepse tregu shpërblen besnikërinë',
        ],
        answer: 1,
        explanation:
          'Çdo shitje me fitim heq para nga kompozimi. Shtyrja e taksës e mban atë shumë duke punuar për ju.',
      },
    },
    upNextSlugs: [
      'behaviour-costs-more-than-fees',
      'fees-that-change-everything',
    ],
  },

  {
    id: 'what-leverage-does',
    slug: 'what-leverage-does',
    topicId: 'risk-and-costs',
    level: 'advanced',
    title: { sq: 'Çfarë bën leva' },
    summary: {
      sq: 'Shumëzon fitimet dhe humbjet, por jo simetrikisht — dhe asimetria është ajo që ju nxjerr jashtë.',
    },
    inOneSentence: {
      sq: 'Leva ju lejon të kontrolloni më shumë sesa keni, dhe kostoja është që tani dikush tjetër vendos kur mbaron loja.',
    },
    body: {
      sq: [
        {
          heading: 'Matematika e pabarabartë',
          paragraphs: [
            'Nëse humbisni 50%, ju duhet një fitim prej 100% vetëm për t’u kthyer aty ku ishit. Kjo asimetri ekziston pa levë; leva e përkeqëson.',
            'Me levë dyfishe, një rënie tregu prej 25% ju fshin gjysmën e kapitalit. Për t’u rikuperuar ju duhet një rritje prej 100% e asaj që mbetet.',
            'Prandaj një portofol me levë mund të falimentojë edhe në një treg që përfundimisht rikuperohet plotësisht. Ai u nxor jashtë përpara rikuperimit.',
          ],
        },
        {
          heading: 'Thirrja për marzh',
          paragraphs: [
            'Kur mbani me para të huazuara dhe vlera bie nën një prag, huadhënësi kërkon para shtesë menjëherë. Nëse nuk i keni, ai shet pozicionin tuaj për ju.',
            'Kjo ndodh gjithmonë në momentin më të keq, sepse pragu preket pikërisht kur çmimet janë më të ulëta.',
            'Kjo është ndryshimi thelbësor mes humbjes në letër dhe humbjes së realizuar: pa levë ju vendosni kur shisni, me levë vendos tjetri.',
          ],
        },
        {
          heading: 'Produktet me levë ditore',
          paragraphs: [
            'ETF-të «2x» ose «3x» rivendosen çdo ditë. Kjo do të thotë se mbi periudha më të gjata ato nuk japin dyfishin ose trefishin e kthimit të indeksit.',
            'Në një treg që lëviz lart e poshtë pa shkuar askund, një produkt i tillë humbet vlerë vazhdimisht. Fenomeni quhet erozion i volatilitetit.',
            'Këto instrumente janë ndërtuar për tregti brenda ditës. Mbajtja e tyre për muaj është një përdorim i ndryshëm nga ai për të cilin janë projektuar.',
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
            'Humbja graduale e vlerës në produkte me levë ditore kur tregu lëviz lart e poshtë.',
        },
        {
          slug: 'liquidation',
          term: 'Likuidim i detyruar',
          definition:
            'Shitja e pozicionit tuaj nga huadhënësi kur nuk plotësoni një thirrje për marzh.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse një portofol me levë mund të falimentojë edhe nëse tregu përfundimisht rikuperohet plotësisht?',
        options: [
          'Sepse leva ka tarifa shumë të larta',
          'Sepse një thirrje për marzh mund t’ju nxjerrë jashtë përpara rikuperimit',
          'Sepse tregjet nuk rikuperohen kurrë plotësisht',
        ],
        answer: 1,
        explanation:
          'Me levë nuk vendosni ju kohën e shitjes. Likuidimi i detyruar e kthen një humbje të përkohshme në një humbje përfundimtare.',
      },
    },
    upNextSlugs: ['liquidity-risk', 'how-scams-work'],
  },

  {
    id: 'liquidity-risk',
    slug: 'liquidity-risk',
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Rreziku i likuiditetit' },
    summary: {
      sq: 'Një çmim në ekran nuk është një premtim se dikush do të paguajë atë çmim.',
    },
    inOneSentence: {
      sq: 'Likuiditeti është aftësia për të shitur shpejt me një çmim të drejtë, dhe ai zhduket pikërisht kur ju duhet më shumë.',
    },
    body: {
      sq: [
        {
          heading: 'Çmimi kundrejt realizimit',
          paragraphs: [
            'Çmimi i fundit tregon se sa pagoi dikush për një sasi të vogël. Ai nuk thotë asgjë për çmimin që do të merrnit nëse do të shisnit dhjetë herë atë sasi.',
            'Në një aksion të madh diferenca është e papërfillshme. Në një aksion të vogël, në një obligacion korporativ ose në një pronë, ajo mund të jetë shumë përqindje.',
            'Prandaj vlerësimi i një portofoli është gjithmonë pak optimist: ai supozon se çdo pozicion mund të shitet me çmimin e fundit, gjë që nuk është e vërtetë për të gjitha njëkohësisht.',
          ],
        },
        {
          heading: 'Kur zhduket',
          paragraphs: [
            'Likuiditeti është më i bollshëm kur nuk ju duhet dhe më i pakti kur ju duhet. Në panik, blerësit largohen dhe spread-et zgjerohen menjëherë.',
            'Kjo prek më së shumti aktivet që dukeshin të sigurta: obligacione korporative, fonde pasurish të paluajtshme, dhe çdo gjë me pak tregti të përditshme.',
            'Disa fonde kanë pezulluar tërheqjet gjatë krizave pikërisht për këtë arsye — ato nuk mund të shisnin aktivet mjaftueshëm shpejt për të paguar investitorët.',
          ],
        },
        {
          heading: 'Si ta gjykoni',
          paragraphs: [
            'Shikoni volumin mesatar ditor. Nëse pozicioni juaj është një pjesë e madhe e tij, dalja do t’ju kushtojë.',
            'Shikoni spread-in mes blerjes dhe shitjes. Një spread i gjerë është një kosto e menjëhershme dhe një paralajmërim për likuiditet të hollë.',
            'Dhe lexoni kushtet e tërheqjes së çdo fondi që nuk tregtohet në bursë. Fjalët «në rrethana të jashtëzakonshme» meritojnë vëmendje përpara se t’ju duhen.',
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
            'Rreziku që të mos mund të shisni shpejt pa pranuar një çmim dukshëm më të keq.',
        },
        {
          slug: 'volume',
          term: 'Volum',
          definition:
            'Sa njësi tregtohen mesatarisht në ditë. Tregues i drejtpërdrejtë i likuiditetit.',
          aliases: ['volumi'],
        },
        {
          slug: 'gating',
          term: 'Pezullim tërheqjesh',
          definition:
            'Kur një fond ndalon përkohësisht tërheqjet sepse nuk mund të shesë aktivet e veta.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse likuiditeti është rreziku që shfaqet pikërisht kur ju duhet më shumë?',
        options: [
          'Sepse bursat mbyllen gjatë krizave',
          'Sepse në panik blerësit largohen dhe spread-et zgjerohen',
          'Sepse rregullatorët ndalojnë shitjen',
        ],
        answer: 1,
        explanation:
          'Likuiditeti varet nga prania e blerësve. Kur të gjithë duan të shesin njëkohësisht, ata blerës nuk janë aty.',
      },
    },
    upNextSlugs: ['concentration-risk', 'how-scams-work'],
  },

  {
    id: 'inflation-as-a-risk',
    slug: 'inflation-as-a-risk',
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Inflacioni si rrezik për kursimtarin' },
    summary: {
      sq: 'Humbja e vetme e garantuar në financë, dhe e vetmja që nuk shfaqet kurrë në një pasqyrë llogarie.',
    },
    inOneSentence: {
      sq: 'Inflacioni ju merr fuqi blerëse pa lëvizur asnjë shifër, ndaj është humbja e vetme që askush nuk e vëren derisa të jetë e madhe.',
    },
    body: {
      sq: [
        {
          heading: 'Humbja e padukshme',
          paragraphs: [
            'Nëse aksionet bien 20%, e shihni menjëherë. Nëse inflacioni ha 20% të fuqisë blerëse gjatë shtatë vjetësh, pasqyra juaj tregon të njëjtin numër dhe ju nuk vini re asgjë.',
            'Kjo është arsyeja pse njerëzit e trajtojnë paranë si «pa rrezik». Ajo është pa luhatje, gjë krejt e ndryshme.',
            'Me 3% inflacion, fuqia blerëse e parave tuaja përgjysmohet për njëzet e tre vjet. Kjo ndodh me siguri, jo me probabilitet.',
          ],
        },
        {
          heading: 'Çfarë mbron dhe çfarë jo',
          paragraphs: [
            'Historikisht aksionet kanë mbrojtur mbi periudha të gjata, sepse kompanitë i rrisin çmimet e tyre bashkë me inflacionin. Mbi periudha të shkurtra ato mund të vuajnë, sidomos kur inflacioni rritet papritur.',
            'Obligacionet me normë fikse janë më të prekurat: kuponi është i fiksuar dhe inflacioni ha vlerën e tij reale çdo vit.',
            'Pasuritë e paluajtshme dhe mallrat bazë ndihmojnë ndonjëherë, por jo në mënyrë të besueshme dhe me kosto e ndërlikime të tyre.',
          ],
        },
        {
          heading: 'Numri që duhet parë',
          paragraphs: [
            'Kthimi që ka rëndësi është ai real: kthimi juaj minus inflacionin. Një depozitë me 4% gjatë një viti me 6% inflacion është një humbje reale prej 2%.',
            'Kur krahasoni opsione, kthejini të gjitha në terma realë. Përndryshe një normë nominale e lartë duket tërheqëse pikërisht kur është më e keqe.',
            'Ky është gjithashtu testi për çdo premtim «pa rrezik»: nëse kthimi nominal është nën inflacion, siguria që ju ofrohet është siguria e humbjes.',
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
          definition: 'Kthimi para se të hiqet inflacioni. Numri i reklamuar.',
        },
        {
          slug: 'real-return',
          term: 'Kthim real',
          definition:
            'Kthimi pas inflacionit — sa më shumë mund të blini në fakt.',
          aliases: ['kthimi real'],
        },
        {
          slug: 'inflation-linked-bond',
          term: 'Obligacion i lidhur me inflacionin',
          definition:
            'Obligacion kuponi dhe principali i të cilit rriten me inflacionin.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një depozitë paguan 4% kur inflacioni është 6%. Çfarë ju ndodh në terma realë?',
        options: [
          'Fitoni 4%',
          'Humbisni rreth 2% të fuqisë blerëse',
          'Nuk ndryshon asgjë',
        ],
        answer: 1,
        explanation:
          'Shifra në llogari rritet, por blen më pak. Kthimi real është nominali minus inflacioni.',
      },
    },
    relatedSymbols: ['gold'],
    upNextSlugs: ['what-is-compounding', 'saving-vs-investing'],
  },

  {
    id: 'concentration-risk',
    slug: 'concentration-risk',
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Rreziku i përqendrimit' },
    summary: {
      sq: 'Rreziku më i madh që marrin shumica e njerëzve nuk është aksioni që zgjodhën, por sa prej gjithçkaje varet nga e njëjta gjë.',
    },
    inOneSentence: {
      sq: 'Përqendrimi nuk matet me numrin e investimeve, por me numrin e mënyrave të ndryshme me të cilat mund të humbisni.',
    },
    body: {
      sq: [
        {
          heading: 'Përqendrimi që nuk e shihni',
          paragraphs: [
            'Nëse punoni në një bankë, keni aksione të asaj banke nga skema e punonjësve, dhe mbani një ETF financiar, ju keni tri versione të së njëjtit bast.',
            'Kur sektori bankar vuan, ju humbisni njëkohësisht sigurinë e punës, shpërblimin dhe investimet. Këto nuk janë tri rreziqe të pavarura.',
            'Ky është përqendrimi më i rrezikshëm sepse është i padukshëm në një pasqyrë portofoli — që tregon vetëm investimet, jo pjesën tjetër të jetës suaj financiare.',
          ],
        },
        {
          heading: 'Aksionet e punëdhënësit',
          paragraphs: [
            'Skemat e punonjësve janë tërheqëse dhe shpesh me zbritje. Ato janë gjithashtu mënyra më e zakonshme me të cilën njerëzit e zakonshëm përfundojnë tepër të përqendruar.',
            'Rregulli praktik i përdorur gjerësisht: mos lini aksionet e punëdhënësit të kalojnë një pjesë të vogël të pasurisë suaj, pavarësisht sa mirë ju duket kompania.',
            'Ju e njihni kompaninë mirë, por kjo njohje nuk ju mbron — punonjësit e Enron dhe të Lehman e njihnin kompaninë e tyre shumë mirë.',
          ],
        },
        {
          heading: 'Përqendrimi brenda një indeksi',
          paragraphs: [
            'Edhe një fond «i gjerë» mund të jetë i përqendruar. Në vitet e fundit dhjetë kompanitë më të mëdha kanë përbërë një pjesë të konsiderueshme të vlerës së indeksit amerikan.',
            'Kjo do të thotë se një ETF me pesëqind kompani mund të lëvizë kryesisht sipas fatit të pak emrave teknologjikë.',
            'Nuk është domosdoshmërisht gabim ta mbani. Është gabim ta mbani duke menduar se keni pesëqind rreziqe të pavarura.',
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
            'Vlera e të ardhurave tuaja të ardhshme nga puna — pjesa më e madhe e pasurisë së shumicës së njerëzve.',
        },
        {
          slug: 'index-weighting',
          term: 'Peshimi i indeksit',
          definition:
            'Si ndahet një indeks mes kompanive. Peshimi sipas madhësisë e përqendron tek më të mëdhatë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Punoni në një kompani teknologjie, mbani aksionet e saj dhe një ETF teknologjik. Cili është problemi?',
        options: [
          'Keni shumë pak investime',
          'Puna, shpërblimi dhe investimet varen të gjitha nga i njëjti sektor',
          'ETF-të teknologjike kanë tarifa të larta',
        ],
        answer: 1,
        explanation:
          'Këto nuk janë rreziqe të pavarura. Një rënie e sektorit i godet të treja njëkohësisht.',
      },
    },
    upNextSlugs: ['why-diversification-works', 'building-a-simple-portfolio'],
  },

  {
    id: 'behaviour-costs-more-than-fees',
    slug: 'behaviour-costs-more-than-fees',
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Sjellja kushton më shumë se tarifat' },
    summary: {
      sq: 'Diferenca mes kthimit të një fondi dhe kthimit të investitorëve të tij është një numër i matshëm, dhe është i madh.',
    },
    inOneSentence: {
      sq: 'Shumica e njerëzve fitojnë më pak se fondet që zotërojnë, sepse blejnë pas rritjes dhe shesin pas rënies.',
    },
    body: {
      sq: [
        {
          heading: 'Boshllëku i sjelljes',
          paragraphs: [
            'Një fond mund të raportojë 8% mesatare vjetore ndërsa investitori mesatar në atë fond ka fituar dukshëm më pak. Diferenca nuk vjen nga tarifat — ato janë tashmë të zbritura.',
            'Ajo vjen nga koha e hyrjes dhe daljes. Paratë hyjnë pas viteve të mira dhe dalin pas viteve të këqija, kështu që shumica e kapitalit është e pranishme për rëniet dhe mungon për rikuperimet.',
            'Ky boshllëk është matur vazhdimisht dhe zakonisht është më i madh se e gjithë tarifa vjetore e një fondi indeksor.',
          ],
        },
        {
          heading: 'Pse ndodh',
          paragraphs: [
            'Humbja dhemb rreth dyfishin e kënaqësisë që jep një fitim i njëjtë. Kjo asimetri e bën shitjen gjatë një rënieje të ndihet si lehtësim, jo si gabim.',
            'Shtoni pastaj tendencën për të parë modele në zhurmë, dhe besimin që rritet pikërisht kur çmimet janë të larta.',
            'Asnjë prej këtyre nuk zhduket duke ditur për to. Ato menaxhohen me strukturë: rregulla të vendosura paraprakisht, kur jeni i qetë.',
          ],
        },
        {
          heading: 'Çfarë ndihmon vërtet',
          paragraphs: [
            'Kontributet automatike heqin vendimin mujor. Ribalancimi një herë në vit ju detyron të shisni atë që u rrit dhe të blini atë që ra, pa e menduar.',
            'Shikimi më rrallë ndihmon në mënyrë të matshme. Sa më shpesh e kontrolloni portofolin, aq më shumë rënie shihni dhe aq më e madhe është tundimi për të vepruar.',
            'Dhe një deklaratë e shkruar e planit — sa rrezik, pse, dhe çfarë do të bëni në një rënie 30% — vlen më shumë se çdo parashikim tregu.',
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
            'Diferenca mes kthimit të një fondi dhe kthimit që fituan në fakt investitorët e tij.',
        },
        {
          slug: 'loss-aversion',
          term: 'Neveri ndaj humbjes',
          definition:
            'Tendenca për ta ndier humbjen rreth dyfish më fort se një fitim të njëjtë.',
        },
        {
          slug: 'recency-bias',
          term: 'Anshmëri e së fundit',
          definition:
            'Prirja për të supozuar se ajo që ndodhi së fundmi do të vazhdojë.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Pse investitori mesatar fiton më pak se fondi që zotëron?',
        options: [
          'Sepse tarifat zbriten dy herë',
          'Sepse blen pas rritjeve dhe shet pas rënieve',
          'Sepse fondet raportojnë numra të pasaktë',
        ],
        answer: 1,
        explanation:
          'Kthimi i fondit supozon mbajtje të vazhdueshme. Koha e hyrjes dhe daljes e shkurton atë kthim për personin.',
      },
    },
    upNextSlugs: ['when-to-sell', 'time-in-the-market'],
  },

  {
    id: 'how-scams-work',
    slug: 'how-scams-work',
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Si funksionojnë mashtrimet financiare' },
    summary: {
      sq: 'Struktura është gjithmonë e njëjtë, edhe kur teknologjia ndryshon.',
    },
    inOneSentence: {
      sq: 'Çdo mashtrim premton kthim të lartë pa rrezik, krijon urgjencë, dhe e bën tërheqjen e parave më të vështirë se depozitimin.',
    },
    body: {
      sq: [
        {
          heading: 'Shenjat që përsëriten',
          paragraphs: [
            'Kthim i lartë dhe i qëndrueshëm, pa muaj të këqij. Tregjet e vërteta lëvizin; një vijë e drejtë lart është shenjë se numrat janë të shpikur, jo se strategjia është gjeniale.',
            'Presion kohor: «oferta mbyllet sot», «vetëm dhjetë vende». Urgjenca ekziston për të parandaluar verifikimin.',
            'Vështirësi në tërheqje. Depozitimi është gjithmonë i menjëhershëm; tërheqja kërkon «taksa», «verifikim» ose thjesht heshtje.',
          ],
        },
        {
          heading: 'Skema piramidale dhe Ponzi',
          paragraphs: [
            'Në një skemë Ponzi nuk ka investim fare. Paratë e investitorëve të rinj u paguhen atyre të vjetërve si «fitim», derisa fluksi i ri ndalon.',
            'Në një skemë piramidale, të ardhurat vijnë nga rekrutimi i njerëzve të tjerë, jo nga shitja e ndonjë produkti të vërtetë.',
            'Të dyja funksionojnë ndërsa po rriten dhe kolapsojnë menjëherë kur ndalen. Prandaj presioni për të sjellë miq e familjarë është pjesë e mekanizmit, jo entuziazëm.',
          ],
        },
        {
          heading: 'Mbrojtja praktike',
          paragraphs: [
            'Kontrolloni licencën te rregullatori i vendit, jo te faqja e vetë firmës. Mashtruesit kopjojnë emra dhe numra licence të firmave reale.',
            'Kërkoni gjithmonë të kuptoni se nga vjen kthimi. Nëse përgjigjja është «algoritëm i pronarit» ose «tregti me frekuencë të lartë» pa detaje, kjo është përgjigjja e vetme që do të merrni.',
            'Dhe mbani rregullin që shpëton më shumë njerëz se çdo tjetër: askush nuk ju kontakton papritur me një mundësi të mirë investimi.',
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
            'Mashtrim ku «fitimet» e investitorëve të vjetër paguhen nga paratë e të rinjve.',
        },
        {
          slug: 'pump-and-dump',
          term: 'Fryrje dhe shkarkim',
          definition:
            'Ngritja artificiale e çmimit të një aktivi për t’ua shitur atyre që vijnë pas.',
        },
        {
          slug: 'regulator',
          term: 'Rregullator',
          definition:
            'Autoriteti që licencon dhe mbikëqyr firmat financiare në një vend.',
          aliases: ['rregullatori'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një platformë tregon kthime mujore pozitive për tre vjet rresht, pa asnjë muaj negativ. Çfarë sugjeron kjo?',
        options: [
          'Një strategji jashtëzakonisht e mirë',
          'Se numrat ka gjasa të jenë të shpikur',
          'Se tregu ka qenë i qetë',
        ],
        answer: 1,
        explanation:
          'Tregjet e vërteta luhaten. Mungesa e plotë e muajve të këqij është shenja klasike e rezultateve të fabrikuara.',
      },
    },
    upNextSlugs: ['reading-a-fund-factsheet', 'what-risk-actually-means'],
  },

  {
    id: 'reading-a-fund-factsheet',
    slug: 'reading-a-fund-factsheet',
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: { sq: 'Si të lexoni fletën informative të një fondi' },
    summary: {
      sq: 'Dy faqe që përmbajnë gjithçka ju duhet, nëse dini cilat pesë rreshta të lexoni.',
    },
    inOneSentence: {
      sq: 'Fleta informative ju thotë çfarë mban fondi, sa kushton, sa mirë e ndjek indeksin e vet dhe sa keq ka shkuar në të kaluarën.',
    },
    body: {
      sq: [
        {
          heading: 'Pesë rreshtat që kanë rëndësi',
          paragraphs: [
            'Indeksi që ndjek: ky përcakton gjithçka. «MSCI World» dhe «MSCI World SRI» tingëllojnë njësoj dhe mbajnë gjëra shumë të ndryshme.',
            'Tarifa vjetore totale, jo vetëm ajo e menaxhimit. Dhe madhësia e fondit — një fond shumë i vogël rrezikon të mbyllet dhe t’ju detyrojë të realizoni një shitje.',
            'Zotërimet kryesore dhe pesha e tyre. Nëse dhjetë emrat e parë përbëjnë gjysmën e fondit, ju nuk keni blerë atë që sugjeron numri i kompanive.',
          ],
        },
        {
          heading: 'Ndjekja dhe replikimi',
          paragraphs: [
            'Gabimi i ndjekjes tregon sa larg ka mbetur fondi nga indeksi i tij. Një fond i lirë me ndjekje të dobët mund të kushtojë më shumë se një pak më i shtrenjtë me ndjekje të saktë.',
            'Metoda e replikimit ka rëndësi gjithashtu. Replikimi fizik do të thotë se fondi zotëron vërtet aksionet. Replikimi sintetik do të thotë se ai mban një kontratë me një bankë që premton kthimin e indeksit.',
            'Sintetiku është zakonisht më i lirë dhe shton një rrezik të ri: nëse banka dështon, premtimi bie me të. Kjo është një zgjedhje, jo një gabim — por duhet të jetë e vetëdijshme.',
          ],
        },
        {
          heading: 'Numrat e performancës',
          paragraphs: [
            'Performanca e kaluar tregohet gjithmonë dhe parashikon shumë pak. Ajo që është e dobishme nuk është mesatarja, por viti më i keq dhe rënia maksimale.',
            'Ata dy numra ju thonë se çfarë duhet të jeni në gjendje të duroni. Nëse rënia maksimale historike është 45% dhe ju e dini se do të shisnit në 25%, ky fond nuk është për ju pavarësisht kthimit mesatar.',
            'Kontrolloni edhe në cilën monedhë raportohet performanca. Të njëjtat numra në një monedhë tjetër tregojnë një histori të ndryshme.',
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
            value: 'Çfarë mbaj në fakt?',
            cost: 'Emër i ngjashëm, përmbajtje tjetër',
          },
          {
            label: 'Tarifa totale',
            value: 'Sa më kushton?',
            cost: 'Vetëm tarifa e menaxhimit e shfaqur',
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
            'Dokumenti dyfaqësh që përmbledh strategjinë, kostot dhe performancën e një fondi.',
          aliases: ['fleta informative', 'KID'],
        },
        {
          slug: 'physical-replication',
          term: 'Replikim fizik',
          definition: 'Kur fondi zotëron vërtet letrat me vlerë të indeksit.',
        },
        {
          slug: 'synthetic-replication',
          term: 'Replikim sintetik',
          definition:
            'Kur fondi mban një kontratë me një bankë që premton kthimin e indeksit.',
        },
        {
          slug: 'counterparty-risk',
          term: 'Rrezik i palës tjetër',
          definition:
            'Rreziku që pala që ju ka premtuar diçka të mos jetë në gjendje ta përmbushë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Dy fonde ndjekin të njëjtin indeks. Njëri ka tarifë 0,05% dhe gabim ndjekjeje 0,40%; tjetri 0,15% dhe 0,03%. Cili ka gjasa t’ju kushtojë më pak?',
        options: [
          'Gjithmonë i pari, sepse tarifa është më e ulët',
          'I dyti, sepse ndjekja e dobët kushton më shumë se diferenca e tarifës',
          'Nuk ka rëndësi, të dy ndjekin të njëjtin indeks',
        ],
        answer: 1,
        explanation:
          'Kostoja reale është tarifa plus devijimi nga indeksi. Një ndjekje e dobët mund ta tejkalojë lehtë një tarifë të ulët.',
      },
    },
    upNextSlugs: ['what-is-a-fund', 'building-a-simple-portfolio'],
  },

  {
    id: 'when-to-sell',
    slug: 'when-to-sell',
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Kur duhet shitur' },
    summary: {
      sq: 'Tri arsye të mira dhe disa të këqija, dhe pse vendimi duhet marrë përpara se çmimi të lëvizë.',
    },
    inOneSentence: {
      sq: 'Shitni kur ndryshon arsyeja pse blini, kur ju duhen paratë, ose kur pesha është rritur shumë — jo sepse çmimi ka rënë.',
    },
    body: {
      sq: [
        {
          heading: 'Tri arsye të mira',
          paragraphs: [
            'E para: teza juaj u prish. Blini një kompani sepse prisnit diçka; ajo gjë nuk po ndodh dhe nuk do të ndodhë. Çmimi është i parëndësishëm në këtë gjykim.',
            'E dyta: ju duhen paratë. Ky është qëllimi i të investuarit. Shitja për të blerë një shtëpi ose për të financuar studimet nuk është dështim, është plotësimi i planit.',
            'E treta: pesha ka dalë jashtë kontrollit. Nëse një pozicion është rritur nga 5% në 30% të portofolit, ju keni tani një përqendrim që nuk e zgjodhët.',
          ],
        },
        {
          heading: 'Arsyet e këqija që tingëllojnë të mira',
          paragraphs: [
            '«Është rritur shumë, po marr fitimin.» Çmimi që keni paguar është i parëndësishëm për vlerën e sotme. Tregu nuk e di se sa paguat dhe nuk i intereson.',
            '«Është ulur shumë, po pres të rikuperohet për të shitur.» Kjo e lidh vendimin me një numër arbitrar — çmimin tuaj të blerjes — në vend të vlerës aktuale.',
            '«Të gjithë po shesin.» Kjo është arsyeja që prodhon shitjen në fund të një rënieje, ku dëmi është maksimal.',
          ],
        },
        {
          heading: 'Vendoseni paraprakisht',
          paragraphs: [
            'Rregullat e shkruara përpara se të keni një pozicion janë shumë më të mira se gjykimi në momentin e stresit.',
            'Një rregull i thjeshtë ribalancimi — kthe në peshat e synuara një herë në vit, ose kur diçka devijon më shumë se dhjetë pikë përqindjeje — merr shumicën e këtyre vendimeve për ju.',
            'Kjo është arsyeja e vërtetë pse ribalancimi funksionon: jo sepse koha e tij është e mirë, por sepse ai heq nga duart tuaja vendimin që keni më shumë gjasa ta merrni gabim.',
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
            'Para të shpenzuara tashmë që nuk duhet të ndikojnë asnjë vendim të ardhshëm.',
        },
        {
          slug: 'anchoring',
          term: 'Ankorim',
          definition:
            'Lidhja e një vendimi me një numër arbitrar, zakonisht çmimin që paguat.',
        },
        {
          slug: 'investment-thesis',
          term: 'Tezë investimi',
          definition:
            'Arsyeja e shkruar pse blini diçka, dhe pra prova e vetme se kur duhet shitur.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një aksion ka rënë 30% dhe vendosni të prisni «derisa të kthehet te çmimi im» për të shitur. Cili është gabimi?',
        options: [
          'Duhet shitur menjëherë çdo gjë që bie',
          'Çmimi juaj i blerjes është arbitrar dhe nuk thotë asgjë për vlerën e sotme',
          'Duhet blerë më shumë gjithmonë',
        ],
        answer: 1,
        explanation:
          'Tregu nuk e di sa paguat. Vendimi duhet të varet nga vlera dhe teza sot, jo nga një numër i së kaluarës suaj.',
      },
    },
    upNextSlugs: [
      'building-a-simple-portfolio',
      'behaviour-costs-more-than-fees',
    ],
  },

  {
    id: 'building-a-simple-portfolio',
    slug: 'building-a-simple-portfolio',
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Të ndërtosh një portofol të thjeshtë' },
    summary: {
      sq: 'Vendimi që shpjegon shumicën e rezultatit tuaj nuk është cilat aksione, por sa nga secili lloj.',
    },
    inOneSentence: {
      sq: 'Zgjidhni ndarjen mes aksioneve dhe obligacioneve sipas afatit tuaj, mbajeni të gjerë dhe të lirë, dhe ribalancojeni një herë në vit.',
    },
    body: {
      sq: [
        {
          heading: 'Vendimi i parë dhe më i rëndësishmi',
          paragraphs: [
            'Studimet e ndryshme japin shifra të ndryshme, por të gjitha bien dakord për drejtimin: pjesa dërrmuese e luhatjes së një portofoli shpjegohet nga ndarja mes llojeve të aktiveve, jo nga zgjedhja brenda tyre.',
            'Me fjalë të tjera, «sa përqind në aksione» ka shumë më tepër rëndësi se «cilat aksione».',
            'Ky është një lajm i mirë: vendimi më i rëndësishëm është edhe më i thjeshti, dhe nuk kërkon asnjë parashikim.',
          ],
        },
        {
          heading: 'Një strukturë që mjafton',
          paragraphs: [
            'Një fond i gjerë global aksionesh mbulon mijëra kompani në dhjetëra vende. Një fond obligacionesh me cilësi të lartë mbulon pjesën e qëndrueshme.',
            'Dy fonde janë të mjaftueshme për shumicën e njerëzve. Shtimi i një të treti ose të katërti duhet të përgjigjet një pyetjeje konkrete, jo dëshirës për të pasur më shumë.',
            'Përmasat varen nga afati: sa më larg data kur ju duhen paratë, aq më e madhe mund të jetë pjesa e aksioneve.',
          ],
        },
        {
          heading: 'Mirëmbajtja',
          paragraphs: [
            'Kontribuoni rregullisht dhe automatikisht. Ribalanconi një herë në vit. Shikojeni rrallë. Kjo është e gjitha.',
            'Rezistoni tundimit për ta bërë më të sofistikuar. Çdo shtresë shtesë sjell kosto, ndërlikim dhe një vendim më shumë për të gabuar.',
            'Portofoli më i mirë nuk është ai me kthimin më të lartë të pritur. Është ai që do ta mbani vërtet përgjatë dhjetë vjetësh, duke përfshirë vitet e këqija.',
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
          body: 'Afat njëzetvjeçar, tolerancë e mirë: 80% aksione globale, 20% obligacione.',
        },
        {
          title: 'Kontribuoni automatikisht',
          body: 'E njëjta shumë çdo muaj, e ndarë në të njëjtat përmasa. Asnjë vendim mujor.',
        },
        {
          title: 'Ribalanconi një herë në vit',
          body: 'Nëse aksionet janë rritur në 88%, shitni pak dhe blini obligacione derisa të ktheheni në 80/20.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'asset-allocation',
          term: 'Shpërndarje aktivesh',
          definition:
            'Ndarja e portofolit mes llojeve të investimeve. Vendimi që shpjegon shumicën e rezultatit.',
          aliases: ['shpërndarja e aktiveve'],
        },
        {
          slug: 'target-weight',
          term: 'Peshë e synuar',
          definition:
            'Përqindja që ju keni vendosur për secilin komponent, dhe te e cila ktheheni kur ribalanconi.',
        },
        {
          slug: 'core-satellite',
          term: 'Bërthamë dhe satelitë',
          definition:
            'Një bazë e gjerë dhe e lirë, plus pozicione të vogla për gjithçka tjetër.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Cili vendim shpjegon pjesën më të madhe të luhatjes së një portofoli?',
        options: [
          'Cilat aksione individuale zgjidhni',
          'Sa përqind mbani në aksione kundrejt obligacioneve',
          'Në cilën ditë të muajit blini',
        ],
        answer: 1,
        explanation:
          'Ndarja mes llojeve të aktiveve dominon rezultatin. Zgjedhja brenda secilit lloj ka shumë më pak peshë.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: ['when-to-sell', 'your-first-hundred-euros'],
  },
];
