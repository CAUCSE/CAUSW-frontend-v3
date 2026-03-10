import { CommentGrayColored, Text, VStack } from '@causw/cds';

export const AlumniContactsListEmptyView = () => {
  return (
    <div className="flex size-full justify-center pt-30">
      <VStack className="items-center justify-center gap-6">
        <CommentGrayColored size={56} />
        <Text typography="body-16-regular" color="gray-500">
          검색 결과가 없어요
        </Text>
      </VStack>
    </div>
  );
};
