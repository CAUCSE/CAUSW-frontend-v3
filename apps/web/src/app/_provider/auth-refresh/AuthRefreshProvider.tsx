'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { TokenManager } from '@/shared/storage';

export function AuthRefreshProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    const syncRefreshToken = async () => {
      const authRefreshed = await TokenManager.getAuthRefreshed();
      if (!authRefreshed) {
        return;
      }

      await TokenManager.syncTokens();
      await TokenManager.removeAuthRefreshed();
    };

    void syncRefreshToken();
  }, [pathname]);

  return <>{children}</>;
}
