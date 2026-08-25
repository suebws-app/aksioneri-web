---
name: kosovo-albanian-translation
description: Use this skill whenever writing or translating any Albanian text — the `sq` locale in this repo means Kosovo Albanian, not standard Tosk
type: skill
---

# Kosovo Albanian Translation

## When to Use

- Writing any `sq` catalogue string in `messages/sq.json`
- Translating English UI copy into Albanian
- Drafting Albanian marketing copy, SEO metadata, or error messages
- Any prompt that asks you to translate something into Albanian
- Reviewing an Albanian string that "feels off" — it is probably Tosk

## The rule

**`sq` in this codebase is Kosovo Albanian (Kosovar / Gheg-influenced), not
standard Tosk Albanian.** Every Albanian string the app ships reaches an
audience in Kosovo, and Tosk-flavoured "correct" Albanian reads as foreign
to that audience.

Translate the **meaning, tone and intent** — then phrase it the way a native
Kosovo speaker would actually say or write it. Never translate word-for-word
or mechanically.

## Keep translations

- Natural and fluent for people in Kosovo
- Clear, simple, easy to understand
- Modern and professional when the source is professional
- Conversational when the source is conversational
- Matched to the original tone and audience
- Grammatically correct in Kosovo Albanian

## Avoid

- Literal translations that sound unnatural
- English sentence structures copied into Albanian
- Unnecessarily formal or archaic vocabulary
- Phrasing that sounds distinctly Albanian-from-Albania (Tosk) when a
  natural Kosovo equivalent exists — e.g. reflexive `-hem` verbs used where
  a Kosovar would use an active construction, over-formal `duke qenë se`
  where `meqë` reads more naturally, `Përshëndetje` where `Tungjatjeta` or
  a plain `Mirë se vini` fits the moment better

When multiple translations are possible, pick the one a native Kosovo speaker
would find most natural, **even if it drifts considerably from the source
wording**.

## Overrides

- The user may explicitly ask for standard / Tosk Albanian for a specific
  piece. Honour that override for that request only; the default stays
  Kosovar.
- Proper nouns, brand names, tickers and financial instrument names stay
  as they are (e.g. "Nasdaq 100" not "Nasdaku 100").

## Related

- `no-hardcoded-text` — every user-facing string is a translation key first;
  this skill governs how that key's `sq` value should read.
- `next-intl-setup` — where the `sq` catalogue lives (`messages/sq.json`)
  and how locale prefixes work.
