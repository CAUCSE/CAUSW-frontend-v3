'use client';

import { Tab } from '@causw/cds';

import {
  isMyFeedView,
  MY_FEED_VIEW,
  MY_FEED_VIEW_LABEL,
  type MyFeedView,
  useMyFeedView,
} from '@/entities/feed';

export const MyFeedViewTab = () => {
  const { myFeedView, setMyFeedView } = useMyFeedView();

  const handleTabChange = (value: string) => {
    if (isMyFeedView(value)) {
      setMyFeedView(value as MyFeedView);
    } else {
      setMyFeedView(MY_FEED_VIEW.MY_POSTS);
    }
  };

  return (
    <div className="shrink-0 px-5 py-2">
      <Tab.Root
        variant="chip"
        value={myFeedView}
        onValueChange={handleTabChange}
      >
        <Tab.List>
          {Object.entries(MY_FEED_VIEW).map(([key, value]) => (
            <Tab.TabItem key={key} value={value}>
              {MY_FEED_VIEW_LABEL[key as keyof typeof MY_FEED_VIEW_LABEL]}
            </Tab.TabItem>
          ))}
        </Tab.List>
      </Tab.Root>
    </div>
  );
};
