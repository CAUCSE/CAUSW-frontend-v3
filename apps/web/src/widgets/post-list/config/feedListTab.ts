import { type ValueOf } from '@/shared/lib';

export const FEED_LIST_TAB = {
  ALL: 'all',
} as const;

export type FeedListTab = ValueOf<typeof FEED_LIST_TAB>;

export const FEED_LIST_TAB_SEARCH_PARAM_KEY = {
  /** 게시판(채널) 선택 */
  CHANNEL: 'channel',
  /** 게시판(채널) 내부의 세부 카테고리 */
  TAB: 'tab',
} as const;

export type FeedListTabSearchParamKey = ValueOf<
  typeof FEED_LIST_TAB_SEARCH_PARAM_KEY
>;
