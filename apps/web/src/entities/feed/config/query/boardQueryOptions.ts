import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAvailableBoards, getWritableBoards } from '../../api';
import {
  type GetWritableBoardListQuery,
  type GetAvailableBoardListQuery,
} from '../../model';

import { boardQueryKeys } from './boardQueryKeys';

export const boardQueryOptions = {
  available: (query: GetAvailableBoardListQuery = {}) =>
    queryOptions({
      queryKey: boardQueryKeys.available(query),
      queryFn: () => getAvailableBoards(query),
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
  writable: (query: GetWritableBoardListQuery = {}) =>
    queryOptions({
      queryKey: boardQueryKeys.writable(query),
      queryFn: () => getWritableBoards(query),
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
};
