'use client';

import { useEffect, useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack, HStack, CTAButton, Field, TextInput, Text } from '@causw/cds';

import { findPasswordSchema, type FindPasswordFormData } from '@/entities/auth';

import { useCountdownTimer } from '@/shared/hooks';
import { RHFInput } from '@/shared/ui';

type FindPasswordStep = 'idle' | 'codeSent';
type VerifyStatus = 'idle' | 'success' | 'invalid' | 'expired';

interface FindPasswordFormProps {
  onSendCode: (data: { name: string; email: string }) => Promise<void>;
  onVerifyCode: (data: {
    name: string;
    email: string;
    verificationCode: string;
  }) => Promise<{ temporaryPassword: string }>;
  onResetPassword: (data: { email: string; temporaryPassword: string }) => void;
}

const TIMER_SECONDS = 600;

export const FindPasswordForm = ({
  onSendCode,
  onVerifyCode,
  onResetPassword,
}: FindPasswordFormProps) => {
  const [step, setStep] = useState<FindPasswordStep>('idle');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(
    null,
  );
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
  const verificationCodeValue = watch('verificationCode') ?? '';

  const isNameValid = !!nameValue && !errors.name;
  const isEmailValid = !!emailValue && !errors.email;
  const canSendCode = isNameValid && isEmailValid;
  const isVerified = verifyStatus === 'success';
  const canVerify =
    step !== 'idle' &&
    verificationCodeValue.length === 6 &&
    !isExpired &&
    !isPending &&
    !isVerified;

  useEffect(() => {
    if (step === 'codeSent' && isExpired && !isVerified) {
      setVerifyStatus('expired');
    }
  }, [isExpired, step, isVerified]);

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
      setVerifyStatus('idle');
      setTemporaryPassword(null);
      methods.setValue('verificationCode', '');
    } catch {
      /* mutation onError에서 토스트 처리 */
    } finally {
      setIsPending(false);
    }
  };

  const handleVerify = async () => {
    if (!canVerify) return;
    const { name, email, verificationCode } = methods.getValues();
    setIsPending(true);
    try {
      const { temporaryPassword: issued } = await onVerifyCode({
        name,
        email,
        verificationCode,
      });
      setTemporaryPassword(issued);
      setVerifyStatus('success');
    } catch {
      setVerifyStatus('invalid');
    } finally {
      setIsPending(false);
    }
  };

  const handleVerificationCodeChange = () => {
    if (verifyStatus === 'idle') return;
    setVerifyStatus('idle');
    if (temporaryPassword) {
      setTemporaryPassword(null);
    }
  };

  const handleResetPassword = () => {
    if (!isVerified || !temporaryPassword) return;
    const { email } = methods.getValues();
    onResetPassword({ email, temporaryPassword });
  };

  const verificationHelperText =
    verifyStatus === 'success'
      ? '인증이 완료되었습니다.'
      : verifyStatus === 'invalid'
        ? '잘못된 인증번호입니다.'
        : verifyStatus === 'expired'
          ? '인증 유효시간이 초과되었습니다.'
          : null;
  const verificationHasError =
    verifyStatus === 'invalid' || verifyStatus === 'expired';

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
                  className="w-[6.25rem]"
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
          disabled={!isVerified || !temporaryPassword}
          onClick={handleResetPassword}
          className="w-full"
        >
          비밀번호 재설정
        </CTAButton>
      </VStack>
    </FormProvider>
  );
};
