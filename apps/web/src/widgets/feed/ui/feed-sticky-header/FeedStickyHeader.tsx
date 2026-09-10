'use client';

import { Suspense } from 'react';

import { mergeStyles, VStack } from '@causw/cds';

import {
  POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  PostListToolbar,
  useCategoryTabSelection,
} from '@/widgets/post-list';

import {
  POST_CATEGORY_FILTER_LIST,
  POST_CATEGORY_LABEL,
  usePostViewMode,
} from '@/entities/post';

import { useScrollDirectionVisibility } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

import { FeedHeader } from '../feed-header';

/**
 * PostCategory를 Board 모양({id: category, name: label})으로 변환해
 * PostBoardTabs에서 재사용하기 위한 목적
 */
const FEED_CATEGORY_TAB_ITEMS = POST_CATEGORY_FILTER_LIST.map((category) => ({
  id: category,
  name: POST_CATEGORY_LABEL[category],
}));

export const FeedStickyHeader = () => {
  const { isVisible: isToolbarVisible } = useScrollDirectionVisibility({
    containerClassName: POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
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
        <div
          className={mergeStyles(
            'min-h-0 min-w-0 transition-opacity duration-150 ease-out',
            isToolbarVisible ? 'opacity-100' : 'opacity-0',
          )}
        >
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
  const { postViewMode, setPostViewMode } = usePostViewMode();
  const { selectedTab, handleTabChange } = useCategoryTabSelection();

  return (
    <PostListToolbar
      postViewMode={postViewMode}
      onPostViewModeChange={setPostViewMode}
      boards={FEED_CATEGORY_TAB_ITEMS}
      selectedTab={selectedTab}
      onSelectedTabChange={handleTabChange}
    />
  );
};
