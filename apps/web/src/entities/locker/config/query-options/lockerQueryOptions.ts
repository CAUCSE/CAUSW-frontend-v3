import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getMyLocker } from '../../api';
import { lockerQueryKeys } from '../query-key';

export const lockerQueryOptions = {
  myLocker: () =>
    queryOptions({
      queryKey: lockerQueryKeys.myLocker(),
      queryFn: getMyLocker,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
};
