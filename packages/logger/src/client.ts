import * as Sentry from '@sentry/nextjs';

export const captureRouterTransitionStart = Sentry.captureRouterTransitionStart;
export const replayIntegration = Sentry.replayIntegration;
