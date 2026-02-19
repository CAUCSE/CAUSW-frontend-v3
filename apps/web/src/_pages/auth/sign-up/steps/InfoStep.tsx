'use client';

import { useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Text, CTAButton, VStack, Spacer } from '@causw/cds';

import { TermsBottomSheet, TermsDialog } from '@/widgets/auth';

import { infoSchema, type SignUpFormData } from '@/entities/auth';

import { useBreakpoint, RHFInput } from '@/shared';

// TODO: bottom-sheet, dialog 렌더링 충돌 이슈 핸들링

export const InfoStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize } = useBreakpoint();
  const { control, setValue } = useFormContext<SignUpFormData>();
  const [name = '', phoneNumber = '', nickname = ''] = useWatch({
    control,
    name: ['name', 'phoneNumber', 'nickname'],
  });
  const isNextEnabled = infoSchema.safeParse({
    name,
    phoneNumber,
    nickname,
  }).success;

  const [termsOpen, setTermsOpen] = useState(false);
  const handleTermsComplete = () => {
    setTermsOpen(false);
    onNext();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setValue('phoneNumber', formattedValue, { shouldValidate: true });
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
      />

      <RHFInput
        name="nickname"
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        typography="body-16-regular"
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
