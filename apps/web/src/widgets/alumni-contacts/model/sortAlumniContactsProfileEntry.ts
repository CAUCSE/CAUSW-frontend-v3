import { isNil } from 'es-toolkit';

import { type GetMyAlumniContactsResponseDto } from '@/entities/alumni-contacts/model';

type AlumniContactsCareerEntry = Omit<
  GetMyAlumniContactsResponseDto['userCareer'][number],
  'id'
> & { id?: string };

type AlumniContactsProjectEntry = Omit<
  GetMyAlumniContactsResponseDto['userProject'][number],
  'id'
> & { id?: string };

type AlumniContactsProfileEntry =
  | AlumniContactsCareerEntry
  | AlumniContactsProjectEntry;

export const sortAlumniContactsProfileEntry = (
  a: AlumniContactsProfileEntry,
  b: AlumniContactsProfileEntry,
) => {
  // 둘다 현재 중인 경우
  if (isNil(a.endYear) && isNil(b.endYear)) {
    if (a.startYear === b.startYear) {
      if (a.startMonth === b.startMonth) {
        return a.description.localeCompare(b.description);
      }
      return b.startMonth - a.startMonth;
    }
    return b.startYear - a.startYear;
  }

  if (isNil(a.endYear) || isNil(a.endMonth)) {
    return -1;
  }

  if (isNil(b.endYear) || isNil(b.endMonth)) {
    return 1;
  }

  if (a.startYear === b.startYear) {
    if (a.startMonth === b.startMonth) {
      if (a.endYear === b.endYear) {
        if (a.endMonth === b.endMonth) {
          return a.description.localeCompare(b.description);
        }
        return b.endMonth - a.endMonth;
      }
      return b.endYear - a.endYear;
    }
    return b.startMonth - a.startMonth;
  }
  return b.startYear - a.startYear;
};
