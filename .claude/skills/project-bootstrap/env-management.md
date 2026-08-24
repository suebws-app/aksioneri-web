---
name: env-management
description: Use this skill when adding or reading an environment variable, or when a secret risks reaching the browser bundle
type: skill
---

# Environment Management

## When to Use

- Adding any configuration value
- Reading configuration in a component, route, or server module
- A build fails with an environment validation error

## Core Principles

Two files, one hard rule between them:

- **`src/lib/utils/env.server.ts`** — secrets and server-only values. Starts with
  `import 'server-only'`, so referencing it from a client component is a **build
  error**. That import is the safety net; never remove it.
- **`src/lib/utils/env.client.ts`** — `NEXT_PUBLIC_*` values only. Everything
  here ships to the browser and is public. Never put a secret in it, even
  temporarily.

Both parse with Zod at module load, so a missing variable fails at boot with a
readable message rather than surfacing as `undefined` three layers down.

**`process.env` is not read anywhere else.**

## Code Templates

### Adding a server variable

```typescript
// src/lib/utils/env.server.ts
const serverEnvSchema = z.object({
  // ...
  RESEND_API_KEY: z.string().min(1),
  REQUIRE_EMAIL_VERIFICATION: z
    .enum(['true', 'false'])
    .default('false')
    // Everything in process.env is a string; transform to a real boolean.
    .transform((value) => value === 'true'),
});
```

### Adding a public variable

`NEXT_PUBLIC_*` values are inlined at build time by **static text
replacement**, so each one must appear as a full literal. A computed lookup
resolves to `undefined` in the bundle:

```typescript
// Correct — Next.js can see the literal and substitute it
const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

// Broken — nothing to substitute, undefined at runtime
const value = process.env[`NEXT_PUBLIC_${name}`];
```

### Reading

```typescript
import { serverEnv } from '@/lib/utils/env.server'; // server components, route handlers
import { clientEnv } from '@/lib/utils/env.client'; // anywhere, including client components
```

### Values shared with aksioneri-api

`AUTH_COOKIE_SECRET` must be byte-identical in both repos — better-auth signs
the session cookie here and the API verifies it. A mismatch means every API call
returns `401 Invalid session signature`, with nothing obvious in the logs.
`DATABASE_URL` points at the same database in both.

Adding a variable means updating `.env.example` in the same commit.

## Anti-Patterns

| Don't                                                | Do                                        |
| ---------------------------------------------------- | ----------------------------------------- |
| `process.env.FOO` in a component                     | Add it to a schema, import the object     |
| Removing `import 'server-only'` to fix a build error | Fix the import that pulled it client-side |
| A secret in `env.client.ts`                          | It belongs in `env.server.ts`             |
| `process.env[dynamicKey]` for a public value         | Full literal reference                    |
| `z.string()` for a boolean flag                      | `z.enum(['true','false']).transform(...)` |
| Adding a variable without `.env.example`             | Update both together                      |
