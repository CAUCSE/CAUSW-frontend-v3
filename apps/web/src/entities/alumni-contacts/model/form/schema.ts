import { z } from 'zod';

const periodSchema = z.array(
  z.object({
    id: z.string().optional(),
    startYear: z.number().min(1900).max(new Date().getFullYear()),
    startMonth: z.number().min(1).max(12),
    endYear: z.number().min(1900).max(new Date().getFullYear()).nullable(),
    endMonth: z.number().min(1).max(12).nullable(),
    description: z.string().min(0).max(50),
  }),
);

export const alumniContactsEditSchema = z.object({
  job: z.string().min(0).max(30),
  description: z.string().min(0).max(100),
  isPhoneNumberVisible: z.boolean(),
  socialLinks: z.array(z.string()).min(0).max(10),
  userTechStack: z.array(z.string()),
  userCareer: periodSchema,
  userProject: periodSchema,
  userInterestTech: z.array(z.string()),
  userInterestDomain: z.array(z.string()),
});

export type AlumniContactsEditForm = z.infer<typeof alumniContactsEditSchema>;
