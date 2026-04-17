'use client';

import { Text, VStack } from '@causw/cds';

import { ActionHeader } from '@/shared/ui';

export const SettingTermsHeader = () => {
  return (
    <>
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <VStack gap="xs" className="px-4 pt-4">
        <Text typography="title-22-bold" textColor="gray-800">
          이용약관 및 정책
        </Text>
        <Text typography="body-15-regular" textColor="gray-500">
          크자회(CCSSAA) 서비스 이용에 대한 약관과 정책을 확인하실 수 있습니다.
        </Text>
      </VStack>
    </>
  );
};
