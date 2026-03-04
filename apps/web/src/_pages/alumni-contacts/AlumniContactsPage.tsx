import { VStack } from '@causw/cds';

import { AlumniContactsFilterGroup } from '@/widgets/alumni-contacts';

import { AlumniContactsSearchInput } from '@/features/alumni-contacts';

export function AlumniContactsPage() {
  return (
    <div className="flex size-full justify-center p-4 md:px-8 md:py-6">
      <div className="w-full xl:w-225">
        <VStack className="gap-3">
          <AlumniContactsSearchInput />
          <AlumniContactsFilterGroup />
        </VStack>
      </div>
    </div>
  );
}
