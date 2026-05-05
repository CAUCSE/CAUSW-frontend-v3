'use client';

import { HStack } from '@causw/cds';

import {
  AlumniContactsAcademicStatusFilterChip,
  AlumniContactsAdmissionYearFilterChip,
  AlumniContactsSortFilterSelect,
} from '@/features/alumni-contacts';

import { AlumniContactsAcademicFilterSheetModalProvider } from '@/entities/alumni-contacts';

import { useAlumniContactsFilterGroup } from '../../model';
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
    <HStack className="-my-1 -ml-1 items-center overflow-x-auto py-1 pl-1">
      <AlumniContactsSortFilterSelect />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      {filterActive ? (
        <HStack gap="sm" className="overflow-x-auto">
          <>
            {admissionYearFilterActive && (
              <AlumniContactsAdmissionYearFilterChip
                admissionYearStart={admissionYearStart ?? ''}
                admissionYearEnd={admissionYearEnd ?? ''}
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
