import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getLockerLocationDetail } from '../../api';
import { lockerQueryKey } from '../../config';

export const useLockerLocationDetail = (locationId: string | null) => {
  return useQuery({
    queryKey: lockerQueryKey.location(locationId ?? ''),
    queryFn: () => getLockerLocationDetail(locationId ?? ''),
    staleTime: QUERY_STALE_TIME.NONE,
    enabled: Boolean(locationId),
  });
};
