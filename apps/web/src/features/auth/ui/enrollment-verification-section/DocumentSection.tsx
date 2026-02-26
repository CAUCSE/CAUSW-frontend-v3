import { useRef } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, Camera, Field, Text } from '@causw/cds';

import { type EnrollmentVerificationFormData } from '@/entities/auth';

import { ImageUploadField, type ImageUploadFieldRef } from '@/shared/ui';

export const DocumentSection = () => {
  const imageFieldRef = useRef<ImageUploadFieldRef>(null);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EnrollmentVerificationFormData>();

  return (
    <Field className="flex flex-col gap-2" error={!!errors.images?.message}>
      <Field.Label>증빙서류</Field.Label>
      <div className="flex flex-col gap-2">
        <Text
          typography="body-14-medium"
          textColor="gray-500"
          className="leading-relaxed whitespace-pre-wrap"
        >
          서류를 제출하여{' '}
          <span className="text-[#4f98ff]">중앙대학교 소프트웨어대학</span>에
          재적 또는 졸업하였음을 관리자에게 승인을 받아야 해요.
          <br />
          <Text typography="caption-12-regular" textColor="gray-400">
            (제출가능 서류: 졸업증명서, 재학증명서, e-id 및 포탈 캡쳐화면)
          </Text>
        </Text>

        <div className="relative flex min-h-[140px] flex-col overflow-hidden rounded-xl bg-white p-4">
          <textarea
            placeholder="내용을 입력해주세요."
            className="flex-1 resize-none bg-transparent font-sans text-sm text-gray-800 placeholder-gray-400 outline-none"
            maxLength={500}
            {...register('content')}
          />

          <div className="mt-2">
            <ImageUploadField
              ref={imageFieldRef}
              name="images"
              setValue={setValue}
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
            <Text typography="body-16-regular" textColor="gray-400">
              {watch('content')?.length || 0}/500
            </Text>
          </div>
        </div>
      </div>
      <Field.ErrorDescription>
        {errors.images?.message as string}
      </Field.ErrorDescription>
    </Field>
  );
};
