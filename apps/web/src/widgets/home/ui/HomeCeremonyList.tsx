import Link from 'next/link';

import {
  Flex,
  HeartColored,
  //ScholarColored,
  Text,
  VStack,
} from '@causw/cds';
import { Bell } from '@causw/cds'; // Placeholder

import { ActionCard, COPY, EmptyStateView, ROUTES } from '@/shared';
//TODO : 경조사 종류에 따라 아이콘 분기
//TODO : 데이터 없을떄 bell 아이콘 디자인 시스템에서 추가되면 수정
const CEREMONY_ITEMS = [
  {
    id: 1,
    title: '홍길동(21학번) 졸업식',
    date: '10/10 - 10/24',
    type: '경사',
    link: 'd',
  },
  {
    id: 2,
    title: '김영희(19학번) 결혼식',
    date: '10/10 - 10/24',
    type: '경사',
    link: 'd',
  },
  {
    id: 3,
    title: '이철수(20학번) 개업식',
    date: '10/12 - 10/24',
    type: '경사',
    link: 'd',
  },
  {
    id: 4,
    title: '박민수(18학번) 칠순 잔치',
    date: '10/15 - 10/24',
    type: '경사',
    link: 'd',
  },
  {
    id: 5,
    title: '최지우(22학번) 졸업 전시회',
    date: '10/18 - 10/24',
    type: '행사',
    link: 'd',
  },
  {
    id: 6,
    title: '정수민(19학번)d 결혼식',
    date: '10/20 - 10/24',
    type: '경사',
    link: 'd',
  },
];

export function HomeCeremonyList() {
  const isEmpty = CEREMONY_ITEMS.length === 0;

  return (
    <VStack className="gap-2">
      <Flex className="desktop:flex hidden flex-col gap-2">
        <Text typography="title-22-bold">{COPY.HOME_CEREMONY_TITLE}</Text>
      </Flex>
      <VStack className="w-full gap-5 rounded-[16px] bg-white p-5">
        <Text typography="subtitle-18-bold" className="desktop:hidden">
          {COPY.HOME_CEREMONY_TITLE}
        </Text>

        {isEmpty ? (
          <EmptyStateView
            message={COPY.EMPTY_CEREMONY}
            icon={<Bell size={50} />}
          />
        ) : (
          <VStack className="w-full gap-5">
            {CEREMONY_ITEMS.slice(0, 6).map((item) => (
              <ActionCard
                key={item.id}
                link={item.link}
                title={item.title}
                icon={<HeartColored size={20} className="text-[#FFC100]" />}
                descriptions={[item.date, item.type]}
                size="sm"
              />
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
