'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { VStack } from '@causw/cds';

import { SignUpEmailVerificationStepHeader } from '@/widgets/auth';

import {
  SignUpEmailVerificationStepCodeField,
  SignUpEmailVerificationStepNextButton,
  SignUpEmailVerificationStepResendSection,
  useSignUpEmailVerificationStep,
} from '@/features/auth';

import {
  EMAIL_VERIFICATION_FORM_FIELD,
  emailVerificationSchema,
  SignUpFormData,
} from '@/entities/auth';

export const EmailVerificationStep = ({ onNext }: { onNext: () => void }) => {
  const { handleVerifyClick, handleResendClick, isVerifyingCode } =
    useSignUpEmailVerificationStep(onNext);
  const { control } = useFormContext<SignUpFormData>();
  const [email = '', emailVerificationCode = ''] = useWatch({
    control,
    name: Object.values(EMAIL_VERIFICATION_FORM_FIELD),
  });

  const isNextEnabled = emailVerificationSchema.safeParse({
    emailVerificationCode,
  }).success;

  return (
    <VStack className="gap-14 md:gap-10">
      <VStack className="w-full gap-7">
        <SignUpEmailVerificationStepHeader email={email} />
        <SignUpEmailVerificationStepCodeField />
      </VStack>
      <VStack className="gap-3">
        <SignUpEmailVerificationStepNextButton
          isLoading={isVerifyingCode}
          onClick={handleVerifyClick}
          disabled={!isNextEnabled || isVerifyingCode}
        />
        <SignUpEmailVerificationStepResendSection onClick={handleResendClick} />
      </VStack>
    </VStack>
  );
};
