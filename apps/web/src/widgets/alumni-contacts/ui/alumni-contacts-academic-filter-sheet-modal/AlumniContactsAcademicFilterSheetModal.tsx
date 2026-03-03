'use client';

import { useState } from 'react';

import { AlumniContactsAcademicFilterSheetModalTrigger } from '@/features/alumni-contacts';

import { useBreakpoint } from '@/shared/hooks';

import { AlumniContactsAcademicFilterBottomSheet } from '../alumni-contacts-academic-filter-bottom-sheet';
import { AlumniContactsAcademicFilterModal } from '../alumni-contacts-academic-filter-modal';

export const AlumniContactsAcademicFilterSheetModal = () => {
  const { isMobileSize } = useBreakpoint();

  const SheetModal = isMobileSize
    ? AlumniContactsAcademicFilterBottomSheet
    : AlumniContactsAcademicFilterModal;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AlumniContactsAcademicFilterSheetModalTrigger
        onClick={handleTriggerClick}
      />
      {SheetModal({
        open: isOpen,
        onOpenChange: handleOpenChange,
        onApply: handleApply,
      })}
    </>
  );
};
