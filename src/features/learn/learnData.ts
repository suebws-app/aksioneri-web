import type { Locale } from '@/i18n/config';
import type {
  GlossaryTerm,
  LearnStats,
  Lesson,
  LessonLevel,
  LessonTopic,
  Localized,
} from './learnTypes';

/**
 * Seed Learning Center content.
 *
 * One registry of lessons; topics reference them by slug. Previously topics
 * carried their own inline lesson objects, so a lesson that appeared only
 * inside a topic had no page and every link to it 404'd.
 */

interface SeedLesson {
  id: string;
  slug: string;
  /** Topic the lesson belongs to. Drives the breadcrumb and progress bar. */
  topicId: string;
  title: Localized<string>;
  summary: Localized<string>;
  readingMinutes: number;
  level: LessonLevel;
  inOneSentence?: Localized<string>;
  body?: Localized<{ heading: string; paragraphs: string[] }[]>;
  workedExample?: Localized<{ title: string; body: string }[]>;
  comparison?: Localized<{
    heading: string;
    columns: [string, string, string];
    rows: {
      label: string;
      value: string;
      cost: string;
      tone?: 'positive' | 'negative' | 'neutral';
    }[];
  }>;
  keyTerms?: Localized<GlossaryTerm[]>;
  quiz?: Localized<{ question: string; options: string[] }>;
  relatedSymbols?: string[];
  upNextSlugs?: string[];
  relatedArticleSlug?: string;
}

