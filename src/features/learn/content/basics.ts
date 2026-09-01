import type { SeedLesson, SeedTopic } from './types';

export const BASICS_TOPIC: SeedTopic = {
  id: 'basics',
  title: { sq: 'Bazat', en: 'The Basics' },
  slugs: {
    sq: [
      'cka-eshte-aksioni',
      'si-funksionon-tregu-aksioneve',
      'cka-eshte-etf',
      'rreziku-dhe-kthimi',
      'pse-funksionon-diversifikimi',
      'cka-eshte-kompozimi',
      'kursim-apo-investim',
      'si-funksionon-llogaria-brokerimit',
      'tarifat-qe-ndryshojne-gjithcka',
      'cka-eshte-nje-fond',
      'koha-ne-treg',
      'njeqind-eurot-e-para',
    ],
    en: [
      'what-is-a-share',
      'how-the-stock-market-works',
      'what-is-an-etf',
      'risk-and-return',
      'why-diversification-works',
      'what-is-compounding',
      'saving-or-investing',
      'how-a-brokerage-account-works',
      'the-fees-that-change-everything',
      'what-is-a-fund',
      'time-in-the-market',
      'your-first-hundred-euros',
    ],
  },
};

export const BASICS_LESSONS: SeedLesson[] = [
  {
    id: 'what-is-a-share-really',
    slug: { sq: 'cka-eshte-aksioni', en: 'what-is-a-share' },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çfarë është në të vërtetë një aksion?',
      en: 'What is a share, really?',
    },
    summary: {
      sq: 'Jo një biletë llotarie, por një pjesë e vogël pronësie në një biznes të vërtetë.',
      en: 'Not a lottery ticket, but a small piece of ownership in a real business.',
    },
    inOneSentence: {
      sq: 'Një aksion është një pjesë e vogël e pronësisë së një kompanie, dhe vlera e tij varet nga sa para pritet të fitojë ajo kompani.',
      en: 'A share is a small piece of ownership in a company, and its value depends on how much money that company is expected to earn.',
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
      en: [
        {
          heading: 'Ownership, not a bet',
          paragraphs: [
            'When you buy a share, you are not betting that a number will go up. You are buying a small piece of a business: its factories, its brands, its contracts, and your claim on a slice of its future profits. If a company has a hundred million shares and you own a hundred of them, one millionth of that company belongs to you.',
            'That piece is small, but it is real. You have the right to vote at the annual meeting. If the company pays dividends, you get your share. If it gets bought, you get your share of the price. Nobody can take that piece away from you — only you can, by selling it.',
            "This is why the first question about any share is not 'will it go up?' but 'is this a good business?'. Over time, the second answers the first on its own. The first without the second is just a bet.",
          ],
        },
        {
          heading: 'Where the price comes from',
          paragraphs: [
            "A share's price is not set by the company. It is set by the people buying and selling that share today, and they buy and sell based on what they think the company will earn tomorrow.",
            'That is how a company can announce record profits and watch its share fall. If the market expected even bigger profits, the good news was already baked into the price, and reality came in below expectations. The price moves on the gap between what happened and what was expected to happen.',
            'This is the most counterintuitive part of markets, and it is worth remembering: prices do not react to news, they react to surprises.',
          ],
        },
        {
          heading: 'Why it exists at all',
          paragraphs: [
            'Companies sell shares because they need money now. A company that wants to build a factory can borrow from a bank, or it can sell people pieces of itself. A loan has to be repaid with interest. Shares never have to be repaid.',
            'In exchange, shareholders get a piece of the ownership and of the future profits. It is a trade: the company gets capital without debt, and the investor gets a share of whatever that capital builds.',
            "Seen this way, the stock market is not a casino built on top of the economy. It is the mechanism through which people's savings reach the businesses that need them.",
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
      en: [
        {
          slug: 'share',
          term: 'Share',
          definition:
            'A unit of ownership in a company, giving you a claim on a slice of its profits.',
          aliases: ['shares', 'stock'],
        },
        {
          slug: 'shareholder',
          term: 'Shareholder',
          definition: 'Anyone who owns at least one share of a company.',
          aliases: ['shareholders'],
        },
        {
          slug: 'market-capitalisation',
          term: 'Market capitalisation',
          definition:
            "A share's price multiplied by the number of shares — the market's valuation of the whole company.",
          aliases: ['market cap'],
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
      en: {
        question:
          'A company announces the highest profits in its history and the share falls 5%. What is the most likely explanation?',
        options: [
          'The market got it wrong and will correct itself tomorrow',
          'Investors were expecting even higher profits',
          'High profits are always bad news for shareholders',
        ],
        answer: 1,
        explanation:
          'Prices move on surprises, not news. If more was expected, the good result was already in the price.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['si-funksionon-tregu-aksioneve', 'cka-eshte-etf'],
      en: ['how-the-stock-market-works', 'what-is-an-etf'],
    },
  },

  {
    id: 'how-does-the-stock-market-work',
    slug: {
      sq: 'si-funksionon-tregu-aksioneve',
      en: 'how-the-stock-market-works',
    },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Si funksionon tregu i aksioneve?',
      en: 'How does the stock market work?',
    },
    summary: {
      sq: 'Kush është në anën tjetër të blerjes suaj, dhe si vendoset në të vërtetë një çmim.',
      en: 'Who is on the other side of your purchase, and how a price actually gets set.',
    },
    inOneSentence: {
      sq: 'Një treg aksionesh është një listë e vazhdueshme ofertash për të blerë dhe për të shitur, dhe çmimi është thjesht vendi ku të dyja u takuan për herë të fundit.',
      en: 'A stock market is a running list of offers to buy and offers to sell, and the price is simply where the two last met.',
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
      en: [
        {
          heading: 'Two lists, not one price',
          paragraphs: [
            "Picture a market where one side writes 'I'll pay up to €100 for a share' and the other writes 'I won't sell for less than €101'. Nobody moves. There is no trade and no new price.",
            "Then someone agrees to pay €101. That trade happens, and €101 becomes the 'last price' you see on the screen. The price is not some official valuation. It is simply the amount two parties agreed on, the last second anyone agreed.",
            "That is the difference between the ask price, the bid price, and the last price. When you read 'the S&P 500 is at 6,400', you are reading a summary of the most recent trades, not a judgement of what those companies are worth.",
          ],
        },
        {
          heading: 'Who is on the other side',
          paragraphs: [
            'When you buy, someone is selling. Often it is not a person who thinks you are wrong — it is a pension fund rebalancing, someone paying for a house, or a market maker earning the gap between buying and selling.',
            'Those market makers are the reason you can buy instantly. They always keep both a buy offer and a sell offer open, and earn a few cents on the difference. In exchange, you never have to wait for a genuine buyer to show up.',
            'That difference is called the spread. On a large, heavily traded share it is tiny. On a small, forgotten one it can be several percent — a hidden cost you pay every time you get in or out.',
          ],
        },
        {
          heading: 'Why market hours exist',
          paragraphs: [
            'Exchanges keep opening hours because liquidity thrives on concentration. If everyone buys and sells during the same hours, there is always someone on the other side, and the spread stays narrow.',
            'When the market is closed, the news does not stop. That is why a share can open noticeably higher or lower than where it closed — all of the overnight news gets squeezed into the first price of the morning.',
            "This is why professionals talk about 'the open' and 'the close' as special moments. They are the two points in the day where most of the attention and most of the volume meet at once.",
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
      en: [
        {
          slug: 'bid-ask-spread',
          term: 'Spread',
          definition:
            'The gap between the highest price someone will pay and the lowest price someone will accept.',
          aliases: ['bid-ask spread'],
        },
        {
          slug: 'liquidity',
          term: 'Liquidity',
          definition:
            'How easily you can buy or sell without moving the price yourself.',
          aliases: ['liquid'],
        },
        {
          slug: 'market-maker',
          term: 'Market maker',
          definition:
            'A firm that always keeps both a buy offer and a sell offer open, so you can buy or sell instantly.',
          aliases: ['market makers'],
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
      en: {
        question:
          'Why does a small, thinly traded share cost you more to buy and sell than a large one?',
        options: [
          'Because broker commissions are higher on small shares',
          'Because the spread between buying and selling is wider',
          'Because taxes on small shares are higher',
        ],
        answer: 1,
        explanation:
          'With few buyers and sellers, the gap between offers widens — and you pay that gap every time you get in or out.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: {
      sq: ['cka-eshte-etf', 'si-levizin-cmimet-e-aksioneve'],
      en: ['what-is-an-etf', 'how-share-prices-move'],
    },
  },

  {
    id: 'what-is-an-etf',
    slug: { sq: 'cka-eshte-etf', en: 'what-is-an-etf' },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Çfarë është një ETF?',
      en: 'What is an ETF?',
    },
    summary: {
      sq: 'Një fond që mban shumë kompani njëherësh, i blerë dhe i shitur si një aksion i vetëm.',
      en: 'A fund that holds many companies at once, bought and sold like a single share.',
    },
    inOneSentence: {
      sq: 'Një ETF është një shportë investimesh që e blini me një klikim, dhe çmimi i tij lëviz me vlerën e gjithçkaje brenda saj.',
      en: 'An ETF is a basket of investments you buy in one click, and its price moves with the value of everything inside it.',
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
      en: [
        {
          heading: 'How an ETF works',
          paragraphs: [
            'A fund manager buys a pool of assets — say, shares in the 500 largest American companies — and then splits ownership of that pool into small units. Each unit is a share of the ETF, and it trades on an exchange like any other share.',
            'When you buy one unit, you own a tiny slice of all 500 companies. You never had to choose between them, or place 500 separate orders.',
            "That is the whole point. The heavy lifting — buying, holding, and rebalancing hundreds of positions — is done once by the fund, and you pay a small annual fee so you don't have to do it yourself.",
          ],
        },
        {
          heading: 'Where it can go wrong',
          paragraphs: [
            'Diversification lowers the risk that a single company sinks you. It does not protect you from a whole market falling — in a broad sell-off, almost everything in the basket falls together.',
            "Narrow ETFs also defeat the purpose. A fund that holds only one industry can be almost as concentrated as picking stocks one by one. 'ETF' does not automatically mean 'diversified'.",
            "Even the name can mislead you. A 'global technology' ETF can have half its money in five American companies. What you actually bought is in the list of holdings, not in the name.",
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
      en: [
        {
          title: 'Invest €100 in an S&P 500 ETF',
          body: 'About €7 of it goes to Apple, €6 to NVIDIA, and small amounts to the other 498 companies.',
        },
        {
          title: 'One company has a terrible year',
          body: 'If it falls 50%, your €100 loses about €1. Had you put everything into that single company, you would be down €50.',
        },
        {
          title: 'The index rises 8% over the year',
          body: "Your holding is worth about €108, minus the fund's small annual fee. That fee is the second thing worth checking.",
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
      en: {
        heading: 'The costs to check',
        columns: ['Fund type', 'Typical fee', 'Cost on €10,000 / year'],
        rows: [
          {
            label: 'Broad index ETF',
            value: '0.07%',
            cost: '€7',
            tone: 'positive',
          },
          { label: 'Sector or thematic ETF', value: '0.45%', cost: '€45' },
          {
            label: 'Actively managed fund',
            value: '1.20%',
            cost: '€120',
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
      en: [
        {
          slug: 'index',
          term: 'Index',
          definition:
            'A published list of companies used to measure a market, like the S&P 500.',
          aliases: ['indexes', 'indices'],
        },
        {
          slug: 'expense-ratio',
          term: 'Expense ratio',
          definition:
            "The fund's annual fee, taken automatically out of what you hold.",
          aliases: ['annual fee'],
        },
        {
          slug: 'diversification',
          term: 'Diversification',
          definition:
            'Spreading money across many assets so no single one decides your fate.',
          aliases: ['diversified', 'diversify'],
        },
        {
          slug: 'accumulating-fund',
          term: 'Accumulating fund',
          definition:
            'A fund that reinvests your dividends instead of paying them out in cash.',
          aliases: ['accumulating funds'],
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
      en: {
        question:
          'You own a broad index ETF and one company inside it falls 40%. Roughly what happens to your holding?',
        options: [
          'It also falls about 40%',
          'It falls much less than 1%',
          'It does not change at all',
        ],
        answer: 1,
        explanation:
          'In an index with hundreds of companies, each takes up a small slice — a 40% drop in one moves the whole by only a few tenths of a percent.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: {
      sq: ['cka-eshte-nje-fond', 'tarifat-qe-ndryshojne-gjithcka'],
      en: ['what-is-a-fund', 'the-fees-that-change-everything'],
    },
  },

  {
    id: 'risk-and-return',
    slug: { sq: 'rreziku-dhe-kthimi', en: 'risk-and-return' },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Rreziku dhe kthimi, me shembuj të përditshëm',
      en: 'Risk and return, in everyday examples',
    },
    summary: {
      sq: 'Pse asgjë nuk paguan shumë pa kërkuar diçka në këmbim, dhe si ta matni atë diçka.',
      en: 'Why nothing pays well without asking for something in return, and how to measure that something.',
    },
    inOneSentence: {
      sq: 'Kthimi më i lartë është çmimi që tregu ju paguan për të duruar një rezultat më të pasigurt.',
      en: 'A higher return is the price the market pays you for putting up with a more uncertain outcome.',
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
      en: [
        {
          heading: 'Risk does not mean loss',
          paragraphs: [
            "In everyday language, 'risk' means 'a chance that something goes wrong'. In investing it has a narrower meaning: how far the result can land from what you expect, in either direction.",
            'A savings account paying 2% has close to zero risk: you know what you will get. A single stock can do +60% or −40% within a year. The same amount invested, two completely different worlds of possibility.',
            "That is why the question 'how much risk should I take?' has no universal answer. It depends on how wide you can let the outcome swing before it wrecks your plans.",
          ],
        },
        {
          heading: 'The time horizon changes everything',
          paragraphs: [
            'Money you need next year and money you need in twenty years are not the same thing, even if they sit in the same account.',
            "For next year's money, volatility is a real problem: if the market drops 30% right when you need it, you make that loss real. You have no time to wait.",
            'For twenty-year money, the same swing is mostly noise. Historically, the longer the holding period, the narrower the range of outcomes — not because risk disappears, but because good years and bad years have time to average out.',
          ],
        },
        {
          heading: 'The risk that does not pay',
          paragraphs: [
            'There is an important rule here: the market rewards you for the risks you cannot avoid, not for the ones you can.',
            'If you hold a single stock and it goes bankrupt, you lose everything. But the market does not pay you extra for taking that risk, because you could have removed it for free by holding a hundred companies instead of one.',
            'That is why diversification is sometimes called the only free lunch in finance. It removes one kind of risk without costing you any of the expected return.',
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
      en: {
        heading: 'The same amount, three different paths',
        columns: [
          'Where you put it',
          'Typical annual return',
          'Worst year on record',
        ],
        rows: [
          {
            label: 'Savings account',
            value: '2%',
            cost: '0%',
            tone: 'positive',
          },
          { label: 'Broad stock index', value: '7%', cost: '−37%' },
          {
            label: 'A single stock',
            value: 'unpredictable',
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
      en: [
        {
          slug: 'volatility',
          term: 'Volatility',
          definition:
            'How much a price swings up and down. High volatility means a wider range of outcomes.',
          aliases: ['volatile'],
        },
        {
          slug: 'expected-return',
          term: 'Expected return',
          definition:
            'The average result you would expect if you repeated the same investment many times.',
          aliases: ['expected returns'],
        },
        {
          slug: 'drawdown',
          term: 'Drawdown',
          definition:
            'How far an investment fell from its own peak before recovering.',
          aliases: ['drawdowns', 'maximum drawdown'],
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
      en: {
        question:
          "Why doesn't the market pay you an extra return for holding one stock instead of a hundred?",
        options: [
          'Because single stocks always have lower returns',
          'Because that risk can be removed for free through diversification',
          'Because regulators forbid it',
        ],
        answer: 1,
        explanation:
          'Only the risks you cannot avoid get rewarded. Single-company risk disappears when you hold many of them, at no cost.',
      },
    },
    upNextSlugs: {
      sq: ['pse-funksionon-diversifikimi', 'koha-ne-treg'],
      en: ['why-diversification-works', 'time-in-the-market'],
    },
  },
  {
    id: 'why-diversification-works',
    slug: {
      sq: 'pse-funksionon-diversifikimi',
      en: 'why-diversification-works',
    },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Pse funksionon diversifikimi',
      en: 'Why diversification works',
    },
    summary: {
      sq: 'Shpërndarja e parave nuk ul kthimin e pritur, por ngushton gamën e rezultateve.',
      en: 'Spreading your money does not lower the expected return — it narrows the range of outcomes.',
    },
    inOneSentence: {
      sq: 'Duke mbajtur shumë gjëra që nuk lëvizin njësoj, ju hiqni rrezikun e një katastrofe të vetme pa hequr fitimin mesatar.',
      en: 'By holding many things that do not move together, you remove the risk of a single catastrophe without removing the average gain.',
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
      en: [
        {
          heading: 'Two risks, not one',
          paragraphs: [
            'Every stock carries two kinds of risk. The first belongs to that company alone: a product recall, a weak CEO, a competitor inventing something better. The second is shared by all of them: a recession, a war, a big shift in interest rates.',
            'Diversification removes the first and leaves the second untouched. If you hold a hundred companies, one going bankrupt costs you one percent. But if the whole market falls thirty percent, you fall thirty percent too — inside the stock market, there was nowhere to hide.',
            'So diversification is not a shield against loss. It is a shield against losing for the wrong reason.',
          ],
        },
        {
          heading: 'Why it costs nothing',
          paragraphs: [
            'This is the part that surprises people. If you hold a hundred companies instead of one, your expected return does not drop. You get the average of all hundred, and that average is exactly what the market delivers.',
            'What drops is the spread around that average. With a single company, you might quadruple your money or lose it all. With a hundred, both extremes vanish and you stay close to the average.',
            'It is a trade where one side is free: you give up the bad tail and the good tail, but the middle stays where it was. That is why it is sometimes called the only free lunch in finance.',
          ],
        },
        {
          heading: 'When it stops working',
          paragraphs: [
            'Diversification rests on one assumption: that the things you hold do not all fall at once. When that assumption breaks, the protection disappears exactly when you need it most.',
            'In major crises, correlations head towards one. Stocks that usually moved independently start falling together, because the cause of the fall has nothing to do with any of them — it is about money fleeing risk in general.',
            'That does not make diversification worthless. It makes it a tool for everyday risk, not an umbrella for the storm.',
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
      en: [
        {
          title: 'A hundred thousand euros in one company',
          body: 'If that company goes bankrupt, you are left with zero. It does not matter how good your reasoning was.',
        },
        {
          title: 'A hundred thousand euros in a hundred companies',
          body: 'The same bankruptcy costs you a thousand euros. All hundred would have to fail for you to be left with zero.',
        },
        {
          title: 'The average return in both cases',
          body: 'The same. Diversification cost you nothing to remove that risk.',
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
      en: [
        {
          slug: 'correlation',
          term: 'Correlation',
          definition:
            'How often two investments move in the same direction. Low correlation is what makes diversification work.',
          aliases: ['correlated', 'correlations'],
        },
        {
          slug: 'idiosyncratic-risk',
          term: 'Idiosyncratic risk',
          definition:
            'The risk that belongs to a single company, removed by holding many others.',
          aliases: ['company-specific risk'],
        },
        {
          slug: 'systematic-risk',
          term: 'Systematic risk',
          definition:
            'The risk that hits everything at once and that diversification cannot remove.',
          aliases: ['market risk'],
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
      en: {
        question:
          'During a severe crisis, your diversified portfolio falls almost as much as a single stock. Why?',
        options: [
          'The diversification was done wrong',
          'Correlations rise in crises and everything falls together',
          'Diversification only works over twenty years',
        ],
        answer: 1,
        explanation:
          'Diversification removes company-specific risk. In a crisis, the cause of the fall is shared by all of them, and that risk it cannot touch.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: {
      sq: ['cka-eshte-nje-fond', 'cka-eshte-kompozimi'],
      en: ['what-is-a-fund', 'what-is-compounding'],
    },
  },

  {
    id: 'what-is-compounding',
    slug: { sq: 'cka-eshte-kompozimi', en: 'what-is-compounding' },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Kompozimi: pse koha bën punën e rëndë',
      en: 'Compounding: why time does the heavy lifting',
    },
    summary: {
      sq: 'Fitimi mbi fitimin e mëparshëm është arsyeja pse njëzet vjet nuk janë dyfishi i dhjetë vjetëve.',
      en: 'Earning on your earlier earnings is the reason twenty years is not just double ten.',
    },
    inOneSentence: {
      sq: 'Kompozimi do të thotë se fitimet tuaja fillojnë vetë të fitojnë, dhe efekti rritet gjithnjë e më shpejt sa më gjatë ta lini.',
      en: 'Compounding means your gains start earning gains of their own, and the effect grows faster and faster the longer you leave it.',
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
      en: [
        {
          heading: 'The simple arithmetic behind it',
          paragraphs: [
            'You put in €1,000 at 7% a year. After the first year you have €1,070. The second year does not earn 7% on €1,000, but on €1,070 — so €74.90 instead of €70. The difference is only five euros and looks like nothing.',
            'But that difference feeds on itself. After ten years you have about €1,967. After twenty years, about €3,870. Twenty years did not give you double what ten years did — it gave you nearly four times the gain.',
            'That is the whole idea: gains do not add up, they multiply. And the multiplication only becomes dramatic towards the end.',
          ],
        },
        {
          heading: 'Why the end matters more than the beginning',
          paragraphs: [
            'If you invest for thirty years, more than half of the money at the end comes from the last ten years. Not because those years were better, but because in those years the amount doing the earning was bigger.',
            'This has an uncomfortable practical consequence: stopping near the end costs far more than starting a year late. People feel it the other way around.',
            'It also has a good one: you do not need spectacular returns. You need ordinary returns that never get interrupted.',
          ],
        },
        {
          heading: 'The other side of the coin',
          paragraphs: [
            'Compounding works just as well against you. An annual fee of 1.5% does not cost you 1.5% — it costs you 1.5% repeated every year, on money that would have kept growing.',
            'The same goes for inflation. If prices rise 3% a year, money under the mattress loses half its buying power in twenty-three years, without a single digit changing in the account.',
            'That is why fees and inflation deserve the attention usually given to picking stocks. They work every year, unnoticed.',
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
      en: {
        heading: '€10,000 at 7% a year',
        columns: ['After', 'Value', 'Earned during that decade'],
        rows: [
          { label: '10 years', value: '€19,670', cost: '€9,670' },
          { label: '20 years', value: '€38,700', cost: '€19,030' },
          {
            label: '30 years',
            value: '€76,120',
            cost: '€37,420',
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
      en: [
        {
          slug: 'compounding',
          term: 'Compounding',
          definition:
            'Earning returns on your previous returns, not just on the amount you started with.',
          aliases: ['compound interest', 'compound growth'],
        },
        {
          slug: 'annualised-return',
          term: 'Annualised return',
          definition:
            'The steady yearly rate that would have produced the same final result.',
          aliases: ['annualized return'],
        },
        {
          slug: 'real-return',
          term: 'Real return',
          definition:
            'Your return after inflation is stripped out — how much more you can actually buy.',
          aliases: ['real returns'],
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
      en: {
        question:
          'Why does a 1.5% annual fee cost you much more than 1.5% of your money over thirty years?',
        options: [
          'Because fees increase every year',
          'Because it is taken every year from money that would have compounded',
          'Because fees are taxed twice',
        ],
        answer: 1,
        explanation:
          'Every euro taken as a fee is a euro that never earns anything again. Compounding works against you with the same force.',
      },
    },
    upNextSlugs: {
      sq: ['tarifat-qe-ndryshojne-gjithcka', 'koha-ne-treg'],
      en: ['the-fees-that-change-everything', 'time-in-the-market'],
    },
  },

  {
    id: 'saving-vs-investing',
    slug: { sq: 'kursim-apo-investim', en: 'saving-or-investing' },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Kursim apo investim?',
      en: 'Saving or investing?',
    },
    summary: {
      sq: 'Të dyja janë të nevojshme, por për punë të ndryshme dhe për afate të ndryshme.',
      en: 'You need both, but for different jobs and different timeframes.',
    },
    inOneSentence: {
      sq: 'Kursimi mbron paratë që ju duhen së shpejti; investimi rrit paratë që nuk ju duhen për vite me radhë.',
      en: "Saving protects the money you need soon; investing grows the money you won't need for years.",
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
      en: [
        {
          heading: 'Two different jobs',
          paragraphs: [
            'A savings account has one job: the money is there when you ask for it, with the same number on it. Making you rich is not its job, and it will not do it.',
            'An investment portfolio has the opposite job: to grow over time, provided you do not touch it at the wrong moment. It makes no promise that next month it will still show the same number.',
            'The trouble starts when people ask the same money to do both jobs. It cannot. So the first step is not choosing investments — it is sorting your money by when you will need it.',
          ],
        },
        {
          heading: 'The emergency fund comes first',
          paragraphs: [
            'Before any investing comes a pot of money you can reach instantly without selling anything. The usual rule is three to six months of expenses, but the exact figure matters less than the fact that it exists.',
            'The reason is not psychological, it is mathematical. Without that reserve, every unexpected problem forces you to sell your investments — and unexpected problems have a nasty habit of arriving exactly when markets are weak.',
            'An emergency fund is not dead money earning nothing. It is what lets you avoid selling at the worst possible moment.',
          ],
        },
        {
          heading: 'When inflation changes the maths',
          paragraphs: [
            'Saving feels safe because the number never moves. But the buying power of that number moves constantly, and usually downwards.',
            'If your account pays 2% and prices rise 3%, you are losing one percent a year, with complete certainty. It is a slow, invisible loss, and that is exactly why it goes unnoticed.',
            'This does not mean saving is a mistake. It means saving is right for the short term and expensive for the long term.',
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
      en: {
        heading: 'Which money goes where',
        columns: ['When you need it', 'Where it should be', 'Why'],
        rows: [
          {
            label: 'This month',
            value: 'Current account',
            cost: 'It has to be reachable today',
            tone: 'positive',
          },
          {
            label: 'Within three years',
            value: 'Savings or a deposit',
            cost: 'No time to recover from a fall',
          },
          {
            label: 'Ten years from now',
            value: 'Broad investments',
            cost: 'Time smooths out the swings',
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
      en: [
        {
          slug: 'emergency-fund',
          term: 'Emergency fund',
          definition:
            'Money you can reach instantly, so an unexpected expense never forces you to sell your investments.',
          aliases: ['emergency savings', 'rainy day fund'],
        },
        {
          slug: 'purchasing-power',
          term: 'Purchasing power',
          definition:
            'What an amount of money can actually buy, not what the number says.',
          aliases: ['buying power'],
        },
        {
          slug: 'time-horizon',
          term: 'Time horizon',
          definition:
            'How long you can leave the money untouched. It decides how much risk makes sense.',
          aliases: ['investment horizon'],
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
      en: {
        question:
          'Why does an emergency fund make your long-term investing safer?',
        options: [
          'Because an emergency fund earns more than stocks',
          'Because it lets you avoid selling your investments at a bad moment',
          'Because regulators require it',
        ],
        answer: 1,
        explanation:
          'The biggest risk to a long-term investment is being forced to sell it early. The reserve removes that pressure.',
      },
    },
    upNextSlugs: {
      sq: ['si-funksionon-llogaria-brokerimit', 'njeqind-eurot-e-para'],
      en: ['how-a-brokerage-account-works', 'your-first-hundred-euros'],
    },
  },

  {
    id: 'how-a-brokerage-account-works',
    slug: {
      sq: 'si-funksionon-llogaria-brokerimit',
      en: 'how-a-brokerage-account-works',
    },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Si funksionon një llogari brokerimi',
      en: 'How a brokerage account works',
    },
    summary: {
      sq: 'Kush i mban në fakt aksionet tuaja, dhe çfarë ndodh nëse brokeri falimenton.',
      en: 'Who actually holds your shares, and what happens if the broker goes bust.',
    },
    inOneSentence: {
      sq: 'Brokeri është dera nga ku kalojnë urdhrat tuaj, por aksionet mbahen të ndara nga paratë e vetë brokerit.',
      en: "The broker is the door your orders pass through, but your shares are kept separate from the broker's own money.",
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
      en: [
        {
          heading: 'What a broker actually does',
          paragraphs: [
            "You cannot phone the stock exchange yourself. Exchanges only accept orders from their own members, and the broker is that member. When you press 'buy', the broker routes your order to a market and brings you back the result.",
            "In exchange it takes either a fixed commission, a slice of the spread, or both. 'Commission-free' brokers do not work for free — they get paid elsewhere, usually by the firms that execute your orders.",
            'That is not necessarily bad, but it is worth knowing: if you cannot see the fee, it is not missing — it has just changed shape.',
          ],
        },
        {
          heading: 'Who owns the shares',
          paragraphs: [
            "In most countries, shares bought through a broker are held in an account separate from the broker's own assets. Legally they are yours, not the broker's, even though the name on the register may be a custodian's.",
            'That is why a broker going bankrupt does not automatically mean you lose your investments. They get transferred to another institution.',
            'The real risk is a broker mixing client money with its own — which is illegal, and exactly what regulators check for. That is why it matters that your broker is licensed in a serious jurisdiction.',
          ],
        },
        {
          heading: 'The order types you will meet',
          paragraphs: [
            "A market order says 'buy it now, at whatever price is available'. It almost always executes, but in a thin market the price can turn out worse than the one you saw.",
            "A limit order says 'buy it only if the price is below this number'. It protects you from a bad fill, but it may never execute at all.",
            'For small, regular purchases of large stocks, the difference rarely matters. For anything illiquid or volatile, the limit order is usually the smarter choice.',
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
      en: [
        {
          slug: 'broker',
          term: 'Broker',
          definition: 'The firm through which your orders reach the exchange.',
          aliases: ['brokers', 'brokerage'],
        },
        {
          slug: 'custodian',
          term: 'Custodian',
          definition:
            'The institution that physically or legally holds the securities in your name.',
          aliases: ['custodians'],
        },
        {
          slug: 'limit-order',
          term: 'Limit order',
          definition:
            'An order that only executes at the price you set, or better.',
          aliases: ['limit orders'],
        },
        {
          slug: 'market-order',
          term: 'Market order',
          definition:
            'An order that executes immediately at the best available price.',
          aliases: ['market orders'],
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
      en: {
        question: "Why is a 'commission-free' broker not really free?",
        options: [
          'Because it hides monthly fees in the contract',
          'Because it gets paid elsewhere, usually through order execution',
          'Because the commission is only charged when you sell',
        ],
        answer: 1,
        explanation:
          'The fee does not disappear, it just changes shape. It usually moves into the spread or into payments from the firm executing your order.',
      },
    },
    upNextSlugs: {
      sq: ['njeqind-eurot-e-para', 'tarifat-qe-ndryshojne-gjithcka'],
      en: ['your-first-hundred-euros', 'the-fees-that-change-everything'],
    },
  },

  {
    id: 'fees-that-change-everything',
    slug: {
      sq: 'tarifat-qe-ndryshojne-gjithcka',
      en: 'the-fees-that-change-everything',
    },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Tarifat: numri i vogël që ndryshon gjithçka',
      en: 'Fees: the small number that changes everything',
    },
    summary: {
      sq: 'Si një tarifë 1% në vit kompozohet në një diferencë shumë më të madhe gjatë njëzet vjetësh.',
      en: 'How a 1% annual fee compounds into a much bigger difference over twenty years.',
    },
    inOneSentence: {
      sq: 'Një tarifë nuk ju kushton një herë — ju kushton çdo vit, mbi një shumë që përndryshe do të ishte rritur.',
      en: "A fee doesn't cost you once — it costs you every year, on money that would otherwise have kept growing.",
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
      en: [
        {
          heading: 'Why 1% is not 1%',
          paragraphs: [
            'If a fund charges 1% a year, instinct says you lose one percent. For one year, yes. Over twenty years, no — because every euro taken this year is a euro that never earns anything again.',
            "The fee does not just take the money, it takes all of that money's future growth too. So the effect is not linear; it widens with time, exactly like compounding, only in reverse.",
            'That is why fees are the one thing in investing you fully control and whose impact is guaranteed. You do not get to choose your returns. You do get to choose your fees.',
          ],
        },
        {
          heading: 'The fees you cannot see',
          paragraphs: [
            "The fund's expense ratio is the one that gets advertised, but it is rarely the only one. There are platform fees, transaction costs inside the fund itself, and currency conversion costs if you buy something in another currency.",
            'The conversion cost is the one most often forgotten, and on some platforms it is bigger than all the others combined. A 0.5% margin on the way in and 0.5% on the way out is a full percent taken straight out of your pocket.',
            'When you compare two products, add everything up. The only number that matters is what you keep, not what gets advertised.',
          ],
        },
        {
          heading: 'When paying more is worth it',
          paragraphs: [
            'The lowest fee does not always win. A cheap fund that tracks its index badly can cost you more than a slightly pricier fund that tracks it precisely.',
            'In difficult or small markets, where buying and selling is expensive, a skilled manager can justify the fee. In big, liquid indexes, history shows they rarely do.',
            'A practical rule: the more standard the thing you are buying, the less you should agree to pay for it.',
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
      en: {
        heading: 'Twenty years with €10,000, assuming 7% a year',
        columns: ['Fund', 'Annual fee', 'Value after 20 years'],
        rows: [
          {
            label: 'Cheap index ETF',
            value: '0.10%',
            cost: '€37,900',
            tone: 'positive',
          },
          { label: 'Average fund', value: '0.75%', cost: '€33,500' },
          {
            label: 'Expensive active fund',
            value: '1.50%',
            cost: '€29,000',
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
      en: [
        {
          slug: 'expense-ratio',
          term: 'Expense ratio',
          definition:
            "The fund's annual fee, given as a percentage of what you hold.",
          aliases: ['expense ratios'],
        },
        {
          slug: 'tracking-error',
          term: 'Tracking error',
          definition:
            'How far a fund has drifted from the index it promised to follow.',
          aliases: ['tracking difference'],
        },
        {
          slug: 'fx-spread',
          term: 'FX spread',
          definition:
            'The hidden cost of converting currency when you buy something priced in another one.',
          aliases: ['currency conversion fee'],
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
      en: {
        question:
          'Two funds track the same index. One charges 0.10%, the other 1.50%. What should you expect over twenty years?',
        options: [
          'A difference of about 1.4% in total',
          'A difference much bigger than 1.4%, because the fee compounds',
          'No difference, because they track the same index',
        ],
        answer: 1,
        explanation:
          'The fee is taken every year from money that would have kept growing. Over twenty years that difference becomes thousands of euros.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['cka-eshte-nje-fond', 'fonde-indeksore-apo-zgjedhje-aksionesh'],
      en: ['what-is-a-fund', 'index-funds-or-stock-picking'],
    },
  },

  {
    id: 'what-is-a-fund',
    slug: { sq: 'cka-eshte-nje-fond', en: 'what-is-a-fund' },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çfarë është një fond, dhe si ndryshon nga një ETF',
      en: 'What is a fund, and how it differs from an ETF',
    },
    summary: {
      sq: 'Të gjitha fondet i mbledhin paratë e shumë njerëzve. Dallimi është si i blini dhe kush vendos çka ka brenda.',
      en: 'All funds pool money from many people. The difference is how you buy them and who decides what goes inside.',
    },
    inOneSentence: {
      sq: 'Fondi është një grumbull i përbashkët parash i menaxhuar sipas një rregulli të shpallur, dhe ai rregull është e vetmja gjë që ka vërtet rëndësi.',
      en: 'A fund is a shared pool of money managed by a published rule, and that rule is the only thing that really matters.',
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
      en: [
        {
          heading: 'Active or passive',
          paragraphs: [
            'A passive fund follows a mechanical rule: hold everything in this index, in these proportions. Nobody judges whether a company is any good. If it is on the list, it gets bought.',
            'An active fund has a person deciding. That person tries to buy what will rise and avoid what will fall, and gets paid for the effort.',
            'Both are legitimate. But an active fund has to beat its own index by enough to cover its fee, every year, just to break even. That is a permanent hurdle, and most funds fail to clear it over long periods.',
          ],
        },
        {
          heading: 'ETF or mutual fund',
          paragraphs: [
            'This is not the active-versus-passive distinction — there are active ETFs and passive mutual funds. It is a difference in how you buy them.',
            'An ETF trades on an exchange all day, like a share, and you see its price in real time. A mutual fund is usually bought once a day, at a price calculated after the close.',
            'For a long-term investor this matters very little in practice. What matters is the cost, what the fund holds, and whether you can easily buy it from where you live.',
          ],
        },
        {
          heading: 'Accumulating or distributing',
          paragraphs: [
            'When the companies inside a fund pay dividends, the fund has to decide what to do with them. A distributing fund sends them to your account. An accumulating fund reinvests them automatically.',
            'If you are building for the future, the accumulating version is usually simpler: the money goes straight back to work without any action from you and without the costs of buying back in.',
            'If you need income now, the distributing version makes sense. The choice depends on your goal, not on quality — the same fund often exists in both variants.',
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
      en: {
        heading: 'The three questions for any fund',
        columns: ['Question', 'Where to find it', 'Why it matters'],
        rows: [
          {
            label: 'What does it hold?',
            value: 'The list of holdings',
            cost: 'The name often misleads',
          },
          {
            label: 'What does it cost?',
            value: 'The expense ratio',
            cost: 'Deducted every year',
            tone: 'negative',
          },
          {
            label: 'What does it do with dividends?',
            value: 'Accumulating or distributing',
            cost: 'Decides whether they get reinvested',
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
      en: [
        {
          slug: 'passive-fund',
          term: 'Passive fund',
          definition:
            'A fund that copies an index with no human judgement about individual companies.',
          aliases: ['index fund', 'passive funds'],
        },
        {
          slug: 'active-fund',
          term: 'Active fund',
          definition:
            'A fund where a manager picks the investments and gets paid for the picking.',
          aliases: ['active funds', 'active management'],
        },
        {
          slug: 'mutual-fund',
          term: 'Mutual fund',
          definition:
            'A fund bought directly from the fund company, usually at one price per day.',
          aliases: ['mutual funds'],
        },
        {
          slug: 'distributing-fund',
          term: 'Distributing fund',
          definition:
            'A fund that pays your dividends out in cash instead of reinvesting them.',
          aliases: ['distributing funds'],
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
      en: {
        question:
          'Why do most active funds fail to beat their index over long periods?',
        options: [
          'Because the managers are not skilled',
          'Because they have to beat the index every year just to cover their own fee',
          'Because the law forbids them from holding the best stocks',
        ],
        answer: 1,
        explanation:
          'The fee is a permanent hurdle. On average, the managers are the market, so after fees what remains is a below-market result.',
      },
    },
    upNextSlugs: {
      sq: ['fonde-indeksore-apo-zgjedhje-aksionesh', 'koha-ne-treg'],
      en: ['index-funds-or-stock-picking', 'time-in-the-market'],
    },
  },

  {
    id: 'time-in-the-market',
    slug: { sq: 'koha-ne-treg', en: 'time-in-the-market' },
    topicId: 'basics',
    level: 'beginner',
    title: {
      sq: 'Koha në treg kundër kohës së tregut',
      en: 'Time in the market versus timing the market',
    },
    summary: {
      sq: 'Pse pritja e çastit të duhur zakonisht kushton më shumë se rënia që po mundoheni ta shmangni.',
      en: 'Why waiting for the right moment usually costs more than the fall you are trying to avoid.',
    },
    inOneSentence: {
      sq: 'Që të fitoni nga koha e tregut duhet ta qëlloni dy herë — kur dilni dhe kur ktheheni — kurse ditët më të mira vijnë grumbull me ato më të këqijat.',
      en: 'To win at market timing you have to get it right twice — when you leave and when you return — while the best days arrive bundled together with the worst.',
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
      en: [
        {
          heading: 'The two-decision problem',
          paragraphs: [
            'Selling before a crash looks like one smart decision. It is not. It is two decisions: when to get out and when to get back in.',
            'The second part is far harder. When the market has fallen thirty percent and the news is terrifying, buying feels insane. That is exactly when you would have to act.',
            'In practice, most people get out near the bottom of the fall and come back after the recovery has already happened. They end up worse off than if they had done nothing at all.',
          ],
        },
        {
          heading: 'Why the best days are dangerous to miss',
          paragraphs: [
            "Market returns are not spread out evenly. A large share of a decade's gain comes from a handful of days.",
            'And those days do not arrive in calm times. They cluster right around the worst days, in the space between panic and recovery. Whoever steps out to dodge the bad days usually misses the good ones too.',
            "That is why 'stay invested' is not lazy advice. It is an acceptance of the fact that gains arrive in clusters and without warning.",
          ],
        },
        {
          heading: 'What works instead',
          paragraphs: [
            'Investing the same amount at regular intervals removes the need to judge the moment. When prices are high, you buy fewer units; when they are low, you buy more — and it happens automatically.',
            'This does not guarantee a better result than a single investment at the perfect moment. Nothing beats the perfect moment. But it protects you from the worst moment, which is far more likely.',
            'Rebalancing once a year does a similar job: it automatically sells what has grown too much and buys what has fallen behind, without asking you for a single prediction.',
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
      en: [
        {
          title: 'Invest €200 every month for ten years',
          body: 'You never made a single timing decision. You bought in every kind of market, high and low.',
        },
        {
          title: 'The market falls 30% in year four',
          body: "That year's contributions buy noticeably more units for the same €200.",
        },
        {
          title: 'The market recovers in year six',
          body: 'Those extra units, bought in the panic, are the ones that make the biggest difference in the end.',
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
      en: [
        {
          slug: 'dollar-cost-averaging',
          term: 'Dollar-cost averaging',
          definition:
            'Putting in the same amount at regular intervals, regardless of the price.',
          aliases: ['cost averaging', 'regular investing'],
        },
        {
          slug: 'rebalancing',
          term: 'Rebalancing',
          definition:
            'Bringing your portfolio back to its target proportions by selling what grew and buying what fell behind.',
          aliases: ['rebalance'],
        },
        {
          slug: 'market-timing',
          term: 'Market timing',
          definition:
            'Trying to get out before a fall and back in before a rise.',
          aliases: ['timing the market'],
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
      en: {
        question:
          'Why is getting out of the market before a fall harder than it looks?',
        options: [
          'Because selling costs a lot in commissions',
          'Because you also have to time the way back in, when the news is at its worst',
          'Because brokers do not allow quick sales',
        ],
        answer: 1,
        explanation:
          'It is two decisions, not one. The second part requires buying at exactly the moment everything looks hopeless.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['njeqind-eurot-e-para', 'rreziku-dhe-kthimi'],
      en: ['your-first-hundred-euros', 'risk-and-return'],
    },
  },

  {
    id: 'your-first-hundred-euros',
    slug: { sq: 'njeqind-eurot-e-para', en: 'your-first-hundred-euros' },
    topicId: 'basics',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Njëqind eurot tuaja të para',
      en: 'Your first hundred euros',
    },
    summary: {
      sq: 'Çka duhet vendosur para se ta shtypni “bli” për herë të parë, sipas radhës së duhur.',
      en: "What to decide before you press 'buy' for the first time, in the right order.",
    },
    inOneSentence: {
      sq: 'Vendimi i parë nuk është çka të blini, por a duhet t’i investoni fare këto para tash.',
      en: 'The first decision is not what to buy, but whether this money should be invested at all right now.',
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
      en: [
        {
          heading: 'The order that matters',
          paragraphs: [
            'Before investing come three things: expensive debt paid off, an emergency reserve built up, and a clear time horizon for whatever is left.',
            'High-interest debt is the best guaranteed investment you will ever find. Paying off a credit card charging 18% is an 18% return with zero risk. No stock can promise you that.',
            "Only once those three are in place does the question 'what should I buy?' become useful. Before that, it is just a distraction.",
          ],
        },
        {
          heading: 'Why the first one should be boring',
          paragraphs: [
            'Your first investment has a job that has nothing to do with returns: to teach you what it feels like to hold something that swings, without ruining you if it feels bad.',
            'That is why a broad, cheap index fund is the usual starting point. Not because it earns more, but because the mistakes you can make with it are small and fixable.',
            'Individual stocks, crypto, and leveraged products can come later, once you have a base and a clear idea of how much you are prepared to lose.',
          ],
        },
        {
          heading: 'The mistakes everyone makes',
          paragraphs: [
            'The first is checking the price every day. It changes nothing, and only raises the odds that you act in a panic. A long-term portfolio does not need looking at more than a few times a year.',
            'The second is chasing whatever just went up a lot. By the time something is in all the headlines, the price already has that attention baked in.',
            'The third is changing the plan every time your mood changes. An average plan followed for ten years can beat a brilliant plan abandoned after six months.',
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
      en: {
        heading: 'The order of operations',
        columns: ['Step', 'What you do', 'Why it comes first'],
        rows: [
          {
            label: '1',
            value: 'Pay off expensive debt',
            cost: 'A guaranteed return, with no risk',
            tone: 'positive',
          },
          {
            label: '2',
            value: 'Build your reserve',
            cost: 'It keeps you from selling in a panic',
          },
          {
            label: '3',
            value: 'Invest what remains',
            cost: "Only money you won't need for years",
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
      en: [
        {
          slug: 'asset-allocation',
          term: 'Asset allocation',
          definition:
            'How you split your money across types of investments. The decision that explains most of your result.',
          aliases: ['allocation'],
        },
        {
          slug: 'risk-tolerance',
          term: 'Risk tolerance',
          definition:
            'How big a fall you can sit through without changing the plan. Measured by behaviour, not by intention.',
          aliases: ['risk appetite'],
        },
        {
          slug: 'portfolio',
          term: 'Portfolio',
          definition: 'Everything you own, viewed as a single whole.',
          aliases: ['portfolios'],
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
      en: {
        question:
          'You have a credit card charging 18% interest and €1,000 to invest. What is the best choice?',
        options: [
          'Put it in an index fund with a 7% expected return',
          'Pay off the credit card',
          'Split it in half',
        ],
        answer: 1,
        explanation:
          'Paying off an 18% debt is a guaranteed 18% return. No investment gives you that without risk.',
      },
    },
    upNextSlugs: {
      sq: ['cka-eshte-etf', 'kursim-apo-investim'],
      en: ['what-is-an-etf', 'saving-or-investing'],
    },
  },
];
