'use client';

import { useCallback, useMemo } from 'react';

import {
  type AlumniContactsDepartmentFilterOption,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

interface UseAlumniContactsDepartmentFilterButtonProps {
  department: AlumniContactsDepartmentFilterOption | null;
}

export const useAlumniContactsDepartmentFilterButton = ({
  department,
}: UseAlumniContactsDepartmentFilterButtonProps) => {
  const { department: selectedDepartment, setDepartment } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const isSelected = useMemo(() => {
    return department === null
      ? !selectedDepartment || selectedDepartment.length === 0
      : (selectedDepartment?.includes(department) ?? false);
  }, [department, selectedDepartment]);

  const handleClick = useCallback(() => {
    if (department === null) {
      setDepartment(null);
      return;
    }

    const nextDepartment = selectedDepartment?.includes(department)
      ? selectedDepartment.filter((value) => value !== department)
      : [...(selectedDepartment ?? []), department];

    setDepartment(nextDepartment.length > 0 ? nextDepartment : null);
  }, [department, selectedDepartment, setDepartment]);

  return {
    isSelected,
    handleClick,
  };
};
