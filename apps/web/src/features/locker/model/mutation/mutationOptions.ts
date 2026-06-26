import { mutationOptions, type QueryClient } from '@tanstack/react-query';

import { lockerQueryKeys } from '@/entities/locker';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

import {
  postLockerExtension,
  postLockerRegistration,
  postLockerReturn,
} from '../../api';

export const lockerMutationOptions = {
  lockerRegistration: ({ queryClient }: { queryClient: QueryClient }) =>
    mutationOptions({
      mutationFn: postLockerRegistration,
      onSuccess: async (_, _variables, context) => {
        const elasped = Date.now() - context.startedAt;
        const remaining = Math.max(500 - elasped, 0);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        toast.dismiss(context.toastId);

        queryClient.invalidateQueries({
          queryKey: lockerQueryKeys.all,
        });

        toast.success('사물함 등록이 완료되었습니다.');
      },
      onError: async (error: unknown, _variables, context) => {
        if (context) {
          const elasped = Date.now() - context.startedAt;
          const remaining = Math.max(500 - elasped, 0);

          await new Promise((resolve) => setTimeout(resolve, remaining));

          toast.dismiss(context.toastId);
        }
        toast.error(extractErrorMessage(error, '사물함 등록에 실패했습니다.'));
      },
      onMutate: () => {
        return {
          toastId: toast.loading('사물함 등록 중입니다...'),
          startedAt: Date.now(),
        };
      },
    }),
  lockerReturn: ({ queryClient }: { queryClient: QueryClient }) =>
    mutationOptions({
      mutationFn: postLockerReturn,
      onSuccess: async (_, _variables, context) => {
        const elasped = Date.now() - context.startedAt;
        const remaining = Math.max(500 - elasped, 0);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        toast.dismiss(context.toastId);

        queryClient.invalidateQueries({
          queryKey: lockerQueryKeys.all,
        });

        toast.success('사물함 반납이 완료되었습니다.');
      },
      onError: async (error: unknown, _variables, context) => {
        if (context) {
          const elapsed = Date.now() - context.startedAt;
          const remaining = Math.max(500 - elapsed, 0);

          await new Promise((resolve) => setTimeout(resolve, remaining));

          toast.dismiss(context.toastId);
        }

        toast.error(extractErrorMessage(error, '사물함 반납에 실패했습니다.'));
      },
      onMutate: () => {
        return {
          toastId: toast.loading('사물함 반납 중입니다...'),
          startedAt: Date.now(),
        };
      },
    }),
  lockerExtension: ({ queryClient }: { queryClient: QueryClient }) =>
    mutationOptions({
      mutationFn: postLockerExtension,
      onSuccess: async (_, _variables, context) => {
        const elasped = Date.now() - context.startedAt;
        const remaining = Math.max(500 - elasped, 0);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        toast.dismiss(context.toastId);

        queryClient.invalidateQueries({
          queryKey: lockerQueryKeys.all,
        });

        toast.success('이용 기간이 연장되었습니다.');
      },
      onError: async (error: unknown, _variables, context) => {
        if (context) {
          const elasped = Date.now() - context.startedAt;
          const remaining = Math.max(500 - elasped, 0);

          await new Promise((resolve) => setTimeout(resolve, remaining));

          toast.dismiss(context.toastId);
        }
        toast.error(
          extractErrorMessage(error, '이용 기간 연장에 실패했습니다.'),
        );
      },
      onMutate: () => {
        return {
          toastId: toast.loading('이용 기간 연장 중입니다...'),
          startedAt: Date.now(),
        };
      },
    }),
};
