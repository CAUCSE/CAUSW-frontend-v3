'use client';

import { Text, VStack } from '@causw/cds';

import { OauthAdditionalInfoNotice } from '@/widgets/auth';

import {
  OauthAdditionalInfoNameField,
  OauthAdditionalInfoNicknameField,
  OauthAdditionalInfoPhoneNumberField,
  OauthAdditionalInfoSubmitButton,
} from '@/features/auth';

type OauthAdditionalInfoFormProps = {
  isSubmitEnabled: boolean;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberBlur: () => void;
  onNicknameBlur: () => void;
};

export const OauthAdditionalInfoForm = ({
  isSubmitEnabled,
  onPhoneNumberChange,
  onPhoneNumberBlur,
  onNicknameBlur,
}: OauthAdditionalInfoFormProps) => {
  return (
    <VStack className="gap-10">
      <VStack className="gap-3">
        <Text typography="title-22-bold" textColor="gray-800">
          계정 정보 입력하기
        </Text>

        <OauthAdditionalInfoNotice />

        <VStack className="gap-4">
          <OauthAdditionalInfoNameField />
          <OauthAdditionalInfoPhoneNumberField
            onPhoneNumberChange={onPhoneNumberChange}
            onPhoneNumberBlur={onPhoneNumberBlur}
          />
          <OauthAdditionalInfoNicknameField onNicknameBlur={onNicknameBlur} />
        </VStack>
      </VStack>

      <OauthAdditionalInfoSubmitButton disabled={!isSubmitEnabled} />
    </VStack>
  );
};
