import { HttpResponse, passthrough } from 'msw';

import { type UserResponseDto } from '@/entities/auth';

import { USER_API_PREFIX } from '@/shared/constants';
import { mswHttp } from '@/shared/lib';
const DUPLICATED_NICKNAMES = new Set(['admin', 'causw', 'test']);
const DUPLICATED_PHONE_NUMBERS = new Set([
  '010-1111-2222',
  '010-1234-5678',
  '010-9999-0000',
]);

export const getHandler = [
  mswHttp.get<UserResponseDto>(`${USER_API_PREFIX}/me`, () => {
    return passthrough();
    return HttpResponse.json(
      {
        code: 'S000',
        message: '요청 처리 성공',
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: '모킹 이름',
          nickname: '모킹 닉네임',
          profileImage: {
            profileImageType: 'MALE_1',
            profileImageUrl: '',
          },
          admissionYear: 2020,
          job: '개발자',
          onboardingStatus: 'ACADEMIC_CERTIFICATION_REQUIRED',
          academicStatus: 'ENROLLED',
        },
      },
      { status: 200 },
    );
  }),
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
