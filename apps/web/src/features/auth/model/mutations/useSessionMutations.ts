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

export const useSignUpMutation = (
  options?: Omit<
    UseMutationOptions<SignupResponseDto, Error, SignupRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: SignupRequestDto) => signup(data),
    onError: () => {
      toast.error('회원가입에 실패했습니다.');
    },
    ...options,
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
    onError: () => {
      toast.error('로그아웃에 실패했습니다.');
    },
    ...options,
  });
};
