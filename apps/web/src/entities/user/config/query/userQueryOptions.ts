import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getMyAccount } from '../../api';

import { userQueryKey } from './userQueryKey';

export const userQueryOptions = {
  account: () =>
    queryOptions({
      queryKey: userQueryKey.account(),
      queryFn: getMyAccount,
      staleTime: QUERY_STALE_TIME.DEFAULT,
    }),
};
