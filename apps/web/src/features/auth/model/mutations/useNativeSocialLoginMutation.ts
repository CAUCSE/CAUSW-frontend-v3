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
  onSuccess?: UseMutationOptions<
    AuthResponseDto,
    Error,
    NativeSocialLoginRequestDto
  >['onSuccess'];
  onError?: UseMutationOptions<
    AuthResponseDto,
    Error,
    NativeSocialLoginRequestDto
  >['onError'];
};

export const useNativeSocialLoginMutation = (
  options?: NativeSocialLoginMutationOptions,
) => {
  const router = useRouter();
  const {
    onSuccess: customOnSuccess,
    onError: customOnError,
    ...restOptions
  } = options ?? {};

  const onSuccess: NonNullable<
    NativeSocialLoginMutationOptions['onSuccess']
  > = async (data) => {
    toast.success('로그인되었습니다.');
    routeAfterSignIn(router, data);
  };

  const onError: NonNullable<
    NativeSocialLoginMutationOptions['onError']
  > = async (error) => {
    toast.error(
      extractErrorMessage(
        error,
        '소셜 로그인에 실패했습니다. 다시 시도해 주세요.',
      ),
    );
    router.replace('/auth/sign-in');
  };

  return useMutation({
    mutationFn: async (data: NativeSocialLoginRequestDto) => {
      const response = await nativeSocialLogin(data);

      await TokenManager.setAccessToken(response.accessToken);
      await TokenManager.setRefreshToken();

      return response;
    },
    onSuccess: customOnSuccess ?? onSuccess,
    onError: customOnError ?? onError,
    ...restOptions,
  });
};
