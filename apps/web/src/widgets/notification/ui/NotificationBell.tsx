'use client';
import Link from 'next/link';

import { Bell, ErrorColored } from '@causw/cds';

import { useUnreadNotificationCnt } from '@/entities/notification';

import { ROUTES } from '@/shared/constants';
import { useIsMounted } from '@/shared/hooks';
import { StatusDot, QueryErrorBoundary } from '@/shared/ui';

const bellLinkClass =
  'relative inline-flex size-11 items-center justify-center';

export function NotificationBell() {
  return (
    <QueryErrorBoundary
      FallbackComponent={() => (
        <Link
          href={ROUTES.NOTIFICATION}
          aria-label="알림"
          className={bellLinkClass}
        >
          <Bell size={24} color="gray-400" />
          <span className="absolute top-1 right-1">
            <ErrorColored size={12} />
          </span>
        </Link>
      )}
    >
      <UnreadNotificationBell />
    </QueryErrorBoundary>
  );
}

function UnreadNotificationBell() {
  const isMounted = useIsMounted();
  const { data } = useUnreadNotificationCnt();
  const hasUnreadNotification =
    isMounted && (data?.notificationLogCount ?? 0) > 0;

  return (
    <Link
      href={ROUTES.NOTIFICATION}
      aria-label={hasUnreadNotification ? '알림, 읽지 않은 알림 있음' : '알림'}
      className={bellLinkClass}
    >
      <Bell size={24} color="gray-400" />
      <StatusDot
        show={hasUnreadNotification}
        top={8}
        right={8}
        className="h-[0.313rem] w-[0.313rem] bg-red-400"
      />
    </Link>
  );
}
