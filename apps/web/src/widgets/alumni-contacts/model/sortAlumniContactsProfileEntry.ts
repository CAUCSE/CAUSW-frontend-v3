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

const isCurrentEntry = (entry: AlumniContactsProfileEntry) =>
  isNil(entry.endYear) || isNil(entry.endMonth);

const compareStartDateDesc = (
  a: AlumniContactsProfileEntry,
  b: AlumniContactsProfileEntry,
) => b.startYear - a.startYear || b.startMonth - a.startMonth;

const compareEndDateDesc = (
  a: AlumniContactsProfileEntry,
  b: AlumniContactsProfileEntry,
) => {
  if (isNil(a.endYear) || isNil(a.endMonth)) {
    return -1;
  }

  if (isNil(b.endYear) || isNil(b.endMonth)) {
    return 1;
  }

  return b.endYear - a.endYear || b.endMonth - a.endMonth;
};

export const sortAlumniContactsProfileEntry = (
  a: AlumniContactsProfileEntry,
  b: AlumniContactsProfileEntry,
) => {
  const isCurrentA = isCurrentEntry(a);
  const isCurrentB = isCurrentEntry(b);

  if (isCurrentA && !isCurrentB) {
    return -1;
  }

  if (!isCurrentA && isCurrentB) {
    return 1;
  }

  if (isCurrentA && isCurrentB) {
    return (
      compareStartDateDesc(a, b) || a.description.localeCompare(b.description)
    );
  }

  return (
    compareEndDateDesc(a, b) ||
    compareStartDateDesc(a, b) ||
    a.description.localeCompare(b.description)
  );
};
