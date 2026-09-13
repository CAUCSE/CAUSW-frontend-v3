import { Capacitor } from '@capacitor/core';

import { API } from '@/shared/api';
import { TokenManager } from '@/shared/storage';

export const withdrawMe = async () => {
  const refreshToken = await TokenManager.getRefreshToken();
  const platformType = Capacitor.getPlatform();

  return API.delete<null>('/api/v2/users/me', {
    headers: {
      'Refresh-Authorization': `Bearer ${refreshToken}`,
      'X-Platform-Type': platformType,
    },
  });
};
