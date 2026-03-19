'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack, CTAButton } from '@causw/cds';

import { findEmailSchema, type FindEmailFormData } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

interface FindEmailFormProps {
  onSubmit?: (data: FindEmailFormData) => void;
}

export const FindEmailForm = ({ onSubmit }: FindEmailFormProps) => {
  const methods = useForm<FindEmailFormData>({
    resolver: zodResolver(findEmailSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const handleSubmit = (data: FindEmailFormData) => {
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        className="w-full gap-10"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <VStack className="gap-6">
          <RHFInput
            name="name"
            label="이름"
            placeholder="실명을 입력해주세요."
            typography="body-16-regular"
          />

          <RHFInput
            name="phoneNumber"
            label="전화번호"
            placeholder="010-1234-5678"
            typography="body-16-regular"
          />
        </VStack>

        <CTAButton color="dark" fullWidth type="submit" disabled={!isValid}>
          이메일 찾기
        </CTAButton>
      </VStack>
    </FormProvider>
  );
};
