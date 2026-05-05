'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { postQueryOptions } from '../../config';

export const usePostQuery = (postId: string) => {
  return useSuspenseQuery(postQueryOptions.detail(postId));
};
