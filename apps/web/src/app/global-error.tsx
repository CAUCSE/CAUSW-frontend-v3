'use client';

import { useEffect } from 'react';

import { captureException } from '@causw/logger';

import { ErrorView } from '@/shared/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen w-full items-center justify-center">
          <ErrorView
            error={error}
            resetErrorBoundary={reset}
            errorMessage="치명적인 오류가 발생했습니다."
          />
        </div>
      </body>
    </html>
  );
}
