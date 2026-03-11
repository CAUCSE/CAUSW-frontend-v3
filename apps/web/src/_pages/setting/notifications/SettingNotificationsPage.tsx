'use client';

import { Text, VStack } from '@causw/cds';

import {
  CommunityNotificationSection,
  EventNotificationSection,
  NoticeNotificationSection,
  OfficialAccountNotificationSection,
} from '@/widgets/setting';
import { SETTING_NOTIFICATIONS } from '@/widgets/setting/config';

import { useNotificationSettings } from '@/entities/notification';

import { ActionHeader, HydrationSuspense, SuspenseView } from '@/shared/ui';
import { QueryErrorBoundary } from '@/shared/ui/provider';

export const SettingNotificationsPage = () => {
  return (
    <QueryErrorBoundary fallbackMessage="알림 설정 데이터를 불러오지 못했어요.">
      <HydrationSuspense fallback={<SuspenseView />}>
        <SettingNotificationContent />
      </HydrationSuspense>
    </QueryErrorBoundary>
  );
};

const SettingNotificationContent = () => {
  const { data: settings } = useNotificationSettings();

  return (
    <VStack gap="sm" className="w-full">
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

      <VStack gap="md" className="w-full px-4">
        <Text typography="title-22-bold">{SETTING_NOTIFICATIONS.title}</Text>

        <CommunityNotificationSection settings={settings.community} />
        <OfficialAccountNotificationSection boards={settings.officialBoards} />
        <NoticeNotificationSection settings={settings.service} />
        <EventNotificationSection settings={settings.ceremony} />
      </VStack>
    </VStack>
  );
};
