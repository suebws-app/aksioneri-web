---
name: next-intl-setup
description: Use this skill when adding a locale, using translations, navigating between pages, or formatting dates, numbers and currency
type: skill
---

# next-intl Setup

## When to Use

- Reading a translated string
- Linking or redirecting between pages
- Formatting a date, number, or price
- Adding a locale

## Core Principles

- Locales: **`sq` (default, unprefixed)** and `en` (prefixed, `/en/...`).
  `localePrefix: 'as-needed'` in `src/i18n/routing.ts`.
- **Navigation goes through `@/i18n/navigation`** — `Link`, `redirect`,
  `useRouter`, `usePathname`. The bare `next/link` and `next/navigation`
  equivalents are blocked by ESLint because they drop the locale prefix and send
  an English reader back to the Albanian page.
- `getTranslations` on the server, `useTranslations` in client components.
- Messages fall back to `sq`, so a missing `en` key renders Albanian rather than
  a raw key — invisible in the browser, which is why `pnpm i18n:check` runs in CI.
- Every page and layout calls `setRequestLocale(locale)`, or static rendering is
  silently disabled.

## Code Templates

### Server component

```typescript
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auctions');
  return <h1>{t('heading')}</h1>;
}
```

### Client component

```typescript
'use client';
import { useTranslations } from 'next-intl';

export function BidButton() {
  const t = useTranslations('auctions');
  return <button>{t('placeBid')}</button>;
}
```

### Navigation

```typescript
import { Link, useRouter, redirect } from '@/i18n/navigation';

<Link href="/auctions">{t('nav.auctions')}</Link>;

const router = useRouter();
router.push('/dashboard');           // locale preserved automatically

redirect({ href: '/sign-in', locale });   // server-side needs the locale
```

### Interpolation and plurals

```json
{
  "signedInAs": "Signed in as {email}",
  "bidCount": "{count, plural, =0 {No bids yet} one {# bid} other {# bids}}"
}
```

```typescript
t('signedInAs', { email: user.email });
t('bidCount', { count: auction.bidCount });
```

Never build a sentence by concatenating translated fragments — word order
differs between languages. One key, one complete sentence.

### Formatting

```typescript
const format = useFormatter();
format.dateTime(auction.endsAt, { dateStyle: 'medium', timeStyle: 'short' });
format.number(priceCents / 100, { style: 'currency', currency: 'EUR' });
```

`toLocaleDateString()` without an explicit locale uses the _server's_ locale,
which produces different output in development and production.

### Adding a locale

1. Add the code to `locales` in `src/i18n/config.ts` and to `openGraphLocales`.
2. Create `messages/<locale>.json`.
3. Run `pnpm i18n:check` — it lists every missing key.

hreflang, the sitemap, and `generateStaticParams` all read from `locales`, so
nothing else needs touching.

## Anti-Patterns

| Don't                          | Do                                         |
| ------------------------------ | ------------------------------------------ |
| `import Link from 'next/link'` | `import { Link } from '@/i18n/navigation'` |
| `router.push('/en/dashboard')` | `router.push('/dashboard')`                |
| `` `${t('hello')} ${name}` ``  | `t('hello', { name })`                     |
| `date.toLocaleDateString()`    | `useFormatter().dateTime(...)`             |
| Skipping `setRequestLocale`    | Call it in every page and layout           |
| Adding a key to `sq` only      | Add to every catalogue; CI enforces it     |
