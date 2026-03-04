'use client';

import { useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import {
  useAlumniContactsFilterStore,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

interface useAlumniContactsAcademicFilterSheetModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const useAlumniContactsAcademicFilterSheetModal = ({
  setIsOpen,
}: useAlumniContactsAcademicFilterSheetModalProps) => {
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
    setAdmissionYearStart(startAdmissionYear);
    setAdmissionYearEnd(endAdmissionYear);
    setAcademicStatus(academicStatus);
    handleOpenChange(false);
  }, [
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
