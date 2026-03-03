'use client';

import { useMemo } from 'react';

import { HStack } from '@causw/cds';

import { AlumniContactsAdmissionYearFilterSelect } from '@/features/alumni-contacts';

const ADMISSION_YEAR_SELECT_GROUPS = {
  MIN: 1972,
  MAX: new Date().getFullYear(),
};

export const AlumniContactsAdmissionYearFilterSelectGroup = () => {
  const admissionYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1972 + 1 },
      (_, index) => currentYear - index,
    );
  }, []);

  // TODO: 시작, 끝 학번 상태 관리 로직 필요

  return (
    <HStack className="items-center" gap="sm">
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={ADMISSION_YEAR_SELECT_GROUPS.MIN.toString()}
        admissionYears={admissionYears}
        value=""
        onValueChange={() => {}}
      />
      <div className="h-px w-2 bg-gray-300" />
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={ADMISSION_YEAR_SELECT_GROUPS.MAX.toString()}
        admissionYears={admissionYears}
        value=""
        onValueChange={() => {}}
      />
    </HStack>
  );
};
