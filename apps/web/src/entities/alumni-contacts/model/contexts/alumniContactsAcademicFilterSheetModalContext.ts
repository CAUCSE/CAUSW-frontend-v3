'use client';

import { createContext } from 'react';

import {
  type AlumniContactsAcademicStatusFilterOption,
  type AlumniContactsDepartmentFilterOption,
} from '@/entities/alumni-contacts/config';

interface AlumniContactsAcademicFilterSheetModalState {
  startAdmissionYear: number | null;
  endAdmissionYear: number | null;
  academicStatus: AlumniContactsAcademicStatusFilterOption[] | null;
  department: AlumniContactsDepartmentFilterOption[] | null;
}

interface AlumniContactsAcademicFilterSheetModalAction {
  setStartAdmissionYear: (startAdmissionYear: number | null) => void;
  setEndAdmissionYear: (endAdmissionYear: number | null) => void;
  setAcademicStatus: (
    academicStatus: AlumniContactsAcademicStatusFilterOption[] | null,
  ) => void;
  setDepartment: (
    department: AlumniContactsDepartmentFilterOption[] | null,
  ) => void;
  initialize: (
    startAdmissionYear: number | null,
    endAdmissionYear: number | null,
    academicStatus: AlumniContactsAcademicStatusFilterOption[] | null,
    department: AlumniContactsDepartmentFilterOption[] | null,
  ) => void;
  reset: () => void;
}

type AlumniContactsAcademicFilterSheetModalContextProps =
  AlumniContactsAcademicFilterSheetModalState &
    AlumniContactsAcademicFilterSheetModalAction;

export const AlumniContactsAcademicFilterSheetModalContext =
  createContext<AlumniContactsAcademicFilterSheetModalContextProps>({
    startAdmissionYear: null,
    endAdmissionYear: null,
    academicStatus: null,
    department: null,
    setStartAdmissionYear: () => {},
    setEndAdmissionYear: () => {},
    setAcademicStatus: () => {},
    setDepartment: () => {},
    initialize: () => {},
    reset: () => {},
  });
