#!/usr/bin/env node
/**
 * Fails when locale catalogues drift apart.
 *
 * A key present in sq but missing from en renders the Albanian string to an
 * English reader — silently, because the fallback merge in i18n/request.ts
 * hides it. This script is what surfaces it, so it runs in CI.
 *
 * Usage: node scripts/check-translations.mjs messages
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'messages';
const REFERENCE = 'sq';

const flatten = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return entry && typeof entry === 'object' && !Array.isArray(entry)
      ? flatten(entry, path)
      : [path];
  });

const catalogues = new Map();
for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const locale = file.replace(/\.json$/, '');
  catalogues.set(locale, new Set(flatten(JSON.parse(readFileSync(join(dir, file), 'utf8')))));
}

const reference = catalogues.get(REFERENCE);
if (!reference) {
  console.error(`Reference catalogue ${REFERENCE}.json not found in ${dir}/`);
  process.exit(1);
}

let failed = false;
for (const [locale, keys] of catalogues) {
  if (locale === REFERENCE) continue;

  const missing = [...reference].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !reference.has(key));

  if (missing.length) {
    failed = true;
    console.error(`\n${locale}: missing ${missing.length} key(s)`);
    for (const key of missing) console.error(`  - ${key}`);
  }
  if (extra.length) {
    failed = true;
    console.error(`\n${locale}: ${extra.length} key(s) not in ${REFERENCE}`);
    for (const key of extra) console.error(`  + ${key}`);
  }
}

if (failed) process.exit(1);
console.log(`Translations in sync across ${catalogues.size} locales.`);
