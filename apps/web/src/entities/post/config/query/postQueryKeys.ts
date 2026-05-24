import { type MyFeedView } from '@/entities/feed';

import {
  type GetMyCommentedPostsQuery,
  type GetMyFavoritePostsQuery,
  type GetMyPostsQuery,
  type GetPostsQuery,
} from '../../model';

export const postQueryKeys = {
  all: ['posts'] as const,
  detail: (postId: string) => [...postQueryKeys.all, postId] as const,
  list: (query: GetPostsQuery) => [...postQueryKeys.all, query] as const,
  myFeed: (
    view: MyFeedView,
    query: GetMyPostsQuery | GetMyCommentedPostsQuery | GetMyFavoritePostsQuery,
  ) => [...postQueryKeys.all, 'my-feed', view, query] as const,
};
