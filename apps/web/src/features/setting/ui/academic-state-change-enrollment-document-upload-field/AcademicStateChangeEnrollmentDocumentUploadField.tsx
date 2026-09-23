'use client';

import { useRef } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, Camera, Field, Text, VStack } from '@causw/cds';

import {
  ENROLLMENT_VERIFICATION_FORM_FIELD,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';
import { ACADEMIC_STATE_CHANGE_STATUS } from '@/entities/setting';

import { toast } from '@/shared/model';
import { ImageUploadField, type ImageUploadFieldRef } from '@/shared/ui';

export const AcademicStateChangeEnrollmentDocumentUploadField = () => {
  const imageFieldRef = useRef<ImageUploadFieldRef>(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext<EnrollmentVerificationFormData>();
  const enrollmentState = useWatch<EnrollmentVerificationFormData>({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });
  const imageErrorMessage =
    errors[ENROLLMENT_VERIFICATION_FORM_FIELD.images]?.message;

  if (enrollmentState !== ACADEMIC_STATE_CHANGE_STATUS.ENROLLED.value) {
    return null;
  }

  return (
    <Field className="flex flex-col gap-2" error={!!imageErrorMessage}>
      <Field.Label>재학 증빙 서류 업로드</Field.Label>
      <div className="flex flex-col gap-2">
        <div className="relative flex min-h-[140px] flex-col overflow-hidden rounded-xl bg-white p-4">
          {/* iOS 포커스 확대 방지: 1rem + scale(0.9375)로 15px 유지 */}
          <VStack gap="xs" className="flex-1 overflow-hidden">
            <Text typography="body-16-regular" textColor="gray-700">
              mportal &gt; 내 정보 수정 &gt; 등록현황 캡쳐본을 첨부해주세요.
            </Text>
            <Text typography="body-14-regular" textColor="gray-400">
              (이외의 파일로는 재학 증명이 불가합니다)
            </Text>
          </VStack>

          <div className="mt-2">
            <ImageUploadField
              ref={imageFieldRef}
              name={ENROLLMENT_VERIFICATION_FORM_FIELD.images}
              setValue={setValue}
              mapValue={({ newImageFiles }) => newImageFiles}
              onInvalidTypeFile={() => {
                toast.error(
                  'JPG, JPEG, PNG, GIF, BMP 형식의 이미지 파일만 첨부할 수 있습니다.',
                );
              }}
              onInvalidSizeFile={() => {
                toast.error('이미지 파일은 각 5MB 이하만 첨부할 수 있습니다.');
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-transparent pt-2">
            <input type="file" className="hidden" accept="image/*" />
            <Button
              type="button"
              onClick={() => imageFieldRef.current?.openFilePicker()}
            >
              <Camera size={16} color="gray-600" />
              사진첨부
            </Button>
          </div>
        </div>
      </div>
      {imageErrorMessage && (
        <Field.ErrorDescription>{imageErrorMessage}</Field.ErrorDescription>
      )}
    </Field>
  );
};
