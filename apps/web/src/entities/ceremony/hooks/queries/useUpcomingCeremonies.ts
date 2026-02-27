import { useQuery } from '@tanstack/react-query';

import { getUpcomingCeremonies } from '../../api';
import { ceremonyQueryKey } from '../../config';
import { CeremonyType } from '../../model';

export const useUpcomingCeremonies = (
  type: CeremonyType = 'all',
  pageNum: number = 0,
) => {
  return useQuery({
    queryKey: [...ceremonyQueryKey.upcoming(), type, pageNum],
    queryFn: () => getUpcomingCeremonies(type, pageNum),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
};
