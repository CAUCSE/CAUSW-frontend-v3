import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getSystemNoticeLatest } from '../../api';

import { systemNoticeQueryKeys } from './systemNoticeQueryKeys';

export const systemNoticeQueryOptions = {
  latest: () =>
    queryOptions({
      queryKey: systemNoticeQueryKeys.latest(),
      queryFn: () => getSystemNoticeLatest(),
      staleTime: QUERY_STALE_TIME.DEFAULT,
    }),
};
