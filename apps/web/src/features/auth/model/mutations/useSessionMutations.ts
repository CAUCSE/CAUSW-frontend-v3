import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { signin, signout, signup } from '@/features/auth/api/post/session';

import type {
  SigninRequestDto,
  SignupRequestDto,
  SignoutRequestDto,
  SigninResponseDto,
  SignupResponseDto,
  SignoutResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type SignUpMutationOptions = Omit<
  UseMutationOptions<SignupResponseDto, Error, SignupRequestDto>,
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
    UseMutationOptions<SigninResponseDto, Error, SigninRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: SigninRequestDto) => signin(data),
    onError: (error) => {
      toast.error(extractErrorMessage(error, '로그인에 실패했습니다.'));
    },
    ...options,
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
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, '로그아웃에 실패했습니다.'));
    },
    ...options,
  });
};
