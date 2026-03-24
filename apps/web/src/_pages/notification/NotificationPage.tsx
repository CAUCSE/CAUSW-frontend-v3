'use client';

import { useQueries } from '@tanstack/react-query';

import { Text, VStack } from '@causw/cds';

import {
  NotificationList,
  NotificationListActionHeader,
} from '@/widgets/notification';

import { notificationQueryOptions } from '@/entities/notification';

export function NotificationPage() {
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

  const isLoading = data.some((item) => item.isLoading);
  const unReadNotifications = data[0].data ?? [];
  const readNotifications = data[1].data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (!unReadNotifications) return <div>No data</div>;
  console.log(unReadNotifications);
  return (
    <div className="flex w-full justify-center">
      <VStack gap="sm" className="w-full max-w-225 p-4 md:px-8 md:py-6">
        <NotificationListActionHeader />
        <VStack as="section" gap="md" className="px-4">
          <Text typography="title-22-bold" textColor="gray-700">
            알림
          </Text>
        </VStack>
        <NotificationList notifications={unReadNotifications} />
        {readNotifications.length > 0 && (
          <VStack gap="sm" className="mt-4">
            <Text typography="subtitle-16-bold" textColor="gray-700">
              읽은 알림
            </Text>
            <NotificationList notifications={readNotifications} />
          </VStack>
        )}
      </VStack>
    </div>
  );
}
