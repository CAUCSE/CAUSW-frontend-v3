'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAvailableBoards } from '../../api';
import { boardKeys } from '../../config';

export const useGetAvailableBoards = () => {
  return useSuspenseQuery({
    queryKey: boardKeys.available(),
    queryFn: getAvailableBoards,
    staleTime: QUERY_STALE_TIME.DEFAULT,
  });
};
