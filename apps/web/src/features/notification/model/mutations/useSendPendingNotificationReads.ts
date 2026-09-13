'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationQueryKeys } from '@/entities/notification';

import { TokenManager } from '@/shared/storage';

import { patchNotificationReadStatus } from '../../api';
import {
  consumePendingNotificationReads,
  hasPendingNotificationReads,
  restorePendingNotificationReads,
  type PendingNotificationRead,
} from '../../lib';

export const useSendPendingNotificationReads = () => {
  const queryClient = useQueryClient();

  const { mutate: sendPendingNotificationReads } = useMutation({
    mutationFn: async () => {
      if (!hasPendingNotificationReads()) return false;

      const accessToken = await TokenManager.getAccessToken();
      if (!accessToken) return false;

      const pendingReadNotifications = consumePendingNotificationReads();
      const failedReads: PendingNotificationRead[] = [];
      let hasAnySucceeded = false;

      for (const pendingRead of pendingReadNotifications) {
        try {
          await patchNotificationReadStatus({ id: pendingRead.id });
          hasAnySucceeded = true;
        } catch {
          failedReads.push(pendingRead);
        }
      }

      restorePendingNotificationReads(failedReads);

      return hasAnySucceeded;
    },
    onSuccess: (hasAnySucceeded) => {
      if (!hasAnySucceeded) return;

      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });

  return { sendPendingNotificationReads };
};
