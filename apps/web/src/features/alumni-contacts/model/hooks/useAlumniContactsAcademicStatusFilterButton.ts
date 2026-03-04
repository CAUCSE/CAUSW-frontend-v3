'use client';

import { useCallback, useMemo } from 'react';

import {
  AlumniContactsAcademicStatusFilterOption,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

interface useAlumniContactsAcademicStatusFilterButtonProps {
  status: AlumniContactsAcademicStatusFilterOption;
}

export const useAlumniContactsAcademicStatusFilterButton = ({
  status,
}: useAlumniContactsAcademicStatusFilterButtonProps) => {
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

  return {
    isSelected,
    handleClick,
  };
};
