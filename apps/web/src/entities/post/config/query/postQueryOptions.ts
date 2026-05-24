import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { MY_FEED_VIEW, type MyFeedView } from '@/entities/feed';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@/shared/constants';

import {
  getMyCommentedPosts,
  getMyFavoritePosts,
  getMyPosts,
  getPost,
  getPosts,
} from '../../api';
import {
  type GetMyFavoritePostsQuery,
  type GetMyCommentedPostsQuery,
  type GetMyPostsQuery,
  type GetPostsQuery,
} from '../../model';

import { postQueryKeys } from './postQueryKeys';

export const postQueryOptions = {
  detail: (postId: string) =>
    queryOptions({
      queryKey: postQueryKeys.detail(postId),
      queryFn: () => getPost(postId),
      staleTime: QUERY_STALE_TIME.DEFAULT,
    }),
  list: (query: GetPostsQuery) =>
    infiniteQueryOptions({
      queryKey: postQueryKeys.list(query),
      queryFn: ({ pageParam }) => getPosts(query, pageParam),
      initialPageParam: '',
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor ? lastPage.nextCursor : undefined,
      staleTime: QUERY_STALE_TIME.NONE,
      gcTime: QUERY_GC_TIME.LONG,
      throwOnError: true,
    }),

  myFeed: (
    view: MyFeedView,
    query: GetMyPostsQuery | GetMyCommentedPostsQuery | GetMyFavoritePostsQuery,
  ) =>
    infiniteQueryOptions({
      queryKey: postQueryKeys.myFeed(view, query),
      queryFn: ({ pageParam }) => {
        switch (view) {
          case MY_FEED_VIEW.MY_POSTS:
            return getMyPosts(query, pageParam);
          case MY_FEED_VIEW.MY_COMMENTS:
            return getMyCommentedPosts(query, pageParam);
          case MY_FEED_VIEW.FAVORITES:
            return getMyFavoritePosts(query, pageParam);
          default:
            return getMyPosts(query, pageParam);
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor ? lastPage.nextCursor : undefined,
      staleTime: QUERY_STALE_TIME.NONE,
      gcTime: QUERY_GC_TIME.LONG,
      throwOnError: true,
    }),
};
