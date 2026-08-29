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
    <Tab.Root
      variant="chip"
      value={myFeedView}
      onValueChange={handleTabChange}
      className="shrink-0"
    >
      <Tab.List className="gap-1 overflow-visible">
        {Object.entries(MY_FEED_VIEW).map(([key, value]) => (
          <Tab.TabItem
            key={key}
            value={value}
            className="typo-body-14-semibold rounded-md px-2.5 py-1 aria-[selected=false]:text-gray-400 aria-[selected=false]:hover:bg-gray-200 aria-[selected=false]:active:bg-gray-200"
          >
            {MY_FEED_VIEW_LABEL[value]}
          </Tab.TabItem>
        ))}
      </Tab.List>
    </Tab.Root>
  );
};
