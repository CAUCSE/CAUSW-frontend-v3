import { Text, Toggle, VStack } from '@causw/cds';

import { type ServiceNotificationSettings } from '@/entities/notification';

import { SETTING_NOTIFICATIONS } from '../../config';

type NoticeNotificationSectionProps = {
  settings: ServiceNotificationSettings;
  onToggle: (checked: boolean) => void;
};

export const NoticeNotificationSection = ({
  settings,
  onToggle,
}: NoticeNotificationSectionProps) => {
  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.notice.title}
      </Text>
      <VStack className="gap-6">
        <Toggle
          checked={settings.noticeEnabled}
          onCheckedChange={(checked) => onToggle(Boolean(checked))}
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">
            서비스 공지, 계정 상태
          </Toggle.Label>
          <Toggle.Switch />
        </Toggle>
      </VStack>
    </VStack>
  );
};
