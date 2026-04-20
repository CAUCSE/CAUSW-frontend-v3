'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { toast } from '@/shared/model';
import { TokenManager, getNativeFCM, removeNativeFCM } from '@/shared/storage';
import { isMobile } from '@/shared/utils';

import { useSignOutMutation } from '../mutations';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOutMutation = useSignOutMutation();

  return async () => {
    toast.loading('로그아웃 중...');
    const fcmToken = isMobile ? await getNativeFCM() : '';

    try {
      await signOutMutation.mutateAsync({ fcmToken });
      toast.success('로그아웃되었습니다.');
    } catch {
    } finally {
      await TokenManager.removeAccessToken();
      await TokenManager.removeRefreshToken();
      if (isMobile) {
        await removeNativeFCM();
      }
      queryClient.clear();
      router.push('/auth/sign-in');
    }
  };
};
