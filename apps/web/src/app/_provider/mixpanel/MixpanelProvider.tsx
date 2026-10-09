'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

import { useIsMounted } from '@/shared/hooks';
import {
  attachMixpanelOnboardingUser,
  identifyMixpanelUser,
  syncMixpanelAcademicStatus,
} from '@/shared/lib/analytics';
import { TokenManager } from '@/shared/storage';

export const MixpanelProvider = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const { data: myInfo } = useQuery({
    ...authQueryOptions.me(),
    enabled: isMounted && hasAccessToken,
    retry: false,
  });

  useEffect(() => {
    let cancelled = false;

    void TokenManager.getAccessToken().then((accessToken) => {
      if (!cancelled) setHasAccessToken(Boolean(accessToken));
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (!myInfo?.id) return;
    identifyMixpanelUser(myInfo.id);
    if (
      myInfo.onboardingStatus === 'GUEST' ||
      myInfo.onboardingStatus === 'EMAIL_VERIFICATION_REQUIRED' ||
      myInfo.onboardingStatus === 'ACADEMIC_CERTIFICATION_REQUIRED'
    ) {
      attachMixpanelOnboardingUser(myInfo.id);
    }
    if (
      myInfo.onboardingStatus === 'ACTIVE' &&
      (myInfo.academicStatus === 'ENROLLED' ||
        myInfo.academicStatus === 'GRADUATED')
    ) {
      syncMixpanelAcademicStatus(myInfo.academicStatus);
    }
  }, [myInfo?.academicStatus, myInfo?.id, myInfo?.onboardingStatus]);

  return <>{children}</>;
};
