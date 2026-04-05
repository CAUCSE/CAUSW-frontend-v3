import { isNil } from 'es-toolkit';
import { z } from 'zod';

import {
  ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION,
  ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER,
  ALUMNI_CONTACTS_FILTER,
  ALUMNI_CONTACTS_SORT_FILTER_OPTION,
  type AlumniContactsAcademicStatusFilterOption,
  type AlumniContactsSortFilterOption,
} from '../config';

const admissionYearSchema = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .refine((value) => {
    return (
      value >= ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER.MIN &&
      value <= ALUMNI_CONTACTS_ADMISSION_YEAR_FILTER.MAX
    );
  })
  .optional();

export const AlumniContactsFilterSearchParam = z
  .object({
    keyword: z.string().optional(),
    admissionYearStart: admissionYearSchema,
    admissionYearEnd: admissionYearSchema,
    academicStatus: z
      .string()
      .refine((value) => {
        const academicStatuses = value.split(',');
        for (const status of academicStatuses) {
          if (
            !Object.values(ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION).some(
              (option) => option.value === status,
            )
          ) {
            return false;
          }
        }
        return true;
      })
      .transform((value) => {
        return value.split(',') as AlumniContactsAcademicStatusFilterOption[];
      })
      .optional(),
    sortType: z
      .enum(
        Object.values(ALUMNI_CONTACTS_SORT_FILTER_OPTION).map(
          (option) => option.value,
        ) as [
          AlumniContactsSortFilterOption,
          ...AlumniContactsSortFilterOption[],
        ],
      )
      .optional(),
  })
  .refine(
    (data) => {
      const { admissionYearStart, admissionYearEnd } = data;
      if (isNil(admissionYearStart) || isNil(admissionYearEnd)) {
        return true;
      }

      return admissionYearStart <= admissionYearEnd;
    },
    {
      path: [ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START],
    },
  );
