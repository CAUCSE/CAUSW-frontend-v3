import { NotificationListItem } from '@/features/notification';

import type { GetNotificationsResponseDto } from '@/entities/notification';

interface NotificationItemListProps {
  notifications: GetNotificationsResponseDto[];
}

export const NotificationItemList = ({
  notifications,
}: NotificationItemListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {notifications?.map((notification) => (
        <li key={notification.notificationLogId}>
          <NotificationListItem notification={notification} />
        </li>
      ))}
    </ul>
  );
};
