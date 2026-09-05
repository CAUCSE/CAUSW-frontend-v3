import { Skeleton, VStack } from '@causw/cds';

const POST_LIST_SKELETON_ITEM_COUNT = 10;

export const PostListLoadingView = () => {
  return (
    <VStack gap="md" className="w-full max-w-full px-5 py-3 md:px-0">
      {Array.from({ length: POST_LIST_SKELETON_ITEM_COUNT }).map((_, index) => (
        <Skeleton key={index} height={146} radius="8" className="w-full" />
      ))}
    </VStack>
  );
};
