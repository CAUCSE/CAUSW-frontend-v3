'use client';

import { useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack, HStack, CTAButton, Field, TextInput, Text } from '@causw/cds';

import { findPasswordSchema, type FindPasswordFormData } from '@/entities/auth';

import { useCountdownTimer } from '@/shared/hooks';

type FindPasswordStep = 'idle' | 'codeSent' | 'codeVerified';

interface FindPasswordFormProps {
  onSubmit: (email: string) => void;
}

const TIMER_SECONDS = 600;

export const FindPasswordForm = ({ onSubmit }: FindPasswordFormProps) => {
  const [step, setStep] = useState<FindPasswordStep>('idle');
  const { formattedTime, isExpired, start, reset } =
    useCountdownTimer(TIMER_SECONDS);

  const methods = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      verificationCode: '',
    },
  });

  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  const emailValue = watch('email');

  const isEmailValid = !!emailValue && !errors.email;

  // TODO: API 연동 + 인증코드 전송 로직으로 교체
  const handleSendCode = () => {
    if (step === 'idle') {
      setStep('codeSent');
      start();
    } else {
      setStep('codeSent');
      reset();
    }
  };

  // TODO: 인증코드 검증 로직으로 교체
  // mock: 6자리 입력 완료 시 검증 성공으로 처리
  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length === 6 && !isExpired) {
      setStep('codeVerified');
    } else if (step === 'codeVerified') {
      setStep('codeSent');
    }
  };

  const handleSubmit = (data: FindPasswordFormData) => {
    onSubmit(data.email);
  };

  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        className="w-full gap-10"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <VStack className="gap-2">
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
                disabled={!isEmailValid}
                onClick={handleSendCode}
                className="w-[6.25rem]"
              >
                {step === 'idle' ? '인증코드' : '재전송'}
              </CTAButton>
            </HStack>
            <Field.ErrorDescription>
              {errors.email?.message}
            </Field.ErrorDescription>
          </Field>

          {step !== 'idle' && (
            <TextInput
              {...register('verificationCode', {
                onChange: handleVerificationCodeChange,
              })}
              placeholder="인증코드 6자리를 입력해주세요."
              typography="body-16-regular"
              maxLength={6}
              rightIcon={
                <Text typography="body-16-regular" textColor="gray-400">
                  {formattedTime}
                </Text>
              }
            />
          )}
        </VStack>

        <CTAButton
          color="dark"
          fullWidth
          type="submit"
          disabled={step !== 'codeVerified'}
        >
          재설정 이메일 받기
        </CTAButton>
      </VStack>
    </FormProvider>
  );
};
