import { initSentry } from '@causw/logger';
import {
  captureRouterTransitionStart,
  replayIntegration,
} from '@causw/logger/client';

const sentryOptions = {
  integrations: [replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
};

initSentry({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  options: sentryOptions,
});

export const onRouterTransitionStart = captureRouterTransitionStart;
