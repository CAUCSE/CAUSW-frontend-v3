'use client';

import { Button, Chip } from '@causw/cds';

import { type AlumniContactsDepartmentFilterOption } from '@/entities/alumni-contacts';

import { useAlumniContactsDepartmentFilterButton } from '../../model';

interface AlumniContactsDepartmentFilterButtonProps {
  department: AlumniContactsDepartmentFilterOption | null;
  label: string;
}

export const AlumniContactsDepartmentFilterButton = ({
  department,
  label,
}: AlumniContactsDepartmentFilterButtonProps) => {
  const { isSelected, handleClick } = useAlumniContactsDepartmentFilterButton({
    department,
  });

  return (
    <Button className="h-fit w-fit rounded-md p-0" onClick={handleClick}>
      <Chip
        size="md"
        color={isSelected ? 'darkgray' : 'lightgray'}
        className="cursor-pointer"
      >
        {label}
      </Chip>
    </Button>
  );
};
