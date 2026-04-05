import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { changeMyPassword } from '@/features/setting/api';

import { type PasswordChangeRequest } from '@/entities/setting';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type ChangeMyPasswordMutationOptions = Omit<
  UseMutationOptions<null, Error, PasswordChangeRequest>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useChangeMyPasswordMutation = (
  options?: ChangeMyPasswordMutationOptions,
) => {
  const { onMutate, onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: PasswordChangeRequest) => changeMyPassword(data),
    onMutate: () => {
      toast.loading('비밀번호를 변경하고 있어요...');
      onMutate?.();
    },
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '비밀번호 변경에 실패했습니다. 다시 시도해주세요.',
        ),
      );
      onError?.(error);
    },
    ...restOptions,
  });
};
