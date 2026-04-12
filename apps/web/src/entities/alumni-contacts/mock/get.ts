import { HttpResponse } from 'msw';

import { mswHttp } from '@/shared/lib';

import { ALUMNI_CONTACTS_URL_PREFIX } from '../config';
import { type GetAlumniContactsDetailResponseDto } from '../model';

import { alumniContactsDetailMockDb } from './mockDb';

export const getHandler = [
  mswHttp.get<GetAlumniContactsDetailResponseDto, { id: string }>(
    `${ALUMNI_CONTACTS_URL_PREFIX}/:id`,
    ({ params }) => {
      return HttpResponse.json({
        code: 'S000',
        message: '요청 처리 성공',
        data: {
          ...alumniContactsDetailMockDb,
          id: params.id,
        },
      });
    },
  ),
];
