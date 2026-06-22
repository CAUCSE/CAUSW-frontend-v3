import { HStack, Text } from '@causw/cds';

export const MyLockerInfoEmptyView = () => {
  return (
    <HStack
      justify="between"
      align="center"
      className="rounded-lg bg-white px-5 py-4"
    >
      <Text typography="body-16-medium" textColor="gray-500">
        현재 사물함
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        없음
      </Text>
    </HStack>
  );
};
