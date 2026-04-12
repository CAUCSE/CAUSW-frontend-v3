'use client';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  useNativeSocialLoginMutation,
  useRequestNativeSocialTokenMutation,
} from '@/features/auth';

import type {
  AuthResponseDto,
  NativeSocialLoginProvider,
  NativeSocialLoginRequestDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

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
  const requestNativeSocialTokenMutation =
    useRequestNativeSocialTokenMutation();
  const nativeSocialLoginMutation = useNativeSocialLoginMutation();
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
  > = async () => {
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
          : {
              provider,
              idToken: tokens.idToken,
            };

      return nativeSocialLoginMutation.mutateAsync(payload);
    },
    onMutate,
    onSuccess,
    onError,
    ...restOptions,
  });
};
