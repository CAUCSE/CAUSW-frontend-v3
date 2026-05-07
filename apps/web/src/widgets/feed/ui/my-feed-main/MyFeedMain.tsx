'use client';

import { Tab } from '@causw/cds';

export const MyFeedMain = () => {
  return (
    <Tab.Root variant="chip" value="my-posts">
      <Tab.List>
        <Tab.TabItem value="my-posts">내가 쓴 글</Tab.TabItem>
        <Tab.TabItem value="my-comments">댓글 단 글</Tab.TabItem>
        <Tab.TabItem value="favorites">좋아요한 글</Tab.TabItem>
      </Tab.List>
    </Tab.Root>
  );
};
