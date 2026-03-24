import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { verifyEmailVerificationCode } from '@/features/auth/api/post/session';

import type {
  VerifyEmailVerificationCodeRequestDto,
  VerifyEmailVerificationCodeResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useVerifyEmailVerificationCodeMutation = (
  options?: Omit<
    UseMutationOptions<
      VerifyEmailVerificationCodeResponseDto,
      Error,
      VerifyEmailVerificationCodeRequestDto
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: VerifyEmailVerificationCodeRequestDto) =>
      verifyEmailVerificationCode(data),
    onMutate: () => {
      toast.loading('인증 코드를 검증하고 있어요...');
    },
    onSuccess: () => {
      toast.success('이메일 인증이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '인증 코드 검증에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
