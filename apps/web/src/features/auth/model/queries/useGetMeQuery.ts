import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

export const useGetMeQuery = () => {
  return useQuery(authQueryOptions.me());
};
