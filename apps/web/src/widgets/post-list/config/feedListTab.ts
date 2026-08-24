import { type ValueOf } from '@/shared/lib';

export const FEED_LIST_TAB = {
  ALL: 'all',
} as const;

export type FeedListTab = ValueOf<typeof FEED_LIST_TAB>;

export const FEED_LIST_TAB_SEARCH_PARAM_KEY = {
  TAB: 'tab',
} as const;
