'use client';

import { Text, VStack } from '@causw/cds';

import {
  CommunityNotificationSection,
  EventNotificationSection,
  NoticeNotificationSection,
  OfficialAccountNotificationSection,
} from '@/widgets/setting';
import { SETTING_NOTIFICATIONS } from '@/widgets/setting/config';

import { ActionHeader } from '@/shared/ui';

export const SettingNotificationsPage = () => {
  return (
    <VStack gap="sm" className="w-full">
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

      <VStack gap="md" className="w-full px-4">
        <Text typography="title-22-bold">{SETTING_NOTIFICATIONS.title}</Text>

        <CommunityNotificationSection />
        <OfficialAccountNotificationSection />
        <NoticeNotificationSection />
        <EventNotificationSection />
      </VStack>
    </VStack>
  );
};
