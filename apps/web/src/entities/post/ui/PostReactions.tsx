import { Chip, Heart, HStack, Share } from '@causw/cds';

interface PostReactionsProps {
  liked: boolean;
  likeCount: number;
  onLikeClick: () => void;
  onShareClick: () => void;
}

export const PostReactions = ({
  liked,
  likeCount,
  onLikeClick,
  onShareClick,
}: PostReactionsProps) => {
  return (
    <HStack gap="sm">
      <Chip
        asChild
        color="lightgray"
        size="sm"
        onClick={onLikeClick}
        className={`rounded-sm px-3 py-2 ${liked && 'bg-red-100 text-red-400'}`}
      >
        <HStack as="button" gap="sm" align="center" className="gap-1.5">
          <Heart size={16} color={liked ? 'red-400' : 'gray-300'} />
          <span>좋아요</span>
          <span>{likeCount}</span>
        </HStack>
      </Chip>
      <Chip
        asChild
        color="lightgray"
        size="sm"
        onClick={onShareClick}
        className="rounded-sm px-3 py-2"
      >
        <HStack as="button" gap="sm" align="center" className="gap-1.5">
          <Share size={16} />
          <span>공유하기</span>
        </HStack>
      </Chip>
    </HStack>
  );
};
