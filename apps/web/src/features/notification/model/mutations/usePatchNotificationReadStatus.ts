'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  notificationQueryKeys,
  type GetNotificationsResponseDto,
} from '@/entities/notification';

import { toast } from '@/shared/model';

import { patchNotificationReadStatus } from '../../api';

export const usePatchNotificationReadStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: changeNotificationReadStatus } = useMutation({
    mutationFn: (id: GetNotificationsResponseDto['notificationLogId']) =>
      patchNotificationReadStatus({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
    onError: () => {
      toast.error('알림 읽음처리에 실패했습니다. 다시 시도해 주세요');
    },
  });

  return {
    changeNotificationReadStatus,
  };
};
