'use client';

import { Text, VStack } from '@causw/cds';

import {
  CommunityNotificationSection,
  EventNotificationSection,
  NoticeNotificationSection,
  OfficialAccountNotificationSection,
} from '@/widgets/setting';
import { SETTING_NOTIFICATIONS } from '@/widgets/setting/config';

import { useNotificationSettingsOptimisticMutations } from '@/features/notification';

import {
  type CommunityNotificationSettings,
  useNotificationSettings,
} from '@/entities/notification';

import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

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
  const {
    updateNotificationSettings,
    updateOfficialBoardNotification,
    isUpdatingNotificationSettings,
    isUpdatingOfficialBoards,
  } = useNotificationSettingsOptimisticMutations();

  return (
    <VStack gap="sm" className="w-full">
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

      <VStack gap="md" className="w-full px-4">
        <Text typography="title-22-bold">{SETTING_NOTIFICATIONS.title}</Text>

        <CommunityNotificationSection
          settings={settings.community}
          onToggle={(key, checked) => {
            if (isUpdatingNotificationSettings) return;

            const community = {
              [key]: checked,
            } as Partial<CommunityNotificationSettings>;

            updateNotificationSettings({ community });
          }}
        />
        <OfficialAccountNotificationSection
          boards={settings.officialBoards}
          onToggle={(boardId, subscribed) => {
            if (isUpdatingOfficialBoards) return;
            updateOfficialBoardNotification({ boardId, subscribed });
          }}
        />
        <NoticeNotificationSection
          settings={settings.service}
          onToggle={(checked) => {
            if (isUpdatingNotificationSettings) return;

            updateNotificationSettings({
              service: { noticeEnabled: checked },
            });
          }}
        />
        <EventNotificationSection
          settings={settings.ceremony}
          onToggle={(checked) => {
            if (isUpdatingNotificationSettings) return;

            updateNotificationSettings({
              ceremony: { enabled: checked },
            });
          }}
        />
      </VStack>
    </VStack>
  );
};
