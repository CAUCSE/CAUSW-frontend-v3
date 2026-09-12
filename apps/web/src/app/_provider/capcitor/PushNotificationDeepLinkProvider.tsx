'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Browser } from '@capacitor/browser';
import { PushNotifications } from '@capacitor/push-notifications';

import { savePendingDestination } from '@/features/auth';
import {
  savePendingNotificationRead,
  useSendPendingNotificationReads,
} from '@/features/notification';

import {
  getNotificationPopupLink,
  NOTIFICATION_LINK_TYPE,
} from '@/entities/notification';

import { isMobile } from '@/shared/utils';

export function PushNotificationDeepLinkProvider({
  children,
}: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { sendPendingNotificationReads } = useSendPendingNotificationReads();

  useEffect(() => {
    if (!isMobile) return;

    const listenerPromise = PushNotifications.addListener(
      'pushNotificationActionPerformed',
      ({ notification }) => {
        const data = notification.data ?? {};
        const { noticeType, targetId, targetParentId, notificationLogId } =
          data;

        if (!noticeType) return;

        if (notificationLogId) {
          savePendingNotificationRead(notificationLogId);
          sendPendingNotificationReads();
        }

        const link = getNotificationPopupLink({
          noticeType,
          targetId,
          targetParentId: targetParentId ?? '',
        });

        if (link.type === NOTIFICATION_LINK_TYPE.EXTERNAL) {
          void Browser.open({ url: link.url });
        } else {
          savePendingDestination(link.path);
          router.push(link.path);
        }
      },
    );

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [router, sendPendingNotificationReads]);

  // 콜드 스타트에서는 리스너 실행 시점에 토큰이 없어, 경로가 바뀔 때 다시 시도한다.
  useEffect(() => {
    if (!isMobile) return;

    sendPendingNotificationReads();
  }, [pathname, sendPendingNotificationReads]);

  return <>{children}</>;
}
