import type { NextConfig } from 'next';

import { withSentryConfig } from '@causw/logger/config';

const nextConfig: NextConfig = {
  // 필요시 추가
};

export default withSentryConfig<NextConfig>(nextConfig, 'causw');
