import * as Sentry from '@sentry/nextjs';

export * from './types';
export * from './lib';

interface SentryInitProps {
  dsn: string | undefined;
  options?: Sentry.BrowserOptions | Sentry.NodeOptions;
}

export const initSentry = ({ dsn, options = {} }: SentryInitProps) => {
  if (!dsn) return;

  const isProduction = process.env.NODE_ENV === 'production';

  const defaultOptions = {
    enabled: isProduction,
    tracesSampleRate: 0.1,
    enableLogs: !isProduction,
  };

  Sentry.init({
    dsn,
    ...defaultOptions,
    ...options,
  });
};
