import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { type MyFeedView } from '@/entities/feed';

import { SuspenseView } from '@/shared/ui';

import { MyFeedListServerComponent } from '../my-feed-list';
import { MyFeedViewTab } from '../my-feed-view-tab';

interface MyFeedMainProps {
  myFeedView: MyFeedView;
}

export const MyFeedMain = ({ myFeedView }: MyFeedMainProps) => {
  return (
    <VStack gap="none" className="h-0 min-h-0 flex-1 overflow-hidden">
      <MyFeedViewTab />
      <Suspense fallback={<SuspenseView />}>
        <MyFeedListServerComponent myFeedView={myFeedView} />
      </Suspense>
    </VStack>
  );
};
