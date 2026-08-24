import { Button, Comment, Eye, Heart, HStack, Share2, Text } from '@causw/cds';

import { formatRelativeTime } from '@/shared/lib';

interface PostReactionsProps {
  active: boolean;
  likeCount: number;
  commentCount: number;
  viewCount?: number;
  createdAt: string;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
}

export const PostReactions = ({
  active,
  likeCount,
  commentCount,
  viewCount = 0,
  createdAt,
  onLikeClick,
  onCommentClick,
  onShareClick,
}: PostReactionsProps) => {
  return (
    <HStack className="gap-5">
      <Button
        color="white"
        className="h-auto min-w-0 bg-transparent px-0 enabled:hover:bg-transparent enabled:active:bg-transparent enabled:data-[active]:bg-transparent"
        onClick={onLikeClick}
      >
        <Heart size={20} color={active ? 'red-400' : 'gray-200'} />
        {likeCount}
      </Button>
      <Button
        color="white"
        className="h-auto min-w-0 bg-transparent px-0 enabled:hover:bg-transparent enabled:active:bg-transparent enabled:data-[active]:bg-transparent"
        onClick={onCommentClick}
      >
        <Comment size={20} color="gray-200" />
        <Text typography="body-14-medium" textColor="gray-400">
          {commentCount}
        </Text>
      </Button>
      <HStack className="gap-1.5" align="center">
        <Eye size={20} color="gray-200" />
        <Text typography="body-14-medium" textColor="gray-400">
          {viewCount}
        </Text>
      </HStack>
      <Button
        color="white"
        className="h-auto min-w-0 bg-transparent px-0 enabled:hover:bg-transparent enabled:active:bg-transparent enabled:data-[active]:bg-transparent"
        onClick={onShareClick}
      >
        <Share2 size={20} />
      </Button>
      <Text
        typography="body-14-regular"
        textColor="gray-400"
        className="ml-auto"
      >
        <span suppressHydrationWarning>{formatRelativeTime(createdAt)}</span>
      </Text>
    </HStack>
  );
};
