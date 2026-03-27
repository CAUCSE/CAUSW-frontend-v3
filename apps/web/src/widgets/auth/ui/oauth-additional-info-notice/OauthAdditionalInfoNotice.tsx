'use client';

import { Flex, LockOpenColored, Text } from '@causw/cds';

export const OauthAdditionalInfoNotice = () => {
  return (
    <Flex align="center" className="w-full rounded-lg bg-white p-4">
      <LockOpenColored size={24} />
      <Text typography="body-14-regular" textColor="gray-600">
        기존 계정이 있다면, 기존 계정으로 로그인한 후 소셜 계정 연동을
        진행해주세요.
      </Text>
    </Flex>
  );
};
