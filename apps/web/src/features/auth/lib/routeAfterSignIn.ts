import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import type { AuthResponseDto } from '@/entities/auth';

export const routeAfterSignIn = (
  router: AppRouterInstance,
  data: Pick<AuthResponseDto, 'onboardingStatus'>,
) => {
  router.replace(
    data.onboardingStatus === 'TERMS_REQUIRED'
      ? '/auth/sign-up/oauth-additional-info'
      : '/home',
  );
};
