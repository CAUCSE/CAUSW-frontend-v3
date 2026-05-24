import { HttpResponse, passthrough } from 'msw';

import { type AuthResponseDto, type SignoutResponseDto } from '@/entities/auth';

import { AUTH_API_PREFIX } from '@/shared/constants';
import { mswHttp } from '@/shared/lib';

export const postHandler = [
  mswHttp.post<AuthResponseDto>(`${AUTH_API_PREFIX}/signup`, () => {
    return passthrough();
    return HttpResponse.json(
      {
        code: '201',
        message: 'Signup successful',
        data: {
          accessToken: '1234567890',
          refreshToken: 'refresh-1234567890',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profileImage: {
            profileImageType: 'CUSTOM',
            profileImageUrl: 'https://picsum.photos/seed/profile1/200/200',
          },
          onboardingStatus: 'GUEST',
          academicStatus: 'ENROLLED',
        },
      },
      {
        status: 201,
      },
    );
  }),
  mswHttp.post<AuthResponseDto>(`${AUTH_API_PREFIX}/login`, () => {
    return passthrough();
    return HttpResponse.json(
      {
        code: '201',
        message: 'Login successful',
        data: {
          accessToken: '1234567890',
          refreshToken: 'refresh-1234567890',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profileImage: {
            profileImageType: 'CUSTOM',
            profileImageUrl: 'https://picsum.photos/seed/profile1/200/200',
          },
          onboardingStatus: 'GUEST',
          academicStatus: 'ENROLLED',
        },
      },
      { status: 201 },
    );
  }),
  mswHttp.post<AuthResponseDto>(`${AUTH_API_PREFIX}/login/native`, () => {
    return passthrough();
    return HttpResponse.json(
      {
        code: '201',
        message: 'Native social login successful',
        data: {
          accessToken: '1234567890',
          refreshToken: 'refresh-1234567890',
          name: '홍길동',
          email: 'hong.gildong@example.com',
          profileImage: {
            profileImageType: 'CUSTOM',
            profileImageUrl: 'https://cdn.example.com/profile/image.png',
          },
          onboardingStatus: 'GUEST',
          academicStatus: 'ENROLLED',
        },
      },
      { status: 201 },
    );
  }),
  mswHttp.post<SignoutResponseDto>(`${AUTH_API_PREFIX}/logout`, () => {
    return passthrough();
    return HttpResponse.json(
      {
        code: '204',
        data: undefined,
      },
      { status: 204 },
    );
  }),
];
