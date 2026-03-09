'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Text, CTAButton, VStack } from '@causw/cds';

import { accountSchema, type SignUpFormData } from '@/entities/auth';

import { RHFInput, RHFPasswordInput } from '@/shared/ui';

export const AccountStep = ({ onNext }: { onNext: () => void }) => {
  const { control } = useFormContext<SignUpFormData>();
  const [email = '', password = '', passwordConfirm = ''] = useWatch({
    control,
    name: ['email', 'password', 'passwordConfirm'],
  });

  const isNextEnabled = accountSchema.safeParse({
    email,
    password,
    passwordConfirm,
  }).success;

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
            계정
          </Text>
          을 생성해주세요.
        </Text>
      </VStack>

      <RHFInput
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        typography="body-16-regular"
      />

      <RHFPasswordInput
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        typography="body-16-regular"
      />

      <RHFPasswordInput
        name="passwordConfirm"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        typography="body-16-regular"
      />
      <CTAButton
        color="dark"
        fullWidth
        disabled={!isNextEnabled}
        onClick={onNext}
        className="mt-16 md:mt-10"
      >
        다음
      </CTAButton>
    </VStack>
  );
};
