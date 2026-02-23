import { Button, Heart, HStack } from '@causw/cds';

interface PostReactionsProps {
  active: boolean;
  likeCount: number;
  onLikeClick: () => void;
}

export const PostReactions = ({
  active,
  likeCount,
  onLikeClick,
}: PostReactionsProps) => {
  return (
    <HStack gap="sm">
      <Button color={active ? 'red' : 'gray'} onClick={onLikeClick}>
        <Heart size={16} color={active ? 'red-400' : 'gray-300'} />
        좋아요 {likeCount}
      </Button>
      {/* TODO: 공유하기 기능 상세 스펙 구체화 후 활성화
      <Button color="gray" onClick={onShareClick}>
        <Share size={16} /> 공유하기
      </Button> */}
    </HStack>
  );
};
