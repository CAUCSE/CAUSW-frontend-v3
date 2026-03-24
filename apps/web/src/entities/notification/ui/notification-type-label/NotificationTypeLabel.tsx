import { BellColored, HStack, Text } from '@causw/cds';

import { NOTIFICATION_TYPE } from '../../config';

interface NotificationTypeLabelProps {
  noticeType: keyof typeof NOTIFICATION_TYPE;
}

export const NotificationTypeLabel = ({
  noticeType,
}: NotificationTypeLabelProps) => {
  return (
    <HStack gap="xs" align="center">
      <BellColored size={20} />
      <Text typography="body-14-regular" textColor="gray-400">
        {NOTIFICATION_TYPE[noticeType].label}
      </Text>
    </HStack>
  );
};
