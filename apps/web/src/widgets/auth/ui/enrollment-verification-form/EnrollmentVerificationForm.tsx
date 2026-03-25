'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { VStack } from '@causw/cds';

import {
  EnrollmentDocumentUploadField,
  EnrollmentVerificationEnrollmentYearField,
  EnrollmentVerificationGraduationYearField,
  EnrollmentVerificationMajorField,
  EnrollmentVerificationNameField,
  EnrollmentVerificationStateField,
  EnrollmentVerificationStudentIdField,
} from '@/features/auth';

import {
  enrollmentVerificationSchema,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';

import { EnrollmentVerificationActionHeader } from '../enrollment-verification-action-header';
import { EnrollmentVerificationHeader } from '../enrollment-verification-header';

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
      major: '',
      enrollmentYear: '',
      graduationYear: '',
      studentId: '',
      enrollmentState: '',
      content: '',
      images: [],
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
        <EnrollmentVerificationActionHeader
          isSubmitDisabled={!methods.formState.isValid}
          onCancel={onCancel}
        />

        <VStack className="flex-1 gap-5 overflow-y-auto px-4 py-2 md:px-2 md:py-4">
          <EnrollmentVerificationHeader />

          <VStack className="gap-10">
            <EnrollmentVerificationNameField userName={userName} />
            <EnrollmentVerificationMajorField />
            <EnrollmentVerificationEnrollmentYearField />
            <EnrollmentVerificationStudentIdField />
            <EnrollmentVerificationStateField />
            <EnrollmentVerificationGraduationYearField />
            <EnrollmentDocumentUploadField />
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  );
};
