import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { sendEmailVerificationCode } from '@/features/auth/api/post/session';

import type {
  SendEmailVerificationCodeRequestDto,
  SendEmailVerificationCodeResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useSendEmailVerificationCodeMutation = (
  options?: Omit<
    UseMutationOptions<
      SendEmailVerificationCodeResponseDto,
      Error,
      SendEmailVerificationCodeRequestDto
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: SendEmailVerificationCodeRequestDto) =>
      sendEmailVerificationCode(data),
    onMutate: () => {
      toast.loading('인증 코드를 발송하고 있어요...');
    },
    onSuccess: () => {
      toast.success('인증 코드를 발송했습니다.');
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '인증 코드 발송에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
