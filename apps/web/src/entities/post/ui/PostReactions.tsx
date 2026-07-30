import { Button, Heart, HStack, Share } from '@causw/cds';

interface PostReactionsProps {
  active: boolean;
  likeCount: number;
  onLikeClick: () => void;
  onShareClick: () => void;
}

export const PostReactions = ({
  active,
  likeCount,
  onLikeClick,
  onShareClick,
}: PostReactionsProps) => {
  return (
    <HStack gap="sm">
      <Button color={active ? 'red' : 'gray'} onClick={onLikeClick}>
        <Heart size={16} color={active ? 'red-400' : 'gray-300'} />
        좋아요 {likeCount}
      </Button>
      <Button color="gray" onClick={onShareClick}>
        <Share size={16} /> 공유하기
      </Button>
    </HStack>
  );
};
