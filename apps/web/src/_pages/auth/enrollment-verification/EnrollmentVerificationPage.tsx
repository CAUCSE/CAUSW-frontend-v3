import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AuthContainer,
  EnrollmentVerificationPageActionHeader,
  EnrollmentVerificationHeader,
  EnrollmentVerificationSectionServerComponent,
} from '@/widgets/auth';

import { DesktopOnly, MobileOnly, SuspenseView } from '@/shared/ui';

export const EnrollmentVerificationPage = () => {
  return (
    <>
      <MobileOnly>
        <EnrollmentVerificationPageActionHeader />
      </MobileOnly>
      <AuthContainer>
        <DesktopOnly>
          <EnrollmentVerificationPageActionHeader />
        </DesktopOnly>
        <VStack className="gap-10">
          <EnrollmentVerificationHeader />
          <Suspense fallback={<SuspenseView />}>
            <EnrollmentVerificationSectionServerComponent />
          </Suspense>
        </VStack>
      </AuthContainer>
    </>
  );
};
