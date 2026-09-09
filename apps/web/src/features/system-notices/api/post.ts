import { SYSTEM_NOTICES_END_POINT_PREFIX } from '@/entities/system-notices';

import { API } from '@/shared/api';

export const updateSystemNoticesIsRead = async (id: string) => {
  const URI = `${SYSTEM_NOTICES_END_POINT_PREFIX}/${id}/read`;
  await API.post(URI);
};
