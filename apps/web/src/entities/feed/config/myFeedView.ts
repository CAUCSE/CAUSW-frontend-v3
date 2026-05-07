import { type ValueOf } from '@/shared/lib';

export const MY_FEED_VIEW_SEARCH_PARAM_KEY = 'view';

export const MY_FEED_VIEW = {
  MY_POSTS: 'my-posts',
  MY_COMMENTS: 'my-comments',
  FAVORITES: 'favorites',
} as const;

export const MY_FEED_VIEW_LABEL = {
  MY_POSTS: '내가 쓴 글',
  MY_COMMENTS: '댓글 단 글',
  FAVORITES: '찜한 글',
} as const;

export type MyFeedView = ValueOf<typeof MY_FEED_VIEW>;

export const isMyFeedView = (view: string): view is MyFeedView => {
  return Object.values(MY_FEED_VIEW).includes(view as MyFeedView);
};
