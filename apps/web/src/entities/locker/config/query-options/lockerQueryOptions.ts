import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import {
  getLockerApplicationPeriod,
  getLockerLocation,
  getLockerLocations,
  getMyLocker,
} from '../../api';
import { type GetLockerLocationParam } from '../../types';
import { lockerQueryKeys } from '../query-key';

export const lockerQueryOptions = {
  myLocker: () =>
    queryOptions({
      queryKey: lockerQueryKeys.myLocker(),
      queryFn: getMyLocker,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
  lockerLocations: () =>
    queryOptions({
      queryKey: lockerQueryKeys.lockerLocations(),
      queryFn: getLockerLocations,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
  lockerApplicationPeriod: () =>
    queryOptions({
      queryKey: lockerQueryKeys.lockerApplicationPeriod(),
      queryFn: getLockerApplicationPeriod,
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
  lockerLocation: (param: GetLockerLocationParam) =>
    queryOptions({
      queryKey: lockerQueryKeys.lockerLocation(param),
      queryFn: () => getLockerLocation(param),
      staleTime: QUERY_STALE_TIME.DEFAULT,
      throwOnError: true,
    }),
};
