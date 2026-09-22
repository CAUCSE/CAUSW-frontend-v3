'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { isApiError } from '@causw/api-client';

import { notificationQueryKeys } from '@/entities/notification';

import { TokenManager } from '@/shared/storage';

import { patchNotificationReadStatus } from '../../api';
import {
  getPendingNotificationReads,
  hasPendingNotificationReads,
  recordPendingNotificationReadFailure,
  removePendingNotificationRead,
} from '../../lib/pendingNotificationRead';

export const useSendPendingNotificationReads = () => {
  const queryClient = useQueryClient();

  const { mutate: sendPendingNotificationReads } = useMutation({
    mutationFn: async () => {
      if (!hasPendingNotificationReads()) return false;

      const accessToken = await TokenManager.getAccessToken();
      if (!accessToken) return false;

      let hasAnySucceeded = false;

      for (const pendingRead of getPendingNotificationReads()) {
        try {
          await patchNotificationReadStatus({ id: pendingRead.id });
          removePendingNotificationRead(pendingRead.id);
          hasAnySucceeded = true;
        } catch (error) {
          if (isApiError(error) && error.status !== undefined) {
            recordPendingNotificationReadFailure(pendingRead.id);
          }
        }
      }

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
