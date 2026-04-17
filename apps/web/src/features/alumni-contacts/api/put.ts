import { ALUMNI_CONTACTS_URL_PREFIX } from '@/entities/alumni-contacts';

import { API } from '@/shared/api';

import { type PutMyAlumniContactsRequestDto } from '../model/types';

export const putMyAlumniContacts = async (
  dto: PutMyAlumniContactsRequestDto,
) => {
  const url = `${ALUMNI_CONTACTS_URL_PREFIX}/me`;

  const response = await API.put(url, dto);

  return response;
};
