import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAvailableBoards } from '../../api';

import { boardQueryKeys } from './boardQueryKeys';

export const boardQueryOptions = {
  available: () =>
    queryOptions({
      queryKey: boardQueryKeys.available(),
      queryFn: getAvailableBoards,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
};
