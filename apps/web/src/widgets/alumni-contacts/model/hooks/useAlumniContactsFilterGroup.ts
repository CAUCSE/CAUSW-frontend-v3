'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  ALUMNI_CONTACTS_FILTER,
  type AlumniContactsAcademicStatusFilterOption,
  type AlumniContactsDepartmentFilterOption,
} from '@/entities/alumni-contacts';

export const useAlumniContactsFilterGroup = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const admissionYearStart = searchParams.get(
    ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START,
  );
  const admissionYearEnd = searchParams.get(
    ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END,
  );
  const academicStatus = searchParams
    .get(ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS)
    ?.split(',') as AlumniContactsAcademicStatusFilterOption[];
  const department = searchParams
    .get(ALUMNI_CONTACTS_FILTER.DEPARTMENT)
    ?.split(',') as AlumniContactsDepartmentFilterOption[];

  const admissionYearFilterActive = useMemo(() => {
    return admissionYearStart !== null && admissionYearEnd !== null;
  }, [admissionYearStart, admissionYearEnd]);

  const academicStatusFilterActive = useMemo(() => {
    return Boolean(academicStatus?.length);
  }, [academicStatus]);

  const departmentFilterActive = useMemo(() => {
    return Boolean(department?.length);
  }, [department]);

  const filterActive = useMemo(() => {
    return (
      academicStatusFilterActive ||
      admissionYearFilterActive ||
      departmentFilterActive
    );
  }, [
    academicStatusFilterActive,
    admissionYearFilterActive,
    departmentFilterActive,
  ]);

  const handleAcademicStatusFilterChipClick = useCallback(
    (status: AlumniContactsAcademicStatusFilterOption) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentAcademicStatus = academicStatus ?? [];
      const newAcademicStatus = currentAcademicStatus.filter(
        (s) => s !== status,
      );

      if (newAcademicStatus.length === 0) {
        params.delete(ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS);
      } else {
        params.set(
          ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS,
          newAcademicStatus.join(','),
        );
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [academicStatus, router, pathname, searchParams],
  );

  const handleAdmissionYearFilterChipClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START);
    params.delete(ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const handleDepartmentFilterChipClick = useCallback(
    (selectedDepartment: AlumniContactsDepartmentFilterOption) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextDepartment = (department ?? []).filter(
        (department) => department !== selectedDepartment,
      );

      if (nextDepartment.length === 0) {
        params.delete(ALUMNI_CONTACTS_FILTER.DEPARTMENT);
      } else {
        params.set(ALUMNI_CONTACTS_FILTER.DEPARTMENT, nextDepartment.join(','));
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [department, router, pathname, searchParams],
  );

  return {
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    department,
    filterActive,
    admissionYearFilterActive,
    academicStatusFilterActive,
    departmentFilterActive,
    handleAcademicStatusFilterChipClick,
    handleAdmissionYearFilterChipClick,
    handleDepartmentFilterChipClick,
  };
};
