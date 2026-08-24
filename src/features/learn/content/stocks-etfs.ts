import type { SeedLesson, SeedTopic } from './types';

/**
 * Aksione dhe ETF — how to look at a single company once you know what a
 * share is.
 *
 * Ordered from "why does this number move" through the three statements a
 * company publishes, and ending on the question of whether to pick companies
 * at all.
 */
export const STOCKS_ETFS_TOPIC: SeedTopic = {
  id: 'stocks-etfs',
  title: { sq: 'Aksione dhe ETF' },
  slugs: [
    'what-moves-a-share-price',
    'sectors-move-together',
    'what-is-a-pe-ratio',
    'reading-an-earnings-report',
    'reading-a-balance-sheet',
    'how-to-value-a-company',
    'growth-vs-value',
    'dividends-getting-paid-to-hold',
    'share-buybacks',
    'what-is-a-stock-split',
    'what-an-ipo-really-is',
    'index-funds-vs-stock-picking',
  ],
};

export const STOCKS_ETFS_LESSONS: SeedLesson[] = [
  {
    id: 'what-moves-a-share-price',
    slug: 'what-moves-a-share-price',
    topicId: 'stocks-etfs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Çfarë e lëviz çmimin e një aksioni gjatë ditës' },
    summary: {
      sq: 'Lajme, pritshmëri dhe rrjedha parash — dhe pse e treta shpjegon lëvizjet që të tjerat nuk i shpjegojnë dot.',
    },
    inOneSentence: {
      sq: 'Çmimi lëviz kur ndryshon mendimi kolektiv për fitimet e ardhshme, ose thjesht kur dikush i madh ka nevojë të blejë apo të shesë.',
    },
    body: {
      sq: [
        {
          heading: 'Surpriza, jo lajmi',
          paragraphs: [
            'Një kompani raporton fitime dyfish më të larta se vitin e kaluar dhe aksioni bie. Kjo duket absurde derisa kuptoni se çmimi i djeshëm përmbante tashmë një pritje.',
            'Analistët publikojnë parashikime. Ato parashikime mblidhen në një «konsensus», dhe konsensusi hyn në çmim përpara se rezultati të dalë. Kur rezultati vjen, tregu nuk pyet «a ishte i mirë?» por «a ishte më i mirë se ai që kishim çmuar tashmë?».',
            'Prandaj një kompani e shkëlqyer mund të ketë një aksion të keq për vite me radhë: nëse pritej përsosmëri dhe u dorëzua vetëm shkëlqim, çmimi ka vend vetëm për poshtë.',
          ],
        },
        {
          heading: 'Udhëzimi peshon më shumë se e kaluara',
          paragraphs: [
            'Në raportimet tremujore, shifrat e tremujorit që sapo mbaroi shpesh lëvizin çmimin më pak se ajo që drejtuesit thonë për tremujorin e ardhshëm.',
            'Kjo është logjike: një aksion vlen sa fitimet e së ardhmes, jo sa ato të së kaluarës. E kaluara ka rëndësi vetëm sepse na ndihmon të gjykojmë të ardhmen.',
            'Ndaj kur lexoni se «aksioni ra pavarësisht rezultateve të forta», shikoni udhëzimin. Aty është zakonisht përgjigjja.',
          ],
        },
        {
          heading: 'Rrjedhat që nuk kanë të bëjnë me kompaninë',
          paragraphs: [
            'Një pjesë e mirë e lëvizjeve ditore nuk kanë asnjë lidhje me biznesin. Një fond indeksor duhet të blejë sepse mori para të reja. Një fond pensioni ribalancon në fund të tremujorit. Një kompani që hyn ose del nga një indeks detyron qindra fonde të tregtojnë njëkohësisht.',
            'Këto janë blerës dhe shitës që nuk kanë asnjë mendim për kompaninë. Ata veprojnë sepse rregullat e tyre e kërkojnë.',
            'Kjo shpjegon lëvizje që përndryshe duken të pakuptimta, dhe është një kujtesë e dobishme: jo çdo lëvizje çmimi mbart informacion.',
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
            'Mesatarja e parashikimeve të analistëve — pragu që një rezultat duhet të kalojë për të quajtur lajm të mirë.',
          aliases: ['konsensusi', 'pritshmëritë e analistëve'],
        },
        {
          slug: 'guidance',
          term: 'Udhëzim',
          definition:
            'Parashikimi i vetë kompanisë për rezultatet e saj të ardhshme.',
          aliases: ['udhëzimi'],
        },
        {
          slug: 'flow',
          term: 'Rrjedhë',
          definition:
            'Blerje ose shitje të shkaktuara nga rregulla dhe nevoja, jo nga një mendim për kompaninë.',
          aliases: ['rrjedhat'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani raporton fitime më të mira se pritej, por aksioni bie fort. Ku duhet të shihni së pari?',
        options: [
          'Te fitimet e vitit të kaluar',
          'Te udhëzimi për tremujorët e ardhshëm',
          'Te numri i aksioneve në qarkullim',
        ],
        answer: 1,
        explanation:
          'Çmimi paguan për fitimet e ardhshme. Një udhëzim i dobët e prish një rezultat të mirë të së kaluarës.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['sectors-move-together', 'what-is-a-pe-ratio'],
  },

  {
    id: 'sectors-move-together',
    slug: 'sectors-move-together',
    topicId: 'stocks-etfs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Pse aksionet e një sektori lëvizin bashkë' },
    summary: {
      sq: 'Kompani të ndryshme me të njëjtin faktor rreziku reagojnë njësoj ndaj të njëjtit lajm.',
    },
    inOneSentence: {
      sq: 'Kur dy kompani varen nga e njëjta gjë, një lajm për atë gjë i lëviz të dyja, pavarësisht se sa ndryshe janë.',
    },
    body: {
      sq: [
        {
          heading: 'I njëjti faktor, i njëjti drejtim',
          paragraphs: [
            'Prodhuesit e çipave nuk konkurrojnë domosdoshmërisht me njëri-tjetrin, por të gjithë varen nga i njëjti cikël kërkese, të njëjtat fabrika dhe shpesh të njëjtët klientë. Kur del një lajm për kërkesën për çipa, të gjithë lëvizin.',
            'E njëjta gjë vlen për bankat dhe normat e interesit, për linjat ajrore dhe çmimin e naftës, për ndërtuesit e shtëpive dhe koston e kredive.',
            'Ky nuk është imitim ose panik. Është thjesht fakti që çmimi i secilës kompani varet nga një ndryshore e përbashkët.',
          ],
        },
        {
          heading: 'Pse ka rëndësi për ju',
          paragraphs: [
            'Nëse zotëroni pesë kompani teknologjike, nuk keni pesë investime — keni pak a shumë një investim të përsëritur pesë herë. Diversifikimi kërkon gjëra që varen nga faktorë të ndryshëm, jo thjesht emra të ndryshëm.',
            'Kjo është gjithashtu arsyeja pse një ETF sektorial nuk është i sigurt vetëm sepse është ETF. Njëqind kompani të së njëjtës industri mund të bien së bashku njësoj si njëra.',
            'Kur shikoni një portofol, pyetja e dobishme nuk është «sa gjëra kam?» por «nga sa faktorë të ndryshëm varen?».',
          ],
        },
        {
          heading: 'Rrotullimi mes sektorëve',
          paragraphs: [
            'Në periudha të ndryshme të ciklit ekonomik, para lëvizin sistematikisht nga një sektor te tjetri. Kur normat rriten, aksionet e rritjes vuajnë dhe bankat përfitojnë. Kur ekonomia ngadalësohet, shërbimet publike dhe konsumi bazë mbahen më mirë.',
            'Kjo lëvizje quhet rrotullim sektorial dhe shpjegon pse tregu mund të mbetet i sheshtë ndërkohë që poshtë sipërfaqes gjysma po rritet dhe gjysma po bie.',
            'Nuk është e nevojshme ta parashikoni. Është e dobishme ta njihni, që të mos ngatërroni një rrotullim me një krizë.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'sector',
          term: 'Sektor',
          definition:
            'Një grup kompanish që varen nga të njëjtat forca ekonomike.',
          aliases: ['sektori', 'sektorët'],
        },
        {
          slug: 'sector-rotation',
          term: 'Rrotullim sektorial',
          definition:
            'Lëvizja e parave nga një sektor te një tjetër sipas fazës së ciklit ekonomik.',
        },
        {
          slug: 'concentration',
          term: 'Përqendrim',
          definition:
            'Sa varet portofoli juaj nga një faktor i vetëm, pavarësisht sa emra mban.',
          aliases: ['i përqendruar'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Zotëroni pesë kompani të ndryshme teknologjike. Sa i diversifikuar jeni në të vërtetë?',
        options: [
          'Plotësisht — janë pesë kompani të ndryshme',
          'Pak, sepse të pesta varen nga të njëjtët faktorë',
          'Varet vetëm nga madhësia e tyre',
        ],
        answer: 1,
        explanation:
          'Diversifikimi matet me numrin e faktorëve nga varet portofoli, jo me numrin e emrave në të.',
      },
    },
    relatedSymbols: ['nasdaq-100', 'sp-500'],
    upNextSlugs: ['index-funds-vs-stock-picking', 'why-diversification-works'],
  },

  {
    id: 'what-is-a-pe-ratio',
    slug: 'what-is-a-pe-ratio',
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: { sq: 'Çfarë është raporti çmim/fitim (P/E)?' },
    summary: {
      sq: 'Një mënyrë e shpejtë për të pyetur: sa po paguaj për çdo euro fitimi?',
    },
    inOneSentence: {
      sq: 'P/E ju thotë sa vite fitimesh të sotme po paguani për të zotëruar një kompani.',
    },
    body: {
      sq: [
        {
          heading: 'Aritmetika dhe kuptimi i saj',
          paragraphs: [
            'Ndani çmimin e një aksioni me fitimin vjetor për aksion. Nëse aksioni kushton 40 € dhe kompania fiton 2 € për aksion në vit, P/E është 20.',
            'Një lexim i dobishëm: po paguani njëzet vite fitimesh të sotme. Nëse fitimet nuk rriten kurrë, do t’ju duheshin njëzet vjet që kompania t’ju kthente çmimin që paguat.',
            'Prandaj një P/E i lartë nuk do të thotë «i shtrenjtë» dhe një i ulët nuk do të thotë «i lirë». Do të thotë se tregu pret rritje në rastin e parë, dhe telashe në të dytin.',
          ],
        },
        {
          heading: 'Ku mashtron',
          paragraphs: [
            'Fitimet janë një numër kontabël, dhe numrat kontabël mund të tunden nga ngjarje njëherëshe: shitja e një ndërtese, një gjobë e madhe, një ristrukturim.',
            'Një kompani ciklike ka P/E më të ulët pikërisht në majë të ciklit, kur fitimet janë të fryra dhe gati të bien. P/E i ulët atje është një kurth, jo një zbritje.',
            'Dhe një kompani pa fitim nuk ka P/E fare. Kjo nuk e bën atë të keqe — thjesht e bën këtë mjet të papërdorshëm për të.',
          ],
        },
        {
          heading: 'Si përdoret në praktikë',
          paragraphs: [
            'P/E ka kuptim vetëm në krahasim: me historinë e vetë kompanisë, me konkurrentët e saj të drejtpërdrejtë, ose me tregun në tërësi.',
            'Një P/E prej 30 është i lartë për një bankë dhe i zakonshëm për një kompani softueri që rritet 25% në vit. Krahasimi duhet të jetë mes gjërash të ngjashme.',
            'Trajtojeni si pyetjen e parë, jo si përgjigjen. Ai ju thotë çfarë pret tregu; nuk ju thotë nëse tregu ka të drejtë.',
          ],
        },
      ],
    },
    workedExample: {
      sq: [
        {
          title: 'Dy kompani, i njëjti çmim aksioni',
          body: 'Të dyja kushtojnë 50 €. E para fiton 5 € për aksion, e dyta fiton 1 €.',
        },
        {
          title: 'Llogaritni P/E',
          body: 'E para ka P/E 10. E dyta ka P/E 50. Për të njëjtin çmim, po blini pesë herë më pak fitim te e dyta.',
        },
        {
          title: 'Pyetja e vërtetë',
          body: 'A do të rriten fitimet e së dytës mjaftueshëm shpejt sa ta justifikojnë atë diferencë? Ky është i gjithë investimi.',
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
    },
    keyTerms: {
      sq: [
        {
          slug: 'pe-ratio',
          term: 'Raporti P/E',
          definition:
            'Çmimi i aksionit pjesëtuar me fitimin vjetor për aksion.',
          aliases: ['P/E', 'çmim/fitim', 'raporti çmim-fitim'],
        },
        {
          slug: 'earnings-per-share',
          term: 'Fitim për aksion',
          definition:
            'Fitimi i kompanisë i ndarë me numrin e aksioneve në qarkullim.',
          aliases: ['EPS'],
        },
        {
          slug: 'cyclical',
          term: 'Ciklike',
          definition:
            'Një kompani fitimet e së cilës ndjekin ciklin ekonomik, si çeliku ose linjat ajrore.',
          aliases: ['ciklik', 'kompani ciklike'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani çeliku ka P/E 6, shumë nën tregun. Çfarë duhet të kontrolloni së pari?',
        options: [
          'Nëse paguan dividend',
          'Nëse fitimet janë në majë të ciklit dhe gati të bien',
          'Sa aksione ka në qarkullim',
        ],
        answer: 1,
        explanation:
          'Kompanitë ciklike duken më të lira pikërisht kur fitimet janë të fryra. P/E i ulët atje shpesh është paralajmërim, jo zbritje.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['how-to-value-a-company', 'reading-an-earnings-report'],
  },

  {
    id: 'reading-an-earnings-report',
    slug: 'reading-an-earnings-report',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: { sq: 'Si të lexoni një raport fitimesh' },
    summary: {
      sq: 'Katër numra që kanë rëndësi, dhe seksioni që tregu e lexon i pari.',
    },
    inOneSentence: {
      sq: 'Të ardhurat tregojnë shitjet, marzhi tregon shëndetin, fitimi për aksion tregon rezultatin, dhe udhëzimi tregon të ardhmen — dhe i fundit peshon më shumë se të tjerët.',
    },
    body: {
      sq: [
        {
          heading: 'Nga lart poshtë',
          paragraphs: [
            'Rreshti i parë janë të ardhurat: sa para hynë nga shitjet. Ai tregon nëse kompania po rritet, por nuk thotë asgjë për fitimin.',
            'Pastaj vjen marzhi bruto: sa mbetet nga çdo euro shitjeje pasi hiqet kostoja e drejtpërdrejtë e prodhimit. Një marzh që bie ndërsa shitjet rriten do të thotë se rritja po blihet me zbritje.',
            'Në fund vjen fitimi neto dhe fitimi për aksion. Ky është numri që raportohet në tituj, por është edhe më i lehti për t’u ndikuar nga ngjarje njëherëshe.',
          ],
        },
        {
          heading: 'Ku fshihen problemet',
          paragraphs: [
            'Kërkoni për fitimin operativ, jo vetëm atë neto. Fitimi operativ heq efektet e taksave, interesave dhe ngjarjeve të jashtëzakonshme, dhe tregon nëse vetë biznesi po funksionon.',
            'Shikoni gjithashtu paranë e gjeneruar nga operacionet. Një kompani mund të raportojë fitim dhe të djegë para njëkohësisht, nëse fitimi është në faturat e papaguara.',
            'Nëse fitimi rritet për vite me radhë ndërsa paraja nuk vjen pas, kjo është pyetja që duhet bërë përpara të tjerave.',
          ],
        },
        {
          heading: 'Pjesa që lëviz çmimin',
          paragraphs: [
            'Tregtarët profesionistë shpesh kalojnë menjëherë te udhëzimi. Numrat e tremujorit që shkoi janë histori; ajo që drejtuesit presin për tremujorin e ardhshëm është informacioni i ri.',
            'Prandaj shihni aksione që bien pas rezultatesh të shkëlqyera, ose rriten pas rezultatesh të dobëta. Titulli raporton të kaluarën; çmimi çmon të ardhmen.',
            'Nëse do të lexoni vetëm një pjesë të një raporti, lexoni udhëzimin dhe krahasojeni me konsensusin.',
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
            cost: 'Mund të tundet nga kontabiliteti',
          },
          {
            label: 'Paraja operative',
            value: 'A vjen paraja vërtet?',
            cost: 'Luhatet nga tremujori në tremujor',
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
          definition: 'Paratë totale nga shitjet, para çdo kostoje.',
          aliases: ['të ardhurat', 'xhiro'],
        },
        {
          slug: 'operating-margin',
          term: 'Marzh operativ',
          definition:
            'Fitimi nga veprimtaria kryesore si përqindje e të ardhurave.',
          aliases: ['marzhi operativ'],
        },
        {
          slug: 'free-cash-flow',
          term: 'Fluks i lirë parash',
          definition:
            'Paraja që mbetet pasi kompania paguan gjithçka që i duhet për të vazhduar punën.',
          aliases: ['fluksi i lirë i parasë'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani raporton fitim në rritje për tre vjet, por paraja nga operacionet bie. Çfarë sugjeron kjo?',
        options: [
          'Kompania po rritet shpejt dhe kjo është normale',
          'Fitimi mund të jetë në fatura të papaguara, jo në para të vërteta',
          'Taksat po rriten',
        ],
        answer: 1,
        explanation:
          'Fitimi është një gjykim kontabël; paraja jo. Kur të dyja shkojnë në drejtime të kundërta për vite, paraja zakonisht ka të drejtë.',
      },
    },
    upNextSlugs: ['reading-a-balance-sheet', 'how-to-value-a-company'],
  },

  {
    id: 'reading-a-balance-sheet',
    slug: 'reading-a-balance-sheet',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: { sq: 'Bilanci në një faqe' },
    summary: {
      sq: 'Çfarë zotëron kompania, çfarë detyrohet, dhe pse diferenca mes tyre nuk është e njëjta gjë me vlerën.',
    },
    inOneSentence: {
      sq: 'Bilanci është një fotografi e një momenti: aktivet në njërën anë, detyrimet në tjetrën, dhe kapitali i aksionerëve si diferenca.',
    },
    body: {
      sq: [
        {
          heading: 'Tri pjesët',
          paragraphs: [
            'Aktivet janë gjithçka që kompania zotëron: para, inventar, fabrika, patenta, dhe fatura që klientët nuk i kanë paguar ende.',
            'Detyrimet janë gjithçka që ajo u detyrohet të tjerëve: hua bankare, obligacione, faturat e vetë saj të papaguara, dhe premtimet e pensioneve.',
            'Diferenca quhet kapital i aksionerëve. Nëse kompania do të shiste gjithçka sot me vlerën e librave dhe do të paguante çdo borxh, kjo është shuma që do të mbetej për ju.',
          ],
        },
        {
          heading: 'Pse borxhi ka rëndësi më shumë se madhësia',
          paragraphs: [
            'Borxhi nuk është i keq në vetvete — është ai që lejon një kompani të ndërtojë diçka që nuk mund ta paguante nga xhepi. Problemi është koha.',
            'Një kompani me borxh të madh që duhet ripaguar vitin tjetër është e brishtë. Nëse tregjet e kredisë ngrijnë pikërisht atëherë, ajo mund të falimentojë ndërsa është ende fitimprurëse.',
            'Prandaj shikoni jo vetëm sa borxh ka, por kur skadon dhe sa kushton. Një borxh i gjatë dhe i lirë është krejt tjetër gjë nga një borxh i shkurtër dhe i shtrenjtë.',
          ],
        },
        {
          heading: 'Numrat që nuk janë aty',
          paragraphs: [
            'Bilanci mat atë që mund të matet. Marka, besnikëria e klientëve, aftësia e ekipit dhe efekti i rrjetit nuk shfaqen askund.',
            'Prandaj kompanitë më të vlefshme në botë shpesh kanë aktive modeste. Vlera e tyre është pothuajse e gjitha te gjëra që kontabiliteti nuk di t’i regjistrojë.',
            'E kundërta vlen gjithashtu: një kompani me fabrika të mëdha mund të ketë një bilanc mbresëlënës dhe një biznes që humbet para çdo vit.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          slug: 'assets',
          term: 'Aktive',
          definition: 'Gjithçka që kompania zotëron dhe që ka vlerë.',
          aliases: ['aktivet', 'asete'],
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
            'Aktivet minus detyrimet — ajo që u mbetet aksionerëve në letër.',
          aliases: ['kapitali i aksionerëve'],
        },
        {
          slug: 'leverage',
          term: 'Levë',
          definition:
            'Sa borxh përdor një kompani. Shumëfishon si fitimet ashtu edhe humbjet.',
          aliases: ['leva', 'i levarizuar'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Dy kompani kanë të njëjtin borxh total. Cila është më e brishtë?',
        options: [
          'Ajo me aktive më të vogla',
          'Ajo borxhi i së cilës skadon vitin e ardhshëm',
          'Ajo me më shumë aksionerë',
        ],
        answer: 1,
        explanation:
          'Falimentimet ndodhin kur një pagesë vjen dhe paraja nuk është aty. Afati i borxhit shpesh ka më shumë rëndësi se madhësia e tij.',
      },
    },
    upNextSlugs: ['how-to-value-a-company', 'reading-an-earnings-report'],
  },

  {
    id: 'how-to-value-a-company',
    slug: 'how-to-value-a-company',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: { sq: 'Si vlerësohet një kompani' },
    summary: {
      sq: 'Çdo vlerësim është i njëjti mendim i shprehur ndryshe: sa para do të prodhojë kjo gjë, dhe sa vlejnë ato para sot.',
    },
    inOneSentence: {
      sq: 'Vlera e një kompanie është shuma e parave që do të prodhojë në të ardhmen, e zbritur për faktin që paratë e nesërme vlejnë më pak se ato të sotmet.',
    },
    body: {
      sq: [
        {
          heading: 'Pse paratë e nesërme vlejnë më pak',
          paragraphs: [
            'Njëmijë euro sot nuk janë e njëjta gjë me njëmijë euro pas dhjetë vjetësh. Sot mund t’i investoni; atëherë nuk mundeni më. Dhe inflacioni do t’i ketë ngrënë një pjesë.',
            'Prandaj çdo vlerësim i zbret fitimet e ardhshme me një normë. Sa më e lartë norma, aq më pak vlejnë sot paratë e largëta.',
            'Kjo është arsyeja e vetme dhe e mjaftueshme pse rritja e normave të interesit ul çmimet e aksioneve, pa ndryshuar asgjë te vetë kompanitë.',
          ],
        },
        {
          heading: 'Tre rrugë drejt të njëjtës pyetje',
          paragraphs: [
            'Metoda e fluksit të zbritur i modelon paratë e ardhshme drejtpërdrejt. Është më e ndershmja dhe më e ndjeshmja ndaj supozimeve — ndryshoni normën e rritjes me një përqind dhe rezultati ndryshon në mënyrë dramatike.',
            'Metoda e krahasimit shikon se çfarë paguan tregu për kompani të ngjashme. Është më e shpejtë, por ju thotë vetëm nëse diçka është e lirë krahasuar me të tjerat, jo nëse është e lirë në vetvete.',
            'Metoda e aktiveve pyet sa do të merrnit po ta shitnit gjithçka. Ka kuptim për banka dhe kompani pasurish, dhe pothuajse asnjë për një kompani softueri.',
          ],
        },
        {
          heading: 'Çfarë të bëni me numrin që del',
          paragraphs: [
            'Asnjë prej këtyre metodave nuk prodhon një përgjigje. Ato prodhojnë një gamë, dhe gjerësia e asaj game është vetë informacioni.',
            'Nëse duhet të supozoni rritje 15% për njëzet vjet që çmimi i sotëm të ketë kuptim, ju nuk keni gjetur një kompani të lirë — keni gjetur se çfarë duhet të besojë tregu.',
            'Vlerësimi është më i dobishëm si kontroll i pritshmërive sesa si parashikim. Ai ju thotë çfarë po blini, jo çfarë do të fitoni.',
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
            cost: 'I gjithë sektori mund të jetë i mbivlerësuar',
            tone: 'negative',
          },
          {
            label: 'Vlerë aktivesh',
            value: 'Banka, pasuri të paluajtshme',
            cost: 'Injoron markën dhe rritjen',
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
            'Sa më pak vlejnë sot paratë e ardhshme. Ngjitet me normat e interesit dhe me rrezikun.',
          aliases: ['norma e zbritjes'],
        },
        {
          slug: 'discounted-cash-flow',
          term: 'Fluks i zbritur parash',
          definition:
            'Vlerësim që mbledh paratë e ardhshme të kompanisë, secilën të zbritur për kohën.',
          aliases: ['DCF'],
        },
        {
          slug: 'intrinsic-value',
          term: 'Vlerë e brendshme',
          definition:
            'Sa vlen një biznes sipas parave që prodhon, pavarësisht çmimit të tregut.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse rritja e normave të interesit ul çmimet e aksioneve edhe kur kompanitë nuk kanë ndryshuar fare?',
        options: [
          'Sepse investitorët shesin nga paniku',
          'Sepse fitimet e ardhshme zbriten me një normë më të lartë dhe vlejnë më pak sot',
          'Sepse kompanitë paguajnë më shumë taksa',
        ],
        answer: 1,
        explanation:
          'Vlera është paratë e ardhshme të sjella në të sotmen. Ngrini normën e zbritjes dhe e njëjta e ardhme vlen më pak.',
      },
    },
    relatedSymbols: ['sp-500'],
    upNextSlugs: ['growth-vs-value', 'what-moves-interest-rates'],
  },

  {
    id: 'growth-vs-value',
    slug: 'growth-vs-value',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Rritje apo vlerë?' },
    summary: {
      sq: 'Dy mënyra për të fituar para nga i njëjti treg, dhe pse funksionojnë në periudha të ndryshme.',
    },
    inOneSentence: {
      sq: 'Investimi në rritje paguan sot për fitime shumë më të mëdha nesër; investimi në vlerë paguan pak sot për fitime që ekzistojnë tashmë.',
    },
    body: {
      sq: [
        {
          heading: 'Dy baste të ndryshme',
          paragraphs: [
            'Një aksion rritjeje kushton shtrenjtë krahasuar me fitimet e tij aktuale, sepse tregu pret që ato fitime të shumëfishohen. Basti është se rritja do të ndodhë.',
            'Një aksion vlere kushton lirë krahasuar me fitimet e tij, sepse tregu pret pak. Basti është se e ardhmja nuk do të jetë aq e keqe sa çmimi sugjeron.',
            'Të dyja mund të funksionojnë. Të dyja dështojnë në mënyra të ndryshme: rritja dështon kur rritja nuk vjen, vlera dështon kur kompania ishte e lirë për një arsye të mirë.',
          ],
        },
        {
          heading: 'Pse normat e interesit vendosin cila fiton',
          paragraphs: [
            'Fitimet e një kompanie rritjeje janë kryesisht në të ardhmen e largët. Kur normat rriten, ajo e ardhme e largët zbritet më ashpër dhe vlera e sotme bie shumë.',
            'Fitimet e një kompanie vlere janë kryesisht tani. Rritja e normave i prek më pak, sepse ka më pak të ardhme për të zbritur.',
            'Prandaj në periudha me norma të ulëta rritja dominon, dhe kur normat ngjiten, vlera kthehet. Kjo nuk është modë; është aritmetikë.',
          ],
        },
        {
          heading: 'Kurthi i «lirë»',
          paragraphs: [
            'Kompani që duken të lira shpesh janë të lira sepse biznesi po vdes ngadalë. Kjo quhet kurth vlere, dhe është mënyra kryesore se si humbin para investitorët e vlerës.',
            'Testi i dobishëm nuk është «a është i lirë?» por «pse është i lirë, dhe a është ajo arsye e përkohshme apo përfundimtare?».',
            'Një gazetë e printuar me P/E 5 nuk është zbritje. Është një biznes që tkurret çdo vit dhe tregu e di.',
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
            'Një kompani çmimi i së cilës mbështetet te fitime shumë më të mëdha në të ardhmen.',
          aliases: ['aksione rritjeje'],
        },
        {
          slug: 'value-stock',
          term: 'Aksion vlere',
          definition:
            'Një kompani që kushton pak krahasuar me fitimet që prodhon tashmë.',
          aliases: ['aksione vlere'],
        },
        {
          slug: 'value-trap',
          term: 'Kurth vlere',
          definition:
            'Një kompani që duket e lirë sepse biznesi i saj po tkurret vazhdimisht.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse aksionet e rritjes vuajnë më shumë se ato të vlerës kur normat e interesit rriten?',
        options: [
          'Sepse janë më të vogla',
          'Sepse fitimet e tyre janë më larg në të ardhmen dhe zbriten më ashpër',
          'Sepse paguajnë më pak dividendë',
        ],
        answer: 1,
        explanation:
          'Sa më larg të jenë paratë, aq më shumë i dëmton një normë zbritjeje më e lartë. Rritja është pothuajse e gjitha e ardhme.',
      },
    },
    relatedSymbols: ['nasdaq-100', 'sp-500'],
    upNextSlugs: ['what-moves-interest-rates', 'index-funds-vs-stock-picking'],
  },

  {
    id: 'dividends-getting-paid-to-hold',
    slug: 'dividends-getting-paid-to-hold',
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: { sq: 'Dividendët: të paguhesh për të mbajtur' },
    summary: {
      sq: 'Para të vërteta në llogari, por jo para falas — dhe pse çmimi bie ditën që paguhen.',
    },
    inOneSentence: {
      sq: 'Një dividend është një pjesë e fitimit që kompania jua kthen në para, dhe çmimi i aksionit bie pikërisht me atë shumë kur ndodh.',
    },
    body: {
      sq: [
        {
          heading: 'Nga vjen paraja',
          paragraphs: [
            'Kur një kompani fiton, ajo ka tri zgjedhje: t’i riinvestojë paratë në biznes, të blejë aksionet e veta, ose t’ua japë aksionerëve. E treta është dividendi.',
            'Prandaj dividendët nuk janë një shpërblim shtesë. Ato janë vlerë që zhvendoset nga brenda kompanisë në xhepin tuaj. Ditën që paguhen, aksioni hapet më i ulët pikërisht me atë shumë.',
            'Kjo është kundërintuitive por e domosdoshme: kompania tani ka më pak para, ndaj vlen më pak. Ju nuk keni fituar asgjë në atë moment — thjesht keni lëvizur para nga një xhep në tjetrin.',
          ],
        },
        {
          heading: 'Pse ka rëndësi gjithsesi',
          paragraphs: [
            'Nëse dividendi nuk krijon vlerë, pse ka rëndësi? Sepse ai është një disiplinë. Një kompani që premton një dividend duhet të gjenerojë para të vërteta çdo vit për ta paguar.',
            'Fitimi mund të tundet me kontabilitet. Një pagesë në para nuk mundet. Prandaj një histori e gjatë dividendësh në rritje është një sinjal i besueshëm për shëndetin e biznesit.',
            'Ka edhe një anë praktike: për dikë që jeton nga investimet, dividendët japin të ardhura pa pasur nevojë të shesë asgjë.',
          ],
        },
        {
          heading: 'Kur një yield i lartë është paralajmërim',
          paragraphs: [
            'Yield-i i dividendit është dividendi vjetor pjesëtuar me çmimin. Nëse çmimi bie përgjysmë dhe dividendi mbetet, yield-i dyfishohet.',
            'Prandaj yield-et më të larta në treg shpesh i përkasin kompanive në telashe, ku tregu tashmë pret që dividendi të pritet.',
            'Një yield 12% rrallë do të thotë «zbritje». Zakonisht do të thotë «tregu nuk beson se kjo pagesë do të vazhdojë».',
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
            cost: 'Kur nuk ka ku t’i vërë',
          },
          {
            label: 'Blen aksionet e veta',
            value: 'Ata që mbeten',
            cost: 'Kur aksioni është i lirë',
          },
        ],
      },
    },
    keyTerms: {
      sq: [
        {
          slug: 'dividend',
          term: 'Dividend',
          definition: 'Një pjesë e fitimit e paguar në para te aksionerët.',
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
            'Sa përqind e fitimit shkon në dividend. Mbi njëqind do të thotë se paguhet nga rezervat.',
        },
        {
          slug: 'ex-dividend-date',
          term: 'Data pa dividend',
          definition:
            'Dita nga e cila blerja e aksionit nuk ju jep më të drejtë mbi dividendin e radhës.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një aksion ka yield dividendi 12%, shumë mbi tregun. Çfarë sugjeron më shpesh kjo?',
        options: [
          'Një mundësi e rrallë për të ardhura të larta',
          'Se çmimi ka rënë dhe tregu pret që dividendi të pritet',
          'Se kompania është shumë fitimprurëse',
        ],
        answer: 1,
        explanation:
          'Yield-i rritet kur çmimi bie. Yield-et më të larta zakonisht sinjalizojnë dyshim për qëndrueshmërinë e pagesës.',
      },
    },
    upNextSlugs: ['share-buybacks', 'what-is-a-fund'],
  },

  {
    id: 'share-buybacks',
    slug: 'share-buybacks',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    title: { sq: 'Riblerjet e aksioneve' },
    summary: {
      sq: 'Kompania blen aksionet e veta dhe i zhduk. Pjesa juaj e biznesit rritet pa blerë asgjë.',
    },
    inOneSentence: {
      sq: 'Një riblerje ul numrin e aksioneve, kështu që i njëjti fitim ndahet mes më pak pjesësh dhe secila pjesë vlen më shumë.',
    },
    body: {
      sq: [
        {
          heading: 'Mekanika',
          paragraphs: [
            'Kompania përdor paranë e vet për të blerë aksionet e saj nga tregu, dhe pastaj i anulon. Numri i aksioneve në qarkullim bie.',
            'Nëse kompania fiton 100 milionë dhe ka 100 milionë aksione, fitimi për aksion është 1 €. Blini dhe anuloni dhjetë milionë aksione, dhe i njëjti fitim jep 1,11 € për aksion.',
            'Ju nuk morët asgjë në dorë, por pjesa juaj e pronësisë u rrit. Është një dividend i heshtur, i paguar në pronësi në vend të parave.',
          ],
        },
        {
          heading: 'Pse preferohen ndonjëherë ndaj dividendëve',
          paragraphs: [
            'Në shumë juridiksione dividendët taksohen kur paguhen, ndërsa përfitimi nga një riblerje shfaqet si rritje çmimi dhe taksohet vetëm kur shisni. Kontrolli mbi kohën është i juaji.',
            'Riblerjet janë gjithashtu fleksibël: një kompani mund t’i ndalojë pa sinjalizuar krizë. Prerja e një dividendi, përkundrazi, lexohet gjithmonë si lajm i keq.',
            'Kjo fleksibilitet ka një çmim: ato shpesh ndalen pikërisht kur aksioni është i lirë, sepse ekonomia është e vështirë dhe paraja duhet gjetkë.',
          ],
        },
        {
          heading: 'Kur janë shkatërrim vlere',
          paragraphs: [
            'Një riblerje krijon vlerë vetëm nëse aksioni blihet nën vlerën e tij të vërtetë. Nëse kompania blen shtrenjtë, ajo ka shpenzuar para për të marrë më pak se ç’pagoi.',
            'Në praktikë shumë kompani blejnë më së shumti kur çmimet janë të larta dhe paraja e bollshme — pra pikërisht në momentin më të keq.',
            'Kërkoni gjithashtu nëse numri i aksioneve po bie vërtet. Shpesh riblerjet vetëm kompensojnë aksionet e reja të dhëna si shpërblim drejtuesve, dhe numri neto nuk lëviz fare.',
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
            'Blerja nga kompania e aksioneve të veta, të cilat pastaj anulohen.',
          aliases: ['riblerjet', 'riblerje aksionesh'],
        },
        {
          slug: 'shares-outstanding',
          term: 'Aksione në qarkullim',
          definition:
            'Numri total i aksioneve që ekzistojnë dhe mbahen nga investitorët.',
        },
        {
          slug: 'dilution',
          term: 'Hollim',
          definition:
            'Rënia e pjesës suaj kur kompania lëshon aksione të reja.',
          aliases: ['hollimi'],
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një kompani shpall një riblerje të madhe, por numri i aksioneve në qarkullim nuk bie. Pse?',
        options: [
          'Riblerja nuk ka nisur ende',
          'Aksionet e reja të dhëna drejtuesve po kompensojnë riblerjen',
          'Riblerjet nuk ndikojnë kurrë numrin e aksioneve',
        ],
        answer: 1,
        explanation:
          'Shumë riblerje vetëm mbulojnë shpërblimet në aksione. Numri neto është ai që ka rëndësi, jo shuma e shpallur.',
      },
    },
    upNextSlugs: ['what-is-a-stock-split', 'how-to-value-a-company'],
  },

  {
    id: 'what-is-a-stock-split',
    slug: 'what-is-a-stock-split',
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: { sq: 'Ndarja e aksioneve: shumë zhurmë për asgjë' },
    summary: {
      sq: 'Një aksion bëhet dhjetë, secili një e dhjeta e çmimit. Ju keni saktësisht të njëjtën gjë.',
    },
    inOneSentence: {
      sq: 'Një ndarje aksionesh ndryshon vetëm numrin e copëzave, jo madhësinë e ëmbëlsirës.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë ndodh në të vërtetë',
          paragraphs: [
            'Në një ndarje 10 për 1, çdo aksion bëhet dhjetë aksione dhe çmimi i secilit bie në një të dhjetën. Nëse kishit një aksion prej 1.000 €, tani keni dhjetë aksione nga 100 €.',
            'Vlera juaj totale është identike. Pjesa juaj e kompanisë është identike. Asgjë ekonomike nuk ka ndryshuar.',
            'Prandaj një ndarje nuk është lajm në kuptimin e vërtetë. Është një veprim kontabël me qëllim kryesisht kozmetik.',
          ],
        },
        {
          heading: 'Pse i bëjnë kompanitë',
          paragraphs: [
            'Një çmim prej disa mijëra eurosh për aksion i pengon investitorët e vegjël, sidomos aty ku nuk lejohen aksione të pjesshme. Ndarja e bën aksionin të arritshëm.',
            'Ka edhe një element sinjali. Kompanitë zakonisht ndajnë aksionet pas një rritjeje të gjatë, kështu që një ndarje lexohet si «drejtuesit besojnë se çmimi do të qëndrojë lart».',
            'Ky sinjal shpjegon pse aksionet shpesh rriten pas njoftimit të një ndarjeje, edhe pse vetë ndarja nuk krijon asgjë.',
          ],
        },
        {
          heading: 'Ndarja e kundërt është një histori tjetër',
          paragraphs: [
            'Në një ndarje të kundërt, dhjetë aksione bëhen një dhe çmimi dhjetëfishohet. Edhe këtu vlera juaj nuk ndryshon.',
            'Por arsyeja zakonisht ndryshon: kompanitë e bëjnë këtë kur çmimi ka rënë aq shumë sa rrezikon të përjashtohet nga bursa.',
            'Prandaj një ndarje e zakonshme është zakonisht një shenjë force, dhe një e kundërt është pothuajse gjithmonë një shenjë telashesh.',
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
            'Shndërrimi i çdo aksioni në disa aksione më të vogla, pa ndryshuar vlerën totale.',
          aliases: ['ndarja e aksioneve'],
        },
        {
          slug: 'reverse-split',
          term: 'Ndarje e kundërt',
          definition:
            'Bashkimi i disa aksioneve në një, zakonisht për të ngritur një çmim shumë të ulët.',
        },
        {
          slug: 'fractional-shares',
          term: 'Aksione të pjesshme',
          definition:
            'Mundësia për të blerë një pjesë të një aksioni, që e bën ndarjen më pak të nevojshme.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pas një ndarjeje 5 për 1, sa ndryshon vlera e zotërimit tuaj?',
        options: ['Pesëfishohet', 'Nuk ndryshon fare', 'Bie në një të pestën'],
        answer: 1,
        explanation:
          'Keni pesë herë më shumë aksione, secili një e pesta e çmimit. Pjesa juaj e kompanisë është identike.',
      },
    },
    upNextSlugs: ['what-an-ipo-really-is', 'what-moves-a-share-price'],
  },

  {
    id: 'what-an-ipo-really-is',
    slug: 'what-an-ipo-really-is',
    topicId: 'stocks-etfs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Çfarë është në të vërtetë një IPO' },
    summary: {
      sq: 'Kush shet, kush blen, dhe pse dita e parë rrallë është çmimi që ka rëndësi.',
    },
    inOneSentence: {
      sq: 'Në një IPO, njerëz që e njohin kompaninë shumë mirë ju shesin një pjesë të saj në një moment që e zgjedhin vetë.',
    },
    body: {
      sq: [
        {
          heading: 'Kush është në anën tjetër',
          paragraphs: [
            'Në çdo tregti dikush shet. Në një IPO ai dikush janë themeluesit, investitorët e hershëm dhe fondet e kapitalit sipërmarrës — pikërisht njerëzit që dinë më shumë se kushdo për biznesin.',
            'Ata gjithashtu zgjedhin kohën. Kompanitë dalin publike kur tregjet janë të ngrohta dhe vlerësimet bujare, jo kur janë të ftohta.',
            'Kjo nuk do të thotë që çdo IPO është një kurth. Do të thotë se ju jeni pala më pak e informuar në një transaksion me kohë të zgjedhur nga tjetri, dhe kjo meriton kujdes shtesë.',
          ],
        },
        {
          heading: 'Çmimi që shihni nuk është çmimi që u pagua',
          paragraphs: [
            'Bankat vendosin një çmim ofertimi dhe u shesin aksionet klientëve institucionalë. Kur tregtimi hapet për publikun, çmimi shpesh është tashmë shumë më lart.',
            'Ai «kërcim i ditës së parë» raportohet si sukses, por është në fakt para që kompania nuk i mori — vlerë që kaloi te ata që morën aksione në çmimin e ofertës.',
            'Investitori i vogël pothuajse gjithmonë blen pas kërcimit, jo para tij.',
          ],
        },
        {
          heading: 'Periudha e bllokimit',
          paragraphs: [
            'Të brendshmit zakonisht ndalohen të shesin për gjashtë muaj pas listimit. Kur ai afat skadon, një sasi e madhe aksionesh mund të dalë menjëherë në treg.',
            'Prandaj shumë IPO kanë një rënie të dukshme rreth muajit të gjashtë, pa asnjë lajm të keq për biznesin. Është thjesht ofertë e re që përplaset me të njëjtën kërkesë.',
            'Nëse doni të zotëroni një kompani të sapolistuar, prisja e disa tremujorëve ju jep më shumë të dhëna dhe shpesh një çmim më të mirë.',
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
            'Ofertë publike fillestare — hera e parë që aksionet e një kompanie u shiten investitorëve të përgjithshëm.',
          aliases: ['ofertë publike fillestare', 'listim'],
        },
        {
          slug: 'lock-up-period',
          term: 'Periudhë bllokimi',
          definition:
            'Koha pas listimit gjatë së cilës të brendshmit nuk mund të shesin aksionet e tyre.',
        },
        {
          slug: 'underwriter',
          term: 'Nënshkrues',
          definition:
            'Banka që vendos çmimin e ofertës dhe shet aksionet e para.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse shumë IPO bien rreth gjashtë muaj pas listimit, edhe pa lajme të këqija?',
        options: [
          'Sepse entuziazmi fillestar zbehet gjithmonë',
          'Sepse periudha e bllokimit skadon dhe të brendshmit mund të shesin',
          'Sepse rregullatorët kërkojnë një rivlerësim',
        ],
        answer: 1,
        explanation:
          'Skadimi i bllokimit sjell një ofertë të madhe të re aksionesh në treg përballë së njëjtës kërkesë.',
      },
    },
    upNextSlugs: ['index-funds-vs-stock-picking', 'how-to-value-a-company'],
  },

  {
    id: 'index-funds-vs-stock-picking',
    slug: 'index-funds-vs-stock-picking',
    topicId: 'stocks-etfs',
    level: 'beginner',
    title: { sq: 'Fonde indeksore apo zgjedhje aksionesh?' },
    summary: {
      sq: 'Pse mesatarja mund ta mundë shumicën, dhe çfarë duhet të jetë e vërtetë që ju ta mundni mesataren.',
    },
    inOneSentence: {
      sq: 'Të gjithë investitorët së bashku janë tregu, kështu që pas kostove shumica duhet të mbetet nën të — dhe një fond indeksor thjesht refuzon të paguajë ato kosto.',
    },
    body: {
      sq: [
        {
          heading: 'Aritmetika që nuk mund të shmanget',
          paragraphs: [
            'Për çdo investitor që e mund tregun, dikush tjetër duhet ta humbasë me të njëjtën masë. Të gjithë së bashku, para kostove, investitorët fitojnë saktësisht kthimin e tregut.',
            'Pastaj hiqni tarifat, komisionet dhe spread-et. Pas tyre, investitori mesatar aktiv duhet domosdoshmërisht të jetë nën treg.',
            'Ky nuk është pesimizëm për aftësinë e njerëzve. Është një identitet matematikor, dhe vlen pavarësisht se sa të zgjuar janë pjesëmarrësit.',
          ],
        },
        {
          heading: 'Çfarë do të thotë për ju',
          paragraphs: [
            'Për të zgjedhur aksione me sukses, ju duhet të dini diçka që tregu nuk e ka çmuar ende — përballë njerëzve me terminale, ekipe analistësh dhe akses te drejtuesit.',
            'Kjo është e mundur, por është një pretendim serioz. Pyetja e ndershme nuk është «a mund ta bëj?» por «çfarë kam unë që ata nuk e kanë?».',
            'Nëse përgjigjja është durimi — aftësia për të mbajtur diçka për dhjetë vjet kur ata maten çdo tremujor — atëherë ai është një avantazh i vërtetë. Nëse përgjigjja është një artikull që lexuat, nuk është.',
          ],
        },
        {
          heading: 'Një rrugë e mesme e arsyeshme',
          paragraphs: [
            'Shumë njerëz mbajnë një bazë të gjerë indeksore dhe një pjesë të vogël për aksione individuale. Baza siguron rezultatin; pjesa e vogël plotëson kureshtjen pa rrezikuar planin.',
            'Nëse e bëni këtë, mbajeni shënim rezultatin e pjesës aktive kundrejt indeksit, sinqerisht, për disa vite. Të dhënat do t’ju thonë më shumë se çdo debat.',
            'Rregulli praktik: rrezikoni në mënyrë aktive vetëm aq sa mund të humbisni pa ndryshuar asgjë tjetër në jetën tuaj.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Dy rrugë, të njëjtin treg',
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
            value: 'Një avantazh i vërtetë informacioni',
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
    },
    keyTerms: {
      sq: [
        {
          slug: 'index-fund',
          term: 'Fond indeksor',
          definition:
            'Një fond që mban gjithçka në një indeks, pa zgjedhur mes tyre.',
          aliases: ['fondet indeksore'],
        },
        {
          slug: 'benchmark',
          term: 'Pikë referimi',
          definition:
            'Indeksi kundrejt të cilit matet performanca e një investimi.',
          aliases: ['benchmark'],
        },
        {
          slug: 'edge',
          term: 'Avantazh',
          definition:
            'Diçka që dini ose mund të bëni dhe që tregu nuk e ka çmuar ende.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Pse investitori mesatar aktiv duhet të mbetet nën tregun, matematikisht?',
        options: [
          'Sepse menaxherët aktivë zgjedhin keq',
          'Sepse të gjithë së bashku janë tregu, dhe pastaj paguajnë kosto',
          'Sepse fondet indeksore blejnë të parat',
        ],
        answer: 1,
        explanation:
          'Para kostove, investitorët kolektivisht fitojnë saktësisht kthimin e tregut. Kostot e zbresin atë mesatare nën të.',
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['what-is-a-fund', 'fees-that-change-everything'],
  },
];
