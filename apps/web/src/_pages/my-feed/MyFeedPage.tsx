import { HStack } from '@causw/cds';

import { MyFeedHeader, MyFeedMain } from '@/widgets/feed';

import { type MyFeedView } from '@/entities/feed';

interface MyFeedPageProps {
  view: MyFeedView;
}

export const MyFeedPage = ({ view }: MyFeedPageProps) => {
  return (
    <HStack className="size-full min-h-0 justify-center overflow-hidden">
      <div className="flex h-full min-h-0 w-full max-w-225 min-w-0 flex-col overflow-hidden md:p-5 md:pt-0">
        <MyFeedHeader />
        <MyFeedMain myFeedView={view} />
      </div>
    </HStack>
  );
};
