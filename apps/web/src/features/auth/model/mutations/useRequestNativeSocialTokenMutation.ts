'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import type { NativeSocialLoginRequestDto } from '@/entities/auth';

import {
  requestNativeSocialLogin,
  type NativeSocialLoginToken,
  type SocialProvider,
} from '@/shared/lib/capacitor';

type NativeSocialBridgeVariables = Pick<
  NativeSocialLoginRequestDto,
  'provider'
>;

type RequestNativeSocialTokenMutationOptions = Omit<
  UseMutationOptions<
    NativeSocialLoginToken,
    Error,
    NativeSocialBridgeVariables
  >,
  'mutationFn'
>;

const validateTokens = (
  provider: SocialProvider,
  tokens: NativeSocialLoginToken,
) => {
  if (provider === 'kakao' && !tokens.accessToken) {
    throw new Error('카카오 액세스 토큰을 가져오지 못했습니다.');
  }

  if (provider === 'google' && !tokens.idToken) {
    throw new Error('Google id token을 가져오지 못했습니다.');
  }

  if (provider === 'apple' && !tokens.idToken) {
    throw new Error('Apple id token을 가져오지 못했습니다.');
  }

  return tokens;
};

export const useRequestNativeSocialTokenMutation = (
  options?: RequestNativeSocialTokenMutationOptions,
) => {
  return useMutation({
    mutationFn: async ({ provider }: NativeSocialBridgeVariables) => {
      const tokens = await requestNativeSocialLogin(provider);
      return validateTokens(provider, tokens);
    },
    ...options,
  });
};
