import { Button, Close, Dialog, HStack, Text } from '@causw/cds';

interface LockerApplyModalHeaderProps {
  locationName: string;
}

export const LockerApplyModalHeader = ({
  locationName,
}: LockerApplyModalHeaderProps) => {
  return (
    <HStack justify="between" align="center" className="px-1">
      <Text typography="title-22-bold" textColor="gray-700">
        {locationName}
      </Text>
      <Dialog.Close asChild>
        <Button
          color="gray"
          className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
        >
          <Close size={20} color="gray-600" />
        </Button>
      </Dialog.Close>
    </HStack>
  );
};
