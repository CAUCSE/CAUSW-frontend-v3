'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Text, VStack } from '@causw/cds';

import {
  AcademicInfoSection,
  BaseInfoSection,
  DocumentSection,
} from '@/features/auth';

import {
  ENROLLMENT_VERIFICATION_FORM_FIELD,
  enrollmentVerificationSchema,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';

import { ActionHeader } from '@/shared/ui';

export interface EnrollmentVerificationFormProps {
  userName?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EnrollmentVerificationForm = ({
  userName = '유지아',
  onCancel,
  onSuccess,
}: EnrollmentVerificationFormProps) => {
  const methods = useForm<EnrollmentVerificationFormData>({
    mode: 'onChange',
    resolver: zodResolver(enrollmentVerificationSchema),
    defaultValues: {
      [ENROLLMENT_VERIFICATION_FORM_FIELD.major]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.content]: '',
      [ENROLLMENT_VERIFICATION_FORM_FIELD.images]: [],
    },
  });

  const onSubmit = (data: EnrollmentVerificationFormData) => {
    // TODO: API 호출
    console.log('Submitted data:', data);
    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col overflow-hidden"
      >
        <ActionHeader>
          <ActionHeader.BackButton type="button" onClick={onCancel}>
            뒤로
          </ActionHeader.BackButton>
          <ActionHeader.ActionButton
            type="submit"
            disabled={!methods.formState.isValid}
          >
            제출하기
          </ActionHeader.ActionButton>
        </ActionHeader>

        <VStack className="flex-1 gap-5 overflow-y-auto px-4 py-2 md:px-2 md:py-4">
          <Text typography="title-22-bold" textColor="gray-800">
            재학정보 인증
          </Text>

          <VStack className="gap-10">
            <BaseInfoSection userName={userName} />
            <AcademicInfoSection />
            <DocumentSection />
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  );
};
