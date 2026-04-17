import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { agreeTerms } from '@/features/auth/api/post/session';

import type { TermsAgreementRequestDto } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useAgreeTermsMutation = (
  options?: Omit<
    UseMutationOptions<null, Error, TermsAgreementRequestDto>,
    'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
  > & {
    onSuccess?: (
      data: null,
      variables: TermsAgreementRequestDto,
      context: unknown,
    ) => void | Promise<void>;
  },
) => {
  const { onSuccess: afterSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: TermsAgreementRequestDto) => agreeTerms(data),
    onMutate: () => {
      toast.loading('약관 동의를 처리하고 있어요...');
    },
    onSuccess: (data, variables, context) => {
      toast.success('약관 동의가 완료되었습니다.');
      afterSuccess?.(data, variables, context);
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '약관 동의 처리에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...restOptions,
  });
};
