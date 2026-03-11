import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getUpcomingCeremonies } from '../../api';
import { ceremonyQueryKey } from '../../config';
import type { CeremonyFilterTypeApi } from '../types';

export const useUpcomingCeremonies = (
  type: CeremonyFilterTypeApi = 'all',
  pageNum: number = 0,
) => {
  return useQuery({
    queryKey: ceremonyQueryKey.upcomingPreview(type),
    queryFn: () => getUpcomingCeremonies(type, pageNum),
    staleTime: QUERY_STALE_TIME.DEFAULT,
    throwOnError: true,
  });
};
