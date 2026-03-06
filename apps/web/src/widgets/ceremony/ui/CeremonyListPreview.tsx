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
            // TODO : target link 실제 주소에 맞게 수정
            link={`${ROUTES.CEREMONY}/${item.id}`}
            title={item.title}
            icon={getCeremonyIcon(item.category)}
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
        <Link href={ROUTES.CEREMONY} className="w-full">
          <CTAButton fullWidth color="blue" className="bg-blue-100">
        {isEmpty ? (
          <NoDataView>
            <NoDataView.Icon>
              <BellGrayColored size={52} />
            </NoDataView.Icon>
            <NoDataView.Message>{COPY.EMPTY_CEREMONY}</NoDataView.Message>
          </NoDataView>
        ) : (
          <VStack className="w-full gap-5">
            {CEREMONY_ITEMS.slice(0, 6).map((item) => (
              <EventCard
                key={item.id}
                link={item.link}
                title={item.title}
                icon={<HeartColored size={24} />}
                descriptions={[item.date, item.type]}
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
          </CTAButton>
        </Link>
      </VStack>
    </VStack>
  );
}
