'use client';

import { useRef } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, Camera, Field, Text, VStack } from '@causw/cds';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';
import {
  ACADEMIC_STATE_CHANGE_STATUS,
  type AcademicStateChangeFormData,
} from '@/entities/setting';

import {
  ACADEMIC_FORM_LIMITS,
  ACADEMIC_IMAGE_COUNT_MESSAGE,
  IMAGE_TYPE_ERROR_MESSAGE,
} from '@/shared/constants';
import { toast } from '@/shared/model';
import { ImageUploadField, type ImageUploadFieldRef } from '@/shared/ui';

export const AcademicStateChangeEnrollmentDocumentUploadField = () => {
  const imageFieldRef = useRef<ImageUploadFieldRef>(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext<AcademicStateChangeFormData>();
  const enrollmentState = useWatch<AcademicStateChangeFormData>({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });
  const images = useWatch<AcademicStateChangeFormData>({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.images,
  });
  const uploadedFileCount = Array.isArray(images) ? images.length : 0;
  const imageErrorMessage =
    errors[ENROLLMENT_VERIFICATION_FORM_FIELD.images]?.message;

  const isEnrolled =
    enrollmentState === ACADEMIC_STATE_CHANGE_STATUS.ENROLLED.value;

  return (
    <Field
      error={!!imageErrorMessage}
      className={isEnrolled ? undefined : 'hidden'}
    >
      <Field.Label>재학 증빙 서류 업로드</Field.Label>
      <div className="flex flex-col gap-2">
        <div className="relative flex min-h-[140px] flex-col overflow-hidden rounded-lg bg-white p-4">
          <VStack gap="xs" className="flex-1 overflow-hidden">
            <Text typography="body-16-regular" textColor="gray-700">
              mportal &gt; 내 정보 수정 &gt; 등록현황 캡처본을 첨부해 주세요.
            </Text>
            <Text typography="body-14-regular" textColor="gray-400">
              (이외의 파일로는 재학 증빙이 불가합니다)
            </Text>
          </VStack>

          <div className={uploadedFileCount > 0 ? 'mt-6' : 'mt-2'}>
            <ImageUploadField
              ref={imageFieldRef}
              name={ENROLLMENT_VERIFICATION_FORM_FIELD.images}
              setValue={setValue}
              maxFiles={ACADEMIC_FORM_LIMITS.MAX_IMAGES}
              onMaxFilesExceeded={() => {
                toast.error(ACADEMIC_IMAGE_COUNT_MESSAGE);
              }}
              mapValue={({ newImageFiles }) => newImageFiles}
              onInvalidTypeFile={() => {
                toast.error(IMAGE_TYPE_ERROR_MESSAGE);
              }}
              onInvalidSizeFile={() => {
                toast.error('이미지 파일은 각 5MB 이하만 첨부할 수 있습니다.');
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-transparent">
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
