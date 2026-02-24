import { Avatar, HStack, OfficialColored, Text } from '@causw/cds';

export const PostHeader = () => {
  return (
    <HStack gap="sm" align="center" className="gap-2.5">
      <Avatar size="40" />
      <HStack gap="sm" align="center">
        <HStack gap="xs" align="center">
          <Text typography="subtitle-16-bold" textColor="gray-800">
            소프트웨어학부
          </Text>
          <OfficialColored size={12} />
        </HStack>
        <Text typography="body-16-regular" textColor="gray-500">
          8분 전
        </Text>
      </HStack>
    </HStack>
  );
};
