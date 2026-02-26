import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { appleLogin } from '@/features/auth/api/post/session';

import type {
  AppleLoginRequestDto,
  AppleLoginResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useAppleLoginMutation = (
  options?: Omit<
    UseMutationOptions<AppleLoginResponseDto, Error, AppleLoginRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: AppleLoginRequestDto) => appleLogin(data),
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Apple 로그인에 실패했습니다.'));
    },
    ...options,
  });
};
