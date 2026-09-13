import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';

import {
  requestAcademicRecordGraduation,
  requestAcademicRecordReturn,
} from '@/features/setting/api';

import {
  type AcademicRecordGraduationRequest,
  type AcademicRecordReturnRequest,
} from '@/entities/setting';
import { userQueryKey } from '@/entities/user';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type AcademicRecordChangeRequest =
  | {
      type: 'return';
      data: AcademicRecordReturnRequest;
    }
  | {
      type: 'graduation';
      data: AcademicRecordGraduationRequest;
    };

type AcademicRecordChangeMutationOptions = Omit<
  UseMutationOptions<void, Error, AcademicRecordChangeRequest>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useAcademicRecordChangeMutation = (
  options?: AcademicRecordChangeMutationOptions,
) => {
  const queryClient = useQueryClient();
  const { onMutate, onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: ({ type, data }) => {
      if (type === 'return') {
        return requestAcademicRecordReturn(data);
      }

      return requestAcademicRecordGraduation(data);
    },
    onMutate: () => {
      toast.loading('학적 상태 변경을 신청하고 있어요.');
      onMutate?.();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userQueryKey.account(),
      });
      toast.success('학적 상태 변경 신청이 접수되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '학적 상태 변경 신청에 실패했습니다. 다시 시도해주세요.',
        ),
      );
      onError?.(error);
    },
    ...restOptions,
  });
};
