'use client';

import { useMemo } from 'react';

import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Close, CTAButton, Flex, Text, VStack } from '@causw/cds';

import { EnrollmentVerificationGraduationYearField } from '@/features/auth';
import {
  AcademicStateChangeEnrollmentDocumentUploadField,
  AcademicStateChangeNoteField,
  AcademicStateChangeStatusField,
  useAcademicRecordChangeMutation,
} from '@/features/setting';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth';
import {
  academicStateChangeFormSchema,
  type AcademicStateChangeFormData,
} from '@/entities/setting';
import { type AccountAcademicStatus } from '@/entities/user';

import { ActionHeader } from '@/shared/ui';
import { isMobile } from '@/shared/utils';

export interface AcademicStateChangeFormProps {
  academicStatus: AccountAcademicStatus;
  onCancel: () => void;
  onSuccess: () => void;
}

export const AcademicStateChangeForm = ({
  academicStatus,
  onCancel,
  onSuccess,
}: AcademicStateChangeFormProps) => {
  const defaultValues = useMemo(
    () => ({
      graduationYear: '',
      enrollmentState: academicStatus,
      content: '',
      images: [],
    }),
    [academicStatus],
  );

  const methods = useForm<AcademicStateChangeFormData>({
    mode: 'onChange',
    resolver: zodResolver(academicStateChangeFormSchema),
    defaultValues,
  });

  const academicRecordChangeMutation = useAcademicRecordChangeMutation({
    onSuccess,
  });
  const selectedAcademicStatus = useWatch({
    control: methods.control,
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });

  const handleSubmit = (data: AcademicStateChangeFormData) => {
    const isGraduated =
      data.enrollmentState ===
      ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value;

    if (isGraduated) {
      academicRecordChangeMutation.mutate({
        type: 'graduation',
        data: {
          graduationYear: Number(data.graduationYear),
          description: data.content || undefined,
        },
      });
      return;
    }

    academicRecordChangeMutation.mutate({
      type: 'return',
      data: {
        note: data.content || undefined,
        imageFileList: data.images ?? [],
      },
    });
  };

  const isSubmitDisabled =
    !methods.formState.isValid ||
    selectedAcademicStatus === academicStatus ||
    academicRecordChangeMutation.isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex h-full w-full flex-col overflow-hidden"
      >
        {isMobile && (
          <ActionHeader className="shrink-0">
            <ActionHeader.BackButton type="button" onClick={onCancel}>
              뒤로
            </ActionHeader.BackButton>
          </ActionHeader>
        )}

        <Flex
          justify="between"
          align="center"
          className="w-full shrink-0 px-4 pt-4 md:px-2 md:pt-0"
        >
          <Text typography="title-22-bold" textColor="gray-800">
            학적 상태 변경
          </Text>
          {!isMobile && (
            <button
              type="button"
              onClick={onCancel}
              aria-label="학적 상태 변경 닫기"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <Close size={20} color="gray-600" />
            </button>
          )}
        </Flex>

        <VStack className="min-h-0 flex-1 gap-6 overflow-y-auto px-4 pt-6 pb-10 md:px-2">
          <VStack className="gap-8 pb-2">
            <AcademicStateChangeStatusField />
            <EnrollmentVerificationGraduationYearField />
            <AcademicStateChangeEnrollmentDocumentUploadField />
            <AcademicStateChangeNoteField />
          </VStack>
        </VStack>

        <div className="shrink-0 px-4 pt-4 pb-4 md:px-2 md:pt-6 md:pb-0">
          <CTAButton
            type="submit"
            color="dark"
            fullWidth
            disabled={isSubmitDisabled}
          >
            신청하기
          </CTAButton>
        </div>
      </form>
    </FormProvider>
  );
};
