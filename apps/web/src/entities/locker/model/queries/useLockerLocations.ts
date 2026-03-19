import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getLockerLocations } from '../../api';
import { lockerQueryKey } from '../../config';

export const useLockerLocations = () => {
  return useQuery({
    queryKey: lockerQueryKey.locations(),
    queryFn: getLockerLocations,
    staleTime: QUERY_STALE_TIME.SHORT,
  });
};
