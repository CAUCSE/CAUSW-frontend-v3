export const POST_LIST_SCROLL_RESTORATION_STORAGE_KEY = {
  NOTICE: 'post-list-scroll-restoration-notice',
  COMMUNITY: 'post-list-scroll-restoration-community',
  SEARCH: 'post-list-scroll-restoration-search',
  MY_FEED: 'post-list-scroll-restoration-my-feed',
} as const;

export type PostListScrollRestorationStorageKey =
  (typeof POST_LIST_SCROLL_RESTORATION_STORAGE_KEY)[keyof typeof POST_LIST_SCROLL_RESTORATION_STORAGE_KEY];
