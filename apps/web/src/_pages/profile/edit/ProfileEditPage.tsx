import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { AlumniContactsEditFormServerComponent } from '@/widgets/alumni-contacts';

export const ProfileEditPage = () => {
  return (
    <div className="flex size-full justify-center">
      <VStack className="w-full max-w-225 gap-0 md:px-8 md:py-6">
        <Suspense fallback={<div>Loading...</div>}>
          <AlumniContactsEditFormServerComponent />
        </Suspense>
      </VStack>
    </div>
  );
};
