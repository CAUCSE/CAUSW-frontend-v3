import { mergeStyles, VStack } from '@causw/cds';

import { CommentItem } from '@/features/comment';

import { type Comment, type ReplyTarget } from '@/entities/comment';

interface CommentListProps {
  comments: Comment[];
  onReply: (target: ReplyTarget) => void;
}

export const CommentList = ({ comments, onReply }: CommentListProps) => {
  const isEmpty = comments.length === 0;

  return (
    <VStack
      as="section"
      gap="none"
      className={mergeStyles(
        'flex h-fit flex-1 bg-white',
        isEmpty ? 'pt-30' : 'pt-5',
      )}
    >
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </VStack>
  );
};
