import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import type {
  GetAlumniContactsQuery,
  GetPaginatedAlumniContactsResponseDto,
  AlumniDetailResponseDto,
} from '../types';

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

export const getAlumniDetail = async (userInfoId: string) => {
  const url = `${URL_PREFIX}/${userInfoId}`;
  const response = await API.get<AlumniDetailResponseDto>(url);

  return response;
};
