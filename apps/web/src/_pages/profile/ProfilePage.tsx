import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsHeader,
  MyAlumniContactsMainLoadingView,
  MyAlumniContactsMainServerComponent,
} from '@/widgets/alumni-contacts';

export function ProfilePage() {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-5 md:pb-5">
        <AlumniContactsHeader />
        <Suspense fallback={<MyAlumniContactsMainLoadingView />}>
          <MyAlumniContactsMainServerComponent />
        </Suspense>
      </VStack>
    </div>
  );
}
