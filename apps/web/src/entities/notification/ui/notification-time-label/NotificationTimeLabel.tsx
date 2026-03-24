import { Text } from '@causw/cds';

import { formatTimeDifference } from '@/shared/lib';

interface NotificationTimeLabelProps {
  createdAt: string;
}

export const NotificationTimeLabel = ({
  createdAt,
}: NotificationTimeLabelProps) => {
  return (
    <Text typography="body-14-regular" textColor="gray-400">
      {formatTimeDifference(createdAt)}
    </Text>
  );
};
