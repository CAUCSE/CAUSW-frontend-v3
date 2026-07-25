'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { HStack, Text, VStack } from '@causw/cds';

import { formatDateTimeToMinute } from '@/shared/lib';

import { lockerQueryOptions } from '../../config';

import { MyLockerInfoEmptyViewSection } from './MyLockerInfoEmptyViewSection';

interface MyLockerInfoSectionProps {
  hideWhenEmpty?: boolean;
}

export const MyLockerInfoSection = ({
  hideWhenEmpty = false,
}: MyLockerInfoSectionProps) => {
  const { data: myLocker } = useSuspenseQuery(lockerQueryOptions.myLocker());

  if (hideWhenEmpty && !myLocker.hasLocker) {
    return null;
  }

  if (!myLocker.hasLocker) {
    return <MyLockerInfoEmptyViewSection />;
  }

  return (
    <VStack
      gap="none"
      className="gap-5 rounded-lg bg-white px-5 py-4"
      as="section"
    >
      <HStack justify="between" align="center">
        <Text typography="body-16-medium" textColor="gray-500">
          현재 사물함
        </Text>
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {myLocker.displayName}
        </Text>
      </HStack>
      <HStack justify="between" align="center">
        <Text typography="body-16-medium" textColor="gray-500">
          사물함 만료일
        </Text>
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {formatDateTimeToMinute(myLocker.expiredAt)}
        </Text>
      </HStack>
    </VStack>
  );
};
