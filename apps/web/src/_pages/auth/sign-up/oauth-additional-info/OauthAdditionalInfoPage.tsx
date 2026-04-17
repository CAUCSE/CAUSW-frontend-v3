'use client';

import { useEffect } from 'react';

import { FormProvider } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { AuthContainer, OauthAdditionalInfoForm } from '@/widgets/auth';

import {
  routeAfterSignIn,
  useGetMeQuery,
  useOauthAdditionalInfoForm,
} from '@/features/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

export const OauthAdditionalInfoPage = () => {
  const router = useRouter();
  const { data } = useGetMeQuery();
  const { methods, isSubmitEnabled, handlePhoneNumberChange, onSubmit } =
    useOauthAdditionalInfoForm();

  useEffect(() => {
    if (!data) return;
    if (data.onboardingStatus !== 'GUEST') {
      routeAfterSignIn(router, data.onboardingStatus);
    }
  }, [data, router]);

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

          <OauthAdditionalInfoForm
            isSubmitEnabled={isSubmitEnabled}
            onPhoneNumberChange={handlePhoneNumberChange}
          />
        </form>
      </AuthContainer>
    </FormProvider>
  );
};
