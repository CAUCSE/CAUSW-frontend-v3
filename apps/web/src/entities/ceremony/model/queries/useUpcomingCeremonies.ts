import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getUpcomingCeremonies } from '../../api';
import { ceremonyQueryKey } from '../../config';
import { CeremonyTypeApi } from '../../model';

export const useUpcomingCeremonies = (
  type: CeremonyTypeApi = 'ALL',
  pageNum: number = 0,
) => {
  return useQuery({
    queryKey: [...ceremonyQueryKey.upcoming(), type, pageNum],
    queryFn: () => getUpcomingCeremonies(type, pageNum),
    staleTime: QUERY_STALE_TIME.DEFAULT,
    throwOnError: true,
  });
};
