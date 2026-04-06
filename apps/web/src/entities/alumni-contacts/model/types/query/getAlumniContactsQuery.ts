import {
  type AlumniContactsAcademicStatusFilterOption,
  type AlumniContactsSortFilterOption,
} from '@/entities/alumni-contacts/config';

export interface GetAlumniContactsQuery {
  keyword?: string;
  admissionYearStart?: number;
  admissionYearEnd?: number;
  academicStatus?: AlumniContactsAcademicStatusFilterOption[];
  sortType?: AlumniContactsSortFilterOption;
}
