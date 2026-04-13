'use client';

import { FormProvider } from 'react-hook-form';

import { CTAButton, VStack } from '@causw/cds';

import { AuthContainer, EmailVerificationHeader } from '@/widgets/auth';

import {
  EmailVerificationStepCodeField,
  EmailVerificationStepResendSection,
  useEmailVerificationForm,
  useEmailVerificationGuard,
  type EmailVerificationOnboardingStatus,
} from '@/features/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

export const EmailVerificationPage = () => {
  const email = 'younghyun7538@gmail.com';
  // TODO: 내 정보 조회 API 연결 후 onboardingStatus 값을 실제 데이터로 교체
  const onboardingStatus: EmailVerificationOnboardingStatus =
    'EMAIL_VERIFICATION_REQUIRED';
  const {
    methods,
    isSubmitEnabled,
    isVerifyingCode,
    handleResendClick,
    onSubmit,
  } = useEmailVerificationForm({
    email,
  });

  useEmailVerificationGuard(onboardingStatus);

  return (
    <FormProvider {...methods}>
      <MobileOnly>
        <ActionHeader>
          <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        </ActionHeader>
      </MobileOnly>

      <AuthContainer>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DesktopOnly>
            <ActionHeader className="mb-10 px-0">
              <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
            </ActionHeader>
          </DesktopOnly>

          <VStack className="gap-14 md:gap-10">
            <VStack className="w-full gap-7">
              <EmailVerificationHeader email={email} />
              <EmailVerificationStepCodeField />
            </VStack>

            <VStack className="gap-3">
              <CTAButton
                color="dark"
                fullWidth
                type="submit"
                disabled={!isSubmitEnabled || isVerifyingCode}
              >
                {isVerifyingCode ? '인증 중...' : '인증하기'}
              </CTAButton>
              <EmailVerificationStepResendSection onClick={handleResendClick} />
            </VStack>
          </VStack>
        </form>
      </AuthContainer>
    </FormProvider>
  );
};
