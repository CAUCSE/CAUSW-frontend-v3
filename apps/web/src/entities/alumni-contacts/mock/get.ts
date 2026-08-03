import { HttpResponse, passthrough } from 'msw';

import { mswHttp } from '@/shared/lib';

import {
  ALUMNI_CONTACTS_SECTION_TYPE,
  ALUMNI_CONTACTS_URL_PREFIX,
} from '../config';
import {
  type GetAlumniContactsDetailResponseDto,
  type GetAlumniDirectoryResponseDto,
} from '../model';

import {
  alumniContactsDetailMockDb,
  alumniDirectoryMockDb,
  myAlumniProfileMockDb,
} from './mockDb';

export const getHandler = [
  mswHttp.get<GetAlumniContactsDetailResponseDto, { id: string }>(
    `${ALUMNI_CONTACTS_URL_PREFIX}/:id`,
    ({ params }) => {
      return passthrough();
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
  // TODO: 백엔드가 GET /api/v2/users-info 커서 계약을 배포하면 passthrough()로 전환
  mswHttp.get<GetAlumniDirectoryResponseDto>(
    ALUMNI_CONTACTS_URL_PREFIX,
    ({ request }) => {
      const url = new URL(request.url);
      const cursor = url.searchParams.get('cursor');
      const keyword = url.searchParams.get('keyword');
      const coffeeChatSize = Number(
        url.searchParams.get('coffeeChatSize') ?? 10,
      );
      const allMembersSize = Number(
        url.searchParams.get('allMembersSize') ?? 10,
      );

      const [coffeeChatOffset, allMembersOffset] = (cursor ?? '0:0')
        .split(':')
        .map((value) => Number(value) || 0);

      const matchesKeyword = (
        name: string | null,
        description: string | null,
      ) =>
        !keyword ||
        (name?.includes(keyword) ?? false) ||
        (description?.includes(keyword) ?? false);

      const coffeeChatAll = alumniDirectoryMockDb.filter(
        (item) =>
          item.isCoffeeChatAvailable &&
          matchesKeyword(item.name, item.description),
      );
      const allMembersAll = alumniDirectoryMockDb.filter(
        (item) =>
          !item.isCoffeeChatAvailable &&
          matchesKeyword(item.name, item.description),
      );

      const coffeeChatItems = coffeeChatAll.slice(
        coffeeChatOffset,
        coffeeChatOffset + coffeeChatSize,
      );
      const allMembersItems = allMembersAll.slice(
        allMembersOffset,
        allMembersOffset + allMembersSize,
      );

      const nextCoffeeChatOffset = coffeeChatOffset + coffeeChatItems.length;
      const nextAllMembersOffset = allMembersOffset + allMembersItems.length;

      const coffeeChatHasNext = nextCoffeeChatOffset < coffeeChatAll.length;
      const allMembersHasNext = nextAllMembersOffset < allMembersAll.length;

      const nextCursor =
        coffeeChatHasNext || allMembersHasNext
          ? `${nextCoffeeChatOffset}:${nextAllMembersOffset}`
          : null;

      return HttpResponse.json({
        code: 'S000',
        message: '요청 처리 성공',
        data: {
          myProfile: cursor ? null : myAlumniProfileMockDb,
          sections: [
            {
              type: ALUMNI_CONTACTS_SECTION_TYPE.COFFEE_CHAT_AVAILABLE,
              items: coffeeChatItems,
              hasNext: coffeeChatHasNext,
            },
            {
              type: ALUMNI_CONTACTS_SECTION_TYPE.ALL_MEMBERS,
              items: allMembersItems,
              hasNext: allMembersHasNext,
            },
          ],
          nextCursor,
        },
      });
    },
  ),
];
