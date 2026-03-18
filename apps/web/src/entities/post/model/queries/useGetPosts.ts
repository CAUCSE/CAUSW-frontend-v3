import { infiniteQueryOptions } from '@tanstack/react-query';

import { getPosts } from '../../api/get';
import { postKeys } from '../../config/query-key';
import type { GetPostsCondition } from '../types';

const PAGE_SIZE = 20;

export const postQueryOptions = {
  list: (condition: GetPostsCondition) =>
    infiniteQueryOptions({
      queryKey: postKeys.list(condition),
      queryFn: ({ pageParam }) =>
        getPosts({
          ...condition,
          size: condition.size ?? PAGE_SIZE,
          cursor: typeof pageParam === 'string' ? pageParam : undefined,
        }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }),
};
