'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { ApiError } from '@causw/api-client';

import { completeSocialRegistration } from '@/features/auth/api';

import { PHONE_NUMBER_DUPLICATED_ERROR_CODE } from '@/entities/auth';

import { toast } from '@/shared/model';
import { AuthOptionManager, TokenManager } from '@/shared/storage';
import {
  extractErrorMessage,
  isMobile,
  parseCustomErrorCode,
} from '@/shared/utils';

import { routeAfterSignIn } from '../../lib';

interface SocialRegistrationMutationOptions {
  onPhoneDuplicated?: () => void;
}

export const useSocialRegistrationMutation = ({
  onPhoneDuplicated,
}: SocialRegistrationMutationOptions = {}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: completeSocialRegistration,
    onMutate: () => {
      return { toastId: toast.loading('추가 정보를 저장하고 있어요...') };
    },
    onSuccess: async (data, _variables, context) => {
      toast.dismiss(context.toastId);
      if (isMobile) {
        await AuthOptionManager.setSessionPersist(true);
      }
      await TokenManager.setAccessToken(data.accessToken);
      await TokenManager.setRefreshToken(data.refreshToken);
      toast.success('추가 정보 입력이 완료되었습니다.');
      routeAfterSignIn(router, data.onboardingStatus);
    },
    onError: (error, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);

      if (
        onPhoneDuplicated &&
        error instanceof ApiError &&
        parseCustomErrorCode(error) === PHONE_NUMBER_DUPLICATED_ERROR_CODE
      ) {
        onPhoneDuplicated();
        return;
      }

      toast.error(
        extractErrorMessage(
          error,
          '추가 정보 입력에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    },
  });
};
