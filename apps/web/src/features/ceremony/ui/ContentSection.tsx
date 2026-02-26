import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Button, Camera, TextArea } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/FormSection';
import { ImageUploadField } from '@/shared/ui/image';

import { useImageUpload } from '../model/useImageUpload';

export const ContentSection = () => {
  const { control } = useFormContext<CeremonyFormData>();
  const { imageUploadRef, handleSetPhotoFiles, photoResetTrigger } =
    useImageUpload();
  const content = useWatch({ control, name: 'content' });

  return (
    <FormSection title="내용" optional>
      <TextArea>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextArea.Input
              value={field.value}
              onChange={field.onChange}
              placeholder="텍스트를 적어주세요."
              resize={false}
              maxLength={500}
            />
          )}
        />
        <div className="mt-8 flex flex-col gap-4">
          <ImageUploadField
            ref={imageUploadRef}
            name="photos"
            setValue={handleSetPhotoFiles}
            resetTrigger={photoResetTrigger}
          />
          <div className="flex items-end justify-between">
            <Button
              size="md"
              color="gray"
              onClick={() => imageUploadRef.current?.openFilePicker()}
            >
              <Camera size={16} color="gray-600" />
              사진첨부
            </Button>
            <span className="typo-body-16-regular text-gray-400">
              {content.length}/500
            </span>
          </div>
        </div>
      </TextArea>
    </FormSection>
  );
};
