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

  const [admissionState] = await Promise.all([
    queryClient.fetchQuery(authQueryOptions.admissionState()),
    queryClient.prefetchQuery(authQueryOptions.me()),
  ]);

  if (
    !admissionState ||
    admissionState.userState === 'GUEST' ||
    admissionState.userState === 'DROP'
  ) {
    redirect('/auth/sign-in');
  }

  if (admissionState.userState === 'ACTIVE') {
    redirect('/home');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EnrollmentVerificationSectionContent />
    </HydrationBoundary>
  );
};
