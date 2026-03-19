import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getLockerPeriodStatus } from '../../api';
import { lockerQueryKey } from '../../config';

export const useLockerPeriodStatus = () => {
  return useQuery({
    queryKey: lockerQueryKey.periodStatus(),
    queryFn: getLockerPeriodStatus,
    staleTime: QUERY_STALE_TIME.SHORT,
  });
};
