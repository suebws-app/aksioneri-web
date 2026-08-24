---
name: no-hardcoded-text
description: Use this skill when writing any user-facing string — labels, errors, alt text, aria labels, placeholders, metadata
type: skill
---

# No Hardcoded Text

## When to Use

- Writing any string a person will read
- Adding a validation message
- Adding `alt`, `aria-label`, `placeholder`, or `title`

## The rule

**Every user-facing string is a translation key.** No exceptions for "temporary"
UI, error states, or strings that look untranslatable.

This includes the ones that are easy to forget:

- validation messages
- `alt` text and `aria-label`
- `placeholder` and `title` attributes
- toast and empty-state copy
- page metadata (title, description)
- button labels inside conditionals

Only these are exempt: `console` output, error messages thrown for developers,
`data-*` attributes, and CSS class names.

## Code Templates

### Component

```typescript
// Wrong
<button aria-label="Close dialog">Close</button>
<img src={url} alt="Auction cover" />

// Right
<button aria-label={t('actions.closeDialog')}>{t('actions.close')}</button>
<img src={url} alt={t('auction.coverAlt', { title: auction.title })} />
```

### Validation messages

Schemas take the translator as an argument so messages are localised. A schema
that hardcodes English shows English errors to an Albanian reader:

```typescript
export const signUpSchema = (t: Translate) =>
  z.object({
    email: z.email({ message: t('errors.email') }),
    password: z
      .string()
      .min(8, { message: t('errors.passwordLength', { min: 8 }) }),
  });

// in the component
const form = useForm({ resolver: zodResolver(signUpSchema(t)) });
```

### Server-side errors

Map API error codes to translation keys rather than displaying the API's message
— the API replies in one language and knows nothing about the reader's locale:

```typescript
catch (error) {
  if (error instanceof ApiError) {
    setFormError(t(`errors.${error.code.toLowerCase()}`));
  }
}
```

## Key naming

Namespace by feature, then by role:

```json
{
  "auctions": {
    "metaTitle": "...",
    "metaDescription": "...",
    "heading": "...",
    "actions": { "placeBid": "...", "watch": "..." },
    "errors": { "bidTooLow": "...", "auctionClosed": "..." },
    "empty": { "noAuctions": "..." }
  }
}
```

Name a key for **what it is**, not what it says: `errors.bidTooLow`, not
`errors.yourBidIsTooLow`. The wording changes; the meaning does not.

## Enforcement

`pnpm i18n:check` fails when catalogues drift apart. It cannot detect a string
that was never added to a catalogue at all — that is what review is for. When
you see a literal in JSX, it is a bug.

## Anti-Patterns

| Don't                                | Do                                   |
| ------------------------------------ | ------------------------------------ |
| `<span>Loading…</span>`              | `<span>{t('common.loading')}</span>` |
| `alt="Logo"`                         | `alt={t('common.logoAlt')}`          |
| `z.string().min(8, 'Too short')`     | Pass `t` into the schema             |
| Showing `error.message` from the API | Map the code to a key                |
| `title: 'Pricing'` in metadata       | `t('pricing.metaTitle')`             |
| "I'll translate it later"            | Add the key now; later never comes   |
