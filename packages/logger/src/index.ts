import * as Sentry from '@sentry/nextjs';

interface SentryInitProps {
  dsn: string | undefined;
  options?: Sentry.BrowserOptions | Sentry.NodeOptions;
}

export const initSentry = ({ dsn, options = {} }: SentryInitProps) => {
  if (!dsn) return;

  const isProduction = process.env.NODE_ENV === 'production';

  const defaultOptions = {
    enabled: isProduction,
    tracesSampleRate: isProduction ? 0.1 : 1.0,
    enableLogs: isProduction ? false : true,
  };

  Sentry.init({
    dsn,
    ...defaultOptions,
    ...options,
  });
};

export const captureException = Sentry.captureException;

export const withServerActionInstrumentation =
  Sentry.withServerActionInstrumentation;

export const captureRequestError = Sentry.captureRequestError;

export const getTraceData = Sentry.getTraceData;
