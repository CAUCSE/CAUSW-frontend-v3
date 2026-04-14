import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { changeMyNickname } from '@/features/setting/api';

import { type NicknameChangeRequest } from '@/entities/setting';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type ChangeMyNicknameMutationOptions = Omit<
  UseMutationOptions<null, Error, NicknameChangeRequest>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useChangeMyNicknameMutation = (
  options?: ChangeMyNicknameMutationOptions,
) => {
  const { onMutate, onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: NicknameChangeRequest) => changeMyNickname(data),
    onMutate: () => {
      toast.loading('닉네임을 변경하고 있어요...');
      onMutate?.();
    },
    onSuccess: () => {
      toast.success('닉네임이 변경되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '닉네임 변경에 실패했습니다. 다시 시도해주세요.',
        ),
      );
      onError?.(error);
    },
    ...restOptions,
  });
};
