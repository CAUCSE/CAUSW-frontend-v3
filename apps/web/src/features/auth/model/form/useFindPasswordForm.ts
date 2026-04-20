'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useSendPasswordResetCodeMutation,
  useVerifyPasswordResetCodeMutation,
} from '@/features/auth';

import { findPasswordSchema, type FindPasswordFormData } from '@/entities/auth';

import { useCountdownTimer } from '@/shared/hooks';

type FindPasswordStep = 'idle' | 'codeSent';
type VerifyStatus = 'idle' | 'success' | 'invalid';

const TIMER_SECONDS = 600;

interface UseFindPasswordFormArgs {
  onResetPassword: (data: { email: string; temporaryPassword: string }) => void;
}

export const useFindPasswordForm = ({
  onResetPassword,
}: UseFindPasswordFormArgs) => {
  const sendResetCodeMutation = useSendPasswordResetCodeMutation();
  const verifyResetCodeMutation = useVerifyPasswordResetCodeMutation();

  const [step, setStep] = useState<FindPasswordStep>('idle');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(
    null,
  );
  const { formattedTime, isExpired, start } = useCountdownTimer(TIMER_SECONDS);

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
    watch,
    formState: { errors },
  } = methods;

  const nameValue = watch('name');
  const emailValue = watch('email');
  const verificationCodeValue = watch('verificationCode') ?? '';

  const isPending =
    sendResetCodeMutation.isPending || verifyResetCodeMutation.isPending;
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
  const isExpiredStatus = step === 'codeSent' && isExpired && !isVerified;

  const handleSendCode = async () => {
    if (isPending) return;
    const { name, email } = methods.getValues();
    try {
      await sendResetCodeMutation.mutateAsync({ name, email });
      start();
      setStep('codeSent');
      setVerifyStatus('idle');
      setTemporaryPassword(null);
      methods.setValue('verificationCode', '');
    } catch {
      /* mutation onError에서 토스트 처리 */
    }
  };

  const handleVerify = async () => {
    if (!canVerify) return;
    const { name, email, verificationCode } = methods.getValues();
    try {
      const { temporaryPassword: issued } =
        await verifyResetCodeMutation.mutateAsync({
          name,
          email,
          verificationCode,
        });
      setTemporaryPassword(issued);
      setVerifyStatus('success');
    } catch {
      setVerifyStatus('invalid');
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
      : isExpiredStatus
        ? '인증 유효시간이 초과되었습니다.'
        : verifyStatus === 'invalid'
          ? '잘못된 인증번호입니다.'
          : null;
  const verificationHasError = isExpiredStatus || verifyStatus === 'invalid';

  return {
    methods,
    step,
    formattedTime,
    canSendCode,
    canVerify,
    isVerified,
    isExpiredStatus,
    isPending,
    verificationHelperText,
    verificationHasError,
    handleSendCode,
    handleVerify,
    handleVerificationCodeChange,
    handleResetPassword,
  };
};
