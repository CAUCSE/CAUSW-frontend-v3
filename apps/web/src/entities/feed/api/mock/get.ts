import { HttpResponse } from 'msw';

import { mswHttp } from '@/shared/lib';

import { type BoardAvailableListResponseDto } from '../../model';

const BOARDS_API_PREFIX = '/api/v2/boards';

export const getHandler = [
  mswHttp.get<BoardAvailableListResponseDto>(
    `${BOARDS_API_PREFIX}/available`,
    () => {
      return HttpResponse.json(
        {
          code: 'S000',
          message: '요청 처리 성공',
          data: {
            boards: [
              {
                id: '2c9f86a98e1861d8018e186a8acd0000',
                name: '일반',
              },
              {
                id: 'a5535d2f-a991-4246-a83e-5b6b6f6974e7',
                name: '학생회',
              },
              {
                id: '4c9f86a98e1861d8018e186a8acd0000',
                name: '크자회',
              },
              {
                id: '5c9f86a98e1861d8018e186a8acd0000',
                name: '소프트웨어학부',
              },
            ],
          },
        },
        { status: 200 },
      );
    },
  ),
];
