import { BASICS_LESSONS, BASICS_TOPIC } from './basics';
import {
  MARKETS_ECONOMY_LESSONS,
  MARKETS_ECONOMY_TOPIC,
} from './markets-economy';
import { RISK_COSTS_LESSONS, RISK_COSTS_TOPIC } from './risk-and-costs';
import { STOCKS_ETFS_LESSONS, STOCKS_ETFS_TOPIC } from './stocks-etfs';
import type { Locale } from '@/i18n/config';
import type { SeedLesson, SeedTopic } from './types';

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

export const START_HERE: Record<Locale, string[]> = {
  sq: ['cka-eshte-aksioni', 'cka-eshte-etf', 'inflacioni'],
};

export { GLOSSARY } from './glossary';
export type { SeedLesson, SeedTopic } from './types';
