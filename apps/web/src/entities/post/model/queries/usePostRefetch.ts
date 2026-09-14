'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { postQueryOptions } from '../../config';

export const usePostRefetch = (postId: string) => {
  return useSuspenseQuery(postQueryOptions.refetch(postId));
};
