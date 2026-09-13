'use client';

import { Button, Chip, Close } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION,
  type AlumniContactsDepartmentFilterOption,
} from '@/entities/alumni-contacts';

interface AlumniContactsDepartmentFilterChipProps {
  department: AlumniContactsDepartmentFilterOption;
  onClick: () => void;
}

export const AlumniContactsDepartmentFilterChip = ({
  department,
  onClick,
}: AlumniContactsDepartmentFilterChipProps) => {
  return (
    <Chip size="sm" color="white" className="gap-1">
      {ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION[department].label}
      <Button
        className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
        onClick={onClick}
      >
        <Close size={12} color="gray-400" />
      </Button>
    </Chip>
  );
};
