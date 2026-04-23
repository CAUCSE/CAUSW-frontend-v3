'use client';

import { useEffect, useState } from 'react';

import { FormProvider } from 'react-hook-form';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { AuthContainer, OauthAdditionalInfoForm } from '@/widgets/auth';

import {
  routeAfterSignIn,
  useGetMeQuery,
  useOauthAdditionalInfoForm,
} from '@/features/auth';

import type { TermsAgreementRequestDto } from '@/entities/auth';

import { useBreakpoint } from '@/shared/hooks';
import {
  ActionHeader,
  DesktopOnly,
  MobileOnly,
  SuspenseView,
} from '@/shared/ui';

const TermsBottomSheet = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsBottomSheet),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const TermsDialog = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsDialog),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

export const OauthAdditionalInfoPage = () => {
  const router = useRouter();
  const { isMobileSize } = useBreakpoint();
  const { data } = useGetMeQuery();
  const {
    methods,
    isSubmitEnabled,
    handlePhoneNumberChange,
    setAgreedTermsIds,
    onSubmit,
  } = useOauthAdditionalInfoForm();
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.onboardingStatus !== 'GUEST') {
      routeAfterSignIn(router, data.onboardingStatus);
    }
  }, [data, router]);

  const handleOpenTerms = () => {
    setTermsOpen(true);
  };

  const handleSubmitTerms = ({ termsIds }: TermsAgreementRequestDto) => {
    setAgreedTermsIds(termsIds);
  };

  const handleTermsComplete = () => {
    setTermsOpen(false);
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <MobileOnly>
        <ActionHeader>
          <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        </ActionHeader>
      </MobileOnly>

      <AuthContainer>
        <form onSubmit={methods.handleSubmit(handleOpenTerms)}>
          <DesktopOnly>
            <ActionHeader className="mb-10 px-0">
              <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
            </ActionHeader>
          </DesktopOnly>

          <OauthAdditionalInfoForm
            isSubmitEnabled={isSubmitEnabled}
            onPhoneNumberChange={handlePhoneNumberChange}
          />
        </form>

        {termsOpen && isMobileSize && (
          <TermsBottomSheet
            open
            onOpenChange={setTermsOpen}
            onComplete={handleTermsComplete}
            onSubmitTermsAgreement={handleSubmitTerms}
          />
        )}
        {termsOpen && !isMobileSize && (
          <TermsDialog
            open
            onOpenChange={setTermsOpen}
            onComplete={handleTermsComplete}
            onSubmitTermsAgreement={handleSubmitTerms}
          />
        )}
      </AuthContainer>
    </FormProvider>
  );
};
