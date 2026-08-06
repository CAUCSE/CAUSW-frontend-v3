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
  AlumniContactsScrollVisibilityProvider,
} from '@/entities/alumni-contacts';

import type { NextSearchParams } from '@/shared/types';

export async function AlumniContactsListPage({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) {
  await checkAlumniContactsFilterSearchParamValidation(searchParams);

  return (
    <div className="relative flex size-full justify-center bg-white px-4 md:px-8 md:pt-5">
      <div className="flex w-full flex-col xl:w-225">
        <AlumniContactsScrollVisibilityProvider>
          <VStack className="min-h-0 flex-1 gap-0 md:gap-1">
            <AlumniContactsTab />
            <AlumniContactsCollapsibleHeader>
              <AlumniContactsSearchInput />
              <AlumniContactsFilterGroup />
            </AlumniContactsCollapsibleHeader>
            <Suspense fallback={<AlumniContactsListLoadingView />}>
              <AlumniContactsListServerComponent searchParams={searchParams} />
            </Suspense>
          </VStack>
        </AlumniContactsScrollVisibilityProvider>
      </div>
    </div>
  );
}
