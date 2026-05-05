import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { signin, signout, signup } from '@/features/auth/api/post/session';

import type {
  SigninRequestDto,
  SignupRequestDto,
  SignoutRequestDto,
  SignoutResponseDto,
  AuthResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type SignUpMutationOptions = Omit<
  UseMutationOptions<AuthResponseDto, Error, SignupRequestDto>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
>;

export const useSignUpMutation = (options?: SignUpMutationOptions) => {
  const { ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: SignupRequestDto) => signup(data),
    onMutate: () => {
      toast.loading('회원가입을 진행하고 있어요...');
    },
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, '회원가입에 실패했습니다.'));
    },
    ...restOptions,
  });
};

export const useSignInMutation = (
  options?: Omit<
    UseMutationOptions<AuthResponseDto, Error, SigninRequestDto>,
    'mutationFn'
  >,
) => {
  const { onSuccess: afterSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: SigninRequestDto) => signin(data),
    onMutate: () => {
      toast.loading('로그인을 진행하고 있어요...');
    },
    onSuccess: (
      data: AuthResponseDto,
      variables: SigninRequestDto,
      onMutateResult,
      context,
    ) => {
      toast.success('로그인에 성공했습니다.');
      afterSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, '로그인에 실패했습니다.'));
    },
    ...restOptions,
  });
};

export const useSignOutMutation = (
  options?: Omit<
    UseMutationOptions<SignoutResponseDto, Error, SignoutRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: SignoutRequestDto) => signout(data),
    onMutate: () => {
      toast.loading('로그아웃 중...');
    },
    onSuccess: () => {
      toast.success('로그아웃되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, '로그아웃에 실패했습니다.'));
    },
    ...options,
  });
};
