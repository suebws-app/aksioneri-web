import { clientEnv } from '@/lib/utils/env.client';
import type { StaticPageContent } from '../siteTypes';

const CONTACT_EMAIL = clientEnv.NEXT_PUBLIC_CONTACT_EMAIL;

const PRIVACY_UPDATED_AT = '2026-08-27';
const TERMS_UPDATED_AT = '2026-08-25';

const ABOUT: StaticPageContent = {
  slug: 'about',
  title: 'About us',
  intro:
    'Aksioneri explains financial markets in Albanian — plainly, without jargon, and without assuming you already know things nobody ever explained to you.',
  sections: [
    {
      heading: 'Why it exists',
      paragraphs: [
        'Financial information in Albanian is either missing, badly translated, or written for people who already understand the subject. Anyone starting from zero is left with terms nobody explains: core inflation, yield curve, price-to-earnings ratio.',
        'This site was built for that reader. Every number here comes with a sentence saying what it means, and every term has a definition one line away from the text where you meet it.',
      ],
    },
    {
      heading: 'What you will find here',
      paragraphs: [
        'Markets tracks the major indices, commodities and currencies, with the day’s move and an explanation of what drives each one.',
        'News gathers what is happening in the markets today, summarised briefly. The Calendar shows the economic figures ahead, what is expected and why they matter.',
        'The Learning Centre has short lessons and a glossary of terms — the part of the site that never goes out of date.',
      ],
    },
    {
      heading: 'How we handle the news',
      paragraphs: [
        'News comes from the public feeds of financial publishers. We summarise and translate it, while the full text remains the publisher’s — which is why every story links to the original source.',
        'Translation is done with automated tools and reviewed where it matters. If you spot a translation that looks wrong, write to us.',
      ],
    },
    {
      heading: 'What we are not',
      paragraphs: [
        'We are not a broker, we do not sell financial products, and we take no commission from anything you might invest in.',
        'Nothing on this site is investment advice. We explain how things work; the decision about what to do with your money is yours, and it is worth talking it through with someone licensed.',
      ],
    },
  ],
};

const CONTACT: StaticPageContent = {
  slug: 'contact',
  title: 'Contact',
  intro:
    'One address, for everything: mistakes in the content, questions about your data, or partnerships.',
  email: CONTACT_EMAIL,
  sections: [
    {
      heading: 'Write to us',
      paragraphs: ['We usually reply within a few working days.'],
    },
    {
      heading: 'What people write to us about most often',
      paragraphs: [
        'Mistakes in the content — a figure that does not hold up, an unclear definition, or a translation that sounds off. These help us most, and we fix them quickly.',
        'Your data — any request under the privacy section goes to the same address.',
        'Publishers — if you are the source of a story and want us to change or remove the way we present it, let us know.',
      ],
    },
    {
      heading: 'What we cannot tell you',
      paragraphs: [
        'We do not give investment advice and do not comment on whether you should buy or sell anything. We are not licensed for that, and anyone who gives you that advice without knowing your circumstances should be listened to with caution.',
      ],
    },
  ],
};

