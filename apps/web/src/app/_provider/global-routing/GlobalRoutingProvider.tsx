'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { savePendingDestination } from '@/features/auth';

import { useResetAlumniContactsFilter } from '@/entities/alumni-contacts';

import { resetMixpanelUser } from '@/shared/lib/analytics';
import { toast, useAuthStore } from '@/shared/model';

export function GlobalRoutingProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const authError = useAuthStore((state) => state.authError);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);
  useResetAlumniContactsFilter();

  useEffect(() => {
    if (!authError) return;
    if (authError.errorType === 'token-expired') {
      toast.error(authError.message);
      const destination = pathname ?? '/home';
      savePendingDestination(destination);
      resetMixpanelUser();
      queryClient.clear();
      router.replace(
        `/auth/sign-in?callbackUrl=${encodeURIComponent(destination)}`,
      );
    }
    clearAuthError();
  }, [authError, clearAuthError, pathname, queryClient, router]);

  return <>{children}</>;
}
