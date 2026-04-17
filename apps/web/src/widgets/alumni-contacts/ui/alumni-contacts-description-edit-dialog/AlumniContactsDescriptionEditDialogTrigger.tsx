import { Button, Dialog, Pen, Text } from '@causw/cds';

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
        className="flex h-fit min-h-17 items-center gap-2 bg-[#FFFFFF1A] px-3 py-2.5 hover:bg-[#FFFFFF26]!"
      >
        <Text
          typography="body-16-regular"
          textColor="gray-100"
          className="min-h-0 grow self-start text-start whitespace-pre-wrap"
        >
          {description}
        </Text>
        <div className="self-end">
          <Pen size={12} className="shrink-0" color="gray-200" />
        </div>
      </Button>
    </Dialog.Trigger>
  );
};
