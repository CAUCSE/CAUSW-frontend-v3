import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AlumniContactsAcademicStatusFilterOption,
  AlumniContactsSortFilterOption,
} from '@/entities/alumni-contacts/config';

interface UseAlumniContactsFilterState {
  keyword: string | null;
  admissionYearStart: number | null;
  admissionYearEnd: number | null;
  academicStatus: AlumniContactsAcademicStatusFilterOption[] | null;
  sortType: AlumniContactsSortFilterOption | null;
}

interface UseAlumniContactsFilterActions {
  setKeyword: (keyword: string | null) => void;
  setAdmissionYearStart: (admissionYearStart: number | null) => void;
  setAdmissionYearEnd: (admissionYearEnd: number | null) => void;
  setAcademicStatus: (
    academicStatus: AlumniContactsAcademicStatusFilterOption[] | null,
  ) => void;
  setSortType: (sortType: AlumniContactsSortFilterOption | null) => void;
  reset: () => void;
}

type UseAlumniContactsFilterSlice = UseAlumniContactsFilterState &
  UseAlumniContactsFilterActions;

export const useAlumniContactsFilterStore =
  create<UseAlumniContactsFilterSlice>()(
    persist(
      (set) => ({
        keyword: null,
        admissionYearStart: null,
        admissionYearEnd: null,
        academicStatus: null,
        sortType: null,
        setKeyword: (keyword) => set({ keyword }),
        setAdmissionYearStart: (admissionYearStart) =>
          set({ admissionYearStart }),
        setAdmissionYearEnd: (admissionYearEnd) => set({ admissionYearEnd }),
        setAcademicStatus: (academicStatus) => set({ academicStatus }),
        setSortType: (sortType) => set({ sortType }),
        reset: () =>
          set({
            keyword: null,
            admissionYearStart: null,
            admissionYearEnd: null,
            academicStatus: null,
            sortType: null,
          }),
      }),
      {
        name: 'alumni-contacts-filter',
      },
    ),
  );
