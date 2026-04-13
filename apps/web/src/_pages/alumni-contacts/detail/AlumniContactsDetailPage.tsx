import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsDetailMainLoadingView,
  AlumniContactsDetailMainServerComponent,
  AlumniContactsHeader,
} from '@/widgets/alumni-contacts';

interface AlumniContactsDetailPageProps {
  alumniContactsId: string;
}

export const AlumniContactsDetailPage = ({
  alumniContactsId,
}: AlumniContactsDetailPageProps) => {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-8 md:py-6">
        <VStack
          gap="none"
          className="bg-[linear-gradient(180deg,#4C688F_0%,#1E2E3F_410px,#fff_410px,#fff_100%)] pt-4 md:rounded-lg"
        >
          <AlumniContactsHeader />
          <Suspense fallback={<AlumniContactsDetailMainLoadingView />}>
            <AlumniContactsDetailMainServerComponent
              alumniContactsId={alumniContactsId}
            />
          </Suspense>
        </VStack>
      </VStack>
    </div>
  );
};
