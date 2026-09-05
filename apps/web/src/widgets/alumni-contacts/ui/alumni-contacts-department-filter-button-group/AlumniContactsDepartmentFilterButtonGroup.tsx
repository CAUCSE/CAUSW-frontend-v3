import { HStack } from '@causw/cds';

import { AlumniContactsDepartmentFilterButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION } from '@/entities/alumni-contacts';

export const AlumniContactsDepartmentFilterButtonGroup = () => {
  return (
    <HStack className="flex-wrap items-center" gap="sm">
      <AlumniContactsDepartmentFilterButton department={null} label="전체" />
      {Object.values(ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION).map(
        (department) => (
          <AlumniContactsDepartmentFilterButton
            key={department.value}
            department={department.value}
            label={department.label}
          />
        ),
      )}
    </HStack>
  );
};
