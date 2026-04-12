'use client';

import { type PropsWithChildren, Suspense, use } from 'react';

import { Capacitor } from '@capacitor/core';

import { ENVIRONMENT } from '@/shared/config';

declare global {
  interface ImportMeta {
    hot?: {
      dispose(cb: () => void): void;
    };
  }
}
const isBrowser = typeof window !== 'undefined';
const isNativePlatform = isBrowser && Capacitor.isNativePlatform();

const shouldStartMSW =
  ENVIRONMENT === 'development' && isBrowser && !isNativePlatform;
const startMockWorkerPromise = shouldStartMSW
  ? import('./browser').then(async ({ worker }) => {
      await worker.start({
        onUnhandledRequest(request, print) {
          if (request.url.includes('_next')) {
            return;
          }
          print.warning();
        },
      });

      // HMR 시 worker 중지 (handler 중복 등록 방지)
      import.meta.hot?.dispose(() => {
        worker.stop();
      });
    })
  : Promise.resolve();

const MSWPromise = ({ children }: PropsWithChildren) => {
  use(startMockWorkerPromise);
  return children;
};

export const MSWComponent = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={null}>
      <MSWPromise>{children}</MSWPromise>
    </Suspense>
  );
};
