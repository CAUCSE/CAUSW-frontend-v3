'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { registerSocialUser } from '@/features/auth/api';

import type { SocialRegistrationRequestDto } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type SocialRegistrationMutationOptions = Omit<
  UseMutationOptions<null, Error, SocialRegistrationRequestDto>,
  'mutationFn'
>;

export const useSocialRegistrationMutation = (
  options?: SocialRegistrationMutationOptions,
) => {
  return useMutation({
    mutationFn: registerSocialUser,
    onMutate: () => {
      toast.loading('추가 정보를 저장하고 있어요...');
    },
    onSuccess: () => {
      toast.success('추가 정보 입력이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '추가 정보 입력에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
