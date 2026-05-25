import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAvailableBoards, getWritableBoards } from '../../api';
import { type GetAvailableBoardListQuery } from '../../model';

import { boardQueryKeys } from './boardQueryKeys';

export const boardQueryOptions = {
  available: (query: GetAvailableBoardListQuery = {}) =>
    queryOptions({
      queryKey: boardQueryKeys.available(query),
      queryFn: () => getAvailableBoards(query),
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
  writable: () =>
    queryOptions({
      queryKey: boardQueryKeys.writable(),
      queryFn: getWritableBoards,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
};
