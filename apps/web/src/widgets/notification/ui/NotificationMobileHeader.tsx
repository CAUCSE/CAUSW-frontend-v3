'use client';
import Link from 'next/link';

import { Bell, ErrorColored, HStack, Text } from '@causw/cds';

import { useNotificationUnreadCnt } from '@/entities/notification';

import { ROUTES } from '@/shared/constants';
import { StatusDot, QueryErrorBoundary } from '@/shared/ui';

export function NotificationMobileHeader() {
  return (
    <HStack className="w-full justify-between bg-gray-100 px-1 py-2">
      <Text typography="subtitle-18-bold" color="gray-400">
        크자회 Logo
      </Text>

      <QueryErrorBoundary
        FallbackComponent={() => (
          <Link href={ROUTES.NOTIFICATION} className="relative">
            <Bell size={24} color="gray-400" />
            <div className="absolute -top-1 -right-1">
              <ErrorColored size={12} />
            </div>
          </Link>
        )}
      >
        <NotificationBell />
      </QueryErrorBoundary>
    </HStack>
  );
}

function NotificationBell() {
  const { data } = useNotificationUnreadCnt();
  const hasUnreadNotification = (data?.notificationLogCount ?? 0) > 0;

  return (
    <Link href={ROUTES.NOTIFICATION} className="relative">
      <Bell size={24} color="gray-400" />
      <StatusDot
        show={hasUnreadNotification}
        top={-2}
        right={-1}
        className="h-[0.313rem] w-[0.313rem] bg-red-400"
      />
    </Link>
  );
}
