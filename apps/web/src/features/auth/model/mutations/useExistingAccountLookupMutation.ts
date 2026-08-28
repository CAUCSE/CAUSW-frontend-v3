import { useMutation } from '@tanstack/react-query';

import { findEmail } from '@/features/auth/api';

import type { FindEmailRequestDto } from '@/entities/auth';

// 이름+전화번호 교차 검증용. useFindEmailMutation과 달리 토스트를 띄우지 않는다.
export const useExistingAccountLookupMutation = () => {
  return useMutation({
    mutationFn: (data: FindEmailRequestDto) => findEmail(data),
  });
};
