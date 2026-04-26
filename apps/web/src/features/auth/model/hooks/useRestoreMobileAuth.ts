'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { TokenManager } from '@/shared/storage';
import { isMobile } from '@/shared/utils';

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
        router.replace('/home');
        return;
      }
    };

    void bootstrapMobileAuth();
  }, [router]);
};
