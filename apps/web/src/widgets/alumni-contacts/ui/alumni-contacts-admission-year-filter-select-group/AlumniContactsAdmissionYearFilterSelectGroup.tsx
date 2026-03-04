'use client';

import { useMemo } from 'react';

import { HStack } from '@causw/cds';

import { AlumniContactsAdmissionYearFilterSelect } from '@/features/alumni-contacts';

import { useAlumniContactsAcademicFilterSheetModalContext } from '@/entities/alumni-contacts';

const ADMISSION_YEAR_SELECT_GROUPS = {
  MIN: 1972,
  MAX: new Date().getFullYear(),
};

export const AlumniContactsAdmissionYearFilterSelectGroup = () => {
  const {
    startAdmissionYear,
    endAdmissionYear,
    setStartAdmissionYear,
    setEndAdmissionYear,
  } = useAlumniContactsAcademicFilterSheetModalContext();

  const startAdmissionYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1972 + 1 },
      (_, index) => currentYear - index,
    );
  }, []);

  const endAdmissionYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - (startAdmissionYear ?? 1972) + 1 },
      (_, index) => currentYear - index,
    );
  }, [startAdmissionYear]);

  const adjustedEndAdmissionYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentStartAdmissionYear = startAdmissionYear ?? 1972;
    const currentEndAdmissionYear = endAdmissionYear ?? currentYear;

    return currentEndAdmissionYear > currentStartAdmissionYear
      ? currentEndAdmissionYear
      : currentStartAdmissionYear;
  }, [startAdmissionYear, endAdmissionYear]);

  return (
    <HStack className="items-center" gap="sm">
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={ADMISSION_YEAR_SELECT_GROUPS.MIN.toString()}
        admissionYears={startAdmissionYears}
        value={startAdmissionYear?.toString() ?? ''}
        onValueChange={(value) => {
          setStartAdmissionYear(Number(value));
        }}
      />
      <div className="h-px w-2 bg-gray-300" />
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={ADMISSION_YEAR_SELECT_GROUPS.MAX.toString()}
        admissionYears={endAdmissionYears}
        value={adjustedEndAdmissionYear.toString()}
        onValueChange={(value) => {
          setEndAdmissionYear(Number(value));
        }}
      />
    </HStack>
  );
};
