import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { withdrawMe } from '@/features/setting/api';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type WithdrawMeMutationOptions = Omit<
  UseMutationOptions<null, Error, void>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useWithdrawMeMutation = (options?: WithdrawMeMutationOptions) => {
  const { onMutate, onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: withdrawMe,
    onMutate: () => {
      toast.loading('회원 탈퇴 중..');
      onMutate?.();
    },
    onSuccess: () => {
      toast.success('회원 탈퇴가 완료되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '회원 탈퇴에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
      onError?.(error);
    },
    ...restOptions,
  });
};
