'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { VStack } from '@causw/cds';

import { AuthContainer } from '@/widgets/auth';

import {
  clearPasswordResetContext,
  getPasswordResetContext,
  resetPassword,
  ResetPasswordForm,
  type PasswordResetContext,
} from '@/features/auth';

import type { ResetPasswordFormData } from '@/entities/auth';

import { toast } from '@/shared/model';
import { ActionHeader } from '@/shared/ui';
import { extractErrorMessage } from '@/shared/utils';

export const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetContext, setResetContext] = useState<PasswordResetContext | null>(
    null,
  );
  const [isLoadingContext, setIsLoadingContext] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const context = getPasswordResetContext();

    if (!context) {
      setIsLoadingContext(false);
      toast.error(
        '임시 비밀번호 정보가 없습니다. 다시 비밀번호 찾기를 진행해 주세요.',
      );
      router.replace('/auth/find-account');
      return;
    }

    setResetContext(context);
    setIsLoadingContext(false);
  }, [router]);

  const handleClose = () => {
    clearPasswordResetContext();
    router.replace('/auth/sign-in');
  };

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!resetContext || isSubmitting) return;

    setIsSubmitting(true);
    toast.loading('비밀번호를 변경하고 있어요...');

    try {
      await resetPassword({
        email: resetContext.email,
        currentPassword: resetContext.temporaryPassword,
        newPassword: data.newPassword,
        newPasswordConfirm: data.confirmPassword,
      });

      clearPasswordResetContext();
      toast.success('비밀번호 변경이 완료되었습니다.');
      router.replace('/auth/sign-in/email');
    } catch (error) {
      toast.error(
        extractErrorMessage(
          error,
          '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingContext || !resetContext) {
    return null;
  }

  return (
    <AuthContainer>
      <VStack className="w-full gap-4 md:gap-10">
        <ActionHeader
          isSticky={false}
          background="gray"
          buttonColor="gray"
          className="px-0"
        >
          <ActionHeader.BackButton onClick={handleClose}>
            닫기
          </ActionHeader.BackButton>
        </ActionHeader>

        <ResetPasswordForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </VStack>
    </AuthContainer>
  );
};
