'use client';

import { Tab } from '@causw/cds';

import { PostCard, PostCardItem } from '@/entities/post';
import { ActivityMode, ActivityType } from '@/entities/setting';

import { ActionHeader, NoDataView } from '@/shared';

const TABS: Array<{ key: ActivityType; label: string }> = [
  { key: 'my-posts', label: '내가 쓴 글' },
  { key: 'my-comments', label: '댓글 단 글' },
  { key: 'favorites', label: '찜한 글' },
];

type Props = {
  activeTab: ActivityType;
  mode: ActivityMode;
  posts: PostCardItem[];
  emptyMessage: string;
  onBack: () => void;
  onTabChange: (tab: ActivityType) => void;
};

export const MyActivityFeed = ({
  activeTab,
  mode,
  posts,
  emptyMessage,
  onBack,
  onTabChange,
}: Props) => {
  return (
    <div>
      <div className="mx-auto w-full pb-6 md:px-8 md:pt-6">
        <ActionHeader
          isSticky={true}
          background="transparent"
          buttonColor="gray"
        >
          <ActionHeader.BackButton onClick={onBack}>
            뒤로
          </ActionHeader.BackButton>
          <div />
        </ActionHeader>

        <section className="px-5 py-2">
          <Tab
            variant="chip"
            value={activeTab}
            onValueChange={(value) => onTabChange(value as ActivityType)}
          >
            <Tab.List>
              {TABS.map((tab) => (
                <Tab.TabItem key={tab.key} value={tab.key}>
                  {tab.label}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        </section>

        {mode === 'empty' || posts.length === 0 ? (
          <section className="px-4 py-30 md:py-35">
            <NoDataView message={emptyMessage} />
          </section>
        ) : (
          <section className="px-4 py-2">
            <div className="flex flex-col gap-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
