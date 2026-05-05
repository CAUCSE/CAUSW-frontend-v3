export const ALUMNI_CONTACTS_SORT_FILTER_OPTION = {
  UPDATED_AT_DESC: {
    label: '수정된 시간순',
    value: 'UPDATED_AT_DESC',
  },
  ADMISSION_YEAR_ASC: {
    label: '고학번순',
    value: 'ADMISSION_YEAR_ASC',
  },
  ADMISSION_YEAR_DESC: {
    label: '저학번순',
    value: 'ADMISSION_YEAR_DESC',
  },
} as const;

export type AlumniContactsSortFilterOption =
  (typeof ALUMNI_CONTACTS_SORT_FILTER_OPTION)[keyof typeof ALUMNI_CONTACTS_SORT_FILTER_OPTION]['value'];
