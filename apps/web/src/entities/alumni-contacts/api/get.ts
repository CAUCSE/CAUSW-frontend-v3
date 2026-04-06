import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import {
  type GetAlumniContactsDetailResponseDto,
  type GetAlumniContactsDetailParam,
  type GetAlumniContactsQuery,
  type GetPaginatedAlumniContactsResponseDto,
} from '../model';

const URL_PREFIX = '/api/v2/users-info';

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

  const url = withQuery(URL_PREFIX, queryString.toString());

  const response = await API.get<GetPaginatedAlumniContactsResponseDto>(url);

  return response;
};

export const getAlumniContactsDetail = async (
  param: GetAlumniContactsDetailParam,
) => {
  const { alumniContactsId } = param;

  const url = `${URL_PREFIX}/${alumniContactsId}`;

  const response = await API.get<GetAlumniContactsDetailResponseDto>(url);

  return response;
};
