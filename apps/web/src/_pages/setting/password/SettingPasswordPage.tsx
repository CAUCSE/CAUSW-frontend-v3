'use client';

import { FormProvider } from 'react-hook-form';

import { CTAButton, Text, VStack } from '@causw/cds';

import { usePasswordChangeForm } from '@/features/setting';

import { ActionHeader, RHFPasswordInput } from '@/shared/ui';

export const SettingPasswordPage = () => {
  const { methods, onSubmit, isReady, isSubmitting } = usePasswordChangeForm();

  return (
    <VStack className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ActionHeader>
            <ActionHeader.BackButton type="button">
              뒤로
            </ActionHeader.BackButton>
          </ActionHeader>
          <VStack className="gap-12 px-5">
            <VStack className="gap-7">
              <Text typography="title-22-bold">비밀번호 변경</Text>

              <RHFPasswordInput
                name="currentPassword"
                label="기존 비밀번호"
                placeholder="현재 비밀번호"
              />

              <RHFPasswordInput
                name="nextPassword"
                label="새 비밀번호"
                placeholder="새 비밀번호"
              />

              <RHFPasswordInput
                name="confirmPassword"
                label="새 비밀번호 확인"
                placeholder="새 비밀번호 확인"
              />
            </VStack>
            <CTAButton
              color="dark"
              fullWidth
              type="submit"
              disabled={!methods.formState.isValid || !isReady || isSubmitting}
            >
              {isSubmitting ? '변경 중...' : '변경하기'}
            </CTAButton>
          </VStack>
        </form>
      </FormProvider>
    </VStack>
  );
};
