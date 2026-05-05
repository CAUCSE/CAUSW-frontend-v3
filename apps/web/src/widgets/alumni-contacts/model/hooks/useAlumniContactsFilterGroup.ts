'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  ALUMNI_CONTACTS_FILTER,
  type AlumniContactsAcademicStatusFilterOption,
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

  const admissionYearFilterActive = useMemo(() => {
    return admissionYearStart !== null && admissionYearEnd !== null;
  }, [admissionYearStart, admissionYearEnd]);

  const academicStatusFilterActive = useMemo(() => {
    return academicStatus && academicStatus.length > 0;
  }, [academicStatus]);

  const filterActive = useMemo(() => {
    return academicStatusFilterActive || admissionYearFilterActive;
  }, [academicStatusFilterActive, admissionYearFilterActive]);

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

  return {
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    filterActive,
    admissionYearFilterActive,
    academicStatusFilterActive,
    handleAcademicStatusFilterChipClick,
    handleAdmissionYearFilterChipClick,
  };
};
