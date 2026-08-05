import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { ALUMNI_CONTACTS_URL_PREFIX } from '../config';
import {
  type GetAlumniContactsDetailResponseDto,
  type GetAlumniContactsDetailParam,
  type GetAlumniContactsQuery,
  type GetAlumniDirectoryResponseDto,
  type GetMyAlumniContactsResponseDto,
} from '../model';

export const getAlumniContacts = async (
  query: GetAlumniContactsQuery,
  cursor?: string,
) => {
  const queryString = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryString.append(key, value);
    }
  });

  if (cursor) {
    queryString.append('cursor', cursor);
  }

  const url = withQuery(
    `${ALUMNI_CONTACTS_URL_PREFIX}/list`,
    queryString.toString(),
  );

  const response = await API.get<GetAlumniDirectoryResponseDto>(url);

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

export const getMyAlumniContacts = async () => {
  const url = `${ALUMNI_CONTACTS_URL_PREFIX}/me`;

  const response = await API.get<GetMyAlumniContactsResponseDto>(url);

  return response;
};
