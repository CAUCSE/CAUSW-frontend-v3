'use client';

import { useCallback, useMemo } from 'react';

import {
  type AlumniContactsAcademicStatusFilterOption,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

interface useAlumniContactsAcademicStatusFilterButtonProps {
  status: AlumniContactsAcademicStatusFilterOption | null;
}

export const useAlumniContactsAcademicStatusFilterButton = ({
  status,
}: useAlumniContactsAcademicStatusFilterButtonProps) => {
  const { academicStatus, setAcademicStatus } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const isSelected = useMemo(() => {
    if (status === null) {
      return !academicStatus || academicStatus.length === 0;
    }

    return (academicStatus ?? []).includes(status);
  }, [academicStatus, status]);

  const handleClick = useCallback(() => {
    if (status === null) {
      setAcademicStatus(null);
      return;
    }

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
