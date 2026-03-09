'use client';

import { FormProvider } from 'react-hook-form';

import { AuthContainer, AdditionalInfoForm } from '@/widgets/auth';

import { useAdditionalInfoForm } from '@/features/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

export const AdditionalInfoPage = () => {
  const { methods, isSubmitEnabled, handlePhoneNumberChange, onSubmit } =
    useAdditionalInfoForm();

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

          <AdditionalInfoForm
            isSubmitEnabled={isSubmitEnabled}
            onPhoneNumberChange={handlePhoneNumberChange}
          />
        </form>
      </AuthContainer>
    </FormProvider>
  );
};
