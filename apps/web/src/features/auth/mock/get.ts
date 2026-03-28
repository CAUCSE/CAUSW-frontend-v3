import { HttpResponse } from 'msw';

import { mswHttp } from '@/shared/lib';

const USER_API_PREFIX = '/api/v2/users';
const DUPLICATED_NICKNAMES = new Set(['admin', 'causw', 'test']);
const DUPLICATED_PHONE_NUMBERS = new Set([
  '010-1111-2222',
  '010-1234-5678',
  '010-9999-0000',
]);

export const getHandler = [
  mswHttp.get<null>(`${USER_API_PREFIX}/check-phone`, ({ request }) => {
    const { searchParams } = new URL(request.url);
    const phoneNumber = (searchParams.get('phoneNumber') ?? '').trim();

    if (!phoneNumber) {
      return HttpResponse.json(
        {
          code: 'E400',
          message: '전화번호를 입력해주세요.',
          data: undefined,
        },
        { status: 400 },
      );
    }

    if (DUPLICATED_PHONE_NUMBERS.has(phoneNumber)) {
      return HttpResponse.json(
        {
          code: 'E409',
          message: '이미 사용 중인 전화번호입니다.',
          data: undefined,
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        code: 'S000',
        message: '요청 처리 성공',
        data: null,
      },
      { status: 200 },
    );
  }),
  mswHttp.get<null>(`${USER_API_PREFIX}/check-nickname`, ({ request }) => {
    const { searchParams } = new URL(request.url);
    const nickname = (searchParams.get('nickname') ?? '').trim().toLowerCase();

    if (!nickname) {
      return HttpResponse.json(
        {
          code: 'E400',
          message: '닉네임을 입력해주세요.',
          data: undefined,
        },
        { status: 400 },
      );
    }

    if (DUPLICATED_NICKNAMES.has(nickname)) {
      return HttpResponse.json(
        {
          code: 'E409',
          message: '이미 사용 중인 닉네임입니다.',
          data: undefined,
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        code: 'S000',
        message: '요청 처리 성공',
        data: null,
      },
      { status: 200 },
    );
  }),
];
