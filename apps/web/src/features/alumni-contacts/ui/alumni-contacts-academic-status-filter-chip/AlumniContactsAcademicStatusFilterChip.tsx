'use client';

import { Button, Chip, Close } from '@causw/cds';

import {
  ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION,
  type AlumniContactsAcademicStatusFilterOption,
} from '@/entities/alumni-contacts';

interface AlumniContactsAcademicStatusFilterChipProps {
  status: AlumniContactsAcademicStatusFilterOption;
  onClick: () => void;
}

export const AlumniContactsAcademicStatusFilterChip = ({
  status,
  onClick,
}: AlumniContactsAcademicStatusFilterChipProps) => {
  return (
    <Chip size="md" color="darkgray">
      {ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION[status].label}
      <Button
        className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
        onClick={onClick}
      >
        <Close size={14} color="white" />
      </Button>
    </Chip>
  );
};
