import { API } from '@/shared/api';

import { type UpdateFCMTokenRequestDto } from '../model';

export const updateFCMToken = async (
  payload: UpdateFCMTokenRequestDto,
): Promise<void> => {
  const URI = `/api/v2/users/fcm`;

  await API.post(URI, payload);
};
