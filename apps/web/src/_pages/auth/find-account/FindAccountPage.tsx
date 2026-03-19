'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { VStack } from '@causw/cds';

import {
  AuthContainer,
  FindAccountContainer,
  type FindAccountView,
} from '@/widgets/auth';

import { ActionHeader } from '@/shared/ui';

export const FindAccountPage = () => {
  const router = useRouter();
  const [view, setView] = useState<FindAccountView>({ type: 'form' });

  const handleViewChange = useCallback((nextView: FindAccountView) => {
    if (nextView.type !== 'form') {
      window.history.pushState({ findAccountView: 'result' }, '');
    }
    setView(nextView);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setView({ type: 'form' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleBack = () => {
    if (view.type !== 'form') {
      window.history.back();
    } else {
      router.back();
    }
  };

  return (
    <AuthContainer>
      <VStack className="w-full gap-4 md:gap-10">
        <ActionHeader
          isSticky={false}
          background="gray"
          buttonColor="gray"
          className="px-0"
        >
          <ActionHeader.BackButton onClick={handleBack}>
            뒤로
          </ActionHeader.BackButton>
        </ActionHeader>
        <FindAccountContainer view={view} onViewChange={handleViewChange} />
      </VStack>
    </AuthContainer>
  );
};
