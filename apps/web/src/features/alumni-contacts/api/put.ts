import { ALUMNI_CONTACTS_URL_PREFIX } from '@/entities/alumni-contacts';

import { API } from '@/shared/api';

import { type PutMyAlumniContactsRequestDto } from '../model/types';

export const putMyAlumniContacts = async (
  dto: PutMyAlumniContactsRequestDto,
) => {
  // 1초 정도 대기
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  const url = `${ALUMNI_CONTACTS_URL_PREFIX}/me`;

  const response = await API.put(url, dto);

  return response;
};
