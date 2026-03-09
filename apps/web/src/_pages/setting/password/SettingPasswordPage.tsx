'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CTAButton, Text, VStack } from '@causw/cds';

import { ActionHeader, RHFPasswordInput } from '@/shared/ui';

export const SettingPasswordPage = () => {
  const passwordChangeSchema = z
    .object({
      currentPassword: z.string().min(1),
      nextPassword: z.string().min(8),
      confirmPassword: z.string().min(1),
    })
    .refine((data) => data.nextPassword === data.confirmPassword, {
      path: ['confirmPassword'],
    });

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      nextPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = () => {};

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
              disabled={!methods.formState.isValid}
            >
              변경하기
            </CTAButton>
          </VStack>
        </form>
      </FormProvider>
    </VStack>
  );
};
