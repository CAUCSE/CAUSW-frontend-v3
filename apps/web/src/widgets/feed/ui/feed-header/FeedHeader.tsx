'use client';

import { Suspense } from 'react';

import Link from 'next/link';

import { BellOutline, HStack, Search } from '@causw/cds';

import { ROUTES } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';

import {
  FeedChannelDropdownLoadingView,
  FeedChannelDropdownSection,
} from '../feed-channel-dropdown';

export const FeedHeader = () => {
  return (
    <HStack
      as="header"
      className="items-center justify-between px-5 py-2 md:px-0 md:pt-5"
    >
      <QueryErrorBoundary FallbackComponent={() => null}>
        <Suspense fallback={<FeedChannelDropdownLoadingView />}>
          <FeedChannelDropdownSection />
        </Suspense>
      </QueryErrorBoundary>
      <HStack gap="lg" align="center">
        <Link href={ROUTES.NOTIFICATION} aria-label="알림">
          <BellOutline size={20} color="gray-600" />
        </Link>
        <Link href={ROUTES.FEED_SEARCH} aria-label="검색">
          <Search size={20} color="gray-600" />
        </Link>
      </HStack>
    </HStack>
  );
};
