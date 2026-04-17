import { Button, Dialog, mergeStyles, Pen, Text } from '@causw/cds';

interface AlumniContactsDescriptionEditDialogTriggerProps {
  description: string;
}

export const AlumniContactsDescriptionEditDialogTrigger = ({
  description,
}: AlumniContactsDescriptionEditDialogTriggerProps) => {
  return (
    <Dialog.Trigger asChild>
      <Button
        type="button"
        className="flex h-fit items-center gap-2 bg-[#FFFFFF1A] px-3 py-2.5 hover:bg-[#FFFFFF26]!"
      >
        <Text
          typography="body-16-regular"
          textColor="gray-100"
          className={mergeStyles(
            'min-h-0 grow self-start text-start whitespace-pre-wrap',
            !description && 'text-gray-400',
          )}
        >
          {description || '소개글은 최대 100자까지 작성 가능합니다.'}
        </Text>
        <div className="self-end">
          <Pen size={12} className="shrink-0" color="gray-200" />
        </div>
      </Button>
    </Dialog.Trigger>
  );
};
