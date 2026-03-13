import { queryOptions } from '@tanstack/react-query';

import { getMyProfile } from '../../api/get';

import { profileQueryKeys } from './profileKeys';

export const profileQueryOptions = {
  me: () =>
    queryOptions({
      queryKey: profileQueryKeys.me(),
      queryFn: () => getMyProfile(),
      staleTime: 1000 * 60 * 5,
    }),
};
