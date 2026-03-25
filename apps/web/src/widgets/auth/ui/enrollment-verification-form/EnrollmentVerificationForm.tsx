'use client';

import { FormProvider } from 'react-hook-form';

import { Text, VStack } from '@causw/cds';

import {
  EnrollmentDocumentUploadField,
  EnrollmentVerificationEnrollmentYearField,
  EnrollmentVerificationGraduationYearField,
  EnrollmentVerificationMajorField,
  EnrollmentVerificationNameField,
  EnrollmentVerificationStateField,
  EnrollmentVerificationStudentIdField,
  useEnrollmentVerificationForm,
} from '@/features/auth';

import { EnrollmentVerificationActionHeader } from '../enrollment-verification-action-header';

export interface EnrollmentVerificationFormProps {
  userName: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EnrollmentVerificationForm = ({
  userName,
  onCancel,
  onSuccess,
}: EnrollmentVerificationFormProps) => {
  const { methods, handleSubmit, isSubmitting } = useEnrollmentVerificationForm(
    {
      userName,
      onSuccess,
    },
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex h-full w-full flex-col overflow-hidden"
      >
        <EnrollmentVerificationActionHeader
          isSubmitDisabled={!methods.formState.isValid || isSubmitting}
          onCancel={onCancel}
        />

        <VStack className="flex-1 gap-5 overflow-y-auto px-4 py-2 md:px-2 md:py-4">
          <Text typography="title-22-bold" textColor="gray-800">
            재학정보 인증
          </Text>

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
