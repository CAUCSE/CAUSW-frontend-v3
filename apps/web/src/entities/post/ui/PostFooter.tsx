import { Comment, Heart, HStack, Text } from '@causw/cds';

import { type GetPostResponseDto } from '../model';

interface PostFooterProps {
  numLike: GetPostResponseDto['numLike'];
  numComment: GetPostResponseDto['numComment'];
  isPostLike?: boolean;
}

export const PostFooter = ({
  numLike,
  numComment,
  isPostLike = false,
}: PostFooterProps) => {
  return (
    <HStack as="footer" className="gap-5" align="center">
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
  );
};
