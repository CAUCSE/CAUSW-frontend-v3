'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { TokenManager, getNativeFCM, removeNativeFCM } from '@/shared/storage';
import { isMobile } from '@/shared/utils';

import { useSignOutMutation } from '../mutations';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOutMutation = useSignOutMutation();

  return async () => {
    const fcmToken = isMobile ? await getNativeFCM() : '';

    await signOutMutation.mutateAsync({ fcmToken }).catch(() => {});

    await TokenManager.removeAccessToken();
    await TokenManager.removeRefreshToken();
    if (isMobile) {
      await removeNativeFCM();
    }
    queryClient.clear();
    router.push('/auth/sign-in');
  };
};
