'use client';

import { useRouter } from 'next/navigation';

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { completeSocialRegistration } from '@/features/auth/api';

import type {
  AuthResponseDto,
  SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { toast } from '@/shared/model';
import { AuthOptionManager, TokenManager } from '@/shared/storage';
import { extractErrorMessage, isMobile } from '@/shared/utils';

import { routeAfterSignIn } from '../../lib';

type SocialRegistrationMutationOptions = Omit<
  UseMutationOptions<
    AuthResponseDto,
    Error,
    SocialLoginAdditionalInfoRequestDto
  >,
  'mutationFn'
>;

export const useSocialRegistrationMutation = (
  options?: SocialRegistrationMutationOptions,
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: completeSocialRegistration,
    onMutate: () => {
      toast.loading('추가 정보를 저장하고 있어요...');
    },
    onSuccess: async (data: AuthResponseDto) => {
      if (isMobile) {
        await AuthOptionManager.setSessionPersist(true);
      }
      await TokenManager.setAccessToken(data.accessToken);
      await TokenManager.setRefreshToken(data.refreshToken);
      toast.success('추가 정보 입력이 완료되었습니다.');
      routeAfterSignIn(router, data.onboardingStatus);
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '추가 정보 입력에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
    ...options,
  });
};
