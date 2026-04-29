'use client';

import { useRouter } from 'next/navigation';

import { TokenManager, getNativeFCM, removeNativeFCM } from '@/shared/storage';
import { isMobile } from '@/shared/utils';

import { useSignOutMutation } from '../mutations';

export const useLogout = () => {
  const router = useRouter();
  const signOutMutation = useSignOutMutation();

  return async () => {
    const fcmToken = isMobile ? await getNativeFCM() : '';

    await signOutMutation.mutateAsync({ fcmToken }).catch(() => {});

    await TokenManager.removeAccessToken();
    await TokenManager.removeRefreshToken();
    if (isMobile) {
      await removeNativeFCM();
    }
    await router.replace('/auth/sign-in');
  };
};
