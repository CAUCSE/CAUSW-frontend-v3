import type { NextConfig } from 'next';

import { withSentryConfig } from '@causw/logger/config';

const nextConfig: NextConfig = {
  transpilePackages: ['@causw/logger'],
};

export default withSentryConfig<NextConfig>(nextConfig, 'causw');
