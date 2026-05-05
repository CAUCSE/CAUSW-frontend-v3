export const ALUMNI_CONTACTS_FILTER = {
  KEYWORD: 'keyword',
  ADMISSION_YEAR_START: 'admissionYearStart',
  ADMISSION_YEAR_END: 'admissionYearEnd',
  ACADEMIC_STATUS: 'academicStatus',
  SORT_TYPE: 'sortType',
} as const;

export type AlumniContactsFilter =
  (typeof ALUMNI_CONTACTS_FILTER)[keyof typeof ALUMNI_CONTACTS_FILTER];
