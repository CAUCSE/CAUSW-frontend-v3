import { VStack } from '@causw/cds';

import { MyFeedHeader, MyFeedMain } from '@/widgets/feed';

export const MyFeedPage = () => {
  return (
    <VStack>
      <MyFeedHeader />
      <MyFeedMain />
    </VStack>
  );
};