const LESSONS: SeedLesson[] = [
  {
    id: 'what-is-an-etf',
    slug: 'what-is-an-etf',
    topicId: 'basics',
    readingMinutes: 5,
    level: 'beginner',
    title: { sq: 'Çfarë është një ETF?', en: 'What is an ETF?' },
    summary: {
      sq: 'Një fond që mban shumë kompani njëherësh, i blerë dhe i shitur si një aksion i vetëm.',
      en: 'One fund that holds many companies at once, bought and sold like a single share.',
    },
    inOneSentence: {
      sq: 'Një ETF është një shportë investimesh që mund ta blini me një klikim, dhe çmimi i tij lëviz me vlerën e gjithçkaje brenda tij.',
      en: 'An ETF is a basket of investments you can buy in one click, and its price moves with the value of everything inside it.',
    },
    body: {
      sq: [
        {
          heading: 'Si funksionon një ETF',
          paragraphs: [
            'Një menaxher fondi blen një grup aktivesh — të themi, aksione në 500 kompanitë më të mëdha amerikane — dhe pastaj e ndan pronësinë e asaj grumbulli në njësi të vogla. Çdo njësi është një aksion i ETF-së dhe tregtohet në bursë si çdo aksion tjetër.',
            'Kur blini një njësi, zotëroni një copëz të të 500 kompanive. Nuk ju është dashur të zgjidhni mes tyre dhe nuk ju duheshin 500 blerje të veçanta.',
          ],
        },
        {
          heading: 'Ku mund të shkojë keq',
          paragraphs: [
            'Diversifikimi ul rrezikun që një kompani e vetme t’ju fundosë. Nuk ju mbron nga rënia e një tregu të tërë — në një shitje masive, gati gjithçka në shportë bie bashkë.',
            'ETF-të e ngushta gjithashtu e zhbëjnë qëllimin. Një fond që mban vetëm një industri mund të jetë pothuajse aq i përqendruar sa zgjedhja e aksioneve të veçanta.',
          ],
        },
      ],
      en: [
        {
          heading: 'How an ETF works',
          paragraphs: [
            'A fund manager buys a set of assets — say, shares in the 500 largest US companies — and then splits ownership of that pile into small units. Each unit is a share of the ETF, and it trades on an exchange like any other share.',
            'When you buy one unit, you own a sliver of all 500 companies. You did not have to choose between them, and you did not need 500 separate purchases.',
          ],
        },
        {
          heading: 'Where it can go wrong',
          paragraphs: [
            'Diversification lowers the risk of one company sinking you. It does not protect you from a whole market falling — in a broad sell-off, almost everything in the basket drops together.',
            'Narrow ETFs also undo the point. A fund holding only one industry can be nearly as concentrated as picking single shares.',
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
          body: 'Nëse bie 50%, 100 € tuajat humbin rreth 1 €. Po t’i kishit vënë të gjitha te ajo kompani, do të ishit 50 € poshtë.',
        },
        {
          title: 'Indeksi rritet 8% gjatë vitit',
          body: 'Zotërimi juaj vlen rreth 108 €, minus tarifën e vogël vjetore të fondit. Ajo tarifë është gjëja tjetër për t’u kontrolluar.',
        },
      ],
      en: [
        {
          title: 'You invest €100 in an S&P 500 ETF',
          body: 'Roughly €7 of that lands in Apple, €6 in NVIDIA, and small amounts in the other 498 companies.',
        },
        {
          title: 'One company has a terrible year',
          body: 'If it drops 50%, your €100 loses about €1. Had you put everything in that single company, you would be down €50.',
        },
        {
          title: 'The index rises 8% over the year',
          body: 'Your holding is worth about €108, minus the fund’s small annual fee. That fee is the next thing to check.',
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Kostot për t’u kontrolluar',
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
        heading: 'Costs to check',
        columns: ['Fund type', 'Typical fee', 'Cost on €10,000 / yr'],
        rows: [
          {
            label: 'Broad index ETF',
            value: '0.07%',
            cost: '€7',
            tone: 'positive',
          },
          { label: 'Sector or theme ETF', value: '0.45%', cost: '€45' },
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
          term: 'Indeks',
          definition:
            'Një listë e publikuar kompanish që përdoret për të matur një treg, si S&P 500.',
        },
        {
          term: 'Raporti i shpenzimeve',
          definition:
            'Tarifa vjetore e fondit, e marrë automatikisht nga ajo që mbani.',
        },
        {
          term: 'Diversifikim',
          definition:
            'Shpërndarja e parave nëpër shumë aktive, që asnjë e vetme të mos vendosë rezultatin tuaj.',
        },
        {
          term: 'Fond akumulues',
          definition:
            'Një fond që i riinveston dividentët për ju, në vend që t’i paguajë në para.',
        },
      ],
      en: [
        {
          term: 'Index',
          definition:
            'A published list of companies used to measure a market, such as the S&P 500.',
        },
        {
          term: 'Expense ratio',
          definition:
            'The fund’s annual fee, taken automatically from what you hold.',
        },
        {
          term: 'Diversification',
          definition:
            'Spreading money across many assets so no single one decides your outcome.',
        },
        {
          term: 'Accumulating fund',
          definition:
            'One that reinvests dividends for you instead of paying them out in cash.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Zotëroni një ETF të gjerë indeksor dhe një kompani brenda tij bie 40%. Përafërsisht çfarë ndodh me zotërimin tuaj?',
        options: [
          'Bie edhe ai rreth 40%',
          'Bie shumë më pak se 1%',
          'Nuk ndryshon fare',
        ],
      },
      en: {
        question:
          'You own a broad index ETF and one company in it falls 40%. Roughly what happens to your holding?',
        options: [
          'It falls about 40% too',
          'It falls by well under 1%',
          'Nothing changes at all',
        ],
      },
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: [
      'what-is-a-share-really',
      'risk-and-return',
      'fees-that-change-everything',
    ],
    relatedArticleSlug: 'bitcoin-slips-below-99000-as-etf-inflows-pause',
  },
  {
    id: 'what-is-a-share-really',
    slug: 'what-is-a-share-really',
    topicId: 'basics',
    readingMinutes: 4,
    level: 'beginner',
    title: {
      sq: 'Çfarë është një aksion, në të vërtetë?',
      en: 'What is a share, really?',
    },
    summary: {
      sq: 'Zotërimi i një pjese të vogël të një kompanie dhe çfarë të jep e drejta.',
      en: 'Owning a small piece of a company, and what that entitles you to.',
    },
    inOneSentence: {
      sq: 'Një aksion është pronësi e pjesshme e një biznesi real, jo një kupon bastesh mbi një çmim që lëviz.',
      en: 'A share is partial ownership of a real business, not a betting slip on a moving price.',
    },
    body: {
      sq: [
        {
          heading: 'Çfarë blini në të vërtetë',
          paragraphs: [
            'Kur një kompani ndahet në një milion aksione dhe ju mbani njërin, zotëroni një të miliontën e saj: një pjesë të fabrikave, të markës, të kontratave dhe të fitimeve të ardhshme.',
            'Kjo pronësi vjen me dy të drejta praktike: një pjesë të çdo dividendi që paguan kompania, dhe një votë në vendimet e mëdha të aksionarëve.',
          ],
        },
        {
          heading: 'Pse lëviz çmimi',
          paragraphs: [
            'Çmimi është thjesht ajo për të cilën blerësi dhe shitësi i fundit ranë dakord. Ai lëviz kur ndryshon mendimi kolektiv se sa vlejnë fitimet e ardhshme të kompanisë.',
            'Prandaj një kompani mund të raportojë fitim rekord dhe aksioni të bjerë: pritej diçka edhe më e mirë.',
          ],
        },
      ],
      en: [
        {
          heading: 'What you actually buy',
          paragraphs: [
            'When a company is divided into a million shares and you hold one, you own one millionth of it: a slice of the factories, the brand, the contracts and the future profits.',
            'That ownership comes with two practical rights: a share of any dividend the company pays, and a vote on major shareholder decisions.',
          ],
        },
        {
          heading: 'Why the price moves',
          paragraphs: [
            'The price is simply what the last buyer and seller agreed on. It moves when the collective view of what the company’s future profits are worth changes.',
            'That is why a company can report record profits and the share still falls: something even better was expected.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Aksionar',
          definition: 'Kushdo që zotëron të paktën një aksion të një kompanie.',
        },
        {
          term: 'Dividend',
          definition:
            'Një pagesë në para nga fitimet, e shpërndarë te aksionarët.',
        },
        {
          term: 'Kapitalizim tregu',
          definition:
            'Çmimi i aksionit shumëzuar me numrin e aksioneve — vlera e të gjithë kompanisë.',
        },
      ],
      en: [
        {
          term: 'Shareholder',
          definition: 'Anyone who owns at least one share of a company.',
        },
        {
          term: 'Dividend',
          definition:
            'A cash payment out of profits, distributed to shareholders.',
        },
        {
          term: 'Market capitalisation',
          definition:
            'Share price times the number of shares — the value of the whole company.',
        },
      ],
    },
    upNextSlugs: ['risk-and-return', 'why-diversification-works'],
    relatedArticleSlug: 'nvidia-shares-rise-after-earnings',
  },
  {
    id: 'risk-and-return',
    slug: 'risk-and-return',
    topicId: 'basics',
    readingMinutes: 6,
    level: 'beginner',
    title: {
      sq: 'Rreziku dhe kthimi, me shembuj të përditshëm',
      en: 'Risk and return, explained with everyday examples',
    },
    summary: {
      sq: 'Pse kthimet potenciale më të larta vijnë gjithmonë me një shans më të madh humbjeje.',
      en: 'Why higher potential returns always come with a bigger chance of loss.',
    },
    inOneSentence: {
      sq: 'Askush nuk ju paguan më shumë për të njëjtin siguri — kthimi shtesë është gjithmonë pagesa për një rrezik shtesë.',
      en: 'Nobody pays you more for the same certainty — the extra return is always payment for extra risk.',
    },
    body: {
      sq: [
        {
          heading: 'Shkëmbimi, i thjeshtuar',
          paragraphs: [
            'Një depozitë bankare e siguruar paguan pak sepse është pothuajse e sigurt. Një aksion i një kompanie të re mund të trefishohet ose të zerohet, dhe kthimi mesatar më i lartë është kompensimi për të duruar atë pasiguri.',
            'Nëse dikush ju ofron kthime të larta pa rrezik, po ju fsheh rrezikun, jo po e heq atë.',
          ],
        },
        {
          heading: 'Rreziku nuk është vetëm luhatje',
          paragraphs: [
            'Për një investitor afatgjatë, rreziku i vërtetë nuk është që çmimi të bjerë këtë muaj, por që t’ju duhen paratë pikërisht kur çmimi është poshtë.',
            'Prandaj horizonti kohor ka më shumë rëndësi se toleranca ndaj rrezikut: para që ju duhen brenda vitit nuk duhet të jenë në treg fare.',
          ],
        },
      ],
      en: [
        {
          heading: 'The trade-off, simplified',
          paragraphs: [
            'An insured bank deposit pays little because it is nearly certain. A share in a young company might triple or go to zero, and the higher average return is compensation for enduring that uncertainty.',
            'If someone offers high returns with no risk, they are hiding the risk, not removing it.',
          ],
        },
        {
          heading: 'Risk is not only volatility',
          paragraphs: [
            'For a long-term investor, the real risk is not that the price falls this month, but that you need the money precisely when the price is down.',
            'That is why time horizon matters more than risk tolerance: money you need within a year should not be in the market at all.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Luhatshmëri',
          definition: 'Sa shumë lëviz çmimi lart e poshtë me kalimin e kohës.',
        },
        {
          term: 'Horizont kohor',
          definition:
            'Sa gjatë mund t’i lini paratë të investuara pa i prekur.',
        },
        {
          term: 'Kthim i rregulluar për rrezik',
          definition:
            'Sa fituat krahasuar me sa pasiguri duruat për ta fituar.',
        },
      ],
      en: [
        {
          term: 'Volatility',
          definition: 'How much the price swings up and down over time.',
        },
        {
          term: 'Time horizon',
          definition:
            'How long you can leave money invested without touching it.',
        },
        {
          term: 'Risk-adjusted return',
          definition:
            'How much you made relative to how much uncertainty you endured to make it.',
        },
      ],
    },
    quiz: {
      sq: {
        question:
          'Një investim premton 12% në vit “pa rrezik”. Cila është shpjegimi më i mundshëm?',
        options: [
          'Ka gjetur një zbrazëti në treg',
          'Rreziku ekziston, por nuk po ju tregohet',
          'Normat janë thjesht të larta këtë vit',
        ],
      },
      en: {
        question:
          'An investment promises 12% a year with “no risk”. What is the most likely explanation?',
        options: [
          'It found a gap in the market',
          'The risk exists but is not being shown to you',
          'Rates just happen to be high this year',
        ],
      },
    },
    upNextSlugs: ['why-diversification-works', 'fees-that-change-everything'],
  },
  {
    id: 'why-diversification-works',
    slug: 'why-diversification-works',
    topicId: 'basics',
    readingMinutes: 5,
    level: 'beginner',
    title: {
      sq: 'Pse diversifikimi është më e afërta me një drekë falas',
      en: 'Why diversification is the closest thing to a free lunch',
    },
    summary: {
      sq: 'Shpërndarja e parave nëpër shumë aktive ul rrezikun pa ulur kthimin e pritur.',
      en: 'Spreading money across many assets lowers risk without lowering expected return.',
    },
    inOneSentence: {
      sq: 'Nëse aktivet tuaja nuk bien gjithmonë bashkë, mbajtja e disave prej tyre ul luhatjen pa ju kushtuar kthim.',
      en: 'If your assets do not always fall together, holding several lowers the swings without costing you return.',
    },
    body: {
      sq: [
        {
          heading: 'Pse funksionon',
          paragraphs: [
            'Dy kompani rrallë kanë të njëjtin vit të keq për të njëjtën arsye. Kur njëra zhgënjen dhe tjetra befason, rezultatet e tyre pjesërisht anulohen dhe portofoli juaj lëviz më butë.',
            'Kthimi i pritur mbetet mesatarja e të dyjave. Ajo që bie është shtrirja e rezultateve të mundshme — dhe kjo është pikërisht ajo që ju bën të flini natën.',
          ],
        },
        {
          heading: 'Ku njerëzit e gabojnë',
          paragraphs: [
            'Zotërimi i dhjetë aksioneve teknologjike nuk është diversifikim. Ato ndajnë klientë, rregullatorë dhe të njëjtat pritshmëri për normat, prandaj bien bashkë.',
            'Diversifikimi i vërtetë kërkon gjëra që reagojnë ndryshe: rajone të ndryshme, industri të ndryshme, dhe klasa aktivesh të ndryshme.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why it works',
          paragraphs: [
            'Two companies rarely have the same bad year for the same reason. When one disappoints and another surprises, their results partly cancel and your portfolio moves more smoothly.',
            'The expected return stays the average of both. What falls is the spread of possible outcomes — and that is precisely what lets you sleep at night.',
          ],
        },
        {
          heading: 'Where people get it wrong',
          paragraphs: [
            'Owning ten technology shares is not diversification. They share customers, regulators and the same rate expectations, so they fall together.',
            'Real diversification needs things that react differently: different regions, different industries, and different asset classes.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Korrelacion',
          definition: 'Sa afër lëvizin dy investime në të njëjtin drejtim.',
        },
        {
          term: 'Klasë aktivesh',
          definition:
            'Një grup i gjerë investimesh me sjellje të ngjashme, si aksionet, obligacionet ose mallrat.',
        },
        {
          term: 'Përqendrim',
          definition:
            'Të kesh një pjesë të madhe të parave në një zotërim ose temë të vetme.',
        },
      ],
      en: [
        {
          term: 'Correlation',
          definition: 'How closely two investments move in the same direction.',
        },
        {
          term: 'Asset class',
          definition:
            'A broad group of investments that behave alike, such as shares, bonds or commodities.',
        },
        {
          term: 'Concentration',
          definition:
            'Having a large share of your money in one holding or theme.',
        },
      ],
    },
    upNextSlugs: [
      'fees-that-change-everything',
      'index-funds-vs-stock-picking',
    ],
    relatedArticleSlug: 'why-chip-stocks-move-together',
  },
  {
    id: 'fees-that-change-everything',
    slug: 'fees-that-change-everything',
    topicId: 'basics',
    readingMinutes: 5,
    level: 'beginner',
    title: {
      sq: 'Tarifat: shifra e vogël që ndryshon gjithçka',
      en: 'Fees: the small number that changes everything',
    },
    summary: {
      sq: 'Si një tarifë vjetore prej 1% përbëhet në një ndryshim shumë më të madh gjatë 20 vjetëve.',
      en: 'How a 1% yearly fee compounds into a much bigger difference over 20 years.',
    },
    inOneSentence: {
      sq: 'Një tarifë merret çdo vit nga e gjithë shuma juaj, ndaj kostoja e saj rritet pikërisht ndërsa portofoli juaj rritet.',
      en: 'A fee is taken every year from your whole balance, so its cost grows exactly as your portfolio grows.',
    },
    body: {
      sq: [
        {
          heading: 'Pse 1% nuk është 1%',
          paragraphs: [
            'Një tarifë prej 1% nuk ju kushton 1% të kthimit tuaj. Ju kushton 1% të gjithçkaje që zotëroni, çdo vit, përfshirë fitimet që do të kishit përbërë nëse ato para do të kishin mbetur të investuara.',
            'Mbi njëzet vjet, kjo diferencë shpesh arrin një të pestën e vlerës përfundimtare.',
          ],
        },
        {
          heading: 'Ku t’i kërkoni',
          paragraphs: [
            'Kërkoni raportin e shpenzimeve të fondit, tarifat e platformës dhe kostot e konvertimit të valutës. E fundit shpesh harrohet dhe mund të jetë më e madhe se dy të tjerat bashkë.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why 1% is not 1%',
          paragraphs: [
            'A 1% fee does not cost you 1% of your return. It costs 1% of everything you own, every year, including the gains you would have compounded had that money stayed invested.',
            'Over twenty years, that difference often reaches a fifth of the final value.',
          ],
        },
        {
          heading: 'Where to look for them',
          paragraphs: [
            'Check the fund’s expense ratio, the platform’s fees, and currency conversion costs. The last is frequently forgotten and can be larger than the other two combined.',
          ],
        },
      ],
    },
    comparison: {
      sq: {
        heading: 'Njëzet vjet me 10.000 €, duke supozuar 7% në vit',
        columns: ['Tarifa vjetore', 'Vlera përfundimtare', 'Humbur në tarifa'],
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
        heading: 'Twenty years on €10,000, assuming 7% a year',
        columns: ['Annual fee', 'Final value', 'Lost to fees'],
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
          term: 'Raporti i shpenzimeve',
          definition: 'Tarifa vjetore e fondit, si përqindje e asaj që mbani.',
        },
        {
          term: 'Përbërje',
          definition:
            'Fitimi mbi fitimet e mëparshme, që është edhe arsyeja pse tarifat lëndojnë kaq shumë.',
        },
        {
          term: 'Tarifë platforme',
          definition:
            'Ajo që ngarkon brokeri juaj, veç tarifës së vetë fondit.',
        },
      ],
      en: [
        {
          term: 'Expense ratio',
          definition:
            'The fund’s annual fee, as a percentage of what you hold.',
        },
        {
          term: 'Compounding',
          definition:
            'Earning returns on previous returns, which is also why fees hurt so much.',
        },
        {
          term: 'Platform fee',
          definition:
            'What your broker charges, separate from the fund’s own fee.',
        },
      ],
    },
    upNextSlugs: ['index-funds-vs-stock-picking', 'what-is-an-etf'],
    relatedArticleSlug: 'bitcoin-etfs-where-the-money-went-this-month',
  },
  {
    id: 'how-does-the-stock-market-work',
    slug: 'how-does-the-stock-market-work',
    topicId: 'stocks-etfs',
    readingMinutes: 7,
    level: 'beginner',
    title: {
      sq: 'Si funksionon tregu i aksioneve?',
      en: 'How does the stock market work?',
    },
    summary: {
      sq: 'Kush është në anën tjetër të transaksionit tuaj dhe si formohet në të vërtetë një çmim.',
      en: 'Who is on the other side of your trade, and how a price actually gets set.',
    },
    inOneSentence: {
      sq: 'Një bursë nuk cakton çmime — thjesht përputh atë që dikush do të paguajë me atë që dikush tjetër do të pranojë.',
      en: 'An exchange does not set prices — it simply matches what someone will pay with what someone else will accept.',
    },
    body: {
      sq: [
        {
          heading: 'Libri i porosive',
          paragraphs: [
            'Në çdo moment ka një listë ofertash për të blerë dhe një listë ofertash për të shitur. Çmimi më i lartë i ofruar quhet “bid”, më i ulëti i kërkuar quhet “ask”, dhe diferenca mes tyre është spread-i.',
            'Një transaksion ndodh kur dikush pranon çmimin e anës tjetër. Ai çmim bëhet çmimi i fundit që shihni në ekran.',
          ],
        },
        {
          heading: 'Kush është në anën tjetër',
          paragraphs: [
            'Zakonisht nuk është një person që mendon të kundërtën e jush. Shpesh është një krijues tregu, një firmë që kuoton njëkohësisht blerje dhe shitje dhe fiton nga spread-i, jo nga drejtimi.',
            'Kjo do të thotë se mund të blini menjëherë edhe kur askush tjetër nuk po shet pikërisht atë sekondë.',
          ],
        },
      ],
      en: [
        {
          heading: 'The order book',
          paragraphs: [
            'At any moment there is a list of offers to buy and a list of offers to sell. The highest price offered is the bid, the lowest asked is the ask, and the gap between them is the spread.',
            'A trade happens when someone accepts the other side’s price. That price becomes the last price you see on screen.',
          ],
        },
        {
          heading: 'Who is on the other side',
          paragraphs: [
            'It is usually not a person who thinks the opposite of you. Often it is a market maker, a firm quoting both a buy and a sell price at once, earning the spread rather than betting on direction.',
            'That is what lets you buy immediately even when nobody else happens to be selling in that exact second.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Bid dhe ask',
          definition:
            'Çmimi më i lartë që dikush do të paguajë, dhe më i ulëti që dikush do të pranojë.',
        },
        {
          term: 'Spread',
          definition:
            'Diferenca mes tyre — një kosto e vogël e fshehur në çdo transaksion.',
        },
        {
          term: 'Likuiditet',
          definition:
            'Sa lehtë mund të blini ose shisni pa lëvizur vetë çmimin.',
        },
      ],
      en: [
        {
          term: 'Bid and ask',
          definition:
            'The highest price someone will pay, and the lowest someone will accept.',
        },
        {
          term: 'Spread',
          definition:
            'The gap between them — a small hidden cost in every trade.',
        },
        {
          term: 'Liquidity',
          definition:
            'How easily you can buy or sell without moving the price yourself.',
        },
      ],
    },
    upNextSlugs: ['what-moves-a-share-price', 'what-is-a-pe-ratio'],
  },
  {
    id: 'what-is-a-pe-ratio',
    slug: 'what-is-a-pe-ratio',
    topicId: 'stocks-etfs',
    readingMinutes: 4,
    level: 'beginner',
    title: { sq: 'Çfarë është raporti P/E?', en: 'What is a P/E ratio?' },
    summary: {
      sq: 'Një mënyrë e shpejtë për të pyetur: sa po paguaj për çdo euro fitimi?',
      en: 'A quick way to ask: how much am I paying for each euro of profit?',
    },
    inOneSentence: {
      sq: 'P/E-ja tregon sa vite fitimi po paguani përpara për të zotëruar aksionin sot.',
      en: 'The P/E tells you how many years of profit you are paying up front to own the share today.',
    },
    body: {
      sq: [
        {
          heading: 'Llogaritja',
          paragraphs: [
            'Merrni çmimin e aksionit dhe pjesëtojeni me fitimin vjetor për aksion. Një aksion 100 € me fitim 5 € për aksion ka P/E 20.',
            'Kjo do të thotë se po paguani njëzetfishin e fitimit të një viti. Nëse fitimet mbeten të njëjta, do të duheshin njëzet vjet për ta kthyer investimin.',
          ],
        },
        {
          heading: 'Pse një P/E e lartë nuk është automatikisht keq',
          paragraphs: [
            'Investitorët paguajnë më shumë për fitime që presin të rriten. Një kompani me P/E 40 që dyfishon fitimet brenda tre vjetësh mund të jetë më e lirë sesa një me P/E 10 që po tkurret.',
            'Prandaj P/E-ja krahasohet vetëm brenda së njëjtës industri, dhe kurrë e vetme.',
          ],
        },
      ],
      en: [
        {
          heading: 'The calculation',
          paragraphs: [
            'Take the share price and divide it by annual profit per share. A €100 share earning €5 per share has a P/E of 20.',
            'That means you are paying twenty times one year’s profit. If profits stayed flat, it would take twenty years to earn the investment back.',
          ],
        },
        {
          heading: 'Why a high P/E is not automatically bad',
          paragraphs: [
            'Investors pay more for profits they expect to grow. A company on a P/E of 40 that doubles profits within three years can be cheaper than one on 10 that is shrinking.',
            'That is why a P/E is only compared within the same industry, and never read alone.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Fitim për aksion',
          definition: 'Fitimi total i kompanisë i ndarë me numrin e aksioneve.',
        },
        {
          term: 'P/E përpara',
          definition:
            'I njëjti raport, por duke përdorur fitimet e parashikuara në vend të atyre të kaluara.',
        },
        {
          term: 'Aksion vlere',
          definition: 'Një aksion me P/E të ulët krahasuar me kolegët e tij.',
        },
      ],
      en: [
        {
          term: 'Earnings per share',
          definition:
            'The company’s total profit divided by its number of shares.',
        },
        {
          term: 'Forward P/E',
          definition:
            'The same ratio, but using forecast profits instead of past ones.',
        },
        {
          term: 'Value share',
          definition: 'A share on a low P/E compared with its peers.',
        },
      ],
    },
    upNextSlugs: ['reading-an-earnings-report', 'what-moves-a-share-price'],
  },
  {
    id: 'index-funds-vs-stock-picking',
    slug: 'index-funds-vs-stock-picking',
    topicId: 'stocks-etfs',
    readingMinutes: 6,
    level: 'beginner',
    title: {
      sq: 'Fondet indeksore kundrejt zgjedhjes së aksioneve',
      en: 'Index funds vs. picking single stocks',
    },
    summary: {
      sq: 'Njëra kërkon kohë dhe besim; tjetra kërkon durim. Ja çfarë tregojnë të dhënat.',
      en: 'One takes time and conviction; the other takes patience. Here is what the evidence shows.',
    },
    inOneSentence: {
      sq: 'Shumica e profesionistëve nuk e mundin indeksin gjatë njëzet vjetëve, çka e bën indeksin pikënisjen e arsyeshme.',
      en: 'Most professionals do not beat the index over twenty years, which makes the index the sensible starting point.',
    },
    body: {
      sq: [
        {
          heading: 'Argumenti për indeksin',
          paragraphs: [
            'Një fond indeksor blen gjithçka dhe ngarkon shumë pak. Nuk keni nevojë të keni të drejtë për asnjë kompani të veçantë — keni nevojë vetëm që ekonomia të rritet me kohën.',
            'Kjo është arsyeja pse ai është këshilla standarde për këdo që nuk dëshiron ta kthejë investimin në punë të dytë.',
          ],
        },
        {
          heading: 'Kur zgjedhja e aksioneve ka kuptim',
          paragraphs: [
            'Nëse kuptoni vërtet një industri dhe jeni të gatshëm ta lexoni çdo raport, zgjedhja e aksioneve mund të shpërblehet. Por kërkon të pranoni se ndonjëherë do ta keni gabim, dhe në mënyrë të dukshme.',
            'Shumica e njerëzve e ndajnë ndryshimin: një bazë indeksore, plus një pjesë të vogël për bindjet e tyre.',
          ],
        },
      ],
      en: [
        {
          heading: 'The case for the index',
          paragraphs: [
            'An index fund buys everything and charges very little. You do not need to be right about any particular company — you only need the economy to grow over time.',
            'That is why it is the standard advice for anyone who does not want to turn investing into a second job.',
          ],
        },
        {
          heading: 'When stock picking makes sense',
          paragraphs: [
            'If you genuinely understand an industry and are willing to read every report, picking can pay off. But it requires accepting that you will sometimes be wrong, visibly.',
            'Most people split the difference: an index core, plus a small sleeve for their own convictions.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Menaxhim pasiv',
          definition:
            'Ndjekja e një indeksi në vend të përpjekjes për ta mundur atë.',
        },
        {
          term: 'Menaxhim aktiv',
          definition:
            'Zgjedhja e investimeve me shpresën për të tejkaluar tregun.',
        },
        {
          term: 'Gabim ndjekjeje',
          definition:
            'Sa shumë devijon një fond nga indeksi që synon të ndjekë.',
        },
      ],
      en: [
        {
          term: 'Passive management',
          definition: 'Tracking an index rather than trying to beat it.',
        },
        {
          term: 'Active management',
          definition:
            'Choosing investments in the hope of outperforming the market.',
        },
        {
          term: 'Tracking error',
          definition: 'How far a fund drifts from the index it aims to follow.',
        },
      ],
    },
    relatedSymbols: ['sp-500', 'nasdaq-100'],
    upNextSlugs: ['fees-that-change-everything', 'why-diversification-works'],
  },
  {
    id: 'reading-an-earnings-report',
    slug: 'reading-an-earnings-report',
    topicId: 'stocks-etfs',
    readingMinutes: 8,
    level: 'intermediate',
    title: {
      sq: 'Si të lexoni një raport fitimesh',
      en: 'How to read an earnings report',
    },
    summary: {
      sq: 'Katër shifrat që kanë vërtet rëndësi dhe pse tregu ndonjëherë bie edhe kur fitimet rriten.',
      en: 'The four numbers that actually matter, and why the market sometimes falls even when profits rise.',
    },
    inOneSentence: {
      sq: 'Raporti ju tregon se çfarë ndodhi; udhëzimi ju tregon se çfarë pret kompania — dhe çmimi reagon ndaj të dytit.',
      en: 'The report tells you what happened; the guidance tells you what the company expects — and the price reacts to the second.',
    },
    body: {
      sq: [
        {
          heading: 'Katër shifrat',
          paragraphs: [
            'Të ardhurat tregojnë sa shiti kompania. Marzhi tregon sa mbajti prej tyre. Fitimi për aksion tregon se çfarë mbetet për ju. Udhëzimi tregon se çfarë pret kompania më pas.',
            'Tre të parat janë histori. E katërta është ajo për të cilën tregtohet aksioni.',
          ],
        },
        {
          heading: 'Pse fitimet e mira sjellin ndonjëherë rënie',
          paragraphs: [
            'Nëse analistët prisnin rritje 30% dhe kompania jep 25%, ajo ende u rrit — por çmimi kishte çmuar paraprakisht 30%. Zhgënjimi është relativ, jo absolut.',
            'Kjo është arsyeja pse leximi i vetëm titullit të raportit shpjegon rrallë lëvizjen e çmimit.',
          ],
        },
      ],
      en: [
        {
          heading: 'The four numbers',
          paragraphs: [
            'Revenue shows how much the company sold. Margin shows how much of it it kept. Earnings per share shows what is left for you. Guidance shows what the company expects next.',
            'The first three are history. The fourth is what the share trades on.',
          ],
        },
        {
          heading: 'Why good profits sometimes bring a fall',
          paragraphs: [
            'If analysts expected 30% growth and the company delivers 25%, it still grew — but the price had already priced in 30%. Disappointment is relative, not absolute.',
            'That is why reading only the headline of a report rarely explains the price move.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Marzh bruto',
          definition:
            'Pjesa e çdo euroje shitjeje që mbetet pasi zbriten kostot e drejtpërdrejta.',
        },
        {
          term: 'Udhëzim',
          definition:
            'Parashikimi i vetë kompanisë për tremujorin ose vitin e ardhshëm.',
        },
        {
          term: 'Konsensus',
          definition:
            'Parashikimi mesatar i analistëve, dhe pragu ndaj të cilit gjykohen rezultatet.',
        },
      ],
      en: [
        {
          term: 'Gross margin',
          definition:
            'The share of every euro of sales left after direct costs.',
        },
        {
          term: 'Guidance',
          definition:
            'The company’s own forecast for the next quarter or year.',
        },
        {
          term: 'Consensus',
          definition:
            'The average analyst forecast, and the bar results are judged against.',
        },
      ],
    },
    upNextSlugs: ['what-is-a-pe-ratio', 'what-moves-a-share-price'],
    relatedArticleSlug: 'nvidia-shares-rise-after-earnings',
  },
  {
    id: 'dividends-getting-paid-to-hold',
    slug: 'dividends-getting-paid-to-hold',
    topicId: 'stocks-etfs',
    readingMinutes: 5,
    level: 'beginner',
    title: {
      sq: 'Dividentët: të paguhesh për të mbajtur',
      en: 'Dividends: getting paid to hold',
    },
    summary: {
      sq: 'Disa kompani ju paguajnë para çdo tremujor. Ja nga vijnë ato para dhe çfarë kushtojnë.',
      en: 'Some companies pay you cash every quarter. Here is where that money comes from and what it costs.',
    },
    inOneSentence: {
      sq: 'Një dividend nuk është para falas — është fitim që kompania zgjedh t’jua japë në vend që ta riinvestojë.',
      en: 'A dividend is not free money — it is profit the company chooses to hand you instead of reinvesting.',
    },
    body: {
      sq: [
        {
          heading: 'Nga vijnë paratë',
          paragraphs: [
            'Kur një kompani fiton, ajo mund t’i riinvestojë fitimet, të shlyejë borxhin, të riblejë aksione ose t’ua paguajë aksionarëve. Dividendi është opsioni i fundit.',
            'Ditën kur paguhet dividendi, çmimi i aksionit zakonisht bie përafërsisht me të njëjtën shumë. Nuk keni fituar; keni lëvizur para nga kompania te llogaria juaj.',
          ],
        },
        {
          heading: 'Pse ende ka rëndësi',
          paragraphs: [
            'Për investitorët që kanë nevojë për të ardhura të rregullta, dividentët shmangin nevojën për të shitur aksione në momentin e gabuar. Dhe një dividend i qëndrueshëm shpesh sinjalizon një biznes me flukse parash të parashikueshme.',
          ],
        },
      ],
      en: [
        {
          heading: 'Where the money comes from',
          paragraphs: [
            'When a company earns a profit it can reinvest it, repay debt, buy back shares, or pay shareholders. A dividend is that last option.',
            'On the day a dividend is paid, the share price typically falls by roughly the same amount. You have not gained; you have moved money from the company to your account.',
          ],
        },
        {
          heading: 'Why it still matters',
          paragraphs: [
            'For investors who need regular income, dividends avoid having to sell shares at the wrong moment. And a steady dividend often signals a business with predictable cash flows.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Yield-i i dividendit',
          definition: 'Dividendi vjetor i pjesëtuar me çmimin e aksionit.',
        },
        {
          term: 'Data ex-dividend',
          definition:
            'Dita pas së cilës blerja e aksionit nuk ju jep më dividendin e radhës.',
        },
        {
          term: 'Raporti i pagesës',
          definition: 'Sa pjesë e fitimeve paguhet si dividend.',
        },
      ],
      en: [
        {
          term: 'Dividend yield',
          definition: 'The annual dividend divided by the share price.',
        },
        {
          term: 'Ex-dividend date',
          definition:
            'The day after which buying the share no longer earns you the next dividend.',
        },
        {
          term: 'Payout ratio',
          definition: 'How much of profit is paid out as dividends.',
        },
      ],
    },
    upNextSlugs: ['what-is-a-pe-ratio', 'risk-and-return'],
  },
  {
    id: 'what-moves-a-share-price',
    slug: 'what-moves-a-share-price',
    topicId: 'stocks-etfs',
    readingMinutes: 7,
    level: 'beginner',
    title: {
      sq: 'Çfarë e lëviz çmimin e një aksioni në një ditë të caktuar',
      en: 'What moves a share price on any given day',
    },
    summary: {
      sq: 'Lajmet e kompanisë janë vetëm një pjesë. Pjesa tjetër vjen nga gjëra që kompania nuk i kontrollon fare.',
      en: 'Company news is only part of it. The rest comes from things the company does not control at all.',
    },
    inOneSentence: {
      sq: 'Në shumicën e ditëve, aksioni juaj lëviz sepse lëvizi tregu, jo sepse ndodhi diçka te kompania.',
      en: 'On most days your share moves because the market moved, not because anything happened at the company.',
    },
    body: {
      sq: [
        {
          heading: 'Tri forcat',
          paragraphs: [
            'Së pari, vetë tregu: kur normat ose sentimenti ndryshojnë, gati gjithçka lëviz bashkë. Së dyti, sektori: lajmet për një konkurrent shpesh e lëvizin edhe aksionin tuaj. Së treti, vetë kompania.',
            'Për një aksion tipik, dy forcat e para shpjegojnë më shumë se gjysmën e lëvizjes ditore.',
          ],
        },
        {
          heading: 'Çfarë do të thotë kjo në praktikë',
          paragraphs: [
            'Mos e lexoni çdo rënie ditore si gjykim mbi kompaninë. Krahasojeni gjithmonë me indeksin: nëse tregu ra 2% dhe aksioni juaj ra 2%, nuk ka ndodhur asgjë specifike.',
          ],
        },
      ],
      en: [
        {
          heading: 'The three forces',
          paragraphs: [
            'First, the market itself: when rates or sentiment shift, nearly everything moves together. Second, the sector: news about a competitor often moves your share too. Third, the company itself.',
            'For a typical share, the first two forces explain more than half of the daily move.',
          ],
        },
        {
          heading: 'What that means in practice',
          paragraphs: [
            'Do not read every daily fall as a verdict on the company. Always compare it with the index: if the market fell 2% and your share fell 2%, nothing specific happened.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Beta',
          definition: 'Sa shumë lëviz një aksion krahasuar me tregun e gjerë.',
        },
        {
          term: 'Rreziku sistematik',
          definition:
            'Rreziku që prek të gjithë tregun dhe nuk mund të diversifikohet.',
        },
        {
          term: 'Rrotullim sektorial',
          definition:
            'Kur paratë lëvizin nga një industri në tjetrën pa dalë nga tregu.',
        },
      ],
      en: [
        {
          term: 'Beta',
          definition: 'How much a share moves relative to the broad market.',
        },
        {
          term: 'Systematic risk',
          definition:
            'Risk that affects the whole market and cannot be diversified away.',
        },
        {
          term: 'Sector rotation',
          definition:
            'When money moves from one industry to another without leaving the market.',
        },
      ],
    },
    upNextSlugs: ['what-moves-interest-rates', 'why-diversification-works'],
    relatedArticleSlug: 'why-chip-stocks-move-together',
  },
  {
    id: 'what-moves-interest-rates',
    slug: 'what-moves-interest-rates',
    topicId: 'markets-economy',
    readingMinutes: 6,
    level: 'beginner',
    title: {
      sq: 'Pse normat e interesit lëvizin tregjet',
      en: 'Why interest rates move markets',
    },
    summary: {
      sq: 'Pse bankat qendrore i ngrenë dhe i ulin ato, dhe çfarë ndodh më pas me kursimet dhe kreditë tuaja.',
      en: 'Why central banks raise and lower them, and what happens next to your savings and loans.',
    },
    inOneSentence: {
      sq: 'Norma e interesit është çmimi i parasë, dhe ndryshimi i saj riçmon gati çdo aktiv njëherësh.',
      en: 'An interest rate is the price of money, and changing it reprices almost every asset at once.',
    },
    body: {
      sq: [
        {
          heading: 'Pse i ndryshojnë bankat qendrore',
          paragraphs: [
            'Kur inflacioni është shumë i lartë, normat më të larta e bëjnë huamarrjen të shtrenjtë, kërkesa ftohet dhe çmimet ngadalësohen. Kur ekonomia dobësohet, ndodh e kundërta.',
            'Është një mjet i vetëm i papërpiktë, dhe pikërisht kjo është arsyeja pse tregjet debatojnë çdo fjalë të bankës.',
          ],
        },
        {
          heading: 'Pse preken aksionet',
          paragraphs: [
            'Vlera e një kompanie sot është fitimi i saj i ardhshëm i sjellë në të tashmen. Normat më të larta e bëjnë atë të ardhme më pak të vlefshme sot, dhe kompanitë me fitime më të largëta preken më shumë.',
            'Prandaj aksionet e teknologjisë lëvizin më fort ndaj lajmeve për normat sesa, të themi, një kompani energjie.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why central banks change them',
          paragraphs: [
            'When inflation is too high, higher rates make borrowing expensive, demand cools and prices slow. When the economy weakens, the reverse happens.',
            'It is a single blunt tool, which is exactly why markets debate every word the bank says.',
          ],
        },
        {
          heading: 'Why shares are affected',
          paragraphs: [
            'A company’s value today is its future profit brought into the present. Higher rates make that future worth less now, and companies whose profits sit further out are hit hardest.',
            'That is why technology shares move more on rate news than, say, an energy company does.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Norma bazë',
          definition:
            'Norma që cakton banka qendrore dhe mbi të cilën ndërtohen të gjitha të tjerat.',
        },
        {
          term: 'Zbritje',
          definition: 'Kthimi i parave të ardhshme në vlerën e tyre të sotme.',
        },
        {
          term: 'Aksion rritjeje',
          definition:
            'Një kompani fitimet e së cilës priten kryesisht në të ardhmen e largët.',
        },
      ],
      en: [
        {
          term: 'Base rate',
          definition:
            'The rate a central bank sets, on which all the others are built.',
        },
        {
          term: 'Discounting',
          definition: 'Turning future money into what it is worth today.',
        },
        {
          term: 'Growth share',
          definition:
            'A company whose profits are expected mostly in the distant future.',
        },
      ],
    },
    relatedSymbols: ['sp-500', 'eur-usd'],
    upNextSlugs: ['inflation-in-one-page', 'what-central-banks-do'],
    relatedArticleSlug: 'markets-rally-as-investors-read-new-fed-signals',
  },
  {
    id: 'inflation-in-one-page',
    slug: 'inflation-in-one-page',
    topicId: 'markets-economy',
    readingMinutes: 4,
    level: 'beginner',
    title: { sq: 'Inflacioni në një faqe', en: 'Inflation in one page' },
    summary: {
      sq: 'Çfarë mat në të vërtetë, pse 2% është numri magjik, dhe çfarë do të thotë për paratë tuaja.',
      en: 'What it actually measures, why 2% is the magic number, and what it means for your money.',
    },
    inOneSentence: {
      sq: 'Inflacioni mat sa më shpejt po humbin vlerë paratë tuaja, jo sa të shtrenjta janë gjërat.',
      en: 'Inflation measures how quickly your money is losing value, not how expensive things are.',
    },
    body: {
      sq: [
        {
          heading: 'Si matet',
          paragraphs: [
            'Statisticienët çmojnë të njëjtën shportë mallrash dhe shërbimesh çdo muaj dhe e krahasojnë me një vit më parë. Diferenca në përqindje është inflacioni.',
            'Kjo do të thotë se inflacioni në rënie nuk do të thotë çmime në rënie. Do të thotë vetëm se ato po rriten më ngadalë.',
          ],
        },
        {
          heading: 'Pse 2%',
          paragraphs: [
            'Pak inflacion i inkurajon njerëzit të shpenzojnë dhe të investojnë sot në vend që të presin. Zero ose negativ e ngrin ekonominë, sepse pritja shpërblehet.',
            'Dy përqind është kompromisi që shumica e bankave qendrore kanë zgjedhur: mjaftueshëm për të lubrifikuar ekonominë, mjaftueshëm i vogël për të mos u vënë re.',
          ],
        },
      ],
      en: [
        {
          heading: 'How it is measured',
          paragraphs: [
            'Statisticians price the same basket of goods and services every month and compare it with a year earlier. The percentage difference is inflation.',
            'That means falling inflation does not mean falling prices. It only means they are rising more slowly.',
          ],
        },
        {
          heading: 'Why 2%',
          paragraphs: [
            'A little inflation encourages people to spend and invest today rather than wait. Zero or negative freezes an economy, because waiting is rewarded.',
            'Two percent is the compromise most central banks have settled on: enough to keep the economy moving, small enough to go unnoticed.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'CPI',
          definition:
            'Indeksi i çmimeve të konsumit, matja kryesore e inflacionit.',
        },
        {
          term: 'Deflacion',
          definition:
            'Rënie e vërtetë e çmimeve, e cila zakonisht sinjalizon një ekonomi në vështirësi.',
        },
        {
          term: 'Fuqi blerëse',
          definition: 'Sa mund të blini vërtet me të njëjtën shumë parash.',
        },
      ],
      en: [
        {
          term: 'CPI',
          definition:
            'The consumer price index, the headline measure of inflation.',
        },
        {
          term: 'Deflation',
          definition:
            'Prices actually falling, which usually signals an economy in trouble.',
        },
        {
          term: 'Purchasing power',
          definition:
            'How much you can actually buy with the same amount of money.',
        },
      ],
    },
    upNextSlugs: [
      'what-moves-interest-rates',
      'how-to-read-the-economic-calendar',
    ],
    relatedArticleSlug: 'euro-zone-inflation-cools-to-1-9-percent',
  },
  {
    id: 'what-central-banks-do',
    slug: 'what-central-banks-do',
    topicId: 'markets-economy',
    readingMinutes: 7,
    level: 'beginner',
    title: {
      sq: 'Çfarë bëjnë në të vërtetë bankat qendrore',
      en: 'What central banks actually do',
    },
    summary: {
      sq: 'Ato nuk shtypin para sipas dëshirës dhe nuk drejtojnë ekonominë. Ja mandati i tyre i vërtetë.',
      en: 'They do not print money at will, and they do not run the economy. Here is their actual mandate.',
    },
    inOneSentence: {
      sq: 'Puna e një banke qendrore është të mbajë çmimet të qëndrueshme, dhe gati gjithçka tjetër rrjedh prej saj.',
      en: 'A central bank’s job is to keep prices stable, and nearly everything else follows from that.',
    },
    body: {
      sq: [
        {
          heading: 'Mandati',
          paragraphs: [
            'Shumica e bankave qendrore kanë një detyrë ligjore: çmime të qëndrueshme. Disa, si Fed-i, kanë edhe një të dytë — punësim maksimal — dhe kjo dyshe shpjegon pse vendimet e tyre janë më të vështira për t’u parashikuar.',
            'Ato nuk vendosin taksat, nuk shpenzojnë buxhetin dhe nuk drejtojnë bankat tregtare të japin kredi.',
          ],
        },
        {
          heading: 'Mjetet',
          paragraphs: [
            'Mjeti kryesor është norma bazë. E dyta është blerja ose shitja e obligacioneve, që ndikon te normat afatgjata. E treta, dhe shpesh më e fuqishmja, janë thjesht fjalët.',
            'Kur një guvernator sinjalizon se çfarë pret, tregjet lëvizin para se të ndodhë ndonjë veprim.',
          ],
        },
      ],
      en: [
        {
          heading: 'The mandate',
          paragraphs: [
            'Most central banks have one legal duty: stable prices. Some, like the Fed, have a second — maximum employment — and that dual mandate explains why their decisions are harder to predict.',
            'They do not set taxes, spend the budget, or direct commercial banks to lend.',
          ],
        },
        {
          heading: 'The tools',
          paragraphs: [
            'The main tool is the base rate. The second is buying or selling bonds, which affects longer-term rates. The third, and often the most powerful, is simply words.',
            'When a governor signals what they expect, markets move before any action happens.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Udhëheqje paraprake',
          definition:
            'Sinjalizimi i qëllimeve të ardhshme për të lëvizur tregjet pa ndryshuar normat.',
        },
        {
          term: 'Lehtësim sasior',
          definition: 'Blerja e obligacioneve për të ulur normat afatgjata.',
        },
        {
          term: 'Mandat i dyfishtë',
          definition:
            'Detyra e Fed-it për të synuar njëkohësisht çmime të qëndrueshme dhe punësim të lartë.',
        },
      ],
      en: [
        {
          term: 'Forward guidance',
          definition:
            'Signalling future intentions to move markets without changing rates.',
        },
        {
          term: 'Quantitative easing',
          definition: 'Buying bonds to push long-term rates down.',
        },
        {
          term: 'Dual mandate',
          definition:
            'The Fed’s duty to target stable prices and high employment at once.',
        },
      ],
    },
    upNextSlugs: ['what-moves-interest-rates', 'bonds-explained'],
    relatedArticleSlug: 'what-the-fed-actually-said-in-plain-english',
  },
  {
    id: 'how-to-read-the-economic-calendar',
    slug: 'how-to-read-the-economic-calendar',
    topicId: 'markets-economy',
    readingMinutes: 5,
    level: 'beginner',
    title: {
      sq: 'Si të lexoni kalendarin ekonomik',
      en: 'How to read the economic calendar',
    },
    summary: {
      sq: 'Tri ide dhe tabela e shifrave kthehet në diçka të lexueshme.',
      en: 'Three ideas and the table of numbers turns into something readable.',
    },
    inOneSentence: {
      sq: 'Ajo që lëviz tregjet nuk është shifra, por diferenca mes shifrës dhe asaj që pritej.',
      en: 'What moves markets is not the number, but the gap between the number and what was expected.',
    },
    body: {
      sq: [
        {
          heading: 'Surpriza, jo shifra',
          paragraphs: [
            'Çdo publikim ka një pritshmëri konsensusi, dhe tregjet e kanë çmuar tashmë atë. Nëse inflacioni pritet 3.1% dhe del 3.1%, zakonisht nuk ndodh gati asgjë.',
            'Prandaj kolonat “aktuale” dhe “e pritur” lexohen gjithmonë së bashku, kurrë veç.',
          ],
        },
        {
          heading: 'Përdorni shiritat e ndikimit si filtër',
          paragraphs: [
            'Nëse keni pesë minuta në ditë, lexoni vetëm ngjarjet me tre shirita. Ato janë publikimet që lëvizin tregje të tëra; pjesa tjetër ka rëndësi kryesisht për specialistët.',
            'Dhe mos harroni: shumica e publikimeve që ju shqetësojnë nuk do të kenë rëndësi për portofolin tuaj brenda gjashtë muajsh.',
          ],
        },
      ],
      en: [
        {
          heading: 'The surprise, not the number',
          paragraphs: [
            'Every release has a consensus expectation, and markets have already priced it in. If inflation is expected at 3.1% and arrives at 3.1%, usually almost nothing happens.',
            'That is why the “actual” and “expected” columns are always read together, never apart.',
          ],
        },
        {
          heading: 'Use the impact bars as a filter',
          paragraphs: [
            'If you have five minutes a day, read only the three-bar events. Those are the releases that move whole markets; the rest matters mainly to specialists.',
            'And remember: most releases that worry you will not matter to your portfolio in six months.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Konsensus',
          definition: 'Parashikimi mesatar i ekonomistëve para një publikimi.',
        },
        {
          term: 'Surprizë',
          definition: 'Diferenca mes shifrës aktuale dhe konsensusit.',
        },
        {
          term: 'Rishikim',
          definition:
            'Një ndryshim i mëvonshëm i një shifre të publikuar më parë.',
        },
      ],
      en: [
        {
          term: 'Consensus',
          definition: 'The average economist forecast ahead of a release.',
        },
        {
          term: 'Surprise',
          definition: 'The gap between the actual figure and the consensus.',
        },
        {
          term: 'Revision',
          definition: 'A later change to a figure that was already published.',
        },
      ],
    },
    upNextSlugs: ['inflation-in-one-page', 'what-central-banks-do'],
  },
  {
    id: 'bonds-explained',
    slug: 'bonds-explained',
    topicId: 'markets-economy',
    readingMinutes: 6,
    level: 'intermediate',
    title: { sq: 'Obligacionet, të shpjeguara', en: 'Bonds explained' },
    summary: {
      sq: 'Pse çmimi i një obligacioni bie kur normat rriten, dhe çfarë do të thotë yield-i në praktikë.',
      en: 'Why a bond’s price falls when rates rise, and what yield means in practice.',
    },
    inOneSentence: {
      sq: 'Një obligacion është një kredi që ju i jepni dikujt, dhe çmimi i tij lëviz në të kundërt me normat e reja.',
      en: 'A bond is a loan you make to someone, and its price moves opposite to new interest rates.',
    },
    body: {
      sq: [
        {
          heading: 'Pse çmimi bie kur normat rriten',
          paragraphs: [
            'Nëse blini një obligacion që paguan 3% dhe të nesërmen obligacionet e reja paguajnë 4%, i juaji bëhet më pak tërheqës. E vetmja mënyrë që dikush ta blejë është nëse çmimi bie.',
            'Sa më e gjatë kohëzgjatja e obligacionit, aq më e madhe rënia — sepse jeni të mbërthyer në normën më të ulët për më shumë vite.',
          ],
        },
        {
          heading: 'Pse i mban dikush ende',
          paragraphs: [
            'Obligacionet qeveritare paguajnë më pak se aksionet me kalimin e kohës, por bien më rrallë dhe më butë. Në një portofol, ato janë balasti, jo motori.',
          ],
        },
      ],
      en: [
        {
          heading: 'Why the price falls when rates rise',
          paragraphs: [
            'If you buy a bond paying 3% and the next day new bonds pay 4%, yours becomes less attractive. The only way someone buys it is if the price falls.',
            'The longer the bond’s duration, the bigger the fall — because you are locked into the lower rate for more years.',
          ],
        },
        {
          heading: 'Why anyone still holds them',
          paragraphs: [
            'Government bonds pay less than shares over time, but they fall less often and less sharply. In a portfolio they are the ballast, not the engine.',
          ],
        },
      ],
    },
    keyTerms: {
      sq: [
        {
          term: 'Yield',
          definition: 'Kthimi vjetor që merrni në raport me çmimin që paguat.',
        },
        {
          term: 'Kohëzgjatje',
          definition:
            'Sa i ndjeshëm është çmimi i një obligacioni ndaj ndryshimit të normave.',
        },
        {
          term: 'Kupon',
          definition: 'Pagesa fikse e interesit që bën obligacioni.',
        },
      ],
      en: [
        {
          term: 'Yield',
          definition:
            'The annual return you get relative to the price you paid.',
        },
        {
          term: 'Duration',
          definition: 'How sensitive a bond’s price is to a change in rates.',
        },
        {
          term: 'Coupon',
          definition: 'The fixed interest payment the bond makes.',
        },
      ],
    },
    upNextSlugs: ['what-moves-interest-rates', 'risk-and-return'],
  },
];

/**
 * Topics reference lessons by slug. `lessonCount` is the size of the whole
 * topic, which is larger than the handful listed — the design shows
 * "12 lessons" above four rows, and paging into the rest is a later concern.
 */
interface SeedTopic {
  id: string;
  title: Localized<string>;
  lessonCount: number;
  slugs: string[];
}

const TOPICS: SeedTopic[] = [
  {
    id: 'basics',
    lessonCount: 12,
    title: { sq: 'Bazat', en: 'The basics' },
    slugs: [
      'what-is-a-share-really',
      'risk-and-return',
      'why-diversification-works',
      'fees-that-change-everything',
    ],
  },
  {
    id: 'stocks-etfs',
    lessonCount: 14,
    title: { sq: 'Aksione dhe ETF', en: 'Stocks & ETFs' },
    slugs: [
      'index-funds-vs-stock-picking',
      'reading-an-earnings-report',
      'dividends-getting-paid-to-hold',
      'what-moves-a-share-price',
    ],
  },
  {
    id: 'markets-economy',
    lessonCount: 11,
    title: { sq: 'Tregjet dhe ekonomia', en: 'Markets & the economy' },
    slugs: [
      'what-moves-interest-rates',
      'inflation-in-one-page',
      'what-central-banks-do',
      'how-to-read-the-economic-calendar',
    ],
  },
];

/** The three cards the Learn page and homepage promote. */
const START_HERE = [
  'what-is-an-etf',
  'how-does-the-stock-market-work',
  'what-is-a-pe-ratio',
];

const GLOSSARY: Localized<GlossaryTerm[]> = {
  sq: [
    {
      term: 'Udhëzim',
      definition:
        'Parashikimi i vetë kompanisë për rezultatet e saj të ardhshme.',
    },
    {
      term: 'Pikë bazë',
      definition: 'Një e qindta e një përqindjeje. 25 pikë bazë = 0.25%.',
    },
    {
      term: 'Fluks hyrës',
      definition: 'Para të reja që mbërrijnë në një fond gjatë një periudhe.',
    },
    {
      term: 'Yield',
      definition: 'Të ardhurat vjetore nga një aktiv si pjesë e çmimit të tij.',
    },
  ],
  en: [
    {
      term: 'Guidance',
      definition: 'A company’s own forecast for its next results.',
    },
    {
      term: 'Basis point',
      definition: 'One hundredth of a percent. 25 bps = 0.25%.',
    },
    {
      term: 'Inflow',
      definition: 'New money arriving into a fund over a period.',
    },
    {
      term: 'Yield',
      definition: 'Annual income from an asset as a share of its price.',
    },
  ],
};

const findSeed = (slug: string): SeedLesson => {
  const lesson = LESSONS.find((entry) => entry.slug === slug);
  if (!lesson) throw new Error(`Unknown lesson slug: ${slug}`);
  return lesson;
};

const resolve = (lesson: SeedLesson, locale: Locale): Lesson => {
  const topic = TOPICS.find((entry) => entry.id === lesson.topicId);
  // Position within the topic drives the breadcrumb and the progress bar.
  const position = topic ? topic.slugs.indexOf(lesson.slug) + 1 : 0;

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title[locale],
    summary: lesson.summary[locale],
    readingMinutes: lesson.readingMinutes,
    level: lesson.level,
    ...(lesson.body ? { body: lesson.body[locale] } : {}),
    ...(lesson.inOneSentence
      ? { inOneSentence: lesson.inOneSentence[locale] }
      : {}),
    ...(lesson.workedExample
      ? { workedExample: lesson.workedExample[locale] }
      : {}),
    ...(lesson.comparison ? { comparison: lesson.comparison[locale] } : {}),
    ...(lesson.keyTerms ? { keyTerms: lesson.keyTerms[locale] } : {}),
    ...(lesson.quiz ? { quiz: lesson.quiz[locale] } : {}),
    ...(topic && position > 0
      ? {
          track: {
            topicTitle: topic.title[locale],
            position,
            total: topic.lessonCount,
          },
        }
      : {}),
    ...(lesson.relatedSymbols ? { relatedSymbols: lesson.relatedSymbols } : {}),
    ...(lesson.upNextSlugs ? { upNextSlugs: lesson.upNextSlugs } : {}),
    ...(lesson.relatedArticleSlug
      ? { relatedArticleSlug: lesson.relatedArticleSlug }
      : {}),
  };
};

export const getLessons = (locale: Locale): Lesson[] =>
  LESSONS.map((lesson) => resolve(lesson, locale));

export const getFeaturedLessons = (locale: Locale): Lesson[] =>
  START_HERE.map((slug) => resolve(findSeed(slug), locale));

export const getLessonBySlug = (
  locale: Locale,
  slug: string,
): Lesson | null => {
  const lesson = LESSONS.find((entry) => entry.slug === slug);
  return lesson ? resolve(lesson, locale) : null;
};

/** Every lesson has a page, so every slug is a valid route. */
export const getLessonSlugs = (): string[] =>
  LESSONS.map((lesson) => lesson.slug);

export const getTopics = (locale: Locale): LessonTopic[] =>
  TOPICS.map((topic) => ({
    id: topic.id,
    title: topic.title[locale],
    lessonCount: topic.lessonCount,
    lessons: topic.slugs.map((slug) => resolve(findSeed(slug), locale)),
  }));

export const getGlossary = (locale: Locale): GlossaryTerm[] => GLOSSARY[locale];

export const getLearnStats = (): LearnStats => ({
  lessonCount: 48,
  averageMinutes: 5,
  glossarySize: 120,
});
