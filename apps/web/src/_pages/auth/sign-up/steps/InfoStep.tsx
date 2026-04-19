'use client';

import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import dynamic from 'next/dynamic';

import { Spacer, VStack } from '@causw/cds';

import { SignUpInfoStepHeader } from '@/widgets/auth';

import {
  SignUpInfoStepNameField,
  SignUpInfoStepNextButton,
  SignUpInfoStepNicknameField,
  SignUpInfoStepPhoneNumberField,
  useSignUpInfoStep,
} from '@/features/auth';

import {
  TERMS_FORM_FIELD,
  type SignUpFormData,
  type TermsAgreementRequestDto,
} from '@/entities/auth';

import { useBreakpoint } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

const TermsBottomSheet = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsBottomSheet),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const TermsDialog = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsDialog),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

export const InfoStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize } = useBreakpoint();
  const { setValue } = useFormContext<SignUpFormData>();
  const {
    isNextEnabled,
    handlePhoneNumberChange,
    handlePhoneNumberBlur,
    handleNicknameBlur,
  } = useSignUpInfoStep();

  const [termsOpen, setTermsOpen] = useState(false);
  const handleTermsComplete = () => {
    setTermsOpen(false);
    onNext();
  };
  const handleTermsSubmit = ({ termsIds }: TermsAgreementRequestDto) => {
    setValue(TERMS_FORM_FIELD.agreedTermsIds, termsIds, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <VStack className="w-full gap-7">
      <SignUpInfoStepHeader />
      <SignUpInfoStepNameField />
      <SignUpInfoStepPhoneNumberField
        onChange={handlePhoneNumberChange}
        onBlur={handlePhoneNumberBlur}
      />
      <SignUpInfoStepNicknameField onBlur={handleNicknameBlur} />

      {!isMobileSize && <Spacer size={10} />}
      {isMobileSize && <Spacer size={16} />}

      <SignUpInfoStepNextButton
        disabled={!isNextEnabled}
        onClick={() => setTermsOpen(true)}
      />

      {termsOpen && isMobileSize && (
        <TermsBottomSheet
          open
          onOpenChange={setTermsOpen}
          onComplete={handleTermsComplete}
          onSubmitTermsAgreement={handleTermsSubmit}
        />
      )}
      {termsOpen && !isMobileSize && (
        <TermsDialog
          open
          onOpenChange={setTermsOpen}
          onComplete={handleTermsComplete}
          onSubmitTermsAgreement={handleTermsSubmit}
        />
      )}
    </VStack>
  );
};
