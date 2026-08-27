import { API } from '@/shared/api';

import { SYSTEM_NOTICES_END_POINT_PREFIX } from '../config';

export const updateSystemNoticesIsRead = async (id: string) => {
  const URI = `${SYSTEM_NOTICES_END_POINT_PREFIX}/${id}/read`;
  await API.post(URI);
};
