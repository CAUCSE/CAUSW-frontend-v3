'use client';

import { useCallback, useMemo } from 'react';

import { Button, Chip } from '@causw/cds';

import {
  ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION,
  useAlumniContactsAcademicFilterSheetModalContext,
  type AlumniContactsAcademicStatusFilterOption,
} from '@/entities/alumni-contacts';

interface AlumniContactsAcademicStatusFilterButtonProps {
  status: AlumniContactsAcademicStatusFilterOption;
}

export const AlumniContactsAcademicStatusFilterButton = ({
  status,
}: AlumniContactsAcademicStatusFilterButtonProps) => {
  const { academicStatus, setAcademicStatus } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const isSelected = useMemo(() => {
    return (academicStatus ?? []).includes(status);
  }, [academicStatus, status]);

  const handleClick = useCallback(() => {
    const currentAcademicStatus = academicStatus ?? [];
    const newAcademicStatus = isSelected
      ? currentAcademicStatus.filter((s) => s !== status)
      : [...currentAcademicStatus, status];
    setAcademicStatus(newAcademicStatus);
  }, [isSelected, academicStatus, status, setAcademicStatus]);

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
