---
name: component-conventions
description: Use this skill when creating a component, choosing between a server and client component, or typing props
type: skill
---

# Component Conventions

## When to Use

- Creating any component
- Deciding whether it needs `'use client'`
- Typing props

## Core Principles

- **Server component by default.** Add `'use client'` only for state, effects,
  browser APIs, or event handlers. Client components ship JavaScript; server
  components ship none.
- The `'use client'` boundary covers the whole imported subtree. Push it as deep
  as it will go: an interactive button inside a static page means the button is a
  client component, not the page.
- One component per file, named the same as the file, exported through
  `index.ts`.
- Props are typed with an exported `interface`, extending the DOM props when the
  component wraps an element.
- Shared components never import features (enforced by ESLint) and never fetch —
  data comes in as props.

## Structure

```
src/components/Button/
  Button.tsx
  index.ts
  types.ts      only when the props type is imported elsewhere
```

## Code Templates

### Server component (default)

```typescript
// No 'use client' — renders to HTML, ships no JavaScript.
export async function AuctionSummary({ auctionId }: { auctionId: string }) {
  const auction = await getAuction(auctionId);
  return <section>{auction.title}</section>;
}
```

### Client component, kept small

```typescript
'use client';

export function BidButton({ auctionId }: { auctionId: string }) {
  const t = useTranslations('auctions');
  const { mutate, isPending } = usePlaceBid(auctionId);

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      {isPending ? t('actions.bidding') : t('actions.placeBid')}
    </Button>
  );
}
```

The page stays a server component and renders `<BidButton />`. Only the button's
code reaches the browser.

### Wrapping a DOM element

```typescript
export interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  // Generated once per instance; used to tie the label and error to the input.
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn('rounded-md border px-3 py-2', className)}
        {...props}
      />
      {error ? (
        <span id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}
```

Spreading `...props` last lets a caller pass any native attribute; `className`
is pulled out first so `cn()` can merge rather than replace it.

### Composition over configuration

```typescript
// Configuration — every new case adds a prop, and they interact
<Card title="..." showFooter footerText="..." headerIcon={...} />

// Composition — no prop explosion
<Card>
  <Card.Header icon={<Icon />}>{title}</Card.Header>
  <Card.Body>{children}</Card.Body>
</Card>
```

## Anti-Patterns

| Don't                                  | Do                                 |
| -------------------------------------- | ---------------------------------- |
| `'use client'` at the top of a page    | Push it to the interactive leaf    |
| A shared component fetching data       | Pass data in as props              |
| `props: any`                           | An exported `interface`            |
| `<input>` with no associated `<label>` | `htmlFor` + `id`                   |
| Five booleans controlling layout       | Compose subcomponents              |
| Two components in one file             | One per file, barrel-exported      |
| A shared component importing a feature | Props, or move it into the feature |
