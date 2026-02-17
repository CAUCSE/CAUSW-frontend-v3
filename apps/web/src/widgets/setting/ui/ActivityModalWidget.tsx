'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { ActivityMode, ActivityType } from '@/entities/setting';

import {
  buildPath,
  parseTabFromPath,
  toActivityMode,
  useMyActivityFeeds,
} from '../model';

import { MyActivityModalView } from './MyActivityModalView';

import { QueryErrorBoundary, SuspenseView } from '@/shared';

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
    <MyActivityModalView
      activeTab={activeTab}
      mode={mode}
      posts={currentFeed.posts}
      emptyMessage={currentFeed.emptyMessage}
      onBack={onBack}
      onTabChange={onTabChange}
    />
  );
};

export const RoutedMyActivityWidget = ({
  pathname,
  view,
}: {
  pathname: string;
  view?: string;
}) => {
  const router = useRouter();
  const activeTab = parseTabFromPath(pathname);
  const mode = toActivityMode(view);

  const goBack = () => {
    router.replace('/setting');
  };

  const changeTab = (tab: ActivityType) => {
    const base = buildPath(tab);
    const href = mode === 'empty' ? `${base}?view=empty` : base;
    router.replace(href);
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
