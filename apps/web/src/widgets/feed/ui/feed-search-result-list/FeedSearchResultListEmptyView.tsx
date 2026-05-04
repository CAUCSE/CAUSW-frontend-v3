import Link from 'next/link';

import { HStack, Plus, Text, VStack } from '@causw/cds';

interface FeedSearchResultListEmptyViewProps {
  keyword: string;
}

export const FeedSearchResultListEmptyView = ({
  keyword,
}: FeedSearchResultListEmptyViewProps) => {
  return (
    <VStack gap="xl" align="center" className="h-full w-full pt-30">
      <Text
        typography="body-16-regular"
        textColor="gray-500"
        className="text-center whitespace-pre-wrap"
      >
        &quot;{keyword}&quot;에 관한{'\n'}첫 게시물을 작성해보세요.
      </Text>
      <Link href="/feed/write">
        <HStack
          gap="sm"
          align="center"
          className="rounded-md bg-gray-600 px-4 py-3"
        >
          <Plus size={20} color="white" />
          <Text typography="subtitle-16-bold" textColor="white">
            글 쓰러 가기
          </Text>
        </HStack>
      </Link>
    </VStack>
  );
};
