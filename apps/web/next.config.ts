import type { NextConfig } from 'next';

import { withSentryConfig } from '@causw/logger/config';

const nextConfig: NextConfig = {
  transpilePackages: ['@causw/logger'],
  allowedDevOrigins: ['10.0.2.2'],
};

export default withSentryConfig<NextConfig>(nextConfig, 'causw');
