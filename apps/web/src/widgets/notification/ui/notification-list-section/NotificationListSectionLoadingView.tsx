import { Skeleton, Text, VStack } from '@causw/cds';

export const NotificationListSectionLoadingView = () => {
  return (
    <VStack as="section" gap="md" className="px-4">
      <Text typography="title-22-bold" textColor="gray-700">
        알림
      </Text>
      {Array.from({
        length: 4,
      }).map((_, idx) => (
        <Skeleton
          key={idx}
          height={90}
          className="flex w-full animate-pulse flex-col gap-2 rounded-lg px-4 py-4.5"
        />
      ))}
    </VStack>
  );
};
