import { VStack } from '@causw/cds';

import { CommentEmptyState, CommentItem } from '@/features/comment';

import {
  type Comment,
  CommentHeader,
  type ReplyTarget,
} from '@/entities/comment';

interface CommentListProps {
  countComment: number;
  comments: Comment[];
  onReply: (target: ReplyTarget) => void;
}

export const CommentList = ({
  countComment,
  comments,
  onReply,
}: CommentListProps) => {
  const isEmpty = countComment === 0;

  return (
    <VStack as="section" gap="none" className="flex h-fit flex-1 bg-white pt-5">
      <CommentHeader count={countComment} />

      {isEmpty ? (
        <CommentEmptyState />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={onReply} />
        ))
      )}
    </VStack>
  );
};
