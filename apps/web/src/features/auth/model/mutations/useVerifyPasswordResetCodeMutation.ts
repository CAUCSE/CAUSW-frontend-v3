import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { verifyPasswordResetCode } from '@/features/auth/api';

import type {
  PasswordResetVerifyRequestDto,
  PasswordResetVerifyResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useVerifyPasswordResetCodeMutation = (
  options?: Omit<
    UseMutationOptions<
      PasswordResetVerifyResponseDto,
      Error,
      PasswordResetVerifyRequestDto
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: PasswordResetVerifyRequestDto) =>
      verifyPasswordResetCode(data),
    onMutate: () => {
      toast.loading('인증코드를 검증하고 있어요...');
    },
    onSuccess: () => {
      toast.success('인증코드가 확인되었습니다.');
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '인증코드 검증에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
