import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

export const useLockerLocations = () => {
  return useQuery({
    ...lockerQueryOptions.locations(),
    staleTime: QUERY_STALE_TIME.SHORT,
  });
};
