import { Text, VStack } from '@causw/cds';

import { AlumniContactsAcademicStatusFilterButtonGroup } from '../alumni-contacts-academic-status-filter-button-group';
import { AlumniContactsAdmissionYearFilterSelectGroup } from '../alumni-contacts-admission-year-filter-select-group';

export const AlumniContactsAcademicFilterSheetModalMain = () => {
  return (
    <VStack>
      <VStack className="gap-3">
        <Text typography="subtitle-16-bold">학번</Text>
        <AlumniContactsAdmissionYearFilterSelectGroup />
      </VStack>
      <VStack className="gap-3">
        <Text typography="subtitle-16-bold">학적 상태</Text>
        <AlumniContactsAcademicStatusFilterButtonGroup />
      </VStack>
    </VStack>
  );
};
