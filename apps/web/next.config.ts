import type { NextConfig } from 'next';

import { withSentryConfig } from '@causw/logger/config';

const nextConfig: NextConfig = {
  transpilePackages: ['@causw/logger'],
  allowedDevOrigins: ['10.0.2.2'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'caucse-s3-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSentryConfig<NextConfig>(nextConfig, 'causw');
