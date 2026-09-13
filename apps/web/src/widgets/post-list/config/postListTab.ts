import { type ValueOf } from '@/shared/lib';

export const POST_LIST_TAB = {
  ALL: 'all',
} as const;

export type PostListTab = ValueOf<typeof POST_LIST_TAB>;

export const POST_LIST_TAB_SEARCH_PARAM_KEY = {
  /** 게시판(채널) 선택 */
  CHANNEL: 'channel',
  /** 게시판(채널) 내부의 세부 카테고리 */
  TAB: 'tab',
} as const;

export type PostListTabSearchParamKey = ValueOf<
  typeof POST_LIST_TAB_SEARCH_PARAM_KEY
>;
