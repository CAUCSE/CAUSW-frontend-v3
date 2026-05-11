'use client';

import Link from 'next/link';

import { Flex, Text, VStack, BellGrayColored, CTAButton } from '@causw/cds';

import { useUpcomingCeremonies, getCeremonyIcon } from '@/entities/ceremony';

import { COPY, ROUTES } from '@/shared/constants';
import { formatToMonthDay } from '@/shared/lib';
import {
  ErrorView,
  EventCard,
  NoDataView,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

function CeremonyListContent() {
  const { data, isLoading } = useUpcomingCeremonies();
  const ceremonies = data?.content || [];

  const isEmpty = ceremonies.length === 0;

  if (isLoading) {
    return <SuspenseView />;
  }

  if (isEmpty) {
    return (
      <NoDataView>
        <NoDataView.Icon>
          <BellGrayColored size={52} />
        </NoDataView.Icon>
        <NoDataView.Message>{COPY.EMPTY_CEREMONY}</NoDataView.Message>
      </NoDataView>
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
            link={`${ROUTES.CEREMONY}/${item.id}`}
            title={item.title}
            icon={getCeremonyIcon(item.category)}
            descriptions={[
              item.endDate
                ? `${formatToMonthDay(item.startDate)} - ${formatToMonthDay(item.endDate)}`
                : formatToMonthDay(item.startDate),
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
      <VStack className="w-full gap-5 rounded-[1rem] bg-white p-5">
        <Text typography="subtitle-18-bold" className="desktop:hidden">
          {COPY.HOME_CEREMONY_TITLE}
        </Text>

        <QueryErrorBoundary FallbackComponent={ErrorView}>
          <CeremonyListContent />
        </QueryErrorBoundary>

        <Link href={ROUTES.CEREMONY}>
          <CTAButton fullWidth color="blue">
            {COPY.CEREMONY_VIEW_ALL}
          </CTAButton>
        </Link>
      </VStack>
    </VStack>
  );
}
