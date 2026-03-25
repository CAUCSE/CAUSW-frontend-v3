import { redirect } from 'next/navigation';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

import { EnrollmentVerificationSectionContent } from '../enrollment-verification-section-content';

export const EnrollmentVerificationSectionServerComponent = async () => {
  const queryClient = new QueryClient();

  const admissionState = await queryClient.fetchQuery(
    authQueryOptions.admissionState(),
  );

  if (admissionState.userState === 'ACTIVE') {
    redirect('/home');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EnrollmentVerificationSectionContent />
    </HydrationBoundary>
  );
};
