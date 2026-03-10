import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import type {
  GetAlumniContactsQuery,
  GetPaginatedAlumniContactsResponseDto,
} from '../types';

const URL_PREFIX = '/api/v2/users-info';

export const getAlumniContacts = async (query: GetAlumniContactsQuery) => {
  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryString.append(key, value);
    }
  });

  const url = withQuery(URL_PREFIX, queryString.toString());

  return await API.get<GetPaginatedAlumniContactsResponseDto>(url);
};
