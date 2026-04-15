import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsDetailMainLoadingView,
  AlumniContactsDetailMainServerComponent,
  AlumniContactsHeader,
} from '@/widgets/alumni-contacts';

import { AlumniContactsHeaderBoundaryProvider } from '@/entities/alumni-contacts';

interface AlumniContactsDetailPageProps {
  alumniContactsId: string;
}

export const AlumniContactsDetailPage = ({
  alumniContactsId,
}: AlumniContactsDetailPageProps) => {
  return (
    <div className="flex min-h-full w-full justify-center">
      <VStack className="min-h-full w-full max-w-225 gap-0 md:px-8 md:py-6">
        <VStack gap="none" className="bg-[#4C688F] pt-4 md:rounded-lg">
          <AlumniContactsHeaderBoundaryProvider>
            <AlumniContactsHeader />
            <Suspense fallback={<AlumniContactsDetailMainLoadingView />}>
              <AlumniContactsDetailMainServerComponent
                alumniContactsId={alumniContactsId}
              />
            </Suspense>
          </AlumniContactsHeaderBoundaryProvider>
        </VStack>
      </VStack>
    </div>
  );
};
