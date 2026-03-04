'use client';

import { useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import {
  useAlumniContactsFilterStore,
  useAlumniContactsAcademicFilterSheetModalContext,
  ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER,
} from '@/entities/alumni-contacts';

interface useAlumniContactsAcademicFilterSheetModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const useAlumniContactsAcademicFilterSheetModal = ({
  setIsOpen,
}: useAlumniContactsAcademicFilterSheetModalProps) => {
  const { MIN: MIN_ADMISSION_YEAR, MAX: MAX_ADMISSION_YEAR } =
    ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER;
  const { startAdmissionYear, endAdmissionYear, academicStatus, initialize } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const {
    currentStartAdmissionYear,
    currentEndAdmissionYear,
    currentAcademicStatus,
    setAdmissionYearStart,
    setAdmissionYearEnd,
    setAcademicStatus,
  } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      currentStartAdmissionYear: state.admissionYearStart,
      currentEndAdmissionYear: state.admissionYearEnd,
      currentAcademicStatus: state.academicStatus,
      setAdmissionYearStart: state.setAdmissionYearStart,
      setAdmissionYearEnd: state.setAdmissionYearEnd,
      setAcademicStatus: state.setAcademicStatus,
    })),
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        initialize(
          currentStartAdmissionYear,
          currentEndAdmissionYear,
          currentAcademicStatus,
        );
      }
      setIsOpen(open);
    },
    [
      setIsOpen,
      initialize,
      currentStartAdmissionYear,
      currentEndAdmissionYear,
      currentAcademicStatus,
    ],
  );

  const handleApply = useCallback(() => {
    setAdmissionYearStart(startAdmissionYear ?? MIN_ADMISSION_YEAR);
    setAdmissionYearEnd(endAdmissionYear ?? MAX_ADMISSION_YEAR);
    setAcademicStatus(academicStatus);
    handleOpenChange(false);
  }, [
    MIN_ADMISSION_YEAR,
    MAX_ADMISSION_YEAR,
    startAdmissionYear,
    endAdmissionYear,
    academicStatus,
    handleOpenChange,
    setAdmissionYearStart,
    setAdmissionYearEnd,
    setAcademicStatus,
  ]);

  return {
    handleOpenChange,
    handleApply,
  };
};
