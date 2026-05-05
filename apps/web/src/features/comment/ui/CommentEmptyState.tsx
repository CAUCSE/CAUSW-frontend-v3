import { CommentGrayColored, Text, VStack } from '@causw/cds';

export const CommentEmptyState = () => {
  return (
    <VStack align="center" justify="center" className="min-h-55 flex-1 gap-3">
      <CommentGrayColored size={56} />
      <Text typography="body-14-regular" textColor="gray-400">
        아직 댓글이 없습니다.
      </Text>
    </VStack>
  );
};
