'use client';

import {
  ArrowRight,
  BellColored,
  Flex,
  HStack,
  Text,
  VStack,
} from '@causw/cds';

export const PushNotificationPermissionNotice = () => {
  return (
    <HStack align="center" className="gap-3 rounded-lg bg-white p-4">
      <Flex
        align="center"
        justify="center"
        className="h-[40px] w-[40px] rounded-md bg-gray-100 p-2"
      >
        <BellColored size={24} />
      </Flex>
      <VStack className="gap-0.5">
        <Text typography="body-15-semibold" textColor="gray-700">
          먼저 알림을 켜주세요.
        </Text>
        <Text typography="body-14-regular" textColor="gray-500">
          OS 설정에서 알림을 활성화해주세요.
        </Text>
      </VStack>
      <Flex align="center" justify="center" className="ml-auto">
        <ArrowRight size={24} />
      </Flex>
    </HStack>
  );
};
