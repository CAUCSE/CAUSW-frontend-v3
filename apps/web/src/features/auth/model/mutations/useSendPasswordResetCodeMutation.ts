import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { sendPasswordResetCode } from '@/features/auth/api';

import type { PasswordResetSendRequestDto } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useSendPasswordResetCodeMutation = (
  options?: Omit<
    UseMutationOptions<null, Error, PasswordResetSendRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: PasswordResetSendRequestDto) =>
      sendPasswordResetCode(data),
    onMutate: () => {
      toast.loading('인증코드를 발송하고 있어요...');
    },
    onSuccess: () => {
      toast.success('인증코드를 발송했습니다.');
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '인증코드 발송에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
