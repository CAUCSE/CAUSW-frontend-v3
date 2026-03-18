'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getPost } from '../../api/get';
import { postKeys } from '../../config/query-key';

export const usePostQuery = (postId: string) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
    staleTime: QUERY_STALE_TIME.DEFAULT,
  });
};
