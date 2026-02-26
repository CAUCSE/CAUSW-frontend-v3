import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { googleLogin } from '@/features/auth/api/post/session';

import type {
  GoogleLoginRequestDto,
  GoogleLoginResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useGoogleLoginMutation = (
  options?: Omit<
    UseMutationOptions<GoogleLoginResponseDto, Error, GoogleLoginRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: GoogleLoginRequestDto) => googleLogin(data),
    onError: (error) => {
      toast.error(extractErrorMessage(error, 'Google 로그인에 실패했습니다.'));
    },
    ...options,
  });
};
