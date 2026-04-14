'use client';

import { type RefObject } from 'react';

import { Tab } from '@causw/cds';

import {
  type ActivityMode,
  type ActivityType,
  type MyActivityPostItem,
} from '@/entities/setting';

import { ActionHeader, NoDataView, SuspenseView } from '@/shared/ui';

import { ACTIVITY_TABS } from '../model';

import { MyActivityPostContent } from './MyActivityPostContent';

type Props = {
  activeTab: ActivityType;
  mode: ActivityMode;
  posts: MyActivityPostItem[];
  emptyMessage: string;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onTabChange: (tab: ActivityType) => void;
};

export const MyActivityFeed = ({
  activeTab,
  mode,
  posts,
  emptyMessage,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  targetRef,
  onBack,
  onTabChange,
}: Props) => {
  const showEmpty = !isLoading && (mode === 'empty' || posts.length === 0);

  return (
    <div className="w-full pb-6 md:pb-0">
      <div className="w-full">
        <ActionHeader isSticky={true} background="gray" buttonColor="gray">
          <ActionHeader.BackButton onClick={onBack}>
            뒤로
          </ActionHeader.BackButton>
          <div />
        </ActionHeader>

        <section className="px-5 py-2 md:px-5">
          <Tab
            variant="chip"
            value={activeTab}
            onValueChange={(value) => onTabChange(value as ActivityType)}
          >
            <Tab.List>
              {ACTIVITY_TABS.map((tab) => (
                <Tab.TabItem key={tab.key} value={tab.key}>
                  {tab.label}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        </section>

        {isLoading ? (
          <section className="px-4 py-20">
            <SuspenseView />
          </section>
        ) : showEmpty ? (
          <section className="px-4 py-30 md:px-4 md:py-35">
            <NoDataView>
              <NoDataView.Icon />
              <NoDataView.Message>{emptyMessage}</NoDataView.Message>
            </NoDataView>
          </section>
        ) : (
          <section className="px-4 py-2 md:px-4">
            <div className="flex flex-col gap-2">
              {posts.map((post) => (
                <MyActivityPostContent key={post.postId} post={post} />
              ))}

              {!isFetchingNextPage && hasNextPage && (
                <div ref={targetRef} className="h-3 w-full" />
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <SuspenseView />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
