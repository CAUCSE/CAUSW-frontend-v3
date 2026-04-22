'use client';

import { FormProvider } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { CTAButton, VStack } from '@causw/cds';

import { AuthContainer, EmailVerificationHeader } from '@/widgets/auth';

import {
  EmailVerificationStepCodeField,
  EmailVerificationStepResendSection,
  useEmailVerificationForm,
  useEmailVerificationGuard,
} from '@/features/auth';

import { useMyInfoSuspenseQuery } from '@/entities/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

export const EmailVerificationPage = () => {
  const { data: myInfo } = useMyInfoSuspenseQuery();

  useEmailVerificationGuard(myInfo.onboardingStatus);

  const email = myInfo.email ?? '';

  const {
    methods,
    isSubmitEnabled,
    isVerifyingCode,
    handleResendClick,
    onSubmit,
  } = useEmailVerificationForm({
    email,
  });

  const router = useRouter();

  return (
    <FormProvider {...methods}>
      <MobileOnly>
        <ActionHeader>
          <ActionHeader.BackButton
            onClick={() => router.replace('/auth/sign-in')}
          >
            뒤로
          </ActionHeader.BackButton>
        </ActionHeader>
      </MobileOnly>

      <AuthContainer>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DesktopOnly>
            <ActionHeader className="mb-10 px-0">
              <ActionHeader.BackButton
                onClick={() => router.replace('/auth/sign-in')}
              >
                뒤로
              </ActionHeader.BackButton>
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
