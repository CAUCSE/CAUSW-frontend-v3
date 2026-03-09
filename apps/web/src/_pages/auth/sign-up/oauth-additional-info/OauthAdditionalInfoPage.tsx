'use client';

import { FormProvider } from 'react-hook-form';

import { AuthContainer, OauthAdditionalInfoForm } from '@/widgets/auth';

import { useOauthAdditionalInfoForm } from '@/features/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

export const OauthAdditionalInfoPage = () => {
  const { methods, isSubmitEnabled, handlePhoneNumberChange, onSubmit } =
    useOauthAdditionalInfoForm();

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
