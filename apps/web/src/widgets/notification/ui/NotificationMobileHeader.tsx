'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Bell, ErrorColored, HStack } from '@causw/cds';

import { useUnreadNotificationCnt } from '@/entities/notification';

import { ROUTES } from '@/shared/constants';
import { StatusDot, QueryErrorBoundary } from '@/shared/ui';

export function NotificationMobileHeader() {
  return (
    <HStack
      align="center"
      justify="between"
      className="h-[45px] w-full bg-gray-100 px-1 py-2"
    >
      <Image
        src="/images/ccssaa-logo.png"
        alt="CCSSAA 로고"
        width={112}
        height={17}
        priority
        unoptimized
        className="h-[17px] w-[112px]"
      />

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
  const { data } = useUnreadNotificationCnt();
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
