import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getPost } from '../../api';

import { postQueryKeys } from './postQueryKeys';

export const postQueryOptions = {
  detail: (postId: string) =>
    queryOptions({
      queryKey: postQueryKeys.detail(postId),
      queryFn: () => getPost(postId),
      staleTime: QUERY_STALE_TIME.DEFAULT,
    }),
};
