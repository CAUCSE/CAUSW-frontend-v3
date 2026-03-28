'use client';

import { useRouter } from 'next/navigation';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { nativeSocialLogin } from '@/features/auth/api/post/session';
import { routeAfterSignIn } from '@/features/auth/lib';

import type {
  AuthResponseDto,
  NativeSocialLoginRequestDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import { extractErrorMessage } from '@/shared/utils';

type NativeSocialLoginMutationOptions = Omit<
  UseMutationOptions<AuthResponseDto, Error, NativeSocialLoginRequestDto>,
  'mutationFn' | 'onSuccess' | 'onError'
> & {
  onSuccess?: (data: AuthResponseDto) => void;
  onError?: (error: Error) => void;
};

export const useNativeSocialLoginMutation = (
  options?: NativeSocialLoginMutationOptions,
) => {
  const router = useRouter();
  const { onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: NativeSocialLoginRequestDto) => nativeSocialLogin(data),
    onSuccess: async (data) => {
      try {
        await TokenManager.setAccessToken(data.accessToken);
        await TokenManager.setRefreshToken();

        toast.success('로그인되었습니다.');
        routeAfterSignIn(router, data);

        onSuccess?.(data);
      } catch (error) {
        toast.error(
          extractErrorMessage(
            error,
            '로그인 정보 저장에 실패했습니다. 다시 시도해 주세요.',
          ),
        );
        router.replace('/auth/sign-in');
      }
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '소셜 로그인에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
      router.replace('/auth/sign-in');
      onError?.(error);
    },
    ...restOptions,
  });
};
