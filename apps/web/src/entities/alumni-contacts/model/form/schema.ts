import { z } from 'zod';

import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH } from '../../config';

const periodSchema = z.array(
  z.object({
    id: z.string().optional(),
    startYear: z.number().min(1900).max(new Date().getFullYear()),
    startMonth: z.number().min(1).max(12),
    endYear: z.number().min(1900).max(new Date().getFullYear()).nullable(),
    endMonth: z.number().min(1).max(12).nullable(),
    description: z
      .string()
      .min(0)
      .max(ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.CAREER_DESCRIPTION),
  }),
);

const careerSchema = periodSchema;
const projectSchema = periodSchema;

export const alumniContactsEditSchema = z.object({
  description: z
    .string()
    .min(0)
    .max(ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.DESCRIPTION),
  isPhoneNumberVisible: z.boolean(),
  socialLinks: z
    .array(z.string())
    .min(0)
    .max(ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.SOCIAL_LINKS),
  userTechStack: z.array(z.string()),
  userCareer: careerSchema,
  userProject: projectSchema,
  userInterestTech: z.array(z.string()),
  userInterestDomain: z.array(z.string()),
});

export type AlumniContactsEditForm = z.infer<typeof alumniContactsEditSchema>;
