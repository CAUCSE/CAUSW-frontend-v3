'use client';

import { Button, Chip } from '@causw/cds';

import { useAlumniContactsAcademicStatusFilterButton } from '@/features/alumni-contacts/model';

import {
  ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION,
  type AlumniContactsAcademicStatusFilterOption,
} from '@/entities/alumni-contacts';

interface AlumniContactsAcademicStatusFilterButtonProps {
  status: AlumniContactsAcademicStatusFilterOption;
}

export const AlumniContactsAcademicStatusFilterButton = ({
  status,
}: AlumniContactsAcademicStatusFilterButtonProps) => {
  const { isSelected, handleClick } =
    useAlumniContactsAcademicStatusFilterButton({ status });

  return (
    <Button className="h-fit w-fit rounded-md p-0">
      <Chip
        size="md"
        color={isSelected ? 'darkgray' : 'lightgray'}
        className="cursor-pointer"
        onClick={handleClick}
      >
        {ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION[status].label}
      </Chip>
    </Button>
  );
};
