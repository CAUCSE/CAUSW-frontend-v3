import { API } from '@/shared/api';
import { setNativeFCM } from '@/shared/storage';

import { UpdateFCMTokenRequestDto } from '../model/types';

export const updateFCMToken = async (
  payload: UpdateFCMTokenRequestDto,
): Promise<void> => {
  const URI = `/api/v2/users/fcm`;

  await API.post(URI, payload);

  setNativeFCM(payload.fcmToken);
};
