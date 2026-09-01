import type { SeedLesson, SeedTopic } from './types';

export const STOCKS_ETFS_TOPIC: SeedTopic = {
  id: 'stocks-etfs',
  title: { sq: 'Aksione dhe ETF', en: 'Stocks & ETFs' },
  slugs: {
    sq: [
      'si-levizin-cmimet-e-aksioneve',
      'sektoret-levizin-bashke',
      'raporti-p-e',
      'si-lexohet-raporti-i-fitimeve',
      'si-lexohet-bilanci',
      'si-vleresohet-nje-kompani',
      'rritje-apo-vlere',
      'dividendet',
      'riblerjet-e-aksioneve',
      'ndarja-e-aksioneve',
      'cka-eshte-ipo',
      'fonde-indeksore-apo-zgjedhje-aksionesh',
    ],
    en: [
      'how-share-prices-move',
      'sectors-move-together',
      'the-p-e-ratio',
      'how-to-read-an-earnings-report',
      'how-to-read-a-balance-sheet',
      'how-a-company-is-valued',
      'growth-or-value',
      'dividends',
      'share-buybacks',
      'stock-splits',
      'what-is-an-ipo',
      'index-funds-or-stock-picking',
    ],
  },
};

export const STOCKS_ETFS_LESSONS: SeedLesson[] = [
  {
    id: 'what-moves-a-share-price',
    slug: { sq: 'si-levizin-cmimet-e-aksioneve', en: 'how-share-prices-move' },
    topicId: 'stocks-etfs',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çfarë e lëviz çmimin e një aksioni gjatë ditës',
      en: 'What moves a share price during the day',
    },
    summary: {
      sq: 'Lajme, pritje dhe rrjedha parash — dhe pse e treta i shpjegon lëvizjet që dy të parat nuk i shpjegojnë dot.',
      en: "News, expectations and money flows — and why the third explains the moves the first two can't.",
    },
    inOneSentence: {
      sq: 'Çmimi luan kur ndërrohet mendimi i përbashkët për fitimet e ardhshme, ose thjesht kur dikujt të madh i duhet të blejë a të shesë.',
      en: 'The price moves when the shared view of future profits changes, or simply when someone big needs to buy or sell.',
    },
    body: {
      sq: [
        {
          heading: 'Surpriza, jo lajmi',
          paragraphs: [
            'Një kompani raporton fitime dyfish më të larta se vjet dhe aksioni bie. Duket pa lidhje derisa e kuptoni se çmimi i djeshëm e kishte brenda tashmë një pritje.',
            'Analistët i publikojnë parashikimet e veta. Ato mblidhen në një “konsensus”, dhe konsensusi hyn në çmim para se të dalë rezultati. Kur vjen rezultati, tregu nuk pyet “a ishte i mirë?”, por “a ishte më i mirë se ai që e kishim çmuar tashmë?”.',
            'Prandaj një kompani e shkëlqyer mund ta ketë aksionin të keq me vite: nëse pritej përsosmëri dhe doli vetëm shkëlqim, çmimi ka rrugë vetëm kah poshtë.',
          ],
        },
        {
          heading: 'Udhëzimi peshon më shumë se e kaluara',
          paragraphs: [
            'Në raportimet tremujore, shifrat e tremujorit që sapo mbaroi shpesh e lëvizin çmimin më pak se ajo që thonë drejtuesit për tremujorin e ardhshëm.',
            'Ka logjikë: aksioni vlen sa fitimet e së ardhmes, jo sa ato të së kaluarës. E kaluara ka rëndësi vetëm se na ndihmon ta gjykojmë të ardhmen.',
            'Prandaj, kur lexoni se “aksioni ra edhe pse rezultatet ishin të forta”, shikojeni udhëzimin. Aty është zakonisht përgjigjja.',
          ],
        },
        {
          heading: 'Rrjedhat që nuk kanë të bëjnë me kompaninë',
          paragraphs: [
            'Një pjesë e mirë e lëvizjeve ditore s’kanë asnjë lidhje me biznesin. Një fond indeksor duhet të blejë sepse i erdhën para të reja. Një fond pensional ribalancon në fund të tremujorit. Një kompani që hyn a del nga një indeks i detyron qindra fonde të blejnë a të shesin përnjëherë.',
            'Këta janë blerës e shitës që s’kanë asnjë mendim për kompaninë. Veprojnë sepse ashtu ua kërkojnë rregullat e veta.',
            'Kjo i shpjegon lëvizjet që përndryshe duken pa kuptim, dhe është një kujtesë e mirë: jo çdo lëvizje e çmimit bart informacion.',
          ],
        },
      ],
      en: [
        {
          heading: 'The surprise, not the news',
          paragraphs: [
            "A company reports profits twice as high as last year and the share falls. It looks absurd until you realise that yesterday's price already had an expectation built into it.",
            "Analysts publish their own forecasts. These get pooled into a “consensus”, and the consensus is priced in before the result comes out. When the result arrives, the market doesn't ask “was it good?” but “was it better than what we'd already priced in?”.",
            "That's why an excellent company can have a disappointing stock for years: if perfection was expected and only excellence showed up, the price has nowhere to go but down.",
          ],
        },
        {
          heading: 'Guidance outweighs the past',
          paragraphs: [
            'In quarterly reports, the numbers for the quarter that just ended often move the price less than what management says about the quarter ahead.',
            "There's a logic to it: a share is worth its future profits, not its past ones. The past only matters because it helps us judge the future.",
            "So when you read that “the stock fell even though results were strong”, look at the guidance. That's usually where the answer is.",
          ],
        },
        {
          heading: 'Flows that have nothing to do with the company',
          paragraphs: [
            'A good share of daily moves have nothing to do with the business. An index fund has to buy because new money came in. A pension fund rebalances at the end of the quarter. A company joining or leaving an index forces hundreds of funds to buy or sell all at once.',
            'These are buyers and sellers with no opinion about the company at all. They act because their own rules tell them to.',
            "That explains the moves that otherwise seem senseless, and it's a good reminder: not every price move carries information.",
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'consensus-estimate',
          term: 'Parashikim konsensusi',
          definition:
            'Mesatarja e parashikimeve të analistëve — pragu që duhet ta kalojë një rezultat për t’u quajtur lajm i mirë.',
          aliases: ['konsensusi', 'pritshmëritë e analistëve'],
        },
        {
          slug: 'guidance',
          term: 'Udhëzim',
          definition:
            'Parashikimi i vetë kompanisë për rezultatet e veta të ardhshme.',
          aliases: ['udhëzimi'],
        },
        {
          slug: 'flow',
          term: 'Rrjedhë',
          definition:
            'Blerje a shitje që vijnë nga rregulla dhe nevoja, jo nga ndonjë mendim për kompaninë.',
          aliases: ['rrjedhat'],
        },
      ],
      en: [
        {
          slug: 'consensus-estimate',
          term: 'Consensus estimate',
          definition:
            "The average of analysts' forecasts — the bar a result has to clear to count as good news.",
          aliases: ['consensus', 'consensus estimates', 'analyst expectations'],
        },
        {
          slug: 'guidance',
          term: 'Guidance',
          definition: "A company's own forecast of its future results.",
          aliases: ['forward guidance'],
        },
        {
          slug: 'flow',
          term: 'Flow',
          definition:
            'Buying or selling driven by rules and needs, not by any view on the company.',
          aliases: ['flows', 'fund flows'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani raporton fitime më të mira se pritej, por aksioni bie fort. Ku duhet të shikoni së pari?',
        options: [
          'Te fitimet e vitit të kaluar',
          'Te udhëzimi për tremujorët e ardhshëm',
          'Te numri i aksioneve në qarkullim',
        ],
        answer: 1,
        explanation:
          'Çmimi paguan për fitimet e ardhshme. Një udhëzim i dobët e prish edhe një rezultat të mirë të së kaluarës.',
      },
      en: {
        question:
          'A company reports better profits than expected, but the share falls hard. Where should you look first?',
        options: [
          "At last year's profits",
          'At the guidance for the coming quarters',
          'At the number of shares outstanding',
        ],
        answer: 1,
        explanation:
          'The price pays for future profits. Weak guidance can spoil even a strong result from the past.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: {
      sq: ['sektoret-levizin-bashke', 'raporti-p-e'],
      en: ['sectors-move-together', 'the-p-e-ratio'],
    },
  },

  {
    id: 'sectors-move-together',
    slug: { sq: 'sektoret-levizin-bashke', en: 'sectors-move-together' },
    topicId: 'stocks-etfs',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Pse aksionet e një sektori luajnë bashkë',
      en: 'Why stocks in the same sector move together',
    },
    summary: {
      sq: 'Kompani të ndryshme me të njëjtin faktor rreziku reagojnë njësoj ndaj një lajmi të vetëm.',
      en: 'Different companies that share the same risk factor react the same way to a single piece of news.',
    },
    inOneSentence: {
      sq: 'Kur dy kompani varen nga e njëjta gjë, një lajm për atë gjë i lëviz të dyja, sado të ndryshme të jenë.',
      en: 'When two companies depend on the same thing, news about that thing moves both of them, however different they are.',
    },
    body: {
      sq: [
        {
          heading: 'I njëjti faktor, i njëjti drejtim',
          paragraphs: [
            'Prodhuesit e çipave nuk konkurrojnë medoemos me njëri-tjetrin, por të gjithë varen nga i njëjti cikël i kërkesës, nga të njëjtat fabrika dhe shpesh nga të njëjtit klientë. Kur del një lajm për kërkesën e çipave, luajnë të gjithë.',
            'E njëjta vlen për bankat dhe normat e interesit, për kompanitë ajrore dhe çmimin e naftës, për ndërtuesit e banesave dhe koston e kredive.',
            'Ky nuk është imitim as panik. Është thjesht fakti se çmimi i secilës kompani varet nga një ndryshore e përbashkët.',
          ],
        },
        {
          heading: 'Pse ka rëndësi për ju',
          paragraphs: [
            'Nëse i keni pesë kompani teknologjike, nuk keni pesë investime — keni pak a shumë një investim të përsëritur pesë herë. Diversifikimi kërkon gjëra që varen nga faktorë të ndryshëm, jo thjesht emra të ndryshëm.',
            'Po ashtu, prandaj një ETF sektorial nuk është i sigurt vetëm pse është ETF. Njëqind kompani të së njëjtës industri mund të bien bashkë njësoj si njëra.',
            'Kur e shikoni një portofol, pyetja e dobishme nuk është “sa gjëra kam?”, por “nga sa faktorë të ndryshëm varen?”.',
          ],
        },
        {
          heading: 'Rrotullimi mes sektorëve',
          paragraphs: [
            'Në faza të ndryshme të ciklit ekonomik, paratë kalojnë rregullisht nga një sektor te tjetri. Kur normat rriten, aksionet e rritjes vuajnë dhe bankat fitojnë. Kur ekonomia ngadalësohet, shërbimet publike dhe konsumi bazë mbahen më mirë.',
            'Kjo lëvizje quhet rrotullim sektorial dhe e shpjegon pse tregu mund të duket i qetë, ndërsa poshtë sipërfaqes gjysma po rritet e gjysma po bie.',
            'Nuk keni pse ta parashikoni. Mjafton ta njihni, që të mos e ngatërroni një rrotullim me krizë.',
          ],
        },
      ],
      en: [
        {
          heading: 'Same factor, same direction',
          paragraphs: [
            "Chipmakers don't necessarily compete with one another, but they all depend on the same demand cycle, the same factories and often the same customers. When news about chip demand comes out, they all move.",
            'The same goes for banks and interest rates, for airlines and the price of oil, for homebuilders and the cost of borrowing.',
            "This isn't imitation or panic. It's simply the fact that each company's price depends on a shared variable.",
          ],
        },
        {
          heading: 'Why it matters to you',
          paragraphs: [
            "If you own five tech companies, you don't have five investments — you have more or less one investment repeated five times. Diversification needs things that depend on different factors, not just different names.",
            "It's also why a sector ETF isn't safe just because it's an ETF. A hundred companies in the same industry can fall together just like one.",
            "When you look at a portfolio, the useful question isn't “how many things do I own?” but “how many different factors do they depend on?”.",
          ],
        },
        {
          heading: 'Rotation between sectors',
          paragraphs: [
            'At different stages of the economic cycle, money moves regularly from one sector to another. When rates rise, growth stocks suffer and banks benefit. When the economy slows, utilities and consumer staples hold up better.',
            'This movement is called sector rotation, and it explains why the market can look calm while, beneath the surface, half of it is rising and half is falling.',
            "You don't have to predict it. It's enough to recognise it, so you don't mistake a rotation for a crisis.",
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'sector',
          term: 'Sektor',
          definition: 'Grup kompanish që varen nga të njëjtat forca ekonomike.',
          aliases: ['sektori', 'sektorët'],
        },
        {
          slug: 'sector-rotation',
          term: 'Rrotullim sektorial',
          definition:
            'Kalimi i parave nga një sektor te tjetri sipas fazës së ciklit ekonomik.',
        },
        {
          slug: 'concentration',
          term: 'Përqendrim',
          definition:
            'Sa varet portofoli juaj nga një faktor i vetëm, pa marrë parasysh sa emra ka brenda.',
          aliases: ['i përqendruar'],
        },
      ],
      en: [
        {
          slug: 'sector',
          term: 'Sector',
          definition:
            'A group of companies that depend on the same economic forces.',
          aliases: ['sectors', 'industry sector'],
        },
        {
          slug: 'sector-rotation',
          term: 'Sector rotation',
          definition:
            'Money moving from one sector to another as the economic cycle changes phase.',
        },
        {
          slug: 'concentration',
          term: 'Concentration',
          definition:
            'How much your portfolio depends on a single factor, regardless of how many names are in it.',
          aliases: ['concentrated'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'I keni pesë kompani të ndryshme teknologjike. Sa i diversifikuar jeni vërtet?',
        options: [
          'Plotësisht — janë pesë kompani të ndryshme',
          'Pak, sepse të pesta varen nga të njëjtit faktorë',
          'Varet vetëm nga madhësia e tyre',
        ],
        answer: 1,
        explanation:
          'Diversifikimi matet me numrin e faktorëve nga të cilët varet portofoli, jo me numrin e emrave brenda tij.',
      },
      en: {
        question:
          'You own five different tech companies. How diversified are you really?',
        options: [
          'Fully — they are five different companies',
          'Not very, because all five depend on the same factors',
          'It only depends on their size',
        ],
        answer: 1,
        explanation:
          'Diversification is measured by the number of factors your portfolio depends on, not by the number of names in it.',
      },
    },
    relatedSymbols: ['nasdaq-100', 'sp-500'],
    upNextSlugs: {
      sq: [
        'fonde-indeksore-apo-zgjedhje-aksionesh',
        'pse-funksionon-diversifikimi',
      ],
      en: ['index-funds-or-stock-picking', 'why-diversification-works'],
    },
  },

  {
    id: 'what-is-a-pe-ratio',
    slug: { sq: 'raporti-p-e', en: 'the-p-e-ratio' },
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: {
      sq: 'Çfarë është raporti çmim/fitim (P/E)?',
      en: 'What is the price/earnings (P/E) ratio?',
    },
    summary: {
      sq: 'Një mënyrë e shpejtë për të pyetur: sa po paguaj për çdo euro fitim?',
      en: 'A quick way of asking: how much am I paying for every euro of profit?',
    },
    inOneSentence: {
      sq: 'P/E ju tregon sa vite fitimesh të sotme po paguani për ta pasur një kompani.',
      en: "The P/E tells you how many years of today's profits you are paying to own a company.",
    },
    body: {
      sq: [
        {
          heading: 'Aritmetika dhe kuptimi i saj',
          paragraphs: [
            'Pjesëtojeni çmimin e aksionit me fitimin vjetor për aksion. Nëse aksioni kushton 40 € dhe kompania fiton 2 € për aksion në vit, P/E-ja është 20.',
            'Një lexim i dobishëm: po paguani njëzet vite fitimesh të sotme. Nëse fitimet nuk rriten kurrë, do të duheshin njëzet vjet që kompania t’ua kthente çmimin që e paguat.',
            'Prandaj një P/E i lartë nuk do të thotë “i shtrenjtë”, as një i ulët “i lirë”. Do të thotë se në rastin e parë tregu pret rritje, kurse në të dytin telashe.',
          ],
        },
        {
          heading: 'Ku mashtron',
          paragraphs: [
            'Fitimet janë shifër kontabël, dhe shifrat kontabël luhaten nga ngjarje të njëhershme: shitja e një ndërtese, një gjobë e madhe, një ristrukturim.',
            'Një kompani ciklike e ka P/E-në më të ulët pikërisht në majë të ciklit, kur fitimet janë të fryra dhe gati për të rënë. P/E-ja e ulët aty është kurth, jo zbritje.',
            'Kurse një kompani pa fitim nuk ka fare P/E. Kjo nuk e bën të keqe — thjesht e bën këtë mjet të papërdorshëm për të.',
          ],
        },
        {
          heading: 'Si përdoret në praktikë',
          paragraphs: [
            'P/E-ja ka kuptim vetëm në krahasim: me historinë e vetë kompanisë, me konkurrentët e drejtpërdrejtë ose me tërë tregun.',
            'Një P/E prej 30 është i lartë për një bankë dhe krejt i zakonshëm për një kompani softueri që rritet 25% në vit. Krahasimi duhet bërë mes gjërash të ngjashme.',
            'Merreni si pyetje të parë, jo si përgjigje. Ju tregon çka pret tregu; nuk ju tregon a e ka tregu drejt.',
          ],
        },
      ],
      en: [
        {
          heading: 'The arithmetic and what it means',
          paragraphs: [
            'Divide the share price by the annual earnings per share. If the share costs €40 and the company earns €2 per share a year, the P/E is 20.',
            "A useful way to read it: you are paying twenty years of today's profits. If profits never grew, it would take twenty years for the company to earn back the price you paid.",
            "So a high P/E doesn't mean “expensive”, and a low one doesn't mean “cheap”. It means the market expects growth in the first case and trouble in the second.",
          ],
        },
        {
          heading: 'Where it misleads',
          paragraphs: [
            'Earnings are an accounting figure, and accounting figures swing on one-off events: the sale of a building, a big fine, a restructuring.',
            'A cyclical company has its lowest P/E right at the top of the cycle, when profits are inflated and about to fall. A low P/E there is a trap, not a discount.',
            "And a company with no profit has no P/E at all. That doesn't make it a bad company — it just makes this tool useless for it.",
          ],
        },
        {
          heading: 'How to use it in practice',
          paragraphs: [
            "The P/E only makes sense in comparison: with the company's own history, with its direct competitors, or with the whole market.",
            'A P/E of 30 is high for a bank and perfectly ordinary for a software company growing 25% a year. Compare like with like.',
            "Treat it as a first question, not an answer. It tells you what the market expects; it doesn't tell you whether the market is right.",
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Dy kompani, i njëjti çmim aksioni',
          body: 'Të dyja kushtojnë 50 €. E para fiton 5 € për aksion, e dyta vetëm 1 €.',
        },
        {
          title: 'Llogaritni P/E',
          body: 'E para ka P/E 10, e dyta P/E 50. Për të njëjtin çmim, te e dyta po blini pesë herë më pak fitim.',
        },
        {
          title: 'Pyetja e vërtetë',
          body: 'A do të rriten fitimet e së dytës aq shpejt sa ta arsyetojnë atë diferencë? Këtu qëndron i tërë investimi.',
        },
      ],
      en: [
        {
          title: 'Two companies, same share price',
          body: 'Both cost €50. The first earns €5 per share, the second only €1.',
        },
        {
          title: 'Work out the P/E',
          body: 'The first has a P/E of 10, the second a P/E of 50. For the same price, the second gets you five times less profit.',
        },
        {
          title: 'The real question',
          body: "Will the second company's profits grow fast enough to justify that gap? That is the entire investment.",
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'I njëjti P/E, kuptime të ndryshme',
        columns: [
          'Lloji i kompanisë',
          'P/E 25 do të thotë',
          'Çfarë të kontrolloni',
        ],
        rows: [
          {
            label: 'Softuer në rritje',
            value: 'Normal',
            cost: 'A po rriten fitimet vërtet?',
          },
          {
            label: 'Bankë',
            value: 'I lartë',
            cost: 'Pse tregu pret rritje?',
            tone: 'negative',
          },
          {
            label: 'Kompani ciklike',
            value: 'Mund të jetë maja',
            cost: 'Ku është cikli tani?',
          },
        ],
      },
      en: {
        heading: 'Same P/E, different meanings',
        columns: ['Type of company', 'A P/E of 25 means', 'What to check'],
        rows: [
          {
            label: 'Growing software company',
            value: 'Normal',
            cost: 'Are profits actually growing?',
          },
          {
            label: 'Bank',
            value: 'High',
            cost: 'Why does the market expect growth?',
            tone: 'negative',
          },
          {
            label: 'Cyclical company',
            value: 'Could be the peak',
            cost: 'Where is the cycle right now?',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'pe-ratio',
          term: 'Raporti P/E',
          definition:
            'Çmimi i aksionit i pjesëtuar me fitimin vjetor për aksion.',
          aliases: ['P/E', 'çmim/fitim', 'raporti çmim-fitim'],
        },
        {
          slug: 'earnings-per-share',
          term: 'Fitim për aksion',
          definition:
            'Fitimi i kompanisë i pjesëtuar me numrin e aksioneve në qarkullim.',
          aliases: ['EPS'],
        },
        {
          slug: 'cyclical',
          term: 'Ciklike',
          definition:
            'Kompani fitimet e së cilës e ndjekin ciklin ekonomik, si çeliku ose kompanitë ajrore.',
          aliases: ['ciklik', 'kompani ciklike'],
        },
      ],
      en: [
        {
          slug: 'pe-ratio',
          term: 'P/E ratio',
          definition: 'The share price divided by annual earnings per share.',
          aliases: ['P/E', 'price/earnings', 'price-earnings ratio'],
        },
        {
          slug: 'earnings-per-share',
          term: 'Earnings per share',
          definition:
            "The company's profit divided by the number of shares outstanding.",
          aliases: ['EPS'],
        },
        {
          slug: 'cyclical',
          term: 'Cyclical',
          definition:
            'A company whose profits follow the economic cycle, like steelmakers or airlines.',
          aliases: ['cyclicals', 'cyclical company'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani çeliku ka P/E 6, shumë nën treg. Çka duhet kontrolluar së pari?',
        options: [
          'A paguan dividend',
          'A janë fitimet në majë të ciklit dhe gati për të rënë',
          'Sa aksione i ka në qarkullim',
        ],
        answer: 1,
        explanation:
          'Kompanitë ciklike duken më të lira pikërisht kur fitimet i kanë të fryra. P/E-ja e ulët aty shpesh është paralajmërim, jo zbritje.',
      },
      en: {
        question:
          'A steel company has a P/E of 6, far below the market. What should you check first?',
        options: [
          'Whether it pays a dividend',
          'Whether profits are at the top of the cycle and about to fall',
          'How many shares it has outstanding',
        ],
        answer: 1,
        explanation:
          'Cyclical companies look cheapest exactly when their profits are inflated. A low P/E there is often a warning, not a discount.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['si-vleresohet-nje-kompani', 'si-lexohet-raporti-i-fitimeve'],
      en: ['how-a-company-is-valued', 'how-to-read-an-earnings-report'],
    },
  },

  {
    id: 'reading-an-earnings-report',
    slug: {
      sq: 'si-lexohet-raporti-i-fitimeve',
      en: 'how-to-read-an-earnings-report',
    },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: {
      sq: 'Si të lexoni një raport fitimesh',
      en: 'How to read an earnings report',
    },
    summary: {
      sq: 'Katër shifra që kanë rëndësi dhe pjesa që tregu e lexon e para.',
      en: 'The four numbers that matter, and the part the market reads first.',
    },
    inOneSentence: {
      sq: 'Të ardhurat i tregojnë shitjet, marzhi shëndetin, fitimi për aksion rezultatin, kurse udhëzimi të ardhmen — dhe i fundit peshon më shumë se të tjerët.',
      en: 'Revenue shows the sales, the margin shows the health, earnings per share shows the result, and guidance shows the future — and the last one outweighs the rest.',
    },
    body: {
      sq: [
        {
          heading: 'Nga lart poshtë',
          paragraphs: [
            'Rreshti i parë janë të ardhurat: sa para hynë nga shitjet. Tregon a po rritet kompania, por nuk thotë asgjë për fitimin.',
            'Pastaj vjen marzhi bruto: sa mbetet nga çdo euro shitje pasi hiqet kostoja e drejtpërdrejtë e prodhimit. Një marzh që bie ndërsa shitjet rriten do të thotë se rritja po blihet me zbritje çmimi.',
            'Në fund vjen fitimi neto dhe fitimi për aksion. Kjo është shifra që del nëpër tituj, por edhe më e lehta për t’u ndikuar nga ngjarje të njëhershme.',
          ],
        },
        {
          heading: 'Ku fshihen problemet',
          paragraphs: [
            'Kërkojeni fitimin operativ, jo vetëm atë neto. Fitimi operativ i heq efektet e taksave, të interesave dhe të ngjarjeve të jashtëzakonshme, dhe tregon a po funksionon vetë biznesi.',
            'Shikojeni po ashtu paranë që e krijon veprimtaria. Një kompani mund të raportojë fitim dhe njëkohësisht të djegë para, nëse fitimi i ka mbetur nëpër fatura të papaguara.',
            'Nëse fitimi rritet me vite kurse paraja nuk vjen pas, kjo është pyetja që duhet bërë para të gjithave.',
          ],
        },
        {
          heading: 'Pjesa që lëviz çmimin',
          paragraphs: [
            'Tregtarët profesionistë shpesh shkojnë drejt te udhëzimi. Shifrat e tremujorit që shkoi janë histori; informacion i ri është ajo që presin drejtuesit për tremujorin e ardhshëm.',
            'Prandaj i shihni aksionet që bien pas rezultatesh të shkëlqyera, ose rriten pas rezultatesh të dobëta. Titulli e raporton të kaluarën; çmimi e çmon të ardhmen.',
            'Nëse keni për të lexuar vetëm një pjesë të raportit, lexojeni udhëzimin dhe krahasojeni me konsensusin.',
          ],
        },
      ],
      en: [
        {
          heading: 'From the top down',
          paragraphs: [
            'The first line is revenue: how much money came in from sales. It shows whether the company is growing, but says nothing about profit.',
            'Then comes the gross margin: how much of every euro of sales is left after the direct cost of production. A margin that falls while sales grow means the growth is being bought with price cuts.',
            "At the bottom come net profit and earnings per share. That's the number that makes the headlines, but also the easiest one to distort with one-off events.",
          ],
        },
        {
          heading: 'Where problems hide',
          paragraphs: [
            'Look for operating profit, not just net profit. Operating profit strips out the effects of taxes, interest and exceptional items, and shows whether the business itself is working.',
            'Look too at the cash the operations generate. A company can report a profit and burn cash at the same time, if the profit is stuck in unpaid invoices.',
            "If profit grows for years while the cash doesn't follow, that is the question to ask before any other.",
          ],
        },
        {
          heading: 'The part that moves the price',
          paragraphs: [
            "Professional traders often go straight to the guidance. Last quarter's numbers are history; the new information is what management expects for the quarter ahead.",
            "That's why you see stocks fall after brilliant results, or rise after weak ones. The headline reports the past; the price prices the future.",
            'If you only read one part of the report, read the guidance and compare it with the consensus.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Çfarë ju thotë secili numër',
        columns: ['Numri', 'Përgjigjet pyetjen', 'Kufizimi'],
        rows: [
          {
            label: 'Të ardhurat',
            value: 'A po rritet?',
            cost: 'Nuk thotë asgjë për fitimin',
          },
          {
            label: 'Marzhi operativ',
            value: 'A funksionon biznesi?',
            cost: 'Mund të luhatet nga kontabiliteti',
          },
          {
            label: 'Paraja operative',
            value: 'A vjen paraja vërtet?',
            cost: 'Luhatet nga tremujori në tremujor',
            tone: 'positive',
          },
        ],
      },
      en: {
        heading: 'What each number tells you',
        columns: ['Number', 'Answers the question', 'The limitation'],
        rows: [
          {
            label: 'Revenue',
            value: 'Is it growing?',
            cost: 'Says nothing about profit',
          },
          {
            label: 'Operating margin',
            value: 'Does the business work?',
            cost: 'Can be swayed by accounting',
          },
          {
            label: 'Operating cash flow',
            value: 'Is the money really coming in?',
            cost: 'Swings from quarter to quarter',
            tone: 'positive',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'revenue',
          term: 'Të ardhura',
          definition: 'Të gjitha paratë nga shitjet, para çdo kostoje.',
          aliases: ['të ardhurat', 'xhiro'],
        },
        {
          slug: 'operating-margin',
          term: 'Marzh operativ',
          definition:
            'Fitimi nga veprimtaria kryesore, si përqindje e të ardhurave.',
          aliases: ['marzhi operativ'],
        },
        {
          slug: 'free-cash-flow',
          term: 'Fluks i lirë parash',
          definition:
            'Paraja që i mbetet kompanisë pasi e paguan gjithçka që i duhet për ta vazhduar punën.',
          aliases: ['fluksi i lirë i parasë'],
        },
      ],
      en: [
        {
          slug: 'revenue',
          term: 'Revenue',
          definition: 'All the money from sales, before any costs.',
          aliases: ['revenues', 'turnover', 'sales'],
        },
        {
          slug: 'operating-margin',
          term: 'Operating margin',
          definition:
            'Profit from the core business, as a percentage of revenue.',
          aliases: ['operating margins'],
        },
        {
          slug: 'free-cash-flow',
          term: 'Free cash flow',
          definition:
            'The cash a company has left after paying for everything it needs to keep running.',
          aliases: ['FCF'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani raporton fitim në rritje tri vjet me radhë, por paraja nga veprimtaria bie. Çka do të thotë kjo?',
        options: [
          'Kompania po rritet shpejt dhe kjo është normale',
          'Fitimi mund të ketë mbetur nëpër fatura të papaguara, jo në para të vërteta',
          'Taksat po rriten',
        ],
        answer: 1,
        explanation:
          'Fitimi është gjykim kontabël; paraja jo. Kur të dyja shkojnë në drejtime të kundërta me vite, zakonisht e ka drejt paraja.',
      },
      en: {
        question:
          'A company reports rising profit three years in a row, but its operating cash flow is falling. What does that mean?',
        options: [
          'The company is growing fast and this is normal',
          'The profit may be stuck in unpaid invoices, not in real cash',
          'Taxes are going up',
        ],
        answer: 1,
        explanation:
          'Profit is an accounting judgement; cash is not. When the two head in opposite directions for years, the cash is usually right.',
      },
    },
    upNextSlugs: {
      sq: ['si-lexohet-bilanci', 'si-vleresohet-nje-kompani'],
      en: ['how-to-read-a-balance-sheet', 'how-a-company-is-valued'],
    },
  },

  {
    id: 'reading-a-balance-sheet',
    slug: { sq: 'si-lexohet-bilanci', en: 'how-to-read-a-balance-sheet' },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: {
      sq: 'Bilanci në një faqe',
      en: 'The balance sheet on one page',
    },
    summary: {
      sq: 'Çka ka kompania, çka u detyrohet të tjerëve dhe pse dallimi mes tyre nuk është e njëjta gjë me vlerën.',
      en: 'What a company owns, what it owes to others, and why the difference between them is not the same thing as its value.',
    },
    inOneSentence: {
      sq: 'Bilanci është një fotografi e një çasti: asetet në njërën anë, detyrimet në tjetrën dhe kapitali i aksionerëve si dallim mes tyre.',
      en: "The balance sheet is a snapshot of a single moment: assets on one side, liabilities on the other, and shareholders' equity as the difference between them.",
    },
    body: {
      sq: [
        {
          heading: 'Tri pjesët',
          paragraphs: [
            'Asetet janë gjithçka që e ka kompania: para, mall në depo, fabrika, patenta dhe fatura që klientët nuk i kanë paguar ende.',
            'Detyrimet janë gjithçka që u detyrohet të tjerëve: hua bankare, obligacione, faturat e veta të papaguara dhe premtimet për pensione.',
            'Dallimi quhet kapital i aksionerëve. Po t’i shiste kompania të gjitha sot me vlerën e librave dhe t’i paguante të gjitha borxhet, kjo është shuma që do t’ju mbetej juve.',
          ],
        },
        {
          heading: 'Pse borxhi ka rëndësi më shumë se madhësia',
          paragraphs: [
            'Borxhi nuk është i keq në vetvete — është ai që i lejon një kompanie të ndërtojë diçka që nuk do të mund ta paguante nga xhepi. Problem është koha.',
            'Një kompani me borxh të madh që duhet kthyer vitin tjetër është e brishtë. Nëse tregjet e kredisë ngrijnë pikërisht atëherë, mund të falimentojë edhe duke qenë ende fitimprurëse.',
            'Prandaj shikoni jo vetëm sa borxh ka, por edhe kur i skadon dhe sa i kushton. Një borxh i gjatë e i lirë është krejt gjë tjetër nga një borxh i shkurtër e i shtrenjtë.',
          ],
        },
        {
          heading: 'Numrat që nuk janë aty',
          paragraphs: [
            'Bilanci e mat atë që mund të matet. Marka, besnikëria e klientëve, zotësia e ekipit dhe efekti i rrjetit nuk dalin askund.',
            'Prandaj kompanitë më të vlefshme në botë shpesh kanë asete modeste. Vlera e tyre është thuajse e tëra te gjëra që kontabiliteti nuk di t’i shënojë.',
            'Vlen edhe e kundërta: një kompani me fabrika të mëdha mund ta ketë bilancin mbresëlënës dhe një biznes që humb para çdo vit.',
          ],
        },
      ],
      en: [
        {
          heading: 'The three parts',
          paragraphs: [
            "Assets are everything the company owns: cash, goods in the warehouse, factories, patents and invoices customers haven't paid yet.",
            'Liabilities are everything it owes to others: bank loans, bonds, its own unpaid bills and pension promises.',
            "The difference is called shareholders' equity. If the company sold everything today at book value and paid off all its debts, that is the amount left over for you.",
          ],
        },
        {
          heading: 'Why debt matters more than size',
          paragraphs: [
            "Debt isn't bad in itself — it's what lets a company build something it couldn't pay for out of pocket. The problem is timing.",
            'A company with a large debt due next year is fragile. If credit markets freeze at exactly that moment, it can go bankrupt while still being profitable.',
            'So look not just at how much debt there is, but at when it falls due and what it costs. Long, cheap debt is a completely different thing from short, expensive debt.',
          ],
        },
        {
          heading: "The numbers that aren't there",
          paragraphs: [
            'The balance sheet measures what can be measured. The brand, customer loyalty, the skill of the team and network effects appear nowhere.',
            "That's why the most valuable companies in the world often have modest assets. Almost all of their value sits in things accounting doesn't know how to record.",
            'The reverse is also true: a company with big factories can have an impressive balance sheet and a business that loses money every year.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'assets',
          term: 'Asete',
          definition: 'Gjithçka që e ka kompania dhe që ka vlerë.',
          aliases: ['asetet', 'aktive', 'aktivet'],
        },
        {
          slug: 'liabilities',
          term: 'Detyrime',
          definition: 'Gjithçka që kompania u detyrohet të tjerëve.',
          aliases: ['detyrimet', 'pasive'],
        },
        {
          slug: 'shareholders-equity',
          term: 'Kapital i aksionerëve',
          definition:
            'Asetet minus detyrimet — ajo që u mbetet aksionerëve në letër.',
          aliases: ['kapitali i aksionerëve'],
        },
        {
          slug: 'leverage',
          term: 'Levë',
          definition:
            'Sa borxh përdor një kompani. I shumëfishon si fitimet, ashtu edhe humbjet.',
          aliases: ['leva', 'i levarizuar'],
        },
      ],
      en: [
        {
          slug: 'assets',
          term: 'Assets',
          definition: 'Everything a company owns that has value.',
          aliases: ['asset'],
        },
        {
          slug: 'liabilities',
          term: 'Liabilities',
          definition: 'Everything a company owes to others.',
          aliases: ['liability'],
        },
        {
          slug: 'shareholders-equity',
          term: "Shareholders' equity",
          definition:
            'Assets minus liabilities — what is left for shareholders on paper.',
          aliases: ['equity', 'book value'],
        },
        {
          slug: 'leverage',
          term: 'Leverage',
          definition:
            'How much debt a company uses. It multiplies profits and losses alike.',
          aliases: ['leveraged', 'gearing'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Dy kompani e kanë të njëjtin borxh të përgjithshëm. Cila është më e brishtë?',
        options: [
          'Ajo me asete më të vogla',
          'Ajo së cilës i skadon borxhi vitin e ardhshëm',
          'Ajo me më shumë aksionerë',
        ],
        answer: 1,
        explanation:
          'Falimentimet ndodhin kur vjen një pagesë dhe paraja nuk është aty. Afati i borxhit shpesh ka më shumë rëndësi se madhësia e tij.',
      },
      en: {
        question:
          'Two companies have the same total debt. Which one is more fragile?',
        options: [
          'The one with smaller assets',
          'The one whose debt falls due next year',
          'The one with more shareholders',
        ],
        answer: 1,
        explanation:
          "Bankruptcies happen when a payment comes due and the cash isn't there. The maturity of the debt often matters more than its size.",
      },
    },
    upNextSlugs: {
      sq: ['si-vleresohet-nje-kompani', 'si-lexohet-raporti-i-fitimeve'],
      en: ['how-a-company-is-valued', 'how-to-read-an-earnings-report'],
    },
  },

  {
    id: 'how-to-value-a-company',
    slug: { sq: 'si-vleresohet-nje-kompani', en: 'how-a-company-is-valued' },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: {
      sq: 'Si vlerësohet një kompani',
      en: 'How a company is valued',
    },
    summary: {
      sq: 'Çdo vlerësim është i njëjti mendim i thënë ndryshe: sa para do të nxjerrë kjo gjë dhe sa vlejnë ato para sot.',
      en: 'Every valuation is the same thought said differently: how much cash will this thing produce, and what is that cash worth today.',
    },
    inOneSentence: {
      sq: 'Vlera e një kompanie është shuma e parave që do t’i nxjerrë në të ardhmen, e zbritur ngaqë paratë e nesërme vlejnë më pak se ato të sotmet.',
      en: "A company's value is the sum of the cash it will produce in the future, discounted because tomorrow's money is worth less than today's.",
    },
    body: {
      sq: [
        {
          heading: 'Pse paratë e nesërme vlejnë më pak',
          paragraphs: [
            'Një mijë euro sot nuk janë e njëjta gjë me një mijë euro pas dhjetë vjetësh. Sot mund t’i investoni; atëherë jo më. Dhe inflacioni do t’i ketë ngrënë një pjesë.',
            'Prandaj çdo vlerësim i zbret fitimet e ardhshme me një normë. Sa më e lartë norma, aq më pak vlejnë sot paratë e largëta në kohë.',
            'Kjo është arsyeja e vetme dhe e mjaftueshme pse rritja e normave të interesit i ul çmimet e aksioneve, pa u ndryshuar asgjë vetë kompanive.',
          ],
        },
        {
          heading: 'Tre rrugë drejt të njëjtës pyetje',
          paragraphs: [
            'Metoda e fluksit të zbritur i modelon drejtpërdrejt paratë e ardhshme. Është më e ndershmja dhe njëkohësisht më e ndjeshmja ndaj supozimeve — ndërrojeni normën e rritjes për një përqind dhe rezultati ndryshon dukshëm.',
            'Metoda e krahasimit shikon sa paguan tregu për kompani të ngjashme. Është më e shpejtë, por ju tregon vetëm a është diçka e lirë krahasuar me të tjerat, jo a është e lirë në vetvete.',
            'Metoda e aseteve pyet sa do të merrnit po t’i shitnit të gjitha. Ka kuptim për banka dhe kompani të pasurive të paluajtshme, e thuajse asnjë për një kompani softueri.',
          ],
        },
        {
          heading: 'Çfarë të bëni me numrin që del',
          paragraphs: [
            'Asnjëra prej këtyre metodave nuk jep një përgjigje të vetme. Japin një gamë, dhe gjerësia e asaj game është vetë informacioni.',
            'Nëse ju duhet të supozoni rritje prej 15% për njëzet vjet që çmimi i sotëm të ketë kuptim, nuk keni gjetur kompani të lirë — keni gjetur çka duhet të besojë tregu.',
            'Vlerësimi është më i dobishëm si kontroll i pritjeve sesa si parashikim. Ju tregon çka po blini, jo çka do të fitoni.',
          ],
        },
      ],
      en: [
        {
          heading: "Why tomorrow's money is worth less",
          paragraphs: [
            'A thousand euros today is not the same as a thousand euros in ten years. Today you can invest it; then you no longer can. And inflation will have eaten part of it.',
            "That's why every valuation discounts future profits at some rate. The higher the rate, the less money that is far away in time is worth today.",
            'This is the single, sufficient reason why rising interest rates push share prices down, without anything changing at the companies themselves.',
          ],
        },
        {
          heading: 'Three routes to the same question',
          paragraphs: [
            'The discounted cash flow method models the future cash directly. It is the most honest and, at the same time, the most sensitive to assumptions — change the growth rate by one percent and the result shifts visibly.',
            'The comparables method looks at what the market pays for similar companies. It is quicker, but it only tells you whether something is cheap compared with the others, not whether it is cheap in itself.',
            'The asset method asks what you would get if you sold everything. It makes sense for banks and real-estate companies, and almost none for a software company.',
          ],
        },
        {
          heading: 'What to do with the number you get',
          paragraphs: [
            'None of these methods gives a single answer. They give a range, and the width of that range is itself the information.',
            "If you have to assume 15% growth for twenty years for today's price to make sense, you haven't found a cheap company — you've found what the market has to believe.",
            'Valuation is more useful as a check on expectations than as a forecast. It tells you what you are buying, not what you will earn.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Cila metodë për cilën kompani',
        columns: ['Metoda', 'Funksionon mirë për', 'Dobësia'],
        rows: [
          {
            label: 'Fluks i zbritur',
            value: 'Fitime të qëndrueshme',
            cost: 'Shumë e ndjeshme ndaj supozimeve',
          },
          {
            label: 'Krahasim me të ngjashmet',
            value: 'Sektorë të pjekur',
            cost: 'Tërë sektori mund të jetë i mbivlerësuar',
            tone: 'negative',
          },
          {
            label: 'Vlerë asetesh',
            value: 'Banka, pasuri të paluajtshme',
            cost: 'E lë anash markën dhe rritjen',
          },
        ],
      },
      en: {
        heading: 'Which method for which company',
        columns: ['Method', 'Works well for', 'The weakness'],
        rows: [
          {
            label: 'Discounted cash flow',
            value: 'Steady profits',
            cost: 'Very sensitive to assumptions',
          },
          {
            label: 'Comparables',
            value: 'Mature sectors',
            cost: 'The whole sector may be overvalued',
            tone: 'negative',
          },
          {
            label: 'Asset value',
            value: 'Banks, real estate',
            cost: 'Ignores the brand and growth',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'discount-rate',
          term: 'Normë zbritjeje',
          definition:
            'Sa më pak vlejnë sot paratë e ardhshme. Ngjitet bashkë me normat e interesit dhe me rrezikun.',
          aliases: ['norma e zbritjes'],
        },
        {
          slug: 'discounted-cash-flow',
          term: 'Fluks i zbritur parash',
          definition:
            'Vlerësim që i mbledh paratë e ardhshme të kompanisë, secilën të zbritur sipas kohës.',
          aliases: ['DCF'],
        },
        {
          slug: 'intrinsic-value',
          term: 'Vlerë e brendshme',
          definition:
            'Sa vlen një biznes sipas parave që i nxjerr, pa marrë parasysh çmimin e tregut.',
        },
      ],
      en: [
        {
          slug: 'discount-rate',
          term: 'Discount rate',
          definition:
            'How much less future money is worth today. It climbs along with interest rates and risk.',
          aliases: ['discount rates'],
        },
        {
          slug: 'discounted-cash-flow',
          term: 'Discounted cash flow',
          definition:
            "A valuation that adds up a company's future cash, each amount discounted for time.",
          aliases: ['DCF'],
        },
        {
          slug: 'intrinsic-value',
          term: 'Intrinsic value',
          definition:
            'What a business is worth based on the cash it produces, regardless of the market price.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse rritja e normave të interesit i ul çmimet e aksioneve edhe kur vetë kompanitë nuk kanë ndryshuar fare?',
        options: [
          'Sepse investitorët shesin nga paniku',
          'Sepse fitimet e ardhshme zbriten me normë më të lartë dhe sot vlejnë më pak',
          'Sepse kompanitë paguajnë më shumë taksa',
        ],
        answer: 1,
        explanation:
          'Vlera janë paratë e ardhshme të sjella në ditën e sotme. Ngriteni normën e zbritjes dhe e njëjta e ardhme vlen më pak.',
      },
      en: {
        question:
          "Why do rising interest rates push share prices down even when the companies themselves haven't changed at all?",
        options: [
          'Because investors sell in a panic',
          'Because future profits are discounted at a higher rate and are worth less today',
          'Because companies pay more tax',
        ],
        answer: 1,
        explanation:
          'Value is future cash brought back to today. Raise the discount rate and the same future is worth less.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: {
      sq: ['rritje-apo-vlere', 'si-levizin-normat-e-interesit'],
      en: ['growth-or-value', 'how-interest-rates-move'],
    },
  },

  {
    id: 'growth-vs-value',
    slug: { sq: 'rritje-apo-vlere', en: 'growth-or-value' },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Rritje apo vlerë?', en: 'Growth or value?' },
    summary: {
      sq: 'Dy mënyra për të fituar para nga i njëjti treg dhe pse funksionojnë në periudha të ndryshme.',
      en: 'Two ways of making money from the same market, and why they work in different periods.',
    },
    inOneSentence: {
      sq: 'Investimi në rritje paguan sot për fitime shumë më të mëdha nesër; investimi në vlerë paguan pak sot për fitime që janë tashmë aty.',
      en: 'Growth investing pays up today for much bigger profits tomorrow; value investing pays little today for profits that are already there.',
    },
    body: {
      sq: [
        {
          heading: 'Dy baste të ndryshme',
          paragraphs: [
            'Aksioni i rritjes kushton shtrenjtë krahasuar me fitimet që i ka tash, sepse tregu pret që ato fitime të shumëfishohen. Basti është se rritja do të vijë.',
            'Aksioni i vlerës kushton lirë krahasuar me fitimet e veta, sepse tregu pret pak. Basti është se e ardhmja nuk do të dalë aq e keqe sa e tregon çmimi.',
            'Të dyja mund të funksionojnë. Të dyja dështojnë ndryshe: rritja dështon kur rritja nuk vjen, vlera dështon kur kompania ishte e lirë për arsye të mirë.',
          ],
        },
        {
          heading: 'Pse normat e interesit vendosin cila fiton',
          paragraphs: [
            'Fitimet e një kompanie rritjeje janë kryesisht në të ardhmen e largët. Kur normat rriten, ajo e ardhme zbritet më ashpër dhe vlera e sotme bie shumë.',
            'Fitimet e një kompanie vlere janë kryesisht tash. Rritja e normave i prek më pak, sepse ka më pak të ardhme për t’u zbritur.',
            'Prandaj në periudha me norma të ulëta sundon rritja, kurse kur normat ngjiten, kthehet vlera. Kjo nuk është modë; është aritmetikë.',
          ],
        },
        {
          heading: 'Kurthi i “lirë”',
          paragraphs: [
            'Kompanitë që duken të lira shpesh janë të lira sepse biznesi po u shuhet ngadalë. Kjo quhet kurth vlere dhe është mënyra kryesore si i humbin paratë investitorët e vlerës.',
            'Prova e dobishme nuk është “a është i lirë?”, por “pse është i lirë dhe a është ajo arsye e përkohshme a e përhershme?”.',
            'Një gazetë e shtypur me P/E 5 nuk është zbritje. Është një biznes që zvogëlohet çdo vit dhe tregu e di këtë.',
          ],
        },
      ],
      en: [
        {
          heading: 'Two different bets',
          paragraphs: [
            'A growth stock is expensive relative to the profits it has now, because the market expects those profits to multiply. The bet is that the growth will come.',
            "A value stock is cheap relative to its own profits, because the market expects little. The bet is that the future won't turn out as bad as the price suggests.",
            "Both can work. They fail differently: growth fails when the growth doesn't come, value fails when the company was cheap for a good reason.",
          ],
        },
        {
          heading: 'Why interest rates decide which one wins',
          paragraphs: [
            "A growth company's profits sit mostly in the distant future. When rates rise, that future is discounted more harshly and today's value falls a lot.",
            "A value company's profits are mostly now. Rising rates touch it less, because there is less future to discount.",
            "That's why growth dominates in low-rate periods, and value comes back when rates climb. This isn't fashion; it's arithmetic.",
          ],
        },
        {
          heading: 'The “cheap” trap',
          paragraphs: [
            'Companies that look cheap are often cheap because the business is slowly dying. This is called a value trap, and it is the main way value investors lose money.',
            "The useful test isn't “is it cheap?” but “why is it cheap, and is that reason temporary or permanent?”.",
            'A printed newspaper with a P/E of 5 is not a bargain. It is a business shrinking every year, and the market knows it.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'growth-stock',
          term: 'Aksion rritjeje',
          definition:
            'Kompani çmimi i së cilës mbahet mbi pritjen e fitimeve shumë më të mëdha në të ardhmen.',
          aliases: ['aksione rritjeje'],
        },
        {
          slug: 'value-stock',
          term: 'Aksion vlere',
          definition:
            'Kompani që kushton pak krahasuar me fitimet që i nxjerr tashmë.',
          aliases: ['aksione vlere'],
        },
        {
          slug: 'value-trap',
          term: 'Kurth vlere',
          definition:
            'Kompani që duket e lirë sepse biznesi i saj po zvogëlohet vazhdimisht.',
        },
      ],
      en: [
        {
          slug: 'growth-stock',
          term: 'Growth stock',
          definition:
            'A company whose price rests on the expectation of much bigger profits in the future.',
          aliases: ['growth stocks'],
        },
        {
          slug: 'value-stock',
          term: 'Value stock',
          definition:
            'A company that costs little relative to the profits it already produces.',
          aliases: ['value stocks'],
        },
        {
          slug: 'value-trap',
          term: 'Value trap',
          definition:
            'A company that looks cheap because its business keeps shrinking.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse aksionet e rritjes vuajnë më shumë se ato të vlerës kur rriten normat e interesit?',
        options: [
          'Sepse janë më të vogla',
          'Sepse fitimet i kanë më larg në të ardhmen dhe zbriten më ashpër',
          'Sepse paguajnë më pak dividendë',
        ],
        answer: 1,
        explanation:
          'Sa më larg të jenë paratë, aq më shumë i dëmton një normë zbritjeje më e lartë. Rritja është thuajse e tëra e ardhme.',
      },
      en: {
        question:
          'Why do growth stocks suffer more than value stocks when interest rates rise?',
        options: [
          'Because they are smaller',
          'Because their profits are further in the future and get discounted more harshly',
          'Because they pay smaller dividends',
        ],
        answer: 1,
        explanation:
          'The further away the money is, the more a higher discount rate hurts it. Growth is almost entirely future.',
      },
    },
    relatedSymbols: ['nasdaq-100', 'sp-500'],
    upNextSlugs: {
      sq: [
        'si-levizin-normat-e-interesit',
        'fonde-indeksore-apo-zgjedhje-aksionesh',
      ],
      en: ['how-interest-rates-move', 'index-funds-or-stock-picking'],
    },
  },

  {
    id: 'dividends-getting-paid-to-hold',
    slug: { sq: 'dividendet', en: 'dividends' },
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: {
      sq: 'Dividendët: të paguhesh për të mbajtur',
      en: 'Dividends: getting paid to hold',
    },
    summary: {
      sq: 'Para të vërteta në llogari, por jo para falas — dhe pse çmimi bie atë ditë që paguhen.',
      en: "Real money in your account, but not free money — and why the price drops on the day it's paid.",
    },
    inOneSentence: {
      sq: 'Dividendi është një pjesë e fitimit që kompania jua kthen në para, kurse çmimi i aksionit bie pikërisht për atë shumë kur ndodh.',
      en: 'A dividend is a slice of profit the company returns to you in cash, and the share price drops by exactly that amount when it happens.',
    },
    body: {
      sq: [
        {
          heading: 'Nga vjen paraja',
          paragraphs: [
            'Kur një kompani fiton, i ka tri zgjedhje: t’i riinvestojë paratë në biznes, t’i blejë aksionet e veta ose t’ua japë aksionerëve. E treta është dividendi.',
            'Prandaj dividendët nuk janë ndonjë shpërblim shtesë. Janë vlerë që kalon nga brenda kompanisë në xhepin tuaj. Ditën që paguhen, aksioni hapet më poshtë pikërisht për atë shumë.',
            'Duket e çuditshme, por është e pashmangshme: kompania tash ka më pak para, prandaj vlen më pak. Në atë çast ju nuk keni fituar asgjë — thjesht i keni kaluar paratë nga një xhep në tjetrin.',
          ],
        },
        {
          heading: 'Pse ka rëndësi gjithsesi',
          paragraphs: [
            'Nëse dividendi nuk krijon vlerë, pse ka rëndësi? Sepse është disiplinë. Një kompani që premton dividend duhet të nxjerrë para të vërteta çdo vit për ta paguar.',
            'Fitimi mund të luhatet me kontabilitet. Pagesa në para jo. Prandaj një histori e gjatë dividendësh në rritje është sinjal i besueshëm për shëndetin e biznesit.',
            'Ka edhe një anë praktike: kush jeton nga investimet, me dividendë merr të ardhura pa pasur nevojë të shesë asgjë.',
          ],
        },
        {
          heading: 'Kur një yield i lartë është paralajmërim',
          paragraphs: [
            'Yield-i i dividendit është dividendi vjetor i pjesëtuar me çmimin. Nëse çmimi bie përgjysmë dhe dividendi mbetet i njëjti, yield-i dyfishohet.',
            'Prandaj yield-et më të larta në treg shpesh u takojnë kompanive në telashe, ku tregu tashmë pret që dividendi të pritet.',
            'Një yield prej 12% rrallë do të thotë “zbritje”. Zakonisht do të thotë “tregu nuk beson se kjo pagesë do të vazhdojë”.',
          ],
        },
      ],
      en: [
        {
          heading: 'Where the money comes from',
          paragraphs: [
            'When a company makes a profit, it has three choices: reinvest the money in the business, buy back its own shares, or hand it to shareholders. The third is the dividend.',
            "So dividends aren't some bonus on top. They are value moving from inside the company into your pocket. On the day they are paid, the share opens lower by exactly that amount.",
            "It looks odd, but it's inescapable: the company now has less cash, so it is worth less. At that moment you haven't gained anything — you've simply moved money from one pocket to the other.",
          ],
        },
        {
          heading: 'Why it matters anyway',
          paragraphs: [
            "If the dividend doesn't create value, why does it matter? Because it is discipline. A company that promises a dividend has to produce real cash every year to pay it.",
            "Profit can be massaged with accounting. A cash payment cannot. That's why a long history of rising dividends is a reliable signal of a healthy business.",
            "There's a practical side too: if you live off your investments, dividends give you income without having to sell anything.",
          ],
        },
        {
          heading: 'When a high yield is a warning',
          paragraphs: [
            'The dividend yield is the annual dividend divided by the price. If the price halves and the dividend stays the same, the yield doubles.',
            "That's why the highest yields in the market often belong to companies in trouble, where the market already expects the dividend to be cut.",
            "A 12% yield rarely means “bargain”. It usually means “the market doesn't believe this payment will continue”.",
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Çfarë bën një kompani me fitimin',
        columns: ['Zgjedhja', 'Kush përfiton', 'Kur ka kuptim'],
        rows: [
          {
            label: 'Riinveston',
            value: 'Aksionerët afatgjatë',
            cost: 'Kur ka projekte të mira',
            tone: 'positive',
          },
          {
            label: 'Paguan dividend',
            value: 'Aksionerët sot',
            cost: 'Kur s’ka ku t’i vërë',
          },
          {
            label: 'Blen aksionet e veta',
            value: 'Ata që mbeten',
            cost: 'Kur aksioni është i lirë',
          },
        ],
      },
      en: {
        heading: 'What a company does with its profit',
        columns: ['The choice', 'Who benefits', 'When it makes sense'],
        rows: [
          {
            label: 'Reinvests',
            value: 'Long-term shareholders',
            cost: 'When it has good projects',
            tone: 'positive',
          },
          {
            label: 'Pays a dividend',
            value: 'Shareholders today',
            cost: 'When it has nowhere better to put it',
          },
          {
            label: 'Buys back its own shares',
            value: 'Those who stay',
            cost: 'When the stock is cheap',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'dividend',
          term: 'Dividend',
          definition: 'Pjesë e fitimit që u paguhet aksionerëve në para.',
          aliases: ['dividendi', 'dividendët'],
        },
        {
          slug: 'dividend-yield',
          term: 'Yield i dividendit',
          definition: 'Dividendi vjetor si përqindje e çmimit të aksionit.',
          aliases: ['yield-i i dividendit'],
        },
        {
          slug: 'payout-ratio',
          term: 'Raport shpërndarjeje',
          definition:
            'Sa përqind e fitimit shkon në dividend. Mbi njëqind do të thotë se po paguhet nga rezervat.',
        },
        {
          slug: 'ex-dividend-date',
          term: 'Data pa dividend',
          definition:
            'Dita prej së cilës blerja e aksionit nuk ju jep më të drejtë mbi dividendin e radhës.',
        },
      ],
      en: [
        {
          slug: 'dividend',
          term: 'Dividend',
          definition: 'A slice of profit paid out to shareholders in cash.',
          aliases: ['dividends'],
        },
        {
          slug: 'dividend-yield',
          term: 'Dividend yield',
          definition: 'The annual dividend as a percentage of the share price.',
          aliases: ['dividend yields', 'yield'],
        },
        {
          slug: 'payout-ratio',
          term: 'Payout ratio',
          definition:
            'What percentage of profit goes to the dividend. Above one hundred means it is being paid out of reserves.',
        },
        {
          slug: 'ex-dividend-date',
          term: 'Ex-dividend date',
          definition:
            'The day from which buying the share no longer entitles you to the next dividend.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një aksion ka yield dividendi prej 12%, shumë mbi treg. Çka do të thotë kjo më së shpeshti?',
        options: [
          'Mundësi e rrallë për të ardhura të larta',
          'Se çmimi ka rënë dhe tregu pret që dividendi të pritet',
          'Se kompania është shumë fitimprurëse',
        ],
        answer: 1,
        explanation:
          'Yield-i rritet kur bie çmimi. Yield-et më të larta zakonisht tregojnë dyshim se a do të mbahet pagesa.',
      },
      en: {
        question:
          'A stock has a dividend yield of 12%, far above the market. What does that most often mean?',
        options: [
          'A rare opportunity for high income',
          'That the price has fallen and the market expects the dividend to be cut',
          'That the company is highly profitable',
        ],
        answer: 1,
        explanation:
          'The yield rises when the price falls. The highest yields usually signal doubt about whether the payment will hold.',
      },
    },
    upNextSlugs: {
      sq: ['riblerjet-e-aksioneve', 'cka-eshte-nje-fond'],
      en: ['share-buybacks', 'what-is-a-fund'],
    },
  },

  {
    id: 'share-buybacks',
    slug: { sq: 'riblerjet-e-aksioneve', en: 'share-buybacks' },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: { sq: 'Riblerjet e aksioneve', en: 'Share buybacks' },
    summary: {
      sq: 'Kompania i blen aksionet e veta dhe i asgjëson. Pjesa juaj e biznesit rritet pa blerë asgjë.',
      en: 'The company buys its own shares and cancels them. Your slice of the business grows without you buying anything.',
    },
    inOneSentence: {
      sq: 'Riblerja e ul numrin e aksioneve, kështu që i njëjti fitim ndahet në më pak pjesë dhe secila pjesë vlen më shumë.',
      en: 'A buyback lowers the share count, so the same profit is split into fewer pieces and each piece is worth more.',
    },
    body: {
      sq: [
        {
          heading: 'Mekanika',
          paragraphs: [
            'Kompania i përdor paratë e veta për t’i blerë aksionet e veta nga tregu dhe pastaj i anulon. Numri i aksioneve në qarkullim bie.',
            'Nëse kompania fiton 100 milionë dhe i ka 100 milionë aksione, fitimi për aksion është 1 €. Bliji dhe anuloji dhjetë milionë aksione, dhe i njëjti fitim jep 1,11 € për aksion.',
            'Ju nuk morët asgjë në dorë, por pjesa juaj e pronësisë u rrit. Është dividend i heshtur, i paguar në pronësi në vend të parave.',
          ],
        },
        {
          heading: 'Pse nganjëherë parapëlqehen para dividendëve',
          paragraphs: [
            'Në shumë juridiksione dividendët taksohen kur paguhen, kurse përfitimi nga riblerja del si rritje e çmimit dhe taksohet vetëm kur e shitni. Kohën e vendosni ju.',
            'Riblerjet janë po ashtu të lëvizshme: një kompani mund t’i ndalë pa dhënë shenjë krize. Prerja e dividendit, përkundrazi, lexohet gjithmonë si lajm i keq.',
            'Kjo lehtësi e ka një çmim: riblerjet shpesh ndalen pikërisht kur aksioni është i lirë, sepse ekonomia është e vështirë dhe paraja duhet gjetiu.',
          ],
        },
        {
          heading: 'Kur janë shkatërrim vlere',
          paragraphs: [
            'Riblerja krijon vlerë vetëm nëse aksioni blihet nën vlerën e vet të vërtetë. Nëse kompania blen shtrenjtë, ka shpenzuar para për të marrë më pak se sa pagoi.',
            'Në praktikë, shumë kompani blejnë më së shumti kur çmimet janë të larta dhe paraja e bollshme — pra pikërisht në çastin më të keq.',
            'Shikoni po ashtu a po bie vërtet numri i aksioneve. Shpesh riblerjet vetëm i mbulojnë aksionet e reja që u jepen drejtuesve si shpërblim, dhe numri neto nuk luan fare.',
          ],
        },
      ],
      en: [
        {
          heading: 'The mechanics',
          paragraphs: [
            'The company uses its own cash to buy its own shares on the market and then cancels them. The number of shares outstanding falls.',
            'If the company earns 100 million and has 100 million shares, earnings per share is €1. Buy and cancel ten million shares, and the same profit gives €1.11 per share.',
            'You received nothing in hand, but your slice of ownership grew. It is a silent dividend, paid in ownership instead of cash.',
          ],
        },
        {
          heading: 'Why they are sometimes preferred over dividends',
          paragraphs: [
            'In many jurisdictions dividends are taxed when they are paid, while the gain from a buyback shows up as a higher price and is taxed only when you sell. You choose the timing.',
            'Buybacks are also flexible: a company can stop them without signalling a crisis. Cutting a dividend, by contrast, is always read as bad news.',
            'That flexibility has a price: buybacks often stop exactly when the stock is cheap, because the economy is tough and the cash is needed elsewhere.',
          ],
        },
        {
          heading: 'When they destroy value',
          paragraphs: [
            'A buyback only creates value if the shares are bought below their true worth. If the company buys at expensive prices, it has spent cash to get back less than it paid.',
            'In practice, many companies buy the most when prices are high and cash is plentiful — in other words, at the worst possible moment.',
            "Also check whether the share count is actually falling. Buybacks often just cover the new shares handed to executives as compensation, and the net count doesn't move at all.",
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'buyback',
          term: 'Riblerje',
          definition:
            'Blerja e aksioneve të veta nga vetë kompania, të cilat pastaj anulohen.',
          aliases: ['riblerjet', 'riblerje aksionesh'],
        },
        {
          slug: 'shares-outstanding',
          term: 'Aksione në qarkullim',
          definition:
            'Numri i përgjithshëm i aksioneve që ekzistojnë dhe i mbajnë investitorët.',
        },
        {
          slug: 'dilution',
          term: 'Hollim',
          definition:
            'Zvogëlimi i pjesës suaj kur kompania nxjerr aksione të reja.',
          aliases: ['hollimi'],
        },
      ],
      en: [
        {
          slug: 'buyback',
          term: 'Buyback',
          definition:
            'A company buying its own shares, which are then cancelled.',
          aliases: ['buybacks', 'share repurchase'],
        },
        {
          slug: 'shares-outstanding',
          term: 'Shares outstanding',
          definition:
            'The total number of shares that exist and are held by investors.',
        },
        {
          slug: 'dilution',
          term: 'Dilution',
          definition:
            'The shrinking of your slice when the company issues new shares.',
          aliases: ['diluted'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani shpall riblerje të madhe, por numri i aksioneve në qarkullim nuk bie. Pse?',
        options: [
          'Riblerja nuk ka nisur ende',
          'Aksionet e reja që u jepen drejtuesve po e mbulojnë riblerjen',
          'Riblerjet nuk ndikojnë kurrë në numrin e aksioneve',
        ],
        answer: 1,
        explanation:
          'Shumë riblerje vetëm i mbulojnë shpërblimet në aksione. Rëndësi ka numri neto, jo shuma e shpallur.',
      },
      en: {
        question:
          "A company announces a large buyback, but the number of shares outstanding doesn't fall. Why?",
        options: [
          "The buyback hasn't started yet",
          'New shares handed to executives are offsetting the buyback',
          'Buybacks never affect the share count',
        ],
        answer: 1,
        explanation:
          'Many buybacks merely cover stock-based compensation. What matters is the net count, not the announced amount.',
      },
    },
    upNextSlugs: {
      sq: ['ndarja-e-aksioneve', 'si-vleresohet-nje-kompani'],
      en: ['stock-splits', 'how-a-company-is-valued'],
    },
  },

  {
    id: 'what-is-a-stock-split',
    slug: { sq: 'ndarja-e-aksioneve', en: 'stock-splits' },
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: {
      sq: 'Ndarja e aksioneve: shumë zhurmë për asgjë',
      en: 'Stock splits: much ado about nothing',
    },
    summary: {
      sq: 'Një aksion bëhet dhjetë, secili nga një e dhjeta e çmimit. Ju keni saktësisht të njëjtën gjë.',
      en: 'One share becomes ten, each at a tenth of the price. You own exactly the same thing.',
    },
    inOneSentence: {
      sq: 'Ndarja e aksioneve e ndryshon vetëm numrin e copave, jo madhësinë e ëmbëlsirës.',
      en: 'A stock split only changes the number of slices, not the size of the cake.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë ndodh në të vërtetë',
          paragraphs: [
            'Në një ndarje 10 për 1, çdo aksion bëhet dhjetë aksione dhe çmimi i secilit bie në një të dhjetën. Nëse kishit një aksion prej 1.000 €, tash keni dhjetë aksione nga 100 €.',
            'Vlera juaj e përgjithshme është e njëjta. Pjesa juaj e kompanisë është e njëjta. Në aspektin ekonomik nuk ka ndryshuar asgjë.',
            'Prandaj ndarja nuk është lajm në kuptimin e vërtetë. Është veprim kontabël me qëllim kryesisht pamor.',
          ],
        },
        {
          heading: 'Pse i bëjnë kompanitë',
          paragraphs: [
            'Një çmim prej disa mijëra eurosh për aksion i pengon investitorët e vegjël, sidomos aty ku nuk lejohen aksione të pjesshme. Ndarja e bën aksionin të kapshëm.',
            'Ka edhe një anë sinjali. Kompanitë zakonisht i ndajnë aksionet pas një rritjeje të gjatë, prandaj ndarja lexohet si “drejtuesit besojnë se çmimi do të mbahet lart”.',
            'Ky sinjal e shpjegon pse aksionet shpesh rriten pas njoftimit të një ndarjeje, edhe pse vetë ndarja nuk krijon asgjë.',
          ],
        },
        {
          heading: 'Ndarja e kundërt është një histori tjetër',
          paragraphs: [
            'Në një ndarje të kundërt, dhjetë aksione bëhen një dhe çmimi dhjetëfishohet. Edhe këtu vlera juaj mbetet e njëjta.',
            'Por arsyeja zakonisht është tjetër: kompanitë e bëjnë këtë kur çmimi ka rënë aq shumë sa rrezikon të përjashtohet nga bursa.',
            'Prandaj ndarja e zakonshme është shenjë force, kurse ajo e kundërta thuajse gjithmonë shenjë telashesh.',
          ],
        },
      ],
      en: [
        {
          heading: 'What actually happens',
          paragraphs: [
            'In a 10-for-1 split, every share becomes ten shares and the price of each drops to a tenth. If you had one share worth €1,000, you now have ten shares at €100.',
            'Your total value is the same. Your slice of the company is the same. Economically, nothing has changed.',
            "So a split isn't news in any real sense. It is an accounting move with a mostly cosmetic purpose.",
          ],
        },
        {
          heading: 'Why companies do it',
          paragraphs: [
            "A price of several thousand euros per share puts off small investors, especially where fractional shares aren't allowed. A split makes the stock reachable.",
            'There is a signalling side too. Companies usually split after a long rise, so a split reads as “management believes the price will stay high”.',
            'That signal explains why stocks often rise after a split announcement, even though the split itself creates nothing.',
          ],
        },
        {
          heading: 'The reverse split is a different story',
          paragraphs: [
            'In a reverse split, ten shares become one and the price is multiplied by ten. Here too your value stays the same.',
            'But the reason is usually different: companies do this when the price has fallen so far it risks being delisted from the exchange.',
            'So an ordinary split is a sign of strength, while a reverse one is almost always a sign of trouble.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'stock-split',
          term: 'Ndarje aksionesh',
          definition:
            'Kthimi i çdo aksioni në disa aksione më të vogla, pa u ndryshuar vlera e përgjithshme.',
          aliases: ['ndarja e aksioneve'],
        },
        {
          slug: 'reverse-split',
          term: 'Ndarje e kundërt',
          definition:
            'Bashkimi i disa aksioneve në një, zakonisht për ta ngritur një çmim shumë të ulët.',
        },
        {
          slug: 'fractional-shares',
          term: 'Aksione të pjesshme',
          definition:
            'Mundësia për të blerë vetëm një pjesë të aksionit, që e bën ndarjen më pak të nevojshme.',
        },
      ],
      en: [
        {
          slug: 'stock-split',
          term: 'Stock split',
          definition:
            'Turning each share into several smaller shares, with no change in total value.',
          aliases: ['stock splits', 'share split'],
        },
        {
          slug: 'reverse-split',
          term: 'Reverse split',
          definition:
            'Merging several shares into one, usually to lift a very low price.',
        },
        {
          slug: 'fractional-shares',
          term: 'Fractional shares',
          definition:
            'The ability to buy just part of a share, which makes splits less necessary.',
        },
      ],
    },
    quiz: {
      sq: {
        question: 'Pas një ndarjeje 5 për 1, sa ndryshon vlera e asaj që keni?',
        options: ['Pesëfishohet', 'Nuk ndryshon fare', 'Bie në një të pestën'],
        answer: 1,
        explanation:
          'Keni pesë herë më shumë aksione, secili nga një e pesta e çmimit. Pjesa juaj e kompanisë mbetet e njëjta.',
      },
      en: {
        question:
          'After a 5-for-1 split, how much does the value of what you own change?',
        options: [
          'It multiplies by five',
          "It doesn't change at all",
          'It drops to a fifth',
        ],
        answer: 1,
        explanation:
          'You have five times as many shares, each at a fifth of the price. Your slice of the company stays the same.',
      },
    },
    upNextSlugs: {
      sq: ['cka-eshte-ipo', 'si-levizin-cmimet-e-aksioneve'],
      en: ['what-is-an-ipo', 'how-share-prices-move'],
    },
  },

  {
    id: 'what-an-ipo-really-is',
    slug: { sq: 'cka-eshte-ipo', en: 'what-is-an-ipo' },
    topicId: 'stocks-etfs',
    level: 'intermediate',
    noMaths: true,
    title: {
      sq: 'Çfarë është në të vërtetë një IPO',
      en: 'What an IPO really is',
    },
    summary: {
      sq: 'Kush shet, kush blen dhe pse çmimi i ditës së parë rrallë është ai që ka rëndësi.',
      en: 'Who sells, who buys, and why the first-day price is rarely the one that matters.',
    },
    inOneSentence: {
      sq: 'Në një IPO, njerëz që e njohin kompaninë shumë mirë ju shesin një pjesë të saj në një çast që e zgjedhin vetë.',
      en: 'In an IPO, people who know the company very well sell you a piece of it at a moment of their own choosing.',
    },
    body: {
      sq: [
        {
          heading: 'Kush është në anën tjetër',
          paragraphs: [
            'Në çdo shitblerje dikush shet. Në një IPO ata janë themeluesit, investitorët e hershëm dhe fondet e kapitalit sipërmarrës — pikërisht njerëzit që dinë më shumë se kushdo për atë biznes.',
            'Ata e zgjedhin edhe kohën. Kompanitë dalin në bursë kur tregjet janë të ngrohta dhe vlerësimet bujare, jo kur janë të ftohta.',
            'Kjo nuk do të thotë se çdo IPO është kurth. Do të thotë se ju jeni pala më pak e informuar në një transaksion kohën e të cilit e zgjodhi pala tjetër, dhe kjo kërkon kujdes shtesë.',
          ],
        },
        {
          heading: 'Çmimi që shihni nuk është çmimi që u pagua',
          paragraphs: [
            'Bankat e caktojnë një çmim oferte dhe ua shesin aksionet klientëve institucionalë. Kur hapet shitblerja për publikun, çmimi shpesh është tashmë shumë më lart.',
            'Ai “kërcim i ditës së parë” raportohet si sukses, por në fakt janë para që kompania nuk i mori — vlerë që u kalua atyre që i morën aksionet me çmimin e ofertës.',
            'Investitori i vogël thuajse gjithmonë blen pas kërcimit, jo para tij.',
          ],
        },
        {
          heading: 'Periudha e bllokimit',
          paragraphs: [
            'Të brendshmëve zakonisht u ndalohet të shesin gjashtë muaj pas listimit. Kur skadon ai afat, një sasi e madhe aksionesh mund të dalë përnjëherë në treg.',
            'Prandaj shumë IPO kanë rënie të dukshme rreth muajit të gjashtë, pa asnjë lajm të keq për biznesin. Është thjesht ofertë e re që përplaset me të njëjtën kërkesë.',
            'Nëse doni të keni një kompani të sapolistuar, po të prisni disa tremujorë merrni më shumë të dhëna dhe shpesh një çmim më të mirë.',
          ],
        },
      ],
      en: [
        {
          heading: 'Who is on the other side',
          paragraphs: [
            "In every trade, someone is selling. In an IPO it's the founders, the early investors and the venture capital funds — precisely the people who know more about that business than anyone.",
            'They choose the timing too. Companies go public when markets are warm and valuations generous, not when they are cold.',
            "That doesn't mean every IPO is a trap. It means you are the less-informed party in a transaction whose timing was chosen by the other side, and that calls for extra care.",
          ],
        },
        {
          heading: 'The price you see is not the price that was paid',
          paragraphs: [
            'Banks set an offer price and sell the shares to institutional clients. By the time trading opens to the public, the price is often already much higher.',
            'That “first-day pop” gets reported as a success, but it is really money the company never received — value handed to those who got the shares at the offer price.',
            'The small investor almost always buys after the pop, not before it.',
          ],
        },
        {
          heading: 'The lock-up period',
          paragraphs: [
            'Insiders are usually barred from selling for six months after the listing. When that period expires, a large batch of shares can hit the market all at once.',
            "That's why many IPOs see a visible drop around month six, with no bad news about the business at all. It is simply new supply colliding with the same demand.",
            'If you want to own a newly listed company, waiting a few quarters gets you more data and often a better price.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'ipo',
          term: 'IPO',
          definition:
            'Ofertë publike fillestare — hera e parë që aksionet e një kompanie u shiten investitorëve të gjerë.',
          aliases: ['ofertë publike fillestare', 'listim'],
        },
        {
          slug: 'lock-up-period',
          term: 'Periudhë bllokimi',
          definition:
            'Koha pas listimit gjatë së cilës të brendshmit nuk mund t’i shesin aksionet e veta.',
        },
        {
          slug: 'underwriter',
          term: 'Nënshkrues',
          definition:
            'Banka që e cakton çmimin e ofertës dhe i shet aksionet e para.',
        },
      ],
      en: [
        {
          slug: 'ipo',
          term: 'IPO',
          definition:
            "Initial public offering — the first time a company's shares are sold to the wider investing public.",
          aliases: ['initial public offering', 'listing', 'going public'],
        },
        {
          slug: 'lock-up-period',
          term: 'Lock-up period',
          definition:
            'The time after a listing during which insiders cannot sell their shares.',
          aliases: ['lock-up', 'lockup period'],
        },
        {
          slug: 'underwriter',
          term: 'Underwriter',
          definition:
            'The bank that sets the offer price and sells the first shares.',
          aliases: ['underwriters'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse shumë IPO bien rreth gjashtë muaj pas listimit, edhe pa pasur lajme të këqija?',
        options: [
          'Sepse entuziazmi i fillimit zbehet gjithmonë',
          'Sepse skadon periudha e bllokimit dhe të brendshmit mund të shesin',
          'Sepse rregullatorët kërkojnë një rivlerësim',
        ],
        answer: 1,
        explanation:
          'Skadimi i bllokimit sjell në treg një ofertë të re e të madhe aksionesh, përballë së njëjtës kërkesë.',
      },
      en: {
        question:
          'Why do many IPOs fall around six months after listing, even without any bad news?',
        options: [
          'Because the initial excitement always fades',
          'Because the lock-up period expires and insiders can sell',
          'Because regulators require a revaluation',
        ],
        answer: 1,
        explanation:
          'The lock-up expiry brings a large new supply of shares to market, up against the same demand.',
      },
    },
    upNextSlugs: {
      sq: [
        'fonde-indeksore-apo-zgjedhje-aksionesh',
        'si-vleresohet-nje-kompani',
      ],
      en: ['index-funds-or-stock-picking', 'how-a-company-is-valued'],
    },
  },

  {
    id: 'index-funds-vs-stock-picking',
    slug: {
      sq: 'fonde-indeksore-apo-zgjedhje-aksionesh',
      en: 'index-funds-or-stock-picking',
    },
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: {
      sq: 'Fonde indeksore apo zgjedhje aksionesh?',
      en: 'Index funds or stock picking?',
    },
    summary: {
      sq: 'Pse mesatarja e mund shumicën dhe çka duhet të jetë e vërtetë që ju ta mundni mesataren.',
      en: 'Why the average beats the majority, and what has to be true for you to beat the average.',
    },
    inOneSentence: {
      sq: 'Të gjithë investitorët bashkë janë vetë tregu, prandaj pas kostove shumica duhet të mbetet nën të — kurse fondi indeksor thjesht nuk pranon t’i paguajë ato kosto.',
      en: 'All investors together are the market itself, so after costs most must fall below it — while the index fund simply refuses to pay those costs.',
    },
    body: {
      sq: [
        {
          heading: 'Aritmetika që nuk mund të shmanget',
          paragraphs: [
            'Për çdo investitor që e mund tregun, dikush tjetër duhet të mbetet poshtë për po aq. Të gjithë bashkë, para kostove, investitorët e fitojnë saktësisht kthimin e tregut.',
            'Pastaj hiqni tarifat, komisionet dhe spread-et. Pas tyre, investitori mesatar aktiv medoemos mbetet nën treg.',
            'Ky nuk është pesimizëm për zotësinë e njerëzve. Është barazim matematikor dhe vlen sado të zgjuar të jenë pjesëmarrësit.',
          ],
        },
        {
          heading: 'Çfarë do të thotë për ju',
          paragraphs: [
            'Që t’i zgjidhni aksionet me sukses, duhet të dini diçka që tregu nuk e ka çmuar ende — përballë njerëzve me terminale, me ekipe analistësh dhe me qasje te drejtuesit.',
            'Kjo është e mundur, por është pretendim serioz. Pyetja e ndershme nuk është “a mundem?”, por “çka kam unë që s’e kanë ata?”.',
            'Nëse përgjigjja është durimi — zotësia për ta mbajtur diçka dhjetë vjet, kur ata maten çdo tremujor — atëherë kjo është përparësi e vërtetë. Nëse përgjigjja është një artikull që e lexuat, nuk është.',
          ],
        },
        {
          heading: 'Një rrugë e mesme e arsyeshme',
          paragraphs: [
            'Shumë njerëz mbajnë një bazë të gjerë indeksore dhe një pjesë të vogël për aksione veç e veç. Baza e siguron rezultatin; pjesa e vogël e mbush kureshtjen pa e rrezikuar planin.',
            'Nëse e bëni këtë, mbajeni shënim rezultatin e pjesës aktive kundrejt indeksit, ndershëm, për disa vite. Të dhënat do t’ju thonë më shumë se çdo debat.',
            'Rregull praktik: rrezikoni aktivisht vetëm aq sa mund ta humbni pa ju ndryshuar asgjë tjetër në jetë.',
          ],
        },
      ],
      en: [
        {
          heading: "The arithmetic you can't escape",
          paragraphs: [
            "For every investor who beats the market, someone else has to fall below it by just as much. All together, before costs, investors earn exactly the market's return.",
            'Now subtract the fees, commissions and spreads. After those, the average active investor must end up below the market.',
            "This isn't pessimism about people's skill. It is a mathematical identity, and it holds no matter how clever the participants are.",
          ],
        },
        {
          heading: 'What it means for you',
          paragraphs: [
            "To pick stocks successfully, you have to know something the market hasn't priced in yet — against people with terminals, teams of analysts and access to management.",
            "That is possible, but it is a serious claim. The honest question isn't “can I?” but “what do I have that they don't?”.",
            "If the answer is patience — the ability to hold something for ten years while they are measured every quarter — that is a real advantage. If the answer is an article you read, it isn't.",
          ],
        },
        {
          heading: 'A sensible middle road',
          paragraphs: [
            'Many people hold a broad index base plus a small sleeve for individual stocks. The base secures the outcome; the small sleeve feeds the curiosity without risking the plan.',
            "If you do this, track the active sleeve's results against the index, honestly, for a few years. The data will tell you more than any debate.",
            'Rule of thumb: only risk actively what you could lose without anything else in your life changing.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Dy rrugë, i njëjti treg',
        columns: ['Qasja', 'Çfarë ju duhet', 'Kostoja tipike'],
        rows: [
          {
            label: 'Fond i gjerë indeksor',
            value: 'Durim',
            cost: '0.07% në vit',
            tone: 'positive',
          },
          {
            label: 'Zgjedhje aksionesh',
            value: 'Përparësi e vërtetë informacioni',
            cost: 'Kohë, komisione, spread',
          },
          {
            label: 'Fond aktiv',
            value: 'Besim te menaxheri',
            cost: '1.20% në vit',
            tone: 'negative',
          },
        ],
      },
      en: {
        heading: 'Two roads, same market',
        columns: ['Approach', 'What you need', 'Typical cost'],
        rows: [
          {
            label: 'Broad index fund',
            value: 'Patience',
            cost: '0.07% a year',
            tone: 'positive',
          },
          {
            label: 'Stock picking',
            value: 'A genuine information edge',
            cost: 'Time, commissions, spreads',
          },
          {
            label: 'Active fund',
            value: 'Faith in the manager',
            cost: '1.20% a year',
            tone: 'negative',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'index-fund',
          term: 'Fond indeksor',
          definition:
            'Fond që e mban gjithçka që është në një indeks, pa zgjedhur mes tyre.',
          aliases: ['fondet indeksore'],
        },
        {
          slug: 'benchmark',
          term: 'Pikë referimi',
          definition:
            'Indeksi me të cilin krahasohet performanca e një investimi.',
          aliases: ['benchmark'],
        },
        {
          slug: 'edge',
          term: 'Avantazh',
          definition:
            'Diçka që e dini ose mund ta bëni dhe që tregu nuk e ka çmuar ende.',
        },
      ],
      en: [
        {
          slug: 'index-fund',
          term: 'Index fund',
          definition:
            'A fund that holds everything in an index, without choosing between them.',
          aliases: ['index funds'],
        },
        {
          slug: 'benchmark',
          term: 'Benchmark',
          definition:
            "The index an investment's performance is compared against.",
          aliases: ['benchmarks'],
        },
        {
          slug: 'edge',
          term: 'Edge',
          definition:
            "Something you know or can do that the market hasn't priced in yet.",
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse investitori mesatar aktiv, matematikisht, duhet të mbetet nën treg?',
        options: [
          'Sepse menaxherët aktivë zgjedhin keq',
          'Sepse të gjithë bashkë janë vetë tregu, e pastaj paguajnë edhe kosto',
          'Sepse fondet indeksore blejnë të parat',
        ],
        answer: 1,
        explanation:
          'Para kostove, investitorët së bashku e fitojnë saktësisht kthimin e tregut. Kostot e ulin atë mesatare nën të.',
      },
      en: {
        question:
          'Why must the average active investor, mathematically, end up below the market?',
        options: [
          'Because active managers pick badly',
          'Because all of them together are the market itself, and then they pay costs on top',
          'Because index funds get to buy first',
        ],
        answer: 1,
        explanation:
          "Before costs, investors collectively earn exactly the market's return. Costs drag that average below it.",
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: {
      sq: ['cka-eshte-nje-fond', 'tarifat-qe-ndryshojne-gjithcka'],
      en: ['what-is-a-fund', 'the-fees-that-change-everything'],
    },
  },
];
