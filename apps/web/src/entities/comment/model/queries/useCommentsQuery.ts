'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getComments } from '../../api';
import { commentKeys } from '../../config';
import { GetCommentsRequestDto } from '../types';

export const useCommentsQuery = ({
  postId,
  pageNum = 0,
}: GetCommentsRequestDto) => {
  return useSuspenseQuery({
    queryKey: commentKeys.list(postId, pageNum),
    queryFn: () => getComments({ postId, pageNum }),
    staleTime: QUERY_STALE_TIME.DEFAULT,
  });
};
