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

/**
 * 소통 탭 상단 고정 영역.
 * 동문수첩/소통 전환 탭은 데이터 로딩/에러와 무관하게 항상 노출되고,
 * 게시판 목록에 의존하는 툴바만 자체 Suspense로 분리되어 스크롤 방향에 따라 접힌다.
 */
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
        <div className="min-h-0">
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