const PRIVACY: StaticPageContent = {
  slug: 'privacy',
  title: 'Privacy',
  intro:
    'The site requires no registration and keeps no data that identifies you as a person. This page explains exactly what is recorded when you read it, where it is stored, how you can change your consent and how you can delete it.',
  updatedAt: PRIVACY_UPDATED_AT,
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        `The data controller for this site is Aksioneri, represented at ${CONTACT_EMAIL}. For any question about privacy or your rights, that is the address to write to.`,
        'The only basis on which we use measurement tools is your consent. Without your consent, no measurement tool is loaded.',
      ],
    },
    {
      heading: 'No accounts and no profiles',
      paragraphs: [
        'We do not ask for a name, an email or a phone number. You cannot register, so we hold no profile on you and have nothing to sell to anyone.',
      ],
    },
    {
      heading: 'Lesson progress stays on your device',
      paragraphs: [
        'When you mark a lesson as read, that is stored in your own browser (localStorage), not with us. We do not see it and do not receive it.',
        'That is why progress does not carry over from your phone to your computer, and disappears if you clear your browser. You can delete it at any time with the “Clear progress” button in the Learning Centre.',
      ],
    },
    {
      heading: 'What is recorded on the server',
      paragraphs: [
        'Like any website, our server and our hosting provider’s may keep technical request data — the IP address, the time and the browser type — for security and for finding defects. These are not linked to you as a person and are not used for profiling.',
        'We count how many times a story is opened, as an aggregate figure for the “Most read” list. That count holds nothing that identifies you.',
      ],
    },
    {
      heading: 'Cookies and measurement tools',
      paragraphs: [
        'When you first visit the site, we ask whether you accept cookies for measurement. Your consent is stored only in your browser and is not shared with anyone else.',
        'If you accept, two third-party tools are loaded that help us keep the site working well. If you decline, neither of them is loaded at all.',
        'PostHog shows us anonymously how many readers visit, which pages are opened most and where people get stuck. It creates a random identifier on your device to measure the course of a visit, but holds no name, no email, and no data that identifies you as a person. Data is kept for 12 months, after which it is aggregated and individual streams are deleted.',
        'Sentry captures technical errors when something breaks on the site. It keeps only the details needed to reconstruct the defect (which URL, which browser, what the click did), not what you read or type. It is not used for advertising and records no video. Data is kept for up to 90 days.',
        'Both of these services process data on their servers in the United States (the default region). That means your acceptance of cookies also covers some technical data crossing the border. Both providers have independent privacy policies and data-processing agreements with us.',
        'For the financial calculators we keep a simple counter: how many times each calculator was opened, used or shared on a given day. No cookie is stored, no identifier, no IP address and — above all — none of the figures you type. Your salary, loan and savings never leave your browser.',
        'News images load directly from the publishers’ servers, so they see your browser’s request when you open a story. The same applies when you follow a link off the site.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'For any personal data we may process, you have the following rights:',
      ],
      list: [
        'To receive confirmation of whether we process data relating to you, and a copy of it.',
        'To request the correction of any inaccurate or incomplete data.',
        'To request the deletion of your data.',
        'To restrict or temporarily block its use.',
        'To receive the data in a structured, machine-readable format.',
        'To object to the processing at any time.',
        'To withdraw your consent as easily as you gave it — use the “Manage cookies” button at the bottom of the page.',
      ],
      paragraphsAfterList: [
        `To exercise any of these rights, write to us at ${CONTACT_EMAIL}. We reply within thirty (30) days.`,
        'If you believe your data is being processed wrongly, you also have the right to lodge a complaint with the data protection authority in your jurisdiction — before or instead of contacting us.',
        'If we change any practice — for example if advertising or accounts are ever added — this page is updated before the change takes effect, and the date at the top shows when.',
      ],
    },
  ],
};

const TERMS: StaticPageContent = {
  slug: 'terms',
  title: 'Terms of use',
  intro:
    'What you can expect from this site and what you cannot. Briefly, and without convoluted language.',
  updatedAt: TERMS_UPDATED_AT,
  sections: [
    {
      heading: 'The content is educational',
      paragraphs: [
        'Everything here is provided for educational and informational purposes. It is not investment, financial, tax or legal advice, and it does not take your specific situation into account.',
        'The decisions you make with your money are entirely your own. For personalised advice, turn to someone licensed.',
      ],
    },
    {
      heading: 'Market data',
      paragraphs: [
        'Prices, indices and economic figures come from third parties. They can be delayed, imperfect or temporarily missing, and we do not guarantee their accuracy.',
        'Do not use them as the sole source for a decision where the exact figure matters. For trading, the official source is your platform, not this site.',
      ],
    },
    {
      heading: 'News and copyright',
      paragraphs: [
        'The news consists of summaries and translations of publishers’ material, always accompanied by a link to the source. Copyright in the original text belongs to them.',
        'The lessons, the glossary and the explanations are our own work. You may read them, share them and quote from them with attribution; full republication requires permission.',
      ],
    },
    {
      heading: 'No warranty and limitation of liability',
      paragraphs: [
        'The site is provided as is. We do not guarantee that it will always be accessible, error-free or up to date at every moment.',
        'To the extent the law allows, we accept no liability for losses arising from the use of the site or from reliance on its content.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'These terms may change. The update date sits at the top of the page, and continued use after a change means you accept it.',
        `For any question about these terms, write to us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const STATIC_PAGES_EN: Record<
  StaticPageContent['slug'],
  StaticPageContent
> = {
  about: ABOUT,
  contact: CONTACT,
  privacy: PRIVACY,
  terms: TERMS,
};
