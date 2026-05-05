'use client';

import { useMemo } from 'react';

import {
  ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

export const useAlumniContactsAdmissionYearFilterSelectGroup = () => {
  const { MIN: MIN_ADMISSION_YEAR } = ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER;

  const {
    startAdmissionYear,
    endAdmissionYear,
    setStartAdmissionYear,
    setEndAdmissionYear,
  } = useAlumniContactsAcademicFilterSheetModalContext();

  const startAdmissionYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - MIN_ADMISSION_YEAR + 1 },
      (_, index) => currentYear - index,
    );
  }, [MIN_ADMISSION_YEAR]);

  const endAdmissionYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      {
        length: currentYear - (startAdmissionYear ?? MIN_ADMISSION_YEAR) + 1,
      },
      (_, index) => currentYear - index,
    );
  }, [startAdmissionYear, MIN_ADMISSION_YEAR]);

  const adjustedEndAdmissionYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentStartAdmissionYear =
      startAdmissionYear ?? ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER.MIN;
    const currentEndAdmissionYear = endAdmissionYear ?? currentYear;

    return currentEndAdmissionYear > currentStartAdmissionYear
      ? currentEndAdmissionYear
      : currentStartAdmissionYear;
  }, [startAdmissionYear, endAdmissionYear]);

  return {
    startAdmissionYears,
    endAdmissionYears,
    startAdmissionYear,
    adjustedEndAdmissionYear,
    setStartAdmissionYear,
    setEndAdmissionYear,
  };
};
