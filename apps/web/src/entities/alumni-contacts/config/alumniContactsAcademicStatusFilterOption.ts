export const ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION = {
  ENROLLED: {
    label: '재학생',
    value: 'ENROLLED',
  },
  GRADUATED: {
    label: '졸업생',
    value: 'GRADUATED',
  },
} as const;

export type AlumniContactsAcademicStatusFilterOption =
  keyof typeof ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION;
