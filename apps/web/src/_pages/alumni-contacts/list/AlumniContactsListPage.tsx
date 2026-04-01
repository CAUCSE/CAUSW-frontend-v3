import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsFilterGroup,
  AlumniContactsListLoadingView,
  AlumniContactsListServerComponent,
} from '@/widgets/alumni-contacts';

import {
  AlumniContactsSearchInput,
  MyAlumniContactsButton,
} from '@/features/alumni-contacts';

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
    <div className="relative flex size-full justify-center p-4 md:px-8 md:py-6">
      <div className="flex w-full flex-col xl:w-225">
        <VStack className="min-h-0 flex-1 gap-3">
          <AlumniContactsSearchInput />
          <AlumniContactsFilterGroup />
          <Suspense fallback={<AlumniContactsListLoadingView />}>
            <AlumniContactsListServerComponent searchParams={searchParams} />
          </Suspense>
        </VStack>
      </div>
      <MyAlumniContactsButton />
    </div>
  );
}
