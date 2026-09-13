import { BellGrayColored, Text, VStack } from '@causw/cds';

export const LatestSystemNoticeDetailSectionEmptyView = () => {
  return (
    <VStack gap="lg" align="center" className="h-full w-full pt-30">
      <BellGrayColored size={56} />
      <Text typography="body-16-regular" textColor="gray-500">
        아직 등록된 공지가 없어요
      </Text>
    </VStack>
  );
};
