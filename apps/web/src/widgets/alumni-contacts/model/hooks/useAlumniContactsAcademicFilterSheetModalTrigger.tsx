'use client';

import { useCallback, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import {
  ALUMNI_CONTACTS_FILTER,
  type AlumniContactsAcademicStatusFilterOption,
  useAlumniContactsAcademicFilterSheetModalContext,
} from '@/entities/alumni-contacts';

export const useAlumniContactsAcademicFilterSheetModalTrigger = () => {
  const searchParams = useSearchParams();

  const { initialize } = useAlumniContactsAcademicFilterSheetModalContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getCurrentFilterSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentStartAdmissionYear = params.get(
      ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START,
    );
    const currentEndAdmissionYear = params.get(
      ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END,
    );
    const currentAcademicStatus = params.get(
      ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS,
    );
    return {
      currentStartAdmissionYear: currentStartAdmissionYear
        ? Number(currentStartAdmissionYear)
        : null,
      currentEndAdmissionYear: currentEndAdmissionYear
        ? Number(currentEndAdmissionYear)
        : null,
      currentAcademicStatus: currentAcademicStatus
        ? (currentAcademicStatus.split(
            ',',
          ) as AlumniContactsAcademicStatusFilterOption[])
        : null,
    };
  }, [searchParams]);

  const handleTriggerClick = useCallback(() => {
    setIsOpen(true);
    const {
      currentStartAdmissionYear,
      currentEndAdmissionYear,
      currentAcademicStatus,
    } = getCurrentFilterSearchParams();
    initialize(
      currentStartAdmissionYear,
      currentEndAdmissionYear,
      currentAcademicStatus,
    );
  }, [getCurrentFilterSearchParams, initialize]);

  return {
    isOpen,
    setIsOpen,
    handleTriggerClick,
  };
};
