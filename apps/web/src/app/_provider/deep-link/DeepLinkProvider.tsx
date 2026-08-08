'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/navigation';

import { App } from '@capacitor/app';

import { savePendingDestination } from '@/features/auth';

import { isMobile } from '@/shared/utils';

import { toInternalPath } from './toInternalPath';

export function DeepLinkProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) return;

    const routeFromUrl = (url: string) => {
      const path = toInternalPath(url);
      if (!path) return;
      savePendingDestination(path);
      router.replace(path);
    };

    const listenerPromise = App.addListener('appUrlOpen', ({ url }) => {
      routeFromUrl(url);
    });

    void App.getLaunchUrl().then((result) => {
      if (result?.url) routeFromUrl(result.url);
    });

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [router]);

  return <>{children}</>;
}
