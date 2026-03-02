'use client';

import { PropsWithChildren, Suspense, use } from 'react';

declare global {
  interface ImportMeta {
    hot?: {
      dispose(cb: () => void): void;
    };
  }
}

const startMockWorkerPromise =
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
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
