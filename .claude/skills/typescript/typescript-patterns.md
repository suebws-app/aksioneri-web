---
name: typescript-patterns
description: Use this skill when typing props, inferring types from schemas, or resolving a strict-mode compiler error
type: skill
---

# TypeScript Patterns

## When to Use

- Declaring a type or interface
- `noUncheckedIndexedAccess` reports a possibly-undefined value
- Tempted to write `any` or a type assertion

## Core Principles

- **Derive, never duplicate.** Form types come from Zod (`z.infer`), component
  props from the DOM types they wrap, variant props from `cva`.
- `strict` is on, plus `noUncheckedIndexedAccess`, `noImplicitOverride`,
  `noUnusedLocals`, `noUnusedParameters`.
- **`any` is a lint error.** Use `unknown` and narrow.
- `import type` for type-only imports — enforced by ESLint, and it keeps types
  out of the runtime bundle.

## Naming

| Kind                     | Convention         | Example         |
| ------------------------ | ------------------ | --------------- |
| Component props          | `<Component>Props` | `ButtonProps`   |
| Zod-inferred form values | `<Action>Values`   | `SignUpValues`  |
| API resource             | Plain noun         | `Auction`       |
| Union member set         | Plural noun        | `AuctionStatus` |
| Locale                   | From config        | `Locale`        |

## Code Templates

### Inference

```typescript
export type SignUpValues = z.infer<ReturnType<typeof signUpSchema>>;

export interface ButtonProps
  extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

export type Locale = (typeof locales)[number];
```

### `noUncheckedIndexedAccess`

Indexing an array or record yields `T | undefined`. That is the rule catching a
real bug, so handle the absence:

```typescript
// Fails to compile
const first = auctions[0];
return first.title;

// Correct
const first = auctions[0];
if (!first) return <EmptyState />;
return first.title;

// Or when absence is acceptable
return auctions.at(0)?.title ?? '';
```

### Async params in Next.js 16

```typescript
interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
```

### Narrowing `unknown`

```typescript
if (error instanceof ApiError && error.code === 'BID_TOO_LOW') {
  // error.details is Record<string, unknown> — narrow before use
  const minimum = error.details.minimumCents;
  if (typeof minimum === 'number') showMinimum(minimum);
}
```

### Discriminated unions over boolean flags

```typescript
type AuctionCardState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; auction: Auction };
```

The compiler now forces every branch to be handled, and `auction` is
unreachable while loading — by construction, not by discipline.

### `satisfies`

```typescript
const STATUS_LABEL_KEYS = {
  draft: 'auctions.status.draft',
  live: 'auctions.status.live',
} satisfies Record<AuctionStatus, string>;
```

Checks completeness without widening the values, so each stays a literal type.

## Anti-Patterns

| Don't                                              | Do                                    |
| -------------------------------------------------- | ------------------------------------- |
| `interface SignUpValues { ... }` beside the schema | `z.infer<...>`                        |
| `value as SomeType`                                | Narrow with a guard                   |
| `any`                                              | `unknown` + narrowing                 |
| `items[0]!.title`                                  | Check for `undefined`                 |
| `enum Status`                                      | Union of string literals              |
| `import { SomeType }`                              | `import type { SomeType }`            |
| `params: { locale: string }`                       | `params: Promise<{ locale: Locale }>` |
