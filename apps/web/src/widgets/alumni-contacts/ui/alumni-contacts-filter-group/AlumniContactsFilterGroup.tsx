'use client';

import { useCallback, useMemo } from 'react';

import { useShallow } from 'zustand/shallow';

import { HStack } from '@causw/cds';

import {
  AlumniContactsAcademicStatusFilterChip,
  AlumniContactsAdmissionYearFilterChip,
  AlumniContactsSortFilterSelect,
} from '@/features/alumni-contacts';

import {
  AlumniContactsAcademicStatusFilterOption,
  useAlumniContactsFilterStore,
} from '@/entities/alumni-contacts';

import { AlumniContactsAcademicFilterSheetModal } from '../alumni-contacts-academic-filter-sheet-modal';

export const AlumniContactsFilterGroup = () => {
  const {
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    setAdmissionYearStart,
    setAdmissionYearEnd,
    setAcademicStatus,
  } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      admissionYearStart: state.admissionYearStart,
      admissionYearEnd: state.admissionYearEnd,
      academicStatus: state.academicStatus,
      setAdmissionYearStart: state.setAdmissionYearStart,
      setAdmissionYearEnd: state.setAdmissionYearEnd,
      setAcademicStatus: state.setAcademicStatus,
    })),
  );

  const admissionYearFilterActive = useMemo(() => {
    return admissionYearStart !== null && admissionYearEnd !== null;
  }, [admissionYearStart, admissionYearEnd]);

  const academicStatusFilterActive = useMemo(() => {
    return academicStatus !== null && academicStatus.length > 0;
  }, [academicStatus]);

  const filterActive = useMemo(() => {
    return academicStatusFilterActive || admissionYearFilterActive;
  }, [academicStatusFilterActive, admissionYearFilterActive]);

  const handleAcademicStatusFilterChipClick = useCallback(
    (status: AlumniContactsAcademicStatusFilterOption) => {
      const currentAcademicStatus = academicStatus ?? [];
      const newAcademicStatus = currentAcademicStatus.filter(
        (s) => s !== status,
      );
      setAcademicStatus(newAcademicStatus);
    },
    [academicStatus, setAcademicStatus],
  );

  const handleAdmissionYearFilterChipClick = useCallback(() => {
    setAdmissionYearStart(null);
    setAdmissionYearEnd(null);
  }, [setAdmissionYearStart, setAdmissionYearEnd]);

  return (
    <HStack className="items-center">
      <AlumniContactsSortFilterSelect />
      <div className="h-3 w-px bg-gray-300" />
      {filterActive ? (
        <HStack gap="sm">
          <>
            {admissionYearFilterActive && (
              // 무조건 number임
              <AlumniContactsAdmissionYearFilterChip
                admissionYearStart={admissionYearStart ?? 0}
                admissionYearEnd={admissionYearEnd ?? 0}
                onClick={() => handleAdmissionYearFilterChipClick()}
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
        <AlumniContactsAcademicFilterSheetModal />
      )}
    </HStack>
  );
};
