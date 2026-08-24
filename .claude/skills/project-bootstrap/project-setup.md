---
name: project-setup
description: Use this skill when deciding where a new file belongs, or when unsure whether something is a component, a feature, or a lib module
type: skill
---

# Project Setup

## When to Use

- Creating any new file and unsure which directory it belongs in
- Wondering whether a piece of UI is a "component" or a "feature"
- Adding a shared helper

## Directory Map

```
src/
  app/                        routes only — thin wrappers around features
    [locale]/
      (public)/(auth)/        sign-in, sign-up, reset-password
      (public)/(marketing)/   landing, pricing, about, legal
      (private)/              authenticated app
      layout.tsx              owns <html>/<body>, providers, JSON-LD
    api/auth/[...all]/        better-auth handler (not localised)
    sitemap.ts robots.ts opengraph-image.tsx not-found.tsx global-error.tsx
  components/<Component>/     shared, presentational, reusable anywhere
  features/<feature>/         one product area; owns its pages and state
  i18n/                       locale config, routing, navigation helpers
  lib/api/                    the ONLY place fetch() is called
  lib/query/                  React Query keys and hooks
  lib/auth/                   better-auth server config, client, session reads
  lib/seo/                    urls, metadata builder, JSON-LD
  lib/utils/                  env, cn, csp
  proxy.ts                    locale negotiation + auth gate + security headers
messages/                     sq.json, en.json
scripts/                      CI audits (translations, SEO metadata)
```

## Core Principles

- **`app/` holds routes, not implementation.** A page file resolves params, sets
  the request locale, builds metadata, and renders a feature component. Real
  markup and logic live in `features/`.
- **`components/` vs `features/`**: a component is reusable and knows nothing
  about the product (`Button`, `Modal`, `DataTable`). A feature is one product
  area and may know everything about it (`auth`, `auctions`).
- **Components must not import features** — enforced by ESLint. If a shared
  component needs feature data, pass it in as props.
- Import with the `@/*` alias. Relative paths are fine only inside one folder.

## Code Templates

### A route delegating to a feature

```typescript
// src/app/[locale]/(public)/(auth)/sign-in/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  return buildMetadata({ title: t('signIn.metaTitle'), /* ... */ });
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SignInPage />;
}
```

### A feature folder

```
src/features/auctions/
  AuctionsPage.tsx          top-level component the route renders
  components/               pieces used only by this feature
  useAuctionsStore.ts       Zustand store, only if genuinely needed
  auctionsSchema.ts         Zod schemas for this feature's forms
  index.ts                  barrel — the feature's public surface
```

Other code imports `@/features/auctions`, never a file inside it. The barrel is
what keeps a feature's internals changeable.

### A shared component folder

```
src/components/Button/
  Button.tsx
  index.ts
  types.ts      only if the props type is shared
```

## Anti-Patterns

| Don't                                          | Do                                            |
| ---------------------------------------------- | --------------------------------------------- |
| Markup and data fetching in `app/**/page.tsx`  | Delegate to a feature component               |
| `components/AuctionBidForm.tsx`                | It belongs in `features/auctions/components/` |
| Importing `@/features/auctions/components/Row` | Import from the feature barrel                |
| A shared component importing a feature         | Pass data in via props                        |
| `../../../lib/utils/cn`                        | `@/lib/utils/cn`                              |
| A `utils/` dump file                           | Name the module for what it does              |
