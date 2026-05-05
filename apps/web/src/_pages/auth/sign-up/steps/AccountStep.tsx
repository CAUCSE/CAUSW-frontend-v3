'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { VStack } from '@causw/cds';

import { SignUpAccountStepHeader } from '@/widgets/auth';

import {
  SignUpAccountStepEmailField,
  SignUpAccountStepNextButton,
  SignUpAccountStepPasswordConfirmField,
  SignUpAccountStepPasswordField,
  useSignUpAccountStep,
} from '@/features/auth';

import {
  ACCOUNT_FORM_FIELD,
  accountSchema,
  type SignUpFormData,
} from '@/entities/auth';

export const AccountStep = ({ onNext }: { onNext: () => void }) => {
  const { control } = useFormContext<SignUpFormData>();
  const [email = '', password = '', passwordConfirm = ''] = useWatch({
    control,
    name: Object.values(ACCOUNT_FORM_FIELD),
  });
  const { handleNextClick, isSendingCode } = useSignUpAccountStep(onNext);

  const isNextEnabled = accountSchema.safeParse({
    email,
    password,
    passwordConfirm,
  }).success;

  return (
    <VStack className="w-full gap-7">
      <SignUpAccountStepHeader />
      <SignUpAccountStepEmailField />
      <SignUpAccountStepPasswordField />
      <SignUpAccountStepPasswordConfirmField />
      <SignUpAccountStepNextButton
        disabled={!isNextEnabled || isSendingCode}
        isLoading={isSendingCode}
        onClick={handleNextClick}
      />
    </VStack>
  );
};
