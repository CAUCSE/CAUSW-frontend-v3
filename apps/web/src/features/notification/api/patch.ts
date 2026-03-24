import {
  type UpdateNotificationSettingsRequest,
  type UpdateOfficialBoardNotificationRequest,
  type PatchNotificationReadStatusParam,
  NOTIFICATION_END_POINT_PREFIX,
} from '@/entities/notification';

import { API } from '@/shared/api';

export const updateNotificationSettings = async (
  body: UpdateNotificationSettingsRequest,
) => {
  return await API.patch<null>('/api/v2/notification-settings', body);
};

export const updateOfficialBoardNotification = async ({
  boardId,
  subscribed,
}: UpdateOfficialBoardNotificationRequest) => {
  return await API.patch<null>(
    `/api/v2/notification-settings/official-boards/${boardId}`,
    { subscribed },
  );
};

export const patchNotificationReadStatus = async (
  param: PatchNotificationReadStatusParam,
) => {
  const { id } = param;

  const path = `${NOTIFICATION_END_POINT_PREFIX}/log/${id}/read`;
  return await API.patch(path);
};
