import { TIME } from '../time';

export const QUERY_STALE_TIME = {
  NONE: 0,
  SHORT: TIME.MINUTE,
  DEFAULT: TIME.MINUTE * 5,
  LONG: TIME.HOUR,
  INFINITY: Infinity,
} as const;

export const QUERY_GC_TIME = {
  SHORT: TIME.MINUTE * 5,
  DEFAULT: TIME.MINUTE * 10,
  MEDIUM: TIME.MINUTE * 30,
  LONG: TIME.HOUR,
  INFINITY: Infinity,
} as const;
