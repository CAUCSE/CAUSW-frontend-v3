import { useQuery } from '@tanstack/react-query';

import { authQueryKey, checkNicknameDuplicate } from '@/entities/auth';

export const useCheckNicknameDuplicateQuery = (nickname: string) => {
  return useQuery({
    queryKey: authQueryKey.checkNicknameDuplicate(nickname),
    queryFn: () => checkNicknameDuplicate({ nickname }),
    enabled: false,
    retry: false,
  });
};
