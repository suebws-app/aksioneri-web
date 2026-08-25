# Skills Index — aksioneri-web

Reusable patterns for the Aksioneri web app — Next.js 16 (App Router), React 19,
TypeScript strict, Tailwind CSS v4, next-intl v4, TanStack Query v5, better-auth.

**Read the matching skill before writing code in that area.** Each one contains
this repo's actual patterns, not generic Next.js advice.

## Quick Reference

| Skill                                                              | When to Use                                              |
| ------------------------------------------------------------------ | -------------------------------------------------------- |
| [project-setup](project-bootstrap/project-setup.md)                | Where a file goes, path aliases, directory map           |
| [env-management](project-bootstrap/env-management.md)              | Environment variables, server/client split               |
| [tailwind-design-system](ui/tailwind-design-system.md)             | Tokens via `@theme`, `cn()`, `cva` variants              |
| [component-conventions](ui/component-conventions.md)               | Component folders, server/client split, props            |
| [next-intl-setup](i18n/next-intl-setup.md)                         | Locales, navigation helpers, translations                |
| [no-hardcoded-text](i18n/no-hardcoded-text.md)                     | Every user-facing string is a translation key            |
| [kosovo-albanian-translation](i18n/kosovo-albanian-translation.md) | Writing any Albanian text — `sq` means Kosovar, not Tosk |
| [route-structure](app-router/route-structure.md)                   | Route groups, async params, dynamic vs static            |
| [layouts-and-providers](app-router/layouts-and-providers.md)       | Layout composition, providers, server/client boundary    |
| [metadata](seo/metadata.md)                                        | Titles, canonicals, hreflang, Open Graph                 |
| [structured-data](seo/structured-data.md)                          | JSON-LD, sitemap, robots, OG images                      |
| [better-auth-setup](auth/better-auth-setup.md)                     | Sessions, sign-in/up, route protection                   |
| [data-layer](data-layer/data-layer.md)                             | Calling the API, React Query, mutations                  |
| [zustand-patterns](state/zustand-patterns.md)                      | When a client store is justified                         |
| [react-hook-form-patterns](forms/react-hook-form-patterns.md)      | Forms, Zod, localised errors                             |
| [typescript-patterns](typescript/typescript-patterns.md)           | Types, strict-mode idioms                                |
| [testing-patterns](testing/testing-patterns.md)                    | Vitest, Testing Library, Playwright                      |

## Next.js 16 — differences from what you probably remember

- **`proxy.ts` replaces `middleware.ts`**, and runs on Node.js, not Edge.
- **`params` and `searchParams` are Promises.** `await` them in server
  components, `use()` them in client components.
- **`cookies()` and `headers()` are async.** Await them.
- **`fetch()` is not cached by default.** Opt in with `cache: 'force-cache'`.
- **Turbopack is the default bundler.**
- **`next lint` is gone.** Run the ESLint CLI directly (`pnpm lint:check`).
- **Tailwind v4 has no `tailwind.config.ts`.** Tokens are declared with
  `@theme` inside `globals.css`.

## Non-obvious facts about this codebase

- **better-auth runs here, not in the API.** It writes to the same PostgreSQL
  database `aksioneri-api` reads. `AUTH_COOKIE_SECRET` must be identical in both.
- **`next/link` and `next/navigation` are banned** by ESLint. Use
  `@/i18n/navigation`, or the locale prefix gets dropped.
- **Albanian (`sq`) is the default locale** and is served unprefixed.
- **Layering is enforced by ESLint** (`eslint-plugin-boundaries`): a shared
  component may not import a feature.
- **`pnpm i18n:check` and `pnpm seo:audit-meta` run in CI** and fail on drifted
  translations or over-length metadata.

## Dependency Map

```
project-setup ─── env-management
     │
     ├── tailwind-design-system ─── component-conventions
     │
     ├── route-structure ─── layouts-and-providers ─── better-auth-setup
     │         │                                            │
     │    next-intl-setup ─── no-hardcoded-text              │
     │         │                                            │
     │    metadata ─── structured-data                       │
     │                                                      │
     └── data-layer ───────────────────────────────────────┘
               │
          react-hook-form-patterns ─── zustand-patterns

typescript-patterns and testing-patterns apply throughout.
```
