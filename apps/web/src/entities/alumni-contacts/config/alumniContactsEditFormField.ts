import { type ValueOf } from '@/shared/lib';

export const ALUMNI_CONTACTS_EDIT_FORM_FIELD = {
  DESCRIPTION: 'description',
  IS_PHONE_NUMBER_VISIBLE: 'isPhoneNumberVisible',
  SOCIAL_LINKS: 'socialLinks',
  USER_TECH_STACK: 'userTechStack',
  USER_CAREER: 'userCareer',
  USER_PROJECT: 'userProject',
  USER_INTEREST_TECH: 'userInterestTech',
  USER_INTEREST_DOMAIN: 'userInterestDomain',
} as const;

export type AlumniContactsEditFormField = ValueOf<
  typeof ALUMNI_CONTACTS_EDIT_FORM_FIELD
>;
