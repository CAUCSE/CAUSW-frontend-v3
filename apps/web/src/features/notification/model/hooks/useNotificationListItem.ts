'use client';

import { useRouter } from 'next/navigation';

import {
  type GetNotificationsResponseDto,
  NOTIFICATION_TYPE,
} from '@/entities/notification';

import { ADMIN_BASE_URL } from '@/shared/config';

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

    if (
      notification.noticeType === NOTIFICATION_TYPE.COMMUNITY.type ||
      notification.noticeType === NOTIFICATION_TYPE.OFFICIAL.type
    ) {
      router.push(`/feed/${notification.targetId}`);
      return;
    }

    if (notification.noticeType === NOTIFICATION_TYPE.CEREMONY_V2.type) {
      router.push(`/ceremony/${notification.targetId}`);
      return;
    }

    if (notification.noticeType === NOTIFICATION_TYPE.SYSTEM.type) {
      if (notification.targetId) {
        window.location.href = `${ADMIN_BASE_URL}/events/${notification.targetId}`;
      } else {
        router.push('/notification');
      }
      return;
    }

    if (notification.noticeType === NOTIFICATION_TYPE.LOCKER.type) {
      router.push(`/locker/${notification.targetParentId}`);
      return;
    }
  };

  return {
    handleClickNotification,
  };
};
