import { BASICS_LESSONS, BASICS_TOPIC } from './basics';
import {
  MARKETS_ECONOMY_LESSONS,
  MARKETS_ECONOMY_TOPIC,
} from './markets-economy';
import { RISK_COSTS_LESSONS, RISK_COSTS_TOPIC } from './risk-and-costs';
import { STOCKS_ETFS_LESSONS, STOCKS_ETFS_TOPIC } from './stocks-etfs';
import type { Localized } from '../learnTypes';
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

export const START_HERE: Localized<string[]> = {
  sq: ['cka-eshte-aksioni', 'cka-eshte-etf', 'inflacioni'],
  en: ['what-is-a-share', 'what-is-an-etf', 'inflation'],
};

export { GLOSSARY } from './glossary';
export type { SeedLesson, SeedTopic } from './types';
