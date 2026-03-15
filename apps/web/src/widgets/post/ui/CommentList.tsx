import { VStack } from '@causw/cds';

import { CommentEmptyState, CommentItem } from '@/features/comment';

import { Comment, CommentHeader, ReplyTarget } from '@/entities/comment';

interface CommentListProps {
  comments: Comment[];
  onReply: (target: ReplyTarget) => void;
}

export const CommentList = ({ comments, onReply }: CommentListProps) => {
  const isEmpty = comments.length === 0;

  return (
    <VStack as="section" gap="none" className="flex h-fit flex-1 bg-white pt-5">
      <CommentHeader count={comments.length} />

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
