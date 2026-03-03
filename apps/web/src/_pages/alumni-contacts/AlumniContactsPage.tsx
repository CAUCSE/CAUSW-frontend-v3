import { HStack, VStack } from '@causw/cds';

import { AlumniContactsAcademicFilterSheetModal } from '@/widgets/alumni-contacts/ui/alumni-contacts-academic-filter-sheet-modal';

import {
  AlumniContactsSearchInput,
  AlumniContactsSortFilterSelect,
} from '@/features/alumni-contacts';

export function AlumniContactsPage() {
  return (
    <div className="flex size-full justify-center p-4 md:px-8 md:py-6">
      <div className="w-full xl:w-225">
        <VStack className="gap-3">
          <AlumniContactsSearchInput />
          <HStack className="items-center">
            <AlumniContactsSortFilterSelect />
            <div className="h-3 w-px bg-gray-300" />
            <AlumniContactsAcademicFilterSheetModal />
          </HStack>
        </VStack>
      </div>
    </div>
  );
}
