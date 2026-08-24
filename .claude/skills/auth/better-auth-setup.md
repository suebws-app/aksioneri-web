---
name: better-auth-setup
description: Use this skill when working on sign-in, sign-up, sessions, protecting a route, or reading the current user
type: skill
---

# better-auth Setup

## When to Use

- Building or changing an auth screen
- Protecting a route
- Reading the current user, server-side or client-side
- Debugging a 401 from the API

## The topology (read this first)

**better-auth runs here, in Next.js — not in the API.** It owns sign-up,
sign-in, verification, and the `users` / `session` / `account` / `verification`
tables, writing them to the **same PostgreSQL database `aksioneri-api` reads**.

```
browser ──cookie──> Next.js (better-auth)  ──writes──> ┐
                                                       ├─ same Postgres
browser ──cookie──> NestJS  (AuthGuard)    ──reads───> ┘
```

Consequences:

- `AUTH_COOKIE_SECRET` must be **byte-identical** in both repos. better-auth
  signs the cookie; the API verifies that HMAC. A mismatch means every API call
  401s with `Invalid session signature`.
- The `fields` maps in `src/lib/auth/better-auth.ts` translate better-auth's
  camelCase model fields onto the snake_case columns declared in
  `aksioneri-api/src/database/schema`. Changing a column means changing the map
  in the same commit — the mismatch shows up at runtime, not at build time.
- The `session.create` database hook generates `csrf_token`. The column is
  `NOT NULL` and the API compares it against the `X-CSRF-Token` header on every
  write, so removing that hook breaks sign-in and all mutations.

## Core Principles

- **Two-layer protection.** `proxy.ts` reads the cookie and redirects — fast,
  and proves nothing. The page or layout then does the real session lookup.
  Both are required.
- Server: `getServerSession()` / `getCurrentUser()` from `@/lib/auth/server-session`
  (wrapped in `cache()`, so several components share one lookup).
- Client: `useSession()` from `@/lib/auth/client`.
- Never read the session cookie by hand.

## Code Templates

### Server

```typescript
const user = await getCurrentUser();
if (!user) redirect({ href: '/sign-in', locale });
```

### Client

```typescript
'use client';
const { data: session, isPending } = useSession();

if (isPending) return <HeaderSkeleton />;
return session ? <UserMenu user={session.user} /> : <SignInLink />;
```

### Sign in

```typescript
const { error } = await signIn.email({ email, password });

if (error) {
  // Deliberately generic: naming which field was wrong tells an attacker
  // whether the address is registered.
  setFormError(t('errors.invalidCredentials'));
  return;
}
router.push(searchParams.get('callbackUrl') ?? '/dashboard');
```

### Protecting a new route

Three edits, one commit:

1. `PROTECTED_PREFIXES` in `src/proxy.ts`
2. A real `getCurrentUser()` check in the page or layout
3. `PRIVATE_PATHS` in `src/app/robots.ts`, plus `noIndex: true` in its metadata

## Debugging

| Symptom                                 | Cause                                                     |
| --------------------------------------- | --------------------------------------------------------- |
| API returns `Invalid session signature` | `AUTH_COOKIE_SECRET` differs between repos                |
| API returns `Missing session cookie`    | Request did not send credentials, or CORS origin is wrong |
| API returns `403 Missing CSRF token`    | A write without the `X-CSRF-Token` header                 |
| `column "x" does not exist` on sign-up  | better-auth field map and Drizzle schema disagree         |
| Signed in, still redirected to sign-in  | Cookie present but the session row expired or was deleted |

## Anti-Patterns

| Don't                                     | Do                                     |
| ----------------------------------------- | -------------------------------------- |
| Implementing sign-in against the API      | better-auth owns it, here              |
| Reading `document.cookie` for the session | `useSession()`                         |
| Trusting `proxy.ts` as the only check     | Verify server-side too                 |
| `"Wrong password"` as an error            | One generic credential message         |
| Changing a column without the field map   | Both, same commit                      |
| Removing the `session.create` hook        | It generates the required `csrf_token` |
