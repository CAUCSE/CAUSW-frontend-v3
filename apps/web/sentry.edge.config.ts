import { initSentry } from '@causw/logger';

initSentry({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
