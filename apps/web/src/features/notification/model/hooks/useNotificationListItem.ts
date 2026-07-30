'use client';

import { useRouter } from 'next/navigation';

import { Browser } from '@capacitor/browser';

import {
  getNotificationPopupLink,
  NOTIFICATION_LINK_TYPE,
  type GetNotificationsResponseDto,
} from '@/entities/notification';

import { usePatchNotificationReadStatus } from '../mutations';

export const useNotificationListItem = () => {
  const router = useRouter();
  const { changeNotificationReadStatus } = usePatchNotificationReadStatus();

  const handleClickNotification = (
    notification: GetNotificationsResponseDto,
  ) => {
    if (!notification.isRead) {
      changeNotificationReadStatus(notification.notificationLogId);
    }

    const link = getNotificationPopupLink(notification);

    if (link.type === NOTIFICATION_LINK_TYPE.EXTERNAL) {
      void Browser.open({ url: link.url });
    } else {
      router.push(link.path);
    }
  };

  return {
    handleClickNotification,
  };
};
