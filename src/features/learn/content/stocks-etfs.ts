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
      sq: 'Lajme, pritje dhe rrjedha parash — dhe pse e treta i shpjegon lëvizjet që dy të parat nuk i shpjegojnë dot.',
    },
    inOneSentence: {
      sq: 'Çmimi luan kur ndërrohet mendimi i përbashkët për fitimet e ardhshme, ose thjesht kur dikujt të madh i duhet të blejë a të shesë.',
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
    title: { sq: 'Pse aksionet e një sektori luajnë bashkë' },
    summary: {
      sq: 'Kompani të ndryshme me të njëjtin faktor rreziku reagojnë njësoj ndaj një lajmi të vetëm.',
    },
    inOneSentence: {
      sq: 'Kur dy kompani varen nga e njëjta gjë, një lajm për atë gjë i lëviz të dyja, sado të ndryshme të jenë.',
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
      sq: 'Një mënyrë e shpejtë për të pyetur: sa po paguaj për çdo euro fitim?',
    },
    inOneSentence: {
      sq: 'P/E ju tregon sa vite fitimesh të sotme po paguani për ta pasur një kompani.',
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
      sq: 'Katër shifra që kanë rëndësi dhe pjesa që tregu e lexon e para.',
    },
    inOneSentence: {
      sq: 'Të ardhurat i tregojnë shitjet, marzhi shëndetin, fitimi për aksion rezultatin, kurse udhëzimi të ardhmen — dhe i fundit peshon më shumë se të tjerët.',
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
      sq: 'Çka ka kompania, çka u detyrohet të tjerëve dhe pse dallimi mes tyre nuk është e njëjta gjë me vlerën.',
    },
    inOneSentence: {
      sq: 'Bilanci është një fotografi e një çasti: asetet në njërën anë, detyrimet në tjetrën dhe kapitali i aksionerëve si dallim mes tyre.',
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
      sq: 'Çdo vlerësim është i njëjti mendim i thënë ndryshe: sa para do të nxjerrë kjo gjë dhe sa vlejnë ato para sot.',
    },
    inOneSentence: {
      sq: 'Vlera e një kompanie është shuma e parave që do t’i nxjerrë në të ardhmen, e zbritur ngaqë paratë e nesërme vlejnë më pak se ato të sotmet.',
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
      sq: 'Dy mënyra për të fituar para nga i njëjti treg dhe pse funksionojnë në periudha të ndryshme.',
    },
    inOneSentence: {
      sq: 'Investimi në rritje paguan sot për fitime shumë më të mëdha nesër; investimi në vlerë paguan pak sot për fitime që janë tashmë aty.',
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
      sq: 'Para të vërteta në llogari, por jo para falas — dhe pse çmimi bie atë ditë që paguhen.',
    },
    inOneSentence: {
      sq: 'Dividendi është një pjesë e fitimit që kompania jua kthen në para, kurse çmimi i aksionit bie pikërisht për atë shumë kur ndodh.',
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
      sq: 'Kompania i blen aksionet e veta dhe i asgjëson. Pjesa juaj e biznesit rritet pa blerë asgjë.',
    },
    inOneSentence: {
      sq: 'Riblerja e ul numrin e aksioneve, kështu që i njëjti fitim ndahet në më pak pjesë dhe secila pjesë vlen më shumë.',
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
      sq: 'Një aksion bëhet dhjetë, secili nga një e dhjeta e çmimit. Ju keni saktësisht të njëjtën gjë.',
    },
    inOneSentence: {
      sq: 'Ndarja e aksioneve e ndryshon vetëm numrin e copave, jo madhësinë e ëmbëlsirës.',
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
    },
    quiz: {
      sq: {
        question: 'Pas një ndarjeje 5 për 1, sa ndryshon vlera e asaj që keni?',
        options: ['Pesëfishohet', 'Nuk ndryshon fare', 'Bie në një të pestën'],
        answer: 1,
        explanation:
          'Keni pesë herë më shumë aksione, secili nga një e pesta e çmimit. Pjesa juaj e kompanisë mbetet e njëjta.',
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
      sq: 'Kush shet, kush blen dhe pse çmimi i ditës së parë rrallë është ai që ka rëndësi.',
    },
    inOneSentence: {
      sq: 'Në një IPO, njerëz që e njohin kompaninë shumë mirë ju shesin një pjesë të saj në një çast që e zgjedhin vetë.',
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
      sq: 'Pse mesatarja e mund shumicën dhe çka duhet të jetë e vërtetë që ju ta mundni mesataren.',
    },
    inOneSentence: {
      sq: 'Të gjithë investitorët bashkë janë vetë tregu, prandaj pas kostove shumica duhet të mbetet nën të — kurse fondi indeksor thjesht nuk pranon t’i paguajë ato kosto.',
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
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['what-is-a-fund', 'fees-that-change-everything'],
  },
];
