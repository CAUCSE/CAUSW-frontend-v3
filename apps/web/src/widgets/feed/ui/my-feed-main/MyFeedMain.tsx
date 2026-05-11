import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { MY_FEED_VIEW_LABEL, type MyFeedView } from '@/entities/feed';

import { QueryErrorBoundary, SuspenseView } from '@/shared/ui';

import { MyFeedListServerComponent } from '../my-feed-list';
import { MyFeedViewTab } from '../my-feed-view-tab';

interface MyFeedMainProps {
  myFeedView: MyFeedView;
}

export const MyFeedMain = ({ myFeedView }: MyFeedMainProps) => {
  return (
    <VStack gap="none" className="h-0 min-h-0 flex-1 overflow-hidden">
      <MyFeedViewTab />
      <QueryErrorBoundary
        fallbackMessage={`${MY_FEED_VIEW_LABEL[myFeedView]} 목록을 불러오지 못했어요.`}
      >
        <Suspense fallback={<SuspenseView />}>
          <MyFeedListServerComponent myFeedView={myFeedView} />
        </Suspense>
      </QueryErrorBoundary>
    </VStack>
  );
};
