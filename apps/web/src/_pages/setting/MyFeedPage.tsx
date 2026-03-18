'use client';

import { useRouter } from 'next/navigation';

import {
  buildMyFeedHref,
  MyActivityFeed,
  toActivityMode,
  toActivityTab,
  useMyActivityFeed,
} from '@/widgets/setting';

import { ActivityType } from '@/entities/setting';

import { useInfiniteScroll } from '@/shared/hooks';
import { QueryErrorBoundary } from '@/shared/ui/provider';

type SearchParams = {
  view?: string;
  mode?: string;
};

const ActivityContent = ({
  activeTab,
  mode,
  onBack,
  onTabChange,
}: {
  activeTab: ActivityType;
  mode: 'list' | 'empty';
  onBack: () => void;
  onTabChange: (tab: ActivityType) => void;
}) => {
  const {
    data,
    emptyMessage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMyActivityFeed(activeTab, mode);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <MyActivityFeed
      activeTab={activeTab}
      mode={mode}
      posts={posts}
      emptyMessage={emptyMessage}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={Boolean(hasNextPage)}
      targetRef={targetRef}
      onBack={onBack}
      onTabChange={onTabChange}
    />
  );
};

export const MyFeedPage = ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const router = useRouter();
  const activeTab = toActivityTab(searchParams?.view);
  const mode = toActivityMode(searchParams?.mode);

  const goBack = () => {
    router.replace('/setting');
  };

  const changeTab = (tab: ActivityType) => {
    router.replace(buildMyFeedHref(tab, mode));
  };

  return (
    <QueryErrorBoundary fallbackMessage="내 활동 데이터를 불러오지 못했어요.">
      <ActivityContent
        activeTab={activeTab}
        mode={mode}
        onBack={goBack}
        onTabChange={changeTab}
      />
    </QueryErrorBoundary>
  );
};
