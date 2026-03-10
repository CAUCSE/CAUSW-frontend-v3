import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { AlumniContactsFilterGroup } from '@/widgets/alumni-contacts';
import { AlumniContactsListServerComponent } from '@/widgets/alumni-contacts/ui';

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
      <div className="w-full xl:w-225">
        <VStack className="gap-3">
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
