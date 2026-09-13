'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Field, Flex, Text } from '@causw/cds';

import {
  ENROLLMENT_VERIFICATION_FORM_FIELD,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';

export const AcademicStateChangeNoteField = () => {
  const { register } = useFormContext<EnrollmentVerificationFormData>();
  const watchedContent = useWatch<EnrollmentVerificationFormData>({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.content,
  });
  const content = typeof watchedContent === 'string' ? watchedContent : '';

  return (
    <Field className="flex flex-col gap-2">
      <Flex align="center" gap="xs">
        <Field.Label>유저 작성 특이사항</Field.Label>
        <Text typography="body-14-medium" textColor="gray-500">
          (선택)
        </Text>
      </Flex>
      <div className="flex flex-col gap-2">
        <div className="relative flex min-h-[128px] flex-col overflow-hidden rounded-xl bg-white p-4">
          {/* iOS 포커스 확대 방지: 1rem + scale(0.9375)로 15px 유지 */}
          <div className="flex-1 overflow-hidden pb-6">
            <textarea
              placeholder="특이사항을 작성해주세요."
              className="block h-[106.6667%] w-[106.6667%] origin-top-left scale-[0.9375] resize-none bg-transparent font-sans text-base text-gray-800 placeholder-gray-400 outline-none"
              maxLength={500}
              {...register(ENROLLMENT_VERIFICATION_FORM_FIELD.content)}
            />
          </div>
          <Text
            typography="body-16-regular"
            textColor="gray-400"
            className="absolute right-4 bottom-4"
          >
            {content.length}/500
          </Text>
        </div>
      </div>
    </Field>
  );
};
