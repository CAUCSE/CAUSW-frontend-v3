import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  notificationQueryKeys,
  type NotificationSettingsResponse,
  type UpdateNotificationSettingsRequest,
  type UpdateOfficialBoardNotificationRequest,
} from '@/entities/notification';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

import {
  updateNotificationSettings,
  updateOfficialBoardNotification,
} from '../../api';

export const useNotificationSettingsOptimisticMutations = () => {
  const queryClient = useQueryClient();

  const notificationSettingsMutation = useMutation({
    mutationFn: (body: UpdateNotificationSettingsRequest) =>
      updateNotificationSettings(body),
    onMutate: async (body) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKeys.settings(),
      });

      const previousSettings =
        queryClient.getQueryData<NotificationSettingsResponse>(
          notificationQueryKeys.settings(),
        );

      if (previousSettings) {
        queryClient.setQueryData<NotificationSettingsResponse>(
          notificationQueryKeys.settings(),
          {
            ...previousSettings,
            community: {
              ...previousSettings.community,
              ...body.community,
            },
            ceremony: {
              ...previousSettings.ceremony,
              ...body.ceremony,
            },
            service: {
              ...previousSettings.service,
              ...body.service,
            },
          },
        );
      }

      return { previousSettings };
    },
    onError: (error, _body, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(
          notificationQueryKeys.settings(),
          context.previousSettings,
        );
      }

      toast.error(
        extractErrorMessage(
          error,
          '알림 설정 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.settings(),
      });
    },
  });

  const officialBoardMutation = useMutation({
    mutationFn: (body: UpdateOfficialBoardNotificationRequest) =>
      updateOfficialBoardNotification(body),
    onMutate: async ({ boardId, subscribed }) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKeys.settings(),
      });

      const previousSettings =
        queryClient.getQueryData<NotificationSettingsResponse>(
          notificationQueryKeys.settings(),
        );

      if (previousSettings) {
        queryClient.setQueryData<NotificationSettingsResponse>(
          notificationQueryKeys.settings(),
          {
            ...previousSettings,
            officialBoards: previousSettings.officialBoards.map((board) =>
              board.boardId === boardId ? { ...board, subscribed } : board,
            ),
          },
        );
      }

      return { previousSettings };
    },
    onError: (error, _body, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(
          notificationQueryKeys.settings(),
          context.previousSettings,
        );
      }

      toast.error(
        extractErrorMessage(
          error,
          '공식 계정 알림 설정 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.settings(),
      });
    },
  });

  return {
    updateNotificationSettings: notificationSettingsMutation.mutate,
    updateOfficialBoardNotification: officialBoardMutation.mutate,
    isUpdatingNotificationSettings: notificationSettingsMutation.isPending,
    isUpdatingOfficialBoards: officialBoardMutation.isPending,
  };
};
