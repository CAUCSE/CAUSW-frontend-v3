'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { HStack, Info, Text, VStack } from '@causw/cds';

import { formatDateTimeToKRTime } from '@/shared/lib';

import { lockerQueryOptions } from '../../config';

export const LockerApplicationPeriodSection = () => {
  const { data: lockerApplicationPeriod } = useSuspenseQuery(
    lockerQueryOptions.lockerApplicationPeriod(),
  );

  const startAt = lockerApplicationPeriod.startAt
    ? formatDateTimeToKRTime(lockerApplicationPeriod.startAt)
    : '-';
  const endAt = lockerApplicationPeriod.endAt
    ? formatDateTimeToKRTime(lockerApplicationPeriod.endAt)
    : '-';
  return (
    <VStack gap="none" className="gap-2.5">
      <HStack gap="xs" align="center" className="px-1">
        <Info color="gray-400" size={16} />
        <Text typography="subtitle-16-bold" textColor="gray-700">
          사물함 신청 기간 안내
        </Text>
      </HStack>
      <VStack className="rounded-lg bg-white px-5 py-4">
        <HStack align="center" justify="between">
          <Text typography="subtitle-16-bold" textColor="gray-700">
            {startAt}
          </Text>
          <Text typography="body-16-medium" textColor="gray-500">
            부터
          </Text>
        </HStack>
        <HStack align="center" justify="between">
          <Text typography="subtitle-16-bold" textColor="gray-700">
            {endAt}
          </Text>
          <Text typography="body-16-medium" textColor="gray-500">
            까지
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
