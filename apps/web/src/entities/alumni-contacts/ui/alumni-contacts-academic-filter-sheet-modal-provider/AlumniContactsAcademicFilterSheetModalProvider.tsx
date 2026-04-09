'use client';

import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import type { AlumniContactsAcademicStatusFilterOption } from '@/entities/alumni-contacts/config';
import { AlumniContactsAcademicFilterSheetModalContext } from '@/entities/alumni-contacts/model';

const DEFAULT_START_ADMISSION_YEAR = 1972;
const DEFAULT_END_ADMISSION_YEAR = new Date().getFullYear();
export const AlumniContactsAcademicFilterSheetModalProvider = ({
  children,
}: PropsWithChildren) => {
  const [startAdmissionYear, setStartAdmissionYear] = useState<number | null>(
    null,
  );
  const [endAdmissionYear, setEndAdmissionYear] = useState<number | null>(null);
  const [academicStatus, setAcademicStatus] = useState<
    AlumniContactsAcademicStatusFilterOption[] | null
  >(null);

  const initialize = useCallback(
    (
      startAdmissionYear: number | null,
      endAdmissionYear: number | null,
      academicStatus: AlumniContactsAcademicStatusFilterOption[] | null,
    ) => {
      setStartAdmissionYear(startAdmissionYear ?? DEFAULT_START_ADMISSION_YEAR);
      setEndAdmissionYear(endAdmissionYear ?? DEFAULT_END_ADMISSION_YEAR);
      setAcademicStatus(academicStatus);
    },
    [],
  );

  const reset = useCallback(() => {
    setStartAdmissionYear(null);
    setEndAdmissionYear(null);
    setAcademicStatus(null);
  }, []);

  const value = useMemo(
    () => ({
      startAdmissionYear,
      endAdmissionYear,
      academicStatus,
      setStartAdmissionYear,
      setEndAdmissionYear,
      setAcademicStatus,
      initialize,
      reset,
    }),
    [
      startAdmissionYear,
      endAdmissionYear,
      academicStatus,
      setStartAdmissionYear,
      setEndAdmissionYear,
      setAcademicStatus,
      initialize,
      reset,
    ],
  );

  return (
    <AlumniContactsAcademicFilterSheetModalContext.Provider value={value}>
      {children}
    </AlumniContactsAcademicFilterSheetModalContext.Provider>
  );
};
