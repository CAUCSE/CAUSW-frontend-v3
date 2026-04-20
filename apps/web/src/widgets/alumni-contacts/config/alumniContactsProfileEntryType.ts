import { type ValueOf } from '@/shared/lib';

export const ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE = {
  CAREER: 'career',
  PROJECT: 'project',
} as const;

export type AlumniContactsProfileEntryType = ValueOf<
  typeof ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE
>;
