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

        router.push(
          getNotificationPopupLink({
            noticeType,
            targetId,
            targetParentId: targetParentId ?? '',
          }),
        );
      },
    );

    return () => {
      void listenerPromise.then((listener) => listener.remove());
    };
  }, [router]);

  return <>{children}</>;
}
