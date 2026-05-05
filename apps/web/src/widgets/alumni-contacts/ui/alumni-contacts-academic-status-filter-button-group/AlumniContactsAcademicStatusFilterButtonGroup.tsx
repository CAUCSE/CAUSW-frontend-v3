import { HStack } from '@causw/cds';

import { AlumniContactsAcademicStatusFilterButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION } from '@/entities/alumni-contacts';

export const AlumniContactsAcademicStatusFilterButtonGroup = () => {
  return (
    <HStack className="items-center" gap="sm">
      {Object.values(ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION).map(
        (status) => (
          <AlumniContactsAcademicStatusFilterButton
            key={status.value}
            status={status.value}
          />
        ),
      )}
    </HStack>
  );
};
