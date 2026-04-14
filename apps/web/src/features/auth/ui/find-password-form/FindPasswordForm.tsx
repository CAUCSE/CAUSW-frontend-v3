'use client';

import { useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack, HStack, CTAButton, Field, TextInput, Text } from '@causw/cds';

import { findPasswordSchema, type FindPasswordFormData } from '@/entities/auth';

import { useCountdownTimer } from '@/shared/hooks';
import { RHFInput } from '@/shared/ui';

type FindPasswordStep = 'idle' | 'codeSent';

interface FindPasswordFormProps {
  onSendCode: (data: { name: string; email: string }) => Promise<void>;
  onVerifyCode: (data: {
    name: string;
    email: string;
    verificationCode: string;
  }) => Promise<void>;
}

const TIMER_SECONDS = 600;

export const FindPasswordForm = ({
  onSendCode,
  onVerifyCode,
}: FindPasswordFormProps) => {
  const [step, setStep] = useState<FindPasswordStep>('idle');
  const [isPending, setIsPending] = useState(false);
  const { formattedTime, isExpired, start, reset } =
    useCountdownTimer(TIMER_SECONDS);

  const methods = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      verificationCode: '',
    },
  });

  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  const nameValue = watch('name');
  const emailValue = watch('email');

  const isNameValid = !!nameValue && !errors.name;
  const isEmailValid = !!emailValue && !errors.email;
  const canSendCode = isNameValid && isEmailValid;

  const handleSendCode = async () => {
    if (isPending) return;
    const { name, email } = methods.getValues();
    setIsPending(true);
    try {
      await onSendCode({ name, email });
      if (step === 'idle') {
        start();
      } else {
        reset();
      }
      setStep('codeSent');
    } catch {
      /* mutation onError에서 토스트 처리 */
    } finally {
      setIsPending(false);
    }
  };

  const handleVerificationCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length === 6 && !isExpired && !isPending) {
      const { name, email } = methods.getValues();
      setIsPending(true);
      try {
        await onVerifyCode({ name, email, verificationCode: value });
      } catch {
        /* mutation onError에서 토스트 처리 */
      } finally {
        setIsPending(false);
      }
    }
  };

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
                disabled={!canSendCode || isPending}
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
      </VStack>
    </FormProvider>
  );
};
