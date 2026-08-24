'use client';

import { Suspense } from 'react';

import { mergeStyles, VStack } from '@causw/cds';

import { AlumniContactsTab } from '@/widgets/alumni-contacts';
import {
  FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  FeedListToolbar,
} from '@/widgets/post-list';

import { useFeedViewMode } from '@/entities/feed';

import { useScrollDirectionVisibility } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

import { useCommunityMain } from '../../model';

export const CommunityStickyHeader = () => {
  const { isVisible: isToolbarVisible } = useScrollDirectionVisibility({
    containerClassName: FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  });

  return (
    <VStack gap="none" className="z-sticky sticky top-0 bg-white md:pt-5">
      <div className="px-4 md:px-0">
        <AlumniContactsTab />
      </div>
      <div
        className={mergeStyles(
          'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
          isToolbarVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div
          className={mergeStyles(
            'min-h-0 transition-opacity duration-150 ease-out',
            isToolbarVisible ? 'opacity-100' : 'opacity-0',
          )}
        >
          <QueryErrorBoundary FallbackComponent={() => null}>
            <Suspense fallback={null}>
              <CommunityToolbarSection />
            </Suspense>
          </QueryErrorBoundary>
        </div>
      </div>
    </VStack>
  );
};

const CommunityToolbarSection = () => {
  const { data: boards, selectedTab, handleTabChange } = useCommunityMain();
  const { feedViewMode, setFeedViewMode } = useFeedViewMode();

  return (
    <FeedListToolbar
      feedViewMode={feedViewMode}
      onFeedViewModeChange={setFeedViewMode}
      boards={boards}
      selectedTab={selectedTab}
      onSelectedTabChange={handleTabChange}
    />
  );
};
