import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { ALUMNI_CONTACTS_URL_PREFIX } from '../config';
import {
  type GetAlumniContactsDetailResponseDto,
  type GetAlumniContactsDetailParam,
  type GetAlumniContactsQuery,
  type GetPaginatedAlumniContactsResponseDto,
} from '../model';

export const getAlumniContacts = async (
  query: GetAlumniContactsQuery,
  pageNum: number = 0,
) => {
  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryString.append(key, value);
    }
  });

  queryString.append('pageNum', pageNum.toString());

  const url = withQuery(ALUMNI_CONTACTS_URL_PREFIX, queryString.toString());

  const response = await API.get<GetPaginatedAlumniContactsResponseDto>(url);

  return response;
};

export const getAlumniContactsDetail = async (
  param: GetAlumniContactsDetailParam,
) => {
  const { alumniContactsId } = param;

  const url = `${ALUMNI_CONTACTS_URL_PREFIX}/${alumniContactsId}`;

  const response = await API.get<GetAlumniContactsDetailResponseDto>(url);

  return response;
};
