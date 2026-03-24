import {
  type UpdateNotificationSettingsRequest,
  type UpdateOfficialBoardNotificationRequest,
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
