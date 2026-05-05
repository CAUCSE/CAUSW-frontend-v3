import { queryOptions } from '@tanstack/react-query';

import {
  getLockerLocationDetail,
  getLockerLocations,
  getLockerPeriodStatus,
  getMyLocker,
} from '../../api';
import { lockerQueryKey } from '../query-key';

export const lockerQueryOptions = {
  periodStatus: () =>
    queryOptions({
      queryKey: lockerQueryKey.periodStatus(),
      queryFn: getLockerPeriodStatus,
    }),
  me: () =>
    queryOptions({
      queryKey: lockerQueryKey.me(),
      queryFn: getMyLocker,
    }),
  locations: () =>
    queryOptions({
      queryKey: lockerQueryKey.locations(),
      queryFn: getLockerLocations,
    }),
  location: (locationId: string) =>
    queryOptions({
      queryKey: lockerQueryKey.location(locationId),
      queryFn: () => getLockerLocationDetail(locationId),
    }),
};
