import { BASICS_LESSONS, BASICS_TOPIC } from './basics';
import {
  MARKETS_ECONOMY_LESSONS,
  MARKETS_ECONOMY_TOPIC,
} from './markets-economy';
import { RISK_COSTS_LESSONS, RISK_COSTS_TOPIC } from './risk-and-costs';
import { STOCKS_ETFS_LESSONS, STOCKS_ETFS_TOPIC } from './stocks-etfs';
import type { SeedLesson, SeedTopic } from './types';

/**
 * The lesson registry.
 *
 * Topics are listed in reading order and lessons live in their topic's file.
 * A lesson that is not in its topic's `slugs` gets a page with no breadcrumb
 * and no progress bar, and nothing on `/learn` links to it — a test pins
 * against exactly that.
 */
export const TOPICS: SeedTopic[] = [
  BASICS_TOPIC,
  STOCKS_ETFS_TOPIC,
  MARKETS_ECONOMY_TOPIC,
  RISK_COSTS_TOPIC,
];

export const LESSONS: SeedLesson[] = [
  ...BASICS_LESSONS,
  ...STOCKS_ETFS_LESSONS,
  ...MARKETS_ECONOMY_LESSONS,
  ...RISK_COSTS_LESSONS,
];

/** The three cards `/learn` and the homepage promote. */
export const START_HERE = [
  'what-is-a-share-really',
  'what-is-an-etf',
  'inflation-in-one-page',
];

export { GLOSSARY } from './glossary';
export type { SeedLesson, SeedTopic } from './types';
