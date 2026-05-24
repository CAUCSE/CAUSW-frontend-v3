'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack, Text, CTAButton } from '@causw/cds';

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '@/entities/auth';

import { RHFPasswordInput } from '@/shared/ui';

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void;
  isSubmitting?: boolean;
}

export const ResetPasswordForm = ({
  onSubmit,
  isSubmitting = false,
}: ResetPasswordFormProps) => {
  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const handleSubmit = (data: ResetPasswordFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        className="w-full gap-12"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <VStack className="gap-7">
          <Text as="h1" typography="title-22-bold" textColor="gray-700">
            비밀번호 변경
          </Text>

          <RHFPasswordInput
            name="newPassword"
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력해주세요."
            typography="body-16-regular"
          />

          <RHFPasswordInput
            name="confirmPassword"
            label="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호를 다시 입력해주세요."
            typography="body-16-regular"
          />
        </VStack>

        <CTAButton
          color="dark"
          fullWidth
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? '변경 중...' : '비밀번호 변경'}
        </CTAButton>
      </VStack>
    </FormProvider>
  );
};
