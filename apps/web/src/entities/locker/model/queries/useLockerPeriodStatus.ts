import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

export const useLockerPeriodStatus = () => {
  return useQuery({
    ...lockerQueryOptions.periodStatus(),
    staleTime: QUERY_STALE_TIME.SHORT,
  });
};
