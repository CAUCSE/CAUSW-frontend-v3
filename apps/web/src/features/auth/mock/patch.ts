import { HttpResponse } from 'msw';

import { type AuthResponseDto } from '@/entities/auth';

import { mswHttp } from '@/shared/lib';

const USER_API_PREFIX = '/api/v2/users';

export const patchHandler = [
  mswHttp.patch<AuthResponseDto>(`${USER_API_PREFIX}/me/registration`, () => {
    return HttpResponse.json(
      {
        code: 'S000',
        message: '요청 처리 성공',
        data: {
          accessToken: 'test',
          name: 'test',
          email: 'test',
          profileImage: {
            profileImageType: 'MALE_1',
            profileImageUrl: 'test',
          },
          onboardingStatus: 'ACADEMIC_CERTIFICATION_REQUIRED',
          academicStatus: 'ENROLLED',
        },
      },
      { status: 200 },
    );
  }),
];
