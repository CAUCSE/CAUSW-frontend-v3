import { type ValueOf } from '@/shared/lib';

export const ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE = {
  USER_CAREER: 'userCareer',
  USER_PROJECT: 'userProject',
} as const;

export type AlumniContactsProfileEntryType = ValueOf<
  typeof ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE
>;
