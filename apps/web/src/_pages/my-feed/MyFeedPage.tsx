import { HStack, VStack } from '@causw/cds';

import { MyFeedHeader, MyFeedListToolbar, MyFeedMain } from '@/widgets/my-feed';

import { type MyFeedView } from '@/entities/my-feed';

interface MyFeedPageProps {
  view: MyFeedView;
}

export const MyFeedPage = ({ view }: MyFeedPageProps) => {
  return (
    <HStack className="size-full min-h-0 justify-center overflow-hidden md:overflow-visible">
      <div className="flex h-full min-h-0 w-full max-w-225 min-w-0 flex-col">
        <VStack gap="none" className="z-sticky sticky top-0 shrink-0 bg-white">
          <MyFeedHeader />
          <MyFeedListToolbar />
        </VStack>
        <MyFeedMain myFeedView={view} />
      </div>
    </HStack>
  );
};
