import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { findEmail } from '@/features/auth/api/post/session';

import type { FindEmailRequestDto, EmailFindResponse } from '@/entities/auth';

import { toast } from '@/shared/model';

export const useFindEmailMutation = (
  options?: Omit<
    UseMutationOptions<EmailFindResponse, Error, FindEmailRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: FindEmailRequestDto) => findEmail(data),
    onMutate: () => {
      toast.loading('계정 정보를 조회하고 있어요...');
    },
    ...options,
  });
};
