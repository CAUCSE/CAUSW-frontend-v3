'use client';

import { Suspense } from 'react';

import Link from 'next/link';

import { HStack, Search, VStack } from '@causw/cds';

import { AlumniContactsCommunityTab } from '@/features/alumni';

import { ROUTES } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';

import { CommunityCollapsibleHeader } from '../community-collapsible-header';
import { CommunityToolbarSection } from '../community-toolbar-section';

export const CommunityStickyHeader = () => {
  return (
    <VStack gap="none" className="z-sticky sticky top-0 bg-white md:pt-5">
      <HStack justify="between" className="px-4 md:px-0">
        <AlumniContactsCommunityTab />
        <Link href={ROUTES.COMMUNITY_SEARCH} aria-label="검색">
          <Search size={20} color="gray-600" />
        </Link>
      </HStack>

      <CommunityCollapsibleHeader>
        <QueryErrorBoundary FallbackComponent={() => null}>
          <Suspense fallback={null}>
            <CommunityToolbarSection />
          </Suspense>
        </QueryErrorBoundary>
      </CommunityCollapsibleHeader>
    </VStack>
  );
};
