'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { notifyAppReady } from '@/shared/lib';
import { AuthOptionManager, TokenManager } from '@/shared/storage';
import { isMobile } from '@/shared/utils';

import { consumePendingDestination } from '../../lib';

export const useRestoreMobileAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const bootstrapMobileAuth = async () => {
      if (!isMobile) {
        return;
      }

      const accessToken = await TokenManager.getAccessToken();
      const refreshToken = await TokenManager.getRefreshToken();

      if (accessToken && refreshToken) {
        // 이동 전에 기록 (이동 후 refresh된 토큰 덮어쓰기 방지)
        await AuthOptionManager.setSessionPersist(true);
        await TokenManager.restoreClientTokens(accessToken, refreshToken);
        router.replace(consumePendingDestination() ?? '/home');
        return;
      }

      notifyAppReady();
    };

    void bootstrapMobileAuth();
  }, [router]);
};
