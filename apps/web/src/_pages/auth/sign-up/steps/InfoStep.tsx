'use client';

import { useState } from 'react';

import { Text, CTAButton, VStack, Spacer } from '@causw/cds';

import { TermsBottomSheet, TermsDialog } from '@/widgets/auth';

import { useSignUpInfoStep } from '@/features/auth';

import { useBreakpoint } from '@/shared/hooks';
import { RHFInput } from '@/shared/ui';
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
      <VStack justify="center" className="w-full">
        <Text
          as="h1"
          typography="title-22-bold"
          textColor="gray-800"
          className="whitespace-pre-wrap"
        >
          크자회 (CCSSAA){'\n'}
          <Text typography="title-22-bold" textColor="blue-700">
            계정 정보
          </Text>
          를 입력해주세요.
        </Text>
      </VStack>

      <RHFInput
        name="name"
        label="이름 (본명)"
        placeholder="이름을 입력해주세요."
        typography="body-16-regular"
      />

      <RHFInput
        name="phoneNumber"
        label="연락처"
        placeholder="연락처를 입력해주세요. (010-XXXX-XXXX)"
        typography="body-16-regular"
        maxLength={13}
        onChange={handlePhoneNumberChange}
        onBlur={handlePhoneNumberBlur}
      />

      <RHFInput
        name="nickname"
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        typography="body-16-regular"
        onBlur={handleNicknameBlur}
      />

      {!isMobileSize && <Spacer size={10} />}
      {isMobileSize && <Spacer size={16} />}

      <CTAButton
        color="dark"
        fullWidth
        disabled={!isNextEnabled}
        onClick={() => setTermsOpen(true)}
      >
        다음
      </CTAButton>

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
