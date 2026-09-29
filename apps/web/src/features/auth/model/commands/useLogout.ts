'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { resetMixpanelUser } from '@/shared/lib/analytics';
import {
  AuthOptionManager,
  TokenManager,
  getNativeFCM,
  removeNativeFCM,
} from '@/shared/storage';
import { isMobile } from '@/shared/utils';

import { useSignOutMutation } from '../mutations';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOutMutation = useSignOutMutation();

  return async () => {
    const fcmToken = isMobile ? await getNativeFCM() : '';

    await signOutMutation.mutateAsync({ fcmToken }).catch(() => {});

    resetMixpanelUser();
    queryClient.clear();

    await TokenManager.removeAccessToken();
    await TokenManager.removeRefreshToken();
    await AuthOptionManager.removeSessionPersist();
    if (isMobile) {
      await removeNativeFCM();
    }
    await router.replace('/auth/sign-in');
  };
};
