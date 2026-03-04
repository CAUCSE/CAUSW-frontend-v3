'use client';

import { useCallback, useMemo } from 'react';

import { useShallow } from 'zustand/shallow';

import {
  AlumniContactsAcademicStatusFilterOption,
  useAlumniContactsFilterStore,
} from '@/entities/alumni-contacts';

export const useAlumniContactsFilterGroup = () => {
  const {
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    setAdmissionYearStart,
    setAdmissionYearEnd,
    setAcademicStatus,
  } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      admissionYearStart: state.admissionYearStart,
      admissionYearEnd: state.admissionYearEnd,
      academicStatus: state.academicStatus,
      setAdmissionYearStart: state.setAdmissionYearStart,
      setAdmissionYearEnd: state.setAdmissionYearEnd,
      setAcademicStatus: state.setAcademicStatus,
    })),
  );

  const admissionYearFilterActive = useMemo(() => {
    return admissionYearStart !== null && admissionYearEnd !== null;
  }, [admissionYearStart, admissionYearEnd]);

  const academicStatusFilterActive = useMemo(() => {
    return academicStatus !== null && academicStatus.length > 0;
  }, [academicStatus]);

  const filterActive = useMemo(() => {
    return academicStatusFilterActive || admissionYearFilterActive;
  }, [academicStatusFilterActive, admissionYearFilterActive]);

  const handleAcademicStatusFilterChipClick = useCallback(
    (status: AlumniContactsAcademicStatusFilterOption) => {
      const currentAcademicStatus = academicStatus ?? [];
      const newAcademicStatus = currentAcademicStatus.filter(
        (s) => s !== status,
      );
      setAcademicStatus(newAcademicStatus);
    },
    [academicStatus, setAcademicStatus],
  );

  const handleAdmissionYearFilterChipClick = useCallback(() => {
    setAdmissionYearStart(null);
    setAdmissionYearEnd(null);
  }, [setAdmissionYearStart, setAdmissionYearEnd]);

  return {
    admissionYearStart,
    admissionYearEnd,
    academicStatus,
    filterActive,
    admissionYearFilterActive,
    academicStatusFilterActive,
    handleAcademicStatusFilterChipClick,
    handleAdmissionYearFilterChipClick,
  };
};
