'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Text, TextArea } from '@causw/cds';

import {
  ENROLLMENT_VERIFICATION_FORM_FIELD,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';

import { ACADEMIC_FORM_LIMITS } from '@/shared/constants';
import { FormSection } from '@/shared/ui';

export const AcademicStateChangeNoteField = () => {
  const { register } = useFormContext<EnrollmentVerificationFormData>();
  const watchedContent = useWatch<EnrollmentVerificationFormData>({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.content,
  });
  const content = typeof watchedContent === 'string' ? watchedContent : '';

  return (
    <FormSection
      title="유저 작성 특이사항"
      optional
      headerClassName="px-0"
      titleClassName="cursor-pointer px-1"
      optionalTextProps={{
        typography: 'body-14-medium',
        textColor: 'gray-500',
      }}
    >
      <TextArea className="relative flex min-h-[128px] flex-col overflow-hidden focus-within:ring-0">
        <div className="flex-1 overflow-hidden pb-6">
          <TextArea.Input
            placeholder="특이사항을 작성해 주세요."
            className="caret-auto block h-full min-h-0 font-sans text-[16px] leading-[1.5] font-normal tracking-[-0.02em] text-gray-800"
            resize={false}
            maxLength={ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH}
            {...register(ENROLLMENT_VERIFICATION_FORM_FIELD.content)}
          />
        </div>
        <Text
          typography="body-16-regular"
          textColor="gray-400"
          className="absolute right-4 bottom-4"
        >
          {content.length}/{ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH}
        </Text>
      </TextArea>
    </FormSection>
  );
};
