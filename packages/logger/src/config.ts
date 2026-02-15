import { withSentryConfig as originalWithSentryConfig } from '@sentry/nextjs';

const defaultSentryOptions = {
  silent: !process.env.CI,
};

export const withSentryConfig = <T>(nextConfig: T, projectName: string) => {
  return originalWithSentryConfig(nextConfig, {
    ...defaultSentryOptions,
    org: 'causw',
    project: projectName,
  });
};
