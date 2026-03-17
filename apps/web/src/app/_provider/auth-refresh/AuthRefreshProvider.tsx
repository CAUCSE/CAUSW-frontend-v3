'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { TokenManager } from '@/shared/storage';

export function AuthRefreshProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    if (!TokenManager.getAuthRefreshed()) {
      return;
    }

    TokenManager.setRefreshToken();
    TokenManager.removeAuthRefreshed();
  }, [pathname]);

  return <>{children}</>;
}
