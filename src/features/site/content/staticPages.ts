import type { StaticPageContent } from '../siteTypes';

/**
 * The address readers write to.
 *
 * One constant rather than a string repeated across three pages: it appears in
 * the contact page, in the privacy page's data-request section and in the
 * terms. **Replace it with the real inbox before launch** — nothing checks
 * that it receives mail.
 */
export const CONTACT_EMAIL = 'kontakt@aksioneri.com';

/** Last substantive edit to the legal text. Shown on privacy and terms. */
const LEGAL_UPDATED_AT = '2026-08-25';

const ABOUT: StaticPageContent = {
  slug: 'about',
  title: 'Rreth nesh',
  intro:
    'Aksioneri i shpjegon tregjet financiare shqip — thjesht, pa fjalë të vështira dhe pa supozuar se dini diçka që nuk ju ka shpjeguar askush.',
  sections: [
    {
      heading: 'Pse ekziston',
      paragraphs: [
        'Informacioni financiar në shqip ose mungon, ose vjen i përkthyer keq, ose është shkruar për njerëz që tashmë e dinë çështjen. Kush nis nga zeroja mbetet me terma që askush nuk ia shpjegon: inflacion bazë, kurbë yield-esh, raport çmim/fitim.',
        'Kjo faqe u ndërtua për atë lexues. Çdo shifër këtu vjen me një fjali që tregon çka do të thotë, dhe çdo term ka një përkufizim një rresht larg tekstit ku e takoni.',
      ],
    },
    {
      heading: 'Çka gjeni këtu',
      paragraphs: [
        'Tregjet ndjekin indekset, mallrat dhe monedhat kryesore, me lëvizjen e ditës dhe një shpjegim se çka e lëviz secilën.',
        'Lajmet mbledhin atë që ndodh sot në tregje, të përmbledhura shkurt. Kalendari tregon shifrat ekonomike që vijnë, çka pritet dhe pse ka rëndësi.',
        'Qendra e Mësimit ka 48 mësime të shkurtra dhe një fjalorth me mbi 150 terma — pjesa e faqes që nuk vjetrohet.',
      ],
    },
    {
      heading: 'Si punojmë me lajmet',
      paragraphs: [
        'Lajmet vijnë nga burime publike të publikuesve financiarë. Ne i përmbledhim dhe i përkthejmë, kurse teksti i plotë mbetet i publikuesit — prandaj çdo lajm e ka lidhjen te burimi origjinal.',
        'Përkthimi bëhet me mjete automatike dhe rishikohet aty ku ka rëndësi. Nëse hasni një përkthim që ju duket i gabuar, na shkruani.',
      ],
    },
    {
      heading: 'Çka nuk jemi',
      paragraphs: [
        'Nuk jemi ndërmjetës, nuk shesim produkte financiare dhe nuk marrim komision nga askush që ju mund të investoni.',
        'Asgjë në këtë faqe nuk është këshillë investimi. Ne shpjegojmë si funksionojnë gjërat; vendimi çka të bëni me paratë tuaja mbetet i juaji, dhe për të ia vlen të flisni me dikë të licencuar.',
      ],
    },
  ],
};

const CONTACT: StaticPageContent = {
  slug: 'contact',
  title: 'Kontakt',
  intro:
    'Një adresë, për gjithçka: gabime në përmbajtje, pyetje për të dhënat tuaja, ose bashkëpunime.',
  email: CONTACT_EMAIL,
  sections: [
    {
      heading: 'Na shkruani',
      paragraphs: ['Përgjigjemi zakonisht brenda pak ditësh pune.'],
    },
    {
      heading: 'Për çka na shkruajnë më së shpeshti',
      paragraphs: [
        'Gabime në përmbajtje — një shifër që nuk qëndron, një përkufizim i paqartë ose një përkthim që tingëllon keq. Këto na duhen më së shumti, dhe i ndreqim shpejt.',
        'Të dhënat tuaja — çdo kërkesë sipas seksionit të privatësisë shkon te e njëjta adresë.',
        'Publikuesit — nëse jeni burim i një lajmi dhe doni ta ndryshojmë ose ta heqim mënyrën si e paraqesim, na njoftoni.',
      ],
    },
    {
      heading: 'Çka nuk mund t’ju themi',
      paragraphs: [
        'Nuk japim këshilla investimi dhe nuk komentojmë se a duhet ta blini apo ta shitni diçka. Nuk jemi të licencuar për këtë, dhe kushdo që ju e jep atë këshillë pa ju njohur rrethanat, duhet dëgjuar me kujdes.',
      ],
    },
  ],
};

