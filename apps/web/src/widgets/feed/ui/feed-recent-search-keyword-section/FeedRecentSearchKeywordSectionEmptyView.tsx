import { CommentGrayColored, Text, VStack } from '@causw/cds';

export const FeedRecentSearchKeywordSectionEmptyView = () => {
  return (
    <VStack className="pt-30" align="center">
      <CommentGrayColored size={56} />
      <Text typography="body-16-regular" textColor="gray-500">
        최근 검색한 내용이 없어요
      </Text>
    </VStack>
  );
};
