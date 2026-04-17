import { Button, HStack, Plus, Text, VStack } from '@causw/cds';

interface AlumniContactsSnsAddDialogTriggerProps {
  onClick: () => void;
}

export const AlumniContactsSnsAddDialogTrigger = ({
  onClick,
}: AlumniContactsSnsAddDialogTriggerProps) => {
  return (
    <Button
      className="group h-fit shrink-0 bg-transparent px-2 py-0 hover:bg-transparent!"
      onClick={onClick}
      type="button"
    >
      <VStack className="gap-1.5">
        <HStack className="size-15 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200">
          <Plus color="gray-500" />
        </HStack>
        <Text typography="body-14-regular" textColor="gray-600">
          추가하기
        </Text>
      </VStack>
    </Button>
  );
};
