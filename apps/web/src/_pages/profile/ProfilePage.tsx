import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsHeader,
  MyAlumniContactsMainLoadingView,
  MyAlumniContactsMainServerComponent,
} from '@/widgets/alumni-contacts';

import { MyAlumniContactsEditButton } from '@/features/alumni-contacts';

import { AlumniContactsHeaderBoundaryProvider } from '@/entities/alumni-contacts';

export function ProfilePage() {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-8 md:py-6">
        <VStack gap="none" className="bg-[#4C688F] pt-4 md:rounded-lg">
          <AlumniContactsHeaderBoundaryProvider>
            <AlumniContactsHeader action={<MyAlumniContactsEditButton />} />
            <Suspense fallback={<MyAlumniContactsMainLoadingView />}>
              <MyAlumniContactsMainServerComponent />
            </Suspense>
          </AlumniContactsHeaderBoundaryProvider>
        </VStack>
      </VStack>
    </div>
  );
}
