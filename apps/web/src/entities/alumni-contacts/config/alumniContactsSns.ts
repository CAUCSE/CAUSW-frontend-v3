export const ALUMNI_CONTACTS_SNS_TYPE = {
  INSTAGRAM: 'instagram',
  GITHUB: 'github',
  TISTORY: 'tistory',
  LINKEDIN: 'linkedin',
  ETC: 'etc',
} as const;

export const ALUMNI_CONTACTS_SNS_TYPE_LABEL = {
  [ALUMNI_CONTACTS_SNS_TYPE.INSTAGRAM]: '인스타그램',
  [ALUMNI_CONTACTS_SNS_TYPE.GITHUB]: '깃허브',
  [ALUMNI_CONTACTS_SNS_TYPE.TISTORY]: '티스토리',
  [ALUMNI_CONTACTS_SNS_TYPE.LINKEDIN]: '링크드인',
  [ALUMNI_CONTACTS_SNS_TYPE.ETC]: '기타 링크',
} as const;

export type AlumniContactsSnsType =
  (typeof ALUMNI_CONTACTS_SNS_TYPE)[keyof typeof ALUMNI_CONTACTS_SNS_TYPE];
