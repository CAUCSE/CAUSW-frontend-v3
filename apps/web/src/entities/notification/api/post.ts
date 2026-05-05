import { API } from '@/shared/api';
import { TokenManager } from '@/shared/storage';

import { type UpdateFCMTokenRequestDto } from '../model';

export const updateFCMToken = async (
  payload: UpdateFCMTokenRequestDto,
): Promise<void> => {
  const URI = `/api/v2/users/fcm`;
  const refreshToken = await TokenManager.getRefreshToken();

  await API.post(URI, payload, {
    headers: refreshToken
      ? {
          'Refresh-Authorization': `Bearer ${refreshToken}`,
        }
      : {},
  });
};
