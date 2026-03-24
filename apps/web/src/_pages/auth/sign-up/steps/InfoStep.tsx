'use client';

import { useState } from 'react';

import { Spacer, VStack } from '@causw/cds';

import {
  SignUpInfoStepHeader,
  TermsBottomSheet,
  TermsDialog,
} from '@/widgets/auth';

import {
  SignUpInfoStepNameField,
  SignUpInfoStepNextButton,
  SignUpInfoStepNicknameField,
  SignUpInfoStepPhoneNumberField,
  useSignUpInfoStep,
} from '@/features/auth';

import { useBreakpoint } from '@/shared/hooks';
// TODO: bottom-sheet, dialog 렌더링 충돌 이슈 핸들링

export const InfoStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize } = useBreakpoint();
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

      <TermsBottomSheet
        open={termsOpen && isMobileSize}
        onOpenChange={setTermsOpen}
        onComplete={handleTermsComplete}
      />
      <TermsDialog
        open={termsOpen && !isMobileSize}
        onOpenChange={setTermsOpen}
        onComplete={handleTermsComplete}
      />
    </VStack>
  );
};
