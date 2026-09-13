'use client';

import { Text, VStack } from '@causw/cds';

import { OauthAdditionalInfoNotice } from '@/widgets/auth';

import {
  AccountLinkGuideDialog,
  OauthAdditionalInfoNameField,
  OauthAdditionalInfoNicknameField,
  OauthAdditionalInfoPhoneNumberField,
  OauthAdditionalInfoSubmitButton,
} from '@/features/auth';

import type { EmailFindResponse } from '@/entities/auth';

type OauthAdditionalInfoFormProps = {
  isSubmitEnabled: boolean;
  isPhoneNumberFieldEnabled: boolean;
  existingAccount: EmailFindResponse | null;
  isAccountLinkGuideDialogOpen: boolean;
  onOpenAccountLinkGuideDialog: () => void;
  onCloseAccountLinkGuideDialog: () => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberBlur: () => void;
  onNicknameBlur: () => void;
};

export const OauthAdditionalInfoForm = ({
  isSubmitEnabled,
  isPhoneNumberFieldEnabled,
  existingAccount,
  isAccountLinkGuideDialogOpen,
  onOpenAccountLinkGuideDialog,
  onCloseAccountLinkGuideDialog,
  onNameChange,
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
          <OauthAdditionalInfoNameField onNameChange={onNameChange} />
          <OauthAdditionalInfoPhoneNumberField
            disabled={!isPhoneNumberFieldEnabled}
            onPhoneNumberChange={onPhoneNumberChange}
            onPhoneNumberBlur={onPhoneNumberBlur}
          />
          {existingAccount && (
            <button
              type="button"
              className="self-start px-1"
              onClick={onOpenAccountLinkGuideDialog}
            >
              <Text
                typography="body-14-semibold"
                textColor="blue-500"
                className="underline"
              >
                기존 계정으로 연동하기
              </Text>
            </button>
          )}
          <OauthAdditionalInfoNicknameField onNicknameBlur={onNicknameBlur} />
        </VStack>
      </VStack>

      <OauthAdditionalInfoSubmitButton disabled={!isSubmitEnabled} />

      {existingAccount && (
        <AccountLinkGuideDialog
          open={isAccountLinkGuideDialogOpen}
          account={existingAccount}
          onOpenChange={(open) => {
            if (!open) onCloseAccountLinkGuideDialog();
          }}
        />
      )}
    </VStack>
  );
};
