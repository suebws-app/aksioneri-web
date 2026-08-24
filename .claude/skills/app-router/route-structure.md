---
name: route-structure
description: Use this skill when adding a route, working with route groups, or handling async params and searchParams in Next.js 16
type: skill
---

# Route Structure (Next.js 16)

## When to Use

- Adding any page
- Deciding which route group a page belongs in
- A page unexpectedly renders dynamically instead of statically

## Core Principles

- Every user-facing route lives under `src/app/[locale]/`. Only non-localised
  endpoints (better-auth, metadata routes) sit outside it.
- Route groups `(...)` organise files and share layouts without appearing in the
  URL. `(public)/(marketing)/page.tsx` serves `/`.
- **`params` and `searchParams` are Promises in Next.js 16.** Await them in
  server components; `use()` them in client components.
- **`cookies()` and `headers()` are async** too.
- Call `setRequestLocale(locale)` in every page and layout. Without it the route
  opts out of static rendering entirely.

## The groups

| Group                  | Contains                         | Auth     | Indexed        |
| ---------------------- | -------------------------------- | -------- | -------------- |
| `(public)/(marketing)` | Landing, pricing, about, legal   | No       | Yes            |
| `(public)/(auth)`      | sign-in, sign-up, reset-password | No       | No (`noIndex`) |
| `(private)`            | Dashboard, account, settings     | Required | No (`noIndex`) |

Adding a `(private)` route means adding its prefix to `PROTECTED_PREFIXES` in
`src/proxy.ts` **and** to `PRIVATE_PATHS` in `src/app/robots.ts`. Miss the
second and the page is crawled.

## Code Templates

### A page

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auctions' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/auctions',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);   // required for static rendering
  return <AuctionsPage />;
}
```

### A dynamic segment

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const auction = await getAuction(slug);
  if (!auction) notFound();   // renders the nearest not-found.tsx as a real 404

  return <AuctionDetailPage auction={auction} />;
}
```

### In a client component

```typescript
'use client';
import { use } from 'react';

export function Client({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // ...
}
```

### Static vs dynamic

A route goes dynamic the moment it touches request data — `cookies()`,
`headers()`, `searchParams`, or an uncached `fetch`. That is correct for a
dashboard and wasteful for a marketing page. If a public page renders as `ƒ` in
the build output, something in its tree read request state.

`useSearchParams` in a client component needs a `<Suspense>` boundary, or the
whole route opts out of static rendering — see the sign-in page for the pattern.

## Anti-Patterns

| Don't                                  | Do                                            |
| -------------------------------------- | --------------------------------------------- |
| `const { locale } = params`            | `await params`                                |
| `const cookieStore = cookies()`        | `await cookies()`                             |
| Omitting `setRequestLocale`            | Call it in every page and layout              |
| A route outside `[locale]`             | Only metadata and auth endpoints belong there |
| Private route missing from `robots.ts` | Add to both proxy and robots                  |
| `redirect()` from `next/navigation`    | `redirect` from `@/i18n/navigation`           |
| Returning `null` for a missing entity  | `notFound()`                                  |
