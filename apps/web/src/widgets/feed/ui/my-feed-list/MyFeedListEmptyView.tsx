import { CommentGrayColored, Text, VStack } from '@causw/cds';

import { MY_FEED_VIEW_LABEL, type MyFeedView } from '@/entities/feed';

interface MyFeedListEmptyViewProps {
  myFeedView: MyFeedView;
}

export const MyFeedListEmptyView = ({
  myFeedView,
}: MyFeedListEmptyViewProps) => {
  return (
    <VStack gap="lg" align="center" className="h-full w-full pt-30">
      <CommentGrayColored size={56} />
      <Text typography="body-16-regular" textColor="gray-500">
        {MY_FEED_VIEW_LABEL[myFeedView]}이 없어요
      </Text>
    </VStack>
  );
};
