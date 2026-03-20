import type {
  AlumniContactsAcademicStatusFilterOption,
  AlumniContactsSortFilterOption,
} from '../../config';

export interface GetAlumniContactsQuery {
  keyword?: string;
  admissionYearStart?: number;
  admissionYearEnd?: number;
  academicStatus?: AlumniContactsAcademicStatusFilterOption[];
  sortType?: AlumniContactsSortFilterOption;
}
