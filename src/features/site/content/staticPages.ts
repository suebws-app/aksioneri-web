import { clientEnv } from '@/lib/utils/env.client';
import type { StaticPageContent } from '../siteTypes';

export const CONTACT_EMAIL = clientEnv.NEXT_PUBLIC_CONTACT_EMAIL;

const PRIVACY_UPDATED_AT = '2026-08-27';
const TERMS_UPDATED_AT = '2026-08-25';

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
        'Qendra e Mësimit ka mësime të shkurtra dhe një fjalorth me terma — pjesa e faqes që nuk vjetrohet.',
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
    'Faqja nuk kërkon regjistrim dhe nuk mban të dhëna që ju identifikojnë si person. Këtu shpjegohet saktësisht çka regjistrohet kur e lexoni, ku ruhet, si mund ta ndryshoni pëlqimin tuaj dhe si mund ta fshini.',
  updatedAt: PRIVACY_UPDATED_AT,
  sections: [
    {
      heading: 'Kush jemi ne',
      paragraphs: [
        `Kontrolluesi i të dhënave për këtë faqe është Aksioneri, i përfaqësuar te ${CONTACT_EMAIL}. Për çdo pyetje rreth privatësisë ose të drejtave tuaja, kjo është adresa te e cila duhet të shkruani.`,
        'Baza e vetme mbi të cilën përdorim mjete matje është pëlqimi juaj. Pa pëlqimin tuaj, asnjë mjet matje nuk ngarkohet.',
      ],
    },
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
      heading: 'Cookies dhe mjete matje',
      paragraphs: [
        'Kur hyni në faqe për herë të parë, ju pyesim nëse pranoni cookies për matje. Pëlqimi juaj ruhet vetëm në shfletuesin tuaj dhe nuk ndahet me askënd tjetër.',
        'Nëse pranoni, ngarkohen dy mjete të palëve të treta që na ndihmojnë ta mbajmë faqen të mirë. Nëse refuzoni, asnjëra prej tyre nuk ngarkohet fare.',
        'PostHog na tregon anonimisht sa lexues vijnë, cilat faqe hapen më shumë dhe ku ngecin njerëzit. Krijon një identifikues të rastësishëm në pajisjen tuaj për të matur ecurinë e vizitës, por nuk mban emrin, e-mailin, as ndonjë të dhënë që ju identifikon si person. Të dhënat ruhen për 12 muaj, pas së cilës agregohen dhe rrjedhat individuale fshihen.',
        'Sentry kap gabimet teknike kur diçka thyhet në faqe. Mban vetëm detajet e nevojshme për të rindërtuar defektin (cili URL, cili shfletues, si veproi klikimi), jo çka lexoni ose shkruani. Nuk përdoret për reklama dhe nuk merr regjistrim video. Të dhënat ruhen deri në 90 ditë.',
        'Të dy këto shërbime i përpunojnë të dhënat në serverët e tyre në Shtetet e Bashkuara (rajoni i paracaktuar). Kjo do të thotë se pranimi juaj i cookies përfshin edhe pëlqimin që një pjesë e të dhënave teknike të kalojnë jashtë kufirit. Të dy ofruesit kanë politika të pavarura të privatësisë dhe kontrata të përpunimit të të dhënave me ne.',
        'Te llogaritësit financiarë mbajmë një numërues të thjeshtë: sa herë është hapur, përdorur ose ndarë secili llogaritës në një ditë të caktuar. Nuk ruhet asnjë cookie, asnjë identifikues, asnjë adresë IP dhe — mbi të gjitha — asnjë shifër që e shkruani ju. Paga, kredia dhe kursimet tuaja nuk dalin kurrë nga shfletuesi juaj.',
        'Fotografitë e lajmeve ngarkohen drejtpërdrejt nga serverët e publikuesve, prandaj ata e shohin kërkesën e shfletuesit tuaj kur hapni një lajm. E njëjta vlen kur ndiqni një lidhje jashtë faqes.',
      ],
    },
    {
      heading: 'Të drejtat tuaja',
      paragraphs: [
        'Për çdo të dhënë personale që ne mund të përpunojmë, keni të drejtat e mëposhtme:',
      ],
      list: [
        'Të merrni një konfirmim nëse përpunojmë të dhëna që lidhen me ju, dhe një kopje të tyre.',
        'Të kërkoni ndreqjen e çdo të dhëne të pasaktë ose të paplotë.',
        'Të kërkoni fshirjen e të dhënave tuaja.',
        'Të kufizoni ose të bllokoni përkohësisht përdorimin e tyre.',
        'Të merrni të dhënat në një format të strukturuar dhe të lexueshëm nga makinat.',
        'Të kundërshtoni përpunimin në çdo kohë.',
        'Të tërhiqni pëlqimin tuaj po aq lehtë sa e keni dhënë — përdorni butonin „Menaxho cookies" në fund të faqes.',
      ],
      paragraphsAfterList: [
        `Për të ushtruar cilëndo prej këtyre të drejtave, na shkruani te ${CONTACT_EMAIL}. Përgjigjemi brenda tridhjetë (30) ditëve.`,
        'Nëse mendoni se të dhënat tuaja po përpunohen në mënyrë të gabuar, keni gjithashtu të drejtën të paraqisni ankesë pranë autoritetit të mbrojtjes së të dhënave në juridiksionin tuaj — përpara ose në vend të kontaktimit me ne.',
        'Nëse ndryshojmë ndonjë praktikë — për shembull nëse një ditë shtohen reklamat ose llogaritë — kjo faqe përditësohet para se ndryshimi të hyjë në fuqi, dhe data lart e tregon se kur.',
      ],
    },
  ],
};

const TERMS: StaticPageContent = {
  slug: 'terms',
  title: 'Kushtet e përdorimit',
  intro:
    'Çka mund të pritni nga kjo faqe dhe çka jo. Shkurt, dhe pa gjuhë të koklavitur.',
  updatedAt: TERMS_UPDATED_AT,
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

export const STATIC_PAGES: Record<
  StaticPageContent['slug'],
  StaticPageContent
> = {
  about: ABOUT,
  contact: CONTACT,
  privacy: PRIVACY,
  terms: TERMS,
};
