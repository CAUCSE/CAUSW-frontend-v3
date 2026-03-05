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
  const { startAdmissionYear, endAdmissionYear, academicStatus } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const { setAdmissionYearStart, setAdmissionYearEnd, setAcademicStatus } =
    useAlumniContactsFilterStore(
      useShallow((state) => ({
        setAdmissionYearStart: state.setAdmissionYearStart,
        setAdmissionYearEnd: state.setAdmissionYearEnd,
        setAcademicStatus: state.setAcademicStatus,
      })),
    );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen],
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
