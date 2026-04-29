'use client';

import { useRouter } from 'next/navigation';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { nativeSocialLogin } from '@/features/auth/api/post/session';
import { routeAfterSignIn } from '@/features/auth/lib';
import { usePushNotification } from '@/features/notification';

import type {
  AuthResponseDto,
  NativeSocialLoginProvider,
  NativeSocialLoginRequestDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import { extractErrorMessage } from '@/shared/utils';

import { useRequestNativeSocialTokenMutation } from './useRequestNativeSocialTokenMutation';

type NativeSocialLoginFlowVariables = {
  provider: NativeSocialLoginProvider;
};

type NativeSocialLoginFlowMutationOptions = Omit<
  UseMutationOptions<AuthResponseDto, Error, NativeSocialLoginFlowVariables>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
>;

export const useNativeSocialLoginFlowMutation = (
  options?: NativeSocialLoginFlowMutationOptions,
) => {
  const router = useRouter();
  const requestNativeSocialTokenMutation =
    useRequestNativeSocialTokenMutation();
  const { compareFCMToken } = usePushNotification();
  const { ...restOptions } = options ?? {};

  const onMutate: NonNullable<
    UseMutationOptions<
      AuthResponseDto,
      Error,
      NativeSocialLoginFlowVariables
    >['onMutate']
  > = async (variables) => {
    toast.loading(`${variables.provider} 로그인 중...`);
  };

  const onSuccess: NonNullable<
    UseMutationOptions<
      AuthResponseDto,
      Error,
      NativeSocialLoginFlowVariables
    >['onSuccess']
  > = async (data) => {
    await TokenManager.setAccessToken(data.accessToken);
    await TokenManager.setRefreshToken(data.refreshToken);
    await compareFCMToken();
    routeAfterSignIn(router, data.onboardingStatus);
    toast.success('로그인되었습니다.');
  };

  const onError: NonNullable<
    UseMutationOptions<
      AuthResponseDto,
      Error,
      NativeSocialLoginFlowVariables
    >['onError']
  > = async (error) => {
    toast.error(
      extractErrorMessage(
        error,
        '소셜 로그인에 실패했습니다. 다시 시도해 주세요.',
      ),
    );
  };

  return useMutation({
    mutationFn: async ({ provider }: NativeSocialLoginFlowVariables) => {
      const tokens = await requestNativeSocialTokenMutation.mutateAsync({
        provider,
      });

      const payload: NativeSocialLoginRequestDto =
        provider === 'kakao'
          ? {
              provider,
              accessToken: tokens.accessToken,
            }
          : provider === 'apple'
            ? {
                provider,
                platform: tokens.platform,
                idToken: tokens.idToken,
                authorizationCode: tokens.authorizationCode,
                codeVerifier: tokens.codeVerifier ?? null,
              }
            : {
                provider,
                idToken: tokens.idToken,
                authorizationCode: tokens.authorizationCode,
                codeVerifier: tokens.codeVerifier ?? null,
              };

      return nativeSocialLogin(payload);
    },
    onMutate,
    onSuccess,
    onError,
    ...restOptions,
  });
};
