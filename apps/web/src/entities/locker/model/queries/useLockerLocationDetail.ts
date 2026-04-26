import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

export const useLockerLocationDetail = (locationId: string | null) => {
  return useQuery({
    ...lockerQueryOptions.location(locationId ?? ''),
    staleTime: QUERY_STALE_TIME.NONE,
    enabled: !!locationId,
  });
};
