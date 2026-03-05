'use client';

import { HStack } from '@causw/cds';

import { useAlumniContactsFilterGroup } from '@/widgets/alumni-contacts/model';

import {
  AlumniContactsAcademicStatusFilterChip,
  AlumniContactsAdmissionYearFilterChip,
  AlumniContactsSortFilterSelect,
} from '@/features/alumni-contacts';

import { AlumniContactsAcademicFilterSheetModalProvider } from '@/entities/alumni-contacts';

import { AlumniContactsAcademicFilterSheetModal } from '../alumni-contacts-academic-filter-sheet-modal';

export const AlumniContactsFilterGroup = () => {
  const {
    filterActive,
    admissionYearFilterActive,
    academicStatusFilterActive,
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    handleAcademicStatusFilterChipClick,
    handleAdmissionYearFilterChipClick,
  } = useAlumniContactsFilterGroup();

  return (
    <HStack className="items-center">
      <AlumniContactsSortFilterSelect />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      {filterActive ? (
        <HStack gap="sm" className="overflow-x-auto">
          <>
            {admissionYearFilterActive && (
              // 무조건 number임
              <AlumniContactsAdmissionYearFilterChip
                admissionYearStart={admissionYearStart ?? 0}
                admissionYearEnd={admissionYearEnd ?? 0}
                onClick={handleAdmissionYearFilterChipClick}
              />
            )}
            {academicStatusFilterActive &&
              academicStatus?.map((status) => (
                <AlumniContactsAcademicStatusFilterChip
                  key={status}
                  status={status}
                  onClick={() => handleAcademicStatusFilterChipClick(status)}
                />
              ))}
          </>
        </HStack>
      ) : (
        <AlumniContactsAcademicFilterSheetModalProvider>
          <AlumniContactsAcademicFilterSheetModal />
        </AlumniContactsAcademicFilterSheetModalProvider>
      )}
    </HStack>
  );
};
