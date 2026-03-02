import { HttpResponse } from 'msw';

import {
  SigninResponseDto,
  SignoutResponseDto,
  SignupResponseDto,
} from '@/entities/auth';

import { mswHttp } from '@/shared/lib';

const BASE_URL = '/api/v2/auth';

export const postHandler = [
  mswHttp.post<SignupResponseDto>(`${BASE_URL}/signup`, () => {
    return HttpResponse.json(
      {
        code: '201',
        message: 'Signup successful',
        data: {
          accessToken: '1234567890',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profileImgUrl: 'https://picsum.photos/seed/profile1/200/200',
        },
      },
      {
        status: 201,
      },
    );
  }),
  mswHttp.post<SigninResponseDto>(`${BASE_URL}/login`, () => {
    return HttpResponse.json(
      {
        code: '201',
        message: 'Login successful',
        data: {
          accessToken: '1234567890',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profileImgUrl: 'https://picsum.photos/seed/profile1/200/200',
        },
      },
      { status: 201 },
    );
  }),
  mswHttp.post<SignoutResponseDto>(`${BASE_URL}/logout`, () => {
    return HttpResponse.json(
      {
        code: '204',
        data: undefined,
      },
      { status: 204 },
    );
  }),
];
