#!/usr/bin/env node
/**
 * Audits SEO strings in the message catalogues.
 *
 * Search engines truncate long titles and descriptions, and a missing one means
 * the engine invents its own. Both are silent failures in the browser, so they
 * are checked here instead.
 *
 * Usage: node scripts/audit-seo-meta.mjs messages
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'messages';

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;

const walk = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return entry && typeof entry === 'object' && !Array.isArray(entry)
      ? walk(entry, path)
      : [[path, entry]];
  });

let failed = false;
const warn = (message) => {
  failed = true;
  console.error(message);
};

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const locale = file.replace(/\.json$/, '');
  const entries = walk(JSON.parse(readFileSync(join(dir, file), 'utf8')));

  for (const [key, value] of entries) {
    if (typeof value !== 'string') continue;
    const leaf = key.split('.').at(-1) ?? '';

    if (/^(meta|default)?[Tt]itle$/.test(leaf) && value.length > TITLE_MAX) {
      warn(`${locale} ${key}: title is ${value.length} chars (max ${TITLE_MAX})`);
    }

    if (/^(meta|default)?[Dd]escription$/.test(leaf)) {
      if (value.length > DESCRIPTION_MAX) {
        warn(`${locale} ${key}: description is ${value.length} chars (max ${DESCRIPTION_MAX})`);
      } else if (value.length < DESCRIPTION_MIN) {
        warn(`${locale} ${key}: description is ${value.length} chars (min ${DESCRIPTION_MIN})`);
      }
    }
  }

  // Every namespace that has a metaTitle must have a metaDescription too.
  const keys = new Set(entries.map(([key]) => key));
  for (const key of keys) {
    if (key.endsWith('.metaTitle') && !keys.has(key.replace(/metaTitle$/, 'metaDescription'))) {
      warn(`${locale} ${key}: has a metaTitle but no metaDescription`);
    }
  }
}

if (failed) process.exit(1);
console.log('SEO metadata within recommended lengths.');
