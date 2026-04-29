'use client';

import { useRouter } from 'next/navigation';

import { resetAuthAndRouteToSignIn } from '@/features/auth';

import { ActionHeader } from '@/shared/ui';

export const EnrollmentVerificationPageActionHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    resetAuthAndRouteToSignIn(router);
  };

  return (
    <ActionHeader className="md:mb-10 md:px-0">
      <ActionHeader.BackButton onClick={handleBack}>
        뒤로
      </ActionHeader.BackButton>
    </ActionHeader>
  );
};
