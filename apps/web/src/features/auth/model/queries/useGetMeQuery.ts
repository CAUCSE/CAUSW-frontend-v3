import { useQuery } from '@tanstack/react-query';

import { authQueryKey, getMe } from '@/entities/auth';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: authQueryKey.me(),
    queryFn: getMe,
  });
};
