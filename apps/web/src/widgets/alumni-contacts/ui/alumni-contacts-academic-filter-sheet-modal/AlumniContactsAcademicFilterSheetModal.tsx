'use client';

import { useCallback, useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { AlumniContactsAcademicFilterSheetModalTrigger } from '@/features/alumni-contacts';

import {
  AlumniContactsAcademicFilterSheetModalProvider,
  useAlumniContactsAcademicFilterSheetModalContext,
  useAlumniContactsFilterStore,
} from '@/entities/alumni-contacts';

import { useBreakpoint } from '@/shared/hooks';

import { AlumniContactsAcademicFilterBottomSheet } from '../alumni-contacts-academic-filter-bottom-sheet';
import { AlumniContactsAcademicFilterModal } from '../alumni-contacts-academic-filter-modal';

interface SheetModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SheetModal = ({ isOpen, setIsOpen }: SheetModalProps) => {
  const { isMobileSize } = useBreakpoint();
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

  if (isMobileSize) {
    return (
      <AlumniContactsAcademicFilterBottomSheet
        open={isOpen}
        onOpenChange={handleOpenChange}
        onApply={handleApply}
      />
    );
  }

  return (
    <AlumniContactsAcademicFilterModal
      open={isOpen}
      onOpenChange={handleOpenChange}
      onApply={handleApply}
    />
  );
};

export const AlumniContactsAcademicFilterSheetModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AlumniContactsAcademicFilterSheetModalTrigger
        onClick={handleTriggerClick}
      />
      <AlumniContactsAcademicFilterSheetModalProvider>
        <SheetModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </AlumniContactsAcademicFilterSheetModalProvider>
    </>
  );
};
