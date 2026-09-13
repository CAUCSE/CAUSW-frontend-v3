'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  useAlumniContactsAcademicFilterSheetModalContext,
  ALUMNI_CONTACTS_FILTER,
  normalizeAlumniContactsDepartments,
} from '@/entities/alumni-contacts';

interface useAlumniContactsAcademicFilterSheetModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const useAlumniContactsAcademicFilterSheetModal = ({
  setIsOpen,
}: useAlumniContactsAcademicFilterSheetModalProps) => {
  const { startAdmissionYear, endAdmissionYear, academicStatus, department } =
    useAlumniContactsAcademicFilterSheetModalContext();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen],
  );

  const handleSetFilterSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START,
      startAdmissionYear?.toString() ?? '',
    );
    params.set(
      ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END,
      endAdmissionYear?.toString() ?? '',
    );
    if (academicStatus && academicStatus.length > 0) {
      params.set(
        ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS,
        academicStatus.join(','),
      );
    } else {
      params.delete(ALUMNI_CONTACTS_FILTER.ACADEMIC_STATUS);
    }
    const normalizedDepartments = department
      ? normalizeAlumniContactsDepartments(department)
      : [];
    if (normalizedDepartments.length > 0) {
      params.set(
        ALUMNI_CONTACTS_FILTER.DEPARTMENT,
        normalizedDepartments.join(','),
      );
    } else {
      params.delete(ALUMNI_CONTACTS_FILTER.DEPARTMENT);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    startAdmissionYear,
    endAdmissionYear,
    academicStatus,
    department,
    searchParams,
    router,
    pathname,
  ]);

  const handleApply = useCallback(() => {
    handleSetFilterSearchParams();
    handleOpenChange(false);
  }, [handleSetFilterSearchParams, handleOpenChange]);

  return {
    handleOpenChange,
    handleApply,
  };
};
