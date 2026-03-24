'use client';

import { Button, HStack } from '@causw/cds';

import { NotificationReadStatusIndicator } from '@/features/notification';

import {
  NotificationTimeLabel,
  NotificationTitle,
  NotificationTypeLabel,
  type GetNotificationsResponseDto,
} from '@/entities/notification';

interface NotificationListItemProps {
  notification: GetNotificationsResponseDto;
}

export const NotificationListItem = ({
  notification,
}: NotificationListItemProps) => {
  return (
    <Button className="relative flex h-fit w-full flex-col gap-2 rounded-lg bg-white px-4 py-4.5">
      <NotificationReadStatusIndicator isRead={notification.isRead} />
      <HStack className="w-full items-center justify-between">
        <NotificationTypeLabel noticeType={notification.noticeType} />
        <NotificationTimeLabel createdAt={notification.createdAt} />
      </HStack>
      <NotificationTitle title={notification.title} />
    </Button>
  );
};
