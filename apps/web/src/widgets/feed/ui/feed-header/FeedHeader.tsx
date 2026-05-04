import { HStack, Link, Search, Text } from '@causw/cds';

export const FeedHeader = () => {
  return (
    <HStack as="header" className="items-center justify-between px-6 md:px-2">
      <Text
        typography="title-32-bold"
        textColor="gray-700"
        className="hidden md:block"
      >
        커뮤니티
      </Text>
      <Text
        typography="title-22-bold"
        textColor="gray-700"
        className="block md:hidden"
      >
        커뮤니티
      </Text>

      <Link href="/feed/search">
        <Search size={20} color="gray-700" />
      </Link>
    </HStack>
  );
};
