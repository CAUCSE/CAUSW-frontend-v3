'use client';

import { HStack } from '@causw/cds';

import {
  AlumniContactsAcademicStatusFilterChip,
  AlumniContactsAdmissionYearFilterChip,
  AlumniContactsDepartmentFilterChip,
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
    departmentFilterActive,
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    department,
    handleAcademicStatusFilterChipClick,
    handleAdmissionYearFilterChipClick,
    handleDepartmentFilterChipClick,
  } = useAlumniContactsFilterGroup();

  return (
    <HStack className="shrink-0 items-center gap-3 overflow-x-auto">
      <AlumniContactsSortFilterSelect />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      <AlumniContactsAcademicFilterSheetModalProvider>
        <AlumniContactsAcademicFilterSheetModal />
      </AlumniContactsAcademicFilterSheetModalProvider>
      {filterActive && (
        <HStack gap="none" className="overflow-x-auto">
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
            {departmentFilterActive &&
              department?.map((selectedDepartment) => (
                <AlumniContactsDepartmentFilterChip
                  key={selectedDepartment}
                  department={selectedDepartment}
                  onClick={() =>
                    handleDepartmentFilterChipClick(selectedDepartment)
                  }
                />
              ))}
          </>
        </HStack>
      )}
    </HStack>
  );
};
