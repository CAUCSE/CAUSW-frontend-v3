import { HttpResponse } from 'msw';

import { mswHttp } from '@/shared/lib';

const USER_API_PREFIX = '/api/v2/users';

export const patchHandler = [
  mswHttp.patch<null>(`${USER_API_PREFIX}/me/registration`, () => {
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
