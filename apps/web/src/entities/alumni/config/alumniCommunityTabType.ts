import { ROUTES } from '@/shared/constants';

export const ALUMNI_CONTACTS_TAB = {
  ALUMNI: 'alumni-contacts',
  COMMUNITY: 'community',
} as const;

export type AlumniContactsTabType =
  (typeof ALUMNI_CONTACTS_TAB)[keyof typeof ALUMNI_CONTACTS_TAB];

export const ALUMNI_CONTACTS_TAB_ROUTE: Record<AlumniContactsTabType, string> =
  {
    [ALUMNI_CONTACTS_TAB.ALUMNI]: ROUTES.ALUMNI_CONTACTS,
    [ALUMNI_CONTACTS_TAB.COMMUNITY]: ROUTES.COMMUNITY,
  };
