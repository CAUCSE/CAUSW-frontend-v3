'use client';

import { useRouter } from 'next/navigation';

import { ActionHeader } from '@/shared/ui';

export const EnrollmentVerificationPageActionHeader = () => {
  const router = useRouter();
  return (
    <ActionHeader className="md:mb-10 md:px-0">
      <ActionHeader.BackButton onClick={() => router.push('/auth/sign-in')}>
        뒤로
      </ActionHeader.BackButton>
    </ActionHeader>
  );
};
