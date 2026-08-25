import type { SeedLesson, SeedTopic } from './types';

/**
 * The basics — what the things are before what to do about them.
 *
 * Read in order. Each lesson assumes the one before it and nothing else, so a
 * reader who starts at the top and works down never meets a word that has not
 * already been defined.
 */
export const BASICS_TOPIC: SeedTopic = {
  id: 'basics',
  title: { sq: 'Bazat' },
  slugs: [
    'what-is-a-share-really',
    'how-does-the-stock-market-work',
    'what-is-an-etf',
    'risk-and-return',
    'why-diversification-works',
    'what-is-compounding',
    'saving-vs-investing',
    'how-a-brokerage-account-works',
    'fees-that-change-everything',
    'what-is-a-fund',
    'time-in-the-market',
    'your-first-hundred-euros',
  ],
};

export const BASICS_LESSONS: SeedLesson[] = [
  {
    id: 'what-is-a-share-really',
    slug: 'what-is-a-share-really',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çfarë është në të vërtetë një aksion?',
    },
    summary: {
      sq: 'Jo një biletë llotarie, por një pjesë e vogël pronësie në një biznes të vërtetë.',
    },
    inOneSentence: {
      sq: 'Një aksion është një pjesë e vogël e pronësisë së një kompanie, dhe vlera e tij varet nga sa para pritet të fitojë ajo kompani.',
    },
    body: {
      sq: [
        {
          heading: 'Pronësi, jo bast',
          paragraphs: [
            'Kur e blini një aksion, nuk po vëni bast se numri do të rritet. Po blini një copë të vogël të një biznesi: fabrikat e tij, markat e tij, kontratat e tij dhe të drejtën tuaj mbi një pjesë të fitimeve të ardhshme. Nëse një kompani ka njëqind milionë aksione dhe ju i keni njëqind, juve ju takon një e milionta e saj.',
            'Kjo copë është e vogël, por është e vërtetë. Keni të drejtë të votoni në mbledhjen vjetore. Nëse kompania paguan dividendë, e merrni pjesën tuaj. Nëse ajo shitet, e merrni pjesën tuaj të çmimit. Atë copë nuk mund t’jua marrë askush — vetëm ju, kur e shitni.',
            'Kjo është arsyeja pse pyetja e parë për çdo aksion nuk është “a do të rritet?” por “a është ky një biznes i mirë?”. E dyta vjen vetvetiu nga e para me kalimin e kohës. E para pa të dytën është thjesht bast.',
          ],
        },
        {
          heading: 'Nga vjen çmimi',
          paragraphs: [
            'Çmimin e një aksioni nuk e cakton kompania. E caktojnë njerëzit që e blejnë dhe e shesin atë aksion sot, dhe ata blejnë e shesin sipas asaj që mendojnë se kompania do të fitojë nesër.',
            'Prandaj një kompani mund të shpallë fitime rekord dhe aksioni i saj të bjerë. Nëse tregu i priste fitimet edhe më të mëdha, lajmi i mirë ishte tashmë brenda çmimit, dhe realiteti doli më i vogël se pritja. Çmimi lëviz me diferencën mes asaj që ndodhi dhe asaj që pritej të ndodhte.',
            'Kjo është pjesa më kundërintuitive e tregjeve dhe ia vlen ta mbani mend: çmimet nuk reagojnë ndaj lajmeve, ato reagojnë ndaj surprizave.',
          ],
        },
        {
          heading: 'Pse ekziston fare',
          paragraphs: [
            'Kompanitë shesin aksione sepse u duhen para tani. Një kompani që do të ndërtojë një fabrikë mund të marrë hua në bankë, ose mund t’u shesë njerëzve pjesë të vetvetes. Huaja kthehet me interes. Aksionet nuk kthehen kurrë.',
            'Në këmbim, aksionerët i japin një pjesë të pronësisë dhe të fitimeve të ardhshme. Është një shkëmbim: kompania merr kapital pa borxh, investitori merr një pjesë të asaj që ndërton ai kapital.',
            'Kur e shihni në këtë mënyrë, tregu i aksioneve nuk është një kazino e ndërtuar mbi ekonominë. Është mekanizmi përmes të cilit kursimet e njerëzve arrijnë te bizneset që kanë nevojë për to.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'share',
          term: 'Aksion',
          definition:
            'Një njësi pronësie në një kompani, që ju jep të drejtë mbi një pjesë të fitimeve të saj.',
          aliases: ['aksione', 'aksioni'],
        },
        {
          slug: 'shareholder',
          term: 'Aksioner',
          definition: 'Kushdo që zotëron të paktën një aksion të një kompanie.',
          aliases: ['aksionerë'],
        },
        {
          slug: 'market-capitalisation',
          term: 'Kapitalizim tregu',
          definition:
            'Çmimi i një aksioni shumëzuar me numrin e aksioneve — vlera e plotë e kompanisë sipas tregut.',
          aliases: ['kapitalizimi i tregut'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani shpall fitimet më të larta në historinë e saj dhe aksioni bie 5%. Cili është shpjegimi më i mundshëm?',
        options: [
          'Tregu gaboi dhe do të korrigjohet nesër',
          'Investitorët prisnin fitime edhe më të larta',
          'Fitimet e larta janë gjithmonë lajm i keq për aksionerët',
        ],
        answer: 1,
        explanation:
          'Çmimet lëvizin me surprizat, jo me lajmet. Nëse pritej më shumë, rezultati i mirë ishte tashmë në çmim.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['how-does-the-stock-market-work', 'what-is-an-etf'],
  },

  {
    id: 'how-does-the-stock-market-work',
    slug: 'how-does-the-stock-market-work',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Si funksionon tregu i aksioneve?',
    },
    summary: {
      sq: 'Kush është në anën tjetër të blerjes suaj, dhe si vendoset në të vërtetë një çmim.',
    },
    inOneSentence: {
      sq: 'Një treg aksionesh është një listë e vazhdueshme ofertash për të blerë dhe për të shitur, dhe çmimi është thjesht vendi ku të dyja u takuan për herë të fundit.',
    },
    body: {
      sq: [
        {
          heading: 'Dy lista, jo një çmim',
          paragraphs: [
            'Merrni me mend një treg ku njëra anë shkruan “do të paguaj deri në 100 € për një aksion” dhe tjetra shkruan “do të shes për jo më pak se 101 €”. Askush nuk lëviz. Nuk ka shitblerje dhe nuk ka çmim të ri.',
            'Pastaj dikush pranon të paguajë 101 €. Ajo shitblerje ndodh dhe 101 € bëhet “çmimi i fundit” që e shihni në ekran. Çmimi nuk është ndonjë vlerësim zyrtar. Është thjesht shuma për të cilën u pajtuan dy palë, sekondën e fundit që u pajtua dikush.',
            'Ky është ndryshimi mes çmimit të kërkuar, çmimit të ofruar dhe çmimit të fundit. Kur lexoni “S&P 500 është në 6.400”, po lexoni një përmbledhje të shitblerjeve të fundit, jo një gjykim se sa vlejnë ato kompani.',
          ],
        },
        {
          heading: 'Kush është në anën tjetër',
          paragraphs: [
            'Kur ju blini, dikush po shet. Shpesh nuk është ndonjë person që mendon se ju e keni gabim — është një fond pensional që ribalancon, dikush që po financon një shtëpi, ose një “market maker” që fiton nga diferenca mes blerjes dhe shitjes.',
            'Këta market makers janë arsyeja pse mund të blini në çast. Ata i mbajnë gjithmonë të hapura një ofertë blerjeje dhe një ofertë shitjeje, dhe fitojnë ndonjë cent nga diferenca. Në këmbim, ju nuk keni nevojë të prisni derisa të dalë një blerës i vërtetë.',
            'Kjo diferencë quhet spread. Te një aksion i madh, që blihet e shitet shumë, ajo është fare e vogël. Te një aksion i vogël dhe i harruar, mund të jetë disa përqind — një kosto e fshehtë që e paguani sa herë që hyni ose dilni.',
          ],
        },
        {
          heading: 'Pse orët e tregut ekzistojnë',
          paragraphs: [
            'Bursat kanë orar pune sepse likuiditeti fiton nga përqendrimi. Nëse të gjithë blejnë e shesin në të njëjtat orë, ka gjithmonë dikë në anën tjetër, dhe spread-i mbetet i ngushtë.',
            'Kur tregu është i mbyllur, lajmet nuk ndalen. Prandaj një aksion mund të hapet dukshëm më lart ose më poshtë se ku e mbylli ditën — të gjitha lajmet e natës ngjeshen në çmimin e parë të mëngjesit.',
            'Kjo është arsyeja pse profesionistët flasin për “hapjen” dhe “mbylljen” si momente të veçanta. Ato janë dy çastet e ditës ku pjesa më e madhe e vëmendjes dhe e volumit takohen përnjëherë.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'bid-ask-spread',
          term: 'Spread',
          definition:
            'Diferenca mes çmimit më të lartë që dikush do të paguajë dhe më të ulëtit që dikush do të pranojë.',
          aliases: ['spread-i'],
        },
        {
          slug: 'liquidity',
          term: 'Likuiditet',
          definition:
            'Sa lehtë mund të blini ose të shitni pa e lëvizur vetë çmimin.',
          aliases: ['likuid', 'likuiditeti'],
        },
        {
          slug: 'market-maker',
          term: 'Market maker',
          definition:
            'Një firmë që i mban gjithmonë të hapura një ofertë blerjeje dhe një shitjeje, që ju të mund të blini a të shitni në çast.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse një aksion i vogël dhe pak i tregtuar ju kushton më shumë për të blerë e shitur se një aksion i madh?',
        options: [
          'Sepse komisionet e brokerit janë më të larta për aksione të vogla',
          'Sepse spread-i mes blerjes dhe shitjes është më i gjerë',
          'Sepse taksat mbi aksionet e vogla janë më të larta',
        ],
        answer: 1,
        explanation:
          'Me pak blerës e shitës, diferenca mes ofertave zgjerohet — dhe atë diferencë e paguani ju sa herë që hyni ose dilni.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['what-is-an-etf', 'what-moves-a-share-price'],
  },

  {
    id: 'what-is-an-etf',
    slug: 'what-is-an-etf',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Çfarë është një ETF?',
    },
    summary: {
      sq: 'Një fond që mban shumë kompani njëherësh, i blerë dhe i shitur si një aksion i vetëm.',
    },
    inOneSentence: {
      sq: 'Një ETF është një shportë investimesh që e blini me një klikim, dhe çmimi i tij lëviz me vlerën e gjithçkaje brenda saj.',
    },
    body: {
      sq: [
        {
          heading: 'Si funksionon një ETF',
          paragraphs: [
            'Një menaxher fondi blen një grup asetesh — të themi, aksione në 500 kompanitë më të mëdha amerikane — dhe pastaj e ndan pronësinë e atij grumbulli në njësi të vogla. Çdo njësi është një aksion i ETF-së dhe blihet e shitet në bursë si çdo aksion tjetër.',
            'Kur e blini një njësi, keni nga një copëz të të 500 kompanive. Nuk ju është dashur të zgjidhni mes tyre, as t’i bëni 500 blerje veç e veç.',
            'Kjo është e gjithë poenta. Puna e rëndë — të blesh, të mbash dhe të ribalancosh qindra pozicione — e bën një herë fondi, kurse ju paguani një tarifë të vogël vjetore që të mos e bëni ju.',
          ],
        },
        {
          heading: 'Ku mund të shkojë keq',
          paragraphs: [
            'Diversifikimi e ul rrezikun që një kompani e vetme t’ju fundosë. Nuk ju mbron nga rënia e një tregu të tërë — në një shitje masive, thuajse gjithçka në shportë bie bashkë.',
            'Po ashtu, ETF-të e ngushta e prishin tërë qëllimin. Një fond që mban vetëm një industri mund të jetë thuajse po aq i përqendruar sa zgjedhja e aksioneve një nga një. “ETF” nuk do të thotë vetvetiu “i diversifikuar”.',
            'Edhe emri mund t’ju mashtrojë. Një ETF i “teknologjisë globale” mund t’i ketë gjysmën e parave në pesë kompani amerikane. Çfarë keni blerë ju thotë lista e zotërimeve, jo emri.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Investoni 100 € në një ETF të S&P 500',
          body: 'Rreth 7 € prej tyre shkojnë te Apple, 6 € te NVIDIA, dhe shuma të vogla te 498 kompanitë e tjera.',
        },
        {
          title: 'Një kompani ka një vit të tmerrshëm',
          body: 'Nëse bie 50%, 100 € tuajat humbin rreth 1 €. Po t’i kishit vënë të gjitha në atë kompani të vetme, do të ishit 50 € poshtë.',
        },
        {
          title: 'Indeksi rritet 8% gjatë vitit',
          body: 'Zotërimi juaj vlen rreth 108 €, minus tarifën e vogël vjetore të fondit. Ajo tarifë është gjëja e dytë që duhet kontrolluar.',
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Kostot për të kontrolluar',
        columns: [
          'Lloji i fondit',
          'Tarifa tipike',
          'Kosto mbi 10.000 € / vit',
        ],
        rows: [
          {
            label: 'ETF i gjerë indeksor',
            value: '0.07%',
            cost: '7 €',
            tone: 'positive',
          },
          { label: 'ETF sektorial ose tematik', value: '0.45%', cost: '45 €' },
          {
            label: 'Fond i menaxhuar aktivisht',
            value: '1.20%',
            cost: '120 €',
            tone: 'negative',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'index',
          term: 'Indeks',
          definition:
            'Një listë e publikuar kompanish e përdorur për të matur një treg, si S&P 500.',
          aliases: ['indeksi', 'indekset'],
        },
        {
          slug: 'expense-ratio',
          term: 'Raport shpenzimesh',
          definition:
            'Tarifa vjetore e fondit, e marrë automatikisht nga ajo që mbani.',
          aliases: ['tarifa vjetore'],
        },
        {
          slug: 'diversification',
          term: 'Diversifikim',
          definition:
            'Shpërndarja e parave nëpër shumë asete, që asnjë e vetme të mos e vendosë fatin tuaj.',
          aliases: ['diversifikimi', 'i diversifikuar'],
        },
        {
          slug: 'accumulating-fund',
          term: 'Fond akumulues',
          definition:
            'Një fond që ua riinveston dividendët në vend që t’jua paguajë në para.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Zotëroni një ETF të gjerë indeksor dhe një kompani brenda tij bie 40%. Përafërsisht çfarë i ndodh zotërimit tuaj?',
        options: [
          'Bie edhe ai rreth 40%',
          'Bie shumë më pak se 1%',
          'Nuk ndryshon fare',
        ],
        answer: 1,
        explanation:
          'Në një indeks me qindra kompani, secila zë një pjesë të vogël — një rënie prej 40% te njëra e lëviz të tërën vetëm për disa të dhjeta të përqindjes.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['what-is-a-fund', 'fees-that-change-everything'],
  },

  {
    id: 'risk-and-return',
    slug: 'risk-and-return',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Rreziku dhe kthimi, me shembuj të përditshëm',
    },
    summary: {
      sq: 'Pse asgjë nuk paguan shumë pa kërkuar diçka në këmbim, dhe si ta matni atë diçka.',
    },
    inOneSentence: {
      sq: 'Kthimi më i lartë është çmimi që tregu ju paguan për të duruar një rezultat më të pasigurt.',
    },
    body: {
      sq: [
        {
          heading: 'Rreziku nuk do të thotë humbje',
          paragraphs: [
            'Në gjuhën e përditshme “rrezik” do të thotë “shans që diçka të shkojë keq”. Në investime ka një kuptim më të ngushtë: sa gjerë mund të dalë rezultati nga ajo që prisni, në të dy drejtimet.',
            'Një llogari kursimi që paguan 2% ka rrezik thuajse zero: e dini çka do të merrni. Një aksion i vetëm mund të bëjë +60% ose −40% brenda një viti. E njëjta shumë e investuar, dy botë krejt të ndryshme mundësish.',
            'Kjo është arsyeja pse pyetja “sa rrezik duhet të marr?” nuk ka një përgjigje universale. Varet nga sa gjerë mund ta lini rezultatin të luajë para se t’ju prishë planet.',
          ],
        },
        {
          heading: 'Afati ndryshon gjithçka',
          paragraphs: [
            'Paratë që ju duhen vitin tjetër dhe paratë që ju duhen pas njëzet vjetësh nuk janë e njëjta gjë, edhe nëse janë në të njëjtën llogari.',
            'Për paratë e vitit të ardhshëm, luhatja është problem i vërtetë: nëse tregu bie 30% pikërisht kur ju duhen, atë humbje e bëni të vërtetë. Nuk keni kohë të prisni.',
            'Për paratë e njëzet viteve, e njëjta luhatje është kryesisht zhurmë. Historikisht, sa më e gjatë periudha e mbajtjes, aq më e ngushtë bëhet gama e rezultateve — jo se rreziku zhduket, por se vitet e mira dhe të këqija kanë kohë të dalin mesatare.',
          ],
        },
        {
          heading: 'Rreziku që nuk paguhet',
          paragraphs: [
            'Ka një rregull të rëndësishëm: tregu ju shpërblen për rreziqet që nuk mund t’i shmangni, jo për ato që mundeni.',
            'Nëse mbani një aksion të vetëm dhe ai falimenton, i humbni të gjitha. Por tregu nuk ju paguan shtesë që ta merrni atë rrezik, sepse mund ta kishit hequr falas duke i mbajtur njëqind kompani në vend të njërës.',
            'Prandaj diversifikimi quhet nganjëherë “dreka e vetme falas” në financë. E heq një lloj rreziku pa ju kushtuar asgjë nga kthimi i pritshëm.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'E njëjta shumë, tre rrugë të ndryshme',
        columns: [
          'Ku i vendosni',
          'Kthim tipik vjetor',
          'Viti më i keq historik',
        ],
        rows: [
          {
            label: 'Llogari kursimi',
            value: '2%',
            cost: '0%',
            tone: 'positive',
          },
          { label: 'Indeks i gjerë aksionesh', value: '7%', cost: '−37%' },
          {
            label: 'Një aksion i vetëm',
            value: 'e paparashikueshme',
            cost: '−100%',
            tone: 'negative',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'volatility',
          term: 'Luhatshmëri',
          definition:
            'Sa shumë luan çmimi lart e poshtë. Luhatje e lartë do të thotë gamë më e gjerë rezultatesh.',
          aliases: ['volatilitet', 'luhatja'],
        },
        {
          slug: 'expected-return',
          term: 'Kthim i pritshëm',
          definition:
            'Rezultati mesatar që do të prisnit nëse e përsërisnit të njëjtin investim shumë herë.',
        },
        {
          slug: 'drawdown',
          term: 'Rënie maksimale',
          definition:
            'Sa poshtë nga maja e vet ka rënë një investim para se të rimëkëmbej.',
          aliases: ['drawdown'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse tregu nuk ju paguan kthim shtesë për të mbajtur vetëm një aksion në vend të njëqind?',
        options: [
          'Sepse aksionet e vetme kanë gjithmonë kthim më të ulët',
          'Sepse ai rrezik mund të hiqet falas me diversifikim',
          'Sepse rregullatorët e ndalojnë',
        ],
        answer: 1,
        explanation:
          'Shpërblehen vetëm rreziqet që nuk mund t’i shmangni. Rreziku i një kompanie të vetme hiqet duke mbajtur shumë sish, pa asnjë kosto.',
      },
    },
    upNextSlugs: ['why-diversification-works', 'time-in-the-market'],
  },
  {
    id: 'why-diversification-works',
    slug: 'why-diversification-works',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Pse funksionon diversifikimi',
    },
    summary: {
      sq: 'Shpërndarja e parave nuk ul kthimin e pritur, por ngushton gamën e rezultateve.',
    },
    inOneSentence: {
      sq: 'Duke mbajtur shumë gjëra që nuk lëvizin njësoj, ju hiqni rrezikun e një katastrofe të vetme pa hequr fitimin mesatar.',
    },
    body: {
      sq: [
        {
          heading: 'Dy rreziqe, jo një',
          paragraphs: [
            'Çdo aksion bart dy lloje rreziku. I pari i takon vetëm kompanisë: një tërheqje produkti nga tregu, një drejtues i dobët, një konkurrent që shpik diçka më të mirë. I dyti është i përbashkët për të gjitha: recesion, luftë, një ndryshim i madh i normave të interesit.',
            'Diversifikimi e heq të parin dhe nuk e prek të dytin. Nëse i mbani njëqind kompani, falimentimi i njërës ju kushton një përqind. Por nëse tërë tregu bie tridhjetë përqind, edhe ju bini tridhjetë përqind — brenda tregut të aksioneve nuk kishit ku të fshiheshit.',
            'Prandaj diversifikimi nuk është një mbrojtje nga humbja. Është një mbrojtje nga humbja për arsyen e gabuar.',
          ],
        },
        {
          heading: 'Pse nuk kushton asgjë',
          paragraphs: [
            'Kjo është pjesa që i habit njerëzit. Nëse i mbani njëqind kompani në vend të njërës, kthimi juaj i pritur nuk bie. E merrni mesataren e të njëqindave, dhe ajo mesatare është pikërisht kthimi që e jep tregu.',
            'Ajo që bie është shpërndarja rreth asaj mesatareje. Me një kompani të vetme, mund të fitoni katërfish ose t’i humbni të gjitha. Me njëqind, të dy skajet zhduken dhe ju mbeteni afër mesatares.',
            'Është një shkëmbim ku njëra anë është falas: e hiqni skajin e keq dhe atë të mirë, por qendra mbetet aty ku ishte. Prandaj nganjëherë quhet e vetmja drekë falas në financë.',
          ],
        },
        {
          heading: 'Kur pushon së funksionuari',
          paragraphs: [
            'Diversifikimi qëndron mbi një supozim: se gjërat që i mbani nuk bien të gjitha përnjëherë. Kur ai supozim thyhet, mbrojtja zhduket pikërisht atëherë kur ju duhet më së shumti.',
            'Në krizat e mëdha, korrelacionet shkojnë kah njëshi. Aksionet që zakonisht luanin veç e veç fillojnë të bien bashkë, sepse shkaku i rënies nuk ka të bëjë me asnjërën prej tyre — ka të bëjë me para që ikin nga rreziku në përgjithësi.',
            'Kjo nuk e bën diversifikimin të pavlefshëm. E bën mjet për rrezikun e përditshëm, jo çadër për stuhi.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Njëqind mijë euro në një kompani',
          body: 'Nëse ajo kompani falimenton, mbeteni me zero. S’ka rëndësi sa i mirë ishte arsyetimi juaj.',
        },
        {
          title: 'Njëqind mijë euro në njëqind kompani',
          body: 'I njëjti falimentim ju kushton një mijë euro. Duhet të falimentojnë të njëqinda që të mbeteni me zero.',
        },
        {
          title: 'Kthimi mesatar në të dyja rastet',
          body: 'I njëjti. Diversifikimi nuk ju kushtoi asgjë për ta hequr atë rrezik.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'correlation',
          term: 'Korrelacion',
          definition:
            'Sa shpesh dy investime luajnë në të njëjtin drejtim. Korrelacioni i ulët është ai që e bën diversifikimin të funksionojë.',
          aliases: ['korrelacioni', 'i korreluar'],
        },
        {
          slug: 'idiosyncratic-risk',
          term: 'Rrezik specifik',
          definition:
            'Rreziku që i takon vetëm një kompanie dhe që hiqet duke mbajtur shumë të tjera.',
        },
        {
          slug: 'systematic-risk',
          term: 'Rrezik sistemik',
          definition:
            'Rreziku që prek gjithçka njëherësh dhe që diversifikimi nuk e heq dot.',
          aliases: ['rreziku i tregut'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Gjatë një krize të rëndë, portofoli juaj i diversifikuar bie pothuajse aq sa një aksion i vetëm. Pse?',
        options: [
          'Diversifikimi ishte bërë gabim',
          'Korrelacionet rriten në kriza dhe gjithçka bie së bashku',
          'Diversifikimi funksionon vetëm mbi njëzet vjet',
        ],
        answer: 1,
        explanation:
          'Diversifikimi e heq rrezikun specifik të kompanive. Në krizë, shkaku i rënies është i përbashkët për të gjitha, dhe atë rrezik nuk e prek.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: ['what-is-a-fund', 'what-is-compounding'],
  },

  {
    id: 'what-is-compounding',
    slug: 'what-is-compounding',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Kompozimi: pse koha bën punën e rëndë',
    },
    summary: {
      sq: 'Fitimi mbi fitimin e mëparshëm është arsyeja pse njëzet vjet nuk janë dyfishi i dhjetë vjetëve.',
    },
    inOneSentence: {
      sq: 'Kompozimi do të thotë se fitimet tuaja fillojnë vetë të fitojnë, dhe efekti rritet gjithnjë e më shpejt sa më gjatë ta lini.',
    },
    body: {
      sq: [
        {
          heading: 'Aritmetika e thjeshtë pas saj',
          paragraphs: [
            'I vendosni 1.000 € me 7% në vit. Pas vitit të parë keni 1.070 €. Viti i dytë nuk fiton 7% mbi 1.000 €, por mbi 1.070 € — pra 74,90 € në vend të 70 €. Diferenca është vetëm pesë euro dhe duket pa peshë.',
            'Por ajo diferencë rritet vetvetiu. Pas dhjetë vjetësh keni rreth 1.967 €. Pas njëzet vjetësh keni rreth 3.870 €. Njëzet vjet nuk ju dhanë dyfishin e dhjetë vjetëve, ju dhanë thuajse katërfishin e fitimit.',
            'Kjo është e tërë ideja: fitimi nuk mblidhet, shumëzohet. Dhe shumëzimi bëhet i vrullshëm vetëm kah fundi.',
          ],
        },
        {
          heading: 'Pse fundi ka rëndësi më shumë se fillimi',
          paragraphs: [
            'Nëse investoni për tridhjetë vjet, më shumë se gjysma e parave në fund vjen nga dhjetë vitet e fundit. Jo se ato vite ishin më të mira, por se në ato vite shuma mbi të cilën fitohet ishte më e madhe.',
            'Kjo ka një pasojë praktike të pakëndshme: ndërprerja e investimit kah fundi kushton shumë më shtrenjtë sesa fillimi një vit më vonë. Njerëzit e ndiejnë të kundërtën.',
            'Ka edhe një pasojë të mirë: nuk ju duhen kthime spektakolare. Ju duhen kthime të zakonshme që nuk ndërpriten.',
          ],
        },
        {
          heading: 'Ana tjetër e medaljes',
          paragraphs: [
            'Kompozimi punon njësoj mirë edhe kundër jush. Një tarifë vjetore prej 1,5% nuk ju kushton 1,5% — ju kushton 1,5% të përsëritur çdo vit, mbi një shumë që do të ishte rritur.',
            'E njëjta vlen edhe për inflacionin. Nëse çmimet rriten 3% në vit, paratë nën dyshek e humbin gjysmën e fuqisë blerëse për njëzet e tre vjet, pa u lëvizur asnjë shifër në llogari.',
            'Prandaj tarifat dhe inflacioni e meritojnë vëmendjen që zakonisht i jepet zgjedhjes së aksioneve. Ato punojnë çdo vit, pa u vërejtur.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: '10.000 € me 7% në vit',
        columns: ['Pas sa vitesh', 'Vlera', 'Fituar gjatë asaj dekade'],
        rows: [
          { label: '10 vjet', value: '19.670 €', cost: '9.670 €' },
          { label: '20 vjet', value: '38.700 €', cost: '19.030 €' },
          {
            label: '30 vjet',
            value: '76.120 €',
            cost: '37.420 €',
            tone: 'positive',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'compounding',
          term: 'Kompozim',
          definition:
            'Fitimi i kthimeve edhe mbi kthimet e mëparshme, jo vetëm mbi shumën fillestare.',
          aliases: ['kompozimi', 'interes i përbërë'],
        },
        {
          slug: 'annualised-return',
          term: 'Kthim vjetor',
          definition:
            'Norma e njëtrajtshme vjetore që do të prodhonte të njëjtin rezultat përfundimtar.',
        },
        {
          slug: 'real-return',
          term: 'Kthim real',
          definition:
            'Kthimi juaj pasi hiqet inflacioni — sa më shumë mund të blini vërtet.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse një tarifë vjetore prej 1,5% ju kushton shumë më tepër se 1,5% të parave tuaja gjatë tridhjetë vjetësh?',
        options: [
          'Sepse tarifat rriten çdo vit',
          'Sepse hiqet çdo vit nga një shumë që do të ishte kompozuar',
          'Sepse tarifat taksohen dyfish',
        ],
        answer: 1,
        explanation:
          'Çdo euro e marrë si tarifë është një euro që nuk fiton më kurrë. Kompozimi punon kundër jush me të njëjtën forcë.',
      },
    },
    upNextSlugs: ['fees-that-change-everything', 'time-in-the-market'],
  },

  {
    id: 'saving-vs-investing',
    slug: 'saving-vs-investing',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Kursim apo investim?',
    },
    summary: {
      sq: 'Të dyja janë të nevojshme, por për punë të ndryshme dhe për afate të ndryshme.',
    },
    inOneSentence: {
      sq: 'Kursimi mbron paratë që ju duhen së shpejti; investimi rrit paratë që nuk ju duhen për vite me radhë.',
    },
    body: {
      sq: [
        {
          heading: 'Dy punë të ndryshme',
          paragraphs: [
            'Një llogari kursimi ka një detyrë: paratë të jenë aty kur t’i kërkoni, me të njëjtën shifër. Nuk e ka për detyrë t’ju pasurojë, dhe nuk do t’ju pasurojë.',
            'Një portofol investimesh e ka detyrën e kundërt: të rritet me kohën, me kusht që të mos e prekni në çastin e gabuar. Nuk premton se muajin tjetër do të jetë aty me të njëjtën shifër.',
            'Ngatërrimi fillon kur njerëzit kërkojnë që të njëjtat para t’i bëjnë të dyja punët. Nuk munden. Prandaj hapi i parë nuk është zgjedhja e investimeve, por ndarja e parave sipas kohës kur ju duhen.',
          ],
        },
        {
          heading: 'Fondi i emergjencës vjen i pari',
          paragraphs: [
            'Para çdo investimi vjen një shumë parash që mund t’i prekni në çast pa shitur asgjë. Rregulli i zakonshëm është tre deri në gjashtë muaj shpenzime, por shifra e saktë ka më pak rëndësi se vetë ekzistenca e saj.',
            'Arsyeja nuk është psikologjike, është matematikore. Pa atë rezervë, çdo problem i papritur ju detyron t’i shitni investimet — dhe problemet e papritura e kanë zakon të keq të bien pikërisht kur tregjet janë të dobëta.',
            'Fondi i emergjencës nuk është para të humbura që s’fitojnë asgjë. Është ajo që ju lejon të mos shitni në çastin më të keq të mundshëm.',
          ],
        },
        {
          heading: 'Kur inflacioni e ndryshon llogarinë',
          paragraphs: [
            'Kursimi duket i sigurt sepse shifra nuk luan. Por fuqia blerëse e asaj shifre luan gjithmonë, dhe zakonisht kah poshtë.',
            'Nëse llogaria juaj paguan 2% dhe çmimet rriten 3%, po humbni një përqind në vit, me siguri të plotë. Është humbje e ngadaltë dhe e padukshme, dhe pikërisht prandaj kalon pa u vërejtur.',
            'Kjo nuk do të thotë se kursimi është gabim. Do të thotë se kursimi është i drejtë për afat të shkurtër dhe i shtrenjtë për afat të gjatë.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Cilat para shkojnë ku',
        columns: ['Kur ju duhen', 'Ku duhet të jenë', 'Pse'],
        rows: [
          {
            label: 'Këtë muaj',
            value: 'Llogari rrjedhëse',
            cost: 'Duhet të jenë të prekshme sot',
            tone: 'positive',
          },
          {
            label: 'Brenda tre vjetëve',
            value: 'Kursim ose depozitë',
            cost: 'Nuk ka kohë të rimëkëmbet një rënie',
          },
          {
            label: 'Pas dhjetë vjetësh',
            value: 'Investime të gjera',
            cost: 'Koha zbut luhatjen',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'emergency-fund',
          term: 'Fond emergjence',
          definition:
            'Para që i keni në dorë në çast, që një shpenzim i papritur të mos ju detyrojë t’i shitni investimet.',
          aliases: ['fondi i emergjencës'],
        },
        {
          slug: 'purchasing-power',
          term: 'Fuqi blerëse',
          definition:
            'Sa mund të blini vërtet me një shumë parash, jo sa është shifra.',
          aliases: ['fuqia blerëse'],
        },
        {
          slug: 'time-horizon',
          term: 'Afat kohor',
          definition:
            'Sa gjatë mund t’i lini paratë pa i prekur. Ai e vendos se sa rrezik ka kuptim.',
          aliases: ['afati kohor'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse një fond emergjence e bën më të sigurt investimin tuaj afatgjatë?',
        options: [
          'Sepse fondi i emergjencës fiton më shumë se aksionet',
          'Sepse ju lejon të mos shisni investimet në një moment të keq',
          'Sepse rregullatorët e kërkojnë',
        ],
        answer: 1,
        explanation:
          'Rreziku më i madh për një investim afatgjatë është të detyroheni ta shitni herët. Rezerva e heq atë detyrim.',
      },
    },
    upNextSlugs: ['how-a-brokerage-account-works', 'your-first-hundred-euros'],
  },

  {
    id: 'how-a-brokerage-account-works',
    slug: 'how-a-brokerage-account-works',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Si funksionon një llogari brokerimi',
    },
    summary: {
      sq: 'Kush i mban në fakt aksionet tuaja, dhe çfarë ndodh nëse brokeri falimenton.',
    },
    inOneSentence: {
      sq: 'Brokeri është dera nga ku kalojnë urdhrat tuaj, por aksionet mbahen të ndara nga paratë e vetë brokerit.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë bën në të vërtetë një broker',
          paragraphs: [
            'Ju nuk mund t’i bini në telefon bursës. Bursat pranojnë urdhra vetëm nga anëtarët e vet, dhe brokeri është ai anëtar. Kur e shtypni “bli”, brokeri e dërgon atë urdhër në një treg dhe ju kthen rezultatin.',
            'Në këmbim merr ose një komision fiks, ose një pjesë të spread-it, ose të dyja. Brokerët “pa komision” nuk punojnë falas — paguhen diku tjetër, zakonisht nga firmat që i ekzekutojnë urdhrat tuaj.',
            'Kjo nuk është medoemos keq, por ia vlen ta dini: nëse nuk e shihni tarifën, ajo nuk mungon, thjesht e ka ndërruar formën.',
          ],
        },
        {
          heading: 'Kush i zotëron aksionet',
          paragraphs: [
            'Në shumicën e vendeve, aksionet e blera përmes një brokeri mbahen në një llogari të ndarë nga asetet e vetë brokerit. Ligjërisht janë tuajat, jo të tij, edhe pse emri në regjistër mund të jetë i një kujdestari.',
            'Prandaj falimentimi i një brokeri nuk do të thotë vetvetiu se i humbni investimet. Ato barten te një institucion tjetër.',
            'Rreziku i vërtetë është nëse brokeri i ka përzier paratë e klientëve me të vetat — gjë e paligjshme dhe pikërisht ajo që e kontrollojnë rregullatorët. Prandaj ka rëndësi që brokeri të jetë i licencuar në një juridiksion serioz.',
          ],
        },
        {
          heading: 'Llojet e urdhrave që do të takoni',
          paragraphs: [
            'Një urdhër tregu thotë “blije tash, me çfarëdo çmimi që gjendet”. Ekzekutohet thuajse gjithmonë, por në një treg me pak likuiditet çmimi mund të dalë më i keq se ai që e patë.',
            'Një urdhër me limit thotë “blije vetëm nëse çmimi është nën këtë shifër”. Ju mbron nga një ekzekutim i keq, por mund të mos ekzekutohet fare.',
            'Për blerje të vogla e të rregullta në aksione të mëdha, diferenca rrallë ka rëndësi. Për çdo gjë me pak likuiditet ose të luhatshme, urdhri me limit është zakonisht zgjedhja më e mençur.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'broker',
          term: 'Broker',
          definition: 'Firma përmes së cilës urdhrat tuaj arrijnë në bursë.',
          aliases: ['brokeri', 'brokerimi'],
        },
        {
          slug: 'custodian',
          term: 'Kujdestar',
          definition:
            'Institucioni që mban fizikisht ose ligjërisht letrat me vlerë në emrin tuaj.',
          aliases: ['kujdestari'],
        },
        {
          slug: 'limit-order',
          term: 'Urdhër me limit',
          definition:
            'Një urdhër që ekzekutohet vetëm në çmimin që caktoni ose më mirë.',
          aliases: ['urdhri me limit'],
        },
        {
          slug: 'market-order',
          term: 'Urdhër tregu',
          definition:
            'Një urdhër që ekzekutohet menjëherë me çmimin më të mirë të disponueshëm.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Pse një broker “pa komision” nuk është vërtet falas?',
        options: [
          'Sepse fsheh tarifa mujore në kontratë',
          'Sepse paguhet diku tjetër, zakonisht nga ekzekutimi i urdhrave',
          'Sepse komisioni merret vetëm kur shisni',
        ],
        answer: 1,
        explanation:
          'Tarifa nuk zhduket, vetëm e ndërron formën. Zakonisht kalon te spread-i ose te pagesa nga firma që e ekzekuton urdhrin tuaj.',
      },
    },
    upNextSlugs: ['your-first-hundred-euros', 'fees-that-change-everything'],
  },

  {
    id: 'fees-that-change-everything',
    slug: 'fees-that-change-everything',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Tarifat: numri i vogël që ndryshon gjithçka',
    },
    summary: {
      sq: 'Si një tarifë 1% në vit kompozohet në një diferencë shumë më të madhe gjatë njëzet vjetësh.',
    },
    inOneSentence: {
      sq: 'Një tarifë nuk ju kushton një herë — ju kushton çdo vit, mbi një shumë që përndryshe do të ishte rritur.',
    },
    body: {
      sq: [
        {
          heading: 'Pse 1% nuk është 1%',
          paragraphs: [
            'Nëse një fond merr 1% në vit, instinkti thotë se humbni një përqind. Për një vit, po. Për njëzet vjet, jo — sepse çdo euro e marrë sivjet është një euro që nuk fiton më kurrë asgjë.',
            'Tarifa nuk i merr vetëm paratë, e merr edhe tërë rritjen e ardhshme të atyre parave. Prandaj efekti nuk është linear; zgjerohet me kohën, pikërisht si kompozimi, vetëm në drejtim të kundërt.',
            'Prandaj tarifat janë e vetmja gjë në investime që mund ta kontrolloni plotësisht dhe që ka ndikim të garantuar. Kthimet nuk i zgjidhni. Tarifat po.',
          ],
        },
        {
          heading: 'Tarifat që nuk i shihni',
          paragraphs: [
            'Raporti i shpenzimeve të fondit është ai që reklamohet, por rrallë është i vetmi. Ka tarifa platforme, tarifa transaksioni brenda vetë fondit dhe kosto të këmbimit valutor nëse blini diçka në një monedhë tjetër.',
            'Kostoja e këmbimit harrohet më së shpeshti, dhe në disa platforma është më e madhe se të gjitha të tjerat bashkë. Një maržë prej 0,5% për blerje dhe 0,5% për shitje është një përqind i plotë i hequr nga xhepi juaj.',
            'Kur i krahasoni dy produkte, mblidhini të gjitha. Shifra e vetme që ka rëndësi është sa ju mbetet, jo sa reklamohet.',
          ],
        },
        {
          heading: 'Kur ia vlen të paguash më shumë',
          paragraphs: [
            'Tarifa më e ulët nuk fiton gjithherë. Një fond i lirë që e ndjek gabimisht indeksin e vet mund t’ju kushtojë më shumë se një fond pak më i shtrenjtë që e ndjek saktë.',
            'Për tregje të vështira ose të vogla, ku blerja dhe shitja kushtojnë shtrenjtë, një menaxher i zoti mund ta arsyetojë tarifën. Për indekset e mëdha dhe likuide, historia tregon se rrallë e arsyeton.',
            'Rregull praktik: sa më standarde të jetë ajo që e blini, aq më pak duhet të pranoni të paguani për të.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Njëzet vjet me 10.000 €, duke supozuar 7% në vit',
        columns: ['Fondi', 'Tarifa vjetore', 'Vlera pas 20 vjetësh'],
        rows: [
          {
            label: 'ETF i lirë indeksor',
            value: '0.10%',
            cost: '37.900 €',
            tone: 'positive',
          },
          { label: 'Fond mesatar', value: '0.75%', cost: '33.500 €' },
          {
            label: 'Fond i shtrenjtë aktiv',
            value: '1.50%',
            cost: '29.000 €',
            tone: 'negative',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'expense-ratio',
          term: 'Raport shpenzimesh',
          definition:
            'Tarifa vjetore e fondit, e dhënë si përqindje e asaj që e mbani.',
          aliases: ['raporti i shpenzimeve'],
        },
        {
          slug: 'tracking-error',
          term: 'Gabim ndjekjeje',
          definition:
            'Sa larg ka mbetur një fond nga indeksi që premtoi se do ta ndiqte.',
        },
        {
          slug: 'fx-spread',
          term: 'Maržë konvertimi',
          definition:
            'Kostoja e fshehur e këmbimit të monedhës kur blini diçka në një valutë tjetër.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Dy fonde ndjekin të njëjtin indeks. Njëri merr 0,10%, tjetri 1,50%. Çfarë duhet të prisni gjatë njëzet vjetësh?',
        options: [
          'Diferencë rreth 1,4% në total',
          'Diferencë shumë më të madhe se 1,4%, sepse tarifa kompozohet',
          'Asnjë diferencë, sepse ndjekin të njëjtin indeks',
        ],
        answer: 1,
        explanation:
          'Tarifa merret çdo vit nga një shumë që do të ishte rritur. Për njëzet vjet ajo diferencë bëhet mijëra euro.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['what-is-a-fund', 'index-funds-vs-stock-picking'],
  },

  {
    id: 'what-is-a-fund',
    slug: 'what-is-a-fund',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çfarë është një fond, dhe si ndryshon nga një ETF',
    },
    summary: {
      sq: 'Të gjitha fondet i mbledhin paratë e shumë njerëzve. Dallimi është si i blini dhe kush vendos çka ka brenda.',
    },
    inOneSentence: {
      sq: 'Fondi është një grumbull i përbashkët parash i menaxhuar sipas një rregulli të shpallur, dhe ai rregull është e vetmja gjë që ka vërtet rëndësi.',
    },
    body: {
      sq: [
        {
          heading: 'Aktiv apo pasiv',
          paragraphs: [
            'Fondi pasiv ka një rregull mekanik: mbaj gjithçka që është në këtë indeks, në këto përmasa. Askush nuk gjykon a është e mirë një kompani. Nëse është në listë, blihet.',
            'Fondi aktiv ka një njeri që vendos. Ai njeri mundohet të blejë atë që do të rritet dhe të shmangë atë që do të bjerë, dhe paguhet për atë mundim.',
            'Të dyja janë të ligjshme. Por fondi aktiv duhet ta kalojë indeksin e vet aq sa ta mbulojë edhe tarifën, çdo vit, vetëm sa për të dalë baras. Kjo është një pengesë e përhershme dhe shumica e fondeve nuk e kalojnë për periudha të gjata.',
          ],
        },
        {
          heading: 'ETF apo fond i përbashkët',
          paragraphs: [
            'Ky nuk është dallimi mes aktivit dhe pasivit — ka ETF aktivë dhe fonde të përbashkëta pasive. Është dallimi në mënyrën si i blini.',
            'ETF-ja blihet e shitet në bursë tërë ditën, si aksion, dhe ju e shihni çmimin në kohë reale. Fondi i përbashkët zakonisht blihet një herë në ditë, me një çmim të llogaritur pas mbylljes.',
            'Për një investitor afatgjatë kjo ka pak rëndësi praktike. Ajo që ka rëndësi është kostoja, çka mban fondi dhe a mund ta blini lehtë nga vendi ku jeni.',
          ],
        },
        {
          heading: 'Akumulues apo shpërndarës',
          paragraphs: [
            'Kur kompanitë brenda fondit paguajnë dividendë, fondi duhet të vendosë çka të bëjë me to. Fondi shpërndarës jua dërgon në llogari. Fondi akumulues i riinveston vetvetiu.',
            'Nëse po ndërtoni për të ardhmen, akumuluesi zakonisht është më i thjeshtë: paratë kthehen në punë pa asnjë veprim nga ana juaj dhe pa kostot e riblerjes.',
            'Nëse ju duhen të ardhura tash, shpërndarësi ka kuptim. Zgjedhja varet nga qëllimi, jo nga cilësia — i njëjti fond shpesh gjendet në të dy variantet.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Tre pyetjet për çdo fond',
        columns: ['Pyetja', 'Ku ta gjeni', 'Pse ka rëndësi'],
        rows: [
          {
            label: 'Çfarë mban?',
            value: 'Lista e zotërimeve',
            cost: 'Emri shpesh mashtron',
          },
          {
            label: 'Sa kushton?',
            value: 'Raporti i shpenzimeve',
            cost: 'Zbritet çdo vit',
            tone: 'negative',
          },
          {
            label: 'Çfarë bën me dividendët?',
            value: 'Akumulues ose shpërndarës',
            cost: 'Vendos nëse riinvestohen',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'passive-fund',
          term: 'Fond pasiv',
          definition:
            'Fond që e kopjon një indeks pa gjykim njerëzor mbi kompanitë veç e veç.',
          aliases: ['fond indeksor', 'fondi pasiv'],
        },
        {
          slug: 'active-fund',
          term: 'Fond aktiv',
          definition:
            'Fond ku investimet i zgjedh një menaxher, që paguhet për atë zgjedhje.',
          aliases: ['fondi aktiv', 'menaxhim aktiv'],
        },
        {
          slug: 'mutual-fund',
          term: 'Fond i përbashkët',
          definition:
            'Fond që blihet drejtpërdrejt te shoqëria, zakonisht me një çmim në ditë.',
        },
        {
          slug: 'distributing-fund',
          term: 'Fond shpërndarës',
          definition:
            'Fond që jua paguan dividendët në para në vend që t’i riinvestojë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse shumica e fondeve aktive nuk e mundin indeksin e tyre për periudha të gjata?',
        options: [
          'Sepse menaxherët nuk janë të aftë',
          'Sepse duhet ta kalojnë indeksin çdo vit sa për ta mbuluar edhe tarifën e vet',
          'Sepse ligji i ndalon të mbajnë aksionet më të mira',
        ],
        answer: 1,
        explanation:
          'Tarifa është pengesë e përhershme. Mesatarisht, menaxherët janë vetë tregu, prandaj pas tarifës mbetet një rezultat nën treg.',
      },
    },
    upNextSlugs: ['index-funds-vs-stock-picking', 'time-in-the-market'],
  },

  {
    id: 'time-in-the-market',
    slug: 'time-in-the-market',
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Koha në treg kundër kohës së tregut',
    },
    summary: {
      sq: 'Pse pritja e çastit të duhur zakonisht kushton më shumë se rënia që po mundoheni ta shmangni.',
    },
    inOneSentence: {
      sq: 'Që të fitoni nga koha e tregut duhet ta qëlloni dy herë — kur dilni dhe kur ktheheni — kurse ditët më të mira vijnë grumbull me ato më të këqijat.',
    },
    body: {
      sq: [
        {
          heading: 'Problemi i dy vendimeve',
          paragraphs: [
            'Shitja para një rënieje duket si një vendim i vetëm i mençur. Nuk është. Janë dy vendime: kur të dilni dhe kur të hyni prapë.',
            'Pjesa e dytë është shumë më e vështirë. Kur tregu ka rënë tridhjetë përqind dhe lajmet janë të tmerrshme, blerja duket marrëzi. Pikërisht atëherë duhet vepruar.',
            'Në praktikë, shumica e njerëzve dalin kah fundi i rënies dhe kthehen kur rimëkëmbja ka ndodhur tashmë. Rezultati u del më keq sesa të mos kishin bërë asgjë.',
          ],
        },
        {
          heading: 'Pse ditët më të mira janë të rrezikshme për t’i humbur',
          paragraphs: [
            'Kthimet e tregut nuk ndahen njëtrajtshëm. Një pjesë e madhe e fitimit të një dekade vjen nga një grusht ditësh.',
            'Dhe ato ditë nuk dalin në qetësi. Grumbullohen pikërisht rreth ditëve më të këqija, mes panikut dhe rimëkëmbjes. Kush del për t’i shmangur të këqijat, zakonisht i humb edhe të mirat.',
            'Kjo është arsyeja pse “të qëndrosh i investuar” nuk është këshillë përtacie. Është pranim i faktit se fitimet vijnë të grumbulluara dhe pa paralajmërim.',
          ],
        },
        {
          heading: 'Çfarë funksionon në vend të saj',
          paragraphs: [
            'Investimi i rregullt me shuma të njëjta e heq nevojën për ta gjykuar çastin. Kur çmimet janë të larta, blini më pak njësi; kur janë të ulëta, blini më shumë — dhe kjo ndodh vetvetiu.',
            'Kjo nuk ju garanton rezultat më të mirë se një investim i vetëm në çastin ideal. Asgjë nuk e mund çastin ideal. Por ju mbron nga çasti më i keq, i cili është shumë më i mundshëm.',
            'Ribalancimi një herë në vit bën punë të ngjashme: jua shet vetvetiu atë që është rritur shumë dhe jua blen atë që ka mbetur prapa, pa ju kërkuar asnjë parashikim.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Investoni 200 € çdo muaj për dhjetë vjet',
          body: 'Nuk keni marrë asnjë vendim për çastin. Keni blerë në çdo lloj tregu, të lartë e të ulët.',
        },
        {
          title: 'Tregu bie 30% në vitin e katërt',
          body: 'Kontributet tuaja të atij viti blejnë dukshëm më shumë njësi për të njëjtat 200 €.',
        },
        {
          title: 'Tregu rimëkëmbet në vitin e gjashtë',
          body: 'Ato njësi shtesë, të blera në panik, janë ato që bëjnë diferencën më të madhe në fund.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'dollar-cost-averaging',
          term: 'Investim i rregullt',
          definition:
            'Vendosja e së njëjtës shumë në afate të rregullta, pa marrë parasysh çmimin.',
          aliases: ['mesatarizim i kostos'],
        },
        {
          slug: 'rebalancing',
          term: 'Ribalancim',
          definition:
            'Kthimi i portofolit në përmasat e synuara duke e shitur atë që u rrit dhe duke e blerë atë që mbeti prapa.',
          aliases: ['ribalancimi'],
        },
        {
          slug: 'market-timing',
          term: 'Koha e tregut',
          definition:
            'Mundimi për të dalë para një rënieje dhe për të hyrë para një rritjeje.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse dalja nga tregu para një rënieje është më e vështirë se sa duket?',
        options: [
          'Sepse shitja kushton shumë në komisione',
          'Sepse duhet ta qëlloni edhe çastin e kthimit, kur lajmet janë më të këqija',
          'Sepse brokerët nuk lejojnë shitje të shpejta',
        ],
        answer: 1,
        explanation:
          'Janë dy vendime, jo një. Pjesa e dytë kërkon të blini pikërisht atëherë kur gjithçka duket e pashpresë.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['your-first-hundred-euros', 'risk-and-return'],
  },

  {
    id: 'your-first-hundred-euros',
    slug: 'your-first-hundred-euros',
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Njëqind eurot tuaja të para',
    },
    summary: {
      sq: 'Çka duhet vendosur para se ta shtypni “bli” për herë të parë, sipas radhës së duhur.',
    },
    inOneSentence: {
      sq: 'Vendimi i parë nuk është çka të blini, por a duhet t’i investoni fare këto para tash.',
    },
    body: {
      sq: [
        {
          heading: 'Rendi që ka rëndësi',
          paragraphs: [
            'Para investimit vijnë tri gjëra: borxhi i shtrenjtë i shlyer, një rezervë emergjence e ndërtuar dhe një afat i qartë për paratë që mbesin.',
            'Borxhi me interes të lartë është investimi më i mirë i garantuar që do ta gjeni. Shlyerja e një karte krediti me 18% është kthim prej 18% pa asnjë rrezik. Atë nuk ta premton dot asnjë aksion.',
            'Vetëm kur këto tri janë në rregull, pyetja “çka të blej” bëhet e dobishme. Para tyre është vetëm shpërqendrim.',
          ],
        },
        {
          heading: 'Pse i pari duhet të jetë i mërzitshëm',
          paragraphs: [
            'Investimi i parë ka një detyrë që s’ka lidhje me kthimin: t’ju mësojë si është të mbash diçka që luan, pa ju shkatërruar nëse e ndieni rëndë.',
            'Prandaj një fond i gjerë e i lirë indeksor është pikënisja e zakonshme. Jo se sjell më shumë fitim, por se gabimet që mund t’i bëni me të janë të vogla dhe të riparueshme.',
            'Aksionet një nga një, kriptomonedhat dhe produktet me levë mund të vijnë më vonë, kur ta keni një bazë dhe një ide të qartë se sa jeni gati të humbni.',
          ],
        },
        {
          heading: 'Gabimet që bëjnë të gjithë',
          paragraphs: [
            'I pari është shikimi i çmimit çdo ditë. Kjo nuk ndryshon asgjë, veç e rrit mundësinë që të veproni në panik. Një portofol afatgjatë nuk ka nevojë të shihet më shumë se disa herë në vit.',
            'I dyti është vrapimi pas asaj që sapo u rrit shumë. Kur diçka është nëpër të gjitha titujt, çmimi tashmë e ka brenda atë vëmendje.',
            'I treti është ndërrimi i planit sa herë që ndërron humori. Një plan mesatar i ndjekur dhjetë vjet mund të japë më shumë se një plan i shkëlqyer i braktisur pas gjashtë muajsh.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Rendi i veprimeve',
        columns: ['Hapi', 'Çfarë bëni', 'Pse i pari'],
        rows: [
          {
            label: '1',
            value: 'Shlyeni borxhin e shtrenjtë',
            cost: 'Kthim i garantuar, pa rrezik',
            tone: 'positive',
          },
          {
            label: '2',
            value: 'Ndërtoni rezervën',
            cost: 'Ju ruan nga shitja në panik',
          },
          {
            label: '3',
            value: 'Investoni pjesën e mbetur',
            cost: 'Vetëm paratë që nuk ju duhen për vite',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'asset-allocation',
          term: 'Shpërndarje asetesh',
          definition:
            'Si i ndani paratë nëpër lloje të investimeve. Vendimi që e shpjegon pjesën më të madhe të rezultatit tuaj.',
        },
        {
          slug: 'risk-tolerance',
          term: 'Toleranca ndaj rrezikut',
          definition:
            'Sa rënie mund ta duroni pa e ndërruar planin. Matet me sjellje, jo me dëshirë.',
        },
        {
          slug: 'portfolio',
          term: 'Portofol',
          definition: 'Gjithçka që e keni, e parë si një e tërë e vetme.',
          aliases: ['portofoli'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Keni një kartë krediti me 18% interes dhe 1.000 € për t’i investuar. Cila është zgjedhja më e mirë?',
        options: [
          'Vendosini në një fond indeksor me kthim të pritur 7%',
          'Shlyeni kartën e kreditit',
          'Ndajini përgjysmë',
        ],
        answer: 1,
        explanation:
          'Shlyerja e një borxhi me 18% është kthim i garantuar prej 18%. Asnjë investim nuk ta jep atë pa rrezik.',
      },
    },
    upNextSlugs: ['what-is-an-etf', 'saving-vs-investing'],
  },
];
