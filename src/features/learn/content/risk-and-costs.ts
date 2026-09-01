import type { SeedLesson, SeedTopic } from './types';

export const RISK_COSTS_TOPIC: SeedTopic = {
  id: 'risk-and-costs',
  title: { sq: 'Rreziku dhe kostot', en: 'Risk and Costs' },
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
    en: [
      'what-is-risk',
      'currency-risk',
      'taxes-on-investments',
      'what-leverage-does',
      'liquidity-risk',
      'inflation-as-a-risk',
      'concentration-risk',
      'behaviour-costs-more-than-fees',
      'how-scams-work',
      'how-to-read-a-fund-factsheet',
      'when-to-sell',
      'how-to-build-a-portfolio',
    ],
  },
};

export const RISK_COSTS_LESSONS: SeedLesson[] = [
  {
    id: 'what-risk-actually-means',
    slug: { sq: 'cka-eshte-rreziku', en: 'what-is-risk' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Çka do të thotë vërtet rrezik',
      en: 'What risk actually means',
    },
    summary: {
      sq: 'Jo luhatja e çmimit, por mundësia të mos i keni paratë kur ju duhen.',
      en: 'Not price swings, but the chance of not having your money when you need it.',
    },
    inOneSentence: {
      sq: 'Rreziku i vërtetë nuk është që çmimi luan, por që të detyroheni të shitni pikërisht atëherë kur ka rënë.',
      en: 'The real risk is not that prices move, but that you are forced to sell exactly when they have fallen.',
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
      en: [
        {
          heading: 'Two definitions that get confused',
          paragraphs: [
            'Academic finance measures risk as volatility: how much a price swings around its average. That definition is easy to measure and convenient for models.',
            'For a person, risk is something else: the chance of not reaching your goal. If you need €50,000 in ten years, the risk is ending up with €30,000.',
            'These two definitions often collide. Money in a savings account has zero volatility and a very high risk of missing your long-term goal.',
          ],
        },
        {
          heading: 'Sequence risk',
          paragraphs: [
            'The order of returns matters, not just their average. Two portfolios with the same average return can end up in very different places if you withdraw money along the way.',
            'A big fall in the first year of retirement, while you are withdrawing money, does far more damage than the same fall in the last year.',
            'That is why the closer you get to the day you need the money, the less your outcome should depend on the market.',
          ],
        },
        {
          heading: 'The risks that cannot be measured',
          paragraphs: [
            'Models take it for granted that the future will resemble the past. Events that have never happened before show up in no statistic.',
            'Not understanding what you have bought is a risk too. A product you cannot explain in your own words is a risk, whatever the numbers say.',
            'The most useful test is still a simple one: what would have to happen for me to lose everything here, and how unlikely is that really?',
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
      en: [
        {
          slug: 'sequence-risk',
          term: 'Sequence risk',
          definition:
            'The risk that the order of returns, not their average, wrecks your plan while you are withdrawing money.',
          aliases: ['sequence of returns risk', 'sequence risks'],
        },
        {
          slug: 'shortfall-risk',
          term: 'Shortfall risk',
          definition:
            'The chance of not having the amount you need on the day you need it.',
          aliases: ['shortfall', 'shortfall risks'],
        },
        {
          slug: 'tail-risk',
          term: 'Tail risk',
          definition:
            'Very rare, very damaging events that models routinely underestimate.',
          aliases: ['tail risks', 'extreme risk'],
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
      en: {
        question:
          'Your retirement money, needed in twenty years, sits in a savings account. Which risk is bigger?',
        options: [
          'Price volatility',
          'That inflation eats your purchasing power and you fall short of the amount you need',
          'That the bank changes its fees',
        ],
        answer: 1,
        explanation:
          'The volatility is zero, but the risk of missing your goal is high. A steady number is not a steady outcome.',
      },
    },
    upNextSlugs: {
      sq: ['inflacioni-si-rrezik', 'rreziku-i-perqendrimit'],
      en: ['inflation-as-a-risk', 'concentration-risk'],
    },
  },

  {
    id: 'currency-risk',
    slug: { sq: 'rreziku-i-monedhes', en: 'currency-risk' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: { sq: 'Rreziku i monedhës', en: 'Currency risk' },
    summary: {
      sq: 'Një investim i mirë në dollarë mund të dalë investim i keq në euro.',
      en: 'A good investment in dollars can turn out to be a bad one in euros.',
    },
    inOneSentence: {
      sq: 'Kur blini diçka të çmuar në monedhë tjetër, i merrni dy investime: asetin dhe monedhën.',
      en: 'When you buy something priced in another currency, you are taking on two investments: the asset and the currency.',
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
      en: [
        {
          heading: 'Two moves, one result',
          paragraphs: [
            'You buy an American ETF that gains 10% over the year. At the same time, the dollar weakens 10% against the euro. Your return in euros comes out at roughly zero.',
            'It works the other way too: an American market that goes nowhere, paired with a strengthening dollar, can hand you a decent profit in euros.',
            'Neither has anything to do with the quality of the companies you bought. It is simply a second movement layered on top of the first.',
          ],
        },
        {
          heading: 'Should you hedge?',
          paragraphs: [
            'Currency hedging comes at a cost, which usually reflects the interest-rate gap between the two currencies. It is not free.',
            'For long-term stock holdings, most of the arguments point against hedging: currency swings tend to even out over decades, while the cost of hedging keeps adding up.',
            'For bonds it is the opposite. If you hold foreign bonds for stability, a 10% currency swing destroys that stability — so hedging makes sense there.',
          ],
        },
        {
          heading: 'Where the cost hides',
          paragraphs: [
            'For a small investor, the biggest currency cost is not the swings but the margin the platform takes on every exchange.',
            'A margin of 0.5% when you buy and 0.5% when you sell is a full percent, paid every time you go in and out.',
            'Always check the rate you are offered against the market rate. The difference is a fee that is rarely advertised as one.',
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
      en: [
        {
          title: 'You invest €1,000 in an American ETF',
          body: "It is exchanged into about 1,100 dollars at the day's rate, minus the platform's margin.",
        },
        {
          title: 'The ETF gains 10% over the year',
          body: 'You now have about 1,210 dollars. In dollars, everything went well.',
        },
        {
          title: 'The dollar weakens 10% against the euro',
          body: 'Those 1,210 dollars convert back into roughly €1,000. The whole gain vanished in the exchange.',
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
      en: [
        {
          slug: 'currency-risk',
          term: 'Currency risk',
          definition:
            'The risk that exchange-rate moves change your return in your home currency.',
          aliases: ['FX risk', 'exchange rate risk'],
        },
        {
          slug: 'hedged',
          term: 'Hedged',
          definition:
            'A fund that removes the exchange-rate effect, in return for an annual cost.',
          aliases: ['currency hedging', 'currency-hedged'],
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
      en: {
        question:
          'Your American ETF gained 8% and the dollar weakened 8%. What did you earn in euros?',
        options: ['About 16%', 'Almost nothing', 'About 8%'],
        answer: 1,
        explanation:
          'The two moves stack on top of each other. The exchange-rate loss wiped out the dollar gain.',
      },
    },
    relatedSymbols: ['eur-usd'],
    upNextSlugs: {
      sq: ['taksat-mbi-investimet', 'si-lexohet-fleta-e-fondit'],
      en: ['taxes-on-investments', 'how-to-read-a-fund-factsheet'],
    },
  },

  {
    id: 'tax-on-investments',
    slug: { sq: 'taksat-mbi-investimet', en: 'taxes-on-investments' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: { sq: 'Taksat mbi investimet', en: 'Taxes on investments' },
    summary: {
      sq: 'Kur lind detyrimi, pse shitja e shpeshtë kushton dhe pse kjo nuk është këshillë tatimore.',
      en: 'When the bill arises, why frequent selling costs you, and why this is not tax advice.',
    },
    inOneSentence: {
      sq: 'Taksa zakonisht lind kur shitni ose kur merrni dividend, prandaj sa më rrallë të shitni, aq më gjatë punojnë paratë tuaja të plota.',
      en: 'Tax usually arises when you sell or receive a dividend, so the less often you sell, the longer your money works for you in full.',
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
      en: [
        {
          heading: 'Two moments of taxation',
          paragraphs: [
            'The first is the capital gain: the difference between your selling price and your buying price. It is usually not taxed until you sell.',
            'The second is income: dividends and bond coupons, which are usually taxed in the year you receive them, whether or not you spend them.',
            'The rules, rates, and exemptions differ from country to country and change over time. This page explains the mechanism, not your personal tax bill.',
          ],
        },
        {
          heading: 'Why frequent selling costs you twice',
          paragraphs: [
            'Every time you sell at a profit, part of that profit leaves as tax and never compounds again.',
            'Two investors with the same gross return over twenty years can end up with noticeably different amounts if one kept buying and selling while the other simply held.',
            'This is a powerful and underrated argument for holding long term: deferring tax is itself a kind of return.',
          ],
        },
        {
          heading: 'Structure matters',
          paragraphs: [
            'Accumulating funds reinvest dividends inside the fund. In some jurisdictions this defers the tax; in others it does not. It is worth checking for your country.',
            'Tax-advantaged accounts, where they exist, should usually be used before an ordinary account.',
            'And keep records: purchase prices, dates, and currency conversions. Digging them up five years later is far harder than saving them today.',
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
      en: [
        {
          slug: 'capital-gain',
          term: 'Capital gain',
          definition:
            'The difference between the selling price and the purchase price of an asset.',
          aliases: ['capital gains'],
        },
        {
          slug: 'tax-deferral',
          term: 'Tax deferral',
          definition:
            'Paying tax later, which leaves the full amount to keep compounding.',
          aliases: ['deferred tax', 'tax deferred'],
        },
        {
          slug: 'withholding-tax',
          term: 'Withholding tax',
          definition:
            'Tax deducted automatically from foreign dividends before they reach you.',
          aliases: ['withholding', 'withholding taxes'],
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
      en: {
        question:
          'Why can holding long term produce more than frequent buying and selling, even with the same gross return?',
        options: [
          'Because the commissions are the same',
          'Because deferred tax leaves the full amount to keep compounding',
          'Because the market rewards loyalty',
        ],
        answer: 1,
        explanation:
          'Every profitable sale takes money out of compounding. Deferring the tax keeps that amount working for you.',
      },
    },
    upNextSlugs: {
      sq: [
        'sjellja-kushton-me-shume-se-tarifat',
        'tarifat-qe-ndryshojne-gjithcka',
      ],
      en: ['behaviour-costs-more-than-fees', 'the-fees-that-change-everything'],
    },
  },

  {
    id: 'what-leverage-does',
    slug: { sq: 'cka-ben-leva', en: 'what-leverage-does' },
    topicId: 'risk-and-costs',
    level: 'advanced',
    title: { sq: 'Çka bën leva', en: 'What leverage does' },
    summary: {
      sq: 'I shumëzon fitimet dhe humbjet, por jo njësoj — dhe pikërisht kjo mospërputhje ju nxjerr jashtë loje.',
      en: 'It multiplies gains and losses, but not equally — and that mismatch is exactly what knocks you out of the game.',
    },
    inOneSentence: {
      sq: 'Leva ju lejon të mbani më shumë se sa keni, kurse kostoja është që tash e tutje kohën e mbarimit e vendos dikush tjetër.',
      en: 'Leverage lets you hold more than you own, and the price is that from then on, someone else decides when the game ends.',
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
      en: [
        {
          heading: 'The lopsided maths',
          paragraphs: [
            'If you lose 50%, you need a 100% gain just to get back to where you started. That mismatch exists even without leverage; leverage makes it worse.',
            'With double leverage, a 25% market fall wipes out half your capital. To recover, you need what is left to grow by 100%.',
            'That is why a leveraged portfolio can go to zero even in a market that eventually recovers in full. It was knocked out before the recovery arrived.',
          ],
        },
        {
          heading: 'The margin call',
          paragraphs: [
            'When you hold positions with borrowed money and their value falls below a threshold, the lender demands extra cash on the spot. If you do not have it, they sell your position for you.',
            'This always happens at the worst possible moment, because the threshold is hit precisely when prices are at their lowest.',
            'That is the essential difference between a paper loss and a real one: without leverage, you decide when to sell; with leverage, someone else does.',
          ],
        },
        {
          heading: 'Daily leveraged products',
          paragraphs: [
            '"2x" or "3x" ETFs reset every day. That means over longer periods they do not deliver double or triple the index\'s return.',
            'In a market that bounces up and down without going anywhere, a product like this loses value continuously. The effect is called volatility decay.',
            'These instruments are built for intraday trading. Holding them for months is a completely different use from the one they were designed for.',
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
      en: {
        heading: 'A 25% market fall',
        columns: ['Leverage', 'Your loss', 'Gain needed to recover'],
        rows: [
          {
            label: 'No leverage',
            value: '−25%',
            cost: '+33%',
            tone: 'positive',
          },
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
      en: [
        {
          slug: 'margin-call',
          term: 'Margin call',
          definition:
            "A lender's demand for extra cash when your position falls below a threshold.",
          aliases: ['margin calls'],
        },
        {
          slug: 'volatility-decay',
          term: 'Volatility decay',
          definition:
            'The slow loss of value in daily leveraged products when the market bounces up and down.',
          aliases: ['volatility drag'],
        },
        {
          slug: 'liquidation',
          term: 'Forced liquidation',
          definition:
            'The sale of your position by the lender when you fail to meet a margin call.',
          aliases: ['liquidation', 'liquidations'],
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
      en: {
        question:
          'Why can a leveraged portfolio go to zero even if the market eventually recovers in full?',
        options: [
          'Because leverage carries very high fees',
          'Because a margin call can knock you out before the recovery arrives',
          'Because markets never fully recover',
        ],
        answer: 1,
        explanation:
          'With leverage, you no longer choose when to sell. Forced liquidation turns a temporary loss into a permanent one.',
      },
    },
    upNextSlugs: {
      sq: ['rreziku-i-likuiditetit', 'si-funksionojne-mashtrimet'],
      en: ['liquidity-risk', 'how-scams-work'],
    },
  },

  {
    id: 'liquidity-risk',
    slug: { sq: 'rreziku-i-likuiditetit', en: 'liquidity-risk' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Rreziku i likuiditetit', en: 'Liquidity risk' },
    summary: {
      sq: 'Një çmim në ekran nuk është premtim se dikush do ta paguajë atë çmim.',
      en: 'A price on a screen is not a promise that anyone will pay it.',
    },
    inOneSentence: {
      sq: 'Likuiditeti është mundësia për të shitur shpejt me çmim të drejtë, dhe zhduket pikërisht atëherë kur ju duhet më së shumti.',
      en: 'Liquidity is the ability to sell quickly at a fair price, and it disappears exactly when you need it most.',
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
      en: [
        {
          heading: 'The price versus what you actually get',
          paragraphs: [
            'The last price shows what someone paid for a small quantity. It says nothing about the price you would get if you sold ten times that amount.',
            'For a large stock, the difference is negligible. For a small stock, a corporate bond, or a property, it can be several percent.',
            'That is why a portfolio valuation always comes out slightly optimistic: it assumes every position could be sold at the last price, which is never true for all of them at once.',
          ],
        },
        {
          heading: 'When it disappears',
          paragraphs: [
            'Liquidity is most plentiful when you do not need it and scarcest when you do. In a panic, buyers vanish and spreads widen in an instant.',
            'This hits hardest the assets that looked safe: corporate bonds, real estate funds, and anything that trades only a little each day.',
            'Some funds have suspended withdrawals during crises for exactly this reason — they could not sell their assets fast enough to pay their investors.',
          ],
        },
        {
          heading: 'How to judge it',
          paragraphs: [
            'Look at the average daily volume. If your position makes up a large share of it, getting out will cost you.',
            'Look at the spread between the buying and selling price. A wide spread means an immediate cost, and a warning that liquidity is thin.',
            'And read the withdrawal terms of any fund that does not trade on an exchange. The words "in exceptional circumstances" deserve your attention before you need them.',
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
      en: [
        {
          slug: 'liquidity-risk',
          term: 'Liquidity risk',
          definition:
            'The risk of not being able to sell quickly without accepting a noticeably worse price.',
          aliases: ['illiquidity', 'liquidity risks'],
        },
        {
          slug: 'volume',
          term: 'Volume',
          definition:
            'How many units trade on an average day. A direct indicator of liquidity.',
          aliases: ['trading volume'],
        },
        {
          slug: 'gating',
          term: 'Gating',
          definition:
            'When a fund temporarily halts withdrawals because it cannot sell its own assets.',
          aliases: ['withdrawal suspension', 'gated fund'],
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
      en: {
        question:
          'Why is liquidity the risk that shows up exactly when you need it most?',
        options: [
          'Because stock exchanges close during crises',
          'Because in a panic, buyers vanish and spreads widen',
          'Because regulators ban selling',
        ],
        answer: 1,
        explanation:
          'Liquidity depends on having buyers. When everyone wants to sell at once, those buyers are not there.',
      },
    },
    upNextSlugs: {
      sq: ['rreziku-i-perqendrimit', 'si-funksionojne-mashtrimet'],
      en: ['concentration-risk', 'how-scams-work'],
    },
  },

  {
    id: 'inflation-as-a-risk',
    slug: { sq: 'inflacioni-si-rrezik', en: 'inflation-as-a-risk' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: {
      sq: 'Inflacioni si rrezik për kursimtarin',
      en: 'Inflation as a risk to savers',
    },
    summary: {
      sq: 'Humbja e vetme e garantuar në financë dhe e vetmja që nuk del kurrë në pasqyrën e llogarisë.',
      en: 'The only guaranteed loss in finance, and the only one that never shows up on your account statement.',
    },
    inOneSentence: {
      sq: 'Inflacioni jua merr fuqinë blerëse pa u lëvizur asnjë shifër, prandaj është humbja e vetme që askush nuk e vëren derisa të bëhet e madhe.',
      en: 'Inflation takes your purchasing power without moving a single digit, which makes it the one loss nobody notices until it has grown large.',
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
      en: [
        {
          heading: 'The invisible loss',
          paragraphs: [
            'If stocks fall 20%, you see it instantly. If inflation eats 20% of your purchasing power over seven years, your statement shows the same number and you notice nothing.',
            'That is why people treat cash as "risk-free". It is volatility-free, which is a very different thing.',
            'At 3% inflation, the purchasing power of your money halves in twenty-three years. That happens with certainty, not as a possibility.',
          ],
        },
        {
          heading: 'What protects you and what does not',
          paragraphs: [
            'Historically, stocks have protected you over long periods, because companies raise their prices along with inflation. Over short periods they can suffer, especially when inflation rises suddenly.',
            'Fixed-rate bonds are hit hardest: the coupon is fixed, and inflation eats away at its real value every year.',
            'Real estate and commodities sometimes help, but not always, and they come with costs and complications of their own.',
          ],
        },
        {
          heading: 'The number to watch',
          paragraphs: [
            'The return that matters is the real one: your return minus inflation. A deposit paying 4% in a year with 6% inflation is a real loss of 2%.',
            'When you compare options, convert them all to real terms. Otherwise a high nominal rate looks attractive precisely when it is at its worst.',
            'This is also the test for any "risk-free" promise: if the nominal return is below inflation, the certainty on offer is the certainty of a loss.',
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
      en: {
        heading: 'Nominal versus real return, at 5% inflation',
        columns: ['Where you keep it', 'Nominal return', 'Real return'],
        rows: [
          {
            label: 'Cash in hand',
            value: '0%',
            cost: '−5%',
            tone: 'negative',
          },
          { label: 'Deposit', value: '3%', cost: '−2%' },
          {
            label: 'Stock index (on average)',
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
      en: [
        {
          slug: 'nominal-return',
          term: 'Nominal return',
          definition:
            'The return before inflation is subtracted. The number that gets advertised.',
          aliases: ['nominal returns'],
        },
        {
          slug: 'real-return',
          term: 'Real return',
          definition:
            'The return after inflation — how much more you can actually buy.',
          aliases: ['real returns'],
        },
        {
          slug: 'inflation-linked-bond',
          term: 'Inflation-linked bond',
          definition:
            'A bond whose coupon and principal rise along with inflation.',
          aliases: ['inflation-linked bonds', 'index-linked bond'],
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
      en: {
        question:
          'A deposit pays 4% while inflation is 6%. What happens to you in real terms?',
        options: [
          'You gain 4%',
          'You lose about 2% of your purchasing power',
          'Nothing changes',
        ],
        answer: 1,
        explanation:
          'The number in your account grows, but it buys less. The real return is the nominal one minus inflation.',
      },
    },
    relatedSymbols: ['gold'],
    upNextSlugs: {
      sq: ['cka-eshte-kompozimi', 'kursim-apo-investim'],
      en: ['what-is-compounding', 'saving-or-investing'],
    },
  },

  {
    id: 'concentration-risk',
    slug: { sq: 'rreziku-i-perqendrimit', en: 'concentration-risk' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: { sq: 'Rreziku i përqendrimit', en: 'Concentration risk' },
    summary: {
      sq: 'Rreziku më i madh që e marrin shumica e njerëzve nuk është aksioni që e zgjodhën, por sa nga gjithçka që kanë varet nga e njëjta gjë.',
      en: 'The biggest risk most people take is not the stock they picked, but how much of everything they have depends on the same thing.',
    },
    inOneSentence: {
      sq: 'Përqendrimi nuk matet me numrin e investimeve, por me numrin e mënyrave të ndryshme si mund të humbni.',
      en: 'Concentration is not measured by how many investments you hold, but by how many different ways you can lose.',
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
      en: [
        {
          heading: 'The concentration you cannot see',
          paragraphs: [
            "If you work at a bank, hold that bank's shares through the employee scheme, and also own a financial-sector ETF, you have three versions of the same bet.",
            'When the banking sector suffers, you lose your job security, your bonus, and your investments all at once. Those are not three separate risks.',
            'This is the most dangerous kind of concentration because it does not show up in your portfolio view — that shows only your investments, not the rest of your financial life.',
          ],
        },
        {
          heading: "Your employer's shares",
          paragraphs: [
            'Employee share schemes are attractive and often discounted. They are also the most common way people end up over-concentrated.',
            "A widely used rule of thumb: never let your employer's shares grow beyond a small slice of your wealth, however good the company looks to you.",
            'You know the company well, but that knowledge does not protect you — the employees of Enron and Lehman knew their companies very well too.',
          ],
        },
        {
          heading: 'Concentration inside an index',
          paragraphs: [
            'Even a "broad" fund can be concentrated. In recent years, the ten largest companies have made up a large share of the American index\'s value.',
            'That means an ETF holding five hundred companies can move mainly with the fortunes of a few technology names.',
            'Holding it is not necessarily a mistake. The mistake is holding it while believing you own five hundred separate risks.',
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
      en: [
        {
          slug: 'concentration-risk',
          term: 'Concentration risk',
          definition:
            'The risk that a large share of your wealth depends on a single factor.',
          aliases: ['concentration', 'concentration risks'],
        },
        {
          slug: 'human-capital',
          term: 'Human capital',
          definition:
            'The value of your future earnings from work — for most people, the largest part of their wealth.',
          aliases: ['earning power'],
        },
        {
          slug: 'index-weighting',
          term: 'Index weighting',
          definition:
            'How an index is divided among companies. Weighting by size concentrates it in the largest ones.',
          aliases: ['market-cap weighting', 'index weights'],
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
      en: {
        question:
          'You work at a technology company, hold its shares, and own a technology ETF. What is the problem?',
        options: [
          'You have too few investments',
          'Your job, your bonus, and your investments all depend on the same sector',
          'Technology ETFs have high fees',
        ],
        answer: 1,
        explanation:
          'These are not separate risks. A downturn in the sector hits all three at once.',
      },
    },
    upNextSlugs: {
      sq: ['pse-funksionon-diversifikimi', 'si-ndertohet-nje-portofol'],
      en: ['why-diversification-works', 'how-to-build-a-portfolio'],
    },
  },

  {
    id: 'behaviour-costs-more-than-fees',
    slug: {
      sq: 'sjellja-kushton-me-shume-se-tarifat',
      en: 'behaviour-costs-more-than-fees',
    },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: {
      sq: 'Sjellja kushton më shumë se tarifat',
      en: 'Behaviour costs more than fees',
    },
    summary: {
      sq: 'Dallimi mes kthimit të një fondi dhe kthimit të investitorëve të tij është shifër që matet — dhe është e madhe.',
      en: "The gap between a fund's return and its investors' return is a measurable number — and it is large.",
    },
    inOneSentence: {
      sq: 'Shumica e njerëzve fitojnë më pak se fondet që i mbajnë, sepse blejnë pas rritjes dhe shesin pas rënies.',
      en: 'Most people earn less than the funds they hold, because they buy after the rise and sell after the fall.',
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
      en: [
        {
          heading: 'The behaviour gap',
          paragraphs: [
            'A fund can report an 8% annual average while the average investor in it earned noticeably less. The difference does not come from fees — those are already deducted.',
            'It comes from the timing of entries and exits. Money flows in after the good years and out after the bad ones, so most of the capital is there for the falls and missing for the recoveries.',
            'This gap has been measured again and again, and it usually comes out larger than the entire annual fee of an index fund.',
          ],
        },
        {
          heading: 'Why it happens',
          paragraphs: [
            'A loss hurts roughly twice as much as an equal gain feels good. That is why selling during a fall feels like relief, not like a mistake.',
            'Add to that the tendency to see patterns where there is only noise, and the confidence that grows precisely when prices are high.',
            'None of this goes away just because you know about it. It is kept in check with structure: rules set in advance, while you are calm.',
          ],
        },
        {
          heading: 'What actually helps',
          paragraphs: [
            'Automatic contributions remove the monthly decision. Rebalancing once a year forces you to sell what rose and buy what fell, without thinking about it at all.',
            'Looking less often helps noticeably. The more often you check your portfolio, the more falls you see, and the stronger the urge to act becomes.',
            'And a written plan — how much risk, why, and what you will do in a 30% fall — is worth more than any market forecast.',
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
      en: [
        {
          slug: 'behaviour-gap',
          term: 'Behaviour gap',
          definition:
            "The difference between a fund's return and the return its investors actually earned.",
          aliases: ['behavior gap'],
        },
        {
          slug: 'loss-aversion',
          term: 'Loss aversion',
          definition:
            'The tendency to feel a loss roughly twice as strongly as an equal gain.',
          aliases: ['loss averse'],
        },
        {
          slug: 'recency-bias',
          term: 'Recency bias',
          definition:
            'The tendency to assume that whatever happened recently will continue.',
          aliases: ['recency effect'],
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
      en: {
        question:
          'Why does the average investor earn less than the fund they hold?',
        options: [
          'Because fees are deducted twice',
          'Because they buy after rises and sell after falls',
          'Because funds report inaccurate numbers',
        ],
        answer: 1,
        explanation:
          "A fund's return assumes you held throughout. Timing your entries and exits cuts that return down.",
      },
    },
    upNextSlugs: {
      sq: ['kur-duhet-shitur', 'koha-ne-treg'],
      en: ['when-to-sell', 'time-in-the-market'],
    },
  },

  {
    id: 'how-scams-work',
    slug: { sq: 'si-funksionojne-mashtrimet', en: 'how-scams-work' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    noMaths: true,
    title: {
      sq: 'Si funksionojnë mashtrimet financiare',
      en: 'How financial scams work',
    },
    summary: {
      sq: 'Struktura është gjithmonë e njëjta, edhe kur ndërrohet teknologjia.',
      en: 'The structure is always the same, even when the technology changes.',
    },
    inOneSentence: {
      sq: 'Çdo mashtrim premton kthim të lartë pa rrezik, ju nxit të nxitoni dhe e bën tërheqjen e parave më të vështirë se depozitimin.',
      en: 'Every scam promises high returns without risk, pushes you to hurry, and makes withdrawing money harder than depositing it.',
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
      en: [
        {
          heading: 'The signs that repeat',
          paragraphs: [
            'High, steady returns without a single bad month. Real markets fluctuate; a straight line going up means the numbers are invented, not that the strategy is brilliant.',
            'Time pressure: "the offer closes today", "only ten spots left". The rush is there so you have no time to verify.',
            'Trouble withdrawing. Depositing is always instant; withdrawing requires "taxes" or "verification", or is met with silence.',
          ],
        },
        {
          heading: 'Pyramid and Ponzi schemes',
          paragraphs: [
            'In a Ponzi scheme there is no investment at all. New investors\' money is paid out to earlier ones as "profit", until the new inflow stops.',
            'In a pyramid scheme, the income comes from recruiting new people, not from selling any real product.',
            'Both keep going as long as they grow, and collapse the moment they stop. That is why the pressure to bring in friends and family is part of the mechanism, not enthusiasm.',
          ],
        },
        {
          heading: 'Practical protection',
          paragraphs: [
            "Check the licence with your country's regulator, not on the firm's own website. Scammers copy the names and licence numbers of real firms.",
            'Always insist on understanding where the return comes from. If the answer is "our algorithm" or "high-frequency trading" with no detail, that will remain the only answer you get.',
            'And keep the rule that saves more people than any other: nobody contacts you out of the blue to hand you a good investment opportunity.',
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
      en: [
        {
          slug: 'ponzi-scheme',
          term: 'Ponzi scheme',
          definition:
            'A fraud in which earlier investors\' "profits" are paid with the money of new ones.',
          aliases: ['Ponzi', 'Ponzi schemes'],
        },
        {
          slug: 'pump-and-dump',
          term: 'Pump and dump',
          definition:
            "Artificially inflating an asset's price in order to sell it to those who come after.",
          aliases: ['pump-and-dump'],
        },
        {
          slug: 'regulator',
          term: 'Regulator',
          definition:
            'The authority that licenses and supervises financial firms in a country.',
          aliases: ['regulators', 'financial regulator'],
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
      en: {
        question:
          'A platform shows positive monthly returns for three straight years, without a single negative month. What does that mean?',
        options: [
          'An exceptionally good strategy',
          'That the numbers are likely invented',
          'That the market has been calm',
        ],
        answer: 1,
        explanation:
          'Real markets fluctuate. The complete absence of bad months is the classic sign of invented results.',
      },
    },
    upNextSlugs: {
      sq: ['si-lexohet-fleta-e-fondit', 'cka-eshte-rreziku'],
      en: ['how-to-read-a-fund-factsheet', 'what-is-risk'],
    },
  },

  {
    id: 'reading-a-fund-factsheet',
    slug: {
      sq: 'si-lexohet-fleta-e-fondit',
      en: 'how-to-read-a-fund-factsheet',
    },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    title: {
      sq: 'Si të lexohet fleta informative e një fondi',
      en: 'How to read a fund factsheet',
    },
    summary: {
      sq: 'Dy faqe që e kanë gjithçka që ju duhet, nëse i dini cilët pesë rreshta duhen lexuar.',
      en: 'Two pages that contain everything you need, if you know which five lines to read.',
    },
    inOneSentence: {
      sq: 'Fleta informative ju tregon çka mban fondi, sa kushton, sa mirë e ndjek indeksin e vet dhe sa keq ka shkuar në të kaluarën.',
      en: 'The factsheet tells you what the fund holds, what it costs, how well it tracks its index, and how badly it has done in the past.',
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
      en: [
        {
          heading: 'The five lines that matter',
          paragraphs: [
            'The index it tracks: this determines everything. "MSCI World" and "MSCI World SRI" sound alike but hold very different things.',
            "The full annual fee, not just the management fee. And the fund's size — a very small fund risks being closed down and forcing you to sell.",
            'The top holdings and their weights. If the first ten names make up half the fund, you have not bought what the company count suggests.',
          ],
        },
        {
          heading: 'Tracking and replication',
          paragraphs: [
            'Tracking error shows how far the fund has strayed from its index. A cheap fund that tracks poorly can cost you more than a slightly pricier one that tracks precisely.',
            "How it replicates matters too. Physical replication means the fund actually owns the shares. Synthetic replication means it holds a contract with a bank that promises it the index's return.",
            'The synthetic kind is usually cheaper, but it adds a new risk: if the bank fails, the promise fails with it. That is a choice, not a mistake — but it should be made knowingly.',
          ],
        },
        {
          heading: 'The performance numbers',
          paragraphs: [
            'Past performance is always shown and predicts very little. What is useful is not the average, but the worst year and the maximum drawdown.',
            'Those two numbers tell you what you need to be able to endure. If the historical maximum drawdown is 45% and you know you would sell at 25%, this fund is not for you, however good its average return.',
            'Also check which currency the performance is reported in. The same numbers in a different currency tell a completely different story.',
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
      en: {
        heading: 'What to look for, in order',
        columns: ['Line', 'The question it answers', 'Warning sign'],
        rows: [
          {
            label: 'Index tracked',
            value: 'What do I actually own?',
            cost: 'Similar name, different contents',
          },
          {
            label: 'Total fee',
            value: 'What does it cost me?',
            cost: 'Only the management fee is shown',
            tone: 'negative',
          },
          {
            label: 'Maximum drawdown',
            value: 'How bad has it been?',
            cost: 'A very short history',
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
      en: [
        {
          slug: 'factsheet',
          term: 'Factsheet',
          definition:
            "The two-page document summarising a fund's strategy, costs, and performance.",
          aliases: ['fund factsheet', 'KID'],
        },
        {
          slug: 'physical-replication',
          term: 'Physical replication',
          definition:
            'When the fund actually owns the securities in the index.',
          aliases: ['physical ETF'],
        },
        {
          slug: 'synthetic-replication',
          term: 'Synthetic replication',
          definition:
            "When the fund holds a contract with a bank that promises it the index's return.",
          aliases: ['synthetic ETF'],
        },
        {
          slug: 'counterparty-risk',
          term: 'Counterparty risk',
          definition:
            'The risk that the party who made you a promise is unable to keep it.',
          aliases: ['counterparty risks'],
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
      en: {
        question:
          'Two funds track the same index. One charges 0.05% with a 0.40% tracking error; the other 0.15% and 0.03%. Which is likely to cost you less?',
        options: [
          'Always the first, because its fee is lower',
          'The second, because poor tracking costs more than the fee difference',
          'It does not matter, both track the same index',
        ],
        answer: 1,
        explanation:
          'The true cost is the fee plus the distance from the index. Poor tracking can easily outweigh the saving from a low fee.',
      },
    },
    upNextSlugs: {
      sq: ['cka-eshte-nje-fond', 'si-ndertohet-nje-portofol'],
      en: ['what-is-a-fund', 'how-to-build-a-portfolio'],
    },
  },

  {
    id: 'when-to-sell',
    slug: { sq: 'kur-duhet-shitur', en: 'when-to-sell' },
    topicId: 'risk-and-costs',
    level: 'intermediate',
    noMaths: true,
    title: { sq: 'Kur duhet shitur', en: 'When to sell' },
    summary: {
      sq: 'Tri arsye të mira dhe disa të këqija — dhe pse vendimi duhet marrë para se të luajë çmimi.',
      en: 'Three good reasons and a few bad ones — and why the decision should be made before the price moves.',
    },
    inOneSentence: {
      sq: 'Shitni kur ndërrohet arsyeja pse e bletë, kur ju duhen paratë ose kur pesha është rritur shumë — jo sepse ka rënë çmimi.',
      en: 'Sell when the reason you bought has changed, when you need the money, or when a position has grown too large — not because the price fell.',
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
      en: [
        {
          heading: 'Three good reasons',
          paragraphs: [
            'First: your thesis broke. You bought a company because you expected something; that thing is not happening and is not going to. The price plays no part in that judgement.',
            'Second: you need the money. That is what investing is for. Selling to buy a home or pay for an education is not failure, it is the plan being completed.',
            'Third: the position has grown out of control. If a holding has gone from 5% to 30% of your portfolio, you now have a concentration you never chose.',
          ],
        },
        {
          heading: 'Bad reasons that sound good',
          paragraphs: [
            '"It has gone up a lot, I am taking my profit." The price you paid has nothing to do with today\'s value. The market does not know what you paid, and it does not care.',
            '"It has fallen a lot, I will wait for it to come back and then sell." That ties the decision to an arbitrary number — your purchase price — instead of today\'s value.',
            '"Everyone is selling." That is the reason that triggers selling right at the bottom of a fall, where the damage is greatest.',
          ],
        },
        {
          heading: 'Decide in advance',
          paragraphs: [
            'Rules written down before you open a position are far better than judgement in a moment of stress.',
            'A simple rebalancing rule — return to your target weights once a year, or whenever something drifts more than ten percentage points — makes most of these decisions for you.',
            'That is the real reason rebalancing works: not because it times the market, but because it takes out of your hands the decision you are most likely to get wrong.',
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
      en: [
        {
          slug: 'sunk-cost',
          term: 'Sunk cost',
          definition:
            'Money already spent, which should not influence any future decision.',
          aliases: ['sunk costs', 'sunk cost fallacy'],
        },
        {
          slug: 'anchoring',
          term: 'Anchoring',
          definition:
            'Tying a decision to an arbitrary number, usually the price you paid.',
          aliases: ['anchoring bias'],
        },
        {
          slug: 'investment-thesis',
          term: 'Investment thesis',
          definition:
            'The written reason you bought something — and therefore the only way to know when to sell it.',
          aliases: ['thesis', 'investment theses'],
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
      en: {
        question:
          'A stock has fallen 30% and you decide to wait "until it gets back to my price" before selling. What is the mistake?',
        options: [
          'You should immediately sell anything that falls',
          "Your purchase price is arbitrary and says nothing about today's value",
          'You should always buy more',
        ],
        answer: 1,
        explanation:
          "The market does not know what you paid. The decision should rest on today's value and thesis, not on a number from your past.",
      },
    },
    upNextSlugs: {
      sq: ['si-ndertohet-nje-portofol', 'sjellja-kushton-me-shume-se-tarifat'],
      en: ['how-to-build-a-portfolio', 'behaviour-costs-more-than-fees'],
    },
  },

  {
    id: 'building-a-simple-portfolio',
    slug: { sq: 'si-ndertohet-nje-portofol', en: 'how-to-build-a-portfolio' },
    topicId: 'risk-and-costs',
    level: 'beginner',
    title: {
      sq: 'Si të ndërtohet një portofol i thjeshtë',
      en: 'How to build a simple portfolio',
    },
    summary: {
      sq: 'Vendimi që e shpjegon pjesën më të madhe të rezultatit tuaj nuk është cilat aksione, por sa nga secili lloj.',
      en: 'The decision that explains most of your result is not which stocks, but how much of each kind.',
    },
    inOneSentence: {
      sq: 'Zgjidheni ndarjen mes aksioneve dhe obligacioneve sipas afatit tuaj, mbajeni të gjerë e të lirë dhe ribalancojeni një herë në vit.',
      en: 'Choose your split between stocks and bonds based on your time horizon, keep it broad and cheap, and rebalance once a year.',
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
      en: [
        {
          heading: 'The first and most important decision',
          paragraphs: [
            "Different studies give different figures, but they all agree on the direction: the overwhelming share of a portfolio's movement is explained by the split between asset classes, not by the choices within them.",
            'In other words, "what percentage in stocks" matters far more than "which stocks".',
            'That is good news: the most important decision is also the simplest, and it requires no forecasting at all.',
          ],
        },
        {
          heading: 'A structure that is enough',
          paragraphs: [
            'One broad global stock fund covers thousands of companies across dozens of countries. One fund of quality bonds covers the stable part.',
            'For most people, two funds are enough. Adding a third or a fourth should answer a concrete question, not the urge to own more.',
            'The proportions depend on your horizon: the further away the day you need the money, the larger the stock portion can be.',
          ],
        },
        {
          heading: 'Maintenance',
          paragraphs: [
            'Contribute regularly and automatically. Rebalance once a year. Look at it rarely. That is the whole job.',
            'Resist the temptation to make it more complicated. Every new layer adds cost, confusion, and one more decision you can get wrong.',
            'The best portfolio is not the one with the highest expected return. It is the one you will actually hold for ten years, bad years included.',
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
      en: {
        heading: 'Splits by time horizon',
        columns: ['When you need it', 'Stocks', 'Bonds and cash'],
        rows: [
          {
            label: 'Under 3 years',
            value: '0%',
            cost: '100%',
            tone: 'positive',
          },
          { label: '5 to 10 years', value: '50-70%', cost: '30-50%' },
          { label: 'Over 15 years', value: '80-100%', cost: '0-20%' },
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
      en: [
        {
          title: 'Choose your split',
          body: 'A twenty-year horizon and a good tolerance for risk: 80% global stocks, 20% bonds.',
        },
        {
          title: 'Contribute automatically',
          body: 'The same amount every month, split in the same proportions. No decision to make each month.',
        },
        {
          title: 'Rebalance once a year',
          body: 'If stocks have grown to 88%, sell a little and buy bonds until you are back at 80/20.',
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
      en: [
        {
          slug: 'asset-allocation',
          term: 'Asset allocation',
          definition:
            'How a portfolio is divided across types of investments. The decision that explains most of the result.',
          aliases: ['allocation', 'asset allocations'],
        },
        {
          slug: 'target-weight',
          term: 'Target weight',
          definition:
            'The percentage you have set for each part, and the one you return to when rebalancing.',
          aliases: ['target weights'],
        },
        {
          slug: 'core-satellite',
          term: 'Core and satellite',
          definition:
            'A broad, cheap base, plus small positions for everything else.',
          aliases: ['core-satellite'],
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
      en: {
        question: "Which decision explains most of a portfolio's movement?",
        options: [
          'Which individual stocks you pick',
          'What percentage you hold in stocks versus bonds',
          'Which day of the month you buy',
        ],
        answer: 1,
        explanation:
          'The split between asset classes drives the result. The choices within each class carry far less weight.',
      },
    },
    relatedSymbols: ['sp-500', 'stoxx-600'],
    upNextSlugs: {
      sq: ['kur-duhet-shitur', 'njeqind-eurot-e-para'],
      en: ['when-to-sell', 'your-first-hundred-euros'],
    },
  },
];
