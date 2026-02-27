'use client';

import Link from 'next/link';

import { Flex, HeartColored, Text, VStack, BellGrayColored } from '@causw/cds';

import { useUpcomingCeremonies } from '@/entities/ceremony';

import { COPY, ROUTES } from '@/shared/constants';
import { formatToMonthDay } from '@/shared/lib';
import {
  ErrorView,
  EventCard,
  NoDataView,
  QueryErrorBoundary,
} from '@/shared/ui';

function CeremonyListContent() {
  const { data } = useUpcomingCeremonies();
  const ceremonies = data?.content || [];

  const isEmpty = ceremonies.length === 0;

  if (isEmpty) {
    return (
      <NoDataView
        message={COPY.EMPTY_CEREMONY}
        icon={<BellGrayColored size={52} />}
      />
    );
  }

  // 모바일은 최대 4개, 데스크탑은 최대 6개까지 표시
  return (
    <VStack className="w-full gap-5">
      {ceremonies.slice(0, 6).map((item, index) => (
        <div
          key={item.id}
          className={index >= 4 ? 'desktop:block hidden' : 'block'}
        >
          <EventCard
            // TODO: 페이지 만들어지면 링크 맞는 지 확인
            link={`${ROUTES.CEREMONY}/${item.id}`}
            title={item.title}
            icon={<HeartColored size={24} />}
            descriptions={[
              `${formatToMonthDay(item.startDate)} - ${formatToMonthDay(item.endDate)}`,
              item.category || item.type,
            ]}
          />
        </div>
      ))}
    </VStack>
  );
}

export function CeremonyListPreview() {
  return (
    <VStack className="gap-2">
      <Flex className="desktop:flex hidden flex-col gap-2">
        <Text typography="title-22-bold">{COPY.HOME_CEREMONY_TITLE}</Text>
      </Flex>
      <VStack className="w-full gap-5 rounded-[16px] bg-white p-5">
        <Text typography="subtitle-18-bold" className="desktop:hidden">
          {COPY.HOME_CEREMONY_TITLE}
        </Text>

        <QueryErrorBoundary FallbackComponent={ErrorView}>
          <CeremonyListContent />
        </QueryErrorBoundary>

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
