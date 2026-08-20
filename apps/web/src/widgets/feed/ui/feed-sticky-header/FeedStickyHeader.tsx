'use client';

import { Suspense } from 'react';

import { mergeStyles, VStack } from '@causw/cds';

import {
  FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  FeedListToolbar,
} from '@/widgets/post-list';

import { useFeedViewMode } from '@/entities/feed';

import { useScrollDirectionVisibility } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

import { useFeedMain } from '../../model';
import { FeedHeader } from '../feed-header';

export const FeedStickyHeader = () => {
  const { isVisible: isToolbarVisible } = useScrollDirectionVisibility({
    containerClassName: FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  });

  return (
    <VStack gap="none" className="z-sticky sticky top-0 bg-white">
      <FeedHeader />
      <div
        className={mergeStyles(
          'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
          isToolbarVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <QueryErrorBoundary FallbackComponent={() => null}>
            <Suspense fallback={null}>
              <FeedToolbarSection />
            </Suspense>
          </QueryErrorBoundary>
        </div>
      </div>
    </VStack>
  );
};

const FeedToolbarSection = () => {
  const { data: boards, selectedTab, handleTabChange } = useFeedMain();
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
