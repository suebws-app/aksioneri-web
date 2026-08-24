---
name: structured-data
description: Use this skill when adding JSON-LD structured data, sitemap entries, robots rules, or Open Graph images
type: skill
---

# Structured Data, Sitemap and Robots

## When to Use

- Adding a page type that should appear in the sitemap
- Adding a private route (it must be excluded from crawling)
- Wanting rich results — breadcrumbs, product cards, a search box

## Core Principles

- **JSON-LD only**, built by `@/lib/seo/schemas`. Microdata and RDFa are not used.
- `Organization` and `WebSite` are emitted once, in the locale layout. Page-level
  schemas (breadcrumbs, products) are added by the page.
- **Sitemap and robots must not contradict each other.** A URL listed in the
  sitemap and disallowed in robots.txt is reported as an error in Search Console.
- Robots rules are emitted for **every locale prefix**. With
  `localePrefix: 'as-needed'` the default locale is unprefixed (`/dashboard`)
  while others are not (`/en/dashboard`), so `robots.ts` emits both forms.

## Code Templates

### Page-level JSON-LD

```typescript
const schema = breadcrumbSchema(locale, [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.auctions'), path: '/auctions' },
  { name: auction.title, path: `/auctions/${auction.slug}` },
]);

return (
  <>
    <script
      type="application/ld+json"
      // Built from a schema helper — never interpolate user input here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    {/* ... */}
  </>
);
```

If a value can come from user input, it must be a plain string inside the object
being serialised — `JSON.stringify` escapes it. Never build the JSON by string
concatenation.

**Structured data must describe what is actually on the page.** Marking up a
price or a rating that a visitor cannot see is a spam violation and can get rich
results revoked sitewide.

### Adding to the sitemap

```typescript
// src/app/sitemap.ts
const PUBLIC_ROUTES = [
  { path: '/', priority: 1 },
  { path: '/auctions', priority: 0.9 },
];
```

Dynamic entries are appended by fetching from the API:

```typescript
const auctions = await getPublicAuctions();
const auctionEntries = auctions.flatMap((auction) =>
  locales.map((locale) => ({
    url: localizedAbsoluteUrl(locale, `/auctions/${auction.slug}`),
    lastModified: auction.updatedAt,
    alternates: {
      languages: buildLanguageAlternates(`/auctions/${auction.slug}`),
    },
  })),
);
```

Never list a URL that 404s or redirects.

### Adding a private route

Two files, same commit:

```typescript
// src/proxy.ts
const PROTECTED_PREFIXES = ['/dashboard', '/account', '/settings', '/billing'];

// src/app/robots.ts
const PRIVATE_PATHS = [..., '/billing'];
```

### Open Graph images

`src/app/opengraph-image.tsx` renders the default card with Satori, which
supports only a small CSS subset: flexbox, absolute positioning, plain text. No
grid, no external stylesheets, no remote fonts. Size is fixed at 1200×630 —
other ratios get cropped by every major platform.

Note that metadata routes are excluded from the `proxy.ts` matcher. Without that
exclusion next-intl rewrites `/opengraph-image` to `/sq/opengraph-image`, which
does not exist, and every social preview 404s.

## Anti-Patterns

| Don't                                     | Do                                   |
| ----------------------------------------- | ------------------------------------ |
| Hand-written JSON-LD in a page            | Use a builder from `lib/seo/schemas` |
| Marking up data not visible on the page   | Only describe what is rendered       |
| String-concatenating JSON-LD              | `JSON.stringify` an object           |
| A private route in the sitemap            | Sitemap is public URLs only          |
| Adding to `proxy.ts` but not `robots.ts`  | Both, same commit                    |
| A sitemap URL that redirects              | List the final URL                   |
| Remote fonts or images in the OG template | Everything inline                    |
