import { captureRequestError } from '@causw/logger';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
    if (process.env.NODE_ENV === 'development') {
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
