import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AuthContainer,
  EnrollmentVerificationHeader,
  EnrollmentVerificationSectionServerComponent,
} from '@/widgets/auth';

import { SuspenseView } from '@/shared/ui';

export const EnrollmentVerificationPage = () => {
  return (
    <AuthContainer>
      <VStack className="gap-10">
        <EnrollmentVerificationHeader />
        <Suspense fallback={<SuspenseView />}>
          <EnrollmentVerificationSectionServerComponent />
        </Suspense>
      </VStack>
    </AuthContainer>
  );
};
