'use client';

import { useRouter } from 'next/navigation';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { nativeSocialLogin } from '@/features/auth/api/post/session';
import { routeAfterSignIn } from '@/features/auth/lib';

import type {
  AuthResponseDto,
  NativeSocialLoginRequestDto,
} from '@/entities/auth';

import { TokenManager } from '@/shared/storage';

export const useNativeSocialLoginMutation = (
  options?: Omit<
    UseMutationOptions<AuthResponseDto, Error, NativeSocialLoginRequestDto>,
    'mutationFn' | 'onSuccess' | 'onError'
  >,
) => {
  const router = useRouter();
  const { ...restOptions } = options ?? {};

  const onSuccess: NonNullable<
    UseMutationOptions<AuthResponseDto, Error, NativeSocialLoginRequestDto>['onSuccess']
  > = async (data) => {
    await TokenManager.setAccessToken(data.accessToken);
    await TokenManager.setRefreshToken();
    routeAfterSignIn(router, data.onboardingStatus);
  };

  const onError: NonNullable<
    UseMutationOptions<AuthResponseDto, Error, NativeSocialLoginRequestDto>['onError']
  > = async () => {};

  return useMutation({
    mutationFn: nativeSocialLogin,
    onSuccess,
    onError,
    ...restOptions,
  });
};
