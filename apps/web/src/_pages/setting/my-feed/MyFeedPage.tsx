import { MyFeedHeader, MyFeedMain } from '@/widgets/feed';

import { type MyFeedView } from '@/entities/feed';

interface MyFeedPageProps {
  view: MyFeedView;
}

export const MyFeedPage = ({ view }: MyFeedPageProps) => {
  return (
    <div className="flex h-dvh min-h-0 w-full justify-center overflow-hidden">
      <div className="flex h-full min-h-0 w-full max-w-225 min-w-0 flex-col overflow-hidden">
        <MyFeedHeader />
        <MyFeedMain myFeedView={view} />
      </div>
    </div>
  );
};
