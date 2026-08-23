'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { postQueryOptions } from '../../config';

export const usePostDetailSectionRefetch = (postId: string) => {
  return useSuspenseQuery(postQueryOptions.refetch(postId));
};
