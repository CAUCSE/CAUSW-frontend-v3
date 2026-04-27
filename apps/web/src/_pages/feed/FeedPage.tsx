import { HStack, VStack } from '@causw/cds';

import { FeedHeader } from '@/widgets/feed';

export const FeedPage = () => {
  return (
    <HStack className="size-full justify-center">
      <VStack className="w-full py-4 md:px-8 md:py-6 xl:w-225">
        <VStack className="min-h-0 flex-1 gap-3">
          <FeedHeader />
        </VStack>
      </VStack>
    </HStack>
  );
};
