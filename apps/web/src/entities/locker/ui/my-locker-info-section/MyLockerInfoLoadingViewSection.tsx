import { HStack, Skeleton, Text } from '@causw/cds';

export const MyLockerInfoLoadingViewSection = () => {
  return (
    <HStack
      justify="between"
      align="center"
      className="rounded-lg bg-white px-5 py-4"
    >
      <Text typography="body-16-medium" textColor="gray-500">
        현재 사물함
      </Text>
      <Skeleton height={26} width={58} />
    </HStack>
  );
};
