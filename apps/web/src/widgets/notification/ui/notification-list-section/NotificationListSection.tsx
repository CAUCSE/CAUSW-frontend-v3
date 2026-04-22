'use client';

import { useQueries } from '@tanstack/react-query';

import { Text, VStack } from '@causw/cds';

import {
  notificationQueryOptions,
  NotificationRetentionNotice,
} from '@/entities/notification';

import { NotificationItemList } from '../notification-item-list';

import { NotificationListSectionEmptyView } from './NotificationListSectionEmptyView';
import { NotificationListSectionLoadingView } from './NotificationListSectionLoadingView';

export const NotificationListSection = () => {
  const data = useQueries({
    queries: [
      {
        ...notificationQueryOptions.list({ isRead: false }),
      },
      {
        ...notificationQueryOptions.list({ isRead: true }),
      },
    ],
  });

  const isLoading = data.some((q) => q.isLoading);
  const unReadNotifications = data[0].data ?? [];
  const readNotifications = data[1].data ?? [];

  const isNotificationsEmpty =
    unReadNotifications.length === 0 && readNotifications.length === 0;

  // RSC prefetch 이후 잠깐의 로딩 지연 시간이 있음
  // 혹은 prefetch가 실패했을 때의 로딩 처리를 위해 이중 로딩 처리
  if (isLoading) {
    return <NotificationListSectionLoadingView />;
  }

  if (isNotificationsEmpty) {
    return <NotificationListSectionEmptyView />;
  }

  return (
    <VStack as="section" gap="md" className="px-4">
      <Text typography="title-22-bold" textColor="gray-700" className="pl-1">
        알림
      </Text>
      <NotificationItemList notifications={unReadNotifications} />
      {readNotifications.length > 0 && (
        <VStack gap="sm" className="mt-4">
          <Text typography="subtitle-16-bold" textColor="gray-700">
            지난 알림
          </Text>
          <NotificationItemList notifications={readNotifications} />
        </VStack>
      )}
      <NotificationRetentionNotice />
    </VStack>
  );
};
