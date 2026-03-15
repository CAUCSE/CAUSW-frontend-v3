import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getPost } from '../../api';
import { postKeys } from '../../config';
import { GetPostRequestDto } from '../types';

export const usePostQuery = (postId: GetPostRequestDto) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
    staleTime: QUERY_STALE_TIME.DEFAULT,
  });
};
