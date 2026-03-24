import type { GetNotificationsResponseDto } from '@/entities/notification';

import { NotificationListItem } from '../notification-list-item';

interface NotificationListProps {
  notifications: GetNotificationsResponseDto[];
}

export const NotificationList = ({ notifications }: NotificationListProps) => {
  return notifications?.map((notification) => (
    <NotificationListItem
      key={notification.notificationLogId}
      notification={notification}
    />
  ));
};
