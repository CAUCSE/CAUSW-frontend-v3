import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsHeader,
  MyAlumniContactsMainLoadingView,
  MyAlumniContactsMainServerComponent,
} from '@/widgets/alumni-contacts';

import { MyAlumniContactsEditButton } from '@/features/alumni-contacts';

export function ProfilePage() {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-8 md:py-6">
        <VStack
          gap="none"
          className="bg-[linear-gradient(180deg,#4C688F_0%,#1E2E3F_410px,#fff_410px,#fff_100%)] pt-4 md:rounded-lg"
        >
          <AlumniContactsHeader action={<MyAlumniContactsEditButton />} />
          <Suspense fallback={<MyAlumniContactsMainLoadingView />}>
            <MyAlumniContactsMainServerComponent />
          </Suspense>
        </VStack>
      </VStack>
    </div>
  );
}
