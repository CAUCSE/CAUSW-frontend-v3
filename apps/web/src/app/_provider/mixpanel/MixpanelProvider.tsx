'use client';

import { useEffect, type PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

import { useIsMounted } from '@/shared/hooks';
import { identifyMixpanelUser } from '@/shared/lib/analytics';

export const MixpanelProvider = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const { data: myInfo } = useQuery({
    ...authQueryOptions.me(),
    enabled: isMounted,
  });

  useEffect(() => {
    if (myInfo?.onboardingStatus !== 'ACTIVE') return;
    identifyMixpanelUser(myInfo.id);
  }, [myInfo?.id, myInfo?.onboardingStatus]);

  return <>{children}</>;
};
