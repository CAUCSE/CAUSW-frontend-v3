import { Stack, Text } from '@causw/cds';

interface CommentHeaderProps {
  count: number;
}

export const CommentHeader = ({ count }: CommentHeaderProps) => {
  return (
    <Stack gap="md" className="px-5">
      <div className="h-px w-full bg-gray-100 px-5" />
      <Text typography="subtitle-16-bold" textColor="gray-800">
        댓글 {count}
      </Text>
    </Stack>
  );
};
