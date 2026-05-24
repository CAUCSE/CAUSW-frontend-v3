import { CommentGrayColored, Text, VStack } from '@causw/cds';

export const FeedListEmptyView = () => {
  return (
    <VStack gap="lg" align="center" className="h-full w-full pt-30">
      <CommentGrayColored size={56} />
      <Text typography="body-16-regular" textColor="gray-500">
        글이 없어요
      </Text>
    </VStack>
  );
};
