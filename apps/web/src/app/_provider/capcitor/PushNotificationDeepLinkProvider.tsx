'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { PushNotifications } from '@capacitor/push-notifications';

import { getNotificationPopupLink } from '@/entities/notification';

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

        if (!noticeType || !targetId) return;

        const link = getNotificationPopupLink({
          noticeType,
          targetId,
          targetParentId: targetParentId ?? '',
        });

        if (/^https?:\/\//.test(link)) {
          window.location.href = link;
        } else {
          router.push(link);
        }
      },
    );

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [router]);

  return <>{children}</>;
}
