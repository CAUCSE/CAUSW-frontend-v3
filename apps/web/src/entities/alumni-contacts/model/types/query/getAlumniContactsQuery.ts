import {
  type AlumniContactsAcademicStatusFilterOption,
  type AlumniContactsDepartmentFilterOption,
  type AlumniContactsSortFilterOption,
} from '@/entities/alumni-contacts/config';

export interface GetAlumniContactsQuery {
  keyword?: string;
  admissionYearStart?: number;
  admissionYearEnd?: number;
  academicStatus?: AlumniContactsAcademicStatusFilterOption[];
  department?: AlumniContactsDepartmentFilterOption[];
  sortType?: AlumniContactsSortFilterOption;
}
