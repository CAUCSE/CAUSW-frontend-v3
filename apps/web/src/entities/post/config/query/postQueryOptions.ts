import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getPost, getPosts } from '../../api';
import { type GetPostsQuery } from '../../model';

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
    }),
};
