'use client';

import { AlumniContactsAcademicFilterSheetModalTrigger } from '@/features/alumni-contacts';

import { useBreakpoint } from '@/shared/hooks';

import {
  useAlumniContactsAcademicFilterSheetModal,
  useAlumniContactsAcademicFilterSheetModalTrigger,
} from '../../model';
import { AlumniContactsAcademicFilterBottomSheet } from '../alumni-contacts-academic-filter-bottom-sheet';
import { AlumniContactsAcademicFilterModal } from '../alumni-contacts-academic-filter-modal';

interface SheetModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SheetModal = ({ isOpen, setIsOpen }: SheetModalProps) => {
  const { isMobileSize } = useBreakpoint();
  const { handleOpenChange, handleApply } =
    useAlumniContactsAcademicFilterSheetModal({ setIsOpen });

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
  const { isOpen, setIsOpen, handleTriggerClick } =
    useAlumniContactsAcademicFilterSheetModalTrigger();

  return (
    <>
      <AlumniContactsAcademicFilterSheetModalTrigger
        onClick={handleTriggerClick}
      />
      <SheetModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