const PRIVACY: StaticPageContent = {
  slug: 'privacy',
  title: 'Privatësia',
  intro:
    'Faqja nuk ka llogari dhe nuk ju kërkon asnjë të dhënë personale. Këtu shpjegohet saktësisht çka ruhet kur e lexoni, ku ruhet dhe si mund ta fshini.',
  updatedAt: LEGAL_UPDATED_AT,
  sections: [
    {
      heading: 'Nuk ka llogari dhe nuk ka profile',
      paragraphs: [
        'Nuk kërkojmë emër, e-mail as numër telefoni. Nuk mund të regjistroheni, prandaj nuk mbajmë asnjë profil për ju dhe nuk kemi çka t’ia shesim askujt.',
      ],
    },
    {
      heading: 'Përparimi i mësimeve rri në pajisjen tuaj',
      paragraphs: [
        'Kur e shënoni një mësim si të lexuar, kjo ruhet në vetë shfletuesin tuaj (localStorage), jo te ne. Nuk e shohim dhe nuk e marrim.',
        'Prandaj përparimi nuk kalon nga telefoni te kompjuteri, dhe zhduket nëse e pastroni shfletuesin. Mund ta fshini kurdo me butonin “Fshi përparimin” në Qendrën e Mësimit.',
      ],
    },
    {
      heading: 'Çka regjistrohet në server',
      paragraphs: [
        'Si çdo faqe interneti, serveri ynë dhe ai i strehimit mund të mbajnë të dhëna teknike të kërkesave — adresën IP, kohën dhe llojin e shfletuesit — për siguri dhe për të gjetur defektet. Këto nuk lidhen me ju si person dhe nuk përdoren për profilizim.',
        'Numërojmë sa herë hapet një lajm, si shifër të përgjithshme për rreshtin “Më të lexuarat”. Ky numërim nuk mban asgjë që ju identifikon.',
      ],
    },
    {
      heading: 'Cookies dhe palët e treta',
      paragraphs: [
        'Për momentin nuk përdorim cookie gjurmuese dhe as mjete analitike si Google Analytics.',
        'Fotografitë e lajmeve ngarkohen drejtpërdrejt nga serverët e publikuesve, prandaj ata e shohin kërkesën e shfletuesit tuaj kur hapni një lajm. E njëjta vlen kur ndiqni një lidhje jashtë faqes.',
      ],
    },
    {
      heading: 'Të drejtat tuaja',
      paragraphs: [
        'Meqë nuk mbajmë të dhëna që ju identifikojnë, zakonisht nuk ka çka të kërkohet ose të fshihet. Nëse mendoni ndryshe, ose doni të dini më shumë, na shkruani te ' +
          CONTACT_EMAIL +
          ' dhe përgjigjemi.',
        'Nëse kjo ndryshon — për shembull nëse një ditë shtohen reklamat, mjetet analitike ose llogaritë — kjo faqe përditësohet para se ndryshimi të hyjë në fuqi, dhe data lart e tregon se kur.',
      ],
    },
  ],
};

const TERMS: StaticPageContent = {
  slug: 'terms',
  title: 'Kushtet e përdorimit',
  intro:
    'Çka mund të pritni nga kjo faqe dhe çka jo. Shkurt, dhe pa gjuhë të koklavitur.',
  updatedAt: LEGAL_UPDATED_AT,
  sections: [
    {
      heading: 'Përmbajtja është edukative',
      paragraphs: [
        'Gjithçka këtu ofrohet për qëllime edukative dhe informuese. Nuk është këshillë investimi, financiare, tatimore apo juridike, dhe nuk merr parasysh gjendjen tuaj konkrete.',
        'Vendimet që i merrni me paratë tuaja janë tërësisht tuajat. Për këshillë të personalizuar, drejtojuni një personi të licencuar.',
      ],
    },
    {
      heading: 'Të dhënat e tregut',
      paragraphs: [
        'Çmimet, indekset dhe shifrat ekonomike vijnë nga palë të treta. Mund të vonojnë, të jenë të papërsosura ose të mungojnë përkohësisht, dhe nuk garantojmë saktësinë e tyre.',
        'Mos i përdorni si burim të vetëm për një vendim ku shifra e saktë ka rëndësi. Për tregtim, burimi zyrtar është platforma juaj, jo kjo faqe.',
      ],
    },
    {
      heading: 'Lajmet dhe e drejta e autorit',
      paragraphs: [
        'Lajmet janë përmbledhje dhe përkthime të materialeve të publikuesve, të shoqëruara gjithmonë me lidhjen te burimi. E drejta e autorit mbi tekstin origjinal u takon atyre.',
        'Mësimet, fjalorthi dhe shpjegimet janë punë e jona. Mund t’i lexoni, t’i ndani dhe të citoni prej tyre me burim; ripublikimi i plotë kërkon leje.',
      ],
    },
    {
      heading: 'Pa garanci dhe kufizim i përgjegjësisë',
      paragraphs: [
        'Faqja ofrohet ashtu si është. Nuk garantojmë se do të jetë gjithmonë e qasshme, pa gabime ose e përditësuar në çdo çast.',
        'Në masën që e lejon ligji, nuk mbajmë përgjegjësi për humbje që rrjedhin nga përdorimi i faqes ose nga mbështetja në përmbajtjen e saj.',
      ],
    },
    {
      heading: 'Ndryshimet',
      paragraphs: [
        'Këto kushte mund të ndryshojnë. Data e përditësimit qëndron në krye të faqes, dhe përdorimi i mëtejshëm pas ndryshimit nënkupton pranimin e tyre.',
        `Për çdo pyetje rreth këtyre kushteve, na shkruani te ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

/**
 * Every standing page, keyed by slug so a route can ask for its own.
 *
 * Ordered as the footer lists them.
 */
export const STATIC_PAGES: Record<
  StaticPageContent['slug'],
  StaticPageContent
> = {
  about: ABOUT,
  contact: CONTACT,
  privacy: PRIVACY,
  terms: TERMS,
};
