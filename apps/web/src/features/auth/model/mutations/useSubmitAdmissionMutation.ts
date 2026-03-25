import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createAdmission } from '@/features/auth/api';

import type { AdmissionCreateRequestDto } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type SubmitAdmissionMutationOptions = Omit<
  UseMutationOptions<void, Error, AdmissionCreateRequestDto>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useSubmitAdmissionMutation = (
  options?: SubmitAdmissionMutationOptions,
) => {
  const { onSuccess, onError, onMutate, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: AdmissionCreateRequestDto) => createAdmission(data),
    onMutate: () => {
      toast.loading('인증 서류를 제출하고 있어요...');
      onMutate?.();
    },
    onSuccess: () => {
      toast.success('인증 신청이 접수되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '인증 서류 제출에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
      onError?.(error);
    },
    ...restOptions,
  });
};
