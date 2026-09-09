import { Comment, Heart, HStack, Text } from '@causw/cds';

import { formatRelativeTime } from '@/shared/lib/format/date';

import { type GetPostResponseDto } from '../model';

interface PostFooterProps {
  numLike: GetPostResponseDto['numLike'];
  numComment: GetPostResponseDto['numComment'];
  isPostLike?: boolean;
  createdAt: GetPostResponseDto['createdAt'];
}

export const PostFooter = ({
  numLike,
  numComment,
  isPostLike = false,
  createdAt,
}: PostFooterProps) => {
  return (
    <HStack align="center" justify="between" className="mt-4">
      <HStack as="footer" align="center" className="gap-5">
        <HStack className="gap-1.5" align="center">
          <Heart size={16} color={isPostLike ? 'red-400' : 'gray-200'} />
          <Text typography="body-14-medium" textColor="gray-400">
            {numLike}
          </Text>
        </HStack>

        <HStack className="gap-1.5" align="center">
          <Comment size={16} color="gray-200" />
          <Text typography="body-14-medium" textColor="gray-400">
            {numComment}
          </Text>
        </HStack>
      </HStack>

      <Text typography="body-14-regular" textColor="gray-400">
        <span suppressHydrationWarning>{formatRelativeTime(createdAt)}</span>
      </Text>
    </HStack>
  );
};
