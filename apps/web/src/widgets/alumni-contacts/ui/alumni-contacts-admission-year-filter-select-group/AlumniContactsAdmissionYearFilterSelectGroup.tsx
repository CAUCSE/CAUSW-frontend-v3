'use client';

import { HStack } from '@causw/cds';

import { useAlumniContactsAdmissionYearFilterSelectGroup } from '@/widgets/alumni-contacts';

import { AlumniContactsAdmissionYearFilterSelect } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER } from '@/entities/alumni-contacts';

export const AlumniContactsAdmissionYearFilterSelectGroup = () => {
  const { MIN: MIN_ADMISSION_YEAR, MAX: MAX_ADMISSION_YEAR } =
    ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER;
  const {
    startAdmissionYears,
    endAdmissionYears,
    startAdmissionYear,
    adjustedEndAdmissionYear,
    setStartAdmissionYear,
    setEndAdmissionYear,
  } = useAlumniContactsAdmissionYearFilterSelectGroup();

  return (
    <HStack className="items-center" gap="sm">
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={MIN_ADMISSION_YEAR.toString()}
        admissionYears={startAdmissionYears}
        value={startAdmissionYear?.toString() ?? ''}
        onValueChange={(value) => {
          setStartAdmissionYear(Number(value));
        }}
      />
      <div className="h-px w-2 bg-gray-300" />
      <AlumniContactsAdmissionYearFilterSelect
        defaultValue={MAX_ADMISSION_YEAR.toString()}
        admissionYears={endAdmissionYears}
        value={adjustedEndAdmissionYear.toString()}
        onValueChange={(value) => {
          setEndAdmissionYear(Number(value));
        }}
      />
    </HStack>
  );
};
