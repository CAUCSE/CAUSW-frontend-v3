'use client';

import { Button, HStack, mergeStyles } from '@causw/cds';

import {
  NOTIFICATION_TYPE,
  NotificationReadStatusIndicator,
  NotificationTimeLabel,
  NotificationTitle,
  NotificationTypeLabel,
  type GetNotificationsResponseDto,
} from '@/entities/notification';

import { useNotificationListItem } from '../../model';

interface NotificationListItemProps {
  notification: GetNotificationsResponseDto;
}

export const NotificationListItem = ({
  notification,
}: NotificationListItemProps) => {
  const { handleClickNotification } = useNotificationListItem();

  return (
    <Button
      className={mergeStyles(
        'relative flex h-fit w-full flex-col gap-2 rounded-lg bg-white px-4 py-4.5',
        notification.isRead &&
          notification.noticeType === NOTIFICATION_TYPE.SYSTEM.type &&
          'hover:bg-white!',
      )}
      onClick={() => handleClickNotification(notification)}
    >
      <NotificationReadStatusIndicator isRead={notification.isRead} />
      <HStack className="w-full items-center justify-between">
        <NotificationTypeLabel noticeType={notification.noticeType} />
        <NotificationTimeLabel createdAt={notification.createdAt} />
      </HStack>
      <NotificationTitle title={notification.title} />
    </Button>
  );
};
