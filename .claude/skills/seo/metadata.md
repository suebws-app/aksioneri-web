---
name: metadata
description: Use this skill when adding page metadata, titles, descriptions, canonical URLs, hreflang alternates, or Open Graph tags
type: skill
---

# Metadata and SEO

## When to Use

- Adding any page (every page needs metadata)
- Changing a title or description
- A page appears twice in search results, or the wrong locale ranks

## Core Principles

- **Every page calls `buildMetadata` from `@/lib/seo/metadata`.** It produces the
  canonical, the hreflang set, Open Graph and the Twitter card from one input.
  Because it is one function, a sitewide SEO fix is a one-file change.
- **Never hardcode a URL.** Everything derives from `@/lib/seo/urls`, whose only
  input is `NEXT_PUBLIC_APP_URL`.
- **`title` is set bare**; the locale layout's template appends `| Aksioneri`.
  Writing the site name into a page title double-appends it.
- **Private and auth pages pass `noIndex: true`** and are listed in
  `robots.ts`. Both, not either.
- Lengths: title ≤ 60 characters, description 70–160. Enforced by
  `pnpm seo:audit-meta`, which runs in CI.

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
    path: '/auctions', // unlocalised; the locale prefix is added inside
    locale,
  });
}
```

### A dynamic page

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const auction = await getAuction(slug);

  // A missing entity must not produce a metadata error — the page will 404.
  if (!auction)
    return buildMetadata({
      title: 'Not found',
      description: '',
      path: `/auctions/${slug}`,
      locale,
      noIndex: true,
    });

  return buildMetadata({
    title: auction.title,
    description: auction.summary,
    path: `/auctions/${slug}`,
    locale,
    image: auction.coverUrl,
  });
}
```

## Why hreflang matters here

The site serves the same page at `/pricing` (Albanian) and `/en/pricing`
(English). Without hreflang, search engines treat those as duplicates and pick
one — often the wrong one for the reader. `buildLanguageAlternates` emits every
locale plus `x-default`, and the sitemap repeats the same pairings.

Two rules keep it correct:

1. Alternates must be **reciprocal** — every locale points at all the others.
   `buildMetadata` guarantees this as long as `path` is the unlocalised path.
2. A URL listed as an alternate must **exist and return 200**. Passing a path
   that only exists in one locale creates soft-404s in Search Console.

## Writing titles and descriptions

- Put the distinguishing word first: `Ankande online në Shqipëri`, not
  `Aksioneri — the best place to find ankande online`.
- One `<h1>` per page, and it should echo the title without duplicating it word
  for word.
- The description is ad copy, not a keyword list — it is what a searcher reads
  before deciding to click.
- Translate genuinely. A machine-translated Albanian description reads as spam
  to a native speaker and to the ranking model.

## Anti-Patterns

| Don't                                       | Do                                              |
| ------------------------------------------- | ----------------------------------------------- |
| A hand-written `Metadata` object            | `buildMetadata(...)`                            |
| `title: 'Pricing                            | Aksioneri'`                                     | `title: 'Pricing'` (the template appends) |
| `canonical: 'https://aksioneri.al/pricing'` | Derived from `path` + `locale`                  |
| A private page without `noIndex`            | `noIndex: true` **and** an entry in `robots.ts` |
| The same description on every page          | One per page, specific to it                    |
| Two `<h1>` elements                         | Exactly one                                     |
| Passing an already-localised `path`         | Pass `/pricing`, not `/en/pricing`              |
