import { BellGrayColored, Text, VStack } from '@causw/cds';

export const NotificationListSectionEmptyView = () => {
  return (
    <VStack as="section" gap="md" className="px-4">
      <Text typography="title-22-bold" textColor="gray-700">
        알림
      </Text>
      <VStack className="h-63.5 w-full items-center justify-center gap-3">
        <BellGrayColored size={56} />
        <Text typography="body-16-regular" textColor="gray-400">
          받은 알림이 없습니다.
        </Text>
      </VStack>
    </VStack>
  );
};
