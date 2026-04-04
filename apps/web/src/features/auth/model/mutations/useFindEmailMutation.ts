import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { findEmail } from '@/features/auth/api';

import type { FindEmailRequestDto, EmailFindResponse } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useFindEmailMutation = (
  options?: Omit<
    UseMutationOptions<
      EmailFindResponse,
      Error,
      FindEmailRequestDto,
      { toastId: string }
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: FindEmailRequestDto) => findEmail(data),
    onMutate: () => {
      return { toastId: toast.loading('계정 정보를 조회하고 있어요...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context.toastId);
      toast.success('계정 정보를 찾았습니다.');
    },
    onError: (error, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error(
        extractErrorMessage(
          error,
          '계정 정보 조회에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
