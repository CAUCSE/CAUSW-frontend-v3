import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getMyLocker } from '../../api';
import { lockerQueryKey } from '../../config';

export const useMyLocker = () => {
  return useQuery({
    queryKey: lockerQueryKey.me(),
    queryFn: getMyLocker,
    staleTime: QUERY_STALE_TIME.SHORT,
  });
};
