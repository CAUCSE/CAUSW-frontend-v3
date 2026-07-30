'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Browser } from '@capacitor/browser';
import { PushNotifications } from '@capacitor/push-notifications';

import {
  getNotificationPopupLink,
  NOTIFICATION_LINK_TYPE,
} from '@/entities/notification';

import { isMobile } from '@/shared/utils';

export function PushNotificationDeepLinkProvider({
  children,
}: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) return;

    const listenerPromise = PushNotifications.addListener(
      'pushNotificationActionPerformed',
      ({ notification }) => {
        const data = notification.data ?? {};
        const { noticeType, targetId, targetParentId } = data;

        if (!noticeType) return;

        const link = getNotificationPopupLink({
          noticeType,
          targetId,
          targetParentId: targetParentId ?? '',
        });

        if (link.type === NOTIFICATION_LINK_TYPE.EXTERNAL) {
          void Browser.open({ url: link.url });
        } else {
          router.push(link.path);
        }
      },
    );

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [router]);

  return <>{children}</>;
}
