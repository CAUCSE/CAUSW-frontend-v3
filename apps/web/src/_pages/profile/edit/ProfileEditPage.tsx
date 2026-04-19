import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsEditFormLoadingView,
  AlumniContactsEditFormServerComponent,
} from '@/widgets/alumni-contacts';

export const ProfileEditPage = () => {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-8 md:py-6">
        <Suspense fallback={<AlumniContactsEditFormLoadingView />}>
          <AlumniContactsEditFormServerComponent />
        </Suspense>
      </VStack>
    </div>
  );
};
