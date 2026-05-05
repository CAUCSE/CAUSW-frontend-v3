import { captureRequestError } from '@causw/logger';

import { ENVIRONMENT } from '@/shared/config';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
    if (ENVIRONMENT === 'development' || ENVIRONMENT === 'local') {
      const { server } = await import('./app/_mock/server');
      server.listen();
      console.log('Server Mock Started');
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = captureRequestError;
