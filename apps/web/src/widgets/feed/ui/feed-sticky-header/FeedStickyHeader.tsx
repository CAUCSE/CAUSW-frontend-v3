'use client';

import { Suspense } from 'react';

import { noop } from 'es-toolkit';

import { mergeStyles, VStack } from '@causw/cds';

import {
  FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  FEED_LIST_TAB,
  FeedListToolbar,
} from '@/widgets/post-list';

import { useFeedViewMode } from '@/entities/feed';

import { useScrollDirectionVisibility } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui';

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
  const { feedViewMode, setFeedViewMode } = useFeedViewMode();

  return (
    <FeedListToolbar
      feedViewMode={feedViewMode}
      onFeedViewModeChange={setFeedViewMode}
      // 채널(게시판) 선택은 헤더 드롭다운이 담당한다.
      // 칩 탭은 선택된 채널 내부의 세부 카테고리 축이라 채널 상태와 분리되어야 하며,
      // 아직 해당 API가 없어 '전체'만 고정으로 노출한다.
      // TODO: 세부 카테고리 API가 추가되면 목록과 선택 핸들러를 연결
      boards={[]}
      selectedTab={FEED_LIST_TAB.ALL}
      onSelectedTabChange={noop}
    />
  );
};
