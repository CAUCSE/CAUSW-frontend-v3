'use client';

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  EMAIL_VERIFICATION_FORM_FIELD,
  emailVerificationSchema,
  useEmailVerificationAutoSendStore,
  type SignUpFormData,
} from '@/entities/auth';

import { toast } from '@/shared/model';

type EmailVerificationFormData = Pick<
  SignUpFormData,
  typeof EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode
>;

import {
  useSendEmailVerificationCodeMutation,
  useVerifyEmailVerificationCodeMutation,
} from '../mutations';

export const useEmailVerificationForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const methods = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
    mode: 'onBlur',
    defaultValues: {
      [EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode]: '',
    },
  });

  const sendEmailVerificationCodeMutation =
    useSendEmailVerificationCodeMutation();
  const verifyEmailVerificationCodeMutation =
    useVerifyEmailVerificationCodeMutation();
  const hasAutoSent = useEmailVerificationAutoSendStore((state) =>
    state.hasAutoSent(email),
  );
  const markAutoSent = useEmailVerificationAutoSendStore(
    (state) => state.markAutoSent,
  );

  const verificationCode =
    methods.watch(EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode) ?? '';
  const isSubmitEnabled = emailVerificationSchema.safeParse({
    [EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode]: verificationCode,
  }).success;

  useEffect(() => {
    if (!email) return;
    if (hasAutoSent) return;

    markAutoSent(email);
    sendEmailVerificationCodeMutation.mutate({ email });
  }, [email, hasAutoSent, markAutoSent, sendEmailVerificationCodeMutation]);

  const handleResendClick = () => {
    if (!email) {
      toast.error('이메일 정보가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    if (sendEmailVerificationCodeMutation.isPending) return;
    sendEmailVerificationCodeMutation.mutate({ email });
  };

  const onSubmit = (data: EmailVerificationFormData) => {
    if (!email) {
      toast.error('이메일 정보가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    verifyEmailVerificationCodeMutation.mutate(
      {
        email,
        verificationCode:
          data[EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode],
      },
      {
        onSuccess: () => {
          router.push('/home');
        },
      },
    );
  };

  return {
    methods,
    isSubmitEnabled,
    isVerifyingCode: verifyEmailVerificationCodeMutation.isPending,
    handleResendClick,
    onSubmit,
  };
};
