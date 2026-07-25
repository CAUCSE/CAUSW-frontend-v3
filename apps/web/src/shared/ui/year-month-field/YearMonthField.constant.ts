import { type ValueOf } from '@/shared/lib';

export const YEAR_MONTH_SECTION = {
  YEAR: 'year',
  MONTH: 'month',
} as const;

export type YearMonthSection = ValueOf<typeof YEAR_MONTH_SECTION>;

export const DIGIT_REGEXP = /^\d$/;
export const MIN_YEAR = 1;
export const MAX_YEAR = 9999;
export const MIN_MONTH = 1;
export const MAX_MONTH = 12;
