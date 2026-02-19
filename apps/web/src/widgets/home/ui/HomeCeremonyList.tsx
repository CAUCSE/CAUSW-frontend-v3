import Link from 'next/link';

import {
  ChevronRight,
  Flex,
  HeartColored,
  HStack,
  //ScholarColored,
  Separator,
  Text,
  VStack,
} from '@causw/cds';
import { Bell } from '@causw/cds'; // Placeholder

import { COPY, ROUTES } from '@/shared';
//TODO : 경조사 종류에 따라 아이콘 분기
//TODO : 데이터 없을떄 bell 아이콘 디자인 시스템에서 추가되면 수정
const CEREMONY_ITEMS = [
  {
    id: 1,
    title: '홍길동(21학번) 졸업식',
    date: '10/10 - 10/24',
    type: '경사',
  },
  {
    id: 2,
    title: '김영희(19학번) 결혼식',
    date: '10/10 - 10/24',
    type: '경사',
  },
  {
    id: 3,
    title: '이철수(20학번) 개업식',
    date: '10/12 - 10/24',
    type: '경사',
  },
  {
    id: 4,
    title: '박민수(18학번) 칠순 잔치',
    date: '10/15 - 10/24',
    type: '경사',
  },
  {
    id: 5,
    title: '최지우(22학번) 졸업 전시회',
    date: '10/18 - 10/24',
    type: '행사',
  },
  {
    id: 6,
    title: '정수민(19학번) 결혼식',
    date: '10/20 - 10/24',
    type: '경사',
  },
];

export function HomeCeremonyList() {
  const isEmpty = CEREMONY_ITEMS.length === 0;

  return (
    <VStack className="gap-2">
      <Flex className="hidden flex-col gap-2 md:flex">
        <Text typography="title-22-bold">{COPY.HOME_CEREMONY_TITLE}</Text>
      </Flex>
      <VStack className="w-full gap-5 rounded-[16px] bg-white p-5">
        <Text typography="subtitle-18-bold" className="md:hidden">
          {COPY.HOME_CEREMONY_TITLE}
        </Text>

        {isEmpty ? (
          <VStack className="w-full items-center gap-4 py-5">
            <Bell size={52} className="text-gray-300" />

            <Text typography="body-14-medium" textColor="gray-400">
              {COPY.EMPTY_CEREMONY}
            </Text>
          </VStack>
        ) : (
          <VStack className="w-full gap-5">
            {CEREMONY_ITEMS.slice(0, 6).map((item, index) => (
              <Link
                key={item.id}
                href={`${ROUTES.CEREMONY}/${item.id}`}
                className={`w-full ${index >= 4 ? 'hidden md:flex' : 'flex'}`}
              >
                <HStack className="w-full items-center justify-between gap-5">
                  <HStack className="flex-1 items-center gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#F5F6F8]">
                      <HeartColored size={20} className="text-[#FFC100]" />
                    </div>
                    <VStack className="flex-1 justify-center gap-0.5 overflow-hidden">
                      <Text typography="subtitle-16-bold" className="truncate">
                        {item.title}
                      </Text>
                      <HStack className="items-center gap-1 text-sm">
                        <Text typography="body-14-regular" textColor="gray-400">
                          {item.date}
                        </Text>
                        <Separator
                          orientation="vertical"
                          className="h-2 bg-gray-200"
                        />
                        <Text typography="body-14-regular" textColor="gray-400">
                          {item.type}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <ChevronRight size={16} className="shrink-0" />
                </HStack>
              </Link>
            ))}
          </VStack>
        )}

        <Link
          href={ROUTES.CEREMONY}
          className="flex w-full items-center justify-center rounded-[0.75rem] bg-blue-100 px-2 py-[0.875rem]"
        >
          <Text typography="body-15-semibold" textColor="blue-700">
            {COPY.CEREMONY_VIEW_ALL}
          </Text>
        </Link>
      </VStack>
    </VStack>
  );
}
