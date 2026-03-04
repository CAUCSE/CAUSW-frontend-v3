'use client';

import { useState } from 'react';

import { useAlumniContactsAcademicFilterSheetModal } from '@/widgets/alumni-contacts/model';

import { AlumniContactsAcademicFilterSheetModalTrigger } from '@/features/alumni-contacts';

import { AlumniContactsAcademicFilterSheetModalProvider } from '@/entities/alumni-contacts';

import { useBreakpoint } from '@/shared/hooks';

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
