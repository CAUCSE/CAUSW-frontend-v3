import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { TokenManager } from '@/shared/storage';

export const resetAuthAndRouteToSignIn = async (
  router: AppRouterInstance,
): Promise<void> => {
  await TokenManager.removeAccessToken();
  await TokenManager.removeRefreshToken();
  await TokenManager.removeAuthRefreshed();
  router.replace('/auth/sign-in');
};
