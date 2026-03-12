import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  AlumniContactsFilterGroup,
  AlumniContactsListServerComponent,
} from '@/widgets/alumni-contacts';

import {
  AlumniContactsSearchInput,
  MyAlumniContactsButton,
} from '@/features/alumni-contacts';

import {
  AlumniContactsFilter,
  checkAlumniContactsFilterSearchParamValidation,
} from '@/entities/alumni-contacts';

import type { NextSearchParams } from '@/shared/types';
import { SuspenseView } from '@/shared/ui';

export async function AlumniContactsPage({
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
          <Suspense fallback={<SuspenseView />}>
            <AlumniContactsListServerComponent searchParams={searchParams} />
          </Suspense>
        </VStack>
      </div>
      <MyAlumniContactsButton />
    </div>
  );
}
