<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# aksioneri-web

You are a senior frontend engineer. Produce production-ready code and review it
with the same rigour.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS v4 (`@theme` in globals.css — there is no tailwind.config.ts)
- next-intl v4 (`sq` default + `en`)
- TanStack Query v5
- Zustand v5
- React Hook Form + Zod
- better-auth (runs HERE, against the API's database)
- pnpm (npm and yarn are blocked by `only-allow`)

## Skills — read before writing code

Skills live in `.claude/skills/`. **Read `.claude/skills/INDEX.md` first**, then
open the skill matching your task and follow it. They document this repo's real
patterns and the Next.js 16 breaking changes; writing from general Next.js
knowledge produces code that fails lint or silently breaks i18n and SEO.

| If your task involves…                   | Read                                  |
| ---------------------------------------- | ------------------------------------- |
| Where a file goes                        | `project-bootstrap/project-setup.md`  |
| An environment variable                  | `project-bootstrap/env-management.md` |
| Styling, tokens, variants                | `ui/tailwind-design-system.md`        |
| Building a component                     | `ui/component-conventions.md`         |
| Translations, navigation                 | `i18n/next-intl-setup.md`             |
| Any user-facing string                   | `i18n/no-hardcoded-text.md`           |
| Writing or translating any Albanian text | `i18n/kosovo-albanian-translation.md` |
| Adding a route                           | `app-router/route-structure.md`       |
| Layouts, providers, server/client split  | `app-router/layouts-and-providers.md` |
| Titles, canonicals, hreflang             | `seo/metadata.md`                     |
| JSON-LD, sitemap, robots, OG images      | `seo/structured-data.md`              |
| Sessions, sign-in, protecting a route    | `auth/better-auth-setup.md`           |
| Fetching from the API                    | `data-layer/data-layer.md`            |
| Global client state                      | `state/zustand-patterns.md`           |
| Forms and validation                     | `forms/react-hook-form-patterns.md`   |
| Types, strict-mode errors                | `typescript/typescript-patterns.md`   |
| Tests                                    | `testing/testing-patterns.md`         |
| Adding or changing a calculator          | `calculators/adding-a-calculator.md`  |

## Non-negotiable rules

1. **`next/link` and `next/navigation` are banned.** Use `@/i18n/navigation`, or
   the locale prefix is lost. Enforced by ESLint.
2. **No hardcoded user-facing strings** — labels, errors, `alt`, `aria-label`,
   `placeholder`, metadata. All translation keys, in every catalogue.
3. **`fetch` is called in exactly one place**: `src/lib/api/client.ts`.
   Components go through `lib/api/` then `lib/query/`.
4. **Server state lives in React Query**, never `useState` and never Zustand.
5. **Every page calls `buildMetadata`** from `@/lib/seo/metadata`. No hand-written
   `Metadata` objects, no hardcoded URLs.
6. **Private routes need three edits**: `PROTECTED_PREFIXES` in `proxy.ts`, a
   real `getCurrentUser()` check in the page or layout, and `PRIVATE_PATHS` in
   `robots.ts` plus `noIndex: true`.
7. **`process.env` only in `env.server.ts` / `env.client.ts`.**
8. **Server components by default.** `'use client'` goes on the interactive leaf,
   not the page.
9. **Shared components never import features** — enforced by ESLint.
10. **No comments.** Do not add `//`, `/* */`, JSX `{/* */}`, or JSDoc/TSDoc to
    source files. Well-named identifiers and clear code are the documentation;
    the git history carries the "why". This applies to new files and to any
    file you edit — don't reintroduce comments a previous pass removed.

## Next.js 16 breaking changes

- `proxy.ts` replaces `middleware.ts`, and runs on Node.js.
- `params` and `searchParams` are Promises — `await` them.
- `cookies()` and `headers()` are async.
- `fetch()` is not cached by default.
- `next lint` is gone; run `pnpm lint:check`.
- Tailwind v4 uses `@theme`, not a config file.

## Shared database with aksioneri-api

better-auth runs here and writes `users`, `session`, `account`, `verification`
and `rate_limit` to the same PostgreSQL database the API reads.
`AUTH_COOKIE_SECRET` and `DATABASE_URL` must be identical in both `.env` files.
Full explanation: `.claude/skills/auth/better-auth-setup.md`.

## Commands

```bash
pnpm dev                # http://localhost:3000
pnpm ts-check           # tsc --noEmit
pnpm lint:check         # eslint, including the layering rules
pnpm i18n:check         # translation catalogues in sync
pnpm seo:audit-meta     # title and description lengths
pnpm test               # Vitest
pnpm test:e2e           # Playwright (needs the app and API running)
pnpm build
```

Before claiming work is done:
`pnpm ts-check && pnpm lint:check && pnpm i18n:check && pnpm seo:audit-meta && pnpm test`.
