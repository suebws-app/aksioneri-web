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
            'Kur blini një aksion, nuk po vini bast se numri do të rritet. Po blini një pjesë të vogël të një biznesi: fabrikat e tij, markat e tij, kontratat e tij dhe të drejtën tuaj mbi një pjesë të fitimeve të ardhshme. Nëse një kompani ka njëqind milionë aksione dhe ju zotëroni njëqind, ju zotëroni një e milionta pjesë të saj.',
            'Kjo pjesë është e vogël, por është e vërtetë. Ju keni të drejtë të votoni në mbledhjen vjetore. Nëse kompania paguan dividendë, ju merrni pjesën tuaj. Nëse ajo shitet, ju merrni pjesën tuaj të çmimit. Askush nuk mund t’ju heqë atë pjesë përveç jush kur e shisni.',
            'Kjo është arsyeja pse pyetja e parë për çdo aksion nuk është «a do të rritet?» por «a është ky një biznes i mirë?». E dyta rrjedh nga e para me kalimin e kohës. E para pa të dytën është thjesht një bast.',
          ],
        },
        {
          heading: 'Nga vjen çmimi',
          paragraphs: [
            'Çmimi i një aksioni nuk vendoset nga kompania. Ai vendoset nga njerëzit që blejnë dhe shesin atë aksion sot, dhe ata blejnë e shesin bazuar në atë që mendojnë se kompania do të fitojë nesër.',
            'Prandaj një kompani mund të shpallë fitime rekord dhe aksioni i saj të bjerë. Nëse tregu priste fitime edhe më të mëdha, lajmi i mirë ishte tashmë në çmim, dhe realiteti doli më i vogël se pritja. Çmimi lëviz me diferencën mes asaj që ndodhi dhe asaj që pritej të ndodhte.',
            'Kjo është pjesa më kundërintuitive e tregjeve dhe ia vlen ta mbani mend: çmimet nuk reagojnë ndaj lajmeve, ato reagojnë ndaj surprizave.',
          ],
        },
        {
          heading: 'Pse ekziston fare',
          paragraphs: [
            'Kompanitë shesin aksione sepse duan para tani. Një kompani që dëshiron të ndërtojë një fabrikë mund të marrë hua nga një bankë, ose mund t’u shesë njerëzve pjesë të vetvetes. Huaja duhet të kthehet me interes. Aksionet nuk duhen kthyer kurrë.',
            'Në këmbim, aksionerët i japin një pjesë të pronësisë dhe të fitimeve të ardhshme. Është një shkëmbim: kompania merr kapital pa borxh, investitori merr një pjesë të asaj që ndërton ai kapital.',
            'Kur e shihni në këtë mënyrë, tregu i aksioneve nuk është një kazino e ndërtuar mbi ekonominë. Është mekanizmi me të cilin kursimet e njerëzve arrijnë te bizneset që kanë nevojë për to.',
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
            'Një njësi pronësie në një kompani, që të jep të drejtë mbi një pjesë të fitimeve të saj.',
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
          'Një kompani shpall fitimet më të larta në historinë e saj dhe aksioni bie 5%. Cila është shpjegimi më i mundshëm?',
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
            'Imagjinoni një treg ku njëra anë shkruan «do të paguaj deri në 100 € për një aksion» dhe tjetra shkruan «do të shes për jo më pak se 101 €». Askush nuk lëviz. Nuk ka tregti dhe nuk ka çmim të ri.',
            'Pastaj dikush pranon të paguajë 101 €. Ajo tregti ndodh, dhe 101 € bëhet «çmimi i fundit» që shihni në ekran. Çmimi nuk është një vlerësim zyrtar. Është thjesht shuma që dy palë ranë dakord, sekondën e fundit që dikush ra dakord.',
            'Ky është ndryshimi mes çmimit të kërkuar, çmimit të ofruar dhe çmimit të fundit. Kur lexoni «S&P 500 është në 6.400», po lexoni një përmbledhje të tregtive të fundit, jo një gjykim se sa vlejnë ato kompani.',
          ],
        },
        {
          heading: 'Kush është në anën tjetër',
          paragraphs: [
            'Kur blini, dikush po shet. Shpesh nuk është një person që mendon se ju gaboheni — është një fond pensioni që ribalancon, dikush që financon një shtëpi, ose një «market maker» që fiton nga diferenca mes blerjes dhe shitjes.',
            'Këta market makers janë arsyeja pse mund të blini menjëherë. Ata mbajnë gjithmonë një ofertë blerjeje dhe një ofertë shitjeje të hapur, dhe fitojnë disa cent nga diferenca. Në këmbim, ju nuk keni nevojë të prisni derisa të shfaqet një blerës i vërtetë.',
            'Kjo diferencë quhet spread. Në një aksion të madh e të tregtuar shumë, ajo është shumë e vogël. Në një aksion të vogël e të harruar, ajo mund të jetë disa përqind — një kosto e fshehtë që paguani sa herë hyni ose dilni.',
          ],
        },
        {
          heading: 'Pse orët e tregut ekzistojnë',
          paragraphs: [
            'Bursat kanë orë pune sepse likuiditeti përfiton nga koncentrimi. Nëse të gjithë tregtojnë në të njëjtat orë, ka gjithmonë dikush në anën tjetër, dhe spread-i mbetet i ngushtë.',
            'Kur tregu është i mbyllur, lajmet nuk ndalojnë. Prandaj një aksion mund të hapet ndjeshëm më lart ose më poshtë se ku mbylli — të gjitha lajmet e natës ngjeshen në çmimin e parë të mëngjesit.',
            'Kjo është arsyeja pse profesionistët flasin për «hapjen» dhe «mbylljen» si momente të veçanta. Ato janë dy pikat e ditës ku shumica e vëmendjes dhe e volumit takohen njëherësh.',
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
            'Sa lehtë mund të blini ose të shisni pa lëvizur vetë çmimin.',
          aliases: ['likuid', 'likuiditeti'],
        },
        {
          slug: 'market-maker',
          term: 'Market maker',
          definition:
            'Një firmë që mban gjithmonë të hapur një ofertë blerjeje dhe shitjeje, që ju të mund të tregtoni menjëherë.',
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
          'Me pak blerës e shitës, diferenca mes ofertave zgjerohet — dhe atë diferencë e paguani ju sa herë hyni ose dilni.',
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
            'Një menaxher fondi blen një grup aktivesh — të themi, aksione në 500 kompanitë më të mëdha amerikane — dhe pastaj e ndan pronësinë e asaj grumbulli në njësi të vogla. Çdo njësi është një aksion i ETF-së dhe tregtohet në bursë si çdo aksion tjetër.',
            'Kur blini një njësi, zotëroni një copëz të të 500 kompanive. Nuk ju është dashur të zgjidhni mes tyre, dhe nuk ju janë dashur 500 blerje të veçanta.',
            'Ky është i gjithë truku. Puna e vështirë — të blesh, të mbash dhe të ribalancosh qindra pozicione — bëhet një herë nga fondi, dhe ju paguani një tarifë të vogël vjetore për ta shmangur atë punë.',
          ],
        },
        {
          heading: 'Ku mund të shkojë keq',
          paragraphs: [
            'Diversifikimi ul rrezikun që një kompani e vetme t’ju fundosë. Ai nuk ju mbron nga rënia e një tregu të tërë — në një shitje të gjerë, pothuajse gjithçka në shportë bie së bashku.',
            'ETF-të e ngushta gjithashtu e prishin qëllimin. Një fond që mban vetëm një industri mund të jetë pothuajse po aq i përqendruar sa zgjedhja e aksioneve individuale. «ETF» nuk do të thotë automatikisht «i diversifikuar».',
            'Dhe emri mund të mashtrojë. Një ETF «teknologjie globale» mund të ketë gjysmën e parave në pesë kompani amerikane. Lista e zotërimeve, jo emri, ju thotë çfarë keni blerë.',
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
          body: 'Nëse bie 50%, 100 € tuajat humbin rreth 1 €. Po të kishit vënë gjithçka në atë kompani të vetme, do të ishit 50 € poshtë.',
        },
        {
          title: 'Indeksi rritet 8% gjatë vitit',
          body: 'Zotërimi juaj vlen rreth 108 €, minus tarifën e vogël vjetore të fondit. Ajo tarifë është gjëja tjetër për të kontrolluar.',
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
            'Shpërndarja e parave nëpër shumë aktive, që asnjë e vetme të mos vendosë fatin tuaj.',
          aliases: ['diversifikimi', 'i diversifikuar'],
        },
        {
          slug: 'accumulating-fund',
          term: 'Fond akumulues',
          definition:
            'Një fond që i riinveston dividendët për ju në vend që t’jua paguajë në para.',
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
          'Në një indeks me qindra kompani, secila zë një pjesë të vogël — një rënie 40% te njëra lëviz të tërën vetëm me disa të dhjeta të përqindjes.',
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
            'Në gjuhën e përditshme «rrezik» do të thotë «shanс që të shkojë keq». Në investime ai ka një kuptim më të ngushtë: sa gjerësisht mund të ndryshojë rezultati nga ajo që prisni, në të dyja drejtimet.',
            'Një llogari kursimi që paguan 2% ka rrezik pothuajse zero: e dini se çfarë do të merrni. Një aksion i vetëm mund të bëjë +60% ose −40% brenda një viti. E njëjta shumë e investuar, dy botë krejt të ndryshme mundësish.',
            'Kjo është arsyeja pse pyetja «sa rrezik duhet të marr?» nuk ka një përgjigje universale. Ajo varet nga sa gjerë mund ta lejoni rezultatin të ndryshojë përpara se t’ju prishë planet.',
          ],
        },
        {
          heading: 'Afati ndryshon gjithçka',
          paragraphs: [
            'Paratë që ju duhen vitin tjetër dhe paratë që ju duhen pas njëzet vjetësh nuk janë e njëjta gjë, edhe nëse janë në të njëjtën llogari.',
            'Për paratë e vitit të ardhshëm, luhatja është një problem i vërtetë: nëse tregu bie 30% pikërisht kur ju duhen, ju e realizoni atë humbje. Nuk keni kohë të prisni.',
            'Për paratë e njëzet viteve, e njëjta luhatje është kryesisht zhurmë. Historikisht, sa më i gjatë periudha e mbajtjes, aq më e ngushtë bëhet gama e rezultateve — jo sepse rreziku zhduket, por sepse vitet e mira dhe të këqija kanë kohë të mesatarizohen.',
          ],
        },
        {
          heading: 'Rreziku që nuk paguhet',
          paragraphs: [
            'Ekziston një rregull i rëndësishëm: tregu ju shpërblen për rreziqet që nuk mund t’i shmangni, jo për ato që mundeni.',
            'Nëse mbani një aksion të vetëm dhe ai falimenton, ju humbisni gjithçka. Por tregu nuk ju paguan shtesë për ta marrë atë rrezik, sepse mund ta kishit hequr falas duke mbajtur njëqind kompani në vend të njërës.',
            'Kjo është arsyeja pse diversifikimi quhet ndonjëherë «dreka e vetme falas» në financë. Ai heq një lloj rreziku pa ju kushtuar kthim të pritshëm.',
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
            'Sa shumë lëviz çmimi lart e poshtë. Luhatje e lartë do të thotë gamë më e gjerë rezultatesh.',
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
            'Sa larg poshtë nga maja e tij ka rënë një investim përpara se të rikuperohej.',
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
          'Shpërblehen vetëm rreziqet që nuk mund t’i shmangni. Rreziku i një kompanie të vetme hiqet duke mbajtur shumë, pa kosto.',
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
            'Çdo aksion mbart dy lloje rreziku. I pari është specifik për kompaninë: një tërheqje produkti, një drejtues i keq, një konkurrent që shpik diçka më të mirë. I dyti është i përbashkët për të gjithë: recesion, luftë, një ndryshim i madh në normat e interesit.',
            'Diversifikimi e heq të parin dhe nuk e prek të dytin. Nëse mbani njëqind kompani, falimentimi i njërës ju kushton një përqind. Por nëse i gjithë tregu bie tridhjetë përqind, edhe ju bini tridhjetë përqind — nuk kishte ku të fshiheshit brenda tregut të aksioneve.',
            'Prandaj diversifikimi nuk është një mbrojtje nga humbja. Është një mbrojtje nga humbja për arsyen e gabuar.',
          ],
        },
        {
          heading: 'Pse nuk kushton asgjë',
          paragraphs: [
            'Kjo është pjesa që i habit njerëzit. Nëse mbani njëqind kompani në vend të njërës, kthimi juaj i pritur nuk bie. Ju merrni mesataren e të njëqindëve, dhe mesatarja e tyre është pikërisht kthimi që tregu ofron.',
            'Ajo që bie është shpërndarja rreth asaj mesatareje. Me një kompani të vetme, mund të fitoni katërfish ose të humbisni gjithçka. Me njëqind, të dyja skajet zhduken dhe ju mbeteni afër mesatares.',
            'Është një shkëmbim ku njëra anë është falas: hiqni skajin e keq dhe skajin e mirë, por qendra mbetet ku ishte. Kjo është arsyeja pse quhet ndonjëherë e vetmja drekë falas në financë.',
          ],
        },
        {
          heading: 'Kur pushon së funksionuari',
          paragraphs: [
            'Diversifikimi mbështetet në një supozim: se gjërat që mbani nuk bien të gjitha njëkohësisht. Kur ai supozim thyhet, mbrojtja zhduket pikërisht kur ju duhet më shumë.',
            'Në krizat e mëdha, korrelacionet shkojnë drejt njëshit. Aksione që zakonisht lëviznin veç e veç fillojnë të bien së bashku, sepse arsyeja e rënies nuk ka të bëjë me asnjërën prej tyre — ka të bëjë me para që largohen nga rreziku në përgjithësi.',
            'Kjo nuk e bën diversifikimin të pavlefshëm. E bën atë një mjet për rrezikun e zakonshëm, jo një çadër për stuhinë.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Njëqind mijë euro në një kompani',
          body: 'Nëse ajo kompani falimenton, mbeteni me zero. Nuk ka rëndësi sa i mirë ishte arsyetimi juaj.',
        },
        {
          title: 'Njëqind mijë euro në njëqind kompani',
          body: 'E njëjta falimentim ju kushton një mijë euro. Duhet të falimentojnë të njëqind që të mbeteni me zero.',
        },
        {
          title: 'Kthimi mesatar në të dyja rastet',
          body: 'I njëjti. Diversifikimi nuk pagoi asgjë për ta hequr atë rrezik.',
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'correlation',
          term: 'Korrelacion',
          definition:
            'Sa shpesh dy investime lëvizin në të njëjtin drejtim. Korrelacion i ulët është ajo që e bën diversifikimin të funksionojë.',
          aliases: ['korrelacioni', 'i korreluar'],
        },
        {
          slug: 'idiosyncratic-risk',
          term: 'Rrezik specifik',
          definition:
            'Rreziku që i përket vetëm një kompanie dhe që mund të hiqet duke mbajtur shumë të tjera.',
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
          'Diversifikimi heq rrezikun specifik të kompanive. Në një krizë, arsyeja e rënies është e përbashkët për të gjitha, dhe atë rrezik ai nuk e prek.',
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
            'Vendosni 1.000 € me 7% në vit. Pas vitit të parë keni 1.070 €. Viti i dytë nuk fiton 7% mbi 1.000 €, por mbi 1.070 € — pra 74,90 € në vend të 70 €. Diferenca është vetëm pesë euro dhe duket e parëndësishme.',
            'Por ajo diferencë rritet vetë. Pas dhjetë vjetësh keni rreth 1.967 €. Pas njëzet vjetësh keni rreth 3.870 €. Njëzet vjet nuk ju dhanë dyfishin e dhjetë vjetëve, ju dhanë pothuajse katërfishin e fitimit.',
            'Kjo është e gjithë ideja: fitimi nuk shtohet, ai shumëzohet. Dhe shumëzimi bëhet i dhunshëm vetëm nga fundi.',
          ],
        },
        {
          heading: 'Pse fundi ka rëndësi më shumë se fillimi',
          paragraphs: [
            'Nëse investoni për tridhjetë vjet, më shumë se gjysma e parave përfundimtare vjen nga dhjetë vitet e fundit. Jo sepse ato vite ishin më të mira, por sepse në ato vite shuma mbi të cilën fitohet ishte më e madhe.',
            'Kjo ka një pasojë praktike të pakëndshme: ndërprerja e investimit afër fundit kushton shumë më tepër sesa vonesa e fillimit me një vit. Njerëzit e ndiejnë të kundërtën.',
            'Ka edhe një pasojë të këndshme: ju nuk keni nevojë për kthime spektakolare. Keni nevojë për kthime të zakonshme që nuk ndërpriten.',
          ],
        },
        {
          heading: 'Ana tjetër e medaljes',
          paragraphs: [
            'Kompozimi punon njësoj mirë kundër jush. Një tarifë vjetore prej 1,5% nuk ju kushton 1,5% — ju kushton 1,5% të përsëritur, mbi një shumë që do të ishte rritur.',
            'E njëjta gjë vlen për inflacionin. Nëse çmimet rriten 3% në vit, paratë nën dyshek humbasin gjysmën e fuqisë blerëse për njëzet e tre vjet, pa lëvizur asnjë shifër në llogari.',
            'Prandaj tarifat dhe inflacioni meritojnë vëmendjen që zakonisht u jepet zgjedhjes së aksioneve. Ato veprojnë çdo vit, pa u vënë re.',
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
            'Fitimi i kthimeve mbi kthimet e mëparshme, jo vetëm mbi shumën fillestare.',
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
            'Kthimi juaj pasi hiqet inflacioni — sa më shumë mund të blini në fakt.',
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
          'Çdo euro e marrë si tarifë është një euro që nuk fiton kurrë më. Kompozimi punon kundër jush me të njëjtën forcë.',
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
            'Një llogari kursimi ka një detyrë: paratë të jenë atje kur t’i kërkoni, me të njëjtën shifër. Ajo nuk ka për detyrë t’ju pasurojë, dhe nuk do t’ju pasurojë.',
            'Një portofol investimesh ka detyrën e kundërt: të rritet me kalimin e kohës, me kusht që të mos e prekni në momentin e gabuar. Ai nuk premton se do të jetë atje me të njëjtën shifër muajin e ardhshëm.',
            'Konfuzioni fillon kur njerëzit u kërkojnë të njëjtat para të bëjnë të dyja. Ato nuk mund. Prandaj hapi i parë nuk është zgjedhja e investimeve, por ndarja e parave sipas asaj se kur ju duhen.',
          ],
        },
        {
          heading: 'Fondi i emergjencës vjen i pari',
          paragraphs: [
            'Përpara çdo investimi vjen një sasi parash që mund t’i prekni menjëherë pa shitur asgjë. Rregulli i zakonshëm është tre deri në gjashtë muaj shpenzimesh, por numri i saktë ka më pak rëndësi se ekzistenca e tij.',
            'Arsyeja nuk është psikologjike, është matematikore. Pa atë rezervë, çdo problem i papritur ju detyron të shisni investimet — dhe problemet e papritura kanë zakonin e keq të përkojnë me tregje të dobëta.',
            'Një fond emergjence nuk është para të humbura që nuk fitojnë. Është ajo që ju lejon të mos shisni në momentin më të keq të mundshëm.',
          ],
        },
        {
          heading: 'Kur inflacioni e ndryshon llogarinë',
          paragraphs: [
            'Kursimi ndihet i sigurt sepse shifra nuk lëviz. Por fuqia blerëse e asaj shifre lëviz gjithmonë, dhe zakonisht poshtë.',
            'Nëse llogaria juaj paguan 2% dhe çmimet rriten 3%, ju po humbisni një përqind në vit me siguri të plotë. Është një humbje e ngadaltë dhe e padukshme, dhe pikërisht prandaj shpërfillet.',
            'Kjo nuk do të thotë që kursimi është gabim. Do të thotë që kursimi është i drejtë për një afat të shkurtër dhe i shtrenjtë për një afat të gjatë.',
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
            cost: 'Nuk ka kohë të rikuperohet një rënie',
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
            'Para të arritshme menjëherë, që një shpenzim i papritur të mos ju detyrojë të shisni investimet.',
          aliases: ['fondi i emergjencës'],
        },
        {
          slug: 'purchasing-power',
          term: 'Fuqi blerëse',
          definition:
            'Sa mund të blini në fakt me një shumë parash, jo sa është shifra.',
          aliases: ['fuqia blerëse'],
        },
        {
          slug: 'time-horizon',
          term: 'Afat kohor',
          definition:
            'Sa gjatë mund t’i lini paratë të pa prekura. Ai vendos se sa rrezik ka kuptim.',
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
          'Rreziku më i madh për një investim afatgjatë është të detyroheni ta shisni herët. Rezerva e heq atë detyrim.',
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
            'Ju nuk mund të telefononi bursën. Bursat pranojnë urdhra vetëm nga anëtarët e tyre, dhe një broker është ai anëtar. Kur shtypni «bli», brokeri e dërgon atë urdhër në një treg dhe ju kthen rezultatin.',
            'Në këmbim ai merr ose një komision fiks, ose një pjesë të spread-it, ose të dyja. Brokerët «pa komision» nuk punojnë falas — ata paguhen diku tjetër, zakonisht nga firmat që ekzekutojnë urdhrat tuaj.',
            'Kjo nuk është domosdoshmërisht keq, por ia vlen ta dini: nëse nuk e shihni tarifën, ajo nuk mungon, thjesht ka ndryshuar formë.',
          ],
        },
        {
          heading: 'Kush i zotëron aksionet',
          paragraphs: [
            'Në shumicën e vendeve, aksionet e blera përmes një brokeri mbahen në një llogari të ndarë nga asetet e vetë brokerit. Ligjërisht ato janë tuajat, jo të tijat, edhe pse emri në regjistër mund të jetë i një kujdestari.',
            'Kjo është arsyeja pse falimentimi i një brokeri nuk do të thotë automatikisht humbje e investimeve tuaja. Ato transferohen te një institucion tjetër.',
            'Ku ka rrezik real është nëse brokeri i ka përzier paratë e klientëve me të vetat — gjë që është e paligjshme dhe pikërisht ajo që rregullatorët kontrollojnë. Prandaj ka rëndësi që brokeri të jetë i licencuar në një juridiksion serioz.',
          ],
        },
        {
          heading: 'Llojet e urdhrave që do të takoni',
          paragraphs: [
            'Një urdhër tregu thotë «blije tani, me çfarëdo çmimi që gjendet». Ai ekzekutohet pothuajse gjithmonë, por në një treg të hollë çmimi mund të jetë më i keq se ai që patë.',
            'Një urdhër me limit thotë «blije vetëm nëse çmimi është nën këtë shifër». Ai ju mbron nga një ekzekutim i keq, por mund të mos ekzekutohet fare.',
            'Për blerje të vogla e të rregullta në aksione të mëdha, diferenca rrallë ka rëndësi. Për çdo gjë të hollë ose të luhatshme, urdhri me limit është zakonisht zgjedhja më e mençur.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'broker',
          term: 'Broker',
          definition:
            'Firma me anë të së cilës urdhrat tuaj arrijnë në një bursë.',
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
          'Tarifa nuk zhduket, ndryshon formë. Zakonisht ajo kalon në spread ose në pagesë nga firma që ekzekuton urdhrin tuaj.',
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
            'Nëse një fond merr 1% në vit, instinkti thotë se ju humbisni një përqind. Në një vit, po. Në njëzet vjet, jo — sepse çdo euro e marrë sivjet është një euro që nuk fiton kurrë më asgjë.',
            'Tarifa nuk merr vetëm paratë, merr edhe të gjithë rritjen e ardhshme të atyre parave. Prandaj efekti nuk është linear; ai zgjerohet me kohën, pikërisht si kompozimi, vetëm në drejtimin e kundërt.',
            'Kjo është arsyeja pse tarifat janë e vetmja gjë në investime që mund ta kontrolloni plotësisht dhe që ka ndikim të garantuar. Kthimet nuk i zgjidhni. Tarifat po.',
          ],
        },
        {
          heading: 'Tarifat që nuk i shihni',
          paragraphs: [
            'Raporti i shpenzimeve të fondit është ai që reklamohet, por rrallë është i vetmi. Ka tarifa platforme, tarifa transaksioni brenda vetë fondit, dhe kosto konvertimi valutor nëse blini diçka në një monedhë tjetër.',
            'Kostoja e konvertimit është ajo që harrohet më shpesh, dhe në disa platforma është më e madhe se të gjitha të tjerat bashkë. Një maržë prej 0,5% për blerje dhe 0,5% për shitje është një përqind i plotë i hequr nga xhepi juaj.',
            'Kur krahasoni dy produkte, mblidhini të gjitha. Numri i vetëm që ka rëndësi është sa ju mbetet, jo sa reklamohet.',
          ],
        },
        {
          heading: 'Kur ia vlen të paguash më shumë',
          paragraphs: [
            'Tarifa më e ulët nuk fiton gjithmonë. Një fond i lirë që ndjek gabimisht indeksin e tij mund t’ju kushtojë më shumë se një fond pak më i shtrenjtë që e ndjek saktë.',
            'Për tregje të vështira ose të vogla, ku blerja dhe shitja janë të kushtueshme, një menaxher kompetent mund ta justifikojë tarifën. Për indekset e mëdha dhe të lëngshme, historia tregon se rrallë e justifikon.',
            'Rregulli praktik: sa më standard të jetë ajo që blini, aq më pak duhet të pranoni të paguani për të.',
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
            'Tarifa vjetore e fondit, e shprehur si përqindje e asaj që mbani.',
          aliases: ['raporti i shpenzimeve'],
        },
        {
          slug: 'tracking-error',
          term: 'Gabim ndjekjeje',
          definition:
            'Sa larg ka mbetur një fond nga indeksi që premtoi të ndiqte.',
        },
        {
          slug: 'fx-spread',
          term: 'Maržë konvertimi',
          definition:
            'Kostoja e fshehur e shkëmbimit të monedhës kur blini diçka në një valutë tjetër.',
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
          'Tarifa merret çdo vit nga një shumë që do të ishte rritur. Mbi njëzet vjet ajo diferencë bëhet mijëra euro.',
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
      sq: 'Të gjitha fondet mbledhin para nga shumë njerëz. Ndryshimi është si i blini dhe kush vendos çfarë ka brenda.',
    },
    inOneSentence: {
      sq: 'Një fond është një grumbull i përbashkët parash i menaxhuar sipas një rregulli të deklaruar, dhe ai rregull është e vetmja gjë që ka vërtet rëndësi.',
    },
    body: {
      sq: [
        {
          heading: 'Aktiv apo pasiv',
          paragraphs: [
            'Një fond pasiv ka një rregull mekanik: mbaj gjithçka në këtë indeks, në këto përmasa. Askush nuk gjykon nëse një kompani është e mirë. Nëse ajo është në listë, ajo blihet.',
            'Një fond aktiv ka një person që vendos. Ai person përpiqet të blejë atë që do të rritet dhe të shmangë atë që do të bjerë, dhe paguhet për atë përpjekje.',
            'Të dyja janë legjitime. Por një fond aktiv duhet të tejkalojë indeksin e tij mjaftueshëm sa të mbulojë edhe tarifën e vet, çdo vit, thjesht për të dalë barazim. Kjo është një pengesë e vazhdueshme dhe shumica e fondeve nuk e kalojnë atë për periudha të gjata.',
          ],
        },
        {
          heading: 'ETF apo fond i përbashkët',
          paragraphs: [
            'Ky nuk është ndryshimi mes aktiv dhe pasiv — ka ETF aktivë dhe fonde të përbashkëta pasive. Është ndryshimi në mënyrën se si blini.',
            'Një ETF tregtohet në bursë gjatë gjithë ditës, si një aksion, dhe ju shihni çmimin në kohë reale. Një fond i përbashkët zakonisht blihet një herë në ditë, me një çmim të llogaritur pas mbylljes.',
            'Për një investitor afatgjatë kjo ka pak rëndësi praktike. Ajo që ka rëndësi është kostoja, çfarë mban fondi, dhe nëse mund ta blini lehtë nga vendi ku ndodheni.',
          ],
        },
        {
          heading: 'Akumulues apo shpërndarës',
          paragraphs: [
            'Kur kompanitë brenda fondit paguajnë dividendë, fondi duhet të vendosë çfarë të bëjë me ta. Një fond shpërndarës jua dërgon në llogari. Një fond akumulues i riinveston automatikisht.',
            'Nëse po ndërtoni për të ardhmen, akumuluesi është zakonisht më i thjeshtë: paratë rikthehen në punë pa asnjë veprim nga ana juaj, dhe pa kostot e riblerjes.',
            'Nëse ju duhen të ardhura tani, shpërndarësi ka kuptim. Zgjedhja varet nga qëllimi, jo nga cilësia — i njëjti fond shpesh ekziston në të dyja variantet.',
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
            'Një fond që kopjon një indeks pa gjykim njerëzor mbi kompanitë e veçanta.',
          aliases: ['fond indeksor', 'fondi pasiv'],
        },
        {
          slug: 'active-fund',
          term: 'Fond aktiv',
          definition:
            'Një fond ku një menaxher zgjedh investimet dhe paguhet për atë zgjedhje.',
          aliases: ['fondi aktiv', 'menaxhim aktiv'],
        },
        {
          slug: 'mutual-fund',
          term: 'Fond i përbashkët',
          definition:
            'Një fond që blihet drejtpërdrejt nga shoqëria, zakonisht me një çmim në ditë.',
        },
        {
          slug: 'distributing-fund',
          term: 'Fond shpërndarës',
          definition:
            'Një fond që jua paguan dividendët në para në vend që t’i riinvestojë.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse shumica e fondeve aktive nuk e mundin indeksin e tyre për periudha të gjata?',
        options: [
          'Sepse menaxherët nuk janë të aftë',
          'Sepse duhet ta tejkalojnë indeksin çdo vit sa për të mbuluar edhe tarifën e vet',
          'Sepse ligji i ndalon të mbajnë aksionet më të mira',
        ],
        answer: 1,
        explanation:
          'Tarifa është një pengesë e vazhdueshme. Mesatarisht menaxherët janë tregu, kështu që pas tarifës mbetet një rezultat nën treg.',
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
      sq: 'Pse pritja për momentin e duhur zakonisht kushton më shumë se rënia që po përpiqeni të shmangni.',
    },
    inOneSentence: {
      sq: 'Për të fituar nga koha e tregut duhet të keni të drejtë dy herë — kur dilni dhe kur ktheheni — dhe ditët më të mira vijnë grumbull me ato më të këqijat.',
    },
    body: {
      sq: [
        {
          heading: 'Problemi i dy vendimeve',
          paragraphs: [
            'Shitja para një rënieje duket si një vendim i vetëm i zgjuar. Nuk është. Është dy vendime: kur të dilni dhe kur të hyni përsëri.',
            'Pjesa e dytë është shumë më e vështirë. Kur tregu ka rënë tridhjetë përqind dhe lajmet janë të tmerrshme, blerja ndihet e çmendur. Pikërisht atëherë duhet vepruar.',
            'Në praktikë, shumica e njerëzve dalin afër fundit të rënies dhe kthehen pasi rikuperimi ka ndodhur tashmë. Rezultati është më i keq se të mos kishin bërë asgjë.',
          ],
        },
        {
          heading: 'Pse ditët më të mira janë të rrezikshme për t’i humbur',
          paragraphs: [
            'Kthimet e tregut nuk shpërndahen njëtrajtshëm. Një pjesë e madhe e fitimit të një dekade vjen nga një pjesë shumë e vogël e ditëve.',
            'Dhe ato ditë nuk shfaqen në qetësi. Ato grumbullohen pikërisht rreth ditëve më të këqija, mes paniku dhe rikuperimit. Kush del për të shmangur të këqijat, humbet zakonisht edhe të mirat.',
            'Kjo është arsyeja pse «të qëndrosh i investuar» nuk është këshillë përtacie. Është njohje e faktit që fitimet vijnë të grumbulluara dhe pa paralajmërim.',
          ],
        },
        {
          heading: 'Çfarë funksionon në vend të saj',
          paragraphs: [
            'Investimi i rregullt me shuma të njëjta heq nevojën për të gjykuar momentin. Kur çmimet janë të larta blini më pak njësi, kur janë të ulëta blini më shumë, dhe kjo ndodh automatikisht.',
            'Kjo nuk garanton një rezultat më të mirë se një investim i vetëm në momentin ideal. Asgjë nuk e mund momentin ideal. Ajo mbron nga momenti më i keq, i cili është shumë më i mundshëm.',
            'Ribalancimi një herë në vit bën punë të ngjashme: ju shet automatikisht atë që është rritur shumë dhe blen atë që ka mbetur prapa, pa ju kërkuar një parashikim.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Investoni 200 € çdo muaj për dhjetë vjet',
          body: 'Nuk keni marrë asnjë vendim për momentin. Keni blerë në çdo lloj tregu, të lartë e të ulët.',
        },
        {
          title: 'Tregu bie 30% në vitin e katërt',
          body: 'Kontributet tuaja të atij viti blejnë ndjeshëm më shumë njësi për të njëjtat 200 €.',
        },
        {
          title: 'Tregu rikuperohet në vitin e gjashtë',
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
            'Vendosja e së njëjtës shumë në intervale të rregullta, pavarësisht çmimit.',
          aliases: ['mesatarizim i kostos'],
        },
        {
          slug: 'rebalancing',
          term: 'Ribalancim',
          definition:
            'Kthimi i portofolit në përmasat e synuara duke shitur atë që u rrit dhe duke blerë atë që mbeti prapa.',
          aliases: ['ribalancimi'],
        },
        {
          slug: 'market-timing',
          term: 'Koha e tregut',
          definition:
            'Përpjekja për të dalë para një rënieje dhe për të hyrë para një rritjeje.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse dalja nga tregu para një rënieje është më e vështirë se sa duket?',
        options: [
          'Sepse shitja kushton shumë në komisione',
          'Sepse duhet të keni të drejtë edhe për momentin e kthimit, kur lajmet janë më të këqija',
          'Sepse brokerët nuk lejojnë shitje të shpejta',
        ],
        answer: 1,
        explanation:
          'Janë dy vendime, jo një. Pjesa e dytë kërkon të blini pikërisht kur gjithçka ndihet e pashpresë.',
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
      sq: 'Çfarë duhet vendosur para se të shtypni «bli» për herë të parë, në rendin e duhur.',
    },
    inOneSentence: {
      sq: 'Vendimi i parë nuk është çfarë të blini, por a duhet të investoni fare këto para tani.',
    },
    body: {
      sq: [
        {
          heading: 'Rendi që ka rëndësi',
          paragraphs: [
            'Përpara investimit vijnë tre gjëra: borxhi i shtrenjtë i paguar, një rezervë emergjence e ndërtuar, dhe një afat i qartë për paratë që mbeten.',
            'Borxhi me interes të lartë është investimi më i mirë i garantuar që do të gjeni. Shlyerja e një karte krediti me 18% është një kthim 18% pa asnjë rrezik. Asnjë aksion nuk e premton dot atë.',
            'Vetëm pasi këto tre janë në rregull, pyetja «çfarë të blej» bëhet e dobishme. Para tyre ajo është shpërqendrim.',
          ],
        },
        {
          heading: 'Pse i pari duhet të jetë i mërzitshëm',
          paragraphs: [
            'Investimi i parë ka një detyrë që nuk ka lidhje me kthimin: t’ju mësojë se si ndihet të mbash diçka që lëviz, pa ju shkatërruar nëse ndiheni keq.',
            'Prandaj një fond i gjerë e i lirë indeksor është pikënisja e zakonshme. Jo sepse është më fitimprurës, por sepse gabimet që mund të bëni me të janë të vogla dhe të riparueshme.',
            'Aksionet individuale, kriptomonedhat dhe produktet me levë mund të vijnë më vonë, kur të keni një bazë dhe një ide të qartë se sa jeni gati të humbisni.',
          ],
        },
        {
          heading: 'Gabimet që bëjnë të gjithë',
          paragraphs: [
            'I pari është kontrollimi i çmimit çdo ditë. Kjo nuk ndryshon asgjë përveç mundësisë që të veproni në panik. Një portofol afatgjatë nuk ka nevojë të shihet më shumë se disa herë në vit.',
            'I dyti është ndjekja e asaj që sapo u rrit shumë. Kur diçka është në të gjitha titujt, çmimi tashmë e përmban atë vëmendje.',
            'I treti është ndryshimi i planit sa herë ndryshon humori. Një plan mesatar i ndjekur për dhjetë vjet mund të japë më shumë se një plan i shkëlqyer i braktisur pas gjashtë muajsh.',
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
          term: 'Shpërndarje aktivesh',
          definition:
            'Si i ndani paratë mes llojeve të investimeve. Vendimi që shpjegon pjesën më të madhe të rezultatit tuaj.',
        },
        {
          slug: 'risk-tolerance',
          term: 'Toleranca ndaj rrezikut',
          definition:
            'Sa rënie mund të duroni pa ndryshuar plan. Matet me sjelljen, jo me dëshirën.',
        },
        {
          slug: 'portfolio',
          term: 'Portofol',
          definition: 'Gjithçka që zotëroni, e parë si një e tërë e vetme.',
          aliases: ['portofoli'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Keni një kartë krediti me 18% interes dhe 1.000 € për të investuar. Cila është zgjedhja më e mirë?',
        options: [
          'Investojini në një fond indeksor me kthim të pritur 7%',
          'Shlyeni kartën e kreditit',
          'Ndajini përgjysmë',
        ],
        answer: 1,
        explanation:
          'Shlyerja e një borxhi me 18% është një kthim 18% i garantuar. Asnjë investim nuk e ofron atë pa rrezik.',
      },
    },
    upNextSlugs: ['what-is-an-etf', 'saving-vs-investing'],
  },
];
