import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { kakaoLogin } from '@/features/auth/api/post/session';

import type {
  KakaoLoginRequestDto,
  KakaoLoginResponseDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const useKakaoLoginMutation = (
  options?: Omit<
    UseMutationOptions<KakaoLoginResponseDto, Error, KakaoLoginRequestDto>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: (data: KakaoLoginRequestDto) => kakaoLogin(data),
    onError: (error) => {
      toast.error(extractErrorMessage(error, '카카오 로그인에 실패했습니다.'));
    },
    ...options,
  });
};
