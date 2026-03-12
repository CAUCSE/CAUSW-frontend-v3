'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Text, CTAButton, VStack, HStack } from '@causw/cds';

import { useSignUpEmailVerificationStep } from '@/features/auth';

import {
  EMAIL_VERIFICATION_FORM_FIELD,
  emailVerificationSchema,
  SignUpFormData,
} from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

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
        <VStack justify="center" className="w-full gap-2">
          <Text
            as="h1"
            typography="title-22-bold"
            textColor="gray-800"
            className="whitespace-pre-wrap"
          >
            이메일 인증하기
          </Text>
          <VStack gap="none">
            <Text typography="body-16-medium" textColor="gray-600">
              {email || '입력한 이메일'}로 인증 코드를 발송했어요.
            </Text>
            <Text typography="body-16-medium" textColor="gray-600">
              메일을 확인하고 인증 코드를 입력해주세요.
            </Text>
          </VStack>
        </VStack>

        <RHFInput
          name={EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode}
          label="인증 코드 (6자리)"
          typography="body-16-regular"
          maxLength={6}
          placeholder="인증 코드를 입력해주세요"
        />
      </VStack>
      <VStack className="gap-3">
        <CTAButton
          color="dark"
          fullWidth
          onClick={handleVerifyClick}
          disabled={!isNextEnabled || isVerifyingCode}
        >
          {isVerifyingCode ? '검증 중...' : '다음'}
        </CTAButton>
        <HStack gap="none" justify="center">
          <Text typography="body-14-medium" textColor="gray-400">
            메일이 도착하지 않았나요?
          </Text>
          <Text
            typography="body-14-medium"
            textColor="gray-400"
            className="cursor-pointer underline"
            onClick={handleResendClick}
          >
            재전송
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
