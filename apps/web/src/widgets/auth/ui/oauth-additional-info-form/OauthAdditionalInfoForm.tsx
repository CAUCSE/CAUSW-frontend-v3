'use client';

import { CTAButton, Flex, LockOpenColored, Text, VStack } from '@causw/cds';

import { RHFInput } from '@/shared/ui';

type OauthAdditionalInfoFormProps = {
  isSubmitEnabled: boolean;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const OauthAdditionalInfoForm = ({
  isSubmitEnabled,
  onPhoneNumberChange,
}: OauthAdditionalInfoFormProps) => {
  return (
    <VStack className="gap-10">
      <VStack className="gap-3">
        <Text typography="title-22-bold" textColor="gray-800">
          계정 정보 입력하기
        </Text>

        <Flex align="center" className="w-full rounded-lg bg-white p-4">
          <LockOpenColored size={24} />
          <Text typography="body-14-regular" textColor="gray-600">
            기존 계정이 있다면, 기존 계정으로 로그인한 후 소셜 계정 연동을
            진행해주세요.
          </Text>
        </Flex>

        <VStack className="gap-4">
          <RHFInput
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요."
            typography="body-16-regular"
          />
          <RHFInput
            name="phoneNumber"
            label="연락처"
            placeholder="연락처를 입력해주세요."
            typography="body-16-regular"
            maxLength={13}
            onChange={onPhoneNumberChange}
          />
          <RHFInput
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            typography="body-16-regular"
          />
        </VStack>
      </VStack>

      <CTAButton
        color="dark"
        fullWidth
        type="submit"
        disabled={!isSubmitEnabled}
      >
        다음
      </CTAButton>
    </VStack>
  );
};
