'use client';

import { Text, Toggle, VStack } from '@causw/cds';

// TODO: SNS 계정 연동 조회/연동/해제 API 연결
export const PrivacySocialSection = () => (
  <VStack className="gap-5 rounded-2xl bg-white p-5">
    <Text typography="body-14-regular" textColor="gray-500">
      SNS 계정 연동
    </Text>
    <VStack className="gap-6">
      <Toggle checked={false} disabled className="justify-between">
        <Toggle.Label typography="body-16-medium">카카오 연동</Toggle.Label>
        <Toggle.Switch />
      </Toggle>
      <Toggle checked={false} disabled className="justify-between">
        <Toggle.Label typography="body-16-medium">Apple 연동</Toggle.Label>
        <Toggle.Switch />
      </Toggle>
      <Toggle checked={false} disabled className="justify-between">
        <Toggle.Label typography="body-16-medium">Google 연동</Toggle.Label>
        <Toggle.Switch />
      </Toggle>
    </VStack>
  </VStack>
);
