'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import {
  buildMyFeedHref,
  MyActivityFeed,
  toActivityMode,
  toActivityTab,
  useMyActivityFeeds,
} from '@/widgets/setting';

import { type ActivityMode, type ActivityType } from '@/entities/setting';

import { SuspenseView } from '@/shared/ui';
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
  mode: ActivityMode;
  onBack: () => void;
  onTabChange: (tab: ActivityType) => void;
}) => {
  const activityFeeds = useMyActivityFeeds(mode);
  const currentFeed = activityFeeds[activeTab];

  return (
    <MyActivityFeed
      activeTab={activeTab}
      mode={mode}
      posts={currentFeed.posts}
      emptyMessage={currentFeed.emptyMessage}
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
      <Suspense fallback={<SuspenseView />}>
        <ActivityContent
          activeTab={activeTab}
          mode={mode}
          onBack={goBack}
          onTabChange={changeTab}
        />
      </Suspense>
    </QueryErrorBoundary>
  );
};
