---
name: zustand-patterns
description: Use this skill when considering a global client store, or deciding between React Query, local state, and Zustand
type: skill
---

# Client State with Zustand

## When to Use

- A multi-step flow whose state several components share
- Genuinely global UI state (theme, sidebar, command palette)
- Before adding a store — this skill mostly argues you do not need one

## Choosing where state lives

| State                                 | Where                           |
| ------------------------------------- | ------------------------------- |
| Anything from the API                 | **React Query** — never a store |
| One component's UI state              | `useState`                      |
| Shared by a parent and its children   | Props, or `useState` lifted up  |
| A multi-step wizard's collected input | Zustand                         |
| Theme, sidebar open, command palette  | Zustand                         |
| Form field values                     | React Hook Form                 |

**Server data never goes in a store.** Copying a query result into Zustand
creates a second source of truth that goes stale, and gives up caching,
refetching, and invalidation.

Most "we need global state" turns out to be prop drilling through two levels,
which is fine, or server state, which belongs in React Query.

## Code Templates

### A feature store

```typescript
// src/features/sell/useSellWizardStore.ts
interface SellWizardState {
  step: number;
  draft: Partial<AuctionDraft>;
  setDraft: (values: Partial<AuctionDraft>) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

const initialState = { step: 0, draft: {} };

export const useSellWizardStore = create<SellWizardState>()((set) => ({
  ...initialState,
  setDraft: (values) =>
    set((state) => ({ draft: { ...state.draft, ...values } })),
  next: () => set((state) => ({ step: state.step + 1 })),
  back: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
  // Always provide reset: without it, abandoning the wizard and starting again
  // resumes with the previous draft.
  reset: () => set(initialState),
}));
```

### Selecting

```typescript
// Subscribes to `step` only — this component does not re-render when the draft
// changes.
const step = useSellWizardStore((state) => state.step);

// Subscribes to EVERY field. Avoid.
const store = useSellWizardStore();
```

Selecting an object literal creates a new reference on every render and
re-renders forever. Select primitives, or use `useShallow`:

```typescript
const { step, draft } = useSellWizardStore(
  useShallow((state) => ({ step: state.step, draft: state.draft })),
);
```

### Persistence

```typescript
export const useThemeStore = create<ThemeState>()(
  persist((set) => ({ theme: 'system', setTheme: (theme) => set({ theme }) }), {
    name: 'aksioneri-theme',
    // Persist only what should survive a reload. Never persist anything
    // derived from the session — it outlives sign-out.
    partialize: (state) => ({ theme: state.theme }),
  }),
);
```

Persisted state and server-rendered HTML disagree on first paint. Gate on
rehydration or accept the flash deliberately.

## Anti-Patterns

| Don't                                       | Do                         |
| ------------------------------------------- | -------------------------- |
| Auction list in a store                     | React Query                |
| `const store = useStore()`                  | Select the slice you need  |
| Selecting a new object without `useShallow` | Primitives or `useShallow` |
| A store for a two-level prop chain          | Pass props                 |
| No `reset` on a wizard store                | Always provide one         |
| Persisting user data                        | Persist preferences only   |
| A store for form fields                     | React Hook Form            |
