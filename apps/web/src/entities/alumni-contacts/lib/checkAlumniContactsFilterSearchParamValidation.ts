import { redirect } from 'next/navigation';

import type { NextSearchParams } from '@/shared/types';

import { ALUMNI_CONTACTS_FILTER, type AlumniContactsFilter } from '../config';

import { AlumniContactsFilterSearchParam } from './alumniContactsFilterSearchParam';

export const checkAlumniContactsFilterSearchParamValidation = async (
  searchParams: NextSearchParams<AlumniContactsFilter>,
) => {
  const params = await searchParams;
  const filterSearchParamsValidateResult =
    AlumniContactsFilterSearchParam.safeParse(params);

  if (!filterSearchParamsValidateResult.success) {
    const failedFields = filterSearchParamsValidateResult.error.errors.map(
      (e) => e.path[0],
    );
    const newParams = new URLSearchParams(params as Record<string, string>);

    for (const field of failedFields) {
      if (
        field === ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START ||
        field === ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END
      ) {
        newParams.delete(ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_START);
        newParams.delete(ALUMNI_CONTACTS_FILTER.ADMISSION_YEAR_END);
        continue;
      }
      newParams.delete(field as string);
    }

    redirect(`/alumni-contacts?${newParams.toString()}`);
  }
};
