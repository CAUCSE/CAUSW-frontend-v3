'use client';

import { FormProvider } from 'react-hook-form';

import { VStack, HStack, CTAButton, Field, TextInput, Text } from '@causw/cds';

import { useFindPasswordForm } from '@/features/auth';

import { RHFInput } from '@/shared/ui';

interface FindPasswordFormProps {
  onResetPassword: (data: { email: string; temporaryPassword: string }) => void;
}

export const FindPasswordForm = ({
  onResetPassword,
}: FindPasswordFormProps) => {
  const {
    methods,
    step,
    formattedTime,
    canSendCode,
    canVerify,
    isVerified,
    isPending,
    verificationHelperText,
    verificationHasError,
    handleSendCode,
    handleVerify,
    handleVerificationCodeChange,
    handleResetPassword,
  } = useFindPasswordForm({ onResetPassword });

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <VStack className="w-full gap-10">
        <VStack className="gap-2">
          <RHFInput
            name="name"
            label="이름"
            placeholder="실명을 입력해주세요."
            typography="body-16-regular"
          />

          <Field className="flex flex-col gap-2" error={!!errors.email}>
            <Field.Label>이메일</Field.Label>
            <HStack className="items-end gap-2">
              <TextInput
                {...register('email')}
                placeholder="ex) example@email.com"
                typography="body-16-regular"
                className="flex-1"
              />
              <CTAButton
                type="button"
                color="dark"
                disabled={!canSendCode || isPending || isVerified}
                onClick={handleSendCode}
                className="w-25"
              >
                {step === 'idle' ? '인증코드' : '재전송'}
              </CTAButton>
            </HStack>
            <Field.ErrorDescription>
              {errors.email?.message}
            </Field.ErrorDescription>
          </Field>

          {step !== 'idle' && (
            <Field className="flex flex-col gap-2" error={verificationHasError}>
              <HStack className="items-end gap-2">
                <TextInput
                  {...register('verificationCode', {
                    onChange: handleVerificationCodeChange,
                  })}
                  placeholder="인증코드 6자리를 입력해주세요."
                  typography="body-16-regular"
                  maxLength={6}
                  className="flex-1"
                  rightIcon={
                    isVerified ? undefined : (
                      <Text typography="body-16-regular" textColor="gray-400">
                        {formattedTime}
                      </Text>
                    )
                  }
                />
                <CTAButton
                  type="button"
                  color="dark"
                  disabled={!canVerify}
                  onClick={handleVerify}
                  className="w-25"
                >
                  확인
                </CTAButton>
              </HStack>
              {verificationHelperText &&
                (verificationHasError ? (
                  <Field.ErrorDescription>
                    {verificationHelperText}
                  </Field.ErrorDescription>
                ) : (
                  <Field.Description>
                    {verificationHelperText}
                  </Field.Description>
                ))}
            </Field>
          )}
        </VStack>

        <CTAButton
          type="button"
          color="dark"
          disabled={!isVerified}
          onClick={handleResetPassword}
          className="w-full"
        >
          비밀번호 재설정
        </CTAButton>
      </VStack>
    </FormProvider>
  );
};
