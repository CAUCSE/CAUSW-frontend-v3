import { Text, Toggle, VStack } from '@causw/cds';

import { type CeremonyNotificationSettings } from '@/entities/notification';

import { SETTING_NOTIFICATIONS } from '../../config';

type EventNotificationSectionProps = {
  settings: CeremonyNotificationSettings;
};

export const EventNotificationSection = ({
  settings,
}: EventNotificationSectionProps) => {
  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.event.title}
      </Text>
      <VStack className="gap-6">
        <Toggle checked={settings.enabled} className="justify-between">
          <Toggle.Label typography="body-16-medium">
            경조사 알림 받기
          </Toggle.Label>
          <Toggle.Switch />
        </Toggle>
      </VStack>
    </VStack>
  );
};
