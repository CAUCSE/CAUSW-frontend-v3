import { Button, Camera, TextArea } from '@causw/cds';

import { FormSection } from '@/shared/ui/FormSection';
import { ImageUploadField } from '@/shared/ui/image';

import type { CeremonyFormReturn } from '../model';

type Props = Pick<
  CeremonyFormReturn,
  | 'content'
  | 'setContent'
  | 'imageUploadRef'
  | 'handleSetPhotoFiles'
  | 'photoResetTrigger'
>;

export const ContentSection = ({
  content,
  setContent,
  imageUploadRef,
  handleSetPhotoFiles,
  photoResetTrigger,
}: Props) => (
  <FormSection title="내용" optional>
    <TextArea>
      <TextArea.Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="텍스트를 적어주세요."
        resize={false}
        maxLength={500}
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
