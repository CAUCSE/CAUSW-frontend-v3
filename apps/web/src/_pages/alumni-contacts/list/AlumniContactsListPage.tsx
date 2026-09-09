import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsFilterGroup,
  AlumniContactsCollapsibleHeader,
  AlumniContactsListLoadingView,
  AlumniContactsListServerComponent,
  AlumniContactsTab,
} from '@/widgets/alumni-contacts';

import { AlumniContactsSearchInput } from '@/features/alumni-contacts';

import {
  type AlumniContactsFilter,
  checkAlumniContactsFilterSearchParamValidation,
} from '@/entities/alumni-contacts';

import type { NextSearchParams } from '@/shared/types';

export async function AlumniContactsListPage({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) {
  await checkAlumniContactsFilterSearchParamValidation(searchParams);

  return (
    <div className="relative flex size-full justify-center bg-white">
      <div className="flex w-full flex-col px-4 md:px-5 xl:w-225">
        <VStack className="min-h-0 flex-1 gap-0 md:gap-1">
          <VStack gap="none" className="z-sticky sticky top-0 bg-white md:pt-5">
            <AlumniContactsTab />
            <AlumniContactsCollapsibleHeader>
              <AlumniContactsSearchInput />
              <AlumniContactsFilterGroup />
            </AlumniContactsCollapsibleHeader>
          </VStack>
          <Suspense fallback={<AlumniContactsListLoadingView />}>
            <AlumniContactsListServerComponent searchParams={searchParams} />
          </Suspense>
        </VStack>
      </div>
    </div>
  );
}
