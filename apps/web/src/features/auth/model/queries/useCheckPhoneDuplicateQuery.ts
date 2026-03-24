import { useQuery } from '@tanstack/react-query';

import { authQueryKey, checkPhoneDuplicate } from '@/entities/auth';

export const useCheckPhoneDuplicateQuery = (phoneNumber: string) => {
  return useQuery({
    queryKey: authQueryKey.checkPhoneDuplicate(phoneNumber),
    queryFn: () => checkPhoneDuplicate({ phoneNumber }),
    enabled: false,
    retry: false,
  });
};
