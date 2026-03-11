'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { TokenManager } from '@/shared/storage';
import {
  getClientAuthRefreshed,
  removeClientAuthRefreshed,
} from '@/shared/storage/auth/auth-storage';

export function AuthRefreshProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    if (!getClientAuthRefreshed()) {
      return;
    }

    TokenManager.setRefreshToken();
    removeClientAuthRefreshed();
  }, [pathname]);

  return <>{children}</>;
}
