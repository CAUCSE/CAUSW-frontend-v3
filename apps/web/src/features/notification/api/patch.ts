import type { PatchNotificationReadStatusParam } from '@/entities/notification';
import { NOTIFICATION_END_POINT_PREFIX } from '@/entities/notification/config';

import { API } from '@/shared/api';

export const patchNotificationReadStatus = async (
  param: PatchNotificationReadStatusParam,
) => {
  const { id } = param;

  const path = `${NOTIFICATION_END_POINT_PREFIX}/log/${id}/read`;
  return await API.patch(path);
};
